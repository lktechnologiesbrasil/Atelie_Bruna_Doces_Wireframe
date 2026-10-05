# Plano da futura página `/produtos`

> **Só planejamento.** Nada disso está implementado: não existe a rota, nem `ProductCard`, nem navegação nova, e a Home não mudou. O próximo passo é o **concept visual**, que precisa ser aprovado antes de qualquer interface. O site segue `noindex, nofollow`.

## Fundação de dados (já pronta)

| Peça | Onde | O que faz |
|---|---|---|
| Snapshot auditado | `src/data/products.ts` | tipos + `CATEGORIES` (17 categorias, 54 produtos) + `CATALOG_SNAPSHOT` + `CAKES_MENU` |
| Helpers | `src/lib/catalog.ts` | `formatBRL`, `getCategories`, `getProductsByCategory`, `PRODUCTS`, `hasPromotion`, `getEffectivePrice`, `normalizeSearchText`, `buildSearchIndex`, `searchProducts` |
| Evidência | `docs/products-audit.md`, `docs/products-audit.json`, `docs/products-audit-raw/` | origem de cada dado |

Regras que a página herda:

- **Snapshot local, sem fetch em runtime.** Estabilidade, SEO, performance e independência do Yooga. Atualizar = refazer a auditoria e substituir o snapshot.
- **Preços em centavos**, sempre via `formatBRL`. Promoção só quando `promotionalPriceCents < priceCents` (`hasPromotion`).
- **`availability` é `unknown` em todos os produtos.** A API não expõe estoque e item esgotado some do menu. A UI **não** pode afirmar "disponível" nem "em estoque"; o CTA leva ao Yooga, que é quem sabe.
- **Nada inventado:** nomes, descrições e preços são os publicados. Correções só de apresentação entram num futuro `displayName` (ver "Decisões em aberto").
- **Menu de Bolos não auditado** (`CAKES_MENU.status = 'pending'`): nenhum bolo por encomenda existe no catálogo.

## Arquitetura aprovada

### 1. Hero curto
Apresentação de Criações / Produtos. Editorial, mesma identidade da Home (Playfair + eyebrow + onda). Curto: o catálogo é o assunto.

### 2. Category nav
`Todos` + as 17 categorias reais, na ordem do Yooga. Desktop: sticky. Mobile: trilho horizontal com scroll-snap (mesmo padrão dos trilhos da Home), alvo de toque confortável e foco visível. As categorias `utility` e `gift` não precisam disputar o mesmo peso das gastronômicas (ver abaixo).

### 3. Search
Busca simples, client-side, acessível (rótulo, `type=search`, resultado anunciado). Por nome, descrição e categoria, sem acento. Usa `searchProducts` / `buildSearchIndex` (54 itens, sem biblioteca). O índice é serializável e pode ser embutido na página.

### 4. Product catalog
Agrupado por categoria (`CATEGORIES`), com cada categoria como seção com `h2` (conteúdo indexável quando a indexação for liberada). Categorias sem resultado na busca somem; busca vazia mostra tudo.

### 5. Product card
Imagem · nome · descrição curta · preço · preço promocional · indicador de opções · CTA para o Yooga/cardápio.

- **Imagem:** o CDN do Yooga entrega 231 a 500 px de altura (52 imagens únicas). Não servem para cards grandes nem para o Hero: card pequeno ou compacto, sem ampliar. 2 produtos não têm imagem (`imageUrl: null`): o card precisa de um estado sem foto digno (tipográfico), **sem imagem genérica gerada por IA**.
- **Descrição curta:** truncar na apresentação; o texto completo continua no dado.
- **Preço:** `getEffectivePrice` em destaque e `priceCents` riscado quando `hasPromotion`.
- **Indicador de opções:** só quando `optionGroups.length > 0` (hoje 7 produtos: Adicionais, Calda extra, Complementos do Açaí). Sabores **não** são opções: cada sabor já é um produto.
- **CTA:** ver "Integração com o Yooga".

### 6. Cakes CTA
Bloco **separado** "Bolos por encomenda". Conteúdo **pendente** até o acesso ao Menu de Bolos (`CAKES_MENU.status === 'pending'`): sem itens, sem preços, sem sabores. Enquanto isso, pode apenas convidar a conversar pelo WhatsApp.

