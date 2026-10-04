# Checklist de lançamento

> O site está **tecnicamente pronto** (performance, acessibilidade, SEO técnico, contrato de dados), mas **não publicável**: ainda há assets, textos e dados provisórios. Esta lista é o que falta, na ordem em que faz sentido fazer.
>
> Gate automático: `npm run build && npm run check:content:strict` (sai com 1 enquanto houver qualquer pendência). O relatório sem `:strict` nunca quebra o desenvolvimento.

## 1. Dados reais (`src/data/site.ts`)

Estado atual (auditoria em `docs/content-audit.md`, pedido pronto em `docs/bruna-content-request.md`): **WhatsApp, Instagram, telefone, @handle e cidade já estão no site com valores públicos rastreáveis**, mas como `needs-confirmation` (continuam contando no `check:content`). Só e-mail, horário e destino de "Descubra as criações" são placeholders; o ano é calculado no build. Quando a Bruna confirmar, mude o item para resolvido removendo-o de `PENDING_ITEMS`. A lista completa e viva está em `PENDING_ITEMS`.

- [ ] `LINKS.whatsapp`: **confirmar** `wa.me/5535984235184` (alimenta 5 CTAs e o header)
- [ ] `LINKS.instagram` e `CONTACT.instagram`: **confirmar** o perfil público
- [ ] `LINKS.criacoes`: destino de "Descubra as criações" (ou remover o CTA)
- [ ] `CONTACT.phone` e `.location` (cidade): **confirmar**; `.email` e `.hours`: obter da Bruna (horários públicos se contradizem); `.year` já é calculado
- [ ] `BUSINESS_HOURS` estruturado (para o JSON-LD)
- [ ] `BRAND.tagline` e `CLAIMS` confirmados
- [ ] `FOUNDER.paragraphs` aprovados em 1ª pessoa
- [ ] `TESTIMONIALS` reais e **autorizados** (ou remover a seção/ocultar)

## 2. Assets reais

Todos hoje são recortes provisórios da Master (`src/assets/provisional/`, prefixo `provisional-`). O mapa slot → asset real está em `src/data/images.ts` (`ASSET_SLOTS`: pasta de destino, o que a foto precisa mostrar e a proporção esperada).

- [ ] Logo oficial (wordmark claro/escuro, lockup, flor) → `src/assets/brand/`
- [ ] Retrato **real** da Bruna + assinatura → `src/assets/founder/`
- [ ] Fotos de produtos (Hero, Criações, CTA) → `src/assets/products/`
- [ ] Fotos de processo (Manifesto, Encomendas, Bastidores) → `src/assets/process/`
- [ ] Fotos de celebração **autorizadas** (Histórias) → `src/assets/social-proof/`
- [ ] Trocar o `import` do slot em `src/data/images.ts`; apagar o `provisional-*` sem uso
- [ ] Usar `<Picture formats={['avif','webp']}>` nas fotos reais (≈ 20% menor)
- [ ] Revisar `alt` de cada foto em `src/pages/index.astro` (descrever o que a foto real mostra)
- [ ] Revisar os crops mobile (`*-m`) e as proporções de `ASSET_SLOTS`; a foto "close" de Criações precisa de ≥ 312px de largura

## 3. SEO e indexação (**só no lançamento**)

Hoje: `noindex, nofollow` + `public/robots.txt` bloqueando tudo. Tudo é controlado por `src/data/site.ts` (`SEO`) e `.env`.

- [ ] URL final em `SITE_URL` (ambiente de build) → liga `canonical`, `og:url`, `og:image` absoluta
- [ ] `SEO.description` aprovada (≈ 155 caracteres) → liga `meta description`, `og:description`, `twitter:description`
- [ ] `SEO.ogImage` oficial 1200 × 630 em `public/` → liga `og:image` e `twitter:card = summary_large_image`
- [ ] `SEO.favicon` oficial em `public/` (+ apple-touch-icon se desejado)
- [ ] `SEO.twitterHandle`, se existir
- [ ] `STRUCTURED_DATA.enabled = true` com url, telefone, endereço **estruturado** (PostalAddress), horário e redes reais (`src/lib/structured-data.ts` devolve `null` e avisa no build enquanto faltar algo)
- [ ] Sitemap: `npx astro add sitemap` (exige `SITE_URL`) e acrescentar `Sitemap:` ao `robots.txt`
- [ ] `public/robots.txt`: trocar `Disallow: /` por `Allow: /`
- [ ] **Por último:** `SEO.allowIndexing = true` (tira `noindex, nofollow`)
- [ ] Cadastrar o site no Google Search Console / Bing Webmaster

## 4. Conferência técnica final

- [ ] `npm ci && npm run build` sem avisos
- [ ] `npm run check:content:strict` com saída 0
- [ ] `node tools/qa-check.mjs` (layout, overflow, menu, teclado) em 1440 → 360
- [ ] `node tools/qa-motion.mjs` (motion, reduced-motion, sem JS, resize)
- [ ] `node tools/qa-a11y.mjs` (estrutura, nomes, contraste)
- [ ] `node tools/qa-perf.mjs` contra `npm run preview` (referência: LCP mobile ≈ 1,1 s, TBT ≈ 190 ms, CLS ≈ 0 no ambiente local com throttling)
- [ ] Revisão visual com os assets reais em 1440 / 768 / 390 (os crops e os recortes creme foram desenhados para as fotos provisórias)
- [ ] Teste real em 1 iPhone e 1 Android (menu, trilhos horizontais, rolagem, motion)

## 5. Hospedagem (fora do escopo do repositório)

- [ ] Compressão Brotli/gzip e cache longo para `/_astro/*` (arquivos com hash)
- [ ] HTTPS e redirecionamento do domínio principal
- [ ] Cabeçalhos de segurança básicos (CSP compatível com os dois scripts inline do `<head>`/`<body>`)
- [ ] Domínio e DNS
