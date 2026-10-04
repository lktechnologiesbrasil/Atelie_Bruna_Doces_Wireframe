# QA: Etapa 7 (performance, acessibilidade, SEO técnico e preparação de produção)

> Base tecnicamente pronta para receber conteúdo real; **não publicável** (ver `docs/production-checklist.md`).
> `noindex, nofollow` mantido. Nada publicado, nada enviado ao remoto. Sem mudança visual perceptível.

Medidas no **build de produção** (`astro preview`), Chrome headless. Mobile = 390px, CPU 4× e 4G lenta (1,6 Mbps, 150 ms). Medianas de 3 execuções; valores locais são referência, não verdade absoluta. Ferramentas: `tools/qa-perf.mjs`, `qa-vdiff.mjs`, `qa-a11y.mjs`, `check-content.mjs`.

## Performance

| | Antes (`0790c45`) | Depois |
|---|---|---|
| JS eager | 119 kB bruto / 46 kB gzip (tudo) | **1,5 kB** (header/menu) |
| JS do motion | no bundle inicial | 118 kB bruto / **41 kB brotli** (45,6 gzip), carregado ocioso |
| CSS | 40,5 kB / 9,3 kB gzip | 38,9 kB / 9,0 kB gzip |
| Fontes carregadas | 116 kB (3 variáveis) | **83 kB** (Playfair 400 + itálico estático, Montserrat variável) |
| Arquivos de fonte no build | 13 (357 kB) | 7 (216 kB) |
| Imagens | 33 WebP, 809 kB no build | idem (nada a cortar sem mudar a aparência) |
| ScrollTriggers (desktop) | 61 no load | **21** (só scrub: Hero, parallax, ondas, traço) |
| ScrollTriggers (mobile) | 34 no load | **1** (traço da jornada) |
| Transferido no load (mobile) | 374 kB | 328 kB |
| **Mobile LCP** | 1664 ms | **1096 ms** |
| **Mobile TBT** | 425 ms | **188 ms** |
| Mobile maior tarefa | 276 ms | 151 ms |
| Mobile FCP | 992 ms | 928 ms |
| Mobile CLS | 0 | 0 |
| Desktop FCP / LCP | 248–324 / 332–492 ms | 344–364 / 448–460 ms (+1 execução fria de 828 / 896 ms); ruído local ±100 ms, ambos na faixa "bom" |
| Desktop CLS / TBT | 0,005 / 0 | 0,005 / 0 |
| INP aproximado (clique no menu) | n/a | desktop 16 ms, mobile 80 ms (CPU 4×) |

O que mudou, e por quê (medido antes de cada passo):

1. **Boot do motion ocioso** (`import()` em `requestIdleCallback`, timeout 1,2 s): GSAP não disputa a thread com a pintura do LCP.
2. **Entrada do Hero em CSS puro**: a foto (elemento do LCP) estava com `opacity: 0` até o JS rodar; agora anima sem JS e o LCP não espera download/execução de script. Mesmo resultado visual.
3. **Revelações pontuais com `IntersectionObserver`** (um por margem) no lugar de ~40 ScrollTriggers/timelines criados no load. O custo no mobile estava aí (reveals 83 ms + dois `refresh` de 11–13 ms em CPU 4×). ScrollTrigger permanece só onde há `scrub`.
4. **Um único `ScrollTrigger.refresh`** (fontes + load), antes eram dois.
5. **Playfair estático** (só 400 normal e itálico, subset latin): −34 kB. Montserrat ficou variável (400 + 500 estáticos pesariam o mesmo).
6. `hero-base` não é mais `eager` (some no mobile); flor oculta da assinatura e utilitários `.bleed-*` removidos.

Decisões de **não fazer**: remover GSAP (custo real = 41 kB brotli, idle); AVIF agora (−20% sobre o WebP em imagens que serão substituídas; fica documentado para os assets reais); preload de fontes (o LCP é imagem e o CLS de swap é ≈ 0); minificar manualmente; `will-change` (nenhum permanente). Cobertura de CSS: só 2 utilitários mortos (removidos).

