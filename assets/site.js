function qs(sel, root = document) { return root.querySelector(sel); }

// Mobile nav toggle
(() => {
  const nav = qs('[data-nav]');
  const btn = qs('[data-menu-btn]');
  const closeBtn = qs('[data-menu-close]');
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

  // X close button inside menu overlay
  if (closeBtn) {
    closeBtn.addEventListener('click', () => setOpen(false));
  }

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

// Social Media Carousel
(() => {
  const carousel = qs('[data-carousel]');
  if (!carousel) return;

  const track = qs('[data-carousel-track]', carousel);
  const prevBtn = qs('[data-carousel-prev]', carousel);
  const nextBtn = qs('[data-carousel-next]', carousel);
  const dotsContainer = qs('[data-carousel-dots]', carousel);
  
  if (!track) return;

  const slides = Array.from(track.children);
  const totalSlides = slides.length;
  let currentIndex = 0;

  // Create dots
  if (dotsContainer && totalSlides > 1) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    const dots = dotsContainer?.querySelectorAll('.carousel-dot');
    dots?.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    updateCarousel();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Event listeners - support both click and touch
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      nextSlide();
    });
    nextBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      nextSlide();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      prevSlide();
    });
    prevBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      prevSlide();
    });
  }

  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Touch/swipe support for mobile
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  });

  // Initialize
  updateCarousel();
})();


