# Auditoria de conteúdo real e assets (Etapa 8)

> Objetivo: saber **exatamente** o que já é real, o que ainda é provisório e o que precisamos pedir à Bruna. Nada aqui é "achismo": cada item tem a fonte. `noindex, nofollow` mantido; nada publicado.

## Categorias

| Estado | Significa |
|---|---|
| `VERIFIED_REAL` | Oficial/autêntico **e** seguro para produção (origem + autorização registradas) |
| `REAL_BUT_NEEDS_CONFIRMATION` | Aparentemente real/original, mas a Bruna precisa confirmar antes de publicar |
| `REAL_BUT_NOT_SUITABLE` | Real, mas tecnicamente/visualmente inadequado para o slot (mantém-se o provisório) |
| `PROVISIONAL` | Crop da Master, concept ou IA, só para desenvolvimento |
| `MISSING` | Não existe |

## O que foi pesquisado

- **Este repositório (todo o histórico, todas as refs):** só existem `concepts/` (8 imagens), `docs/master-reference/` + `design-systems/.../reference.webp` (Master) e `src/assets/provisional/` (33 recortes da Master). **Nada é material da marca.** Os próprios docs afirmam que os concepts/Master são geração visual (`docs/consistency-review.md`: "Aparecer em um concept não torna a informação verdadeira, oficial ou autorizada"). Sem `mocks/`, sem `public/` de marca, sem outras branches ou stashes.
- **Projeto irmão fora do repositório:** `…/Desenvolvimento_Operacao/Ateliê_Doce_Bruna/` (um concept anterior do mesmo cliente). É a única fonte de material real encontrada: dados observados publicamente em 2026-09-26 (Instagram, Linktree, Yooga, Google) e **11 arquivos baixados de fontes públicas** em `references/_public-cache/` (pasta ignorada pelo Git de lá, com `TRACEABILITY.md` registrando a URL de cada um). Os próprios docs de lá registram: *"Nenhum arquivo foi recebido"* da Bruna, uso **só para concept/pitch**, e autorização de uso **PENDENTE**. Por isso **nenhum desses arquivos foi copiado para este repositório**.
- Não toquei em nenhuma outra pasta do workspace.

## Resultado em números

| | |
|---|---|
| Arquivos auditados | **44** = 33 imagens do site + 11 candidatas reais (logo + 10 fotos) |
| `VERIFIED_REAL` | **0** |
| `REAL_BUT_NEEDS_CONFIRMATION` | **8** (candidatas de foto: PUB-014, 016, 017, 018, 019, 023, 024, 026) |
| `REAL_BUT_NOT_SUITABLE` | **3** (logo como encaixe direto, PUB-010, PUB-013) |
| `PROVISIONAL` | **33** (todas as imagens hoje no site) |
| `MISSING` | **16 dos 24 slots** não têm nenhum candidato real utilizável |
| Integrados ao site nesta etapa | **0 assets**; 5 dados reais de contato (ver §Dados) |

## Inventário de assets por slot

Coluna "Atual" = o que está no site (sempre `PROVISIONAL`). "Candidato real" = melhor material encontrado fora do repositório (IDs de `TRACEABILITY.md`).

