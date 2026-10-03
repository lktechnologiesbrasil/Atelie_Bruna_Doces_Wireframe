import { gsap } from 'gsap';
import { splitLines } from './split';

/**
 * Revelações por seção. Cada gatilho toca a animação uma vez e só se desfaz
 * quando ela termina (`once` mataria o tween em curso ao chegar ao fim da página).
 */
export function initReveals(desktop: boolean) {
  // ----- títulos: uma linha por vez (o do Hero fica em hero.ts) -----
  document.querySelectorAll<HTMLElement>('main .h2').forEach((heading) => {
    const cinema = heading.classList.contains('h2--cta');
    const lines = splitLines(heading);
    gsap.to(lines, {
      yPercent: 0,
      duration: cinema ? 1.6 : 1.05,
      stagger: cinema ? 0.22 : 0.11,
      ease: cinema ? 'power4.out' : 'power3.out',
      scrollTrigger: { trigger: heading, start: cinema ? 'top 78%' : 'top 86%' },
      onComplete() {
        this.scrollTrigger?.kill();
      },
    });
  });

  // ----- eyebrows: o fio se desenha e o texto aparece -----
  document.querySelectorAll<HTMLElement>('main .eyebrow').forEach((eyebrow) => {
    const rule = eyebrow.querySelector('.eyebrow__line');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: eyebrow, start: 'top 90%' },
      onComplete: () => tl.scrollTrigger?.kill(),
    });
    tl.to(eyebrow, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 0);
    if (rule) tl.to(rule, { scaleX: 1, duration: 1, ease: 'power3.out' }, 0);
  });

  // ----- textos corridos: só opacidade (sem "fade-up" genérico) -----
  document.querySelectorAll<HTMLElement>('main .split__body').forEach((body) => {
    gsap.to(body, {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: body, start: 'top 88%' },
      onComplete() {
        this.scrollTrigger?.kill();
      },
    });
  });

  // ----- fotos: a imagem "revela" dentro da moldura (clip-path + escala mínima) -----
  document.querySelectorAll<HTMLElement>('main .media').forEach((frame) => {
    const img = frame.querySelector<HTMLElement>('img');
    if (!img) return;
    // trilho horizontal do mobile (Criações): itens fora da tela não têm gatilho vertical
    if (!desktop && frame.closest('.collage--criacoes')) return;

    gsap.set(img, { scale: 1.12 });
    const reveal = gsap.timeline({ paused: true });
    reveal.to(img, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power3.inOut' }, 0);
    reveal.to(img, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0);
    gsap.timeline({
      scrollTrigger: {
        trigger: frame,
        start: 'top 88%',
        onEnter: (self) => {
          reveal.play();
          // a revelação é independente do gatilho; matar fora do laço de refresh do ScrollTrigger
          queueMicrotask(() => self.kill());
        },
      },
    });
  });

  // ----- depoimentos (no mobile são um trilho: ficam como estão) -----
  if (desktop) {
    document.querySelectorAll<HTMLElement>('main .quote').forEach((quote, index) => {
      gsap.to(quote, {
        opacity: 1,
        duration: 1.1,
        delay: index * 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: quote, start: 'top 90%' },
        onComplete() {
          this.scrollTrigger?.kill();
        },
      });
    });
  }

  // ----- CTAs: entram depois do texto da própria seção -----
  document.querySelectorAll<HTMLElement>('main .split__cta').forEach((cta) => {
    gsap.to(cta, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: cta, start: 'top 94%' },
      onComplete() {
        this.scrollTrigger?.kill();
      },
    });
  });

  const actions = document.querySelector<HTMLElement>('.cta-actions');
  if (actions) {
    gsap.to(actions.children, {
      opacity: 1,
      duration: 1,
      stagger: 0.16,
      delay: 0.55, // depois do "o seu momento."
      ease: 'power2.out',
      scrollTrigger: { trigger: actions, start: 'top 92%' },
      onComplete() {
        this.scrollTrigger?.kill();
      },
    });
  }
}
