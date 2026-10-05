/**
 * Busca de texto: funções puras SEM dados, para o cliente poder importá-las sem carregar o
 * catálogo inteiro no JavaScript (o índice chega embutido na página).
 */

/** Minúsculas e sem acentos, para "acai" achar "Açaí". */
export function normalizeSearchText(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/** Separa a consulta em termos normalizados. */
export function searchTerms(query: string): string[] {
  return normalizeSearchText(query).split(/\s+/).filter(Boolean);
}

/** `text` já normalizado; todos os termos precisam aparecer. Sem termos, tudo combina. */
export function matchesTerms(text: string, terms: string[]): boolean {
  return terms.every((term) => text.includes(term));
}
