/**
 * Helpers do catálogo (src/data/products.ts). Funções puras, sem dependências, seguras para
 * rodar no build e no cliente. Não há estado nem fetch.
 */
import { CATEGORIES, type Product, type ProductCategory } from '../data/products';
import { PRODUCT_DISPLAY_NAMES, CATEGORY_DISPLAY_NAMES } from '../data/products-display';
import { normalizeSearchText, searchTerms, matchesTerms } from './search';

export { normalizeSearchText };

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

/**
 * Menor valor com que o produto pode ser efetivamente comprado: preço efetivo + as opções
 * OBRIGATÓRIAS mais baratas (`min` seleções por grupo obrigatório). Derivado dos grupos, nunca fixo:
 * o Açaí 350 ml (R$ 16,00) exige 1 complemento (o mais barato custa R$ 3,50) → R$ 19,50.
 * Simplificação: as seleções mínimas usam as opções mais baratas, uma unidade de cada, repetindo a
 * mais barata se faltarem opções (o snapshot não guarda o `max` por opção).
 */
export function getMinimumPurchasablePrice(product: Product): number {
  let total = getEffectivePrice(product);
  for (const group of product.optionGroups) {
    if (!group.required || group.min <= 0) continue;
    const prices = group.options.map((option) => option.priceCents).sort((a, b) => a - b);
    for (let i = 0; i < group.min; i += 1) total += prices[Math.min(i, prices.length - 1)] ?? 0;
  }
  return total;
}

/** O produto tem opções (grupos de adicionais/complementos)? */
export function hasOptions(product: Product): boolean {
  return product.optionGroups.length > 0;
}

/** Exige escolher algo antes de comprar (o preço exibido deve ser "a partir de"). */
export function hasRequiredOptions(product: Product): boolean {
  return getMinimumPurchasablePrice(product) > getEffectivePrice(product);
}

// ---------------------------------------------------------------------------
// Apresentação (o snapshot continua com os nomes de origem)
// ---------------------------------------------------------------------------
const stripSymbols = (text: string) =>
  text
    .replace(/[\p{Extended_Pictographic}️‍]/gu, '')
    .replace(/\s*;\)\s*$/, '')
    .replace(/^[-–\s]+/, '')
    .replace(/\s+/g, ' ')
    .trim();

const hasLowercase = (text: string) => text !== text.toLocaleUpperCase('pt-BR');

/** CAIXA ALTA vira frase; o resto só ganha a primeira letra maiúscula. */
function tidy(text: string): string {
  const base = stripSymbols(text);
  const lowered = hasLowercase(base) ? base : base.toLocaleLowerCase('pt-BR');
  return lowered.charAt(0).toLocaleUpperCase('pt-BR') + lowered.slice(1);
}

/** Nome para exibir: correção manual (products-display.ts) ou a regra geral. Não altera o dado de origem. */
export function getProductDisplayName(product: Product): string {
  return PRODUCT_DISPLAY_NAMES[product.sourceProductId] ?? tidy(product.name);
}

export function getCategoryDisplayName(category: ProductCategory): string {
  return CATEGORY_DISPLAY_NAMES[category.id] ?? tidy(category.sourceName);
}

/** Descrição em uma linha só, sem os asteriscos de ênfase do Yooga. O texto continua o publicado. */
export function getProductDescription(product: Product): string | null {
  if (!product.description) return null;
  const text = product.description.replace(/\*+/g, '').replace(/\s+/g, ' ').trim();
  return text || null;
}

/** Totais derivados dos dados (nada fixo na interface). */
export function getCatalogStats() {
  return {
    categories: CATEGORIES.length,
    products: PRODUCTS.length,
    promotions: PRODUCTS.filter(hasPromotion).length,
    withOptions: PRODUCTS.filter(hasOptions).length,
    withoutImage: PRODUCTS.filter((product) => !product.imageUrl).length,
  };
}

/** Categorias da navegação: todas, exceto as de serviço (`utility`, ex.: garfinho). */
export function getNavigableCategories(): ProductCategory[] {
  return CATEGORIES.filter((category) => category.kind !== 'utility');
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
      // nome de origem + nome de exibição + descrição + categoria (origem e exibição)
      text: normalizeSearchText(
        [product.name, getProductDisplayName(product), getProductDescription(product) ?? '', category.sourceName, getCategoryDisplayName(category)].join(' '),
      ),
    })),
  );
}

const SEARCH_INDEX = buildSearchIndex();

/**
 * Todos os termos precisam aparecer (nome, descrição ou categoria). Consulta vazia devolve tudo.
 * Mantém a ordem do cardápio.
 */
export function searchProducts(query: string, index: SearchEntry[] = SEARCH_INDEX): Product[] {
  const terms = searchTerms(query);
  if (!terms.length) return PRODUCTS;
  const hits = new Set(index.filter((entry) => matchesTerms(entry.text, terms)).map((entry) => entry.id));
  return PRODUCTS.filter((product) => hits.has(product.id));
}
