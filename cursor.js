
/**
 * AETHER POLYMORPHIC CURSOR
 * -------------------------
 * A drop-in "10/10" cursor system that changes shape based on context.
 * 
 * INSTALLATION:
 * 1. Ensure GSAP is loaded in your project (CDN).
 * 2. Add <script src="cursor.js"></script> at the end of your <body>.
 */

(function () {
    // 1. Mobile Check - Disable completely on touch devices
    if (!window.matchMedia("(pointer: fine)").matches) {
        return;
    }

    // 2. Dependency Check
    if (typeof gsap === 'undefined') {
        console.warn("Aether Cursor: GSAP not found. Please load GSAP CDN.");
        return;
    }

    // 3. Self-Inject CSS
    const css = `
        body { cursor: none !important; }
        
        .aether-cursor {
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 9999999;
            mix-blend-mode: difference;
            will-change: transform, width, height, border-radius;
        }

        .cursor-shape {
            width: 100%;
            height: 100%;
            background: white;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); /* Silk Ease */
        }
    `;

    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);

    // 4. Create DOM Elements
    const cursor = document.createElement('div');
    cursor.className = 'aether-cursor';

    const shape = document.createElement('div');
    shape.className = 'cursor-shape';

    cursor.appendChild(shape);
    document.body.appendChild(cursor);

    // 5. GSAP Physics Setup
    // Center the cursor on the mouse coordinates
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

    // Initial State: Diamond
    let state = 'default'; // default, text, button, lens

    gsap.set(cursor, { width: 15, height: 15, rotation: 45 });

    // 6. Movement Logic
    window.addEventListener('mousemove', (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
    });

    // 7. Polymorphic Triggers (Event Delegation)
    const handleMouseOver = (e) => {
        const target = e.target;
        const tagName = target.tagName.toLowerCase();
        const classes = target.className;

        // A. TEXT -> "The Wand" (Thin Vertical Line)
        if (['p', 'h1', 'h2', 'h3', 'span', 'li', 'label'].includes(tagName) || target.closest('p, h1, h2, h3, span')) {
            if (state !== 'text') {
                gsap.to(cursor, { width: 2, height: 30, rotation: 0, duration: 0.4, ease: "power3.out" });
                gsap.to(shape, { borderRadius: 0, backgroundColor: "white", border: "none", duration: 0.4 });
                state = 'text';
            }
        }

        // B. IMAGES / CARDS -> "The Lens" (Large Frame)
        else if (tagName === 'img' || target.closest('.project-card') || target.closest('.service-card')) {
            if (state !== 'lens') {
                gsap.to(cursor, { width: 80, height: 80, rotation: 0, duration: 0.4, ease: "back.out(1.7)" });
                gsap.to(shape, {
                    borderRadius: 0,
                    backgroundColor: "transparent",
                    border: "1px solid white",
                    duration: 0.4
                });
                state = 'lens';
            }
        }

        // C. BUTTONS / LINKS -> "The Magnet" (Small Circle + Pull)
        else if (tagName === 'a' || tagName === 'button' || target.closest('a') || target.closest('button')) {
            if (state !== 'button') {
                gsap.to(cursor, { width: 40, height: 40, rotation: 0, duration: 0.4, ease: "power3.out" });
                gsap.to(shape, {
                    borderRadius: "50%",
                    backgroundColor: "transparent",
                    border: "1px solid rgba(255,255,255,0.5)",
                    duration: 0.4
                });
                state = 'button';
            }

            // Apply lightweight magnetism if not already handled by main app
            const btn = target.closest('a') || target.closest('button');
            if (btn && !btn.classList.contains('magnetic-btn')) {
                // Only apply if it's not already a magnetic button from the main app
                const moveBtn = (evt) => {
                    const rect = btn.getBoundingClientRect();
                    const relX = evt.clientX - (rect.left + rect.width / 2);
                    const relY = evt.clientY - (rect.top + rect.height / 2);
                    gsap.to(btn, { x: relX * 0.2, y: relY * 0.2, duration: 0.5 });
                };
                const resetBtn = () => {
                    gsap.to(btn, { x: 0, y: 0, duration: 0.5 });
                    btn.removeEventListener('mousemove', moveBtn);
                    btn.removeEventListener('mouseleave', resetBtn);
                };
                btn.addEventListener('mousemove', moveBtn);
                btn.addEventListener('mouseleave', resetBtn);
            }
        }

        // D. DEFAULT -> "The Diamond"
        else {
            if (state !== 'default') {
                gsap.to(cursor, { width: 12, height: 12, rotation: 45, duration: 0.4, ease: "power3.out" });
                gsap.to(shape, {
                    borderRadius: 0,
                    backgroundColor: "white",
                    border: "none",
                    duration: 0.4
                });
                state = 'default';
            }
        }
    };

    // Use a global listener for state changes to catch all elements
    document.addEventListener('mouseover', handleMouseOver);

})();
