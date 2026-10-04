import { BRAND, SEO } from '../data/site';

interface SeoInput {
  /** Título da página (padrão: SEO.title). */
  title?: string;
  /** Descrição da página (padrão: SEO.description, hoje pendente → nenhuma tag). */
  description?: string | null;
  /** Caminho da página, para canonical/og:url. */
  path?: string;
  /** `Astro.site`: vem de SITE_URL (astro.config.mjs). */
  site?: URL;
}

export interface ResolvedSeo {
  title: string;
  description: string | null;
  robots: string;
  canonical: string | null;
  ogImage: string | null;
  favicon: string;
  siteUrl: string | null;
  og: Record<string, string>;
  twitter: Record<string, string>;
}

/**
 * Tudo o que vai no <head> de SEO, a partir do contrato em src/data/site.ts.
 * Nada é inventado: sem URL final não há canonical/og:url/og:image; sem descrição
 * aprovada não há meta description. Enquanto `SEO.allowIndexing` for false a página
 * sai com `noindex, nofollow`.
 */
export function resolveSeo({ title = SEO.title, description, path = '/', site }: SeoInput = {}): ResolvedSeo {
  const siteUrl = site?.toString() ?? SEO.siteUrl;
  const absolute = (value: string) => (siteUrl ? new URL(value, siteUrl).toString() : null);

  const desc = description ?? SEO.description;
  const canonical = absolute(path);
  const ogImage = SEO.ogImage ? absolute(SEO.ogImage) : null;

  const og: Record<string, string> = {
    'og:type': 'website',
    'og:site_name': SEO.siteName,
    'og:locale': BRAND.locale.replace('-', '_'),
    'og:title': title,
  };
  if (desc) og['og:description'] = desc;
  if (canonical) og['og:url'] = canonical;
  if (ogImage) og['og:image'] = ogImage;

  const twitter: Record<string, string> = {
    'twitter:card': ogImage ? 'summary_large_image' : 'summary',
    'twitter:title': title,
  };
  if (desc) twitter['twitter:description'] = desc;
  if (ogImage) twitter['twitter:image'] = ogImage;
  if (SEO.twitterHandle) twitter['twitter:site'] = SEO.twitterHandle;

  return {
    title,
    description: desc,
    robots: SEO.allowIndexing ? 'index, follow' : 'noindex, nofollow',
    canonical,
    ogImage,
    favicon: SEO.favicon ?? 'data:,',
    siteUrl,
    og,
    twitter,
  };
}
