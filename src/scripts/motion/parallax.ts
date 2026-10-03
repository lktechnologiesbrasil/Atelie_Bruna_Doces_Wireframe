import { gsap } from 'gsap';

/**
 * Profundidade pontual, só desktop. Fotos de fundo (`media2`) deslizam dentro da
 * própria máscara; algumas molduras das colagens derivam poucos pixels em
 * sentidos opostos; a cena do CTA final faz um zoom-out lento.
 */
export function initParallax() {
  document.querySelectorAll<HTMLElement>('main .media2').forEach((box) => {
    const img = box.querySelector<HTMLElement>('img');
    if (!img) return;
    const cta = box.closest('.section2--cta');
    gsap.fromTo(
      img,
      cta ? { scale: 1.2, yPercent: -4 } : { scale: 1.1, yPercent: -5 },
      {
        scale: cta ? 1.06 : 1.1,
        yPercent: cta ? 4 : 5,
        ease: 'none',
        scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      },
    );
  });

  // [seletor, deslocamento em px]: sinais opostos dão sensação de camadas
  const frames: Array<[string, number]> = [
    ['.collage--manifesto .collage__b', 22],
    ['.collage--manifesto .collage__c', -26],
    ['.collage--criacoes .collage__b', 20],
    ['.collage--criacoes .collage__d', -24],
    ['.trio__a', 18],
    ['.trio__b', -18],
    ['.historias__inset', 20],
  ];
  frames.forEach(([selector, shift]) => {
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) return;
    gsap.fromTo(
      el,
      { y: shift },
      {
        y: -shift,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
      },
    );
  });
}
