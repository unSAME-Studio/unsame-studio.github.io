/* ==========================================================================
   unSAME Studio - Bubble Intro Animation
   Bubbles float up during loading, then pop to reveal page content
   ========================================================================== */

(function () {
  // Brand colors from the site
  const COLORS = [
    '#ff839b', // pink (Home)
    '#ffe500', // yellow (Games)
    '#55c59d', // green (About)
    '#00a2cc', // blue (Press)
    '#fe2c55', // tiktok red
    '#6e97e6', // twitter blue
    '#866ee6', // purple
    '#f29f52', // orange
  ];

  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  // Collect all sections to reveal (in DOM order = top to bottom)
  const revealSections = document.querySelectorAll('.intro-hidden');

  // --- Phase 1: Floating bubbles during load ---
  let floatingBubbles = [];
  let floatInterval = null;
  let pageLoaded = false;

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createFloatingBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'intro-bubble';
    const size = randomBetween(15, 100);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const left = randomBetween(2, 95);
    const duration = randomBetween(2, 5);
    const wobbleDuration = randomBetween(1.5, 4);
    const wobbleAmount = randomBetween(10, 40);
    const delay = randomBetween(0, 0.3);

    bubble.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle at 35% 35%, ${color}dd, ${color}88);
      left: ${left}%;
      bottom: -${size}px;
      animation: bubble-float-up ${duration}s ease-out ${delay}s forwards,
                 bubble-wobble ${wobbleDuration}s ease-in-out infinite;
      --wobble-amount: ${wobbleAmount}px;
      opacity: 0;
    `;

    document.body.appendChild(bubble);
    floatingBubbles.push(bubble);

    // Remove after animation ends
    setTimeout(() => {
      if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
      floatingBubbles = floatingBubbles.filter(b => b !== bubble);
    }, (duration + delay) * 1000);
  }

  // Spawn bubbles continuously during loading
  function startFloatingPhase() {
    // Spawn a big initial burst
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        if (!pageLoaded) createFloatingBubble();
      }, i * 60);
    }

    // Keep spawning in clusters
    floatInterval = setInterval(() => {
      if (!pageLoaded) {
        const burstCount = Math.floor(randomBetween(1, 4));
        for (let i = 0; i < burstCount; i++) {
          setTimeout(() => {
            if (!pageLoaded) createFloatingBubble();
          }, i * 50);
        }
      }
    }, 120);
  }

  // --- Phase 2: Position bubbles over sections, then pop ---
  function startRevealPhase() {
    pageLoaded = true;
    if (floatInterval) clearInterval(floatInterval);

    // Clear any remaining floating bubbles
    floatingBubbles.forEach(b => {
      if (b.parentNode) b.parentNode.removeChild(b);
    });
    floatingBubbles = [];

    // Create multiple bubbles per section for a fuller, more random feel
    const sectionBubbles = [];
    revealSections.forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      const bubblesPerSection = Math.floor(randomBetween(2, 5));

      for (let j = 0; j < bubblesPerSection; j++) {
        const bubble = document.createElement('div');
        bubble.className = 'intro-bubble';
        const size = randomBetween(40, 140);
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        // Start from random positions along the bottom
        const startX = randomBetween(5, 90);
        const transitionDuration = randomBetween(0.6, 1.1);
        bubble.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle at 35% 35%, ${color}dd, ${color}88);
          left: ${startX}vw;
          bottom: -${size}px;
          transition: all ${transitionDuration}s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 1;
        `;

        document.body.appendChild(bubble);
        sectionBubbles.push({ el: bubble, section, size, color, index: i, subIndex: j });
      }
    });

    // Animate bubbles from bottom to scattered positions around their sections
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        sectionBubbles.forEach(({ el, section, size }) => {
          const rect = section.getBoundingClientRect();
          const scrollY = window.scrollY;
          // Scatter randomly within the section bounds (with some overflow)
          const offsetX = randomBetween(-size * 0.3, rect.width - size * 0.7);
          const offsetY = randomBetween(-size * 0.2, rect.height - size * 0.5);
          const targetX = rect.left + offsetX;
          const targetY = rect.top + scrollY + offsetY;

          el.style.left = targetX + 'px';
          el.style.bottom = 'auto';
          el.style.top = targetY + 'px';
        });
      });
    });

    // After bubbles settle, pop them one by one
    setTimeout(() => {
      // Hide the overlay so content behind is visible as bubbles pop
      overlay.classList.add('done');

      // Group by section index so all bubbles for a section pop together
      const maxIndex = Math.max(...sectionBubbles.map(b => b.index));
      for (let i = 0; i <= maxIndex; i++) {
        const group = sectionBubbles.filter(b => b.index === i);
        const sectionDelay = i * 200;

        group.forEach(({ el, section, subIndex }) => {
          // Stagger within the group for a burst effect
          const burstDelay = sectionDelay + subIndex * 60;

          setTimeout(() => {
            el.style.transition = 'none';
            el.style.animation = 'bubble-pop 0.45s ease-out forwards';

            // Reveal section on first bubble of the group
            if (subIndex === 0) {
              section.classList.add('intro-revealed');
            }

            setTimeout(() => {
              if (el.parentNode) el.parentNode.removeChild(el);
            }, 500);
          }, burstDelay);
        });
      }

      // Remove overlay fully after all animations
      const lastGroup = sectionBubbles.filter(b => b.index === maxIndex);
      const totalDuration = maxIndex * 200 + lastGroup.length * 60 + 600;
      setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        // Remove intro-hidden class so hover effects etc. work normally
        revealSections.forEach(s => {
          s.classList.remove('intro-hidden', 'intro-revealed');
        });
      }, totalDuration);
    }, 1000); // Wait for bubbles to reach their positions
  }

  // --- Init ---
  startFloatingPhase();

  // Wait for everything to load (images, videos, etc.)
  window.addEventListener('load', () => {
    // Small delay so user can appreciate the bubbles
    setTimeout(startRevealPhase, 400);
  });
})();
