/* ── Page transitions ───────────────────────────────── */
document.addEventListener('click', e => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || link.target) return;
  if (link.pathname === location.pathname && link.search === location.search) return;
  e.preventDefault();
  document.body.classList.add('navigating');
  setTimeout(() => { location.href = href; }, 300);
});

/* ── Hamburger ──────────────────────────────────────── */
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
  document.querySelector('.hamburger').classList.toggle('open');
}

/* ── Nav transparency (hero pages only) ─────────────── */
(function () {
  const nav = document.querySelector('nav');
  const hero = document.querySelector('.hero');
  if (!hero) return;
  nav.classList.add('transparent');
  function update() {
    nav.classList.toggle('transparent', window.scrollY < 60);
  }
  window.addEventListener('scroll', update, { passive: true });
})();


/* ── IntersectionObserver: fade-up with stagger ────── */
(function () {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  // Apply stagger delay to children of .stagger-parent
  document.querySelectorAll('.stagger-parent').forEach(parent => {
    parent.querySelectorAll('.fade-up').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.07}s`;
    });
  });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
})();

/* ── Ripple effect ──────────────────────────────────── */
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-outline, .btn-outline-light');
  if (!btn) return;
  const r = document.createElement('span');
  r.className = 'ripple';
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(r);
  r.addEventListener('animationend', () => r.remove());
});

/* ── Party bio: touch-toggle fallback ──────────────── */
document.querySelectorAll('.party-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('bio-open'));
});
