// Comparações MASTER | IMPLEMENTAÇÃO para o QA visual.
//
// Gera (1) a página inteira lado a lado e (2) um par por seção, cada lado
// alinhado ao topo da seção correspondente.
//
// Uso: node tools/qa-compare.mjs <impl.webp> <sections.json> <pasta-saida>
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const [implPath, sectionsPath, outDir] = process.argv.slice(2);
const MASTER = 'design-systems/atelie-doces-bruna-v2/reference.webp';
const meta = JSON.parse(readFileSync(sectionsPath, 'utf8'));
mkdirSync(join(outDir, 'sections'), { recursive: true });

// topo de cada seção na Master (1440 × 8365), na ordem de meta.sections
const MASTER_TOPS = [0, 940, 2000, 3010, 4160, 5140, 6320, 7300, 7940, 8365];
const GAP = 24;

async function pair(masterRect, implRect, scale, file) {
  const h = Math.max(masterRect.height, implRect.height);
  const [m, i] = await Promise.all([
    sharp(MASTER).extract(masterRect).toBuffer(),
    sharp(implPath).extract(implRect).toBuffer(),
  ]);
  const w = masterRect.width;
  const canvas = sharp(await sharp({ create: { width: w * 2 + GAP, height: h, channels: 3, background: '#7a7a7a' } })
    .composite([{ input: m, left: 0, top: 0 }, { input: i, left: w + GAP, top: 0 }]).png().toBuffer());
  const outW = Math.round((w * 2 + GAP) * scale);
  await canvas.resize({ width: outW }).webp({ quality: 86, effort: 5 }).toFile(file);
}

const W = 1440;
// página inteira (50%)
const fullH = Math.max(8365, meta.height);
await pair({ left: 0, top: 0, width: W, height: 8365 }, { left: 0, top: 0, width: W, height: Math.min(meta.height, fullH) }, 0.5,
  join(outDir, 'compare-1440-master-vs-impl.webp'));

// por seção (65%)
for (let k = 0; k < meta.sections.length; k++) {
  const s = meta.sections[k];
  const mTop = MASTER_TOPS[k];
  const mH = MASTER_TOPS[k + 1] - mTop;
  const h = Math.max(mH, s.h);
  const mr = { left: 0, top: mTop, width: W, height: Math.min(h, 8365 - mTop) };
  const ir = { left: 0, top: s.top, width: W, height: Math.min(h, meta.height - s.top) };
  await pair(mr, ir, 0.65, join(outDir, 'sections', `${String(k + 1).padStart(2, '0')}-${s.id}.webp`));
}
console.log('OK');
