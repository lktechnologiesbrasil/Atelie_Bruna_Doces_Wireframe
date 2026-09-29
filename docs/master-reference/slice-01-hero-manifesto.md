# Master Reference, Slice 01 / 04: Hero + Manifesto

> **Status:** especificação canônica para geração da imagem. **Nenhuma imagem foi gerada e nenhuma implementação foi iniciada.**
> **Base:** `docs/consistency-review.md` (gate **READY FOR MASTER REFERENCE**) e o pedido de construção da Master Reference.
> **Escopo:** somente Concept 01 e Concept 02. Não avançar para as Slices 02, 03 ou 04.

---

## 1. Objetivo

Consolidar duas seções já aprovadas da mesma homepage em **uma única imagem vertical high-fidelity**, contínua, como se fosse uma captura de tela do site desenvolvido:

```
CONCEPT 01 (Hero / Impacto)
        ↓
TRANSIÇÃO REAL (onda creme sobe sobre o cacau)
        ↓
CONCEPT 02 (Manifesto / Essência)
```

Não é uma nova proposta visual, nem um novo concept, nem uma reinterpretação. **Não é** "Concept 01 + corte + Concept 02". Ao olhar a imagem, deve-se acreditar que se rolou do Hero até o Manifesto **sem sair do mesmo website**.

Corrigir somente o que for necessário para unir as duas imagens numa página contínua. Preservar rigorosamente identidade, tipografia, headlines, branding, fotografia, composição, paleta, hierarquia e intenção visual.

## 2. Referências obrigatórias

| Ordem | Arquivo | Papel |
|---|---|---|
| 1 | `concepts/concept-01.webp` | Hero / Impacto (referência obrigatória) |
| 2 | `concepts/concept-02.webp` | Manifesto / Essência (referência obrigatória) |

Os dois arquivos devem ser anexados ao gerador. A imagem gerada **reconstrói a união**, e não cola os arquivos.

## 3. Dimensões-alvo

| Item | Valor |
|---|---|
| Largura | **1440px** (fixa) |
| Altura total | **~1880–2000px** (alvo ~1940px) |
| Orientação | Vertical |

**Divisão vertical de referência** (aproximada, com sobreposição na transição):

| Faixa | y (aprox.) | Conteúdo |
|---|---|---|
| Header | 0–105 | Header canônico sobre a foto |
| Hero | 0–~930 | Hero cacau até a crista da onda |
| Transição | ~830–~1040 | Onda creme invade o cacau; faixa "feito à mão" na crista |
| Manifesto | ~1000–~1940 | Manifesto sobre creme |

O importante é preservar a largura e dar espaço suficiente às duas seções. As alturas refletem a função: o Hero pode ser maior, o Manifesto deve respirar.

## 4. Grid global

| Parâmetro | Valor |
|---|---|
| Viewport de referência | **1440px** |
| Conteúdo principal | **~1280px** |
| Margens laterais | **~80px** (eixo x = 80 à esquerda, x = 1360 à direita) |

O eixo esquerdo de 80px vale para logo, eyebrows, headlines, corpo e CTAs de **ambas** as seções. Esse eixo se mantém em toda a Master Reference (Slices 02 a 04 incluídas). Os concepts originais têm margens diferentes (Hero ~90px, Manifesto ~100px) e devem ser normalizados.

## 5. Composição do Concept 01 (Hero)

**Preservar:**

- Fundo **cacau cinematográfico**, foto quente, escura, com profundidade.
- **Produto protagonista** à direita: o bolo de chocolate com drip, brigadeiros e lascas, em prato de cerâmica craquelada sobre pedestal. Não trocar o produto principal.
- Composição assimétrica: texto à esquerda, produto grande à direita, flores brancas e vaso ao fundo.
- **Header canônico** (ver §6).
- **Eyebrow:** flor pequena + linha + `DOCES QUE CONTAM HISTÓRIAS`.
- **Headline** (não alterar, nem trocar a quebra):

  > Mais que
  > doces,
  > *momentos*
  > inesquecíveis.

  "Mais que doces," e "inesquecíveis." em creme/branco quente (serif editorial). "*momentos*" em **serif itálica caramelo**. É a única ideia em itálico.
