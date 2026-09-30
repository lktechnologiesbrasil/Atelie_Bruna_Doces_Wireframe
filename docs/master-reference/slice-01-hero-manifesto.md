# Master Reference, Slice 01 / 04: Hero + Manifesto

> **Status:** `APPROVED` (gate visual realizado fora do repositório).
> **Imagem canônica:** `docs/master-reference/slice-01.webp` (1064 × 1478 px).
> **Concepts de origem:** `concepts/concept-01.webp` (Hero) e `concepts/concept-02.webp` (Manifesto).
> **Fonte de verdade:** a imagem aprovada. Onde este documento ou a especificação original divergirem da imagem, **a imagem prevalece** (ver `README.md`).

A especificação usada para gerar esta slice está no histórico do Git (commit `889e6ca`). Este documento registra o **estado visual aprovado**.

---

## 1. Correção aplicada no gate

| # | Correção | Resultado |
|---|---|---|
| 1 | Aplicação da logo no header | Wordmark `ATELIÊ` sobre `d✿ces bruna` (flor no lugar do "o"), à esquerda do header |

Nenhuma outra correção foi aplicada nesta slice.

## 2. Estado aprovado

### Header

| Zona | Conteúdo |
|---|---|
| Esquerda | Wordmark `ATELIÊ` / `d✿ces bruna` |
| Centro | Nav: `A MARCA · BRUNA · CRIAÇÕES · ENCOMENDAS · CONTATO` |
| Direita | Ícone + `INSTAGRAM` · ícone + `WHATSAPP` · separador vertical · pill blush `ENCOMENDAR →` |

### Hero (fundo cacau fotográfico)

- **Headline:** "Mais que doces, / *momentos* / inesquecíveis." Serif editorial em creme; "*momentos*" em serif itálica rosada/caramelo claro.
- **Corpo:** "No Ateliê Doces Bruna, cada doce é feito à mão para transformar ocasiões em lembranças que ficam para sempre."
- **CTA:** pill blush `CONHEÇA NOSSA HISTÓRIA →`.
- **Selo circular (único da página):** `ATELIÊ DOCES BRUNA · FEITO COM AFETO`, flor ao centro, no canto superior direito, sobre a foto.
- **Produto protagonista:** bolo de chocolate com drip e brigadeiros, em pedestal de cerâmica pontilhada, à direita. Tigela de lascas de chocolate, flores mosquitinho e tecido rosado ao fundo.

### Transição Hero → Manifesto

- Onda creme orgânica sobe sobre o Hero, sem corte reto.
- Na crista, **uma única vez**, uma faixa em uppercase com tracking, acompanhando a curva: `— FEITO À MÃO · INGREDIENTES REAIS · HISTÓRIAS VERDADEIRAS —`.

### Manifesto (fundo creme)

- **Eyebrow:** linha + `NOSSA ESSÊNCIA`.
- **Headline:** "Cada criação / carrega afeto, / *cuidado e memória.*" Serif cacau; o trecho final em itálico caramelo.
- **Corpo:** "Acreditamos no poder dos detalhes, no sabor das boas lembranças e na magia que um doce pode despertar. Aqui, tradição e afeto se encontram em criações feitas com ingredientes reais, para tornar cada momento ainda mais especial."
- **Colagem (3 molduras com borda off-white):**
  1. Principal: mãos (avental com a marca) salpicando confeito sobre um bolo de chocolate com drip.
  2. Brigadeiros em prato de cerâmica.
  3. Pedaços de chocolate e tigela de cacau em pó.
- **Base:** tecido rosado e prato de cerâmica na borda inferior (ponte visual para a Slice 02).
- Sem selo e sem flor grande decorativa.

## 3. Desvios aceitos no gate

Diferenças entre a especificação original e a imagem aprovada. **Não são bugs.** A imagem prevalece.

| # | Especificação original | Imagem aprovada | Registro |
|---|---|---|---|
| 1 | Selo `FEITO À MÃO · COM PROPÓSITO`, à direita do produto, sobre o vaso | Selo `ATELIÊ DOCES BRUNA · FEITO COM AFETO`, no canto superior direito | `DESVIO ACEITO NO GATE` |
| 2 | CTA `CONHEÇA O ATELIÊ →` | CTA `CONHEÇA NOSSA HISTÓRIA →` | `DESVIO ACEITO NO GATE` |
| 3 | Eyebrow do Manifesto `MANIFESTO DA MARCA` | Eyebrow `NOSSA ESSÊNCIA` | `DESVIO ACEITO NO GATE` |
| 4 | Eyebrow do Hero `DOCES QUE CONTAM HISTÓRIAS` | Hero sem eyebrow | `DESVIO ACEITO NO GATE` |
| 5 | Indicador `SCROLL PARA DESCOBRIR` | Ausente | `DESVIO ACEITO NO GATE` |
| 6 | Quebra "Mais que / doces," | "Mais que doces," numa linha | `DESVIO ACEITO NO GATE` |
| 7 | Corpo do Hero e texto do manifesto com a copy original | Copy da imagem (ver §2) | `DESVIO ACEITO NO GATE` |
| 8 | Faixa com script manuscrito `feito à mão` + duas linhas uppercase | Faixa única em uppercase na curva, sem script | `DESVIO ACEITO NO GATE` |
| 9 | Colagem: mão com granulado, caixa com fita, doce em prato; bolo do Hero não repete | Colagem: mãos sobre bolo com drip, brigadeiros, chocolate e cacau; **o bolo com drip reaparece** | `DESVIO ACEITO NO GATE` (direção fotográfica) |
| 10 | Sem tecido no fim do Manifesto | Tecido rosado e cerâmica na base | `DESVIO ACEITO NO GATE` |

## 4. Placeholders e direção fotográfica

Regras completas em `docs/consistency-review.md` (seção "PLACEHOLDERS NÃO SÃO CONTEÚDO REAL") e em `README.md`.

| Elemento | Situação |
|---|---|
| Bolo, brigadeiros, chocolate e demais produtos | **Direção fotográfica**; serão substituídos por produtos reais |
| Mãos e avental com a marca | **Direção fotográfica**; a aplicação da logo no avental não é arte final |
| Wordmark do header | **Aplicação visual**; a logo definitiva vem do material oficial da Bruna |
| Selo `ATELIÊ DOCES BRUNA · FEITO COM AFETO` | Aplicação visual; arte final a partir do material oficial |
| "feito à mão", "ingredientes reais", "histórias verdadeiras" | Claims **não validados**; confirmar com a Bruna |

## 5. Notas para implementação (não alteram a imagem)

- Eixo esquerdo de ~80px em 1440px vale para as duas seções.
- Botões pill blush com texto cacau/chocolate e alvo ≥ 44px.
- Texto sobre a foto do Hero precisa de scrim cacau à esquerda (contraste ≥ 4,5:1 no corpo).
- Microcopy ≥ 12px; corpo ≥ 16px. A faixa curva da transição deve respeitar o mínimo de 12px.
- Motion previsto: slow scale e parallax sutil no Hero, onda subindo na transição, text/image reveal no Manifesto.
