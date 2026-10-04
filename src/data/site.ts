/**
 * Contrato de conteúdo do site: TUDO o que ainda precisa ser validado com a
 * Bruna mora aqui (marca, navegação, links, contato, horários, claims,
 * fundadora, depoimentos, SEO e dados estruturados).
 *
 * Convenção: um valor entre colchetes (`[TELEFONE]`) é um PLACEHOLDER visível,
 * nunca um dado fictício. Para lançar, troque o token pelo valor real e rode
 * `npm run check:content` (ver docs/production-checklist.md).
 *
 * Referências: docs/consistency-review.md e docs/master-reference/README.md.
 */

/** Um valor é pendente enquanto for um token entre colchetes. */
export const isPending = (value: string | null | undefined): boolean =>
  value == null || value.startsWith('[');

// ---------------------------------------------------------------------------
// Marca
// ---------------------------------------------------------------------------
export const BRAND = {
  name: 'Ateliê Doces Bruna',
  locale: 'pt-BR',
  /** TAGLINE A CONFIRMAR com a Bruna (docs/master-reference/slice-04-bastidores-fechamento.md). */
  tagline: ['Confeitaria artesanal', 'para momentos especiais'],
} as const;

// ---------------------------------------------------------------------------
// Navegação (âncoras internas: header, menu e footer usam a mesma lista)
// ---------------------------------------------------------------------------
export const NAV = [
  { label: 'A Marca', href: '#a-marca' },
  { label: 'Bruna', href: '#bruna' },
  { label: 'Criações', href: '#criacoes' },
  { label: 'Encomendas', href: '#encomendas' },
  { label: 'Contato', href: '#contato' },
] as const;

// ---------------------------------------------------------------------------
// Destinos externos (todos pendentes)
// ---------------------------------------------------------------------------
export const LINKS = {
  /** Link de conversa oficial da Bruna (wa.me). Número não validado. */
  whatsapp: '[WHATSAPP_URL_PLACEHOLDER]',
  /** Perfil @ateliedocesbruna. URL a validar antes da produção. */
  instagram: '[INSTAGRAM_URL_A_VALIDAR]',
  /** Não existe catálogo interno definido. */
  criacoes: '[DESTINO A VALIDAR]',
} as const;

// ---------------------------------------------------------------------------
// Contato e atendimento (texto exibido no footer)
// ---------------------------------------------------------------------------
export const CONTACT = {
  phone: '[TELEFONE]',
  instagram: '[INSTAGRAM]',
  location: '[LOCALIZAÇÃO]',
  email: '[E-MAIL]',
  hours: '[HORÁRIO]',
  year: '[ANO]',
} as const;

/**
 * Horário em formato estruturado, para os dados estruturados (schema.org
 * OpeningHoursSpecification). `null` até haver horário validado.
 * Exemplo: [{ days: ['Monday', 'Tuesday'], opens: '09:00', closes: '18:00' }]
 */
export const BUSINESS_HOURS: Array<{ days: string[]; opens: string; closes: string }> | null = null;

// ---------------------------------------------------------------------------
// Claims da faixa do Manifesto: NÃO VALIDADOS
// ---------------------------------------------------------------------------
export const CLAIMS = ['Feito à mão', 'Ingredientes reais', 'Histórias verdadeiras'] as const;

// ---------------------------------------------------------------------------
// Fundadora: texto em 1ª pessoa e assinatura são PLACEHOLDER (exigem aprovação da Bruna)
// ---------------------------------------------------------------------------
export const FOUNDER = {
  paragraphs: [
    'Sou a Bruna, e cada doce que sai do ateliê carrega um pouco da minha história, do meu olhar atento aos detalhes e do carinho que coloco em tudo o que faço.',
    'Acredito que a confeitaria vai além do sabor: ela tem o poder de aproximar, acolher e transformar momentos simples em lembranças inesquecíveis.',
  ],
} as const;