| Slot | Atual | Candidato real | Estado do candidato | Produção? | Ação |
|---|---|---|---|---|---|
| brand.logo (header claro/escuro, footer) | recortes da Master | PUB-001: PNG 1100×696 da capa do cardápio Yooga | `REAL_BUT_NOT_SUITABLE` (como encaixe direto) | não | Pedir arquivo original (ver abaixo) |
| brand.flower (selo, linha) | recortes da Master | só dentro da logo | `MISSING` | não | Sai do arquivo vetorial da logo |
| founder.portrait | **ANTES:** recorte provisório da Master (pessoa gerada genérica, `provisional-bruna-retrato.webp`). **DEPOIS (2026-10-05):** `src/assets/founder/bruna-about-approved.webp`, `APPROVED_GENERATED_ASSET` | PUB-010 (mulher de touca; identidade **não confirmada**) | `MISSING` utilizável (foto real) | não | Imagem gerada e **aprovada visualmente** para a seção; **não** é `VERIFIED_REAL` nem fotografia documental. Segue valendo pedir a **fotografia profissional real da Bruna** para substituí-la, se existir |
| founder.signature | gerada | nenhum | `MISSING` | não | Assinatura em arquivo, se ela quiser |
| hero.photo (+ base) | crop da Master | PUB-014, 016, 017 | `REAL_BUT_NOT_SUITABLE` (direção de arte) | não | Nova foto (ver pedido) |
| manifesto.hands | crop | nenhum (mão salpicando) | `MISSING` | não | Foto de processo |
| manifesto.brigadeiros | crop | PUB-019 (100 brigadeiros, mão) | `REAL_BUT_NEEDS_CONFIRMATION` | não | Autorizar + crop 377×338 |
| manifesto.chocolate | crop | nenhum | `MISSING` | não | Foto |
| decor.tecido (Manifesto/Criações) | crops | nenhum | `MISSING` | não | Dispensável: pode sair |
| criacoes.cake | crop | PUB-017 (cúpula de chocolate) | `REAL_BUT_NEEDS_CONFIRMATION` | não | Autorizar + decidir produto-símbolo |
| criacoes.brigadeiros | crop | PUB-019 / PUB-018 | `REAL_BUT_NEEDS_CONFIRMATION` | não | Autorizar |
| criacoes.slice (close) | crop (156px!) | nenhum | `MISSING` | não | Foto ≥ 312px de largura |
| criacoes.sobremesa | crop | PUB-023, 024, 026 | `REAL_BUT_NEEDS_CONFIRMATION` | não | Autorizar |
| encomendas.briefing (caderno) | crop | nenhum | `MISSING` | não | Foto |
| encomendas.finishing (mão) | crop | PUB-014 (mão com morangos) | `REAL_BUT_NEEDS_CONFIRMATION` (encaixe parcial) | não | Autorizar ou nova foto |
| encomendas.table (bolo na mesa) | crop | nenhum | `MISSING` | não | Foto |
| historias.celebration | crop (com inset gravado) | nenhum autorizado | `MISSING` | não | Foto de cliente **autorizada** |
| historias.slice | crop | nenhum | `MISSING` | não | Foto |
| bastidores.decorating | crop | PUB-010 (cozinha; marcas de terceiros) | `REAL_BUT_NOT_SUITABLE` | não | Nova foto sem marcas |
| bastidores.sifting | crop | nenhum | `MISSING` | não | Foto |
| bastidores.wrapping (embalagem) | crop | nenhum | `MISSING` | não | Foto da embalagem real |
| cta.scene | crop | nenhum | `MISSING` | não | Foto de celebração com embalagem |
| seo.ogImage | n/a | nenhum | `MISSING` | não | Sai da logo + foto |
| seo.favicon | vazio | nenhum | `MISSING` | não | Sai do ícone/logo |

### Por que nenhuma foto real foi integrada

1. **Autorização:** o registro de lá é explícito (`Direitos/Autorização: PENDENTE` em todos os itens; fotos capturadas do Instagram, "uso comercial definitivo exige autorização da Bruna").
2. **Marcas de terceiros** visíveis: PUB-013 (Coca-Cola) e PUB-010 (Nutella, Sicao, Ferrero, Ninho, Mona Lisa).
3. **Direção de arte:** as fotos reais são claras, coloridas e de celular na mão (luz natural); a Master é uma fotografia quente e escura, com área limpa à esquerda para o texto. Encaixar à força "pioraria o site" (regra 8.7): o Hero e as colagens pedem fotos feitas para esse enquadramento.
4. **Produtos diferentes dos da Master:** o real é morangos do amor, copos, caseirinhos, brigadeiros e geladinhos (a ficha do Google lista confeitaria, cafeteria, lanchonete, loja de tortas); a Master é centrada em bolos. Isso é **decisão de conteúdo** da Bruna, não de crop.

### Logo (prioridade máxima): por que ainda não

PUB-001 é a logo **real** (origem: capa do cardápio Yooga, 2026-09-26; `Vetor oficial pendente`), mas hoje não serve como substituição direta:

