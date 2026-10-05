/**
 * Manifesto de imagens: cada SLOT da página aponta para UM arquivo.
 *
 * Quase todos vêm de `src/assets/provisional/` (recortes da Master Reference,
 * sem IA, prefixo `provisional-`). Exceção: o retrato da seção Bruna é um
 * APPROVED_GENERATED_ASSET em `src/assets/founder/` (ver `ASSET_STATUS`). Para trocar por um asset real:
 *
 *   1. coloque o arquivo na pasta do slot (coluna `folder` em ASSET_SLOTS);
 *   2. troque APENAS o `import` correspondente aqui;
 *   3. ajuste `alt` em src/pages/index.astro se o conteúdo mudar;
 *   4. apague o `provisional-*` que ficou sem uso e rode `npm run check:content`.
 *
 * As proporções que o layout espera estão em ASSET_SLOTS (`ratio`). Com fotos
 * reais, use `<Picture formats={['avif','webp']}>` (≈20% menor que o WebP).
 */
import heroBg from '../assets/provisional/provisional-hero-bg.webp';
import heroBase from '../assets/provisional/provisional-hero-base.webp';
import manifestoBase from '../assets/provisional/provisional-manifesto-base.webp';
import manifestoStrip from '../assets/provisional/provisional-manifesto-strip.webp';
import manifestoMaos from '../assets/provisional/provisional-media-manifesto-maos.webp';
import manifestoMaosM from '../assets/provisional/provisional-media-manifesto-maos-m.webp';
import manifestoBrigadeiros from '../assets/provisional/provisional-media-manifesto-brigadeiros.webp';
import manifestoChocolate from '../assets/provisional/provisional-media-manifesto-chocolate.webp';
import brunaRetrato from '../assets/founder/bruna-about-approved.webp';
import assinatura from '../assets/provisional/provisional-assinatura-bruna.png';
import criacoesBase from '../assets/provisional/provisional-criacoes-base.webp';
import criacoesStrip from '../assets/provisional/provisional-criacoes-strip.webp';
import criacoesBolo from '../assets/provisional/provisional-media-criacoes-bolo.webp';
import criacoesBoloM from '../assets/provisional/provisional-media-criacoes-bolo-m.webp';
import criacoesBrigadeiros from '../assets/provisional/provisional-media-criacoes-brigadeiros.webp';
import criacoesFatia from '../assets/provisional/provisional-media-criacoes-fatia.webp';
import criacoesCheesecake from '../assets/provisional/provisional-media-criacoes-cheesecake.webp';
import jornadaCaderno from '../assets/provisional/provisional-media-jornada-caderno.webp';
import jornadaCadernoM from '../assets/provisional/provisional-media-jornada-caderno-m.webp';
import jornadaMorango from '../assets/provisional/provisional-media-jornada-morango.webp';
import jornadaMesa from '../assets/provisional/provisional-media-jornada-mesa.webp';
import jornadaMesaM from '../assets/provisional/provisional-media-jornada-mesa-m.webp';
import historiasMesa from '../assets/provisional/provisional-historias-mesa.webp';
import historiasFatia from '../assets/provisional/provisional-media-historias-fatia.webp';
import bastidoresConfeitando from '../assets/provisional/provisional-bastidores-confeitando.webp';
import bastidoresPeneira from '../assets/provisional/provisional-media-bastidores-peneira.webp';
import bastidoresLaco from '../assets/provisional/provisional-media-bastidores-laco.webp';
import ctaCelebracao from '../assets/provisional/provisional-cta-celebracao.webp';
import florLinha from '../assets/provisional/provisional-flor-linha.png';
import logoLockup from '../assets/provisional/provisional-logo-lockup.png';
import logoWordmarkLight from '../assets/provisional/provisional-logo-wordmark-light.png';
import logoWordmarkDark from '../assets/provisional/provisional-logo-wordmark-dark.png';
import seloFlor from '../assets/provisional/provisional-selo-flor.png';

export const IMAGES = {
  heroBg, heroBase,
  manifestoBase, manifestoStrip, manifestoMaos, manifestoMaosM, manifestoBrigadeiros, manifestoChocolate,
  brunaRetrato, assinatura,
  criacoesBase, criacoesStrip, criacoesBolo, criacoesBoloM, criacoesBrigadeiros, criacoesFatia, criacoesCheesecake,
  jornadaCaderno, jornadaCadernoM, jornadaMorango, jornadaMesa, jornadaMesaM,
  historiasMesa, historiasFatia,
  bastidoresConfeitando, bastidoresPeneira, bastidoresLaco,
  ctaCelebracao,
  florLinha, logoLockup, logoWordmarkLight, logoWordmarkDark, seloFlor,
} as const;

