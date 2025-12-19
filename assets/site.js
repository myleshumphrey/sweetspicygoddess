function qs(sel, root = document) { return root.querySelector(sel); }

// Mobile nav toggle
(() => {
  const nav = qs('[data-nav]');
  const btn = qs('[data-menu-btn]');
  if (!nav || !btn) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
})();

// Progressive enhancement: add current-year to footer
(() => {
  const el = qs('[data-year]');
  if (!el) return;
  el.textContent = String(new Date().getFullYear());
})();


