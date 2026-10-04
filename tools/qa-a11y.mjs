// Auditoria de acessibilidade em Chrome headless (CDP). Sem dependências extras.
//
// Checa: idioma/título, landmarks, hierarquia de títulos, nomes acessíveis de
// links e botões, alt de imagens, IDs duplicados, alvos de aria-controls, links
// pendentes (aria-disabled) e CONTRASTE calculado (texto × fundo sólido mais próximo;
// texto sobre foto/gradiente é listado à parte para revisão manual).
//
// Uso: node tools/qa-a11y.mjs [url] [larguras]
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url = 'http://localhost:4332/', widthsArg = '1440,390'] = process.argv.slice(2);
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9343;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'qa-a11y-'))}`, '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });

const PAGE_AUDIT = `(() => {
  const out = { doc: {}, landmarks: [], headings: [], headingJumps: [], images: { total: 0, noAlt: [], emptyAlt: 0 }, names: [], dupIds: [], ariaControls: [], pending: [], contrast: { fail: [], overMedia: 0, checked: 0 } };
  out.doc = { lang: document.documentElement.lang, title: document.title, robots: document.querySelector('meta[name=robots]')?.content, h1: document.querySelectorAll('h1').length, skipLink: !!document.querySelector('a.skip-link[href^="#"]'), skipTarget: !!document.querySelector(document.querySelector('a.skip-link')?.getAttribute('href') || '#_') };
  const lm = [['header, [role=banner]', 'banner'], ['nav', 'nav'], ['main', 'main'], ['footer, [role=contentinfo]', 'contentinfo'], ['[role=dialog]', 'dialog']];
  lm.forEach(([sel, name]) => document.querySelectorAll(sel).forEach((el) => out.landmarks.push(name + (el.getAttribute('aria-label') ? ' "' + el.getAttribute('aria-label') + '"' : ''))));
  let prev = 0;
  document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((h) => { const l = Number(h.tagName[1]); out.headings.push('h' + l + ' ' + h.textContent.trim().replace(/\\s+/g, ' ').slice(0, 34)); if (prev && l > prev + 1) out.headingJumps.push('h' + prev + '->h' + l + ' ' + h.textContent.trim().slice(0, 24)); prev = l; });
  document.querySelectorAll('img').forEach((i) => { out.images.total++; if (!i.hasAttribute('alt')) out.images.noAlt.push(i.src.split('/').pop().slice(0, 40)); else if (i.alt === '') out.images.emptyAlt++; });
  const nameOf = (el) => (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') && document.getElementById(el.getAttribute('aria-labelledby'))?.textContent || el.textContent || '').trim().replace(/\\s+/g, ' ');
  document.querySelectorAll('a[href], button').forEach((el) => { const n = nameOf(el) || (el.querySelector('img[alt]:not([alt=""])') ? 'img' : ''); if (!n) out.names.push((el.className || el.tagName).toString().slice(0, 40)); });
  const ids = {}; document.querySelectorAll('[id]').forEach((el) => { ids[el.id] = (ids[el.id] || 0) + 1; }); out.dupIds = Object.entries(ids).filter(([, n]) => n > 1).map(([id]) => id);
  document.querySelectorAll('[aria-controls]').forEach((el) => { if (!document.getElementById(el.getAttribute('aria-controls'))) out.ariaControls.push(el.getAttribute('aria-controls')); });
  document.querySelectorAll('a[data-link-status="pending"]').forEach((a) => out.pending.push({ text: a.textContent.trim().slice(0, 24), ariaDisabled: a.getAttribute('aria-disabled') }));

  // ----- contraste -----
  const parse = (c) => { const m = c.match(/rgba?\\(([^)]+)\\)/); if (!m) return null; const p = m[1].split(/[ ,\\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] }; };
  const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
  const bgOf = (el) => { let n = el; while (n && n !== document.documentElement) { const cs = getComputedStyle(n); if (cs.backgroundImage !== 'none') return null; const c = parse(cs.backgroundColor); if (c && c.a > 0.95) return c; if (c && c.a > 0) { const under = bgOf(n.parentElement); return under ? over(c, under) : null; } n = n.parentElement; } const root = parse(getComputedStyle(document.body).backgroundColor); return root && root.a > 0 ? root : { r: 255, g: 255, b: 255, a: 1 }; };
  const seen = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const n = walker.currentNode; if (!n.textContent.trim()) continue; const el = n.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
    if (el.closest('svg, script, style, [hidden], [aria-hidden="true"], .sr-only, .claims__text')) continue;
    const b = el.getBoundingClientRect(); if (b.width < 2 || b.height < 2) continue; const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    let op = 1; for (let a = el; a; a = a.parentElement) op *= parseFloat(getComputedStyle(a).opacity); if (op < 0.1) continue;
    const fg = parse(cs.color); if (!fg) continue; const bg = bgOf(el);
    if (!bg) { out.contrast.overMedia++; continue; }
    const fgc = over({ ...fg, a: fg.a * op }, bg); const l1 = lum(fgc), l2 = lum(bg); const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700; const large = size >= 24 || (size >= 18.66 && bold);
    out.contrast.checked++;
    if (ratio < (large ? 3 : 4.5)) out.contrast.fail.push({ ratio: Number(ratio.toFixed(2)), need: large ? 3 : 4.5, size: Math.round(size), text: n.textContent.trim().slice(0, 28), cls: (el.className || el.tagName).toString().slice(0, 34), fg: cs.color, bg: 'rgb(' + [bg.r, bg.g, bg.b].map(Math.round).join(',') + ')' });
  }
  return out;
})()`;

const out = {};
try {
  let targets;
  for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (targets.length) break; } catch {} await sleep(200); }
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const pend = new Map();
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
  const send = (method, params = {}) => new Promise((res) => { const n = ++id; pend.set(n, (d) => res(d.result)); ws.send(JSON.stringify({ id: n, method, params })); });
  const ev = async (expression) => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text); return r.result.value; };
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }); // estados finais, sem animação em curso
  for (const W of widthsArg.split(',').map(Number)) {
    await send('Emulation.setDeviceMetricsOverride', { width: W, height: 900, deviceScaleFactor: 1, mobile: W < 768 });
    await send('Page.navigate', { url }); await sleep(2500);
    out[W] = await ev(PAGE_AUDIT);
  }
  ws.close();
} finally {
  chrome.kill();
}
console.log(JSON.stringify(out, null, 2));
