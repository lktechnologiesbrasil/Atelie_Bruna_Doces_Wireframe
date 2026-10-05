# QA: página `/produtos`

> Objetivo: registrar como a página foi construída, como foi verificada e o que ainda difere do Concept 09 (`concept-09.webp`). Plano de origem: `docs/products-page-plan.md`. O site segue `noindex, nofollow`.

## Duas fontes de verdade

| | Fonte | Regra em conflito |
|---|---|---|
| Visual | Concept 09 aprovado | composição e layout |
| Factual | `src/data/products.ts` (snapshot auditado do Yooga) | produtos, preços, opções, descrições |

Nenhum nome, preço, sabor ou opção é escrito na página: tudo é renderizado a partir dos dados.

## Arquitetura

| Peça | Arquivo |
|---|---|
| Rota | `src/pages/produtos.astro` |
| Card | `src/components/ProductCard.astro` |
| Header (reaproveitado; ganhou `current`, `base`, `solid`) | `src/components/Header.astro` |
| Footer (extraído da Home, mesmo markup) | `src/components/Footer.astro` |
| Estilos da página | `src/styles/products.css` |
| Busca, trilho e entrada dos cards | `src/scripts/products.ts` |
| Busca pura (sem dados) | `src/lib/search.ts` |
| Helpers do catálogo | `src/lib/catalog.ts` |
| Nomes de apresentação | `src/data/products-display.ts` |
| Textos e links | `PRODUCTS_PAGE`, `LINKS.cardapio`, `LINKS.menuBolos` em `src/data/site.ts` |

Ordem da página: Hero curto → busca → trilho de categorias → introdução (54 produtos em 17 categorias, derivado dos dados) → grupos por categoria → bolos por encomenda → CTA final → footer.

## Comportamento

- **Busca** (cliente, sem biblioteca): nome, descrição e categoria, sem acento e sem diferenciar maiúsculas; também acha o nome de origem ("salchicha") e o de exibição ("enroladinho"). Filtra o HTML já renderizado (`li[data-search]`); mostra "Resultados para “…”" e, sem resultado, "Nenhuma criação encontrada." + "Ver todos os produtos". Esc limpa. Sem JS a busca nem aparece e o catálogo inteiro continua utilizável.
- **Categorias**: âncora com scroll até a seção (preserva a página editorial completa); "Todos" volta ao topo do catálogo e limpa a busca. O item atual do trilho acompanha a rolagem (`aria-current`).
- **Nomes de exibição**: o snapshot não foi tocado. `getProductDisplayName` / `getCategoryDisplayName` aplicam uma regra geral (espaços, emojis, "- " inicial, CAIXA ALTA) e `products-display.ts` guarda as correções pontuais (ex.: "Enrroladinho de salchicha" → "Enroladinho de salsicha"). `sourceName` e `name` de origem seguem rastreáveis.
- **Preço**: `formatBRL`; promoção = original riscado + promocional + selo "Oferta" (texto, não só cor); Açaí = "A partir de R$ 19,50", calculado por `getMinimumPurchasablePrice` a partir dos grupos de opções obrigatórias (o preço base de R$ 16,00 continua no snapshot).
- **Opções**: só "Possui opções" (7 produtos); sem modal.
- **CTA dos produtos**: "Ver no cardápio" → cardápio Yooga geral (`LINKS.cardapio`), nova aba, `noopener`. Não existe deep-link por item e nenhum foi inventado.

## Casos especiais

| Caso | Tratamento |
|---|---|
| `ATENÇÂO` (garfinho, R$ 0,01) | `kind: utility`. Fora do trilho e sem seção gastronômica: linha discreta no fim do catálogo, ainda pesquisável. **Continua nos dados** |
| `BEBIDAS` | categoria normal, apresentação compacta (foto inteira, só a seta) com o mesmo componente |
| `PRESENTEAR PODE & DEVE!` | `kind: gift`: título editorial em itálico + o Cartão presente vindo dos dados |
| Sem imagem (Cookie tradicional, Geladinho Sensação) | fallback da marca: superfície creme + flor + nome, sem simular foto e sem imagem gerada |
| Menu de Bolos (`CAKES_MENU.status = 'pending'`) | bloco "Bolos por encomenda" **sem** bolos, preços, sabores ou tamanhos. O link do Linktree exige login Google, então o CTA vai **temporariamente ao WhatsApp** com o rótulo "Pedir o menu de bolos" (`data-cakes-cta="whatsapp-fallback"`). Quando houver menu auditado e `LINKS.menuBolos` real, o CTA vira "Ver menu de bolos" sozinho |
| Grupos de 1–2 produtos | cards horizontais largos em vez de uma linha quase vazia |