- **Corpo:** "No Ateliê Doces Bruna, criamos bolos e doces artesanais que tornam cada ocasião mais doce, bonita e significativa." em sans refinada, ~16–18px equivalente, em creme.
- **CTA principal:** botão pill blush com `CONHEÇA O ATELIÊ →`, texto cacau/chocolate.
- **Indicador de scroll:** `SCROLL PARA DESCOBRIR` com linha vertical e ponto (pequeno, discreto).
- **Selo circular único:** `FEITO À MÃO · COM PROPÓSITO`, com flor ao centro e raminhos laterais, à direita do produto (mesma posição do concept, sobre o vaso).
- Atmosfera sofisticada, fotografia quente, tons de cacau, caramelo e rosa-poeira.

**Ajustes de consolidação:**

- Reposicionar o texto sobre o eixo esquerdo x = 80.
- Remover do fim do Hero a faixa duplicada `feito à mão / ingredientes reais / histórias verdadeiras` (ela passa a existir só na transição, ver §7 e §9).

## 6. Header canônico (Concept 01 → header oficial da landing)

| Zona | Conteúdo |
|---|---|
| Esquerda | **Wordmark da marca**: `ATELIÊ` em uppercase espaçado sobre `d✿ces bruna` (a flor substitui o "o"), como está no Concept 01 |
| Centro | Navegação: **A Marca · Bruna · Criações · Encomendas · Contato** |
| Direita | `INSTAGRAM` · separador · `WHATSAPP` · botão pill blush **`ENCOMENDAR →`** |

- Linha fina horizontal sob o header, em creme translúcido.
- **Não inventar outra navegação e não criar outra versão da logo.** A logo definitiva vem do material oficial da Bruna; a imagem mostra somente a **aplicação visual**.
- Todos os textos do header em uppercase com tracking, ≥ ~12px equivalente.

## 7. Transição 01 → 02 (especificação exata)

Esta é a parte mais importante da Slice.

**Conceito:** o Hero cacau é gradualmente *invadido* por uma superfície **creme / off-white**, através de uma **onda orgânica elegante**. Essa onda pertence visualmente ao Concept 02: é o topo curvo da seção de baixo.

**Leitura obrigatória:** `CACAU → CREME`, como uma transição contínua, sem corte reto e sem emenda visível.

| Aspecto | Especificação |
|---|---|
| Início da onda | ~y = 830 (base do Hero, onde o concept 01 já inicia a onda) |
| Forma | Curva longa e suave, com uma crista mais alta à direita ou ao centro e vale suave à esquerda; amplitude ~90–130px. Sem picos, sem serrilhado |
| Cor da onda | Creme `#FBF1E6` → off-white `#FFF8F0` (leve gradiente, sem textura pesada) |
| Borda | Nítida, mas macia. Sombra muito sutil (≤ 6% de opacidade) só na borda superior, para dar profundidade |
| Fundo atrás | Continuação do Hero (foto cacau) visível abaixo da crista, escurecendo para cacau chapado, sem "buraco" |
| Faixa "feito à mão" | **Uma única vez**, sobre a crista (ver §9) |
| Elemento atravessando | A linha fina caramelo da faixa é o único fio que liga as duas seções |
| Textura | O creme pode ter um leve relevo de papel; sem tecido marrom repetido |

Não pode haver: corte reto, sobreposição de duas ondas concorrentes, faixa de tecido marrom no limite, nem repetição do rodapé do Hero no topo do Manifesto.

**Motion a considerar depois (a imagem é estática):** a onda sobe sobre o Hero (section transition).

## 8. Composição do Concept 02 (Manifesto)

Sobre **creme**, com **bastante espaço negativo**. Protagonismo: **texto + fotografia + espaço**.

**Preservar:**

- **Eyebrow:** linha + `MANIFESTO DA MARCA` (uppercase, tracking, caramelo escuro).
- **Headline** (não alterar):

  > Cada criação
  > carrega afeto,
  > *cuidado e*
  > *memória.*

  Em cacau (serif editorial). Somente "*cuidado e memória.*" em **serif itálica caramelo**: uma única ideia em itálico.
