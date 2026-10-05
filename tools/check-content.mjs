// Guarda de conteúdo/produção: avisa o que ainda é placeholder ou provisório.
//
//   npm run check:content          relatório (sempre sai com 0: não quebra o desenvolvimento)
//   npm run check:content:strict   gate de lançamento (sai com 1 se restar QUALQUER pendência)
//
// Lê o contrato (src/data/site.ts, src/data/images.ts), o HTML gerado (todas as páginas em dist/,
// se existirem) e public/robots.txt. Não inventa nada: só detecta e lista.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const strict = process.argv.includes('--strict') || process.env.CONTENT_STRICT === '1';
const site = await import('../src/data/site.ts');
const { ASSET_SLOTS } = await import('../src/data/images.ts').catch(() => ({ ASSET_SLOTS: [] }));

const findings = { tokens: [], confirm: [], seo: [], html: [], assets: [], robots: [] };

// 1) tokens entre colchetes no contrato (CONTACT, LINKS, ...)
const walk = (value, path) => {
  if (typeof value === 'string') { if (value.startsWith('[') && value.endsWith(']')) findings.tokens.push(`${path} = ${value}`); return; }
  if (Array.isArray(value)) return value.forEach((v, i) => walk(v, `${path}[${i}]`));
  if (value && typeof value === 'object') Object.entries(value).forEach(([k, v]) => walk(v, `${path}.${k}`));
};
for (const key of ['CONTACT', 'LINKS']) walk(site[key], key);

// 1b) valores REAIS com fonte, mas ainda não confirmados pela Bruna (PENDING_ITEMS.state = needs-confirmation).
//     Continuam contando como pendência: real com fonte não é o mesmo que confirmado.
for (const item of site.PENDING_ITEMS.filter((i) => i.state === 'needs-confirmation')) {
  findings.confirm.push(`${item.where}: ${item.needs}  [fonte: ${item.source}]`);
}

// 2) SEO e dados estruturados
const { SEO, STRUCTURED_DATA, BUSINESS_HOURS } = site;
if (!SEO.description) findings.seo.push('SEO.description ausente (sem meta description)');
if (!SEO.siteUrl && !process.env.SITE_URL) findings.seo.push('URL final ausente (SEO.siteUrl / SITE_URL): sem canonical, og:url, sitemap');
if (!SEO.ogImage) findings.seo.push('SEO.ogImage ausente (sem og:image / twitter image)');
if (!SEO.favicon) findings.seo.push('SEO.favicon ausente (ícone vazio)');
if (!SEO.allowIndexing) findings.seo.push('SEO.allowIndexing = false (noindex, nofollow ativo)');
if (!STRUCTURED_DATA.enabled) findings.seo.push('STRUCTURED_DATA.enabled = false (nenhum JSON-LD)');
if (!BUSINESS_HOURS) findings.seo.push('BUSINESS_HOURS = null (horário estruturado pendente)');

// 3) HTML gerado (TODAS as páginas: dist/index.html e dist/<rota>/index.html)
const pages = [];
if (existsSync('dist')) {
  if (existsSync('dist/index.html')) pages.push(['/', 'dist/index.html']);
  for (const entry of readdirSync('dist', { withFileTypes: true })) {
    if (entry.isDirectory() && existsSync(`dist/${entry.name}/index.html`)) pages.push([`/${entry.name}`, `dist/${entry.name}/index.html`]);
  }
}
if (!pages.length) findings.html.push('dist/index.html não existe: rode `npm run build` antes para checar o HTML');
const seenAssets = new Set();
for (const [route, file] of pages) {
  const tag = pages.length > 1 ? `[${route}] ` : '';
  const html = readFileSync(file, 'utf8');
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  const tokens = [...new Set([...visible.matchAll(/\[[A-ZÀ-Ú][A-ZÀ-Ú_\- ]{2,}\]/g)].map((m) => m[0]))];
  if (tokens.length) findings.html.push(`${tag}tokens visíveis no HTML: ${tokens.join(' ')}`);
  const pendingLinks = (visible.match(/<a[^>]*data-link-status="pending"/g) ?? []).length;
  if (pendingLinks) findings.html.push(`${tag}${pendingLinks} links ainda pendentes (data-link-status="pending")`);
  const provisional = (html.match(/data-provisional/g) ?? []).length;
  if (provisional) findings.html.push(`${tag}${provisional} blocos marcados data-provisional (depoimentos, texto/assinatura da Bruna, claims, imagens provisórias)`);
  [...html.matchAll(/provisional-[a-z0-9-]+/g)].forEach((m) => seenAssets.add(m[0]));
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) findings.html.push(`${tag}meta robots = noindex`);
  if (!/<link rel="canonical"/.test(html)) findings.html.push(`${tag}sem <link rel="canonical">`);
  if (!/name="description"/.test(html)) findings.html.push(`${tag}sem <meta name="description">`);
}
if (seenAssets.size) findings.assets.push(`${seenAssets.size} assets provisional-* servidos no HTML`);

// 4) arquivos provisional-* ainda no repositório
const dir = 'src/assets/provisional';
if (existsSync(dir)) {
  const files = readdirSync(dir).filter((f) => f.startsWith('provisional-'));
  findings.assets.push(`${files.length} arquivos provisional-* em ${dir}/`);
}
if (ASSET_SLOTS.length) findings.assets.push(`${ASSET_SLOTS.length} grupos de assets a substituir (src/data/images.ts → ASSET_SLOTS)`);

// 5) robots.txt
const robots = join('public', 'robots.txt');
if (existsSync(robots) && /^\s*Disallow:\s*\/\s*$/m.test(readFileSync(robots, 'utf8'))) findings.robots.push('public/robots.txt bloqueia tudo (Disallow: /)');

// ---- relatório ----
const sections = [
  ['Placeholders em src/data/site.ts (sem valor real)', findings.tokens],
  ['Dados reais com fonte, AGUARDANDO confirmação da Bruna', findings.confirm],
  ['SEO / indexação', findings.seo],
  ['HTML gerado', findings.html],
  ['Assets provisórios', findings.assets],
  ['robots.txt', findings.robots],
];
let total = 0;
console.log(`\ncheck:content (${strict ? 'STRICT' : 'relatório'})\n`);
for (const [title, items] of sections) {
  total += items.length;
  console.log(`${items.length ? '⚠' : '✓'} ${title}${items.length ? ` (${items.length})` : ''}`);
  items.forEach((item) => console.log(`    - ${item}`));
}
const byState = site.PENDING_ITEMS.reduce((acc, i) => ({ ...acc, [i.state]: (acc[i.state] ?? 0) + 1 }), {});
console.log(`\nPENDING_ITEMS: ${site.PENDING_ITEMS.length} itens (${Object.entries(byState).map(([k, v]) => `${k}: ${v}`).join(', ')}); detalhes em docs/content-audit.md`);
console.log(total ? `\n${total} pendência(s) detectada(s).` : '\nNenhuma pendência: pronto para o gate de lançamento.');
if (strict && total) {
  console.error('\nSTRICT: lançamento bloqueado até zerar as pendências acima.');
  process.exit(1);
}
