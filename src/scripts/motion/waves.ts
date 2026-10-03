import { gsap } from 'gsap';

/** Cada onda "assenta" alguns pixels enquanto entra: sem deformação contínua. */
export function initWaves() {
  document.querySelectorAll<HTMLElement>('main .wave, footer .wave').forEach((wave) => {
    const svg = wave.querySelector('svg');
    if (!svg) return;
    gsap.fromTo(
      svg,
      { yPercent: 8 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: wave, start: 'top bottom', end: 'bottom 60%', scrub: true },
      },
    );
  });
}
