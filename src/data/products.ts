/**
 * Catálogo de produtos: SNAPSHOT local, auditado e versionado do cardápio público do Yooga.
 *
 * - Fonte: https://delivery.yooga.app/ateliedocesbruna/tabs/home (resposta de
 *   `v2/stores/ateliedocesbruna/menu`), auditada em 2026-10-05.
 *   Evidência: docs/products-audit.md, docs/products-audit.json e docs/products-audit-raw/.
 * - Não há fetch em runtime: o site não depende do Yooga estar no ar nem de a API mudar.
 *   Para atualizar, refaça a auditoria e substitua o snapshot (preços, nomes e ordem só mudam
 *   a partir da fonte, nunca aqui à mão).
 * - Nada foi inventado, corrigido ou inferido. Nomes e descrições são os publicados
 *   (inclusive grafias como "ATENÇÂO"); `sourceName` guarda a categoria exatamente como
 *   veio. Correções só de apresentação ficarão num futuro `displayName`.
 * - Preços em CENTAVOS (use `formatBRL` em src/lib/catalog.ts).
 * - `availability` é sempre 'unknown': a API não expõe estoque e item esgotado some do menu.
 *   Não trate "listado" como "disponível".
 * - O Menu de Bolos (Google Drive) exige login e NÃO foi auditado: ver CAKES_MENU. Nenhum bolo
 *   por encomenda existe aqui.
 */

export type Availability = 'available' | 'unavailable' | 'unknown';

/**
 * Papel da categoria na futura UI (decisão editorial, não existe no Yooga):
 * food = catálogo gastronômico · drink = bebidas (apresentação compacta) ·
 * utility = serviço/complemento do pedido · gift = presente.
 */
export type CategoryKind = 'food' | 'drink' | 'utility' | 'gift';

export interface ProductOption {
  name: string;
  /** Acréscimo, em centavos. */
  priceCents: number;
}

export interface ProductOptionGroup {
  name: string;
  required: boolean;
  min: number;
  max: number;
  options: ProductOption[];
}

export interface Product {
  /** Id interno estável (`yooga-<id do Yooga>`). */
  id: string;
  name: string;
  slug: string;
  /** Exatamente como publicado (pode ter quebras de linha); null quando não há. */
  description: string | null;
  priceCents: number;
  promotionalPriceCents: number | null;
  /** URL da imagem no CDN do Yooga (≤ 500 px; nenhuma foi baixada); null quando o produto não tem imagem. */
  imageUrl: string | null;
  /** Dimensões reais da imagem (para width/height e evitar salto de layout); null sem imagem. */
  imageSize: { width: number; height: number } | null;
  availability: Availability;
  categoryId: string;
  optionGroups: ProductOptionGroup[];
  source: 'yooga';
  sourceProductId: number;
}

export interface ProductCategory {
  id: string;
  /** Nome para exibir hoje: o publicado, sem espaços sobrando. */
  name: string;
  slug: string;
  /** Nome exatamente como veio do Yooga. */
  sourceName: string;
  /** Ordem do cardápio do Yooga (1 = primeira). */
  order: number;
  kind: CategoryKind;
  products: Product[];
}

export const CATALOG_SNAPSHOT = {
  source: 'yooga',
  sourceUrl: 'https://delivery.yooga.app/ateliedocesbruna/tabs/home',
  auditedAt: '2026-10-05',
} as const;

/**
 * Menu de Bolos (bolos por encomenda): link do Linktree para um arquivo do Google Drive que
 * exige login. Enquanto 'pending', NÃO existe catálogo de bolos aqui e a UI só pode mostrar um
 * bloco "Bolos por encomenda" sem itens inventados. Quando a Bruna enviar o arquivo (ou liberar
 * o link), audite, adicione os itens com `source` próprio e mude o status.
 */
export const CAKES_MENU = {
  status: 'pending' as 'pending' | 'audited',
  reason: 'Google Drive exige login; conteúdo não auditado.',
};

