/**
 * Contrato de conteúdo do site: TUDO o que ainda precisa ser validado com a
 * Bruna mora aqui (marca, navegação, links, contato, horários, claims,
 * fundadora, depoimentos, SEO e dados estruturados).
 *
 * Convenção: um valor entre colchetes (`[E-MAIL]`) é um PLACEHOLDER visível, nunca um
 * dado fictício. Um valor real sem colchetes só entra com FONTE rastreável e fica
 * marcado como `needs-confirmation` em PENDING_ITEMS até a Bruna confirmar
 * (ver docs/content-audit.md). Rode `npm run check:content` para o relatório.
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
// Navegação (header, menu e footer usam a mesma lista)
//
// `href` começando com "#" é uma âncora da Home: nas outras páginas o Header/Footer
// prefixam "/". Um item com `page` é uma página própria (`href` absoluto) e marca o
// estado ativo quando `<Header current="...">` recebe o mesmo valor.
// ---------------------------------------------------------------------------
export interface NavItem {
  label: string;
  href: string;
  page?: 'produtos';
}

export const NAV: readonly NavItem[] = [
  { label: 'A Marca', href: '#a-marca' },
  { label: 'Bruna', href: '#bruna' },
  { label: 'Produtos', href: '/produtos', page: 'produtos' },
  { label: 'Criações', href: '#criacoes' },
  { label: 'Encomendas', href: '#encomendas' },
  { label: 'Contato', href: '#contato' },
];

/**
 * Navegação do HEADER: só o que representa uma página real (`page`). Regra: entra no Header uma página
 * real do site, um destino externo relevante (Instagram, WhatsApp) ou uma ação principal (Encomendar).
 * Não usar o Header como índice das seções da Home; `NAV` completo segue no Footer.
 */
export const HEADER_NAV: readonly NavItem[] = NAV.filter((item) => item.page);

/** Resolve o href de um item de NAV para a página atual (`base` = '' na Home, '/' nas demais). */
export const navHref = (item: NavItem, base: string): string => (item.href.startsWith('#') ? base + item.href : item.href);

// ---------------------------------------------------------------------------
// Destinos externos (todos pendentes)
// ---------------------------------------------------------------------------
export const LINKS = {
  /** wa.me do Linktree público da marca (observado 2026-09-26). A CONFIRMAR com a Bruna. */
  whatsapp: 'https://wa.me/5535984235184',
  /** Perfil público da marca (observado 2026-09-26). A CONFIRMAR com a Bruna. */
  instagram: 'https://www.instagram.com/ateliedocesbruna/',
  /** "Descubra as criações" (Home) → página interna de produtos. Resolvido. */
  criacoes: '/produtos',
  /** Cardápio de delivery no Yooga (link público do Linktree, observado 2026-09-26). Não há deep-link por produto. A CONFIRMAR. */
  cardapio: 'https://delivery.yooga.app/ateliedocesbruna',
  /**
   * Menu de Bolos: o link do Linktree é um arquivo do Google Drive que EXIGE LOGIN, então não serve ao
   * público. Enquanto for pendente, a página de produtos manda para o WhatsApp (ver PRODUCTS_PAGE.cakes).
   */
  menuBolos: '[MENU DE BOLOS A DISPONIBILIZAR]',
} as const;

// ---------------------------------------------------------------------------
// Página /produtos: textos. Os dados dos produtos vêm de src/data/products.ts (nunca daqui).
// O texto abaixo é institucional e neutro, mas AINDA PRECISA DE APROVAÇÃO da Bruna.
// ---------------------------------------------------------------------------
export const PRODUCTS_PAGE = {
  title: 'Produtos',
  eyebrow: 'Nossas criações',
  heroTitle: ['Tem sempre', 'algo para', 'a sua vontade.'],
  heroLead: 'Doces, salgados, sobremesas e criações artesanais para diferentes momentos do seu dia.',
  searchPlaceholder: 'Buscar doce, sabor ou produto...',
  catalogEyebrow: 'Nossos produtos',
  catalogTitle: ['Uma seleção de sabores', 'para cada momento.'],
  catalogLead: 'O cardápio do Ateliê reunido em um só lugar, para você escolher o que combina com o seu momento.',
  cakes: {
    eyebrow: 'Bolos por encomenda',
    title: ['Bolos que tornam', 'momentos ainda mais especiais.'],
    text: 'Para aniversários, celebrações e tudo o que merece ser inesquecível. Fale com o Ateliê para encomendar.',
    /** Enquanto LINKS.menuBolos for pendente, o CTA vai para o WhatsApp com este rótulo. */
    ctaMenu: 'Ver menu de bolos',
    ctaFallback: 'Pedir o menu de bolos',
  },
  cta: {
    eyebrow: 'A doçura sempre por perto',
    title: ['Encontrou', 'a sua vontade?'],
    text: 'Faça o seu pedido pelo cardápio ou fale com o Ateliê pelo WhatsApp.',
    order: 'Encomendar agora',
    whatsapp: 'Falar pelo WhatsApp',
  },
} as const;

// ---------------------------------------------------------------------------
// Contato e atendimento (texto exibido no footer)
// ---------------------------------------------------------------------------
export const CONTACT = {
  /** Ficha do Google e Linktree convergem (observado 2026-09-26). A CONFIRMAR formato/uso. */
  phone: '(35) 98423-5184',
  /** Handle observado no perfil público. A CONFIRMAR. */
  instagram: '@ateliedocesbruna',
  /** Só a cidade (Instagram, Google e Yooga concordam). Endereço completo A CONFIRMAR: ver docs/content-audit.md. */
  location: 'Itapeva, MG',
  /** Nenhum e-mail real conhecido. */
  email: '[E-MAIL]',
  /** Horários divergem entre Google, Instagram e Yooga: NÃO escolher sem a Bruna. */
  hours: '[HORÁRIO]',
  /** Calculado no build: não depende de validação. */
  year: String(new Date().getFullYear()),
} as const;

