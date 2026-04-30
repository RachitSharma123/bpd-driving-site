/* ── BPD DRIVING SCHOOL — Main JS ── */

// ── NAV: scroll class + mobile drawer ──
const nav     = document.getElementById('nav');
const burger  = document.getElementById('burger');
const drawer  = document.getElementById('drawer');

if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

if (burger && drawer) {
  burger.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    document.body.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', open);
  });

  // Close drawer on link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      document.body.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', false);
    });
  });
}

// ── COUNTER ANIMATION ──
function animateCounter(el, target, duration = 1600) {
  const suffix   = el.dataset.suffix || '';
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const ease     = 1 - Math.pow(1 - progress, 3);
    const value    = Math.round(target * ease * Math.pow(10, decimals)) / Math.pow(10, decimals);
    el.textContent = decimals ? value.toFixed(decimals) + suffix : value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// ── SCROLL REVEAL + COUNTER TRIGGER ──
const revealEls  = document.querySelectorAll('.reveal');
const counterEls = document.querySelectorAll('.counter');

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Scroll reveal
    if (entry.target.classList.contains('reveal')) {
      entry.target.classList.add('visible');
    }

    // Counter
    if (entry.target.classList.contains('counter')) {
      const target = parseFloat(entry.target.dataset.target);
      animateCounter(entry.target, target);
    }

    io.unobserve(entry.target);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => io.observe(el));
counterEls.forEach(el => io.observe(el));

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item    = btn.closest('.faq-item');
    const isOpen  = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Toggle current
    if (!isOpen) item.classList.add('open');
  });
});

// ── ACTIVE NAV LINK ──
(function setActiveNav() {
  const path  = window.location.pathname;
  const links = document.querySelectorAll('.nav-links a, .nav-drawer a');
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    const isHome = (href === '/' || href === 'index.html' || href === './');
    const pathIsHome = (path === '/' || path.endsWith('index.html'));

    if (isHome && pathIsHome) {
      link.classList.add('active');
    } else if (!isHome && href !== '#' && path.includes(href.replace(/^\.\//, '').replace(/\.html$/, ''))) {
      link.classList.add('active');
    }
  });
})();
