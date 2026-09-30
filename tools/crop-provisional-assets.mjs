// Recortes PROVISÓRIOS da reference para a camada de fundo (img-to-html, Etapa 2).
//
// Sem IA generativa: só crop e, no Hero, um desfoque forte com borda suave
// sobre elementos de interface gravados na foto (selo e fim de "doces,"),
// que serão HTML nas etapas seguintes. O fundo nesses pontos já é bokeh.
// Os assets servem para composição, proporção e QA e serão substituídos por
// fotografia real. Não são conteúdo factual.
//
// Uso (na raiz do repositório): node tools/crop-provisional-assets.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const REF = 'design-systems/atelie-doces-bruna-v2/reference.webp';
const OUT = 'src/assets/provisional';
mkdirSync(OUT, { recursive: true });

// Coordenadas na reference (1440 x 8365): { left, top, width, height }
const ASSETS = [
  // 01 Hero: bolo protagonista (lado direito), abaixo do header
  { name: 'provisional-hero-bg', rect: { left: 640, top: 110, width: 800, height: 750 },
    soften: [
      { left: 490, top: 0, width: 310, height: 310 },   // selo circular
      { left: 0, top: 80, width: 150, height: 150 },    // fim de "doces,"
    ] },
  // 02 Manifesto: base decorativa (tecido + cerâmica)
  { name: 'provisional-manifesto-base', rect: { left: 0, top: 1680, width: 650, height: 320 } },
  // 03 Bruna: retrato (media2)
  { name: 'provisional-bruna-retrato', rect: { left: 620, top: 2000, width: 820, height: 980 } },
  // 04 Criações: base decorativa (tecido + cerâmica)
  { name: 'provisional-criacoes-base', rect: { left: 0, top: 3870, width: 555, height: 290 } },
  // 06 Histórias Reais: mesa de celebração (media2). Contém o inset gravado;
  //    o inset real (media) cobre essa área na Etapa 4.
  { name: 'provisional-historias-mesa', rect: { left: 0, top: 5310, width: 780, height: 940 } },
  // 07 Bastidores: mãos confeitando (media2)
  { name: 'provisional-bastidores-confeitando', rect: { left: 680, top: 6320, width: 760, height: 670 } },
  // 08 CTA final: cena de celebração (media2)
  { name: 'provisional-cta-celebracao', rect: { left: 660, top: 7380, width: 780, height: 520 } },
];

// Máscara elíptica com borda suave (opaca no centro, transparente na borda)
const featherMask = (w, h) => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
     <defs><radialGradient id="g"><stop offset="75%" stop-color="#fff"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
     <rect width="${w}" height="${h}" fill="url(#g)"/></svg>`);

async function soften(buf, { left, top, width, height }) {
  const pad = 30;
  const meta = await sharp(buf).metadata();
  const r = {
    left: Math.max(0, left - pad), top: Math.max(0, top - pad),
    width: Math.min(meta.width - Math.max(0, left - pad), width + 2 * pad),
    height: Math.min(meta.height - Math.max(0, top - pad), height + 2 * pad),
  };
  const blurred = await sharp(buf).extract(r).blur(40).removeAlpha().toBuffer();
  const alpha = await sharp(featherMask(r.width, r.height)).resize(r.width, r.height).extractChannel('alpha').toBuffer();
  const patch = await sharp(blurred).joinChannel(alpha).png().toBuffer();
  return sharp(buf).composite([{ input: patch, left: r.left, top: r.top }]).png().toBuffer();
}

for (const a of ASSETS) {
  let buf = await sharp(REF).extract(a.rect).png().toBuffer();
  for (const s of a.soften ?? []) buf = await soften(buf, s);
  await sharp(buf).webp({ quality: 92, effort: 6 }).toFile(`${OUT}/${a.name}.webp`);
  console.log(`OK: ${OUT}/${a.name}.webp (${a.rect.width}x${a.rect.height})`);
}