/** Atributos de link: externos abrem em nova aba sem vazar a origem; pendentes ficam desabilitados. */
export const linkAttrs = (href: string): Record<string, string> => {
  if (isPending(href)) return { 'data-link-status': 'pending', 'aria-disabled': 'true', rel: 'nofollow' };
  return /^https?:\/\//.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
};

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
export type ContentState = 'placeholder' | 'needs-confirmation' | 'missing';

export interface PendingItem {
  id: string;
  kind: 'dado' | 'link' | 'copy' | 'asset' | 'seo';
  /** `needs-confirmation` = valor real com fonte, mas ainda não confirmado pela Bruna. */
  state: ContentState;
  where: string;
  needs: string;
  /** Fonte do valor real (só quando state = needs-confirmation). */
  source?: string;
}

export const PENDING_ITEMS: PendingItem[] = [
  { id: 'whatsapp', kind: 'link', state: 'needs-confirmation', where: 'LINKS.whatsapp', needs: 'Bruna confirmar que este é o WhatsApp oficial (CTAs do Hero, Encomendas, CTA final e header)', source: 'Linktree público linktr.ee/ateliedocesbruna (2026-09-26); mesmo número da ficha do Google' },
  { id: 'instagram-url', kind: 'link', state: 'needs-confirmation', where: 'LINKS.instagram', needs: 'Confirmar o perfil oficial', source: 'instagram.com/ateliedocesbruna (observado 2026-09-26)' },
  { id: 'cardapio-yooga', kind: 'link', state: 'needs-confirmation', where: 'LINKS.cardapio', needs: 'Confirmar que o cardápio Yooga é o canal oficial de pedidos (CTAs da página /produtos)', source: 'Linktree público linktr.ee/ateliedocesbruna (2026-09-26)' },
  { id: 'menu-bolos-link', kind: 'link', state: 'placeholder', where: 'LINKS.menuBolos / CAKES_MENU', needs: 'Menu de Bolos exige login Google: a Bruna enviar o arquivo ou liberar o link público; só então auditar e listar. Hoje o CTA da página de produtos usa o WhatsApp' },
  { id: 'products-copy', kind: 'copy', state: 'placeholder', where: 'PRODUCTS_PAGE', needs: 'Textos institucionais da página /produtos aprovados pela Bruna' },
  { id: 'telefone', kind: 'dado', state: 'needs-confirmation', where: 'CONTACT.phone', needs: 'Confirmar o número e se é também o WhatsApp', source: 'Ficha do Google e Linktree (2026-09-26)' },
  { id: 'instagram-handle', kind: 'dado', state: 'needs-confirmation', where: 'CONTACT.instagram', needs: 'Confirmar o @', source: 'Perfil público (2026-09-26)' },
  { id: 'localizacao', kind: 'dado', state: 'needs-confirmation', where: 'CONTACT.location', needs: 'Confirmar cidade e endereço completo (Google: Al. dos Ipês, Itapeva-MG, 37655-000; completo a confirmar) e se o endereço aparece', source: 'Instagram, Google e Yooga: Itapeva/MG (2026-09-26)' },
  { id: 'email', kind: 'dado', state: 'missing', where: 'CONTACT.email', needs: 'E-mail de contato (nenhum real conhecido; o "atendimento@ateliedocesbruna.com" dos concepts é fictício)' },
  { id: 'horario', kind: 'dado', state: 'placeholder', where: 'CONTACT.hours / BUSINESS_HOURS', needs: 'Horário de atendimento: Google, Instagram e Yooga divergem; só a Bruna resolve (texto e estruturado)' },
  { id: 'tagline', kind: 'copy', state: 'placeholder', where: 'BRAND.tagline', needs: 'Confirmar a tagline do footer (concept) ou adotar uma frase real da marca: bio "Doces incríveis para transformar o seu dia!"' },
  { id: 'claims', kind: 'copy', state: 'placeholder', where: 'CLAIMS', needs: 'Validar "feito à mão · ingredientes reais · histórias verdadeiras" ("histórias verdadeiras" depende de depoimentos reais)' },
  { id: 'founder-text', kind: 'copy', state: 'placeholder', where: 'FOUNDER.paragraphs', needs: 'Texto em 1ª pessoa aprovado pela Bruna' },
  { id: 'testimonials', kind: 'copy', state: 'missing', where: 'TESTIMONIALS', needs: 'Depoimentos reais e autorizados (nenhum recebido)' },
  { id: 'seo-description', kind: 'seo', state: 'missing', where: 'SEO.description', needs: 'Descrição aprovada (≈155 caracteres)' },
  { id: 'seo-url', kind: 'seo', state: 'missing', where: 'SEO.siteUrl / env SITE_URL', needs: 'URL/domínio final (canonical, og:url, sitemap)' },
  { id: 'seo-og', kind: 'seo', state: 'missing', where: 'SEO.ogImage', needs: 'Imagem social oficial 1200×630 (precisa de foto/logo real)' },
  { id: 'favicon', kind: 'asset', state: 'missing', where: 'SEO.favicon', needs: 'Favicon oficial (a partir da logo/ícone floral)' },
  { id: 'indexing', kind: 'seo', state: 'placeholder', where: 'SEO.allowIndexing + public/robots.txt', needs: 'Ligar a indexação só no lançamento' },
  { id: 'structured-data', kind: 'seo', state: 'placeholder', where: 'STRUCTURED_DATA.enabled', needs: 'Ligar com endereço estruturado, horário e URL reais (src/lib/structured-data.ts)' },
];