// ---------------------------------------------------------------------------
// Depoimentos: PLACEHOLDER. Só entram em produção com relatos reais e autorizados.
// ---------------------------------------------------------------------------
export const TESTIMONIALS = [
  {
    text: ['O bolo ficou ainda', 'mais lindo e delicioso', 'do que eu imaginava.', 'Fez toda a diferença', 'no nosso dia!'],
    tag: 'Celebração especial',
  },
  {
    text: ['Tudo perfeito,', 'desde o primeiro', 'atendimento até', 'o último detalhe.', 'Dá para sentir', 'o carinho em cada', 'etapa.'],
    tag: 'Encomenda personalizada',
  },
  {
    text: ['Foi exatamente como eu sonhava.', 'Além de delicioso, trouxe um toque', 'muito especial para a nossa celebração.'],
    tag: 'Presente afetivo',
  },
] as const;

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const SEO = {
  /** Nome do site (og:site_name). */
  siteName: BRAND.name,
  /** Título da home. Neutro e verdadeiro; não inventar localização nem claim. */
  title: BRAND.name,
  /** PENDENTE: não existe descrição aprovada. `null` = a tag nem é emitida. */
  description: null as string | null,
  /** PENDENTE: URL final do site (também via env SITE_URL em astro.config.mjs). */
  siteUrl: null as string | null,
  /** PENDENTE: imagem social oficial (1200×630), caminho dentro de public/. */
  ogImage: null as string | null,
  /** PENDENTE: favicon oficial, caminho dentro de public/. `null` usa um ícone vazio. */
  favicon: null as string | null,
  /** @handle do X/Twitter, se existir. */
  twitterHandle: null as string | null,
  /** Cor da barra do navegador no mobile (cacau do Hero). */
  themeColor: '#1f0d05',
  /**
   * ÚNICA chave que liga a indexação: enquanto `false` a página sai com
   * `noindex, nofollow` (e public/robots.txt bloqueia tudo).
   * Só vire `true` com conteúdo, assets e dados reais (docs/production-checklist.md).
   */
  allowIndexing: false,
} as const;

/**
 * Dados estruturados (JSON-LD). DESLIGADO: nenhum schema é publicado com dados
 * inventados. O contrato e o helper estão em src/lib/structured-data.ts; ligue
 * `enabled` quando url, telefone, endereço, horário e redes forem reais.
 */
export const STRUCTURED_DATA = {
  enabled: false,
  /** Tipo sugerido (confirmar): Bakery, LocalBusiness ou FoodEstablishment. */
  type: 'Bakery',
} as const;

// ---------------------------------------------------------------------------
// Registro do que falta (usado por `npm run check:content` e docs/production-checklist.md)
// ---------------------------------------------------------------------------
export interface PendingItem {
  id: string;
  kind: 'dado' | 'link' | 'copy' | 'asset' | 'seo';
  where: string;
  needs: string;
}

export const PENDING_ITEMS: PendingItem[] = [
  { id: 'whatsapp', kind: 'link', where: 'LINKS.whatsapp', needs: 'Link wa.me oficial (CTAs do Hero, Encomendas, CTA final e header)' },
  { id: 'instagram-url', kind: 'link', where: 'LINKS.instagram', needs: 'URL do perfil @ateliedocesbruna' },
  { id: 'criacoes-destino', kind: 'link', where: 'LINKS.criacoes', needs: 'Destino de "Descubra as criações" (catálogo/página) ou remover o CTA' },
  { id: 'telefone', kind: 'dado', where: 'CONTACT.phone', needs: 'Telefone/WhatsApp de atendimento' },
  { id: 'instagram-handle', kind: 'dado', where: 'CONTACT.instagram', needs: '@ validado' },
  { id: 'localizacao', kind: 'dado', where: 'CONTACT.location', needs: 'Endereço ou região atendida (e decidir se aparece)' },
  { id: 'email', kind: 'dado', where: 'CONTACT.email', needs: 'E-mail de contato' },
  { id: 'horario', kind: 'dado', where: 'CONTACT.hours / BUSINESS_HOURS', needs: 'Horário de atendimento (texto e estruturado)' },
  { id: 'ano', kind: 'dado', where: 'CONTACT.year', needs: 'Ano do copyright (pode ser calculado no build)' },
  { id: 'tagline', kind: 'copy', where: 'BRAND.tagline', needs: 'Confirmar a tagline do footer' },
  { id: 'claims', kind: 'copy', where: 'CLAIMS', needs: 'Validar "feito à mão · ingredientes reais · histórias verdadeiras"' },
  { id: 'founder-text', kind: 'copy', where: 'FOUNDER.paragraphs', needs: 'Texto em 1ª pessoa aprovado pela Bruna' },
  { id: 'testimonials', kind: 'copy', where: 'TESTIMONIALS', needs: 'Depoimentos reais e autorizados' },
  { id: 'seo-description', kind: 'seo', where: 'SEO.description', needs: 'Descrição aprovada (≈155 caracteres)' },
  { id: 'seo-url', kind: 'seo', where: 'SEO.siteUrl / env SITE_URL', needs: 'URL final (canonical, og:url, sitemap)' },
  { id: 'seo-og', kind: 'seo', where: 'SEO.ogImage', needs: 'Imagem social oficial 1200×630' },
  { id: 'favicon', kind: 'asset', where: 'SEO.favicon', needs: 'Favicon oficial' },
  { id: 'indexing', kind: 'seo', where: 'SEO.allowIndexing + public/robots.txt', needs: 'Ligar a indexação só no lançamento' },
  { id: 'structured-data', kind: 'seo', where: 'STRUCTURED_DATA.enabled', needs: 'Ligar com dados reais (src/lib/structured-data.ts)' },
];
