// Category quick-nav — sticky pill bar for the games page.
// Shows once the hero scrolls away, tracks the main navbar's hide/show,
// scroll-spies the category in view, and smooth-scrolls on click.
(function () {
  const catNav = document.getElementById('category-nav');
  if (!catNav) return;

  const navbar = document.getElementById('navbar');
  const hero = document.querySelector('.mixtape-hero');
  const pills = Array.from(catNav.querySelectorAll('.cat-pill'));
  const sections = pills
    .map(pill => document.querySelector(pill.getAttribute('href')))
    .filter(Boolean);

  // Expose the navbar's height so CSS can tuck the bar beneath it.
  function syncNavbarHeight() {
    const h = navbar ? navbar.offsetHeight : 0;
    catNav.style.setProperty('--navbar-height', h + 'px');
  }

  // Highlight the pill for whichever category currently sits at the top.
  function updateActivePill() {
    if (!sections.length) return;
    const line = catNav.offsetHeight + (navbar ? navbar.offsetHeight : 0) + 24;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) current = section;
    }
    pills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('href') === '#' + current.id);
    });
  }

  function onScroll() {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;

    // Reveal the bar only after the hero has mostly scrolled past.
    catNav.classList.toggle('visible', scrolled > heroBottom - 120);
    // Drop below the navbar while it's visible; take the top slot when it hides.
    catNav.classList.toggle(
      'below-navbar',
      !!navbar && !navbar.classList.contains('hidden')
    );
    updateActivePill();
  }

  // Smooth-scroll to a category, offset for both fixed bars.
  pills.forEach(pill => {
    pill.addEventListener('click', e => {
      const target = document.querySelector(pill.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset =
        catNav.offsetHeight + (navbar ? navbar.offsetHeight : 0) + 16;
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  syncNavbarHeight();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    syncNavbarHeight();
    onScroll();
  });
})();
