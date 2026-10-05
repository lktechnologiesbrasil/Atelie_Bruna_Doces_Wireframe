// Captura a seção #bruna (sem motion) em larguras fixas, e mede overflow/CLS/imagem.
// Uso: node docs/qa/bruna-portrait/shot-section.mjs <url> <prefixo>
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url = 'http://localhost:4400/', prefix = 'after'] = process.argv.slice(2);
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9344;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const profile = mkdtempSync(join(tmpdir(), 'qa-bruna-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--hide-scrollbars', '--force-device-scale-factor=1', '--no-first-run', 'about:blank'], { stdio: 'ignore' });
try {
  let targets;
  for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (targets.length) break; } catch {} await sleep(200); }
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const pending = new Map();
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
  const send = (method, params = {}) => new Promise((res, rej) => { const n = ++id; pending.set(n, (d) => (d.error ? rej(new Error(JSON.stringify(d.error))) : res(d.result))); ws.send(JSON.stringify({ id: n, method, params })); });
  const ev = async (e) => { const r = await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails.exception?.description ?? r.exceptionDetails)); return r.result.value; };
  await send('Page.enable');
  const report = {};
  for (const [w, h, mobile] of [[1440, 900, false], [1024, 800, false], [768, 900, false], [430, 900, true], [390, 844, true], [360, 800, true]]) {
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile });
    await send('Page.navigate', { url }); await sleep(2200);
    await ev(`(() => { const s = document.createElement('style'); s.textContent='astro-dev-toolbar{display:none!important} html{scroll-behavior:auto!important}'; document.head.append(s); document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager'); })()`);
    await ev(`Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; })))`);
    const m = await ev(`(() => { const s = document.querySelector('#bruna'); const r = s.getBoundingClientRect(); const img = s.querySelector('.media2 img'); const ir = img.getBoundingClientRect(); return { top: r.top + scrollY, height: r.height, overflowX: document.documentElement.scrollWidth - innerWidth, img: { w: img.getAttribute('width'), h: img.getAttribute('height'), nat: img.naturalWidth + 'x' + img.naturalHeight, box: Math.round(ir.width) + 'x' + Math.round(ir.height), loading: img.loading, src: img.currentSrc.split('/').pop(), pos: getComputedStyle(img).objectPosition, alt: img.alt } }; })()`);
    report[w] = m;
    await ev(`window.scrollTo(0, ${Math.max(0, Math.round(m.top) - 40)})`); await sleep(400);
    const vh = Math.min(Math.ceil(m.height) + 80, 2400);
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: vh, deviceScaleFactor: 1, mobile });
    await sleep(500);
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, clip: { x: 0, y: Math.max(0, m.top - 40), width: w, height: vh, scale: 1 } });
    writeFileSync(`docs/qa/bruna-portrait/${prefix}-${w}.png`, Buffer.from(shot.data, 'base64'));
  }
  writeFileSync(`docs/qa/bruna-portrait/${prefix}-metrics.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { chrome.kill(); }
