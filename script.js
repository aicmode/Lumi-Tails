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

  function openMenu() {
    burger.classList.add('open');
    nav.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    burger.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    burger.classList.remove('open');
    nav.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    burger.setAttribute('aria-label', 'Open menu');
  }

  burger.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  /* Close on nav link click */
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');

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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
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
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