## Responsivo

1440 → 4 colunas · 900–1199 → 3 · 700–899 → 3 (grupos de 1–2: 2 cards horizontais) · 480–699 → 2 · ≤ 479 → 1 coluna com card horizontal (legível em 360 px). Trilho horizontal com scroll-snap; busca em largura total. Cabeçalho do grupo é sticky no desktop e vira linha acima da grade no tablet/mobile.

## Motion

Mesmo sistema da Home: títulos `.h2` e eyebrows pelo `reveals.ts` existente; entrada do Hero em CSS puro (mesmos keyframes de `motion.css`); cards por **um** IntersectionObserver com transição CSS e stagger curto por grupo (nenhum ScrollTrigger novo). Tudo atrás de `html.motion-ready`: com reduced-motion ou sem JS a página já aparece completa.

## Verificação

Scripts nesta pasta (rodam contra `npm run build && npm run preview -- --port 4332`):

- `node docs/qa/products-page/qa-products.mjs`: dados (17 grupos, 53 cards + 1 item de serviço = 54, 4 promoções, 7 com opções, Açaí, 2 fallbacks, links Yooga), busca, categorias, teclado, overflow/alvos/texto mínimo por largura, sem JS, motion, reduced-motion, resize, CLS e console. Resultado em `qa-products.json`.
- `node tools/qa-a11y.mjs http://localhost:4332/produtos`: `qa-a11y.txt`.
- `node tools/qa-perf.mjs`: não concluiu nesta sessão (medição mobile com CPU 4× e rede lenta sobre a página de 54 imagens remotas ficou sem resultado); rodar de novo no computador de destino.
- `node tools/qa-capture.mjs` → screenshots `final-*.webp` (1440, 1024, 768, 390, 360).

## Diferenças restantes para o Concept

1. **Fotos**: o Concept usa fotografia de produto de alta resolução. Aqui só existem as fotos do Yooga (231–500 px de altura): o Hero é uma faixa de 4 fotos pequenas e os cards usam a imagem em ~290 px.
2. **Textos por categoria** ("Fatias generosas, com muito sabor…") e **"Ver todos →"**: não existem nos dados nem têm destino; foram omitidos.
3. **Descrições dos cards**: o Concept tem frases curtas inventadas; a página usa a descrição publicada (cortada em 3 linhas).
4. **Cards de Bolo de pote / Açaí / Presentear** em fileira de 3 cartões grandes: aqui seguem o ritmo do catálogo (Açaí e Bolos de pote nos seus grupos; Presentear com bloco próprio).
5. **Bolos por encomenda**: a foto é um recorte provisório da Master (`data-provisional`); o selo é o `Seal` da Home ("Feito com afeto"), não o texto do Concept; o CTA é "Pedir o menu de bolos" (WhatsApp) até o menu existir.
6. **CTA final**: fundo cacao com gradiente, sem as imagens de chocolate/cacau do Concept; eyebrow "A doçura sempre por perto" mantido.
7. **Header**: é o da Home (logo provisória, nav com "Bruna" e "Produtos"), não o do Concept. A nav tem uma entrada a mais que o Concept (Bruna).
8. **Trilho de categorias**: não é sticky (o Concept também não); as miniaturas são a primeira foto de cada categoria.
9. **Intro**: "O cardápio do Ateliê reunido em um só lugar…" substitui a frase do Concept, que afirmava "ingredientes de qualidade", ainda não validado com a Bruna.

## Pendências de conteúdo real

- Textos institucionais de `PRODUCTS_PAGE` precisam de aprovação da Bruna.
- Confirmar o cardápio Yooga como canal oficial (`LINKS.cardapio`).
- Menu de Bolos: arquivo ou link público para auditar e listar.
- Fotos próprias (as do Yooga são pequenas) e autorização de uso; imagem real para o bloco de bolos.
- `displayName` definitivo (grafias, "c/", marcas de terceiros) com a Bruna.
- Item de serviço (garfinho) e cartão presente: confirmar se aparecem no site.
- Indexação, descrição da página e URL final continuam pendentes (`noindex, nofollow`).
