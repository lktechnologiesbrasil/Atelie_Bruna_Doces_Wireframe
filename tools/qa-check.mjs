// Verificações técnicas do QA em Chrome headless (CDP), com teclado real.
//
// Para cada largura: overflow horizontal, imagens quebradas/deformadas, erros de
// console, estado do header (transparente/sólido), links placeholder, âncoras,
// teclado (ordem de foco) e, abaixo de 1280px, o menu modal (foco preso, Esc,
// inert, retorno do foco, fechar ao navegar).
//
// Uso: node tools/qa-check.mjs <url> [larguras separadas por vírgula] [pasta-prints]
import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url = 'http://localhost:4331/', widthsArg = '1440,1290,1024,768,390', shotsDir] = process.argv.slice(2);
const WIDTHS = widthsArg.split(',').map(Number);
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9334;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
if (shotsDir) mkdirSync(shotsDir, { recursive: true });

const profile = mkdtempSync(join(tmpdir(), 'qa-check-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--hide-scrollbars', '--force-device-scale-factor=1', '--no-first-run', 'about:blank'], { stdio: 'ignore' });

const results = {};
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
  const consoleErrors = [];
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); return; }
    if (d.method === 'Runtime.exceptionThrown') consoleErrors.push(d.params.exceptionDetails.text + ' ' + (d.params.exceptionDetails.exception?.description ?? ''));
    if (d.method === 'Runtime.consoleAPICalled' && ['error', 'assert'].includes(d.params.type)) consoleErrors.push(d.params.args.map((a) => a.value ?? a.description).join(' '));
    if (d.method === 'Log.entryAdded' && d.params.entry.level === 'error') consoleErrors.push(d.params.entry.text + ' ' + (d.params.entry.url ?? ''));
  };
  const send = (method, params = {}) => new Promise((res, rej) => {
    const n = ++id;
    pending.set(n, (d) => (d.error ? rej(new Error(JSON.stringify(d.error))) : res(d.result)));
    ws.send(JSON.stringify({ id: n, method, params }));
  });
  const ev = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    return r.result.value;
  };
  const key = async (k, { shift = false } = {}) => {
    const code = { Tab: 9, Escape: 27, Enter: 13 }[k];
    const base = { key: k, code: k, windowsVirtualKeyCode: code, nativeVirtualKeyCode: code, modifiers: shift ? 8 : 0 };
    const text = k === 'Enter' ? { text: '\r', unmodifiedText: '\r' } : {};
    await send('Input.dispatchKeyEvent', { type: k === 'Enter' ? 'keyDown' : 'rawKeyDown', ...base, ...text });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', ...base });
    await sleep(120);
  };
  const focused = () => ev(`(() => { const a = document.activeElement; return a ? (a.className || a.tagName) + '|' + (a.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 24) : 'null'; })()`);

  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');

  for (const W of WIDTHS) {
    consoleErrors.length = 0;
    const H = W <= 768 ? 844 : 900;
    await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: W < 768 });
    await send('Page.navigate', { url });
    await sleep(2500);
    await ev(`document.documentElement.style.scrollBehavior='auto'; document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading='eager'); 1`);
    await ev(`Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; }))).then(() => 1)`);
    const r = {};

    // overflow
    r.overflow = await ev(`(() => { window.scrollTo(300, 0); const o = { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, scrollX: Math.round(scrollX) }; window.scrollTo(0, 0); return o; })()`);
    r.overflow.pass = r.overflow.scrollX === 0 && r.overflow.scrollWidth - r.overflow.clientWidth <= 1;
    r.overflowElements = await ev(`(() => { const cw = document.documentElement.clientWidth, o = []; document.querySelectorAll('body *').forEach(e => { if (e.closest('svg') || e.closest('[hidden]')) return; const b = e.getBoundingClientRect(); if (b.width > 0 && b.right > cw + 2 && getComputedStyle(e).position !== 'fixed') o.push((typeof e.className === 'string' ? e.className : e.tagName).slice(0, 40) + ' ' + Math.round(b.right)); }); return o.slice(0, 6); })()`);

    // imagens
    r.images = await ev(`(() => { const all = [...document.images]; const broken = all.filter(i => i.complete && i.naturalWidth === 0).length; const distorted = all.filter(i => { if (getComputedStyle(i).objectFit === 'cover') return false; const nr = i.naturalWidth / i.naturalHeight, rr = i.clientWidth / i.clientHeight; return i.clientHeight > 0 && Math.abs(nr - rr) / nr > 0.02; }).map(i => i.className + ' ' + i.naturalWidth + 'x' + i.naturalHeight + '→' + i.clientWidth + 'x' + i.clientHeight); return { total: all.length, broken, distorted }; })()`);

    // texto cortado
    r.clippedText = await ev(`(() => [...document.querySelectorAll('h1,h2,h3,p,a,span,li,figcaption')].filter(e => { const cs = getComputedStyle(e); return (cs.overflow === 'hidden' || cs.overflowX === 'hidden') && e.clientWidth > 2 && e.scrollWidth > e.clientWidth + 1 && !e.classList.contains('sr-only'); }).map(e => e.className.slice(0, 40)).slice(0, 6))()`);

    // tipografia e toque: texto visível < 12px e alvos interativos < 44px (só na altura útil)
    r.typography = await ev(`(() => {
      const small = new Map(); let min = 99;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const n = walker.currentNode; if (!n.textContent.trim()) continue;
        const el = n.parentElement; if (!el || el.closest('svg, script, style, [hidden], .sr-only, .claims__text') ) continue;
        const b = el.getBoundingClientRect(); if (b.width < 2 || b.height < 2) continue;
        const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') continue;
        const fs = parseFloat(cs.fontSize); min = Math.min(min, fs);
        if (fs < 11.95) small.set((el.className || el.tagName).toString().slice(0, 36), fs.toFixed(1));
      }
      const targets = [...document.querySelectorAll('a[href], button')].filter(e => { const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return b.width > 0 && cs.visibility !== 'hidden' && !e.closest('[hidden]') && !e.classList.contains('skip-link') && b.height < 43.5; }).map(e => (e.className || e.tagName).toString().slice(0, 30) + ' ' + Math.round(e.getBoundingClientRect().height));
      return { minFontPx: min, below12: [...small].slice(0, 8), targetsBelow44: targets.slice(0, 8) };
    })()`);

    // header
    r.header = await ev(`(async () => {
      const h = document.querySelector('.site-header'); const wait = (ms) => new Promise(r => setTimeout(r, ms));
      window.scrollTo(0, 0); await wait(500);
      const top = { surface: h.dataset.surface, h: Math.round(h.getBoundingClientRect().height), bg: getComputedStyle(h).backgroundColor, docH: document.documentElement.scrollHeight };
      window.scrollTo(0, 1500); await wait(900);
      const mid = { surface: h.dataset.surface, h: Math.round(h.getBoundingClientRect().height), bg: getComputedStyle(h).backgroundColor, docH: document.documentElement.scrollHeight, logoDark: getComputedStyle(h.querySelector('.logo--dark')).display };
      const bar = h.querySelector('.site-header__bar'), cs = getComputedStyle(bar);
      const act = h.querySelector('.site-header__actions').getBoundingClientRect();
      const fits = Math.round(act.right) <= Math.round(bar.getBoundingClientRect().right - parseFloat(cs.paddingRight)) + 2;
      window.scrollTo(0, 300); await wait(900);
      return { top, mid, backToClear: h.dataset.surface, actionsFit: fits, stable: top.docH === mid.docH };
    })()`);
    if (shotsDir) {
      await ev(`window.scrollTo(0, 0); 1`); await sleep(500);
      writeFileSync(join(shotsDir, `header-${W}-clear.png`), Buffer.from((await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: W, height: Math.min(H, 220), scale: 1 } })).data, 'base64'));
      await ev(`window.scrollTo(0, 1500); 1`); await sleep(900);
      writeFileSync(join(shotsDir, `header-${W}-solid.png`), Buffer.from((await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: W, height: 140, scale: 1 } })).data, 'base64'));
    }

    // links placeholder
    r.pendingLinks = await ev(`(() => { const a = [...document.querySelectorAll('a[data-link-status="pending"]')]; const prevented = a.filter(l => { const e = new MouseEvent('click', { bubbles: true, cancelable: true }); l.dispatchEvent(e); return e.defaultPrevented; }).length; return { total: a.length, preventedClick: prevented }; })()`);

    // âncoras
    r.anchors = await ev(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms)); const out = [];
      for (const a of document.querySelectorAll('.site-nav a[href^="#"], #site-menu a[href^="#"]')) {
        if (a.offsetParent === null) continue;
        const t = document.querySelector(a.getAttribute('href')); if (!t) { out.push([a.getAttribute('href'), 'ALVO AUSENTE']); continue; }
        window.scrollTo(0, 0); await wait(150); a.click(); await wait(300);
        out.push([a.getAttribute('href'), Math.round(t.getBoundingClientRect().top)]);
      }
      return out;
    })()`).catch((e) => String(e));

    // teclado: ordem de foco
    await send('Page.navigate', { url }); await sleep(1800);
    await ev(`document.activeElement && document.activeElement.blur(); window.scrollTo(0,0); 1`);
    const order = [];
    const steps = W < 1280 ? 5 : 12;
    for (let i = 0; i < steps; i++) { await key('Tab'); order.push(await focused()); }
    r.keyboardOrder = order;
    r.focusVisible = await ev(`(() => { const a = document.activeElement; const cs = getComputedStyle(a); return { outline: cs.outlineStyle + ' ' + cs.outlineWidth }; })()`);

    // menu mobile
    if (W < 1280) {
      await send('Page.navigate', { url }); await sleep(1800);
      await ev(`document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0, 1200); 1`); await sleep(400);
      const m = {};
      await ev(`document.querySelector('.site-header__menu-btn').focus(); 1`);
      await key('Enter');
      await sleep(200);
      m.afterOpen = await ev(`({ hidden: document.querySelector('#site-menu').hidden, expanded: document.querySelector('.site-header__menu-btn').getAttribute('aria-expanded'), mainInert: document.querySelector('main').inert, htmlClass: document.documentElement.className, overflow: getComputedStyle(document.documentElement).overflow, focus: document.activeElement.className })`);
      const seen = new Set(); let escaped = false;
      for (let i = 0; i < 12; i++) { await key('Tab'); const inMenu = await ev(`!!document.activeElement.closest('#site-menu')`); if (!inMenu) escaped = true; seen.add(await focused()); }
      await key('Tab', { shift: true });
      m.focusTrap = { escaped, distinctStops: seen.size, shiftTabInMenu: await ev(`!!document.activeElement.closest('#site-menu')`) };
      await key('Escape');
      m.afterEsc = await ev(`({ hidden: document.querySelector('#site-menu').hidden, expanded: document.querySelector('.site-header__menu-btn').getAttribute('aria-expanded'), mainInert: document.querySelector('main').inert, focusBackOnButton: document.activeElement === document.querySelector('.site-header__menu-btn'), scrollY: Math.round(scrollY) })`);
      await key('Enter'); await sleep(200);
      await ev(`document.querySelector('#site-menu a[href="#criacoes"]').click(); 1`); await sleep(900);
      m.afterLink = await ev(`({ hidden: document.querySelector('#site-menu').hidden, mainInert: document.querySelector('main').inert, hash: location.hash, targetTop: Math.round(document.querySelector('#criacoes').getBoundingClientRect().top) })`);
      r.menu = m;
    }

    if (shotsDir) {
      await send('Page.navigate', { url }); await sleep(1800);
      await ev(`document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading='eager'); 1`); await sleep(800);
      writeFileSync(join(shotsDir, `viewport-${W}-top.png`), Buffer.from((await send('Page.captureScreenshot', { format: 'png' })).data, 'base64'));
    }
    r.consoleErrors = [...consoleErrors];
    results[W] = r;
  }
  ws.close();
} finally {
  chrome.kill();
}
console.log(JSON.stringify(results, null, 2));