export const CATEGORIES: ProductCategory[] = [
  {
    id: "cat-453111",
    name: "COMBO DO DIA 😍😋",
    slug: "combo-do-dia",
    sourceName: "COMBO DO DIA 😍😋",
    order: 1,
    kind: "food",
    products: [
      {
        id: "yooga-6255243",
        name: "COXINHA DE FRANGO+ COCA LATA zero + COXINHA BELGA",
        slug: "coxinha-de-frango-coca-lata-zero-coxinha-belga",
        description: "combo perfeito.",
        priceCents: 3900,
        promotionalPriceCents: 3700,
        imageUrl: "https://cdn-production.yooga.com.br/c4d63e9233c3a380c81e565741bd12cc.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-453111",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 6255243
      }
    ]
  },
  {
    id: "cat-441882",
    name: "SALGADOS DELICIOSOS 😍",
    slug: "salgados-deliciosos",
    sourceName: "SALGADOS DELICIOSOS  😍",
    order: 2,
    kind: "food",
    products: [
      {
        id: "yooga-3443815",
        name: "Empada de frango",
        slug: "empada-de-frango",
        description: "Massa que derrete na boca,  com frango cremoso desfiado e requeijão.",
        priceCents: 1600,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/d8cca77bd8665514da0eee6f8636e77e.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-441882",
        optionGroups: [
          {
            name: "Adicionais",
            required: false,
            min: 0,
            max: 2,
            options: [
              {
                name: "ketchup",
                priceCents: 10
              },
              {
                name: "Maionese",
                priceCents: 10
              }
            ]
          }
        ],
        source: "yooga",
        sourceProductId: 3443815
      },
      {
        id: "yooga-4397996",
        name: "Coxinha de Costela c/ cream cheese",
        slug: "coxinha-de-costela-c-cream-cheese",
        description: "Coxinha recheada com costela desfiada e cream cheese original.\n",
        priceCents: 1500,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/e050c256b22dc660a252fcc2c347a259.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-441882",
        optionGroups: [
          {
            name: "Adicionais",
            required: false,
            min: 0,
            max: 2,
            options: [
              {
                name: "ketchup",
                priceCents: 10
              },
              {
                name: "Maionese",
                priceCents: 10
              }
            ]
          }
        ],
        source: "yooga",
        sourceProductId: 4397996
      },
      {
        id: "yooga-4441576",
        name: "Coxinha de frango c/ catupiry",
        slug: "coxinha-de-frango-c-catupiry",
        description: "Coxinha de frango com catupiry Original crocante.",
        priceCents: 1500,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/b5352c095d6f4f1aa082ff8a47ad0966.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-441882",
        optionGroups: [
          {
            name: "Adicionais",
            required: false,
            min: 0,
            max: 2,
            options: [
              {
                name: "ketchup",
                priceCents: 10
              },
              {
                name: "Maionese",
                priceCents: 10
              }
            ]
          }
        ],
        source: "yooga",
        sourceProductId: 4441576
      },
      {
        id: "yooga-5829904",
        name: "Enrroladinho de salchicha",
        slug: "enrroladinho-de-salchicha",
        description: "massa crocante, com salchica",
        priceCents: 1200,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/046e14fb4254c7799730336d0115b2d7.jpeg",
        imageSize: {
          width: 281,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-441882",
        optionGroups: [
          {
            name: "Adicionais",
            required: false,
            min: 0,
            max: 2,
            options: [
              {
                name: "ketchup",
                priceCents: 10
              },
              {
                name: "Maionese",
                priceCents: 10
              }
            ]
          }
        ],
        source: "yooga",
        sourceProductId: 5829904
      },
      {
        id: "yooga-7252226",
        name: "Esfiha de carne",
        slug: "esfiha-de-carne",
        description: "Nossa massa bem fofinha, recheada com carne temperada, ideal para o seu lanche da tarde. \n",
        priceCents: 1100,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/716ee9e66ed58e075c56b21f575a2dca.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-441882",
        optionGroups: [
          {
            name: "Adicionais",
            required: false,
            min: 0,
            max: 2,
            options: [
              {
                name: "ketchup",
                priceCents: 10
              },
              {
                name: "Maionese",
                priceCents: 10
              }
            ]
          }
        ],
        source: "yooga",
        sourceProductId: 7252226
      },
      {
        id: "yooga-8632823",
        name: "Esfiha de Frango com Catupiry",
        slug: "esfiha-de-frango-com-catupiry",
        description: "Massa fofinha com recheio de frango desfiado e catupiry.",
        priceCents: 1100,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/768320cad0d2ffac42b74fd45cf252b4.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-441882",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 8632823
      }
    ]
  },
  {
    id: "cat-438417",
    name: "FATIAS",
    slug: "fatias",
    sourceName: "FATIAS",
    order: 3,
    kind: "food",
    products: [
      {
        id: "yooga-3415238",
        name: "Fatia brownie Ninho com Nutella",
        slug: "fatia-brownie-ninho-com-nutella",
        description: "Nosso delicioso brownie coberto com muito creme de ninho e nutella purinha.",
        priceCents: 2100,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/7cfe9730e2dc460884db4d9a70e23d99.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438417",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 3415238
      },
      {
        id: "yooga-5830601",
        name: "Fatia Brownie brigadeiro",
        slug: "fatia-brownie-brigadeiro",
        description: "Nosso delicioso brownie molhadinho, com muito brigadeiro de cacau 50% cremosinho , finalizado com granulado belga.",
        priceCents: 2100,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/9c2f0932b6617fe6b4aba95dabe7ab5d.jpeg",
        imageSize: {
          width: 281,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438417",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 5830601
      }
    ]
  },
  {
    id: "cat-438420",
    name: "COXINHAS DOCES ;)",
    slug: "coxinhas-doces",
    sourceName: "COXINHAS DOCES ;)",
    order: 4,
    kind: "food",
    products: [
      {
        id: "yooga-3415249",
        name: "Coxinha de Ferrero",
        slug: "coxinha-de-ferrero",
        description: "Massa de brigadeiro 50% cacau, morango selecionado envolto de castanha finalizada com\nnutella.",
        priceCents: 1600,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/dd4ce04ca3ea7df0b6057ccd9f9f4db8.jpeg",
        imageSize: {
          width: 300,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438420",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 3415249
      },
      {
        id: "yooga-3415250",
        name: "Coxinha de Ninho com Nutella",
        slug: "coxinha-de-ninho-com-nutella",
        description: "Massa de brigadeiro de ninho, morango selecionado finalizado com Nutella.\n",
        priceCents: 1600,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/d604bf159c3a9a9ec9025b5c4bdfe62a.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438420",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 3415250
      },
      {
        id: "yooga-3415251",
        name: "Coxinha Belga",
        slug: "coxinha-belga",
        description: "Massa de brigadeiro 50% cacau, com morango selecionado envolto com granulado belga 110grs de pura delicia\n",
        priceCents: 1600,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/95b56a584346968f8c80c1d212a64797.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438420",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 3415251
      },
      {
        id: "yooga-5777324",
        name: "brigadeirão belga",
        slug: "brigadeirao-belga",
        description: "brigadeiro cremoso envolto com granulado belga 80gramas",
        priceCents: 1600,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/31a40ce902e5437088212b63cacd0813.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438420",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 5777324
      },
      {
        id: "yooga-8271723",
        name: "Alfajor doce de leite",
        slug: "alfajor-doce-de-leite",
        description: "Aquele doce de leite que vocês amam, + a combinação perfeita do chocolate nobre.\nDerrete na boca. ",
        priceCents: 899,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/ccb4a79a5bd4623c2efbd6b1a8e731d4.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438420",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 8271723
      },
      {
        id: "yooga-8801925",
        name: "Bombom cravejado",
        slug: "bombom-cravejado",
        description: "brigadeiro de ninho, morango selecionado , chocolate nobre branco com lascas de caramelo.",
        priceCents: 1800,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/9e3e0647bdef50168374426bb6519e60.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438420",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 8801925
      }
    ]
  },
  {
    id: "cat-578913",
    name: "FATIAS DE BOLO✨",
    slug: "fatias-de-bolo",
    sourceName: "FATIAS DE BOLO✨",
    order: 5,
    kind: "food",
    products: [
      {
        id: "yooga-4672088",
        name: "Fatia Chocolatuda",
        slug: "fatia-chocolatuda",
        description: "Massa cacau 50% molhadinha, brigadeiro ao leite cremoso finalizada com granulado belga.\n**(Acrescentar calda, para garantr seu bolo matlda))**",
        priceCents: 2400,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/fc2ce19f307250909edaed3f2a9e91a7.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-578913",
        optionGroups: [
          {
            name: "Calda extra (matilda)",
            required: false,
            min: 0,
            max: 5,
            options: [
              {
                name: "Calda EXTRA de chocolate (matilda)",
                priceCents: 400
              }
            ]
          }
        ],
        source: "yooga",
        sourceProductId: 4672088
      },
      {
        id: "yooga-4679019",
        name: "Fatia Maracolate",
        slug: "fatia-maracolate",
        description: "massa cacau 50%, brigadeiro ao leite, brigadeiro de maracujá bem cremosinhooo. \nFatia serve até 2 pessoas.",
        priceCents: 2400,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/aaff3ea46fda622db5b45fced62cd29a.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-578913",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 4679019
      },
      {
        id: "yooga-4679020",
        name: "Fatia DUO com morango",
        slug: "fatia-duo-com-morango",
        description: "Massa de cacau 50% molhadinha, brigadeiro de ninho, brigadeiro ao leite morangos finalizada com belga ",
        priceCents: 2400,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/efa2efedb4347578afd4b8b980d242b1.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-578913",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 4679020
      },
      {
        id: "yooga-4748080",
        name: "Fatia nutelluda",
        slug: "fatia-nutelluda",
        description: "Massa de cacau molhadinha, brigadeiro cremoso de ninho e nutella pura. ",
        priceCents: 2400,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/a3e285b1c01d4a85e6ab66f6874f63ee.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-578913",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 4748080
      },
      {
        id: "yooga-8181132",
        name: "Fatia Limão siciliano c/ frutas vermelhas",
        slug: "fatia-limao-siciliano-c-frutas-vermelhas",
        description: "Massa de baunilha molhadinha, brigadeiro de limão siciliano com geleia de frutas vermelhas\n",
        priceCents: 2400,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/835fa13b2e2b75c672407f808749543d.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-578913",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 8181132
      },
      {
        id: "yooga-8819556",
        name: "Fatia matilda",
        slug: "fatia-matilda",
        description: "Massa de chocolate 50% cacau, com 5 camadas de ganache de chocolate blend, acompanha caldinha.",
        priceCents: 2800,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/4b004c94601bd7d9a4d5fb53a3e92d4b.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-578913",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 8819556
      }
    ]
  },
  {
    id: "cat-746352",
    name: "CASEIRINHOS😍🥰",
    slug: "caseirinhos",
    sourceName: "CASEIRINHOS😍🥰",
    order: 6,
    kind: "food",
    products: [
      {
        id: "yooga-6223177",
        name: "- Caseirinho Ninho com nutella",
        slug: "caseirinho-ninho-com-nutella",
        description: "Massa de chocolate bem molhadinha, nutella e creme de ninho.\n(serve 2 pessoas )",
        priceCents: 2900,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/778df72cf7b3c8a7e48813d36267eac4.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-746352",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 6223177
      },
      {
        id: "yooga-6245599",
        name: "- Caseirinho ninho nutella e morango",
        slug: "caseirinho-ninho-nutella-e-morango",
        description: "Massa de chocolate molhadinha, morango no meio com nutella, coberto com creme de ninho delicioso, finalizado com nutella e morango. (serve 2 pessoas )*",
        priceCents: 3100,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/aec435115a9c8397029ce71069d3cbe0.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-746352",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 6245599
      },
      {
        id: "yooga-6275769",
        name: "- Caseirinho de cenoura com cobertura de chocolate",
        slug: "caseirinho-de-cenoura-com-cobertura-de-chocolate",
        description: "Massa de cenoura, com cobertura de brigadeiro de chocolate finalizado com granulado belga.\nPerfeito para o seu café da tarde .",
        priceCents: 2500,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/00ffa4eed400a7631278a9b64df42d09.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-746352",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 6275769
      },
      {
        id: "yooga-6551804",
        name: "- Caseirinho de brigadeiro",
        slug: "caseirinho-de-brigadeiro",
        description: "Massa de chocolate cacau 50% bem molhadinha, com um delicioso brigadeiro cremoso, finalizado com granulado belga.\n*Serve 2 pessoas",
        priceCents: 2890,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/9fdaacb7877bbc6f05ff30f78ddf2983.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-746352",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 6551804
      }
    ]
  },
  {
    id: "cat-441886",
    name: "EXCLUSIVOS 🍫🍫",
    slug: "exclusivos",
    sourceName: "EXCLUSIVOS 🍫🍫",
    order: 7,
    kind: "food",
    products: [
      {
        id: "yooga-7103479",
        name: "Cheesecake frutas vermelhas",
        slug: "cheesecake-frutas-vermelhas",
        description: "Uma fatia irresistível de cheesecake artesanal, com base de biscoito, recheio cremoso e suave de cream cheese, coberta com uma generosa camada de geleia de frutas vermelhas. Finalizada com morango fresco. ",
        priceCents: 2300,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/d426aa30b60bd3516dc94a3e636ddd11.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-441886",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 7103479
      },
      {
        id: "yooga-7584407",
        name: "Cheesecake maracujá",
        slug: "cheesecake-maracuja",
        description: "Base de bolacha amategada, creme de queijo com maracuja, finalizado com geleia de maracuja.",
        priceCents: 2100,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/efc2190e71af338f16f3f597c12caf5f.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-441886",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 7584407
      }
    ]
  },
  {
    id: "cat-438418",
    name: "DOSES DA FELICIDADE🍫",
    slug: "doses-da-felicidade",
    sourceName: "DOSES DA FELICIDADE🍫",
    order: 8,
    kind: "food",
    products: [
      {
        id: "yooga-3415240",
        name: "Copo Ninho com Morango",
        slug: "copo-ninho-com-morango",
        description: "O copo é composto pelo nosso maravilhoso recheio de ninho, intercalando com mousse de\nninho, brownie molhadinho morangos selecionados.\n",
        priceCents: 2200,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/034f557ecdb934a9ad8bc383a0c331c0.jpeg",
        imageSize: {
          width: 242,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438418",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 3415240
      },
      {
        id: "yooga-3415241",
        name: "Copo Ninho com Nutella",
        slug: "copo-ninho-com-nutella",
        description: "O copo é composto pelo nosso maravilhoso recheio de ninho, intercalando com mousse de\nninho, brownie molhadinho e Nutella pura.\n",
        priceCents: 2200,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/35c7d3ce5d2ed825b59fb3030e269976.jpeg",
        imageSize: {
          width: 299,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438418",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 3415241
      },
      {
        id: "yooga-4579548",
        name: "Torta de limão",
        slug: "torta-de-limao",
        description: "biscoito amanteigado, mousse de limão finalizado com chantininho.",
        priceCents: 1900,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/6743d634f57efb54fd2ee58b47d588c8.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438418",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 4579548
      },
      {
        id: "yooga-5937243",
        name: "Supremo maracuja✨",
        slug: "supremo-maracuja",
        description: "Trufa de maracujá, , brownie denso e molhadinho, creme 4 leites finalizado com chantininho e geleia de maracujá.",
        priceCents: 2000,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/3e148b04514aa477b5d84d0eff8a74bb.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438418",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 5937243
      },
      {
        id: "yooga-7876302",
        name: "Copo ferrero",
        slug: "copo-ferrero",
        description: "Creme de danette, mousse de chocolate, amendoim triturado, brownie denso e molhadinho Nutella e bombom ferrero. ",
        priceCents: 2300,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/22b5009017e15397caeda563495c60eb.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438418",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 7876302
      },
      {
        id: "yooga-8664774",
        name: "Copo DUO com morangos",
        slug: "copo-duo-com-morangos",
        description: "Brigadeiro de ninho cremoso, brigadeiro ao leite, brownie molhado no morangos frescos. Perfeito para o seu dia! ",
        priceCents: 2200,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/0c706e49160695f7e4125f8182adf4f1.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438418",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 8664774
      },
      {
        id: "yooga-8977203",
        name: "Copo Danette com morango",
        slug: "copo-danette-com-morango",
        description: "Creme de danette, mousse de chocolate brownie, morangos frescos.",
        priceCents: 2200,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/5481936d65656e67afe81d9b31ffa454.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438418",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 8977203
      }
    ]
  },
  {
    id: "cat-746329",
    name: "Quentinhos, combinam!",
    slug: "quentinhos-combinam",
    sourceName: "Quentinhos, combinam!",
    order: 9,
    kind: "food",
    products: [
      {
        id: "yooga-6902111",
        name: "Cookie Nutella",
        slug: "cookie-nutella",
        description: "Nosso cookie americano recheado com pedaços de chocolate ao leite e nutella pura . 110gr",
        priceCents: 2100,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/9a2d9239ef7f68bcdbcb413baebd85cb.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-746329",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 6902111
      },
      {
        id: "yooga-8835730",
        name: "Cookie tradicional",
        slug: "cookie-tradicional",
        description: "Cookie tradicional americano com gotas de chocolate nobre ao leite.",
        priceCents: 2000,
        promotionalPriceCents: null,
        imageUrl: null,
        imageSize: null,
        availability: "unknown",
        categoryId: "cat-746329",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 8835730
      }
    ]
  },
  {
    id: "cat-900001",
    name: "🟣AÇAÍ 🍦✨",
    slug: "acai",
    sourceName: "🟣AÇAÍ 🍦✨",
    order: 10,
    kind: "food",
    products: [
      {
        id: "yooga-7734662",
        name: "Açai 350ml",
        slug: "acai-350ml",
        description: "Açai na bandeija, 350 ml puro.",
        priceCents: 1600,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/76666f636dadd1f611093d19e28f2c6c.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-900001",
        optionGroups: [
          {
            name: "Complementos",
            required: true,
            min: 1,
            max: 5,
            options: [
              {
                name: "Creme de ninho",
                priceCents: 450
              },
              {
                name: "Nutella pura",
                priceCents: 800
              },
              {
                name: "Morangos selecionados",
                priceCents: 400
              },
              {
                name: "Paçoca",
                priceCents: 400
              },
              {
                name: "Confete",
                priceCents: 400
              },
              {
                name: "Leite ninho (pó)",
                priceCents: 350
              },
              {
                name: "Leite condensado",
                priceCents: 400
              },
              {
                name: "Granola",
                priceCents: 400
              },
              {
                name: "Brownie",
                priceCents: 500
              }
            ]
          }
        ],
        source: "yooga",
        sourceProductId: 7734662
      }
    ]
  },
  {
    id: "cat-865789",
    name: "GELADINHOS / PICOLÉ🍦😍✨",
    slug: "geladinhos-picole",
    sourceName: "GELADINHOS / PICOLÉ🍦😍✨",
    order: 11,
    kind: "food",
    products: [
      {
        id: "yooga-7498098",
        name: "COMBO FAMILIA 10 GELADINHOS",
        slug: "combo-familia-10-geladinhos",
        description: "Sabores sortidos, ou você pode escolher aqui nas observações os sabores desejados.\n",
        priceCents: 12000,
        promotionalPriceCents: 11400,
        imageUrl: "https://cdn-production.yooga.com.br/01a4afef39dc3ef7c64dde16bf092a57.jpeg",
        imageSize: {
          width: 296,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-865789",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 7498098
      },
      {
        id: "yooga-7383565",
        name: "Geladinho Ninho com nutella",
        slug: "geladinho-ninho-com-nutella",
        description: null,
        priceCents: 1200,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/663664731d269890b94fb0a6df8cf2fe.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-865789",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 7383565
      },
      {
        id: "yooga-7383568",
        name: "Geladinho Pudim",
        slug: "geladinho-pudim",
        description: null,
        priceCents: 1200,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/a9b69bb5272d19762cb79847030c4058.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-865789",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 7383568
      },
      {
        id: "yooga-7401609",
        name: "Geladinho Cappuccino",
        slug: "geladinho-cappuccino",
        description: null,
        priceCents: 1200,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/7c878ad4bbc8046c678f2cafaef609e5.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-865789",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 7401609
      },
      {
        id: "yooga-7455768",
        name: "Geladinho Sensação",
        slug: "geladinho-sensacao",
        description: null,
        priceCents: 1200,
        promotionalPriceCents: null,
        imageUrl: null,
        imageSize: null,
        availability: "unknown",
        categoryId: "cat-865789",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 7455768
      }
    ]
  },
  {
    id: "cat-438419",
    name: "BOLOS DE POTE",
    slug: "bolos-de-pote",
    sourceName: "BOLOS DE POTE",
    order: 12,
    kind: "food",
    products: [
      {
        id: "yooga-3415245",
        name: "Bolo de Pote de Prestígio",
        slug: "bolo-de-pote-de-prestigio",
        description: "Massa de chocolate 50% cacau, creme de coco finalizado com o maravilhoso brigadeiro\ncremoso.",
        priceCents: 1600,
        promotionalPriceCents: 1500,
        imageUrl: "https://cdn-production.yooga.com.br/95e66412d883d17112f83f17fbff0c0e.jpeg",
        imageSize: {
          width: 231,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438419",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 3415245
      },
      {
        id: "yooga-3415246",
        name: "Bolo de Pote de Danette",
        slug: "bolo-de-pote-de-danette",
        description: "Massa de chocolate 50% cacau, com camadas brigadeiro cremoso.\n",
        priceCents: 1600,
        promotionalPriceCents: 1490,
        imageUrl: "https://cdn-production.yooga.com.br/fe9871fb7bb9456f472c6dd4750be3fd.jpeg",
        imageSize: {
          width: 281,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438419",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 3415246
      }
    ]
  },
  {
    id: "cat-438421",
    name: "CONE TRUFADO",
    slug: "cone-trufado",
    sourceName: "CONE TRUFADO",
    order: 13,
    kind: "food",
    products: [
      {
        id: "yooga-3415255",
        name: "Cone Trufado de Brigadeiro",
        slug: "cone-trufado-de-brigadeiro",
        description: "Casquinha crocante banhada no chocolate, com um cremoso brigadeiro 50% cacau.\n",
        priceCents: 800,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/c6ab9be564ca018df3270e58253f85ce.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438421",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 3415255
      },
      {
        id: "yooga-3415256",
        name: "Cone Trufado de Maracujá",
        slug: "cone-trufado-de-maracuja",
        description: "Casquinha crocante banhada no chocolate, com o delicioso brigadeiro de maracujá (da fruta).\n",
        priceCents: 800,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/abfc4ee77774ac08206d61c2cf643eee.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-438421",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 3415256
      }
    ]
  },
  {
    id: "cat-923026",
    name: "TAMANHO FAMILIA",
    slug: "tamanho-familia",
    sourceName: "TAMANHO FAMILIA",
    order: 14,
    kind: "food",
    products: [
      {
        id: "yooga-7986915",
        name: "Bolo de cenoura",
        slug: "bolo-de-cenoura",
        description: "bolo de cenoura com cobertura de brigadeiro cremoso, fofinho e perfeito para o lanche da tarde. \nServe 8 a 10 pessoas.",
        priceCents: 7000,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/ed6ba0b566fc694bfc585d4a12c7f94e.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-923026",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 7986915
      }
    ]
  },
  {
    id: "cat-441887",
    name: "BEBIDAS",
    slug: "bebidas",
    sourceName: "BEBIDAS",
    order: 15,
    kind: "drink",
    products: [
      {
        id: "yooga-3443838",
        name: "Coca cola 200ml",
        slug: "coca-cola-200ml",
        description: "Garrafinha",
        priceCents: 500,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/fd04f27360f7f35fff4cec53fa1e8768.jpeg",
        imageSize: {
          width: 500,
          height: 411
        },
        availability: "unknown",
        categoryId: "cat-441887",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 3443838
      },
      {
        id: "yooga-5776524",
        name: "Água",
        slug: "agua",
        description: null,
        priceCents: 500,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/0e8649fd0861e4463c4f6e5afc387279.png",
        imageSize: {
          width: 350,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-441887",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 5776524
      },
      {
        id: "yooga-5776525",
        name: "Água com gás",
        slug: "agua-com-gas",
        description: null,
        priceCents: 500,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/9372752cf0fccbfdd76241376f3c414f.png",
        imageSize: {
          width: 326,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-441887",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 5776525
      },
      {
        id: "yooga-5776526",
        name: "Coca LATA",
        slug: "coca-lata",
        description: "lata 350ml",
        priceCents: 800,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/a23f104ba5cc0f9018d476ff8ecbe655.png",
        imageSize: {
          width: 412,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-441887",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 5776526
      },
      {
        id: "yooga-5997251",
        name: "Coca Zero 350ml",
        slug: "coca-zero-350ml",
        description: "zero",
        priceCents: 800,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/8b6a8170c20c9efea69dc87aba7e0ca0.png",
        imageSize: {
          width: 490,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-441887",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 5997251
      }
    ]
  },
  {
    id: "cat-442641",
    name: "ATENÇÂO🔴",
    slug: "atencao",
    sourceName: "ATENÇÂO🔴",
    order: 16,
    kind: "utility",
    products: [
      {
        id: "yooga-3474953",
        name: "Adicionar garfinho no pedido",
        slug: "adicionar-garfinho-no-pedido",
        description: "*Se precisar de garfinho adicione aqui**",
        priceCents: 1,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/fc8a04bc913c13c2bcb33c92bf614f9a.png",
        imageSize: {
          width: 500,
          height: 351
        },
        availability: "unknown",
        categoryId: "cat-442641",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 3474953
      }
    ]
  },
  {
    id: "cat-773392",
    name: "🥰PRESENTEAR PODE & DEVE!",
    slug: "presentear-pode-e-deve",
    sourceName: "🥰PRESENTEAR PODE & DEVE!",
    order: 17,
    kind: "gift",
    products: [
      {
        id: "yooga-6470540",
        name: "CARTÃO PRESENTE",
        slug: "cartao-presente",
        description: "Você pode escrever sua mensagem na observação e colocar o nome de quem vai receber.",
        priceCents: 200,
        promotionalPriceCents: null,
        imageUrl: "https://cdn-production.yooga.com.br/aebc03fdd58f2a9310e0ccf9a50c01c3.jpeg",
        imageSize: {
          width: 375,
          height: 500
        },
        availability: "unknown",
        categoryId: "cat-773392",
        optionGroups: [],
        source: "yooga",
        sourceProductId: 6470540
      }
    ]
  }
];