- **Texto de manifesto** (curto, em sans refinada, ~16–18px equivalente, cor chocolate): "Acreditamos que doces são mais do que sabores. São formas de celebrar a vida, de transformar momentos simples em lembranças inesquecíveis, com ingredientes reais e um toque artesanal em cada detalhe."
- **Composição editorial:** texto à esquerda (x 80 a ~640), colagem fotográfica à direita (até x = 1360).
- **Fotografia artesanal**, no máximo 3 molduras retangulares com borda off-white, sobrepostas de forma ordenada:
  1. Principal: mão salpicando granulado sobre um doce redondo.
  2. Secundária alta: caixa com laço de fita.
  3. Terciária: brigadeiro/doce em prato.
- Uma linha fina caramelo elegante, única, ligando texto e colagem (opcional e discreta).

**Ajustes obrigatórios:**

- **Remover** o selo circular `DOCE COM PROPÓSITO` do Manifesto.
- **Remover** a flor grande decorativa em linha (a do canto inferior esquerdo da colagem).
- **Remover** a faixa de tecido marrom no fim do Manifesto e a ornamentação redundante em geral.
- Reposicionar tudo sobre o eixo esquerdo x = 80.
- **Não repetir a foto do Hero.** O bolo com drip não reaparece. As três fotos do Manifesto mostram mãos, doce e embalagem. São **direção fotográfica**, não assets finais.
- Não inventar cenas extras e não adicionar cards.

## 9. Faixa "feito à mão": UMA ÚNICA VEZ

Hoje a faixa existe no fim do concept 01 **e** no início do concept 02, duplicada.

| Regra | Valor |
|---|---|
| Ocorrências na Slice | **1** |
| Posição | Na **crista** da onda de transição (a vista, sobre a superfície creme) |
| Conteúdo | Script manuscrito `feito à mão` + linha fina + `INGREDIENTES REAIS` / `HISTÓRIAS VERDADEIRAS` (duas linhas, uppercase, tracking) |
| Script | Caramelo escuro; é 1 das 2 únicas ocorrências de script na página (a outra será a assinatura da Bruna) |
| Alinhamento | Centrado no eixo da página ou alinhado ao grid; nunca colado ao topo do Manifesto |
| Duplicação | **Proibida** no fim do Hero, no topo do Manifesto ou como bloco extra |

> **Nota:** as expressões "ingredientes reais" e "histórias verdadeiras" são claims **não validados**. Aparecem na imagem apenas como direção visual. Ver `docs/consistency-review.md` (PLACEHOLDERS).

## 10. Elementos que permanecem × que são removidos

| Permanece | Remove |
|---|---|
| Fundo cacau e foto do Hero, produto protagonista | Faixa `feito à mão` duplicada no fim do Hero |
| Header canônico completo | Selo `DOCE COM PROPÓSITO` do Manifesto |
| Headline "Mais que doces, *momentos* inesquecíveis." | Flor grande decorativa do Manifesto |
| Eyebrow, corpo, CTA, indicador de scroll | Faixa de tecido marrom no fim do Manifesto |
| **Um** selo circular (Hero) | Repetição da mesma foto do Hero no Manifesto |
| Onda creme (nova, contínua) | Qualquer footer, cards ou elementos dos Concepts 03–08 |
| Headline "Cada criação carrega afeto, *cuidado e memória.*" | Novos selos, novas flores, novas ornamentações |
| Manifesto + colagem de 3 fotos | Textos de contato (não fazem parte desta Slice) |
| Faixa `feito à mão` (uma vez, na crista) | |

## 11. Regra do selo único

- **Um único selo circular** em toda a Slice, **no Hero** (`FEITO À MÃO · COM PROPÓSITO`).
- **Zero** selos novos no Manifesto.
- **Flor da marca:** só como símbolo pequeno de branding (logo, eyebrow do Hero, centro do selo). **Nunca** como flor grande decorativa no Manifesto.

## 12. Sistema tipográfico

| Estilo | Uso nesta Slice | Regras |
|---|---|---|
| **Serif editorial** (alto contraste) | Headlines do Hero e do Manifesto | 2–4 linhas; cacau sobre claro, creme sobre escuro |
| **Serif itálica** | Somente **uma** ideia por headline: "*momentos*" e "*cuidado e memória.*" | Caramelo; é a assinatura tipográfica |
| **Sans refinada** | Corpo e interface | ~16–18px equivalente |
| **Uppercase com tracking largo** | Eyebrows, labels, botões, nav | ≥ ~12px equivalente |
| **Script manuscrito** | Somente `feito à mão` | Nenhuma outra ocorrência na Slice |