Imagens (auditoria do HTML): 30 `<img>`, todas com `width`/`height` (CLS), `decoding="async"`, `lazy` exceto o Hero (`eager` + `fetchpriority="high"`) e os logos do header; `srcset`/`sizes` nas fotos de fundo (800/1200 px).

## Acessibilidade (`qa-a11y.json`)

| Item | Resultado |
|---|---|
| `lang`, `title` | `pt-BR`, "Ateliê Doces Bruna" |
| Landmarks | banner, `nav` "Principal" / "Menu" / "Rodapé", `main`, contentinfo, dialog "Menu" |
| Títulos | 1 × `h1`, `h2` por seção, `h3` nos passos, **0 saltos** de nível |
| Nome acessível de links/botões | 0 sem nome |
| IDs duplicados, `aria-controls` quebrados | 0 |
| Imagens | 30, todas com `alt` (16 decorativas `alt=""`, 14 descritivas e neutras) |
| Contraste (83 textos medidos) | 1 falha real corrigida; o nav do header sobre o Hero mede ≥ 17:1 por amostragem de pixels (o auditor usa o fundo do `body`, falso positivo) |
| Teclado | skip link → logo → nav → ações → CTAs, foco visível (2px); menu com foco preso, `Esc`, `inert`, foco devolvido |
| Reduced motion / sem JS | página completa e estática (ver QA de motion) |

Correções: espaço entre as linhas dos títulos (o Astro comprimia: lia-se "doces,momentosinesquecíveis."); links pendentes anunciados com `aria-disabled="true"` (e cliques bloqueados); legenda "Acompanhe no Instagram" de 3,18:1 para ≥ 4,5:1; `main` com `tabindex="-1"` (alvo do skip link); trilhos de scroll horizontais do mobile focáveis, com `role="group"` e rótulo (sem tab stop no desktop); assinatura provisória com `alt=""` (não nomeia "Bruna"); comentários HTML internos deixaram de ir para o HTML público.

## SEO técnico (infraestrutura pronta, **desligada**)

- `src/lib/seo.ts` monta o `<head>` a partir de `SEO` (`src/data/site.ts`): `title`, `description`, `robots`, `canonical`, `theme-color`, favicon, Open Graph e Twitter cards. **Nada é inventado**: sem URL não há `canonical`/`og:url`/`og:image`; sem descrição aprovada não há `meta description` (não existe texto canônico nos docs; a tagline está "a confirmar").
- **Hoje o `<head>` emite:** `title`, `robots = noindex, nofollow`, `theme-color`, favicon vazio, `og:type/site_name/locale/title`, `twitter:card = summary` e `twitter:title`.
- `SEO.allowIndexing` é a única chave que tira o `noindex`; `public/robots.txt` de staging bloqueia tudo; `SITE_URL` (env, `.env.example`) liga canonical/absolutos.
- **JSON-LD:** contrato e helper em `src/lib/structured-data.ts`, `STRUCTURED_DATA.enabled = false`. Mesmo ligado, devolve `null` (e avisa no build) enquanto URL, telefone, endereço, horário ou Instagram forem placeholder. Nenhum `Bakery`/`LocalBusiness` publicado.
- Sitemap: não ativado (incoerente com `noindex`); passos em `docs/production-checklist.md`.

## Contrato de dados e guarda de produção

`src/data/site.ts` agora concentra: `BRAND`, `NAV`, `LINKS`, `CONTACT`, `BUSINESS_HOURS`, `CLAIMS`, `FOUNDER`, `TESTIMONIALS`, `SEO`, `STRUCTURED_DATA` e `PENDING_ITEMS` (19 pendências com onde trocar e o que falta). O `index.astro` não tem mais texto pendente embutido (depoimentos, texto da fundadora, claims, tagline e título vêm do contrato).

