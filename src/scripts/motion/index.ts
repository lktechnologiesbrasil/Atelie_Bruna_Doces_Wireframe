/**
 * Sistema de motion (Etapa 6B). GSAP + ScrollTrigger, sem scroll hijacking.
 *
 * Aprimoramento progressivo: os estados iniciais ficam em CSS atrás de
 * `html.motion-ready`, classe que um script inline do <head> só coloca quando
 * não há `prefers-reduced-motion: reduce`. Se este módulo não subir a tempo,
 * o mesmo script remove a classe e o conteúdo aparece como está.
 *
 *   hero.ts      entrada do Hero + escala cinematográfica da foto
 *   reveals.ts   títulos por linha, eyebrows, textos, fotos (clip-path), CTAs
 *   journey.ts   linha orgânica desenhada pelo scroll + passos 01/02/03
 *   parallax.ts  profundidade pontual (só desktop)
 *   waves.ts     assentamento sutil das ondas (só desktop)
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHero } from './hero';
import { initReveals } from './reveals';
import { initJourney } from './journey';
import { initParallax } from './parallax';
import { initWaves } from './waves';

const root = document.documentElement;

/** Tudo o que o motion mexe via estilo inline (para devolver a página ao estado estático). */
const ANIMATED = [
  '.line__in', '.hero__photo', '.hero__photo img', '.hero__lead', '.hero__inner .btn', '.hero__seal',
  'main .eyebrow', '.eyebrow__line', 'main .split__body', 'main .split__cta', '.cta-actions > *',
  'main .media', 'main .media img', 'main .media2 img', 'main .quote', '.step__num', '.step__title',
  '.step__text .t1', '.step__flower', '.journey__line path', 'main .wave svg', 'footer .wave svg',
  '.historias__inset',
].join(',');

// o script do <head> desistiu (JS lento) ou há redução de movimento: nada a animar
if (root.classList.contains('motion-ready')) {
  gsap.registerPlugin(ScrollTrigger);
  // a barra de endereço do mobile não pode disparar recálculos a cada scroll
  ScrollTrigger.config({ ignoreMobileResize: true });
  root.classList.add('motion-live');
  // leitura para o QA (tools/qa-motion.mjs): quantos gatilhos estão ativos agora
  (window as unknown as { __motion: { triggers: () => number; all: () => unknown[]; gsap: typeof gsap } }).__motion = {
    gsap,
    triggers: () => ScrollTrigger.getAll().length,
    all: () => ScrollTrigger.getAll().map((t) => ({ trigger: (t.trigger as HTMLElement | null)?.className, once: !!t.vars.once, progress: Number(t.progress.toFixed(2)), start: Math.round(t.start), end: Math.round(t.end) })),
  };

  const mm = gsap.matchMedia();
  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 900px)',
    },
    (context) => {
      const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
      if (!motion) return;

      initHero(desktop);
      initReveals(desktop);
      initJourney();
      if (desktop) {
        initParallax();
        initWaves();
      }
    },
  );

  // preferência alterada com a página aberta: mostra tudo, desfaz as animações e limpa os estilos inline
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (event) => {
    if (!event.matches) return;
    root.classList.remove('motion-ready');
    mm.revert();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    gsap.set(ANIMATED, { clearProps: 'all' });
  });

  // fontes e imagens mudam medidas: recalcula uma vez quando assentarem
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener('load', refresh, { once: true });
}
