/* ============================================================
   LUMI TAILS — script.js
============================================================ */

(function () {
  'use strict';

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('header');

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');
  const overlay = document.getElementById('navOverlay');
  const menuStateClasses = ['open', 'is-open', 'active', 'show', 'menu-open', 'nav-open'];
  const menuElements = [header, burger, nav, overlay].filter(Boolean);

  function isMenuOpen() {
    return nav.classList.contains('open') || nav.classList.contains('is-open');
  }

  function setClosedAriaState() {
    nav.setAttribute('aria-hidden', window.innerWidth <= 820 ? 'true' : 'false');
    overlay.setAttribute('aria-hidden', 'true');
  }

  function resetMenuState() {
    menuElements.forEach(el => {
      el.classList.remove(...menuStateClasses);
      el.style.pointerEvents = '';
      el.style.opacity = '';
      el.style.visibility = '';
    });

    document.body.classList.remove(...menuStateClasses, 'no-scroll');
    document.body.style.overflow = '';

    burger.setAttribute('aria-label', 'Open menu');
    burger.setAttribute('aria-expanded', 'false');
    setClosedAriaState();
  }

  function openMenu() {
    resetMenuState();
    header.classList.add('menu-open');
    burger.classList.add('open', 'is-open');
    nav.classList.add('open', 'is-open');
    overlay.classList.add('show', 'active');
    document.body.classList.add('no-scroll', 'menu-open');

    burger.setAttribute('aria-label', 'Close menu');
    burger.setAttribute('aria-expanded', 'true');
    nav.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    resetMenuState();
  }

  resetMenuState();

  burger.addEventListener('click', () => {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen()) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820 && isMenuOpen()) {
      closeMenu();
    }
  });

  /* Close on nav link click */
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealSelectors = [
    '.reveal',
    '.section-header',
    '.about__img-wrap',
    '.about__text',
    '.photo-strip__item',
    '.card',
    '.feature__img-wrap',
    '.feature__text',
    '.gallery__item',
    '.gallery__caption',
    '.price-card',
    '.atmosphere__content',
    '.cta__content',
    '.cta__form'
  ];
  const revealEls = Array.from(document.querySelectorAll(revealSelectors.join(',')));

  revealEls.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${Math.min((index % 4) * 0.07, 0.21)}s`);
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -56px 0px' }
    );

    revealEls.forEach(el => observer.observe(el));
  } else {
    /* Fallback for older browsers */
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Reservation form ---------- */
  const ctaForm = document.getElementById('ctaForm');
  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = ctaForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = 'Request Sent!';
      btn.disabled = true;
      btn.style.opacity = '0.75';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '';
        ctaForm.reset();
      }, 3000);
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const headerH = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
