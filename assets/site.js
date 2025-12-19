function qs(sel, root = document) { return root.querySelector(sel); }

// Mobile nav toggle
(() => {
  const nav = qs('[data-nav]');
  const btn = qs('[data-menu-btn]');
  if (!nav || !btn) return;

  function setOpen(isOpen) {
    nav.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', isOpen);
  }

  btn.addEventListener('click', () => {
    const isOpen = !nav.classList.contains('open');
    setOpen(isOpen);
  });

  // Close on link click (mobile)
  nav.addEventListener('click', (e) => {
    const a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    setOpen(false);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    setOpen(false);
  });
})();

// Progressive enhancement: add current-year to footer
(() => {
  const el = qs('[data-year]');
  if (!el) return;
  el.textContent = String(new Date().getFullYear());
})();


