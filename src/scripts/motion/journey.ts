import { gsap } from 'gsap';

/** Fração do traço já desenhada em que cada passo entra (01 → 02 → 03, qualquer que seja o layout). */
const STEP_AT = [0.02, 0.4, 0.78];

/**
 * Encomendas: a linha orgânica se desenha com o scroll e cada passo entra quando
 * o traço chega a ele. No desktop o passo 03 fica acima do 02 no zigue-zague; amarrar
 * a entrada ao progresso do traço mantém a narrativa 01 → 02 → 03.
 */
export function initJourney() {
  const journey = document.querySelector<HTMLElement>('.journey');
  if (!journey) return;

  // há dois traços (zigue-zague no desktop largo, vertical no tablet/mobile): anima o que está visível
  const path = [...journey.querySelectorAll<SVGPathElement>('.journey__line path')].find(
    (p) => p.ownerSVGElement && getComputedStyle(p.ownerSVGElement).display !== 'none',
  );

  const steps = [...journey.querySelectorAll<HTMLElement>('.step')].map((step) => {
    const num = step.querySelector('.step__num');
    const rest = step.querySelectorAll('.step__title, .step__text .t1');
    const flower = step.querySelector('.step__flower');
    const tl = gsap.timeline({ paused: true });
    if (num) tl.fromTo(num, { opacity: 0, yPercent: 30 }, { opacity: 1, yPercent: 0, duration: 1.2, ease: 'power3.out' }, 0);
    if (rest.length) tl.fromTo(rest, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power2.out' }, 0.25);
    if (flower) tl.fromTo(flower, { opacity: 0, rotate: -12, scale: 0.92 }, { opacity: 1, rotate: 0, scale: 1, duration: 1.5, ease: 'power2.out' }, 0.4);
    return tl;
  });

  const reveal = (progress: number) => {
    steps.forEach((tl, index) => {
      if (progress >= (STEP_AT[index] ?? 1) && !tl.isActive() && tl.progress() === 0) tl.play();
    });
  };

  if (path) {
    gsap.fromTo(
      path,
      { strokeDashoffset: 100 },
      {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: journey,
          start: 'top 72%',
          end: 'bottom 62%',
          scrub: 0.8,
          onUpdate: (self) => reveal(self.progress),
          onRefresh: (self) => reveal(self.progress),
        },
      },
    );
  } else {
    steps.forEach((tl) => tl.play()); // sem traço visível: nada para amarrar
  }
}
