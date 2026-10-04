import { gsap } from 'gsap';

/**
 * Hero: a ENTRADA (foto, linhas do título, texto, CTA, selo) é CSS puro em motion.css,
 * para não depender do JS e não competir com a pintura do LCP. Aqui fica só a escala
 * lenta da foto ligada ao scroll (desktop: no mobile poupa bateria).
 */
export function initHero(desktop: boolean) {
  const hero = document.querySelector<HTMLElement>('.hero');
  const photoImg = hero?.querySelector<HTMLElement>('.hero__photo img');
  if (!hero || !photoImg || !desktop) return;

  gsap.fromTo(
    photoImg,
    { scale: 1 },
    {
      scale: 1.06,
      ease: 'none',
      transformOrigin: '60% 55%',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
    },
  );
}