/** Pasta de destino dos assets reais (convenção; só é criada quando o primeiro arquivo chegar). */
export type AssetFolder = 'brand' | 'founder' | 'products' | 'process' | 'social-proof';

/**
 * Estado de um asset:
 *   VERIFIED_REAL            foto/arquivo real, autorizado
 *   APPROVED_GENERATED_ASSET imagem gerada e aprovada visualmente para o slot; NÃO é documental
 *                            nem conta como asset real para o gate de produção
 *   PROVISIONAL              recorte da Master (prefixo provisional-)
 */
export type AssetStatus = 'VERIFIED_REAL' | 'APPROVED_GENERATED_ASSET' | 'PROVISIONAL';

export interface AssetSlot {
  /** Imagens (chaves de IMAGES) que este slot usa. */
  slots: Array<keyof typeof IMAGES>;
  folder: AssetFolder;
  /** O que a foto/arquivo real precisa mostrar. */
  real: string;
  /** Proporção/tamanho que o layout espera (px em 1440). */
  ratio: string;
  /** Só nos slots que já têm um estado diferente de PROVISIONAL. */
  status?: AssetStatus;
  description?: string;
  futureReplacement?: string;
}

export const ASSET_SLOTS: AssetSlot[] = [
  { slots: ['heroBg', 'heroBase'], folder: 'products', real: 'Foto de produto-estrela (bolo de chocolate sobre pedestal, flores, tecido), fundo escuro à esquerda para o texto', ratio: 'hero-bg 800×800; hero-base 700×192 (tecido/tigela, desktop)' },
  { slots: ['manifestoMaos', 'manifestoMaosM', 'manifestoBrigadeiros', 'manifestoChocolate', 'manifestoBase', 'manifestoStrip'], folder: 'process', real: 'Mãos confeitando, brigadeiros em prato, chocolate e cacau; tecido/cerâmica decorativos', ratio: '703×460 (+ variante mobile 549×390), 377×338, 313×411' },
  {
    slots: ['brunaRetrato'],
    folder: 'founder',
    real: 'Retrato REAL da Bruna no ateliê (vertical, rosto à direita, esquerda limpa)',
    ratio: 'retrato 1122×1402 (≈ 4:5; box de 821×1016 no desktop)',
    status: 'APPROVED_GENERATED_ASSET',
    description: 'Imagem aprovada para a seção Sobre a Bruna (src/assets/founder/bruna-about-approved.webp). Gerada para a direção artística do site; não é fotografia documental da Bruna.',
    futureReplacement: 'Pode ser substituída por fotografia profissional real da Bruna, se disponível (aí passa a VERIFIED_REAL, com autorização).',
  },
  { slots: ['assinatura'], folder: 'founder', real: 'Assinatura em arquivo (PNG/SVG transparente)', ratio: 'assinatura 456×140' },
  { slots: ['criacoesBolo', 'criacoesBoloM', 'criacoesBrigadeiros', 'criacoesFatia', 'criacoesCheesecake', 'criacoesBase', 'criacoesStrip'], folder: 'products', real: 'Fotos reais do portfólio: bolo, brigadeiros, fatia, cheesecake', ratio: '751×540 (+ mobile 751×430), 463×309, 156×398 (≥ 312px recomendado), 345×365' },
  { slots: ['jornadaCaderno', 'jornadaCadernoM', 'jornadaMorango', 'jornadaMesa', 'jornadaMesaM'], folder: 'process', real: 'Briefing/caderno de ideias; mão finalizando bolo; bolo na mesa posta', ratio: '487×409 (+ mobile 400×340), 262×418, 631×247 (+ mobile 420×219)' },
  { slots: ['historiasMesa', 'historiasFatia'], folder: 'social-proof', real: 'Foto de celebração AUTORIZADA (clientes/mesa) e fatia de bolo', ratio: '780×940 (sem inset gravado), 286×355' },
  { slots: ['bastidoresConfeitando', 'bastidoresPeneira', 'bastidoresLaco'], folder: 'process', real: 'Fotos reais de processo: confeitar, peneirar cacau, embalar com laço', ratio: '760×670, 345×341, 504×352' },
  { slots: ['ctaCelebracao'], folder: 'products', real: 'Cena de celebração com embalagem real e velas', ratio: '780×520' },
  { slots: ['logoWordmarkLight', 'logoWordmarkDark', 'logoLockup', 'seloFlor', 'florLinha'], folder: 'brand', real: 'Logo oficial (wordmark claro/escuro, lockup, flor) em SVG ou PNG transparente', ratio: 'wordmark 276×86; lockup 220×152; flor 88×88 e 148×180' },
];
