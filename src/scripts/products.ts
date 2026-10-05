/**
 * /produtos no cliente: busca, trilho de categorias e entrada dos cards.
 *
 * Tudo age sobre o HTML já renderizado no build (54 produtos, `li[data-search]` com o texto
 * normalizado): sem JS a página é o catálogo completo e as categorias são âncoras comuns.
 * Só a normalização da busca vem de src/lib/search.ts; os dados do catálogo NÃO entram no bundle.
 */
import { matchesTerms, searchTerms } from '../lib/search';

const root = document.querySelector<HTMLElement>('.products-page');

if (root) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  const wrap = root.querySelector<HTMLElement>('[data-search-wrap]');
  const form = root.querySelector<HTMLFormElement>('[data-search-form]');
  const input = root.querySelector<HTMLInputElement>('[data-search-input]');
  const status = root.querySelector<HTMLElement>('[data-results]');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  const resetBtn = root.querySelector<HTMLButtonElement>('[data-reset]');
  const items = [...root.querySelectorAll<HTMLElement>('li[data-search]')];
  const groups = [...root.querySelectorAll<HTMLElement>('[data-group]')];
  const list = root.querySelector<HTMLElement>('[data-rail]');
  const railLinks = [...root.querySelectorAll<HTMLAnchorElement>('[data-rail-link]')];

  let searching = false;

  // ----- trilho de categorias: item atual -----
  const setCurrent = (key: string) => {
    railLinks.forEach((link) => {
      if (link.dataset.railLink === key) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    const active = railLinks.find((link) => link.dataset.railLink === key);
    if (active && list && list.scrollWidth > list.clientWidth) {
      // centraliza o item no trilho sem rolar a página
      list.scrollTo({ left: active.offsetLeft - (list.clientWidth - active.offsetWidth) / 2, behavior: reduced.matches ? 'auto' : 'smooth' });
    }
  };

  // ----- entrada dos cards: um observador só, transição CSS (sem GSAP por card) -----
  const reveal = (card: Element) => card.classList.add('is-in');
  let io: IntersectionObserver | null = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io?.unobserve(entry.target);
          reveal(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    groups.forEach((group) => {
      group.querySelectorAll<HTMLElement>('.pcard').forEach((card, index) => {
        card.style.transitionDelay = `${Math.min(index, 5) * 70}ms`; // stagger curto, por grupo
        io!.observe(card);
      });
    });
  } else {
    root.querySelectorAll('.pcard').forEach(reveal);
  }

  // ----- busca -----
  const filter = (query: string) => {
    const terms = searchTerms(query);
    searching = terms.length > 0;
    let visible = 0;
    items.forEach((item) => {
      const match = matchesTerms(item.dataset.search ?? '', terms);
      item.hidden = !match;
      if (match) {
        visible += 1;
        item.querySelector('.pcard')?.classList.add('is-in'); // resultado nunca fica invisível
        (item.querySelector('.pcard') as HTMLElement | null)?.style.removeProperty('transition-delay');
      }
    });
    groups.forEach((group) => {
      group.hidden = !group.querySelector('li:not([hidden])');
    });
    root.toggleAttribute('data-searching', searching);
    if (empty) empty.hidden = !(searching && visible === 0);
    if (status) {
      status.hidden = !searching || visible === 0;
      status.textContent = searching ? `Resultados para “${query.trim()}”: ${visible} ${visible === 1 ? 'criação' : 'criações'}` : '';
    }
    if (searching) railLinks.forEach((link) => link.removeAttribute('aria-current'));
    else setCurrent('all');
  };

  const clearSearch = () => {
    if (input) input.value = '';
    filter('');
  };

  if (wrap && form && input) {
    wrap.hidden = false; // sem JS a busca nem aparece
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      filter(input.value);
      root.querySelector('.pcatalog__body')?.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
    });
    input.addEventListener('input', () => filter(input.value));
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && input.value) clearSearch();
    });
  }

  resetBtn?.addEventListener('click', () => {
    clearSearch();
    input?.focus({ preventScroll: true });
  });

  // ----- categorias: rolam até a seção (âncora); "Todos" volta ao topo do catálogo -----
  railLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (searching) clearSearch(); // as seções precisam estar visíveis para a âncora existir
      setCurrent(link.dataset.railLink ?? 'all');
    });
  });

  // item atual do trilho acompanha a rolagem
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        if (searching) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id && railLinks.some((l) => l.dataset.railLink === entry.target.id)) setCurrent(entry.target.id);
        });
      },
      { rootMargin: '-28% 0px -62% 0px' },
    );
    groups.forEach((group) => group.id && spy.observe(group));
  }
}
