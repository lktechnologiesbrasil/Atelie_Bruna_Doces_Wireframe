#!/usr/bin/env bash
# Stitch técnico da Master Reference a partir das 4 Master Slices aprovadas.
#
# Puramente determinístico: sem IA, sem crop, sem sobreposição.
# Cada slice é redimensionada para 1440px de largura (aspect ratio preservado,
# Lanczos) e as quatro são empilhadas verticalmente na ordem canônica.
# Saída em WebP lossless: nenhuma perda além da reamostragem.
#
# Requer: ffmpeg com libwebp.
# Uso (na raiz do repositório): bash tools/stitch-master-reference.sh
set -euo pipefail

DIR="docs/master-reference"
OUT="$DIR/master-reference.webp"
WIDTH=1440

# Altura normalizada = round(altura_original * 1440 / largura_original)
#   slice-01  1064 x 1478  ->  1440 x 2000
#   slice-02  1024 x 1536  ->  1440 x 2160
#   slice-03  1024 x 1536  ->  1440 x 2160
#   slice-04  1052 x 1494  ->  1440 x 2045
H1=2000
H2=2160
H3=2160
H4=2045

SCALE="flags=lanczos+accurate_rnd+full_chroma_int"

ffmpeg -hide_banner -v error -y \
  -i "$DIR/slice-01.webp" \
  -i "$DIR/slice-02.webp" \
  -i "$DIR/slice-03.webp" \
  -i "$DIR/slice-04.webp" \
  -filter_complex "\
[0:v]scale=${WIDTH}:${H1}:${SCALE},format=rgb24[s1];\
[1:v]scale=${WIDTH}:${H2}:${SCALE},format=rgb24[s2];\
[2:v]scale=${WIDTH}:${H3}:${SCALE},format=rgb24[s3];\
[3:v]scale=${WIDTH}:${H4}:${SCALE},format=rgb24[s4];\
[s1][s2][s3][s4]vstack=inputs=4,format=bgra[out]" \
  -map "[out]" -frames:v 1 \
  -c:v libwebp -lossless 1 -compression_level 6 \
  -map_metadata -1 -fflags +bitexact -flags +bitexact \
  "$OUT"

echo "OK: $OUT"
