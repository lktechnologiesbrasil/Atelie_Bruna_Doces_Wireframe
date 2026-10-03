# QA: Etapa 3 (estrutura, tipografia, conteúdo) + Etapa 4 (fotos de conteúdo provisórias)

> Pipeline `img-to-html`, implementado direto em Astro + CSS. **Sem GSAP/motion.**
> **Status:** aguardando revisão visual integrada (Etapa 5). Nada foi enviado ao remoto.

## O que existe agora

- Header sticky (transparente no Hero, sólido depois), menu modal abaixo de 1280px.
- Todas as regiões do `wireframe.txt` com os textos canônicos: Hero + selo, claims na crista da onda, Manifesto, Bruna (assinatura), Criações, Encomendas (jornada 01/02/03 + linha orgânica), Histórias Reais (3 depoimentos), Bastidores (trio), CTA final e footer em 4 colunas.
- As 13 molduras `media` preenchidas com recortes **provisórios** da reference (`tools/crop-provisional-assets.mjs`, sem IA generativa).
- `<meta name="robots" content="noindex, nofollow">` enquanto houver conteúdo provisório.

## Medições (build + dev, Chrome)

| Item | Resultado |
|---|---|
| Altura total em 1440 | ~8470px (Master: 8365px). Excesso em Histórias (+39), Encomendas (+38), CTA (+21), Bruna (+6) |
| Overflow horizontal | 0 em 1440, 1290, 1024, 768 e 390 |
| Imagens deformadas | Nenhuma (`object-fit: cover`; imagens sem `cover` mantêm a proporção) |
| Imagens quebradas | 0 de 28 |
| Console | Sem erros |
| Menu mobile | Abre, foco no botão de fechar, resto da página `inert`, Esc fecha e devolve o foco, fecha ao navegar |
| Build | `astro build` sem erros nem avisos |

## Escala dos títulos

As slices da Master foram geradas separadas e cada título tem escala própria. Larguras medidas em 1440px e fator aplicado sobre `--text-h2` (96px): Manifesto 1,00 · Bruna 0,96 · Criações 0,855 · Encomendas 0,92 · Histórias 0,865 · Bastidores 1,00. O CTA final usa ~155px com entrelinha 0,6, como na Master. `--text-h1` e `--text-h2` agora são proporcionais à largura (`vw`), sem o termo `1rem` que quebrava a proporção em 1024px.

## Responsividade

| Largura | Comportamento |
|---|---|
| ≥ 1280 | Composição desktop completa, header completo |
| 900 – 1279 | Composições proporcionais; header compacto (logo + CTA + menu); jornada de Encomendas em 3 colunas |
| < 900 | Tudo empilhado, fotos de fundo no fluxo em 4:3. **Não é o layout mobile final** (Etapa 5) |

## Diferenças conhecidas para a Master

1. **Fotos provisórias.** São recortes da própria Master (IA), não fotos reais. A pessoa "Bruna", os produtos, as embalagens e as logos em avental/caixa não são conteúdo real nem arte final.
2. **Depoimentos, 1ª pessoa e assinatura.** Ainda `[PLACEHOLDER]` (marcados com `data-provisional`).
3. **Histórias:** a foto de fundo (`provisional-historias-mesa`) tem o inset gravado; no desktop a moldura HTML cobre. Em telas estreitas o inset gravado fica visível.
4. **Linha orgânica da jornada:** aproximação das curvas da Master, não traçada pixel a pixel.
5. **Ondas:** aproximações (uma onda por fronteira onde a Master tem várias camadas).
6. **Quotes:** quebra de linha natural, não as quebras manuais da Master.
7. **Recortes (notch) das fotos grandes** em Manifesto e Criações usam `clip-path` retangular; a Master tem a borda um pouco mais orgânica.
8. **Pendências de conteúdo:** WhatsApp, Instagram, destino de "Descubra as criações" e dados do footer seguem como placeholders (`src/data/site.ts`). Clicar nos CTAs pendentes não leva a lugar nenhum.
9. **Tipografia:** Playfair Display + Montserrat (Fontsource) aproximam a serif e a sans da Master; a fonte definitiva depende do material da marca.
