# Master Reference: Ateliê Doces Bruna (homepage desktop)

As quatro Master Slices abaixo passaram pelo gate visual (realizado fora do repositório) e são a **fonte de verdade visual canônica** da homepage.

## Ordem canônica

| Ordem | Slice | Concepts | Seções | Imagem | Documento | Status |
|---|---|---|---|---|---|---|
| 1 | Slice 01 | 01–02 | Hero + Manifesto | `slice-01.webp` | [slice-01-hero-manifesto.md](slice-01-hero-manifesto.md) | `APPROVED` |
| 2 | Slice 02 | 03–04 | Bruna + Criações | `slice-02.webp` | [slice-02-bruna-criacoes.md](slice-02-bruna-criacoes.md) | `APPROVED` |
| 3 | Slice 03 | 05–06 | Encomendas + Histórias Reais | `slice-03.webp` | [slice-03-encomendas-historias.md](slice-03-encomendas-historias.md) | `APPROVED` |
| 4 | Slice 04 | 07–08 | Bastidores + CTA final + footer | `slice-04.webp` | [slice-04-bastidores-fechamento.md](slice-04-bastidores-fechamento.md) | `APPROVED` |

Sequência de leitura da página: header → Hero → Manifesto → Bruna → Criações → Encomendas → Histórias Reais → Bastidores → CTA final → footer.

## Correções aplicadas no gate

| Slice | Correções |
|---|---|
| 01 | Aplicação da logo no header |
| 02 | Repetição do bolo de chocolate no Concept 04 substituída por composição variada (bolo claro com morangos e outros produtos) |
| 03 | Copy redundante da transição Encomendas → Histórias Reais removida |
| 04 | Concept 07 em cacau; menos repetição do bolo no 08; fechamento como cena de embalagem/celebração; dados factuais do footer convertidos em placeholders |

## Decisão de fonte de verdade

- As imagens aprovadas prevalecem sobre qualquer especificação anterior, inclusive `docs/consistency-review.md` e a especificação original da Slice 01 (commit `889e6ca`).
- **Não se corrige a imagem.** Toda divergência entre especificação e imagem é registrada como `DESVIO ACEITO NO GATE` no documento da slice, e a documentação descreve o estado realmente aprovado.
- Os pixels das slices aprovadas não são alterados.

## O que é placeholder ou direção fotográfica

Aparecer numa slice aprovada **não torna nada real, oficial ou autorizado**. Durante a implementação, assets e dados reais substituem estes elementos:

| Elemento | Onde | Situação |
|---|---|---|
| Depoimentos e legendas de cliente | Slice 03 | **`[PLACEHOLDER]`**. Só entram em produção com depoimentos reais e autorizados |
| Pessoa retratada como "Bruna" | Slice 02 | **Direção fotográfica**; não é a Bruna. Usar foto real |
| Texto em 1ª pessoa e assinatura "Bruna" | Slice 02 | **`[PLACEHOLDER]`**; exigem aprovação/arquivo real |
| Todos os produtos (bolos, doces, brigadeiros, sobremesas) | Slices 01–04 | **Direção fotográfica**; serão substituídos pelo portfólio real |
| Mãos, bastidores, cenas de mesa e celebração | Slices 01–04 | **Direção fotográfica** |
| Logo aplicada em avental, caixas e embalagens | Slices 01–04 | **Não é arte final** |
| Wordmark do header, lockup do footer e selo | Slices 01, 04 | Aplicação visual; a logo definitiva vem do material oficial da Bruna |
| `[TELEFONE]`, `[INSTAGRAM]`, `[LOCALIZAÇÃO]`, `[E-MAIL]`, `[HORÁRIO]`, `© [ANO]` | Slice 04 | **`[PLACEHOLDER]`**; dados reais só com validação |
| Claims "feito à mão", "ingredientes reais/selecionados", "histórias verdadeiras", processo Converse → Criamos → Celebre | Slices 01–03 | **Não validados**; confirmar com a Bruna |

## Master Reference (stitch técnico)

**Arquivo:** `docs/master-reference/master-reference.webp`: **1440 × 8365 px**, WebP lossless, 9.749.496 bytes.
SHA-256: `04e0a60109eea3ae51e006800b9327e2e05a60833d6df6b318d91e4fb49078fc`

**Reprodução:** `bash tools/stitch-master-reference.sh` (na raiz do repositório). Duas execuções geram arquivos idênticos byte a byte.

| Slice | Original | Fator | Normalizada | Faixa y na Master |
|---|---|---|---|---|
| 01 | 1064 × 1478 | ×1,3534 | 1440 × 2000 | 0–1999 |
| 02 | 1024 × 1536 | ×1,40625 | 1440 × 2160 | 2000–4159 |
| 03 | 1024 × 1536 | ×1,40625 | 1440 × 2160 | 4160–6319 |
| 04 | 1052 × 1494 | ×1,3688 | 1440 × 2045 | 6320–8364 |

**Método:**

- ffmpeg 8.1.1: `scale` com `lanczos+accurate_rnd+full_chroma_int` para 1440px de largura; altura = `round(altura × 1440 / largura)`. O arredondamento gera no máximo 0,02% de diferença de proporção (slice 01: 2000,36 → 2000).
- `vstack` das quatro faixas, na ordem 01 → 02 → 03 → 04, **sem sobreposição, sem crop, sem mistura nas emendas**.
- Saída `libwebp` lossless: nenhuma perda além da reamostragem.
- Sem IA generativa, sem alteração de texto, cor, logo ou fotografia. Os arquivos `slice-0N.webp` não foram modificados.

**Gate técnico (aprovado):**

| Verificação | Resultado |
|---|---|
| Ordem das slices | SSIM de cada faixa, reduzida ao tamanho original, contra a sua slice: 0,987 / 0,989 / 0,990 / 0,982. Contra as outras slices: 0,14–0,24 |
| Largura uniforme | 1440px nas quatro faixas |
| Deformação | Proporção preservada (≤ 0,02%) |
| Crop | Nenhum: altura total = soma das alturas normalizadas (2000 + 2160 + 2160 + 2045 = 8365) |
| Perda | Igual ao ida-e-volta do próprio resize (a compressão lossless não acrescenta perda) |
| Header / footer | Header completo no topo; footer com placeholders e barra `© [ANO]` na base |
| Integridade | Decodifica sem erro (ffmpeg) |

**Observação:** como não há sobreposição, cada emenda entre slices aparece como corte reto horizontal (ex.: tecido da base da 01 → creme do topo da 02; fio de foto no topo da 03). Isso é artefato do stitch e **não** é transição de design. As transições reais entre seções são as ondas descritas nos documentos de cada slice.

## Próximas etapas

1. ~~Stitch técnico das quatro slices.~~ Concluído.
2. ~~Gate técnico da Master Reference.~~ Aprovado.
3. Wireframe estrutural a partir da Master: canônico em `design-systems/atelie-doces-bruna-v2/wireframe.txt` (`img-to-html` Etapa 1, ver `docs/wireframe/README.md`). Aguardando aprovação.
4. Só depois da aprovação do wireframe e do plano: Etapas 2–5 do `img-to-html`.
