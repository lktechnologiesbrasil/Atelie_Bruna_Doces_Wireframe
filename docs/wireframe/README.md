# Wireframe da homepage

| Arquivo | Status |
|---|---|
| `design-systems/atelie-doces-bruna-v2/wireframe.txt` | **Canônico.** Contrato estrutural da Etapa 1 do `img-to-html`, gerado por `$to-wireframe format=ascii` a partir da Master Reference |
| `docs/wireframe/wireframe-pre-skill.txt` | **SUPERSEDED**: gerado antes de o workflow canônico `img-to-html`/`to-wireframe` estar disponível. Serve só para comparação |

**Etapa atual:** 1 (wireframe + plano), aguardando aprovação. **Nenhuma etapa de implementação começou.**

## Como foi gerado

- **Skills:** `.claude/skills/img-to-html/` e `.claude/skills/to-wireframe/`, cópias sem alteração de [rtadewald/skills](https://github.com/rtadewald/skills) no commit `99d0b39` (ver `.claude/skills/UPSTREAM.md`).
- **Execução manual da skill, não wireframe autoral.** As duas skills declaram `disable-model-invocation: true`, então o agente não consegue invocá-las formalmente. O `to-wireframe/SKILL.md` foi lido por inteiro e aplicado regra a regra:
  - regiões rotuladas só com o vocabulário fechado (`nav`, `hero`, `section`, `media`, `card`, `quote`, com sufixo numérico para variantes);
  - todo texto visível em tag tipada, uma tag por linha visual;
  - componentes internos aninhados; bordas só com `+`, `-` e `|`;
  - sem medir pixels, sem OCR, sem crop; uma única revisão.
- **Entrada:** `design-systems/atelie-doces-bruna-v2/reference.webp`, cópia byte a byte de `docs/master-reference/master-reference.webp` (SHA-256 `04e0a601…78fc`, 1440 × 8365).
- **Ajuda de layout:** um script descartável (fora do repositório) só montou as caixas ASCII para garantir o alinhamento. O conteúdo, as regiões e as tags foram definidos pela leitura da imagem.

## Mapa de regiões → seções

| Ordem | Região | Seção |
|---|---|---|
| 1 | `nav` | Header |
| 2 | `hero` (+ `card2` selo) | Hero |
| 3 | `section` (+ `card3` faixa de claims na onda) | Manifesto / Nossa Essência |
| 4 | `section` | Bruna |
| 5 | `section` | Criações |
| 6 | `section` (+ 3 × `card`) | Encomendas, jornada 01/02/03 |
| 7 | `section` (+ 3 × `quote`) | Histórias Reais |
| 8 | `section2` | Bastidores |
| 9 | `section2` | CTA final |
| 10 | `section3` | Footer |

**Tags:** `h1` headline do Hero · `h2` headlines das seções · `h3` trecho em serif itálica (inclui os numerais 01/02/03) · `t1` corpo · `t2` meta · `t3` microtexto uppercase (eyebrows, tags, títulos de passo, rótulos) · `btn` pill blush com texto escuro · `btn2` pill blush com texto caramelo (Criações) · `btn3` pill outline (Instagram) · `lnk` links de nav.

## Decisões de UX aprovadas (fora do ASCII)

O ASCII registra só o que é visível na imagem. Estas decisões valem para o frontend:

| Tema | Decisão |
|---|---|
| Header | **Sticky.** Transparente sobre o Hero; depois dele assume superfície adequada ao fundo (refinar na implementação). Mobile: logo + menu compacto + CTA quando couber |
| Nav | `A Marca` → Manifesto (02) · `Bruna` → Bruna (03) · `Criações` → Criações (04) · `Encomendas` → Encomendas (05) · `Contato` → CTA final/footer (08). Histórias Reais e Bastidores fora da nav |
| `CONHEÇA NOSSA HISTÓRIA` | → seção Bruna (03) |
| `DESCUBRA AS CRIAÇÕES` | `[DESTINO A VALIDAR]`. Não inventar página nem URL |
| `ENCOMENDAR` / `COMEÇAR UMA ENCOMENDA` | → WhatsApp: `[WHATSAPP_URL_PLACEHOLDER]`. Não inventar número |
| `ACOMPANHAR NO INSTAGRAM` | → `@ateliedocesbruna` (validar antes da produção) |
| Tags de Encomendas | Microcopy, **não são links** |
| 07 e 08 | Duas seções semânticas distintas (Bastidores ≠ CTA final), mesmo com o mesmo fundo cacau |
| Emendas da Master | Os cortes retos entre slices são artefato do stitch. A implementação usa as ondas orgânicas |
| Mobile | Estratégia de `docs/consistency-review.md` §7. Não comprimir o desktop |

## Divergências registradas (imagem × wireframe)

| Onde | Imagem | Wireframe | Motivo |
|---|---|---|---|
| Encomendas, passo 01 | "Conte sobre a **ocsaião**," | "Conte sobre a **ocasião**," | Erro de geração visual; o frontend usa o português correto |

## Principais diferenças: pré-skill × canônico

| Aspecto | Pré-skill (superseded) | Canônico |
|---|---|---|
| Vocabulário | Livre (`[IMG-01]`, `(( CTA ))`, `[PH]`, `*itálico*`) | Fechado do `to-wireframe` (`[h1:]`…`[t3:]`, `[btn:]`/`[btn2:]`/`[btn3:]`, `[lnk:]`, `[ico:]`, `[img:]`) |
| Regiões | Seções numeradas com nomes livres | Ids reutilizáveis (`section`, `section2`, `media`, `media2`, `card`, `quote`…) que viram classes CSS |
| Texto | Resumido ou com reticências | Todo texto legível, uma tag por linha visual |
| Estilo de botão | Um só tipo de CTA preenchido | Três estilos distintos: `btn`, `btn2`, `btn3` |
| Aninhamento | Caixas soltas | Selo, faixa, molduras, passos e depoimentos aninhados na seção dona |
| Metadados | Coordenadas y≈, inventários de CTA e mídia, destinos, notas | Nada fora da planta. Destinos, decisões e plano ficam neste README |
| Destinos de CTA | "a definir" | Decididos (tabela acima), fora do ASCII |

## Plano de implementação por região (`img-to-html`, Etapa 1)

Pipeline: **1** wireframe + plano → **2** fundo completo → **3** estrutura/componentes + fontes → **4** assets restantes → **5** revisão final. Cada etapa tem gate e para até ser aprovada.

| Região / elemento | Etapa | Técnica | CSS / imagem | Assets | Fontes | Comportamento |
|---|---|---|---|---|---|---|
| Fundos de página: creme (`section`, `section3`) e cacau (`section2`) | 2 | Custom properties + cores sólidas | CSS | — | — | — |
| Ondas de transição (6 fronteiras) | 2 | SVG inline como separador, com o topo curvo pertencendo à seção de baixo | CSS + SVG | — | — | Futuro: onda sobe no scroll (fora do escopo do img-to-html) |
| Foto de fundo do `hero` + scrim | 2 | Imagem full-bleed + gradiente cacau à esquerda | Composição | Foto do Hero (provisória = recorte da reference) | — | — |
| Bases decorativas (tecido + cerâmica) no Manifesto e em Criações | 2 | Camada de imagem na borda inferior | Imagem | 2 recortes (provisórios) | — | — |
| `nav` | 3 | HTML/CSS; links, CTA e ícones reservados | CSS | Logo e ícones na Etapa 4 | Sans uppercase com tracking | **Sticky**; transparente no Hero, superfície depois (`app.js` com IntersectionObserver); âncoras da nav |
| Textos do `hero` + `btn` | 3 | HTML/CSS | CSS | — | Serif editorial (`h1`), serif itálica (`h3`), sans (`t1`, `btn`) | CTA → `#bruna` |
| `card2` selo | 3 | SVG `textPath` circular + flor ao centro | CSS + SVG | Flor na Etapa 4 | Sans uppercase (`t3`) | — |
| `card3` faixa de claims | 3 | Texto HTML/SVG acompanhando a crista da onda | CSS + SVG | — | `t3` | — |
| `section` (Manifesto, Bruna, Criações, Encomendas, Histórias): eyebrows, headlines, corpo, CTAs | 3 | HTML/CSS, eixo esquerdo ~80px | CSS | — | `t3`, `h2`, `h3`, `t1`, `btn`, `btn2` | `DESCUBRA AS CRIAÇÕES` → `[DESTINO A VALIDAR]`; `COMEÇAR UMA ENCOMENDA` → `[WHATSAPP_URL_PLACEHOLDER]` |
| `media2` que formam o fundo da seção (retrato da Bruna com fade para o creme; mesa das Histórias; foto grande dos Bastidores; cena do CTA final) | 3 | Imagem + gradiente/máscara CSS, junto da superfície | Composição | 4 fotos (provisórias = recortes) | — | — |
| `media` em molduras (colagem do Manifesto, galeria de Criações, fotos da jornada, inset das Histórias, trio dos Bastidores) | 3 / 4 | Moldura, borda off-white e sobreposição na 3; imagem de conteúdo na 4 | CSS + imagem | 13 fotos de conteúdo | — | — |
| `card` passos da jornada 01/02/03 + linha orgânica | 3 | HTML/CSS em zigue-zague; linha em SVG inline | CSS + SVG | Flor em linha na Etapa 4 | `h3` (numerais), `t3`, `t1` | — |
| `quote` × 3 | 3 | HTML/CSS; aspas como glifo tipográfico | CSS | — | `t1` serif itálica, `t3` | Conteúdo `[PLACEHOLDER]` |
| `section2` Bastidores e CTA final | 3 | HTML/CSS sobre cacau | CSS | — | `h2`, `h3`, `t1`, `btn`, `btn3` | CTAs → WhatsApp placeholder / Instagram |
| `section3` footer | 3 | HTML/CSS em 4 colunas + barra inferior | CSS | Logo e ícones na Etapa 4 | `t3`, `lnk`, `t1`, `t2` | Nav do footer = nav do header |
| Logo (wordmark e lockup), ícones (Instagram, WhatsApp, seta, pin, e-mail, relógio, flor), assinatura "Bruna", flores em linha | 4 | Assets a partir de recortes da reference | Imagem/SVG | ~11 assets | — | Logo oficial substitui |
| Tela completa | 5 | Screenshot 1440 vs reference; ignorar as emendas do stitch | — | — | — | Paths relativos, sticky e âncoras |

**Fontes (Etapa 3):** serif editorial de alto contraste com itálico, e sans geométrica para corpo e uppercase. O `find-font` não está instalado, então família e peso serão escolhidos por julgamento visual entre Google Fonts no início da Etapa 3, com a aproximação informada.

**Assets de fundo × restantes:** fundos de página, ondas, foto do Hero e bases decorativas na Etapa 2. Fotos que formam o fundo de uma seção na Etapa 3. Fotos de conteúdo, ícones, logo, assinatura e flores na Etapa 4.

### Pontos a decidir antes da Etapa 2

1. **Geração de assets.** O procedimento do `img-to-html` regenera cada asset com IA (GPT Image 2 via OpenRouter, exige `OPENROUTER_API_KEY`). O projeto definiu que produtos, pessoas e logo são direção fotográfica, a ser substituída por material real. Opções: (a) regenerar como manda a skill; (b) usar recortes da reference como provisórios; (c) aguardar as fotos e a logo reais.
2. **Stack.** O `img-to-html` entrega HTML + CSS + JS estáticos, sem framework nem dev server. Astro/GSAP, se vierem, seriam uma etapa posterior de portabilidade.
3. **Motion e mobile** ficam fora do escopo do `img-to-html`, que recria a tela desktop de referência. Continuam definidos em `docs/consistency-review.md` §6 e §7.
