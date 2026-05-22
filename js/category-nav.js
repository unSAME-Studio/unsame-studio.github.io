// Category quick-nav — pill row nested inside the navbar.
// On scroll-down the navbar's logo/menu row collapses while this pill row
// stays pinned; the two share one box so they never seam. This script
// handles the reveal, scroll-spy, and smooth-scroll-on-click.
(function () {
  const catNav = document.getElementById('category-nav');
  if (!catNav) return;

  const navbar = document.getElementById('navbar');
  const navContainer = navbar ? navbar.querySelector('.nav-container') : null;
  const hero = document.querySelector('.mixtape-hero');
  const pills = Array.from(catNav.querySelectorAll('.cat-pill'));
  const sections = pills
    .map(pill => document.querySelector(pill.getAttribute('href')))
    .filter(Boolean);

  // The navbar's two rows collapse independently, so cache each row's height
  // while it happens to be expanded — needed to offset clicks correctly.
  let topRowHeight = 0; // logo/menu row
  let pillRowHeight = 0; // category pill row

  function cacheHeights() {
    if (navContainer && navbar && !navbar.classList.contains('hidden')) {
      topRowHeight = navContainer.offsetHeight;
    }
    if (catNav.classList.contains('visible')) {
      pillRowHeight = catNav.offsetHeight;
    }
  }

  // Highlight the pill for whichever category currently sits at the top.
  function updateActivePill() {
    if (!sections.length) return;
    const line = (navbar ? navbar.offsetHeight : 0) + 24;
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
    // Reveal the pill row once the hero has mostly scrolled past.
    catNav.classList.toggle('visible', scrolled > heroBottom - 120);
    cacheHeights();
    updateActivePill();
  }

  // Smooth-scroll to a category. Scrolling DOWN leaves the navbar collapsed
  // to just the pill row; scrolling UP expands it to full height — so offset
  // by whichever height the navbar will actually settle into.
  pills.forEach(pill => {
    pill.addEventListener('click', e => {
      const target = document.querySelector(pill.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      cacheHeights();
      const currentY = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = target.getBoundingClientRect().top + currentY;
      const pillH = pillRowHeight || catNav.offsetHeight;
      const navH =
        targetY > currentY
          ? pillH // scrolling down → navbar collapses to the pill row
          : topRowHeight + pillH; // scrolling up → navbar expands fully
      window.scrollTo({ top: targetY - navH - 16, behavior: 'smooth' });
    });
  });

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();
