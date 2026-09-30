# Master Reference, Slice 02 / 04: Bruna + Criações

> **Status:** `APPROVED` (gate visual realizado fora do repositório).
> **Imagem canônica:** `docs/master-reference/slice-02.webp` (1024 × 1536 px).
> **Concepts de origem:** `concepts/concept-03.webp` (Bruna) e `concepts/concept-04.webp` (Criações).
> **Fonte de verdade:** a imagem aprovada. Onde este documento ou `docs/consistency-review.md` divergirem da imagem, **a imagem prevalece** (ver `README.md`).

Esta slice não teve especificação escrita antes da geração. Este documento registra o **estado visual aprovado**.

---

## 1. Correção aplicada no gate

| # | Correção | Resultado |
|---|---|---|
| 1 | Substituir a repetição visual do bolo de chocolate no Concept 04 | Galeria de Criações com bolo claro de morangos e pistache, cheesecake com morangos e calda, e brigadeiros variados |

Nenhuma outra correção foi aplicada nesta slice.

## 2. Estado aprovado

### Bruna (fundo creme que se funde à foto)

- **Eyebrow:** linha + `SOBRE A BRUNA`.
- **Headline:** "A delicadeza / da marca / começa em / *quem a criou.*" Serif cacau; o trecho final em itálico caramelo.
- **Corpo (1ª pessoa, dois parágrafos):**
  - "Sou a Bruna, e cada doce que sai do ateliê carrega um pouco da minha história, do meu olhar atento aos detalhes e do carinho que coloco em tudo o que faço."
  - "Acredito que a confeitaria vai além do sabor: ela tem o poder de aproximar, acolher e transformar momentos simples em lembranças inesquecíveis."
- **Assinatura:** script manuscrito "Bruna" com a **flor grande em linha** ao lado.
- **Foto:** retrato à direita, sangrando até a borda: mulher de avental com a marca, salpicando confeito sobre um bolo de chocolate com drip e brigadeiros. Flores mosquitinho e tigela de lascas de chocolate.

### Transição Bruna → Criações

- Onda creme sobre creme, com um trecho de tecido rosado na borda esquerda. Sem copy.

### Criações (fundo creme)

- **Eyebrow:** linha + `NOSSAS CRIAÇÕES`.
- **Headline:** "Criações que / começam / *nos olhos e* / *ficam na memória.*" Serif cacau; as duas últimas linhas em itálico caramelo.
- **Corpo:** "Bolos, doces e sobremesas artesanais, feitos com ingredientes selecionados, técnicas cuidadosas e muito afeto, para transformar cada ocasião em um momento especial."
- **CTA:** pill blush `DESCUBRA AS CRIAÇÕES →`.
- **Galeria (4 molduras com borda off-white, sobrepostas):**
  1. Principal: bolo claro com morangos e pistache em pedestal de cerâmica.
  2. Recorte vertical à direita: close da fatia do mesmo bolo.
  3. Brigadeiros variados (chocolate, pistache, coco, framboesa) em prato.
  4. Fatia de cheesecake com morangos e calda de caramelo.
- **Base:** tecido rosado e prato de cerâmica pontilhada na borda inferior.
- Sem selo circular.

## 3. Desvios aceitos no gate

Diferenças em relação às regras de `docs/consistency-review.md`. **Não são bugs.** A imagem prevalece.

| # | Regra da revisão | Imagem aprovada | Registro |
|---|---|---|---|
| 1 | Fotos de produto sem repetição dentro da página | O retrato da Bruna mostra de novo um bolo de chocolate com drip | `DESVIO ACEITO NO GATE` (direção fotográfica) |
| 2 | Tecido marrom no máximo em 2 fronteiras | Tecido rosado na transição interna e na base da slice | `DESVIO ACEITO NO GATE` |
| 3 | Texto de botão blush em cacau/chocolate | `DESCUBRA AS CRIAÇÕES` em caramelo sobre blush | `DESVIO ACEITO NO GATE` (ajustar contraste na implementação, ver §5) |

## 4. Placeholders e direção fotográfica

| Elemento | Situação |
|---|---|
| Pessoa retratada na seção Bruna | **Direção fotográfica**; a pessoa gerada **não é a Bruna**. Usar foto real da Bruna |
| Texto em 1ª pessoa ("Sou a Bruna...") | **`[PLACEHOLDER]`**; precisa de aprovação da Bruna |
| Assinatura manuscrita "Bruna" | **`[PLACEHOLDER]`**; usar a assinatura real, se existir |
| Logo no avental | Aplicação visual; **não é arte final** |
| Bolos, cheesecake e brigadeiros da galeria | **Direção fotográfica**; serão substituídos pelo portfólio real |
| "ingredientes selecionados", "artesanais" | Claims **não validados**; confirmar com a Bruna |

## 5. Notas para implementação (não alteram a imagem)

- Texto do botão blush em cacau/chocolate para atingir ≥ 4,5:1.
- Eixo esquerdo de ~80px em 1440px.
- A flor grande em linha aparece aqui (assinatura) e na jornada da Slice 03. Em nenhum outro lugar.
- Motion previsto: parallax sutil no retrato, type reveal nas headlines, image reveal com stagger na galeria.
