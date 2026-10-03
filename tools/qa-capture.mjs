// Captura full-page determinística para o QA visual (sem IA, sem toolbar de dev).
//
// Chrome headless via DevTools Protocol, DPR 1. A página é rolada em trechos do
// viewport (captura única de 8000px+ deixa de pintar camadas com máscara no fim)
// e costurada com sharp. O header sticky só aparece no primeiro trecho.
//
// Uso: node tools/qa-capture.mjs <url> <largura> <saida.webp> [secoes.json]
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

const [url = 'http://localhost:4331/', width = '1440', out = 'impl.webp', sectionsOut] = process.argv.slice(2);
const W = Number(width);
const VH = 900;
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9333;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = mkdtempSync(join(tmpdir(), 'qa-chrome-'));
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--hide-scrollbars', '--force-device-scale-factor=1', '--no-first-run', '--disable-gpu-vsync', 'about:blank',
], { stdio: 'ignore' });

try {
  let targets;
  for (let i = 0; i < 50; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (targets.length) break; } catch {}
    await sleep(200);
  }
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
  const send = (method, params = {}) => new Promise((res, rej) => {
    const n = ++id;
    pending.set(n, (d) => (d.error ? rej(new Error(JSON.stringify(d.error))) : res(d.result)));
    ws.send(JSON.stringify({ id: n, method, params }));
  });
  const ev = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: VH, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url });
  await sleep(2500);

  // sem toolbar de dev, sem smooth scroll, imagens carregadas
  await ev(`(() => {
    const s = document.createElement('style');
    s.textContent = 'astro-dev-toolbar{display:none!important} html{scroll-behavior:auto!important}';
    document.head.append(s);
    document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager');
  })()`);
  await ev(`Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; })))`);
  await ev(`document.fonts.ready.then(() => 1)`);
  await sleep(800);

  const H = await ev('document.documentElement.scrollHeight');
  const sections = await ev(`[...document.querySelectorAll('main > section, footer')].map(s => { const b = s.getBoundingClientRect(); return { id: s.id || s.tagName.toLowerCase(), top: Math.round(b.top + scrollY), h: Math.round(b.height) }; })`);

  const chunks = [];
  for (let y = 0; y < H; y += VH) {
    const top = Math.min(y, Math.max(0, H - VH));
    await ev(`window.scrollTo(0, ${top}); 1`);
    if (y > 0) await ev(`document.querySelector('.site-header').style.visibility = 'hidden'; 1`);
    await sleep(450);
    const actual = await ev('Math.round(window.scrollY)');
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    chunks.push({ top: actual, buf: Buffer.from(data, 'base64') });
  }

  const H2 = await ev('document.documentElement.scrollHeight');
  if (H2 !== H) console.warn('AVISO: altura mudou durante a captura', H, H2);
  console.log('scrollY reais:', chunks.map((k) => k.top).join(','));

  const base = sharp({ create: { width: W, height: H, channels: 3, background: '#fff' } });
  const composed = await base.composite(chunks.map((c) => ({ input: c.buf, left: 0, top: c.top }))).webp({ quality: 88, effort: 5 }).toBuffer();
  writeFileSync(out, composed);
  if (sectionsOut) writeFileSync(sectionsOut, JSON.stringify({ width: W, height: H, sections }, null, 2));
  console.log(`OK ${out} ${W}x${H}`);
  ws.close();
} finally {
  chrome.kill();
}
