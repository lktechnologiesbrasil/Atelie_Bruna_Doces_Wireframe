# QA: Etapa 5 (revisão visual integrada, 1440px)

> Implementação **estática** contra a Master Reference. Sem GSAP/motion. Sem imagens novas por IA.
> **Status:** aguardando aprovação visual do comparativo 1440. Nada foi enviado ao remoto.

## Como foi medido

Chrome headless via CDP, **DPR 1**, viewport 1440 × 900, imagens `eager` e fontes carregadas, sem toolbar de dev, header oculto fora do primeiro trecho. A página é rolada em trechos e costurada (`tools/qa-capture.mjs`); a comparação é `tools/qa-compare.mjs`; a bateria técnica é `tools/qa-check.mjs` (teclado real). Resultado bruto em `qa-check.json`.

| Artefato | Conteúdo |
|---|---|
| `impl-1440.webp` | Implementação em 1440 × 8459 |
| `compare-1440-master-vs-impl.webp` | MASTER \| IMPLEMENTAÇÃO, página inteira (50%) |
| `sections/01…09-*.webp` | Um par MASTER \| IMPLEMENTAÇÃO por seção (65%) |
| `impl-1024/768/390.webp`, `sheet-*.webp` | Capturas full-page e folhas de contato do smoke test |
| `shots/` | Header (transparente e sólido) e topo da viewport em cada largura |

Altura total: **8459px** (Master 8365px, +94px). Seções: Hero 940 · Manifesto 1060 · Bruna 1016 · Criações 1151 · Encomendas 984 · Histórias 1227 · Bastidores 979 · CTA 678 · Footer 425. Aceita: o excesso está em Histórias (+47, folga para a legenda do 3º depoimento não ficar sob a onda seguinte) e CTA (+38, folga para o botão do Instagram).

## Diferenças de alta percepção corrigidas

| # | Onde | Antes | Depois |
|---|---|---|---|
| 1 | Header | Ícones de Instagram/WhatsApp encolhiam a 0 (viravam um ponto) | `svg.icon { flex: none }` |
| 2 | Header (bug de layout) | Ao virar sólido a altura caía 136 → 80px e a margem negativa seguia −136px: o conteúdo **saltava 56px** ao passar do Hero | A margem acompanha a altura de cada estado |
| 3 | Menu mobile (bug) | Com o header sólido, `backdrop-filter` virava o bloco de contenção do menu `fixed`; o `focus()` rolava a página (±422px a cada abrir/fechar) | Fundo desfocado em `::before` + `focus({ preventScroll: true })` |
| 4 | Cascata de CSS | `content.css` era importado antes do `global.css`: `.t3`/`.t1`/`.h3` sobrescreviam as classes de seção (títulos da jornada em 12,8px, "o seu" caramelo em vez de branco) | `content.css` carregado depois, no `BaseLayout` |
| 5 | Hero | Foto cortada em linha reta acima da onda; esquerda inferior chapada em cacau; título 14px mais alto e entrelinha menor | Recorte do bolo até a onda, novo recorte de tecido + tigela (`provisional-hero-base`), scrim some perto da base, entrelinha 1,03 |
| 6 | Manifesto | Moldura A 47px abaixo; topo reto | Topo da moldura inclinado, recorte creme recalculado |
| 7 | Manifesto / Criações | Vazio creme sob as molduras | Faixas de tecido até a borda direita (`provisional-*-strip`); moldura A de Criações mais alta |
| 8 | Encomendas | Numerais old-style pequenos; títulos dos passos em 12,8px; passos 02/03 cortados pela onda; tags em 2 linhas; bloco de texto 35px acima | Numerais `lnum`, títulos ~18px, texto ~15px, passos reposicionados, tags em 1 linha, +35px no texto |
| 9 | Histórias | Foto reta no topo e sem recuo sob o texto; depoimentos pequenos com legenda em 3 linhas; legenda do 3º cortada | Topo inclinado + recuo (`clip-path`), citações a 23px, legendas em 1 linha, folga inferior |
| 10 | CTA final | "o seu" caramelo; botão do Instagram sob a onda | "o seu" branco, entrelinha 0,66, folga inferior |
| 11 | Links placeholder | `href="[WHATSAPP_URL_PLACEHOLDER]"` navegaria para uma URL inválida | Clique bloqueado em `a[data-link-status="pending"]` |
| 12 | Overflow | 1px de `scrollWidth` em 1440/1290 (flor do passo 03 a 100,1%) | Largura 15,2% |
| 13 | Console | 404 de `favicon.ico` | `<link rel="icon" href="data:,">` (sem marca oficial ainda) |
| 14 | Header compacto | Nav com `nowrap` estourava o container | Tipografia do nav proporcional à largura; menu compacto abaixo de 1280px |