**Não introduzir outras famílias tipográficas.**

## 13. Cores (hex estimados; a extrair do material oficial da Bruna)

| Cor | Hex aproximado | Uso |
|---|---|---|
| **Cacau** | `#2B1810` | Fundo escuro do Hero; headlines sobre claro |
| **Chocolate** | `#5A3020` | Corpo de texto sobre claro |
| **Creme** | `#FBF1E6` | Superfície principal do Manifesto e da onda |
| **Off-white** | `#FFF8F0` | Molduras de foto, superfícies suaves |
| **Blush** | `#F8D5C4` | CTAs e superfícies suaves |
| **Caramelo** | `#B96B45` | Ênfase tipográfica (texto grande) e linhas |
| **Caramelo escuro** | `#9A5233` | Textos pequenos sobre claro |
| **Caramelo claro** | `#D9A184` | Itálico/labels sobre fundo escuro |

Nenhuma outra paleta. Nada de tons frios, verdes ou neutros acinzentados.

## 14. Acessibilidade visual

- **Microcopy** ≥ ~12px equivalente; **corpo** ≥ ~16px equivalente.
- **Caramelo `#B96B45` só em texto grande.** Textos pequenos sobre creme usam **caramelo escuro** ou chocolate (≥ 4,5:1).
- **Textos sobre foto** (Hero): manter scrim/gradiente cacau à esquerda para garantir leitura. O corpo em creme deve ter contraste ≥ 4,5:1 com o fundo.
- **CTAs** (`CONHEÇA O ATELIÊ`, `ENCOMENDAR`) claramente identificáveis: pill blush, texto cacau/chocolate, alvo de toque ≥ 44px de altura.
- Sem texto cinza claro sobre creme.
- Numerais e ornamentos decorativos não carregam informação.

## 15. Coerência entre as duas seções

As duas seções compartilham:

- o **mesmo eixo de margem** (x = 80 / 1360);
- a **mesma escala tipográfica** (headlines na mesma família e proporção; corpo ~16–18px);
- o **mesmo sistema de linhas** (fio fino caramelo, mesma espessura);
- a **mesma linguagem de CTA** (pill blush);
- a **mesma temperatura fotográfica** (quente, âmbar, sem cinza);
- o mesmo **Design DNA** aprovado.

## 16. Restrições (o que NÃO fazer)

- Não criar nova headline nem novo hero.
- Não trocar o produto principal (bolo do Hero).
- Não criar nova marca ou outra versão de logo.
- Não alterar completamente a composição.
- Não inventar cards.
- Não adicionar novos selos.
- Não encher a página de flores.
- Não mudar de paleta.
- Não transformar o Manifesto em seção corporativa.
- Não colocar footer.
- Não adicionar elementos dos Concepts 03 a 08.
- Não desenhar efeitos de motion artificiais na imagem (ela é estática).
- **Não gerar as Slices 02, 03 ou 04 agora.**

## 17. Motion (só como sugestão; a imagem é estática)

| Área | Motion futuro |
|---|---|
| Hero | slow scale, parallax sutil, type reveal |
| Transição | onda subindo |
| Manifesto | text reveal, image reveal |

## 18. Prompt sugerido para o gerador