- vem **empilhada** (ATELIÊ / d✿ces / bruna, ≈ 1,6:1) com o **fundo cacao `#72482A` opaco embutido** (o canal alfa existe, mas 100% opaco); o layout usa um wordmark horizontal 3,2:1;
- só existe a versão clara sobre cacao: o header sólido e o footer são **sobre creme** e exigiriam recolorir a logo (proibido: "nunca redesenhar"), e o fundo teria de ser removido por chroma-key;
- o wordmark provisório é uma recriação da Master (mesmos elementos: ATELIÊ acima, flor no "o"), **não** o arquivo oficial.

Ação: pedir o arquivo original (SVG/PNG transparente, versões clara e escura e ícone floral). Com ele, a troca é só em `src/data/images.ts` (+ ajuste de largura do header).

## Inventário de dados (`src/data/site.ts`)

Fontes (todas observadas em 2026-09-26): Instagram, Linktree, Yooga, ficha do Google, briefing do dono do projeto (`Docs/atelier-bruna/08_SOURCES_AND_EVIDENCE.md` do projeto irmão).

| Grupo | Dado | Valor no site | Estado | Fonte / observação |
|---|---|---|---|---|
| BRAND | nome | Ateliê Doces Bruna | **verificado** | perfil, ficha do Google e Yooga concordam |
| BRAND | tagline | "Confeitaria artesanal para momentos especiais" | placeholder | invenção do concept ("a confirmar"); frases **reais** existentes: bio do Instagram "Doces incríveis para transformar o seu dia!" e Yooga "O seu momento mais doce!!" |
| BRAND | claims | feito à mão · ingredientes reais · histórias verdadeiras | placeholder | do concept; "histórias verdadeiras" depende de depoimentos reais |
| SOCIAL | Instagram handle | @ateliedocesbruna | precisa confirmação | perfil público |
| SOCIAL | Instagram URL | instagram.com/ateliedocesbruna/ | precisa confirmação | perfil público |
| SOCIAL | WhatsApp URL | wa.me/5535984235184 | precisa confirmação | Linktree público; número igual ao da ficha do Google |
| CONTACT | telefone | (35) 98423-5184 | precisa confirmação | Google + Linktree convergem |
| CONTACT | e-mail | `[E-MAIL]` | **ausente** | nenhum real conhecido (o `atendimento@…` dos concepts é fictício) |
| CONTACT | localização | Itapeva, MG | precisa confirmação | Instagram, Google e Yooga concordam. Endereço no Google: Al. dos Ipês, Itapeva-MG, 37655-000 (completo a confirmar; **não exibido**) |
| CONTACT | horário | `[HORÁRIO]` | placeholder | **fontes divergem** (Google: ter 13–17, qua–sex 13–18, sáb 13–17:30, dom 14–17; Instagram: "13 às 18h", "terça a domingo"; delivery 13–21h no Instagram e 13–17 no Google). Só a Bruna resolve |
| CONTACT | ano | 2026 | **verificado** | calculado no build |
| FOUNDER | nome | "Bruna" (só o primeiro nome) | precisa confirmação | nome completo desconhecido |
| FOUNDER | texto 1ª pessoa | provisório | placeholder | exige aprovação da Bruna |
| FOUNDER | assinatura | provisória | placeholder | arquivo real inexistente |
| TESTIMONIALS | textos / nomes / autorização | 3 textos do concept | placeholder / **ausente** | nenhum depoimento real recebido; o destaque "Clientes" do Instagram e a nota 4,6 (10 avaliações) existem, mas são voláteis e sem autorização |
| SEO | SITE_URL | vazio | **ausente** | domínio não definido |
| SEO | title | Ateliê Doces Bruna | **verificado** | é o nome da marca |
| SEO | description | nenhuma | **ausente** | candidata: bio do Instagram, a aprovar |
| SEO | social image | nenhuma | **ausente** | depende de logo/foto reais |
| CTA | "Encomendar" (Hero, Encomendas, CTA final, header) | WhatsApp acima | precisa confirmação | o fluxo Converse → Criamos → Celebre também é **não validado** (prazos, sinal, antecedência) |
| CTA | "Descubra as criações" | `[DESTINO A VALIDAR]` | placeholder | **decisão**: abrir o cardápio Yooga (público, `delivery.yooga.app/ateliedocesbruna`), um catálogo próprio, ou remover o CTA |

