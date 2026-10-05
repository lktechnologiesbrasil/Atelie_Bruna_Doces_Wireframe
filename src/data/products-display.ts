/**
 * Nomes de APRESENTAÇÃO dos produtos. O snapshot (src/data/products.ts) mantém os nomes
 * exatamente como o Yooga os publica; aqui ficam só as correções que uma regra automática
 * não resolve (grafia, acento, marca). A regra geral (src/lib/catalog.ts) já cuida de espaços,
 * emojis, "- " inicial, CAIXA ALTA e primeira letra.
 *
 * Chave = `sourceProductId`. Nada aqui altera preço, descrição ou o dado de origem.
 */
export const PRODUCT_DISPLAY_NAMES: Record<number, string> = {
  6255243: 'Coxinha de frango + Coca-Cola lata zero + Coxinha belga', // "COXINHA DE FRANGO+ COCA LATA zero  + COXINHA BELGA"
  5829904: 'Enroladinho de salsicha', // "Enrroladinho de salchicha"
  8819556: 'Fatia Matilda', // "Fatia matilda"
  7876302: 'Copo Ferrero', // "Copo ferrero"
  5937243: 'Supremo maracujá', // "Supremo maracuja✨"
  7498098: 'Combo Família 10 geladinhos', // "COMBO FAMILIA  10 GELADINHOS "
  7734662: 'Açaí 350 ml', // "Açai 350ml "
  3443838: 'Coca-Cola 200 ml', // "Coca cola 200ml"
  5776526: 'Coca-Cola lata 350 ml', // "Coca LATA" (descrição: "lata 350ml")
  5997251: 'Coca-Cola Zero 350 ml', // "Coca Zero 350ml"
  7986915: 'Bolo de cenoura tamanho família', // "Bolo de cenoura " (na categoria TAMANHO FAMILIA)
};

/** Nomes de categoria (por `id` do snapshot) que a regra geral não resolve. */
export const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  'cat-442641': 'Atenção', // "ATENÇÂO🔴"
  'cat-923026': 'Tamanho família', // "TAMANHO FAMILIA"
};
