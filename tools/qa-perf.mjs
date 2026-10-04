// Medição de performance em Chrome headless (CDP), contra o build de produção.
//
// Mede, sem instalar Lighthouse: FCP, LCP (e o elemento), CLS, TBT aproximado
// (tarefas longas), tempo de script, INP aproximado (abrir o menu no mobile) e a
// rede (por tipo, fontes e imagens realmente baixadas). Desktop = sem throttling;
// mobile = CPU 4×, 4G lenta (1,6 Mbps, 150ms). Valores locais são REFERÊNCIA, não verdade absoluta.
//
// Uso (com `npm run build && npm run preview -- --port 4332`):
//   node tools/qa-perf.mjs [url] [saida.json]
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url = 'http://localhost:4332/', jsonOut] = process.argv.slice(2);
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9339;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const PROFILES = {
  desktop: { width: 1440, height: 900, mobile: false, cpu: 1, net: null },
  mobile: { width: 390, height: 844, mobile: true, cpu: 4, net: { latency: 150, down: (1.6 * 1024 * 1024) / 8, up: (750 * 1024) / 8 } },
};

const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'qa-perf-'))}`,
  '--hide-scrollbars', '--force-device-scale-factor=1', '--no-first-run', 'about:blank'], { stdio: 'ignore' });

const out = {};
try {
  let targets;
  for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (targets.length) break; } catch {} await sleep(200); }
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const pend = new Map(); const reqs = new Map(); let errors = [];
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); return; }
    const p = d.params;
    if (d.method === 'Network.requestWillBeSent') reqs.set(p.requestId, { url: p.request.url, type: p.type, size: 0 });
    if (d.method === 'Network.responseReceived' && reqs.has(p.requestId)) reqs.get(p.requestId).status = p.response.status;
    if (d.method === 'Network.loadingFinished' && reqs.has(p.requestId)) reqs.get(p.requestId).size = p.encodedDataLength;
    if (d.method === 'Runtime.exceptionThrown') errors.push(p.exceptionDetails.text);
    if (d.method === 'Runtime.consoleAPICalled' && p.type === 'error') errors.push(p.args.map((a) => a.value ?? a.description).join(' '));
  };
  const send = (method, params = {}) => new Promise((res, rej) => { const n = ++id; pend.set(n, (d) => (d.error ? rej(new Error(JSON.stringify(d.error))) : res(d.result))); ws.send(JSON.stringify({ id: n, method, params })); });
  const ev = async (expression) => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text); return r.result.value; };

  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable'); await send('Performance.enable');
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.__perf = { fcp: null, lcp: null, lcpEl: null, cls: 0, tasks: [], events: [] };
    try { new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.name === 'first-contentful-paint') window.__perf.fcp = e.startTime; }).observe({ type: 'paint', buffered: true }); } catch (e) {}
    try { new PerformanceObserver((l) => { for (const e of l.getEntries()) { window.__perf.lcp = e.startTime; window.__perf.lcpEl = (e.element && (e.element.tagName + '.' + (e.element.className || '')).slice(0, 60)) + ' ' + (e.url || '').split('/').pop().slice(0, 50); } }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch (e) {}
    try { new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__perf.cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); } catch (e) {}
    try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__perf.tasks.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: 'longtask', buffered: true }); } catch (e) {}
    try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__perf.events.push([e.name, Math.round(e.duration)]); }).observe({ type: 'event', durationThreshold: 16, buffered: true }); } catch (e) {}
  ` });

  for (const [name, P] of Object.entries(PROFILES)) {
    reqs.clear(); errors = [];
    await send('Network.setCacheDisabled', { cacheDisabled: true });
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
    await send('Emulation.setDeviceMetricsOverride', { width: P.width, height: P.height, deviceScaleFactor: 1, mobile: P.mobile });
    await send('Emulation.setCPUThrottlingRate', { rate: P.cpu });
    await send('Network.emulateNetworkConditions', P.net
      ? { offline: false, latency: P.net.latency, downloadThroughput: P.net.down, uploadThroughput: P.net.up }
      : { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
    await send('Page.navigate', { url: 'about:blank' }); await sleep(300);
    const t0 = Date.now();
    await send('Page.navigate', { url });
    await sleep(P.net ? 9000 : 4500); // carga + animações de entrada
    const atLoad = await ev('JSON.parse(JSON.stringify(window.__perf))');
    const loadBytes = [...reqs.values()].reduce((s, r) => s + r.size, 0);
    const loadReqs = reqs.size;
    // rolagem completa (dispara imagens lazy, reveals e parallax) medindo as tarefas longas
    await ev(`(async () => { const w = (ms) => new Promise(r => setTimeout(r, ms)); document.documentElement.style.scrollBehavior = 'auto'; const H = document.documentElement.scrollHeight; for (let y = 0; y <= H; y += 220) { window.scrollTo(0, y); await w(70); } await w(1500); window.scrollTo(0, 0); })()`);
    await sleep(P.net ? 6000 : 2000);
    // INP aproximado: abre o menu (mobile) ou clica no CTA do header (desktop) com cliques reais
    const target = await ev(`(() => { const el = ${P.mobile ? "document.querySelector('.site-header__menu-btn')" : "document.querySelector('.site-header__social')"}; const b = el.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; })()`);
    for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x: target.x, y: target.y, button: 'left', clickCount: 1 });
    await sleep(800);
    const end = await ev('JSON.parse(JSON.stringify(window.__perf))');
    const metrics = Object.fromEntries((await send('Performance.getMetrics')).metrics.map((m) => [m.name, m.value]));

    const tasksAfterFcp = end.tasks.filter(([start]) => end.fcp === null || start >= end.fcp - 1);
    const tbt = tasksAfterFcp.filter(([start]) => start <= (end.fcp ?? 0) + 10000).reduce((s, [, d]) => s + Math.max(0, d - 50), 0);
    const byType = {};
    for (const r of reqs.values()) { byType[r.type] ??= { n: 0, bytes: 0 }; byType[r.type].n++; byType[r.type].bytes += r.size; }
    const list = (types) => [...reqs.values()].filter((r) => types.includes(r.type)).map((r) => `${r.url.split('/').pop().split('?')[0].slice(0, 56)} ${r.size}`);
    out[name] = {
      fcpMs: Math.round(atLoad.fcp ?? -1), lcpMs: Math.round(atLoad.lcp ?? -1), lcpElement: atLoad.lcpEl,
      clsAtLoad: Number(atLoad.cls.toFixed(4)), clsAfterFullScroll: Number(end.cls.toFixed(4)),
      tbtMs: Math.round(tbt), longTasks: tasksAfterFcp.length, longestTaskMs: Math.max(0, ...end.tasks.map(([, d]) => d)),
      tasks: end.tasks.slice(0, 12),
      scriptMs: Math.round(metrics.ScriptDuration * 1000), taskMs: Math.round(metrics.TaskDuration * 1000),
      inpApproxMs: end.events.length ? Math.max(...end.events.map(([, d]) => d)) : 0, events: end.events.slice(0, 6),
      transferAtLoad: { bytes: loadBytes, requests: loadReqs }, transferTotal: { bytes: [...reqs.values()].reduce((s, r) => s + r.size, 0), requests: reqs.size },
      byType, fonts: list(['Font']), scripts: list(['Script']), stylesheets: list(['Stylesheet']), images: list(['Image']),
      consoleErrors: errors.slice(0, 4), wallMs: Date.now() - t0,
    };
  }
  ws.close();
} finally {
  chrome.kill();
}
const json = JSON.stringify(out, null, 2);
if (jsonOut) writeFileSync(jsonOut, json);
console.log(json);
