# QA: Etapa 6 (responsividade refinada + motion)

> **6A** responsividade editorial (commit `7e826b4`) e **6B** motion system. Sem imagens novas por IA.
> `noindex, nofollow` mantido. Nada foi enviado ao remoto.

## 6A. Responsividade

Todo o layout tablet/mobile vive em `src/styles/responsive.css`; o `content.css` ficou só com o desktop. O header guarda as suas queries junto do componente.

| Faixa | Comportamento |
|---|---|
| ≥ 1280 | Header completo; composição desktop (referência 1440) |
| 1200–1279 | Header compacto (logo + CTA + menu); composição desktop |
| 900–1199 | Composições proporcionais; claims em linha de texto; jornada em coluna |
| 600–899 | Tablet retrato: empilhado, trilhos mostram ~2,3 cartões, footer em 3 colunas |
| ≤ 899 | Mobile editorial (abaixo) |
| ≤ 479 | CTA compacto no header, logo menor |
| ≤ 379 | CTA do header sai (fica no menu) |

Mobile, por seção:

- **Hero:** marca, título (fluido, "Mais que doces," cabe a partir de 360px), foto, CTA; sem selo nem camadas decorativas.
- **Manifesto:** foto grande + par escalonado (sem sobreposição).
- **Bruna:** título, foto (funde no texto), copy, assinatura. Reordenado com `display: contents` + `order`, sem duplicar marcação.
- **Criações:** trilho horizontal com `scroll-snap` nativo; o cartão seguinte aparece pela borda. A foto "close" (156px de largura) fica de fora no mobile para não ser ampliada.
- **Encomendas:** leitura vertical 01/02/03, mídia alternando de lado, traço orgânico vertical (SVG dedicado), numerais grandes, proporções nativas dos recortes.
- **Histórias:** título, foto, depoimentos em trilho com `scroll-snap`.
- **Bastidores:** título, foto, texto, duas imagens empilhadas e deslocadas.
- **CTA final:** cena com "o seu momento." sobreposto, ações em largura total (60px).
- **Footer:** marca centrada, links de 44px.

Recortes mobile: 4 variantes da Master sem as molduras vizinhas (`provisional-*-m`), servidas por `<picture>` no `MediaFrame` (`mobileSrc`). Desktop não muda.

**Microcopy:** mínimo visível **12px** em todas as larguras (legenda dos depoimentos, tags, nav). Corpo mobile 16–18px. Alvos de toque ≥ 44px abaixo de 1024px (no desktop, os links do footer têm 36px).

## 6B. Motion

GSAP 3.15.0 + ScrollTrigger (única dependência nova; ~119 kB de JS bruto no bundle da página).

```
src/scripts/motion/
  index.ts     entrada: gsap.matchMedia (reduced-motion × desktop), refresh após fontes/load, limpeza ao ativar "reduzir movimento"
  split.ts     divide títulos em linhas (idempotente; máscara = clip-path)
  hero.ts      entrada do Hero + escala da foto ligada ao scroll
  reveals.ts   títulos, eyebrows, textos, fotos, depoimentos, CTAs
  journey.ts   traço desenhado pelo scroll + passos amarrados ao progresso
  parallax.ts  fotos de fundo, algumas molduras, zoom-out do CTA (desktop)
  waves.ts     assentamento das ondas (desktop)
src/styles/motion.css   estados iniciais (só com html.motion-ready)
```

Animações: entrada do Hero (linhas do título, texto, CTA, foto, selo); escala 1 → 1,06 da foto do Hero (desktop); títulos por linha com máscara; eyebrow com fio que se desenha; textos corridos só por opacidade; fotos reveladas por `clip-path` (direção varia por moldura) com escala 1,12 → 1; traço da jornada desenhado pelo scroll e passos 01 → 02 → 03 entrando conforme o traço chega a eles; parallax pontual (fotos de fundo, 7 molduras); "o seu momento." em revelação mais lenta com zoom-out da foto e CTAs depois; ondas que assentam ~9px. Só `transform`, `opacity`, `clip-path` e `stroke-dashoffset`.

**Aprimoramento progressivo:** um script no `<head>` só adiciona `html.motion-ready` sem `prefers-reduced-motion: reduce`; os estados iniciais ficam atrás dessa classe. Se o módulo não subir em 3,5s a classe sai e tudo aparece. Sem JS: página completa e estática.

