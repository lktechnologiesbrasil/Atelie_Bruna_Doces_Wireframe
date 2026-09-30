# Master Reference, Slice 03 / 04: Encomendas + Histórias Reais

> **Status:** `APPROVED` (gate visual realizado fora do repositório).
> **Imagem canônica:** `docs/master-reference/slice-03.webp` (1024 × 1536 px).
> **Concepts de origem:** `concepts/concept-05.webp` (Encomendas) e `concepts/concept-06.webp` (Histórias reais).
> **Fonte de verdade:** a imagem aprovada. Onde este documento ou `docs/consistency-review.md` divergirem da imagem, **a imagem prevalece** (ver `README.md`).

Esta slice não teve especificação escrita antes da geração. Este documento registra o **estado visual aprovado**.

---

## 1. Correção aplicada no gate

| # | Correção | Resultado |
|---|---|---|
| 1 | Remover a copy redundante da transição entre Encomendas e Histórias Reais | Transição só com onda creme, sem teaser de texto |

Nenhuma outra correção foi aplicada nesta slice.

## 2. Estado aprovado

### Topo

- Borda superior com um fio de fotografia e onda creme (continuação da base da Slice 02).

### Encomendas (fundo creme)

- **Eyebrow:** linha + `ENCOMENDAS`.
- **Headline:** "Cada celebração / começa com / *uma ideia só sua.*" Serif cacau; o trecho final em itálico caramelo.
- **Corpo:** "Cada encomenda começa com uma conversa. Você conta o momento, suas referências e preferências. O Ateliê cuida dos sabores, acabamentos e detalhes para transformar tudo em uma criação especial."
- **CTA:** pill blush com ícone de WhatsApp: `COMEÇAR UMA ENCOMENDA →`.
- **Tags:** `ANIVERSÁRIOS · PRESENTES · CELEBRAÇÕES · MOMENTOS ESPECIAIS` (uppercase pequeno, caramelo).
- **Jornada em 3 passos**, em zigue-zague à direita, ligada por uma linha fina caramelo:

| Passo | Numeral | Título | Texto | Foto |
|---|---|---|---|---|
| 1 | `01` | `CONVERSE` | "Conte sobre a ocsaião, suas referências e o que você imagina." | Mãos esboçando bolos num caderno, celular ao lado |
| 2 | `02` | `CRIAMOS` | "O Ateliê transforma essas ideias em sabores, acabamentos e detalhes pensados para você." | Mão colocando morango num bolo claro com drip |
| 3 | `03` | `CELEBRE` | "Tudo ganha forma para fazer parte de um momento que merece ser lembrado." | Bolo claro com frutas vermelhas em pedestal, numa mesa |

- Numerais grandes em serif itálica blush (decorativos).
- **Flor grande em linha** ao lado do passo 03, fechando a jornada.

### Transição Encomendas → Histórias Reais

- Onda creme sobre creme. **Sem copy.**

### Histórias Reais (layout espelhado: foto à esquerda)

- **Foto principal à esquerda:** mesa de celebração com bolo claro com velas e frutas, caixa de presente com a marca e laço, flores e pratos. Inset menor com fatia de bolo com morango.
- **Eyebrow:** linha + `HISTÓRIAS REAIS`.
- **Headline:** "Quem viveu, / lembra com / *doçura.*" Serif cacau; "*doçura.*" em itálico caramelo.
- **Corpo:** "Mais do que bolos e doces, cada criação do Ateliê faz parte de histórias, encontros e celebrações que ficam na memória."
- **3 cards de citação** (fundo off-white, aspas caramelo, citação em serif itálica):
  1. "O bolo ficou ainda mais lindo e delicioso do que eu imaginava. Fez toda a diferença no nosso dia!" · `CLIENTE ATELIÊ DOCES BRUNA` / `CELEBRAÇÃO ESPECIAL`
  2. "Tudo perfeito, desde o primeiro atendimento até o último detalhe. Dá para sentir o carinho em cada etapa." · `CLIENTE ATELIÊ DOCES BRUNA` / `ENCOMENDA PERSONALIZADA`
  3. "Foi exatamente como eu sonhava. Além de delicioso, trouxe um toque muito especial para a nossa celebração." · `CLIENTE ATELIÊ DOCES BRUNA` / `PRESENTE AFETIVO`
- Sem selo circular.

## 3. Desvios aceitos no gate

**Não são bugs.** A imagem prevalece.

| # | Referência | Imagem aprovada | Registro |
|---|---|---|---|
| 1 | Depoimentos marcados visualmente como `[PLACEHOLDER]` (`consistency-review.md` §8) | Citações aparecem como texto comum, sem marcação | `DESVIO ACEITO NO GATE`. A marcação vale na documentação, no wireframe e na implementação (ver §4) |
| 2 | Copy correta | Erro de digitação "ocsaião" no passo 01 | `DESVIO ACEITO NO GATE`. Na implementação o texto é "ocasião" |
| 3 | Microcopy ≥ 12px | Tags e textos dos passos pequenos na escala da imagem | `DESVIO ACEITO NO GATE` (piso de 12px/16px na implementação) |

## 4. Placeholders e direção fotográfica

| Elemento | Situação |
|---|---|
| **Os 3 depoimentos** | **`[PLACEHOLDER]`**. Não são avaliações reais. Só entram em produção com depoimentos reais e autorizados |
| Legendas "CLIENTE ATELIÊ DOCES BRUNA" e rótulos de ocasião | **`[PLACEHOLDER]`**. Não apresentar como clientes reais |
| Processo Converse → Criamos → Celebre | **Não validado**; confirmar o fluxo real (prazo, sinal, canal) |
| Fotos da jornada e da celebração | **Direção fotográfica**; serão substituídas por bastidores e entregas reais |
| Caixa com a marca e laço | Aplicação visual; **não é arte final** |

## 5. Notas para implementação (não alteram a imagem)

- CTA `COMEÇAR UMA ENCOMENDA` leva ao canal real de encomenda (WhatsApp, a validar).
- Texto de botão blush em cacau/chocolate; alvo ≥ 44px.
- Numerais 01/02/03 são decorativos; o título do passo carrega a informação.
- Motion previsto: scroll journey (numerais acendendo em sequência), linha orgânica via `stroke-dashoffset`, image reveal nos cards.
