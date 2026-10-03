// QA do motion em Chrome headless (CDP).
//
// Por largura (padrão 1440, 768, 390): o motion sobe, nº de ScrollTriggers, CLS,
// nenhum elemento preso invisível depois de rolar a página inteira, resize
// atravessando o breakpoint, reload e erros de console. Depois, movimento
// reduzido (no carregamento e alternado com a página aberta).
//
// Uso: node tools/qa-motion.mjs <url> [larguras]
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url = 'http://localhost:4331/', widthsArg = '1440,768,390'] = process.argv.slice(2);
const WIDTHS = widthsArg.split(',').map(Number);
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9336;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'qa-motion-'))}`,
  '--hide-scrollbars', '--force-device-scale-factor=1', '--no-first-run', 'about:blank'], { stdio: 'ignore' });

const out = {};
try {
  let targets;
  for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (targets.length) break; } catch {} await sleep(200); }
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const pend = new Map(); const errors = [];
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); return; }
    if (d.method === 'Runtime.exceptionThrown') errors.push(d.params.exceptionDetails.text + ' ' + (d.params.exceptionDetails.exception?.description ?? ''));
    if (d.method === 'Runtime.consoleAPICalled' && ['error', 'assert', 'warning'].includes(d.params.type)) errors.push(d.params.type + ': ' + d.params.args.map((a) => a.value ?? a.description).join(' '));
    if (d.method === 'Log.entryAdded' && ['error', 'warning'].includes(d.params.entry.level)) errors.push(d.params.entry.level + ': ' + d.params.entry.text + ' ' + (d.params.entry.url ?? ''));
  };
  const send = (method, params = {}) => new Promise((res, rej) => { const n = ++id; pend.set(n, (d) => (d.error ? rej(new Error(JSON.stringify(d.error))) : res(d.result))); ws.send(JSON.stringify({ id: n, method, params })); });
  const ev = async (expression) => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text); return r.result.value; };

  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `window.__cls = 0; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); } catch (e) {}` });

  // varre a página devagar e depois confere se algo ficou escondido
  const sweep = `(async () => { const w = (ms) => new Promise(r => setTimeout(r, ms)); document.documentElement.style.scrollBehavior = 'auto';
    const H = document.documentElement.scrollHeight; for (let y = 0; y <= H; y += 280) { window.scrollTo(0, y); await w(110); }
    await w(3200); window.scrollTo(0, 0); return H; })()`;
  const audit = `(() => {
    const bad = []; const op = (el, label) => { const o = parseFloat(getComputedStyle(el).opacity); if (o < 0.95) bad.push(label + ' opacity=' + o.toFixed(2)); };
    document.querySelectorAll('.h1, main .h2').forEach((h, i) => { op(h, 'title#' + i); h.querySelectorAll('.line__in').forEach((l, j) => { const t = new DOMMatrix(getComputedStyle(l).transform).m42; if (Math.abs(t) > 1) bad.push('line#' + i + '.' + j + ' ty=' + t.toFixed(0)); }); });
    const sel = ['main .eyebrow', '.hero__lead', '.hero__inner .btn', 'main .split__body', 'main .split__cta', '.cta-actions > *', '.step__num', '.step__title', '.step__text .t1', '.hero__photo', 'main .quote'];
    sel.forEach((s) => document.querySelectorAll(s).forEach((el, i) => op(el, s + '#' + i)));
    document.querySelectorAll('main .media img').forEach((img, i) => { const c = getComputedStyle(img).clipPath; if (c !== 'none' && /100%/.test(c)) bad.push('media#' + i + ' clip=' + c); });
    const dash = [...document.querySelectorAll('.journey__line path')].filter((p) => getComputedStyle(p.ownerSVGElement).display !== 'none').map((p) => parseFloat(getComputedStyle(p).strokeDashoffset));
    return { bad: bad.slice(0, 8), badCount: bad.length, dashOffset: dash };
  })()`;
  const state = `({ ready: document.documentElement.classList.contains('motion-ready'), live: document.documentElement.classList.contains('motion-live'), triggers: window.__motion ? window.__motion.triggers() : null, masks: document.querySelectorAll('.line__in').length, cls: Number((window.__cls || 0).toFixed(4)), h: document.documentElement.scrollHeight })`;

  for (const W of WIDTHS) {
    errors.length = 0;
    const r = {};
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
    await send('Emulation.setDeviceMetricsOverride', { width: W, height: W < 768 ? 844 : 900, deviceScaleFactor: 1, mobile: W < 768 });
    await send('Page.navigate', { url }); await sleep(900);
    r.atFirstPaint = await ev(`({ ready: document.documentElement.classList.contains('motion-ready'), h1Opacity: getComputedStyle(document.querySelector('.h1')).opacity })`);
    await sleep(3200);
    r.afterLoad = await ev(state);
    r.heroVisible = await ev(`({ h1: getComputedStyle(document.querySelector('.h1')).opacity, lead: getComputedStyle(document.querySelector('.hero__lead')).opacity, btn: getComputedStyle(document.querySelector('.hero__inner .btn')).opacity, photo: getComputedStyle(document.querySelector('.hero__photo')).opacity })`);
    await ev(sweep);
    r.afterSweep = await ev(state);
    r.audit = await ev(audit);

    // resize atravessando o breakpoint e voltando
    const other = W >= 900 ? 390 : 1440;
    await send('Emulation.setDeviceMetricsOverride', { width: other, height: other < 768 ? 844 : 900, deviceScaleFactor: 1, mobile: other < 768 });
    await sleep(1200);
    r.resizedTo = other; r.afterResize = await ev(state);
    await ev(sweep);
    r.auditAfterResize = await ev(audit);
    await send('Emulation.setDeviceMetricsOverride', { width: W, height: W < 768 ? 844 : 900, deviceScaleFactor: 1, mobile: W < 768 });
    await sleep(1200); r.afterResizeBack = await ev(state);

    // reload com a página já rolada
    await ev(`window.scrollTo(0, 3000); 1`);
    await send('Page.reload'); await sleep(4200);
    r.afterReload = await ev(state);
    r.consoleErrors = [...errors];
    out[W] = r;
  }

  // movimento reduzido: no carregamento
  errors.length = 0;
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await send('Page.navigate', { url }); await sleep(2500);
  out.reducedAtLoad = { state: await ev(state), audit: await ev(audit) };
  // movimento reduzido: alternado com a página aberta
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await send('Page.navigate', { url }); await sleep(3500);
  const before = await ev(state);
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await sleep(800);
  out.reducedToggled = { before, after: await ev(state), audit: await ev(audit), consoleErrors: [...errors] };

  // sem JavaScript: o conteúdo precisa estar completo
  await send('Emulation.setScriptExecutionDisabled', { value: true });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await send('Page.navigate', { url }); await sleep(2500);
  out.noJs = await ev(`({ ready: document.documentElement.classList.contains('motion-ready'), h1: getComputedStyle(document.querySelector('.h1')).opacity, h2s: [...document.querySelectorAll('main .h2')].every((h) => getComputedStyle(h).opacity === '1'), imgs: [...document.querySelectorAll('main .media img')].every((i) => getComputedStyle(i).clipPath === 'none'), body: getComputedStyle(document.querySelector('.split__body')).opacity })`).catch((e) => String(e));
  await send('Emulation.setScriptExecutionDisabled', { value: false });
  ws.close();
} finally {
  chrome.kill();
}
console.log(JSON.stringify(out, null, 2));
