/**
 * Dados do site num lugar só.
 *
 * Tudo marcado como PLACEHOLDER ainda NÃO foi validado com a Bruna e não pode
 * ser trocado por um valor inventado. Ver docs/consistency-review.md e
 * docs/master-reference/README.md.
 */

export const NAV = [
  { label: 'A Marca', href: '#a-marca' },
  { label: 'Bruna', href: '#bruna' },
  { label: 'Criações', href: '#criacoes' },
  { label: 'Encomendas', href: '#encomendas' },
  { label: 'Contato', href: '#contato' },
] as const;

/** Destinos externos: todos pendentes de validação. */
export const LINKS = {
  /** Intenção: WhatsApp da Bruna. Número/link oficial não validado. */
  whatsapp: '[WHATSAPP_URL_PLACEHOLDER]',
  /** Intenção: perfil @ateliedocesbruna. URL a validar antes da produção. */
  instagram: '[INSTAGRAM_URL_A_VALIDAR]',
  /** Não existe catálogo interno definido. */
  criacoes: '[DESTINO A VALIDAR]',
} as const;

/** Um destino é pendente enquanto ainda for um token entre colchetes. */
export const isPending = (href: string) => href.startsWith('[');

/** Dados de contato: PLACEHOLDERS visíveis, nunca dados fictícios. */
export const CONTACT = {
  phone: '[TELEFONE]',
  instagram: '[INSTAGRAM]',
  location: '[LOCALIZAÇÃO]',
  email: '[E-MAIL]',
  hours: '[HORÁRIO]',
  year: '[ANO]',
} as const;
