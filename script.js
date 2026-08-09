/* =========================================================
   Heinz Pretorius — Portfolio
   Vanilla JS. No dependencies, no build step.

   1. Theme toggle       night ⇄ archive, saved to localStorage
   2. Mobile menu
   3. Sticky nav + reading-progress blade
   4. Active nav link
   5. Typed rotating line   <-- EDIT THE `ROLES` ARRAY
   6. Hero parallax (titan drifts as you scroll)
   7. Scroll reveal
   8. Footer year
   ========================================================= */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. THEME TOGGLE ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');

  // Priority: saved choice > OS preference > night
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) { /* private mode */ }

  if (saved === 'night' || saved === 'archive') {
    root.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.setAttribute('data-theme', 'archive');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'night' ? 'archive' : 'night';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- 2. MOBILE MENU ---------- */
  var burger = document.getElementById('navBurger');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- 3. STICKY NAV + PROGRESS ---------- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');
  var titan = document.getElementById('heroTitan');
  var ticking = false;

  function onScrollFrame() {
    var y = window.scrollY;

    if (nav) nav.classList.toggle('is-stuck', y > 20);

    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }

    /* ---------- 6. HERO PARALLAX ---------- */
    // Titan sinks slightly slower than the page, so it feels far away.
    if (titan && !reduceMotion && y < window.innerHeight) {
      titan.style.transform = 'translateX(-50%) translateY(' + (y * 0.22) + 'px)';
    }

    ticking = false;
  }

  function requestScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScrollFrame);
    }
  }

  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll, { passive: true });
  onScrollFrame();

  /* ---------- 4. ACTIVE NAV LINK ---------- */
  var linkFor = {};
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    linkFor[a.getAttribute('href').slice(1)] = a;
  });

  if ('IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link || !entry.isIntersecting) return;
        Object.keys(linkFor).forEach(function (k) { linkFor[k].classList.remove('is-active'); });
        link.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main section[id]').forEach(function (s) {
      navObserver.observe(s);
    });
  }

  /* ---------- 5. TYPED ROTATING LINE ---------- */
  /* EDIT: add, remove or reword these freely. */
  var ROLES = [
    'Junior Software Developer',
    'Full-Stack · Python & React',
    'Game Engineer · C# / MonoGame',
    'Azure Certified · AZ-204'
  ];

  var typedEl = document.getElementById('typed');

  if (typedEl) {
    if (reduceMotion) {
      typedEl.textContent = ROLES[0];
    } else {
      var roleIdx = 0, charIdx = 0, deleting = false;
      var TYPE_MS = 62, DELETE_MS = 28, HOLD_MS = 1800;

      (function tick() {
        var word = ROLES[roleIdx];
        charIdx += deleting ? -1 : 1;
        typedEl.textContent = word.slice(0, charIdx);

        var delay = deleting ? DELETE_MS : TYPE_MS;

        if (!deleting && charIdx === word.length) {
          deleting = true;
          delay = HOLD_MS;
        } else if (deleting && charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % ROLES.length;
          delay = 340;
        }

        setTimeout(tick, delay);
      })();
    }
  }

  /* ---------- 7. SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // animate once only
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- 8. FOOTER YEAR ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
