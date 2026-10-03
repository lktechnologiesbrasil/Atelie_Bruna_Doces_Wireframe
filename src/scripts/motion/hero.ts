import { gsap } from 'gsap';
import { splitLines } from './split';

/** Entrada do Hero (títulos por linha, texto, CTA, foto, selo) e escala da foto ligada ao scroll. */
export function initHero(desktop: boolean) {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;

  const title = hero.querySelector('.h1');
  const lead = hero.querySelector('.hero__lead');
  const cta = hero.querySelector('.hero__inner .btn');
  const photo = hero.querySelector<HTMLElement>('.hero__photo');
  const photoImg = hero.querySelector<HTMLElement>('.hero__photo img');
  const seal = hero.querySelector('.hero__seal');
  const lines = title ? splitLines(title) : [];

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 });
  if (photo) tl.fromTo(photo, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 2, ease: 'power2.out', clearProps: 'scale' }, 0);
  if (lines.length) tl.to(lines, { yPercent: 0, duration: 1.15, stagger: 0.13 }, 0.15);
  if (lead) tl.fromTo(lead, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1 }, 0.75);
  if (cta) tl.fromTo(cta, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9 }, 0.95);
  if (seal) tl.fromTo(seal, { opacity: 0, rotate: -8 }, { opacity: 1, rotate: 0, duration: 1.4, ease: 'power2.out' }, 1.1);

  // escala lenta da foto enquanto o Hero sai de cena (só desktop: no mobile poupa bateria)
  if (desktop && photoImg) {
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
}
