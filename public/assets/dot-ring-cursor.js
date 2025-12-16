(function () {
  // 1. Inject CSS
  const style = document.createElement('style');
  style.innerHTML = `
    @media (pointer: fine) {
      body {
        cursor: none;
      }
    }

    .cursor-dot,
    .cursor-ring {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      pointer-events: none;
      mix-blend-mode: difference;
      display: none;
    }

    .cursor-dot {
      width: 8px;
      height: 8px;
      background-color: white;
      border-radius: 50%;
    }

    .cursor-ring {
      width: 40px;
      height: 40px;
      border: 1px solid rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      transition: width 0.3s, height 0.3s, background-color 0.3s;
    }

    @media (pointer: fine) {
      .cursor-dot,
      .cursor-ring {
        display: block;
      }
    }
  `;
  document.head.appendChild(style);

  // 2. Create DOM Elements
  const dot = document.createElement('div');
  dot.classList.add('cursor-dot');
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.classList.add('cursor-ring');
  document.body.appendChild(ring);

  // 3. Initialize GSAP Logic
  if (window.matchMedia("(pointer: fine)").matches) {
    // Initial setup - center elements relative to their transform origin
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    window.addEventListener("mousemove", (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    });

    // Interactive Hover Effects
    // We'll use a slightly broader selector to catch more interactive elements
    const interactiveSelectors = "a, button, .cursor-pointer, .tag-btn, input, textarea, .project-card, .tech-item";

    // Use event delegation for better performance and dynamic content support
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(interactiveSelectors)) {
        gsap.to(dot, { scale: 0, opacity: 0 });
        gsap.to(ring, { scale: 1.5, backgroundColor: "rgba(255, 255, 255, 0.2)", borderColor: "transparent" });
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(interactiveSelectors)) {
        gsap.to(dot, { scale: 1, opacity: 1 });
        gsap.to(ring, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(255, 255, 255, 0.8)" });
      }
    });
  }
})();