`src/data/images.ts` é o **manifesto de imagens**: um `import` por slot e `ASSET_SLOTS` (slot → pasta de destino, o que o asset real precisa mostrar, proporção). Header e Seal também passam por ele. As pastas `src/assets/{brand,founder,products,process,social-proof}/` são só convenção: nada foi movido (evita churn de ~40 arquivos; criam-se quando o primeiro asset real chegar).

`npm run check:content` lista tokens do contrato, SEO pendente, tokens/links/`data-provisional`/`provisional-*` no HTML gerado e `robots.txt`; `npm run check:content:strict` sai com 1 enquanto houver pendência (**gate de lançamento**; o build normal nunca falha). Hoje: 25 pendências detectadas.

### Mapa provisório → asset real

| Provisório (slot) | Asset real necessário | Pasta |
|---|---|---|
| Hero (`heroBg`, `heroBase`) | Foto de produto-estrela, fundo escuro à esquerda | `products` |
| Manifesto (mãos, brigadeiros, chocolate, base/faixa) | Fotos de processo e tecido/cerâmica | `process` |
| Bruna (`brunaRetrato`, `assinatura`) | **Retrato real** + assinatura em arquivo | `founder` |
| Criações (bolo, brigadeiros, fatia, cheesecake) | Fotos reais do portfólio | `products` |
| Encomendas (caderno, morango, mesa) | Briefing, finalização, bolo na mesa | `process` |
| Histórias (mesa, fatia) | Foto de celebração **autorizada** | `social-proof` |
| Bastidores (confeitando, peneira, laço) | Fotos reais de processo | `process` |
| CTA final | Cena de celebração com embalagem real | `products` |
| Logo (wordmark, lockup, selo, flor) | Logo oficial SVG/PNG transparente | `brand` |

## Segurança e privacidade

Sem `.env` versionado, chaves, tokens, caminhos locais ou usernames nos arquivos versionados; sem `localhost`, e-mail, telefone ou URL externa no HTML/bundle. As únicas ocorrências de "API_KEY" são o *nome* de uma variável citada em docs de planejamento. O único uso de ambiente é `SITE_URL` (build-time, não secreto). `.claude/launch.json` (com caminho local) segue fora do Git.

## Regressão visual e responsivo

Capturas estáticas (`prefers-reduced-motion`) comparadas por faixas com a Etapa 6: alturas **idênticas** (8470 / 14562 / 10187 px) e pior faixa com diferença média de **0,62–0,72** (antialiasing). Nenhuma faixa acima de 2.

| Largura | Overflow | Imagens | Console | Header | Menu |
|---|---|---|---|---|---|
| 1440 · 1280 · 1024 · 768 · 430 · 390 · 360 | 0 | 30 ok, 0 deformadas | sem erros | clear → solid, sem salto | ok (≤ 1279) |

Motion (1440 / 768 / 390): CLS ≤ 0,002, 0 elementos presos, resize atravessando 900px e reload sem erros, reduced-motion no load e alternado, sem JS completo. Microcopy mínima 12px; alvos ≥ 44px abaixo de 1024px.

Artefatos: `impl-1440/768/390.webp`, `compare-1440-etapa6-vs-etapa7.webp`, `compare-390-top-etapa6-vs-etapa7.webp`, `perf-before.json`, `perf-after.json`, `qa-check.json`, `qa-motion.json`, `qa-a11y.json`.

## Diferenças restantes

- Fotos, logo, assinatura, depoimentos, texto da Bruna e dados de contato continuam provisórios/placeholder.
- Sem meta description, canonical, `og:image`, favicon oficial e JSON-LD até haver dados reais.
- LCP/TBT em CPU 4× emulada em software variam entre execuções (por isso medianas); confirmar em dispositivo real.
- Links do footer têm 36px de altura no desktop (≥ 900px).
