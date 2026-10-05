// QA funcional de /produtos em Chrome headless (CDP, sem dependências extras).
//
// Dados: 17 grupos/54 produtos renderizados, promoções, opções, "a partir de" do Açaí, fallback sem imagem,
// links do Yooga. Interação: busca (com e sem acento, vazio, limpar), categoria, "Todos", teclado.
// Ambiente: overflow por largura, reduced-motion, sem JS, motion ligado (cards nunca presos invisíveis), CLS, console.
//
// Uso (com `npm run build && npm run preview -- --port 4332`):
//   node docs/qa/products-page/qa-products.mjs [url] [saida.json]
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const URL_ = process.argv[2] ?? 'http://localhost:4332/produtos';
const OUT = process.argv[3] ?? 'docs/qa/products-page/qa-products.json';
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9360;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'qa-pp-'))}`, '--hide-scrollbars', '--force-device-scale-factor=1', '--no-first-run', 'about:blank'], { stdio: 'ignore' });

const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok: Boolean(ok), detail }); console.log((ok ? 'PASS ' : 'FAIL ') + name + (detail ? '  ' + detail : '')); };

try {
  let targets;
  for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (targets.length) break; } catch {} await sleep(200); }
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const pending = new Map(); const consoleErrors = [];
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); }
    if (d.method === 'Runtime.exceptionThrown') consoleErrors.push('EXC ' + (d.params.exceptionDetails.exception?.description ?? d.params.exceptionDetails.text));
    if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') consoleErrors.push('console.error ' + d.params.args.map((a) => a.value ?? a.description).join(' '));
    if (d.method === 'Log.entryAdded' && d.params.entry.level === 'error') consoleErrors.push('LOG ' + d.params.entry.text + ' ' + (d.params.entry.url ?? ''));
  };
  const send = (method, params = {}, ms = 20000) => Promise.race([
    new Promise((res, rej) => { const n = ++id; pending.set(n, (d) => (d.error ? rej(new Error(JSON.stringify(d.error))) : res(d.result))); ws.send(JSON.stringify({ id: n, method, params })); }),
    new Promise((_, rej) => setTimeout(() => rej(new Error('TIMEOUT ' + method)), ms)),
  ]);
  const ev = async (e) => { const r = await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
  const clsHook = `window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });`;
  await send('Page.addScriptToEvaluateOnNewDocument', { source: clsHook });

  const open = async ({ width = 1440, height = 900, motion = false, js = true } = {}) => {
    consoleErrors.length = 0;
    await send('Emulation.setScriptExecutionDisabled', { value: !js });
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: motion ? 'no-preference' : 'reduce' }] });
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 700 });
    await send('Page.navigate', { url: URL_ }); await sleep(3500);
    if (js) await ev(`document.documentElement.style.scrollBehavior = 'auto'; 1`);
  };

  // ---------------- dados renderizados (desktop, reduced-motion) ----------------
  await open({});
  const data = await ev(`(() => {
    const q = (s) => [...document.querySelectorAll(s)];
    const acai = q('.pcard').find((c) => c.querySelector('.pcard__name')?.textContent.includes('Açaí'));
    return {
      cards: q('.pcard').length, items: q('li[data-search]').length, groups: q('[data-group]').length, rail: q('[data-rail-link]').length,
      promo: q('[data-promo]').length, promoNames: q('[data-promo] .pcard__name').map((e) => e.textContent.trim()),
      opts: q('.pcard__opts').length, fallbacks: q('.pcard__fallback').length, fallbackNames: q('.pcard__fallback-name').map((e) => e.textContent.trim()),
      acai: acai ? acai.querySelector('.pcard__price').textContent.replace(/\\s+/g, ' ').trim() : null,
      acaiHasOpts: !!acai?.querySelector('.pcard__opts'),
      stats: document.querySelector('.pintro__stats').textContent.replace(/\\s+/g, ' ').trim(),
      ctaHrefs: [...new Set(q('.pcard__cta').map((a) => a.href))], ctaTargets: [...new Set(q('.pcard__cta').map((a) => a.target + '|' + a.rel))], ctaCount: q('.pcard__cta').length,
      utility: document.querySelector('.putility')?.textContent.replace(/\\s+/g, ' ').trim(),
      gift: document.querySelector('.pgift')?.textContent.replace(/\\s+/g, ' ').trim().slice(0, 140),
      cakes: { text: document.querySelector('.pcakes')?.textContent.replace(/\\s+/g, ' ').trim(), cta: document.querySelector('[data-cakes-cta]')?.getAttribute('href'), mode: document.querySelector('[data-cakes-cta]')?.dataset.cakesCta, prices: /R\\$/.test(document.querySelector('.pcakes')?.textContent ?? '') },
      robots: document.querySelector('meta[name=robots]')?.content, title: document.title,
      navCurrent: document.querySelector('.site-nav [aria-current=page]')?.textContent, h1: document.querySelectorAll('h1').length,
      imgsNoSize: q('.pcard img, .prail img').filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).length,
      imgsLazy: q('.pcard img').filter((i) => i.getAttribute('loading') === 'lazy').length,
      imgsNoAlt: q('img').filter((i) => i.getAttribute('alt') === null).length,
      brokenImgs: q('img').filter((i) => i.complete && i.naturalWidth === 0).length,
      footerNav: [...document.querySelectorAll('.footer__nav a')].map((a) => a.getAttribute('href')),
      headerNav: [...document.querySelectorAll('.site-nav a')].map((a) => a.getAttribute('href')),
    };
  })()`);
  check('17 grupos no DOM (14 comida + bebidas + presente + serviço)', data.groups === 17, `groups=${data.groups}`);
  check('53 cards + 1 item de serviço = 54 produtos', data.cards === 53 && data.items === 54, `cards=${data.cards} items=${data.items}`);
  check('stats derivados dos dados: "54 produtos em 17 categorias"', /54 produtos/.test(data.stats) && /17 categorias/.test(data.stats), data.stats);
  check('trilho: Todos + 16 categorias (sem utility)', data.rail === 17, `rail=${data.rail}`);
  check('4 promoções (original riscado + promocional)', data.promo === 4, data.promoNames.join(' | '));
  check('7 produtos com "Possui opções"', data.opts === 7, `opts=${data.opts}`);
  check('Açaí: "A partir de R$ 19,50" (derivado dos grupos) e com opções', /A partir de/.test(data.acai) && /19,50/.test(data.acai) && !/16,00/.test(data.acai) && data.acaiHasOpts, data.acai);
  check('2 fallbacks de imagem (Cookie tradicional, Geladinho Sensação)', data.fallbacks === 2, data.fallbackNames.join(' | '));
  check('todos os CTAs → cardápio Yooga geral, nova aba, noopener', data.ctaHrefs.length === 1 && data.ctaHrefs[0] === 'https://delivery.yooga.app/ateliedocesbruna' && data.ctaTargets.every((t) => t.startsWith('_blank|') && /noopener/.test(t)) && data.ctaCount === 53, `${data.ctaHrefs.join(',')} n=${data.ctaCount}`);
  check('garfinho (utility) continua na página', /garfinho/i.test(data.utility) && /0,01/.test(data.utility), data.utility);
  check('cartão presente (gift) vem dos dados', /Presentear/.test(data.gift) && /Cartão presente/.test(data.gift), data.gift);
  check('Menu de Bolos pendente: nenhum preço/bolo listado, CTA = WhatsApp (documentado)', !data.cakes.prices && data.cakes.mode === 'whatsapp-fallback' && /wa\.me/.test(data.cakes.cta), `${data.cakes.mode} ${data.cakes.cta}`);
  check('noindex, nofollow mantido', /noindex/.test(data.robots) && /nofollow/.test(data.robots), data.robots);
  check('título "Produtos | Ateliê Doces Bruna"', data.title === 'Produtos | Ateliê Doces Bruna', data.title);
  check('Header: Produtos ativo (aria-current=page)', /Produtos/i.test(data.navCurrent ?? ''), data.navCurrent);
  check('Header/Footer: âncoras da Home prefixadas com "/"', data.headerNav.filter((h) => h.startsWith('#')).length === 0 && data.footerNav.filter((h) => h.startsWith('#')).length === 0, data.headerNav.join(' '));
  check('um único h1', data.h1 === 1);
  check('imagens com width/height, lazy nos cards, alt presente, nenhuma quebrada', data.imgsNoSize === 0 && data.imgsLazy === 53 && data.imgsNoAlt === 0 && data.brokenImgs === 0, `semTamanho=${data.imgsNoSize} lazy=${data.imgsLazy} semAlt=${data.imgsNoAlt} quebradas=${data.brokenImgs}`);
  check('reduced-motion: cards visíveis, motion-ready ausente', await ev(`!document.documentElement.classList.contains('motion-ready') && [...document.querySelectorAll('.pcard')].every((c) => getComputedStyle(c).opacity === '1')`));

  // ---------------- busca ----------------
  const visibleItems = `[...document.querySelectorAll('li[data-search]')].filter((l) => !l.hidden).map((l) => l.querySelector('.pcard__name, .putility__name span')?.textContent.trim())`;
  const type = async (text) => { await ev(`(() => { const i = document.querySelector('[data-search-input]'); i.value = ${JSON.stringify(text)}; i.dispatchEvent(new Event('input', { bubbles: true })); })()`); };
  check('busca visível com JS', await ev(`!document.querySelector('[data-search-wrap]').hidden`));
  await type('acai'); let v = await ev(visibleItems);
  check('busca "acai" (sem acento) acha o Açaí', v.length === 1 && /Açaí/.test(v[0]), v.join(' | '));
  await type('AÇAÍ'); v = await ev(visibleItems);
  check('busca "AÇAÍ" (maiúsculas/acento) acha o Açaí', v.length === 1, v.join(' | '));
  await type('nutella'); v = await ev(visibleItems);
  check('busca por descrição ("nutella")', v.length >= 8, `${v.length} resultados`);
  await type('geladinho'); v = await ev(visibleItems);
  check('busca por categoria/nome ("geladinho")', v.length === 5, `${v.length}`);
  await type('enroladinho'); v = await ev(visibleItems);
  check('busca pelo nome de exibição corrigido ("enroladinho")', v.length === 1, v.join(' | '));
  await type('salchicha'); v = await ev(visibleItems);
  check('busca pela grafia de origem ("salchicha") também acha', v.length === 1, v.join(' | '));
  await type('garfinho'); v = await ev(visibleItems);
  check('busca acha o item de serviço ("garfinho")', v.length === 1, v.join(' | '));
  const status = await ev(`document.querySelector('[data-results]').textContent`);
  check('busca: mensagem de resultados', /Resultados para/.test(status), status);
  await type('zzzxyz');
  check('0 resultados: "Nenhuma criação encontrada." + botão', await ev(`!document.querySelector('[data-empty]').hidden && /Nenhuma criação encontrada\\./.test(document.querySelector('[data-empty]').textContent) && document.querySelectorAll('[data-group]:not([hidden])').length === 0`));
  await ev(`document.querySelector('[data-reset]').click()`);
  check('"Ver todos os produtos" restaura os 54 e limpa a busca', await ev(`document.querySelectorAll('li[data-search]:not([hidden])').length === 54 && document.querySelector('[data-search-input]').value === '' && document.querySelector('[data-empty]').hidden`));
  await type('cookie'); await ev(`document.querySelector('[data-search-input]').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))`);
  check('Esc limpa a busca', await ev(`document.querySelectorAll('li[data-search]:not([hidden])').length === 54`));

  // ---------------- categorias ----------------
  await ev(`document.querySelector('[data-rail-link="fatias-de-bolo"]').click()`); await sleep(900);
  const cat = await ev(`(() => { const g = document.getElementById('fatias-de-bolo'); return { top: Math.round(g.getBoundingClientRect().top), cur: document.querySelector('[data-rail-link][aria-current]')?.dataset.railLink, hash: location.hash }; })()`);
  check('categoria: rola até a seção e marca o item atual', cat.top >= 0 && cat.top < 200 && cat.cur === 'fatias-de-bolo' && cat.hash === '#fatias-de-bolo', JSON.stringify(cat));
  await type('cookie');
  await ev(`document.querySelector('[data-rail-link="acai"]').click()`); await sleep(900);
  const cat2 = await ev(`({ q: document.querySelector('[data-search-input]').value, vis: document.querySelectorAll('li[data-search]:not([hidden])').length, top: Math.round(document.getElementById('acai').getBoundingClientRect().top) })`);
  check('categoria durante a busca: limpa a busca e rola', cat2.q === '' && cat2.vis === 54 && cat2.top >= 0 && cat2.top < 200, JSON.stringify(cat2));
  await ev(`document.querySelector('[data-rail-link="all"]').click()`); await sleep(900);
  const all = await ev(`({ top: Math.round(document.getElementById('catalogo').getBoundingClientRect().top), cur: document.querySelector('[data-rail-link][aria-current]')?.dataset.railLink })`);
  check('"Todos" volta ao topo do catálogo', all.cur === 'all' && all.top >= -5 && all.top < 220, JSON.stringify(all));

  // ---------------- teclado ----------------
  await open({});
  const focusOrder = [];
  for (let i = 0; i < 40; i++) {
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    focusOrder.push(await ev(`(() => { const e = document.activeElement; const s = getComputedStyle(e); return (e.dataset.railLink ? 'rail:' + e.dataset.railLink : e.id || e.className.toString().split(' ')[0] || e.tagName) + (e.matches(':focus-visible') && (parseFloat(s.outlineWidth) > 0) ? '' : ' (SEM FOCO VISÍVEL)'); })()`));
  }
  check('teclado: busca e trilho entram na ordem de foco, com foco visível', focusOrder.includes('produtos-busca') && focusOrder.some((f) => f.startsWith('rail:all')) && focusOrder.some((f) => f.startsWith('rail:combo-do-dia')) && !focusOrder.some((f) => /SEM FOCO/.test(f)), focusOrder.join(' > '));

  // ---------------- alvos de toque e overflow por largura ----------------
  for (const w of [1440, 1024, 768, 430, 390, 360]) {
    await open({ width: w });
    const m = await ev(`(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth,
      small: [...document.querySelectorAll('.pcard__cta, .prail__item, .psearch__go, .pempty__btn, .pbtn')].filter((e) => { const r = e.getBoundingClientRect(); return r.height > 0 && (r.height < 43.5 || r.width < 43.5); }).map((e) => e.className + ':' + Math.round(e.getBoundingClientRect().height) + 'x' + Math.round(e.getBoundingClientRect().width)).slice(0, 4),
      tiny: [...document.querySelectorAll('main *')].filter((e) => !(e instanceof SVGElement) && e.children.length === 0 && e.textContent.trim() && parseFloat(getComputedStyle(e).fontSize) < 11.99 && getComputedStyle(e).visibility !== 'hidden' && e.getBoundingClientRect().width > 2).map((e) => e.className + ':' + getComputedStyle(e).fontSize).slice(0, 4) }))()`);
    check(`${w}px: sem overflow horizontal`, m.sw <= m.iw, `scrollWidth=${m.sw} innerWidth=${m.iw}`);
    check(`${w}px: alvos interativos ≥ 44px`, m.small.length === 0, m.small.join(' '));
    check(`${w}px: texto ≥ 12px`, m.tiny.length === 0, m.tiny.join(' '));
  }

  // ---------------- sem JS ----------------
  await open({ js: false });
  const nojs = await ev(`(() => ({ cards: document.querySelectorAll('.pcard').length, vis: [...document.querySelectorAll('.pcard')].filter((c) => getComputedStyle(c).opacity === '1' && c.getBoundingClientRect().height > 0).length, searchHidden: document.querySelector('[data-search-wrap]').hidden, anchors: document.querySelectorAll('[data-rail-link]').length }))()`).catch(() => null);
  check('sem JS: catálogo completo visível, trilho por âncoras, busca oculta', nojs && nojs.cards === 53 && nojs.vis === 53 && nojs.searchHidden && nojs.anchors === 17, JSON.stringify(nojs));

  // ---------------- motion ligado ----------------
  await open({ motion: true, height: 900 });
  const total = await ev('document.documentElement.scrollHeight');
  const start = await ev(`({ ready: document.documentElement.classList.contains('motion-ready'), live: document.documentElement.classList.contains('motion-live'), hidden: [...document.querySelectorAll('.pcard')].filter((c) => getComputedStyle(c).opacity === '0').length })`);
  for (let y = 0; y <= total; y += 450) { await ev(`window.scrollTo(0, ${y}); 1`); await sleep(110); }
  await sleep(1800);
  const end = await ev(`({ stuck: [...document.querySelectorAll('.pcard')].filter((c) => getComputedStyle(c).opacity !== '1').length, h2Hidden: [...document.querySelectorAll('main .h2')].filter((h) => getComputedStyle(h).opacity === '0').length, lines: [...document.querySelectorAll('.is-split .line__in')].filter((l) => !/translate\\(0px, 0%?\\)|none|matrix\\(1, 0, 0, 1, 0, 0\\)/.test(getComputedStyle(l).transform)).length, cls: window.__cls })`);
  check('motion: ligado (motion-ready + motion-live)', start.ready && start.live, JSON.stringify(start));
  check('motion: cards nascem recolhidos e nenhum fica preso invisível após rolar', start.hidden > 0 && end.stuck === 0, `inicial escondidos=${start.hidden}, presos=${end.stuck}`);
  check('motion: títulos revelados (nenhum h2 invisível)', end.h2Hidden === 0, JSON.stringify(end));
  check('CLS (com rolagem completa) < 0,02', end.cls < 0.02, `cls=${end.cls}`);
  check('console sem erros (motion)', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));

  // resize atravessando o breakpoint
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 1, mobile: true }); await sleep(800);
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }); await sleep(800);
  check('resize 1440 → 390 → 1440 sem overflow e sem erro', (await ev('document.documentElement.scrollWidth <= innerWidth')) && consoleErrors.length === 0, consoleErrors.slice(0, 2).join(' | '));

  // alternar reduced-motion com a página aberta
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }); await sleep(800);
  check('motion → reduced com a página aberta: tudo visível', await ev(`[...document.querySelectorAll('.pcard')].every((c) => getComputedStyle(c).opacity === '1') && !document.documentElement.classList.contains('motion-ready')`));

  writeFileSync(OUT, JSON.stringify({ url: URL_, passed: results.filter((r) => r.ok).length, failed: results.filter((r) => !r.ok).length, results }, null, 2));
  console.log(`\n${results.filter((r) => r.ok).length} ok, ${results.filter((r) => !r.ok).length} falhas`);
} finally { chrome.kill(); }