### 7. Final CTA
WhatsApp + Cardápio Yooga.

## Tratamento das categorias especiais

| Categoria | `kind` | Apresentação futura |
|---|---|---|
| `ATENÇÂO🔴` (garfinho, R$ 0,01) | `utility` | Serviço/complemento do pedido: nota discreta ou item compacto fora da navegação principal, nunca uma grande seção gastronômica. O dado fica no catálogo |
| `BEBIDAS` | `drink` | Categoria normal, que aceita apresentação compacta (lista, sem foto grande) |
| `🥰PRESENTEAR PODE & DEVE!` (cartão presente) | `gift` | Pode ganhar destaque próprio (presente) |
| Demais 14 | `food` | Catálogo gastronômico |

## Direção de UX

A página **não** pode parecer Mercado Livre, iFood, cardápio genérico, dashboard nem e-commerce pesado. Ela pertence à mesma marca premium da Home.

**Editorial + funcional:** Hero e títulos mantêm a identidade editorial; o catálogo é mais funcional e compacto, com respiro, hierarquia tipográfica e paleta de cacau/creme/caramelo já definidas em `src/styles/tokens.css`. Sem carrinho, sem contadores, sem selos de promoção gritantes.

## Responsividade (futura)

| Viewport | Catálogo | Navegação |
|---|---|---|
| Desktop | grade de 3 a 4 colunas conforme a largura, bastante respiro | categorias sticky |
| Tablet | 2 a 3 colunas | categorias sticky ou trilho |
| Mobile | 1 a 2 colunas conforme a largura | trilho horizontal com snap, busca acessível, CTA confortável |

Motion segue o sistema existente (`html.motion-ready`, reduced-motion respeitado); nada novo é planejado aqui.

## Integração com o Yooga

Não há carrinho próprio. O site é uma **camada de descoberta**. O CTA do produto levará futuramente:

- ao **item correspondente**, **se** existir URL/deep-link confiável (hoje **não** existe nenhum: o app não expõe URL de item e `sourceUrl` nem faz parte do modelo); ou
- ao **cardápio** (`https://delivery.yooga.app/ateliedocesbruna`; destino a confirmar com a Bruna, ver `LINKS.criacoes` em `src/data/site.ts`).

**Não inventar deep links.** Se um dia existirem, adicionar `sourceUrl` ao `Product` junto com o uso real.

## SEO futuro

A arquitetura de dados já permite: `title` e `description` próprios da página (via `resolveSeo` em `src/lib/seo.ts`), uma hierarquia `h1` → `h2` por categoria → `h3` por produto, e conteúdo indexável no HTML estático. **Nada disso muda a indexação:** `SEO.allowIndexing = false` (`noindex, nofollow`) e `public/robots.txt` continuam bloqueando tudo. Dados estruturados de produto (JSON-LD) só fariam sentido com disponibilidade e preço confiáveis; **não** planejados agora.

## Decisões em aberto (precisam da Bruna ou do concept)

1. **Produto-símbolo e fotografia.** O Yooga não vende bolo inteiro; a Home tem direção centrada em bolos (ver `docs/bruna-validation-gate.md`). A página precisa de uma linha editorial coerente.
2. **Imagens.** As do Yooga têm no máximo 500 px: aceitar o tamanho pequeno nos cards ou pedir fotos novas (e autorização de uso).
3. **Menu de Bolos.** Pedir o arquivo ou o link público; só então auditar e adicionar.
4. **Nomes de apresentação (`displayName`).** Os nomes publicados têm emojis, `;)`, espaços duplos, `- ` no início (Caseirinhos), grafias como "ATENÇÂO", "Enrroladinho" e "Açai", e MAIÚSCULAS. Decidir, com a Bruna, o que corrigir na apresentação sem tocar no dado de origem.
5. **Marcas de terceiros** em nomes e descrições (Nutella, Ferrero, Danette, Coca-Cola): política de uso no site.
6. **Destino do CTA** ("Descubra as criações" / cardápio): confirmar com a Bruna.
7. **Itens de serviço** (garfinho, cartão presente): mostrar ou omitir na página.

## O que NÃO é desta fase

Rota `/produtos`, `ProductCard`, navegação/botão novo, mudança na Home, motion, integração com a API em runtime, carrinho, download das 52 imagens, geração de imagens e qualquer ativação de indexação.
