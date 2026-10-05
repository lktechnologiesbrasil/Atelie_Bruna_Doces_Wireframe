/**
 * Helpers do catálogo (src/data/products.ts). Funções puras, sem dependências, seguras para
 * rodar no build e no cliente. Não há estado nem fetch.
 */
import { CATEGORIES, type Product, type ProductCategory } from '../data/products';

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** 2400 → "R$ 24,00" (o espaço entre o símbolo e o valor é o não separável do Intl). */
export function formatBRL(cents: number): string {
  return brl.format(cents / 100);
}

/** Categorias na ordem do cardápio. */
export function getCategories(): ProductCategory[] {
  return CATEGORIES;
}

/** Todos os produtos, na ordem categoria → cardápio. */
export const PRODUCTS: Product[] = CATEGORIES.flatMap((category) => category.products);

export function getProductsByCategory(categoryId: string): Product[] {
  return CATEGORIES.find((category) => category.id === categoryId)?.products ?? [];
}

export function hasPromotion(product: Product): boolean {
  return product.promotionalPriceCents !== null && product.promotionalPriceCents < product.priceCents;
}

/** Preço que o cliente paga: o promocional, quando existe. */
export function getEffectivePrice(product: Product): number {
  return hasPromotion(product) ? (product.promotionalPriceCents as number) : product.priceCents;
}

/** Minúsculas e sem acentos, para "acai" achar "Açaí". */
export function normalizeSearchText(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export interface SearchEntry {
  id: string;
  /** Nome + descrição + categoria, já normalizados. */
  text: string;
}

/** Índice serializável (54 itens): pode ser embutido na página e consultado no cliente. */
export function buildSearchIndex(categories: ProductCategory[] = CATEGORIES): SearchEntry[] {
  return categories.flatMap((category) =>
    category.products.map((product) => ({
      id: product.id,
      text: normalizeSearchText([product.name, product.description ?? '', category.name].join(' ')),
    })),
  );
}

const SEARCH_INDEX = buildSearchIndex();

/**
 * Todos os termos precisam aparecer (nome, descrição ou categoria). Consulta vazia devolve tudo.
 * Mantém a ordem do cardápio.
 */
export function searchProducts(query: string, index: SearchEntry[] = SEARCH_INDEX): Product[] {
  const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return PRODUCTS;
  const hits = new Set(index.filter((entry) => terms.every((term) => entry.text.includes(term))).map((entry) => entry.id));
  return PRODUCTS.filter((product) => hits.has(product.id));
}
