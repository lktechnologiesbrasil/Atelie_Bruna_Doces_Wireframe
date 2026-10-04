// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
// SITE_URL (env) é a URL final: liga canonical, og:url, og:image absoluta e o sitemap.
// Vazio enquanto o site não tem endereço definido (ver docs/production-checklist.md).
export default defineConfig({
  site: process.env.SITE_URL || undefined,
});