## Diferenças aceitas (média/baixa percepção)

- **Hero:** a Master tem a foto em largura total, com bokeh quente atrás do texto. Aqui a esquerda é cacau com degradê (o recorte evita o texto gravado). Resolve com a foto real.
- **Selo:** anel mais discreto e flor menor que na Master.
- **Ondas:** uma curva por fronteira onde a Master tem várias camadas; formas aproximadas.
- **CTA final:** a Master mostra mais flores/bokeh claro à esquerda da cena; o recorte parte do lado direito.
- **Bastidores:** trio com borda off-white (a Master é rente, sem borda); a onda translúcida cobre o rodapé do trio.
- **Jornada:** a linha orgânica é aproximada; pequeno recorte creme no canto inferior esquerdo da foto do passo 01 (vem da própria Master).
- **Quotes:** quebra de linha natural; legenda a 11,5px (abaixo do piso de 12px de `--text-micro`) para caber numa linha.
- **Footer:** tipografia 15px e espaçamento vertical levemente maiores; sem a linha sob "Atendimento".
- **1–3px, antialiasing e crop:** não perseguidos.

## Divergências que dependem de assets reais

Fotos (pessoa "Bruna", produtos, mãos, embalagens, logos em avental/caixa), logo oficial, assinatura, depoimentos, texto em 1ª pessoa, WhatsApp, Instagram, destino de "Descubra as criações", telefone, e-mail, endereço, horário. Continuam `[PLACEHOLDER]` (ver `src/data/site.ts`) e `data-provisional`. Artefatos inevitáveis dos recortes: a foto de Histórias traz o inset gravado (a moldura HTML cobre no desktop); a foto do Hero traz o selo desfocado.

## Header

Testado em 1440, 1290, 1024, 768 e 390 (`shots/header-*`): transparente sobre o Hero, sólido (creme 94%, logo escuro) após o Hero, volta a transparente ao subir; as ações cabem no container; a altura do documento é a mesma nos dois estados (sem salto).

## Smoke test responsivo

| Largura | Overflow horiz. | Imagens | Console | Menu |
|---|---|---|---|---|
| 1440 | 0 | 0 quebradas / 0 deformadas (31) | sem erros | n/a (header completo) |
| 1290 | 0 | idem | sem erros | n/a (header completo) |
| 1024 | 0 | idem | sem erros | ok |
| 768 | 0 | idem | sem erros | ok |
| 390 | 0 | idem | sem erros | ok |

Menu mobile (1024/768/390, teclado real): abre com `Enter`, o foco vai ao botão de fechar, `main` fica `inert`, `html.menu-open` trava a rolagem, `Tab` não escapa do menu (`Shift+Tab` volta para dentro), `Esc` fecha e devolve o foco ao botão, clicar num link fecha e navega, e a posição de rolagem é preservada.

Teclado (desktop): skip link, logo, A Marca, Bruna, Criações, Encomendas, Contato, Instagram, WhatsApp, Encomendar, "Conheça nossa história", "Descubra as criações"; foco visível (`outline` 2px). Âncoras da nav pousam a 80px do topo (header compacto). Os 9 links placeholder têm o clique bloqueado.

Observação: o painel do navegador integrado do app, quando oculto, não dispara `IntersectionObserver`; por isso header e menu foram validados no Chrome headless.

## Build

`npm run build`: sem erros nem avisos.

## Mantido

`noindex, nofollow` (assets, textos e dados provisórios). Nenhum GSAP, parallax, reveal ou animação por scroll.