> Crie **uma única imagem vertical** de **1440px de largura e ~1940px de altura**, high-fidelity, mostrando uma captura contínua da landing page do **Ateliê Doces Bruna**: **Hero escuro (cacau) → transição orgânica → Manifesto claro (creme)**. Use as duas imagens anexadas como referência obrigatória: a primeira é o Hero, a segunda o Manifesto. **Não cole as imagens: reconstrua a união como uma única página real.**
>
> Grid: conteúdo em 1280px, margens laterais de 80px, eixo esquerdo em x = 80 em ambas as seções.
>
> **Hero:** preserve fundo cacau cinematográfico, bolo de chocolate com drip como protagonista à direita, header (wordmark do Ateliê Doces Bruna à esquerda; nav *A Marca, Bruna, Criações, Encomendas, Contato*; *Instagram*, *WhatsApp* e botão *Encomendar*), eyebrow *Doces que contam histórias*, headline *"Mais que doces, momentos inesquecíveis."* (serif editorial, "momentos" em itálico caramelo), corpo curto, botão pill blush *Conheça o Ateliê*, indicador de scroll e **um único selo circular** "Feito à mão · com propósito".
>
> **Transição:** uma **onda orgânica creme/off-white** sobe sobre o Hero cacau, contínua e elegante, sem corte reto. Na crista da onda, **uma única vez**, o script manuscrito *"feito à mão"* com uma linha fina e *"Ingredientes reais / Histórias verdadeiras"*.
>
> **Manifesto:** fundo creme, muito espaço negativo, eyebrow *Manifesto da marca*, headline *"Cada criação carrega afeto, cuidado e memória."* (serif editorial; "cuidado e memória." em itálico caramelo), texto curto de manifesto, e colagem de **3 fotos artesanais** (mão salpicando granulado, caixa com fita, doce em prato), **sem repetir o bolo do Hero**.
>
> **Remova do Manifesto:** o selo circular, a flor grande decorativa, a faixa de tecido marrom e qualquer ornamentação redundante.
>
> Tipografia: serif editorial para headlines, serif itálica em caramelo para **uma** ideia por headline, sans refinada para corpo, uppercase com tracking para eyebrows e botões. Cores: cacau, creme, off-white, blush, caramelo. Microcopy ≥ 12px, corpo ≥ 16px, caramelo claro só em texto grande.
>
> **Não** adicione footer, cards, novos selos, novas flores, nem elementos de outras seções. **Não** crie nova headline, novo hero ou nova marca. O resultado deve parecer **uma única homepage real**, não dois concepts colados.

## 19. Checklist de aceitação da imagem gerada

**Formato**
- [ ] Largura de 1440px e altura entre ~1880 e ~2000px.
- [ ] Uma única imagem vertical (sem emendas nem costuras visíveis).
- [ ] Conteúdo respeitando margens de ~80px nos dois lados.

**Hero**
- [ ] Fundo cacau cinematográfico e produto protagonista preservados (o mesmo bolo).
- [ ] Header canônico completo (wordmark, 5 itens de nav, Instagram, WhatsApp, `ENCOMENDAR`).
- [ ] Headline igual ao aprovado, com "*momentos*" em itálico caramelo.
- [ ] CTA `CONHEÇA O ATELIÊ` legível.
- [ ] **Um único selo circular** em toda a imagem.

**Transição**
- [ ] Onda creme orgânica e contínua (cacau → creme), sem corte reto.
- [ ] **Faixa "feito à mão" aparece uma única vez**, na crista da transição.
- [ ] Nenhuma faixa duplicada no fim do Hero ou no topo do Manifesto.
- [ ] Nenhuma faixa de tecido marrom no limite entre as seções.

**Manifesto**
- [ ] Headline igual ao aprovado, com "*cuidado e memória.*" em itálico caramelo.
- [ ] Texto de manifesto curto e legível (~16px equivalente).
- [ ] Colagem de no máximo 3 fotos, **sem repetir o bolo do Hero**.
- [ ] **Sem selo circular** e **sem flor grande decorativa**.
- [ ] Bastante espaço negativo; a seção respira.

**Sistema**
- [ ] Mesmo eixo de margem, mesma escala tipográfica e mesma linguagem de linhas e CTAs nas duas seções.
- [ ] Nenhuma outra família tipográfica além das definidas.
- [ ] Somente a paleta cacau, creme, off-white, blush e caramelo.

**Acessibilidade**
- [ ] Microcopy ≥ ~12px e corpo ≥ ~16px.
- [ ] Caramelo claro só em texto grande; textos pequenos com contraste mais escuro.
- [ ] Texto sobre foto legível (scrim/gradiente).

**Restrições**
- [ ] Sem footer, cards, novos selos, novas flores ou elementos dos Concepts 03–08.
- [ ] Sem nova headline, novo hero, novo produto principal ou nova logo.
- [ ] Parece **uma única homepage real**, não dois concepts colados.

**Conteúdo**
- [ ] Nenhum dado de contato, depoimento ou claim tratado como validado (ver `docs/consistency-review.md`).

---

*Fim da especificação da Slice 01 / 04. A Slice 02 (Concepts 03 e 04) só começa após aprovação desta.*
