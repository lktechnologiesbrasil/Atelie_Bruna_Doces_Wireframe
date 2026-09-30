# QA: Etapa 2 (camada de fundo)

> Pipeline `img-to-html`, Etapa 2, implementada direto na stack final (**Astro + CSS**; GSAP entra só com o motion).
> **Status:** aguardando aprovação visual. A Etapa 3 não começou.

## Artefatos

| Arquivo | Conteúdo |
|---|---|
| `compare-1440-impl-vs-master.webp` | Página inteira lado a lado: implementação (esquerda) × Master (direita), em 50% |
| `compare-transitions-impl-vs-master.webp` | As 8 fronteiras entre seções em 100%: implementação (esquerda) × Master (direita) |
| `impl-1440.webp` | Implementação em 1440 × 8365 |
| `impl-390-smoke.webp` | Smoke test em 390px (viewport mobile emulado) |

**Captura:** build de produção (`astro build` + `astro preview`), Chrome headless via DevTools Protocol, viewport de 1440 × 900 com DPR 1. A página foi rolada até o fim para disparar o lazy-load e capturada em trechos do viewport, depois costurados. Captura com janela única de 8365px foi descartada: o Chrome headless deixava de pintar camadas com máscara no fim da página.

## Checklist

| Item | Resultado |
|---|---|
| Ordem das seções | Hero → Nossa Essência → Bruna → Criações → Encomendas → Histórias Reais → Bastidores → CTA final → footer ✅ |
| Alternância cromática | Cacau → 5 × creme → 2 × cacau → creme ✅ |
| Altura total em 1440 | 8365px, igual à Master (soma do andaime de alturas por seção) ✅ |
| Ondas | 8 transições em SVG vetorial, sem bitmap ✅ |
| Emendas retas do stitch | Não reproduzidas: as fronteiras 02→03, 04→05 e 06→07 viraram ondas orgânicas ✅ |
| Hero | Foto provisória à direita, fundida no cacau por máscara; scrim à esquerda ✅ |
| Fotos de fundo (`media2`) | Bruna, Histórias, Bastidores e CTA nas posições da Master ✅ |
| Container / margem | `max-width` de 1280px + gutter fluido (80px em 1440) ✅ (sem conteúdo ainda) |
| Overflow horizontal | 0px em 1440 e em 390 ✅ |
| Distorção de imagem | Nenhuma: `object-fit: cover` preserva a proporção. Escala em 1440: 1,00 em todas, exceto o retrato da Bruna (1,03) ✅ |
| Build | `astro build` sem erros nem avisos ✅ |
| Mobile 390 (smoke) | Sem overflow; fotos saem do posicionamento absoluto e empilham em 4:3; ondas escalam (`--wave-h` fluido) ✅. Não é o layout mobile final |

## Diferenças conhecidas (esperadas nesta etapa)

1. **Hero, lado esquerdo:** na Master a foto ocupa a largura toda (tecido rosado e tigela embaixo à esquerda). Aqui a esquerda é cacau com degradê, porque o recorte provisório evita a área com texto gravado. A foto real resolve.
2. **Hero, selo:** a área do selo foi desfocada no recorte e resta um vestígio sutil do anel. O selo real entra como HTML/SVG na Etapa 3, no mesmo lugar.
3. **Histórias:** o recorte da mesa contém o inset da fatia gravado; o `media` real cobre na Etapa 4.
4. **Bastidores, lado esquerdo:** na Master há textura fotográfica escura com flores atrás do texto. Aqui é cacau chapado.
5. **Bases decorativas** (Manifesto, Criações): só a porção esquerda. Na Master, a direita fica sob as molduras de conteúdo.
6. **Formas das ondas:** aproximações das curvas da Master, não traçadas pixel a pixel. Na Master, Hero → Manifesto tem duas camadas de creme; aqui há uma camada mais um fio caramelo. Em Encomendas e Histórias, a Master tem várias ondas creme sobrepostas; aqui há uma por fronteira.
7. **Faixa Bastidores → CTA:** faixa caramelo translúcida mais fio. Na Master ela passa por cima das molduras dos Bastidores, que ainda não existem.
8. **Alturas:** vêm de `--scaffold-h`, um andaime da Etapa 2 medido na Master. Na Etapa 3 o conteúdo passa a definir a altura.
9. **Tipografia:** só tokens, com fontes de sistema como aproximação. A família e o peso são decididos na Etapa 3.
10. **Cores:** amostradas da reference; os valores oficiais virão do material da marca.
