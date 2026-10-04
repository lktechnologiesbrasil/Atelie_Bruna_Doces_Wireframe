import { gsap } from 'gsap';
import { splitLines } from './split';

/** Marca o que já foi revelado: um novo ciclo (resize atravessando o breakpoint) não repete a animação. */
const DONE = 'data-revealed';

/**
 * Revelações de uma vez só. Em vez de um ScrollTrigger por elemento (dezenas de
 * gatilhos e timelines criados no carregamento), um IntersectionObserver por
 * margem cria a animação apenas quando o elemento chega: o mesmo limiar visual
 * ("top X%" vira rootMargin inferior), sem custo de scroll e sem trabalho antecipado.
 */
function whenVisible(
  targets: Iterable<HTMLElement>,
  bottomMargin: number,
  play: (el: HTMLElement, index: number) => void,
  observers: IntersectionObserver[],
) {
  const items = [...targets].filter((el) => !el.hasAttribute(DONE));
  if (!items.length) return;
  const order = new Map(items.map((el, index) => [el, index]));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        el.setAttribute(DONE, '');
        play(el, order.get(el) ?? 0);
      });
    },
    { rootMargin: `0px 0px -${bottomMargin}% 0px` },
  );
  items.forEach((el) => io.observe(el));
  observers.push(io);
}

/** Devolve a função de limpeza (desconecta os observadores) para o gsap.matchMedia. */
export function initReveals(desktop: boolean): () => void {
  const observers: IntersectionObserver[] = [];

  // ----- títulos: uma linha por vez (o do Hero fica em hero.ts) -----
  const headings = [...document.querySelectorAll<HTMLElement>('main .h2')];
  const cinema = headings.filter((h) => h.classList.contains('h2--cta'));
  const regular = headings.filter((h) => !h.classList.contains('h2--cta'));
  whenVisible(regular, 14, (heading) => {
    gsap.to(splitLines(heading), { yPercent: 0, duration: 1.05, stagger: 0.11, ease: 'power3.out' });
  }, observers);
  whenVisible(cinema, 22, (heading) => {
    gsap.to(splitLines(heading), { yPercent: 0, duration: 1.6, stagger: 0.22, ease: 'power4.out' });
  }, observers);

  // ----- eyebrows: o fio se desenha e o texto aparece -----
  whenVisible(document.querySelectorAll<HTMLElement>('main .eyebrow'), 10, (eyebrow) => {
    const tl = gsap.timeline();
    tl.to(eyebrow, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 0);
    const rule = eyebrow.querySelector('.eyebrow__line');
    if (rule) tl.to(rule, { scaleX: 1, duration: 1, ease: 'power3.out' }, 0);
  }, observers);

  // ----- textos corridos: só opacidade (sem "fade-up" genérico) -----
  whenVisible(document.querySelectorAll<HTMLElement>('main .split__body'), 12, (body) => {
    gsap.to(body, { opacity: 1, duration: 1.2, ease: 'power2.out' });
  }, observers);

  // ----- fotos: a imagem "revela" dentro da moldura (clip-path + escala mínima) -----
  const frames = [...document.querySelectorAll<HTMLElement>('main .media')].filter(
    // trilho horizontal do mobile (Criações): itens fora da tela não têm gatilho vertical
    (frame) => desktop || !frame.closest('.collage--criacoes'),
  );
  whenVisible(frames, 12, (frame) => {
    const img = frame.querySelector<HTMLElement>('img');
    if (!img) return;
    gsap.set(img, { scale: 1.12 });
    gsap.timeline()
      .to(img, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power3.inOut' }, 0)
      .to(img, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0);
  }, observers);

  // ----- depoimentos (no mobile são um trilho: ficam como estão) -----
  if (desktop) {
    whenVisible(document.querySelectorAll<HTMLElement>('main .quote'), 10, (quote, index) => {
      gsap.to(quote, { opacity: 1, duration: 1.1, delay: index * 0.08, ease: 'power2.out' });
    }, observers);
  }

  // ----- CTAs: entram depois do texto da própria seção -----
  whenVisible(document.querySelectorAll<HTMLElement>('main .split__cta'), 6, (cta) => {
    gsap.to(cta, { opacity: 1, duration: 1, ease: 'power2.out' });
  }, observers);

  const actions = document.querySelector<HTMLElement>('.cta-actions');
  if (actions) {
    whenVisible([actions], 8, () => {
      gsap.to(actions.children, { opacity: 1, duration: 1, stagger: 0.16, delay: 0.55, ease: 'power2.out' }); // depois do "o seu momento."
    }, observers);
  }

  return () => observers.forEach((io) => io.disconnect());
}
