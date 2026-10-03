import { gsap } from 'gsap';

/**
 * Envolve o conteúdo de cada `.line` num interior deslizante; a máscara é o
 * `clip-path` de `.is-split .line` (motion.css), sem impacto de layout. Idempotente.
 */
export function splitLines(heading: Element): HTMLElement[] {
  const inners: HTMLElement[] = [];
  heading.querySelectorAll<HTMLElement>('.line').forEach((line) => {
    let inner = line.querySelector<HTMLElement>(':scope > .line__in');
    if (!inner) {
      inner = document.createElement('span');
      inner.className = 'line__in';
      while (line.firstChild) inner.appendChild(line.firstChild);
      line.appendChild(inner);
    }
    inners.push(inner);
  });
  // limpa resíduos de um ciclo anterior (o GSAP converte yPercent em px ao reverter) antes do estado inicial
  gsap.set(inners, { clearProps: 'transform' });
  gsap.set(inners, { yPercent: 125 });
  heading.classList.add('is-split'); // libera o título (o CSS o escondia até aqui)
  return inners;
}
