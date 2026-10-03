// Quadros do motion em Chrome headless: Hero em 3 instantes, jornada em 3 posições e CTA final.
// Uso: node tools/qa-frames.mjs <largura> <altura> <prefixo-de-saida>  (grava <prefixo>-<nome>.png)
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const [W, H, outPrefix] = [Number(process.argv[2]), Number(process.argv[3]), process.argv[4]];
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--remote-debugging-port=9338', `--user-data-dir=${mkdtempSync(join(tmpdir(), 'fr-'))}`, '--hide-scrollbars', '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' });
try {
  let t; for (let i = 0; i < 50; i++) { try { t = await (await fetch('http://127.0.0.1:9338/json/list')).json(); if (t.length) break; } catch {} await sleep(200); }
  const ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
  let id = 0; const p = new Map(); ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && p.has(d.id)) { p.get(d.id)(d); p.delete(d.id); } };
  const send = (method, params = {}) => new Promise((res) => { const n = ++id; p.set(n, res); ws.send(JSON.stringify({ id: n, method, params })); });
  const ev = async (e) => (await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true })).result.result?.value;
  const shot = async (name) => writeFileSync(`${outPrefix}-${name}.png`, Buffer.from((await send('Page.captureScreenshot', { format: 'png' })).result.data, 'base64'));
  await send('Page.enable');
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: W < 768 });
  await send('Page.navigate', { url: 'http://localhost:4331/' });
  await sleep(500); await shot('hero-a');
  await sleep(500); await shot('hero-b');
  await sleep(2600); await shot('hero-c');
  await ev(`document.documentElement.style.scrollBehavior='auto'; 1`);
  // jornada: três posições
  const top = await ev(`document.querySelector('.journey').getBoundingClientRect().top + scrollY`);
  const hh = await ev(`document.querySelector('.journey').getBoundingClientRect().height`);
  for (const [name, f] of [['j1', -0.15], ['j2', 0.25], ['j3', 0.6]]) {
    await ev(`window.scrollTo(0, ${top} + ${hh} * ${f} - 120)`); await sleep(1800); await shot(name);
  }
  // CTA final: logo ao entrar e depois
  const cta = await ev(`document.querySelector('#contato').getBoundingClientRect().top + scrollY`);
  await ev(`window.scrollTo(0, ${cta} - ${H} * 0.55)`); await sleep(900); await shot('cta-a');
  await sleep(2600); await shot('cta-b');
} finally { chrome.kill(); }
