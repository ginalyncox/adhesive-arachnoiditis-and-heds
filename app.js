(function () {
  // ===== Theme toggle =====
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  const sun = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const moon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  let mode = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', mode);
  if (toggle) {
    toggle.innerHTML = mode === 'dark' ? sun : moon;
    toggle.setAttribute('aria-label', 'Switch to ' + (mode === 'dark' ? 'light' : 'dark') + ' mode');
    toggle.addEventListener('click', function () {
      mode = mode === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', mode);
      toggle.innerHTML = mode === 'dark' ? sun : moon;
      toggle.setAttribute('aria-label', 'Switch to ' + (mode === 'dark' ? 'light' : 'dark') + ' mode');
    });
  }

  // ===== Active section highlight =====
  const navLinks = Array.from(document.querySelectorAll('.site-header nav a'));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = '#' + e.target.id;
            navLinks.forEach((a) => {
              if (a.getAttribute('href') === id) {
                a.style.color = 'var(--color-primary)';
                a.style.borderBottomColor = 'var(--color-primary)';
              } else {
                a.style.color = '';
                a.style.borderBottomColor = '';
              }
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
  }

  // ===== Reveal-on-scroll =====
  const reveal = document.querySelectorAll('.section, .cohort, .manifest, .practical, .stat-grid li, .pathway li, .evidence-scale__row');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveal.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)';
    });
    const revealObs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            o.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    reveal.forEach((el) => revealObs.observe(el));
  }
})();