**`prefers-reduced-motion: reduce`:** nenhuma animação, parallax, escala, traço ou transform de entrada; conteúdo imediato. Se a preferência mudar com a página aberta, as animações são desfeitas e os estilos inline limpos.

**Mobile:** sem parallax, sem escala do Hero, sem ondas animadas; mantém entrada do Hero, títulos por linha, fotos reveladas, traço da jornada. Itens dos trilhos horizontais ficam como estão.

**ScrollTriggers:** ~61 no desktop ao carregar (caem para ~21 persistentes conforme as revelações terminam e seus gatilhos são destruídos), ~34 no mobile (1 persistente: o traço da jornada).

### Bugs encontrados e corrigidos durante o QA de motion

| Problema | Correção |
|---|---|
| Máscara de título com padding/margem negativa colapsava margens e mudava a altura da página (+55px) | Máscara por `clip-path` com insets negativos; altura idêntica à estática (8470px) |
| `clip-path` cortava títulos que transbordam a coluna de texto ("Cada celebra\|ção") | Janela larga à direita (`-100vw`) |
| `once: true` matava o tween em curso ao chegar ao fim da página | Gatilho destruído em `onComplete` |
| `self.kill()` dentro do `onEnter` quebrava o laço de refresh do ScrollTrigger (`TypeError`) | Destruição adiada com `queueMicrotask` |
| Depois de resize/alternância, resíduo `translate(0, Npx)` somava ao novo deslocamento | `clearProps: transform` antes de reaplicar o estado inicial |
| Alternar "reduzir movimento" com a página aberta deixava títulos fora de lugar | Limpeza explícita dos estilos inline |
| Desktop: passo 03 aparecia antes do 02 (fica mais alto no zigue-zague) | Passos amarrados ao progresso do traço (limiares 0,02 / 0,40 / 0,78) |

## Resultados

| Largura | Overflow horiz. | Imagens | Console | Header | Menu |
|---|---|---|---|---|---|
| 1440 | 0 | 31 ok | sem erros | clear → solid, sem salto | n/a |
| 1280 | 0 | 31 ok | sem erros | idem | n/a |
| 1024 | 0 | 31 ok | sem erros | idem | ok |
| 768 | 0 | 31 ok | sem erros | idem | ok |
| 430 | 0 | 31 ok | sem erros | idem | ok |
| 390 | 0 | 31 ok | sem erros | idem | ok |
| 360 | 0 | 31 ok | sem erros | idem | ok |

Menu (≤ 1279, teclado real): abre, foco no botão de fechar, `main` `inert`, `Tab` não escapa (`Shift+Tab` volta), `Esc` fecha e devolve o foco, link fecha e navega, rolagem preservada.

Motion (`tools/qa-motion.mjs`, 1440 / 768 / 390):

- CLS ≤ 0,003; nenhum elemento preso invisível depois de rolar a página inteira; altura do documento igual à estática.
- Resize atravessando 900px nos dois sentidos, reload com a página rolada: sem erros, sem elementos presos.
- `prefers-reduced-motion`: no carregamento (sem classe, sem máscaras, sem gatilhos) e alternado em runtime (gatilhos 64 → 0, tudo visível).
- Sem JavaScript: títulos, textos e fotos totalmente visíveis.
- Observação: a leitura de `strokeDashoffset` fora da região da jornada não é confiável (valor normalizado pelo `pathLength`); o desenho do traço foi conferido nos quadros de `motion-*.webp`.

Artefatos: `impl-1440/1024/768/390.webp` (capturas estáticas, `prefers-reduced-motion`), `sheet-*.webp`, `motion-hero-1440.webp`, `motion-journey-1440.webp`, `motion-390.webp`, `qa-check.json`, `qa-motion.json`.

## Diferenças conhecidas

- Fotos, logo, assinatura, depoimentos e dados de contato continuam provisórios/placeholder.
- Em Histórias (mobile) a foto fica mais baixa que a Master para esconder o inset gravado.
- Histórias a 900–1199px mantém a composição desktop proporcional (depoimentos estreitos).
- Links do footer têm 36px de altura no desktop (≥ 900px).
- Passo 01 (desktop) mantém o pequeno recorte creme vindo da Master.
- O capturador padrão usa `prefers-reduced-motion` (captura estática); `QA_MOTION=on` liga as animações.