## O que foi integrado

Só dados com **fonte rastreável**, marcados `needs-confirmation` em `PENDING_ITEMS` e contados pelo `check:content`:

- WhatsApp (5 CTAs + header), Instagram (header, menu, CTA final), telefone, @handle e cidade no footer; **ano** calculado no build (resolvido de verdade).
- Links externos agora abrem em nova aba com `rel="noopener noreferrer"`. O único link ainda pendente (Criações) segue desabilitado.
- Nenhuma mudança de layout, tipografia, motion ou imagens.

## Divergências que pedem decisão

1. **Cidade:** os concepts mostravam "São Paulo, SP"; o negócio é de **Itapeva/MG** (o site usa só o que é real).
2. **Universo de produto:** real = confeitaria + cafeteria + lanchonete (copos, morangos, brigadeiros, geladinhos, salgados, bolos); Master = bolos. Definir o produto-símbolo do Hero/Criações.
3. **Logo empilhada** ≠ wordmark horizontal do header (afeta largura do header).
4. **Paleta:** o fundo da logo real é `#72482A` (marrom médio quente); o site usa cacau quase preto (`#1f0d05`/`#2b1810`) amostrado da Master. Revisar com o arquivo oficial.
5. **Estilo fotográfico:** real = natural/claro; Master = quente/cinematográfico.
6. **"Histórias reais" + claim "histórias verdadeiras"** dependem de depoimentos autorizados; sem eles a seção deve mudar de título ou sair.

## `check:content`

| | Antes (Etapa 7) | Depois |
|---|---|---|
| Pendências detectadas | **25** | **24** |
| Placeholders sem valor real (`site.ts`) | 9 | 3 (e-mail, horário, destino de Criações) |
| Reais com fonte, aguardando confirmação | n/a | 5 |
| Resolvidas de fato | n/a | 1 (ano, calculado) |
| `check:content:strict` | falha | **falha** (exit 1) |

O 25 → 24 é só o ano; as outras 5 viraram "real aguardando confirmação" e **continuam contando**. Correção do checker: ele contava `data-link-status` também dentro do `<script>`; agora conta só links no markup (o número de linhas do relatório não muda).

## QA

Mudanças só em dados/links: 1440, 1024, 768 e 390 sem overflow, 0 erros de console, menu e teclado ok, motion (21 / 1 ScrollTriggers, CLS ≤ 0,002, reduced-motion, sem JS) ok. Regressão visual contra a Etapa 7: alturas idênticas (8470 / 10187 px), pior faixa 0,52 (1440) e 1,26 (390; texto do footer). Artefatos: `docs/qa/etapa-8/` (`impl-1440.webp`, `footer-1440.webp`, `footer-390.webp`, JSONs).

## Atualização 2026-10-05: retrato da seção Sobre a Bruna

- **Antes:** `provisional-bruna-retrato.webp` (recorte da Master, pessoa gerada genérica, 820×980).
- **Depois:** `src/assets/founder/bruna-about-approved.webp` (1122×1402, WebP, 214 KB; arquivo recebido usado sem recompressão), slot `brunaRetrato` em `src/data/images.ts`.
- **Classificação:** `APPROVED_GENERATED_ASSET` (novo estado no manifesto: `AssetStatus`). Criada para representar a Bruna na direção artística aprovada; **não** é `VERIFIED_REAL`.
- **Não muda:** o gate de conteúdo real. Não há foto real da Bruna, nem autorização geral dos assets; `check:content` segue com as mesmas 24 pendências (o contador de arquivos `provisional-*` caiu de 33 para 32 só porque o arquivo provisório deixou de existir). `noindex, nofollow` mantido.
- **Alt:** "Representação visual de Bruna finalizando um bolo no Ateliê Doces Bruna" (não afirma ser fotografia documental).
- **Substituição futura:** fotografia profissional real da Bruna, com autorização (passa a `VERIFIED_REAL`).
