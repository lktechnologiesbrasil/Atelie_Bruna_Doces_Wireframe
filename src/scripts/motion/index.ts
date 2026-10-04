/**
 * Sistema de motion (Etapa 6B). GSAP + ScrollTrigger, sem scroll hijacking.
 *
 * Aprimoramento progressivo: os estados iniciais ficam em CSS atrás de
 * `html.motion-ready`, classe que um script inline do <head> só coloca quando
 * não há `prefers-reduced-motion: reduce`. Se este módulo não subir a tempo,
 * o mesmo script remove a classe e o conteúdo aparece como está.
 *
 *   hero.ts      entrada do Hero + escala cinematográfica da foto
 *   reveals.ts   revelações de uma vez só (IntersectionObserver): títulos por linha, eyebrows, textos, fotos, CTAs
 *   journey.ts   linha orgânica desenhada pelo scroll + passos 01/02/03
 *   parallax.ts  profundidade pontual (só desktop)
 *   waves.ts     assentamento sutil das ondas (só desktop)
 *
 * ScrollTrigger só onde há scrub (escala do Hero, parallax, ondas, traço da jornada);
 * as revelações pontuais usam IntersectionObserver para não criar dezenas de gatilhos.
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
      const stopReveals = initReveals(desktop);
      initJourney();
      if (desktop) {
        initParallax();
        initWaves();
      }
      return stopReveals; // desconecta os observadores quando o contexto é refeito
    },
  );

  // preferência alterada com a página aberta: mostra tudo, desfaz as animações e limpa os estilos inline
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (event) => {
    if (!event.matches) return;
    root.classList.remove('motion-ready');
    mm.revert();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    // as revelações pontuais nascem fora do contexto: pára as que ainda estejam em curso
    gsap.killTweensOf(document.querySelectorAll(ANIMATED));
    gsap.set(ANIMATED, { clearProps: 'all' });
  });

  // fontes e imagens mudam medidas: UM recálculo quando as duas coisas assentarem
  const loaded = document.readyState === 'complete' ? Promise.resolve() : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }));
  Promise.all([document.fonts?.ready, loaded]).then(() => ScrollTrigger.refresh());
}
