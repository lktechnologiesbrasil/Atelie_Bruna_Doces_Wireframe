// Regressão visual: diferença média de pixels por faixa entre duas capturas full-page.
// Uso: node tools/qa-vdiff.mjs <nova.webp> <referencia.webp> <largura> <altura-da-faixa>
import sharp from 'sharp';
const [a, b, W, band] = process.argv.slice(2);
const ma = await sharp(a).metadata(), mb = await sharp(b).metadata();
console.log('heights new/old', ma.height, mb.height);
const H = Math.min(ma.height, mb.height), B = Number(band), w = Number(W);
let worst = 0, flagged = [];
for (let t = 0; t + B <= H; t += B) {
  const [x, y] = await Promise.all([sharp(a).extract({ left: 0, top: t, width: w, height: B }).resize(Math.round(w / 4)).raw().toBuffer(), sharp(b).extract({ left: 0, top: t, width: w, height: B }).resize(Math.round(w / 4)).raw().toBuffer()]);
  let d = 0; for (let i = 0; i < x.length; i++) d += Math.abs(x[i] - y[i]);
  const m = d / x.length; worst = Math.max(worst, m); if (m > 2) flagged.push(`${t}:${m.toFixed(1)}`);
}
console.log('worst band mean diff', worst.toFixed(2), 'flagged(>2):', flagged.join(' ') || 'none');
