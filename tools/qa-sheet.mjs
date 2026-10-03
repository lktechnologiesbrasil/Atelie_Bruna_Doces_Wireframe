// Folha de contato: fatia uma captura full-page em colunas lado a lado para revisão rápida.
// Uso: node tools/qa-sheet.mjs <captura.webp> <saida.webp> <altura-da-fatia> [escala]
import sharp from 'sharp';

const [src, out, sliceH, scale = '0.5'] = process.argv.slice(2);
const H = Number(sliceH);
const meta = await sharp(src).metadata();
const n = Math.ceil(meta.height / H);
const GAP = 16;
const parts = [];
for (let i = 0; i < n; i++) {
  const h = Math.min(H, meta.height - i * H);
  const buf = await sharp(src).extract({ left: 0, top: i * H, width: meta.width, height: h }).toBuffer();
  parts.push({ input: buf, left: i * (meta.width + GAP), top: 0 });
}
const sheet = await sharp({ create: { width: n * meta.width + (n - 1) * GAP, height: H, channels: 3, background: '#777' } })
  .composite(parts).png().toBuffer();
await sharp(sheet).resize({ width: Math.round((n * meta.width + (n - 1) * GAP) * Number(scale)) }).webp({ quality: 80 }).toFile(out);
console.log('OK', out, n, 'colunas');
