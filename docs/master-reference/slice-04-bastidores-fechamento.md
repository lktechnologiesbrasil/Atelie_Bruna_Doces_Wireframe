# Master Reference, Slice 04 / 04: Bastidores + Fechamento

> **Status:** `APPROVED` (gate visual realizado fora do repositório). A imagem atual é a **versão final aprovada**.
> **Imagem canônica:** `docs/master-reference/slice-04.webp` (1052 × 1494 px).
> **Concepts de origem:** `concepts/concept-07.webp` (Bastidores) e `concepts/concept-08.webp` (CTA final + footer).
> **Fonte de verdade:** a imagem aprovada. Onde este documento ou `docs/consistency-review.md` divergirem da imagem, **a imagem prevalece** (ver `README.md`).

Esta slice não teve especificação escrita antes da geração. Este documento registra o **estado visual aprovado**.

---

## 1. Correções aplicadas no gate

| # | Correção | Resultado |
|---|---|---|
| 1 | Transformar o Concept 07 em seção escura/cacau | Bastidores sobre fundo cacau, quebrando a sequência de seções creme |
| 2 | Reduzir a repetição do bolo no Concept 08 | O fechamento não mostra bolo como protagonista |
| 3 | Transformar o fechamento em cena de embalagem/celebração | Caixa com a marca e laço, velas, flores, pratos e talheres dourados |
| 4 | Converter dados factuais não validados do footer em placeholders | `[TELEFONE]`, `[INSTAGRAM]`, `[LOCALIZAÇÃO]`, `[E-MAIL]`, `[HORÁRIO]`, `© [ANO]` |

Nenhuma outra correção foi aplicada nesta slice.

## 2. Estado aprovado

### Topo

- Onda creme na borda superior (fim da Slice 03) entrando no fundo cacau.

### Bastidores (fundo cacau)

- **Eyebrow:** linha + `POR TRÁS DE CADA DETALHE`.
- **Headline:** "O cuidado / que transforma / *ingredientes* / *em memórias.*" Serif creme; as duas últimas linhas em itálico caramelo.
- **Corpo:** "Antes de cada entrega, existem escolhas, ajustes e muito cuidado. São mãos que preparam, decoram, conferem e embalam, com o mesmo carinho que faz parte de cada criação do Ateliê Doces Bruna."
- **Fotos (3):**
  1. Grande, no alto à direita, sangrando até a borda: mãos com saco de confeitar decorando um bolo de chocolate com drip; avental com a marca.
  2. Moldura inferior esquerda: peneira polvilhando cacau sobre brigadeiros.
  3. Moldura inferior direita: mãos amarrando laço numa caixa com a marca, flores mosquitinho.

### Transição Bastidores → CTA final

- Onda escura (cacau → cacau) com fio caramelo na borda.

### CTA final (fundo cacau fotográfico)

- **Eyebrow:** linha + `AGORA FALTA APENAS`.
- **Headline:** "*o seu* / *momento.*" Serif itálica; "o seu" em creme, "momento." em caramelo.
- **Corpo:** "Conte o que você imagina. O Ateliê cuida dos detalhes para transformar sua celebração em algo feito para ser lembrado."
- **CTAs:**
  1. Primário: pill blush com ícone de WhatsApp `COMEÇAR UMA ENCOMENDA →`.
  2. Secundário: pill outline creme com ícone de Instagram `ACOMPANHAR NO INSTAGRAM →`.
- **Cena à direita:** caixa com a marca e laço, velas acesas, flores, taça, pratos com talheres dourados, tigela de brigadeiros e tecido rosado.

### Transição CTA → footer

- Onda creme sobe sobre o cacau.

### Footer (fundo creme)

| Coluna | Conteúdo |
|---|---|
| Marca | Flor + lockup empilhado "Ateliê Doces Bruna" + `CONFEITARIA ARTESANAL PARA MOMENTOS ESPECIAIS`; divisor vertical |
| `NAVEGAÇÃO` | A Marca · Bruna · Criações · Encomendas · Contato (**igual à nav do header**) |
| `CONTATO` | WhatsApp `[TELEFONE]` · Instagram `[INSTAGRAM]` + "Acompanhe no Instagram" · pin `[LOCALIZAÇÃO]` · envelope `[E-MAIL]` |
| `ATENDIMENTO` | Relógio `[HORÁRIO]` |

- **Barra inferior:** "© [ANO] Ateliê Doces Bruna. Todos os direitos reservados." à esquerda; `FEITO COM CUIDADO. SEMPRE.` à direita.
- Sem selo circular.

## 3. Desvios aceitos no gate

**Não são bugs.** A imagem prevalece.

| # | Referência | Imagem aprovada | Registro |
|---|---|---|---|
| 1 | Fotos de produto sem repetição na página | Bastidores mostra de novo um bolo de chocolate com drip | `DESVIO ACEITO NO GATE` (direção fotográfica) |
| 2 | Sugestão de nova headline para o 07 ("...ingredientes em presente") | Mantida "O cuidado que transforma ingredientes em memórias." | `DESVIO ACEITO NO GATE` (a sugestão nunca foi decisão aprovada) |
| 3 | Uma ideia em itálico, na segunda metade da headline | CTA final com a headline inteira em itálico ("*o seu momento.*") | `DESVIO ACEITO NO GATE` |
| 4 | Textos secundários do footer mais escuros | "Acompanhe no Instagram" em cinza claro sobre creme | `DESVIO ACEITO NO GATE` (escurecer na implementação) |

## 4. Placeholders e direção fotográfica

| Elemento | Situação |
|---|---|
| `[TELEFONE]`, `[INSTAGRAM]`, `[LOCALIZAÇÃO]`, `[E-MAIL]`, `[HORÁRIO]`, `© [ANO]` | **`[PLACEHOLDER]`**. Dados reais só com validação da Bruna |
| `CONFEITARIA ARTESANAL PARA MOMENTOS ESPECIAIS` | Tagline **a confirmar** com a Bruna |
| Lockup do footer | Aplicação visual; a logo definitiva vem do material oficial |
| Logo no avental e nas caixas | Aplicação visual; **não é arte final** |
| Bolo, brigadeiros, mãos e cena de celebração | **Direção fotográfica**; serão substituídos por bastidores, embalagens e produtos reais |

## 5. Notas para implementação (não alteram a imagem)

- Nav do footer idêntica à nav do header.
- Texto sobre foto (Bastidores e CTA final) com scrim cacau suficiente para ≥ 4,5:1.
- Botões com alvo ≥ 44px (48px no mobile); texto do botão blush em cacau/chocolate.
- Motion previsto: parallax sutil na foto grande dos Bastidores, image reveal nas molduras, onda subindo nas transições.
