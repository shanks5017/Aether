import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const Agency: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
        const mobileToggle = document.getElementById('mobile-toggle');
        const mobileToggleContainer = document.getElementById('mobile-toggle-container'); // Container for fade
        const mobileClose = document.getElementById('mobile-close');
        const mobileMenu = document.getElementById('mobile-menu');
        let isMenuOpen = false;
        const menuTimeline = gsap.timeline({ paused: true });

        // Setup Menu Animation
        if (mobileMenu) {
            menuTimeline.to(mobileMenu, { x: '0%', duration: 0.8, ease: 'power4.inOut' })
                .to('.mobile-links > *', { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, "-=0.4")
                .to('.mobile-footer', { opacity: 1, duration: 0.5 }, "-=0.4");

            gsap.set('.mobile-links > *', { x: 50, opacity: 0 });
        }

        function openMenu() {
            if (!isMenuOpen) {
                menuTimeline.play();
                document.body.style.overflow = 'hidden';
                if (mobileToggleContainer) {
                    mobileToggleContainer.style.opacity = '0';
                    mobileToggleContainer.style.pointerEvents = 'none';
                }
                isMenuOpen = true;
            }
        }

        function closeMenu() {
            if (isMenuOpen) {
                menuTimeline.reverse();
                document.body.style.overflow = '';
                if (mobileToggleContainer) {
                    mobileToggleContainer.style.opacity = '1';
                    mobileToggleContainer.style.pointerEvents = 'auto';
                }
                isMenuOpen = false;
            }
        }

        if (mobileToggle) {
            mobileToggle.addEventListener('click', openMenu);
        }

        if (mobileClose) {
            mobileClose.addEventListener('click', closeMenu);
        }

        // ==================================================================
        // 11/10 POLISH: ADVANCED SCROLL EFFECTS
        // ==================================================================

        // 1. Connection Beam (Draws line down side based on scroll)
        gsap.to('#connectionBeam', {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5
            }
        });

        // 2. Parallax Debris (Floating Background Elements)
        const debrisContainer = document.getElementById('parallaxDebris');
        const debrisTypes = [
            // Minimal SVG shapes
            `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"><rect x="10" y="10" width="20" height="20" transform="rotate(45 20 20)"/></svg>`,
            `<svg width="20" height="20" viewBox="0 0 20 20" fill="rgba(6,182,212,0.05)"><circle cx="10" cy="10" r="2"/></svg>`,
            `<div class="text-[10px] font-mono text-white/5 tracking-widest">Sys.Init()</div>`,
            `<div class="text-[10px] font-mono text-white/5 tracking-widest">0x4F92</div>`,
            `<div class="w-24 h-[1px] bg-white/5"></div>`
        ];

        // Generate 15 random debris elements
        for (let i = 0; i < 15; i++) {
            const el = document.createElement('div');
            el.classList.add('absolute', 'pointer-events-none');
            el.innerHTML = debrisTypes[Math.floor(Math.random() * debrisTypes.length)];

            // Random positioning
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            el.style.top = `${top}%`;
            el.style.left = `${left}%`;

            debrisContainer.appendChild(el);

            // Parallax Animation (each moves at different speed)
            const speed = (Math.random() - 0.5) * 200; // -100 to 100 movement

            gsap.to(el, {
                y: speed, // Move up or down relative to scroll
                rotation: Math.random() * 360, // Slight rotation for some
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1
                }
            });
        }

        // ==================================================================
        // 11/10 CREATIVITY: INFINITE WARP GRID
        // ==================================================================

        const canvas = document.getElementById('warpGrid') as HTMLCanvasElement; if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let width: number, height: number;
        let time = 0;
        let speed = 2; // Base speed

        // Resize handler
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        // Grid properties
        const lines = [];
        const numLines = 40;
        const horizonY = height / 2; // Vanishing point Y (center)

        // Scroll Velocity Tracker
        let lastScrollY = window.scrollY;
        let scrollVelocity = 0;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            scrollVelocity = Math.abs(currentScrollY - lastScrollY);
            lastScrollY = currentScrollY;
        });

        // Animation Loop
        function animateGrid() {
            // Fade effect (trail)
            ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'; // Clear with slight transparency for trails
            ctx.fillRect(0, 0, width, height);

            // Update Speed based on scroll (max boost +20)
            // Decay velocity smoothly
            scrollVelocity *= 0.9;
            const currentSpeed = speed + (scrollVelocity * 0.5);
            time += currentSpeed;

            // Center point
            const cx = width / 2;
            const cy = height / 2;

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'; // Platinum grid lines

            // 1. Draw Horizon Lines (moving roughly towards camera)
            // We simulate Z depth by exponential spacing
            const offset = time % 100;
            for (let i = 0; i < 20; i++) {
                // z goes from 0 (far) to 1000 (near)
                // We map i to a logarithmic scale for perspective
                // Simple infinite tunnel effect: y = cy + (some_factor / z)

                // Classic "Road" effect
                let y = cy + (i * 20 + offset) * (i * 0.1); // Simple parallax math
                if (y > height) y = y % height + cy; // Loop? No, simpler approach:
            }

            // BETTER APPROACH: Radial Tunnel (Warp Tunnel)
            // Draw Concentric Squares growing outward
            const tunnelSpeed = (time * 0.5) % 200; // Loop every 200px expansion

            for (let i = 0; i < 15; i++) {
                // Distance factor (0 is center, 1 is edge)
                // We stagger them: i * 200 is gap. - tunnelSpeed makes them move In/Out.
                let z = (i * 200) - tunnelSpeed;
                if (z < 0) z += 3000; // Loop back to far distance
                if (z > 3000) z -= 3000;

                // Perspective projection
                // fov = 300
                const fov = 400;
                const scale = fov / (fov + z);

                if (scale < 0) continue;

                const activeSize = Math.max(width, height) * 2; // Size of square at z=0
                const s = activeSize * scale;

                const alpha = Math.min(1, scale * 2); // Fade in as it approaches
                ctx.strokeStyle = `rgba(234, 234, 234, ${alpha * 0.15})`;

                ctx.strokeRect(cx - s / 2, cy - s / 2, s, s);
            }

            // 2. Draw Radial Lines (fixed)
            // Lines radiating from center to edges
            for (let i = 0; i < 16; i++) {
                const angle = (i / 16) * Math.PI * 2;
                // Rotate entire tunnel slowly??
                const rot = time * 0.001;
                const x1 = cx + Math.cos(angle + rot) * 50; // Inner radius (deadzone)
                const y1 = cy + Math.sin(angle + rot) * 50;

                const x2 = cx + Math.cos(angle + rot) * width; // Outer
                const y2 = cy + Math.sin(angle + rot) * width;

                ctx.strokeStyle = 'rgba(234, 234, 234, 0.05)';
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            // 3. Floating "Data Particles" (stars)
            // ... (Could add later, but grid is cleaner)

            requestAnimationFrame(animateGrid);
        }
        animateGrid();

        // ==================================================================
        // HELPER: Scramble Text on Scroll (Re-triggerable)
        // ==================================================================
        // Look for any element with .scramble-on-scroll class

        // ... (Previous JS) ...

        // ==================================================================
        // CYBERPUNK PRICING UPGRADES (GSAP IMPLEMENTATION)
        // ==================================================================

        // 0. Metrics Outro (Restored)
        gsap.to('#metrics', {
            opacity: 0,
            scale: 0.95,
            filter: 'blur(10px)',
            scrollTrigger: {
                trigger: '#pricing',
                start: 'top bottom', // When pricing top hits viewport bottom
                end: 'top center',
                scrub: 1
            }
        });

        // 1. Spotlight Effect
        const pricingGrid = document.getElementById('pricingGrid');
        if (pricingGrid) {
            pricingGrid.addEventListener('mousemove', (e: MouseEvent) => {
                const rect = pricingGrid.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                pricingGrid.style.setProperty('--mouse-x', `${x}px`);
                pricingGrid.style.setProperty('--mouse-y', `${y}px`);
            });
        }

        // 2. Anti-Gravity Floating Cards (Staggered Sine Waves)
        const cards = document.querySelectorAll('.pricing-card');
        cards.forEach((card, index) => {
            // Randomize start float
            gsap.to(card, {
                y: -15, // Float amount
                duration: 2 + Math.random(), // Random duration 2-3s
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.2 // Stagger start
            });

            // Hover: Pause Float & Glitch Scale
            // Note: We use a separate timeline or tween controls for this
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'back.out(1.7)' as any });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { scale: 1, duration: 0.3 });
            });
        });

        // 3. Hacker Text Decoding (Scramble Effect)
        const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

        function scrambleText(element: HTMLElement, finalValue: string) {
            let iterations = 0;
            const maxIterations = 20; // How long to scramble

            const interval = setInterval(() => {
                element.innerText = finalValue.split("")
                    .map((char, index) => {
                        if (index < iterations) return finalValue[index];
                        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                    })
                    .join("");

                if (iterations >= finalValue.length) {
                    clearInterval(interval);
                    element.innerText = finalValue; // Ensure clean final state
                }

                iterations += 1 / 3; // Speed of reveal
            }, 30);
        }

        ScrollTrigger.create({
            trigger: '#pricingGrid',
            start: 'top 60%',
            onEnter: () => {
                document.querySelectorAll('.hacker-price').forEach(el => {
                    scrambleText(el as HTMLElement, el.getAttribute('data-value') || "");
                });
            }
        });

        // 4. Magnetic Buttons (Physics-Based Attraction)
        document.querySelectorAll('.magnetic-btn').forEach(btn => {

            const xTo = gsap.quickTo(btn, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
            const yTo = gsap.quickTo(btn, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

            btn.addEventListener('mousemove', (e: any) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Magnet strength
                xTo(x * 0.3);
                yTo(y * 0.3);
            });

            btn.addEventListener('mouseleave', () => {
                xTo(0);
                yTo(0);
            });
        });

        // Re-bind Pricing Entrance Animation to new elements
        const pricingTL = gsap.timeline({
            scrollTrigger: {
                trigger: '#pricing',
                start: 'top 70%',
            }
        });

        pricingTL.to('.pricing-title', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
            // Updated to target cards correctly with their new initial state
            .to('.pricing-card', {
                opacity: 1,
                // Note: We don't animate Y here to 0 because floating animation handles Y.
                // We just want them to appear. OR we animate from an offset.
                // Let's just animate opacity and slight scale? 
                // Getting conflict with float? No, float is relative if using x/yPercent or transforms carefully.
                // Simple opacity fade is safest for now to avoid fighting the float loop.
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            }, '-=0.4');

        // 3. 3D Tilt Effect for Pricing Cards
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.addEventListener('mousemove', (e: any) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate rotation (max 10deg)
                const xPct = (x / rect.width - 0.5) * 20; // -10 to 10
                const yPct = (y / rect.height - 0.5) * -20; // Invert Y

                gsap.to(card, {
                    rotationY: xPct,
                    rotationX: yPct,
                    transformPerspective: 1000,
                    ease: 'power1.out',
                    duration: 0.5
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationY: 0,
                    rotationX: 0,
                    ease: 'power3.out',
                    duration: 0.8
                });
            });
        });
        // Navbar Scroll Effect
        const navbar = document.getElementById('navbar') || document.createElement("div");
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-obsidian/70', 'backdrop-blur-md', 'border-b', 'border-white/10');
            } else {
                navbar.classList.remove('bg-obsidian/70', 'backdrop-blur-md', 'border-b', 'border-white/10');
            }
        });

        // Spotlight Effect
        const spotlight = document.getElementById('spotlight') as HTMLElement;
        window.addEventListener('mousemove', (e: MouseEvent) => {
            spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
            spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
            spotlight.style.opacity = '1';
        });

        // ==================================================================
        // HERO: ELEGANT ENTRANCE SEQUENCE
        // ==================================================================

        // Timeline for entrance
        const entranceTL = gsap.timeline({ delay: 0.5 });

        // Phase 1: Draw semicircle arrows (1.5s)
        entranceTL.to('#arrowTopLeft', {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.inOut'
        }, 0)
            .to('#arrowBottomRight', {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: 'power2.inOut'
            }, 0)
            // Arrow heads appear
            .to('#arrowHead1', {
                opacity: 1,
                duration: 0.3
            }, 1.2)
            .to('#arrowHead2', {
                opacity: 1,
                duration: 0.3
            }, 1.2)

            // Phase 2: Text reveal - each line slides up (staggered)
            .to('.hero-text', {
                opacity: 1,
                duration: 0.01
            }, 1.5)
            .from('.hero-line span', {
                y: 120,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out'
            }, 1.6)

            // Phase 3: Subtitle and scroll indicator
            .to('#heroSubtitle', {
                opacity: 1,
                y: -10,
                duration: 1,
                ease: 'power2.out'
            }, 2.8)
            .to('#scrollIndicator', {
                opacity: 0.5,
                duration: 0.8
            }, 3.2);

        // ==================================================================
        // HERO: OUTRO (Scroll Effect)
        // ==================================================================

        gsap.to('#heroContent', {
            opacity: 0,
            scale: 0.9,
            y: -100,
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        // ==================================================================
        // 2. METRICS: SYSTEM STATUS ANIMATIONS
        // ==================================================================

        // A. Generate Node Graph
        const nodeGraph = document.getElementById('nodeGraph');
        if (nodeGraph) {
            for (let i = 0; i < 40; i++) {
                const bar = document.createElement('div');
                bar.className = 'w-1 bg-gray-800 rounded-sm hover:bg-cyan-500 transition-colors duration-300';
                // Random height between 20% and 100%
                bar.style.height = Math.floor(Math.random() * 80 + 20) + '%';
                nodeGraph.appendChild(bar);

                // Animate bars randomly
                gsap.to(bar, {
                    height: Math.floor(Math.random() * 80 + 20) + '%',
                    duration: Math.random() * 1 + 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: Math.random() * 2
                });
            }
        }

        // B. Intro Animation (Staggered Entrance)
        const metricsTL = gsap.timeline({
            scrollTrigger: {
                trigger: '#metrics',
                start: 'top 80%',
            }
        });

        metricsTL.to('.metrics-header', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
            .to('.metric-card', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                onComplete: startCounters // Start counting when cards appear
            }, '-=0.4');

        // C. Counter Animation (Odometer Effect)
        function startCounters() {
            const odometers = document.querySelectorAll('.odometer');

            odometers.forEach(el => {
                const element = el as HTMLElement;
                const target = parseFloat(element.getAttribute('data-target') || "0");
                // Animate from 0 to target
                gsap.to(element, {
                    textContent: target,
                    duration: 2,
                    snap: { textContent: 0.1 }, // Snap to decimal if needed
                    ease: 'power4.out',
                    onUpdate: function () {
                        // Format number during animation
                        if (target % 1 === 0) {
                            // Integer
                            element.textContent = Math.round(Number(element.textContent)).toString();
                        } else {
                            // Float (2 decimals)
                            element.textContent = parseFloat(element.textContent || "0").toFixed(2);
                        }
                    }
                });
            });
        }

        // ==================================================================
        // 6. TESTIMONIALS: ALIVE (Float + Tilt)
        // ==================================================================
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            // A. Ambient Float (Anti-Gravity)
            // Staggered sine wave so they don't move in sync
            gsap.to(card, {
                y: -10, // Gentle float
                duration: 2 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.3
            });

            // B. Interactive 3D Tilt
            card.addEventListener('mousemove', (e: any) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate rotation (max 10deg)
                const xPct = (x / rect.width - 0.5) * 20;
                const yPct = (y / rect.height - 0.5) * -20;

                gsap.to(card, {
                    rotationY: xPct,
                    rotationX: yPct,
                    transformPerspective: 1000,
                    ease: 'power1.out',
                    duration: 0.5
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationY: 0,
                    rotationX: 0,
                    ease: 'power3.out',
                    duration: 0.8
                });
            });
        });


        // ==================================================================
        // PHASE 4: PROCESS & TECH (ENGINE ROOM)
        // ==================================================================

        // 1. Mission Sequence (Timeline)
        // Draw the line
        gsap.to('#missionLineFill', {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '#process',
                start: 'top center',
                end: 'bottom center',
                scrub: 0.5
            }
        });

        // Activate Nodes
        const steps = document.querySelectorAll('.mission-step');
        steps.forEach((step, i) => {
            ScrollTrigger.create({
                trigger: step,
                start: 'top 60%',
                onEnter: () => {
                    step.classList.add('active');
                    // Scramble the title
                    const title = step.querySelector('.mission-title') as HTMLElement;
                    if (title) scrambleText(title, title.getAttribute('data-value') || "");
                }
            });
        });

        // 2. Gravitational Tech Orbit
        // Rotate the rings
        gsap.to('.orbit-ring-1', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
        gsap.to('.orbit-ring-2', { rotation: -360, duration: 25, repeat: -1, ease: 'none' });
        gsap.to('.orbit-ring-3', { rotation: 360, duration: 30, repeat: -1, ease: 'none' });

        // Icons counter-rotate to stay upright? Or just let them spin.
        // Let's keep it simple: Orbiting dots/icons.

        // Mouse Interaction for Orbit Tilt
        const techSection = document.getElementById('tech');
        if (techSection) {
            techSection.addEventListener('mousemove', (e: MouseEvent) => {
                const rect = techSection.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to('#orbitSystem', {
                    rotationY: x * 30,
                    rotationX: -y * 30,
                    ease: 'power2.out',
                    duration: 1
                });
            });
        }

        // ==================================================================
        // 7. WARP SPEED CTA: Launch Sequence
        // ==================================================================
        const warpBtn = document.getElementById('warpBtn');
        const warpProgress = document.getElementById('warpProgress');
        const warpCanvas = document.getElementById('warpCanvas') as HTMLCanvasElement; if (!warpCanvas) return;
        let warpTimer;
        let isLaunching = false;

        if (warpBtn && warpProgress && warpCanvas) {
            const ctx = warpCanvas.getContext('2d');
            let width: number, height: number;

            function resizeWarp() {
                const parent = warpCanvas.parentElement;
                if (!parent) return;
                width = warpCanvas.width = parent.offsetWidth;
                height = warpCanvas.height = parent.offsetHeight;
            }
            window.addEventListener('resize', resizeWarp);
            resizeWarp();

            // Particle System
            class Particle {
                x: number;
                y: number;
                vx: number;
                vy: number;
                life: number;
                color: string;
                constructor(x: number, y: number) {
                    this.x = x;
                    this.y = y;
                    this.vx = (Math.random() - 0.5) * 20;
                    this.vy = (Math.random() - 0.5) * 20;
                    this.life = 1;
                    this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`; // Cyan/Blue
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.life -= 0.02;
                }
                draw() {
                    ctx.globalAlpha = this.life;
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, Math.random() * 4 + 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            let particles: Particle[] = [];
            function animateExplosion() {
                ctx.clearRect(0, 0, width, height);
                particles.forEach((p, i) => {
                    p.update();
                    p.draw();
                    if (p.life <= 0) particles.splice(i, 1);
                });
                if (particles.length > 0) requestAnimationFrame(animateExplosion);
            }

            function createExplosion() {
                // Flash screen
                gsap.to('body', { backgroundColor: '#ffffff', duration: 0.1, yoyo: true, repeat: 1 });

                // Spawn particles
                for (let i = 0; i < 100; i++) {
                    particles.push(new Particle(width / 2, height / 2));
                }
                animateExplosion();
            }

            // Interaction
            function startCharge() {
                if (isLaunching) return;

                // Animate progress stroke
                // 301 is roughly the circumference of r=48 (2*PI*48 ~= 301.59)
                gsap.to(warpProgress, {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    ease: 'none',
                    onComplete: launch
                });

                // Scale button
                gsap.to(warpBtn, { scale: 0.95, duration: 1.5 });
            }

            function abortCharge() {
                if (isLaunching) return;

                // Kill tween
                gsap.killTweensOf(warpProgress);
                gsap.killTweensOf(warpBtn);

                // Reset
                gsap.to(warpProgress, { strokeDashoffset: 301, duration: 0.3, ease: 'power2.out' });
                gsap.to(warpBtn, { scale: 1, duration: 0.3 });
            }

            function launch() {
                isLaunching = true;
                createExplosion();

                // Text feedback
                const launchText = warpBtn.querySelector('span:nth-child(2)') as HTMLElement;
                if (launchText) launchText.innerText = "LAUNCHING...";

                // Navigate after explosion
                setTimeout(() => {
                    window.location.href = 'contact.html';
                }, 1000);
            }

            // Bind Events
            warpBtn.addEventListener('mousedown', startCharge);
            warpBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startCharge(); });

            warpBtn.addEventListener('mouseup', abortCharge);
            warpBtn.addEventListener('mouseleave', abortCharge);
            warpBtn.addEventListener('touchend', abortCharge);
        }
    
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 w-full">
      {/* Mouse Spotlight */}
      <div id="spotlight" className="fixed inset-0 pointer-events-none spotlight-overlay transition-opacity duration-500 opacity-0 z-[2]"></div>

      {/* Vertical Grid */}
      <div className="fixed inset-0 z-0 bg-grid-vertical pointer-events-none opacity-20"></div>

      {/* Aurora Background */}
      <div className="aurora-container fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen filter blur-[100px] opacity-10 bg-violet-900/40 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen filter blur-[100px] opacity-10 bg-cyan-900/40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Warp Grid */}
      <canvas id="warpGrid" className="fixed inset-0 z-[1] opacity-40 pointer-events-none mix-blend-screen"></canvas>

      {/* Connection Beam */}
      <div className="fixed left-6 md:left-12 top-0 bottom-0 w-[1px] z-[50] pointer-events-none mix-blend-overlay hidden md:block">
          <div className="h-full w-full bg-white/10"></div>
          <div id="connectionBeam" className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-cyan-500 to-violet-500 h-0 box-shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
      </div>

      {/* Parallax Debris */}
      <div id="parallaxDebris" className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"></div>

      <main className="relative z-10">
        

        {/* 1. CINEMATIC HERO: Elegant Entrance */}
        {/* NOTE: Transparent background for Warp Grid visibility */}
        <section id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">

            {/* Semicircle Arrows (corners) */}
            <div className="absolute inset-0 pointer-events-none z-10 select-none">
                {/* Top-left semicircle */}
                <svg className="absolute top-6 left-6 w-[200px] h-[200px] overflow-visible">
                    <path id="arrowTopLeft" className="arrow-path" d="M 0,200 Q 0,0 200,0" stroke="rgba(80, 80, 80, 0.8)"
                        strokeWidth="3" fill="none" strokeDasharray="400" strokeDashoffset="400" />
                    {/* Arrow head at end */}
                    <circle id="arrowHead1" cx="200" cy="0" r="4" fill="rgba(80, 80, 80, 1)" opacity="0" />
                </svg>

                {/* Bottom-right semicircle (rotated 180) */}
                <svg className="absolute bottom-6 right-6 w-[200px] h-[200px] overflow-visible rotate-180">
                    <path id="arrowBottomRight" className="arrow-path" d="M 0,200 Q 0,0 200,0"
                        stroke="rgba(80, 80, 80, 0.8)" strokeWidth="3" fill="none" strokeDasharray="400"
                        strokeDashoffset="400" />
                    {/* Arrow head at end */}
                    <circle id="arrowHead2" cx="200" cy="0" r="4" fill="rgba(80, 80, 80, 1)" opacity="0" />
                </svg>
            </div>

            {/* Text Content (animated entrance) */}
            <div id="heroContent" className="relative z-20 px-6 md:px-12 max-w-7xl mx-auto text-center">

                {/* Split text for animation */}
                <div className="overflow-hidden mb-8">
                    <h1 className="hero-text opacity-0">
                        <div className="hero-line overflow-hidden">
                            <span
                                className="text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-tighter leading-none text-platinum block">
                                PRECISION.
                            </span>
                        </div>
                        <div className="hero-line overflow-hidden">
                            <span
                                className="text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-tighter leading-none text-platinum block">
                                POWER.
                            </span>
                        </div>
                        <div className="hero-line overflow-hidden">
                            <span
                                className="text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-tighter leading-none text-platinum block">
                                PERFORMANCE.
                            </span>
                        </div>
                    </h1>
                </div>

                <p className="text-sm md:text-base font-mono text-gray-400 max-w-xl mx-auto opacity-0" id="heroSubtitle">
                    Where data meets design intuition. We reject templates to engineer bespoke digital architectures.
                </p>

                {/* Minimal scroll indicator */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 opacity-0" id="scrollIndicator">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-platinum/30 to-transparent"></div>
                </div>

            </div>

        </section>

        {/* 2. LIVING METRICS: System Status HUD */}
        {/* NOTE: Transparent background for Warp Grid visibility */}
        {/* NOTE: Transparent background for Warp Grid visibility */}
        <section id="metrics" className="relative min-h-[50vh] py-32 bg-obsidian/40 border-t border-platinum/10">

            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="flex items-end justify-between mb-16 metrics-header opacity-0 translate-y-10 relative z-20">
                    <h2 className="text-3xl md:text-5xl font-black text-platinum tracking-tighter uppercase">
                        SYSTEM STATUS//
                    </h2>
                    <div className="hidden md:flex flex-col items-end">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-xs font-mono text-gray-500">OPERATIONAL</span>
                        </div>
                        <span className="text-xs font-mono text-gray-700">SRV_LOC: [UNKNOWN]</span>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div
                        className="metric-card bg-zinc-900/40 border border-white/5 p-8 backdrop-blur-md group hover:border-white/20 transition-all duration-500 opacity-0 translate-y-10">
                        <div className="flex justify-between items-start mb-12">
                            <span className="font-mono text-xs text-gray-500 tracking-widest">[UPTIME]</span>
                            <svg className="w-6 h-6 text-gray-700 group-hover:text-platinum transition-colors" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="text-5xl font-black text-platinum mb-2 flex items-baseline">
                            <span className="odometer" data-target="99.98">0</span>
                            <span className="text-lg text-gray-600 ml-1">%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-platinum w-0 transition-all duration-1000 group-hover:w-[99.98%]"
                                style={{'transition-delay': '0.2s'}}></div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div
                        className="metric-card bg-zinc-900/40 border border-white/5 p-8 backdrop-blur-md group hover:border-white/20 transition-all duration-500 opacity-0 translate-y-10">
                        <div className="flex justify-between items-start mb-12">
                            <span className="font-mono text-xs text-gray-500 tracking-widest">[ACTIVE_NODES]</span>
                            <svg className="w-6 h-6 text-gray-700 group-hover:text-platinum transition-colors" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div className="text-5xl font-black text-platinum mb-2 flex items-baseline">
                            <span className="odometer" data-target="842">0</span>
                        </div>
                        <div className="flex gap-1" id="nodeGraph">
                            {/* JS will generate bars here */}
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div
                        className="metric-card bg-zinc-900/40 border border-white/5 p-8 backdrop-blur-md group hover:border-white/20 transition-all duration-500 opacity-0 translate-y-10">
                        <div className="flex justify-between items-start mb-12">
                            <span className="font-mono text-xs text-gray-500 tracking-widest">[LATENCY]</span>
                            <svg className="w-6 h-6 text-gray-700 group-hover:text-platinum transition-colors" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div className="text-5xl font-black text-platinum mb-2 flex items-baseline">
                            <span className="text-sm text-platinum mr-2 font-mono">&lt;</span>
                            <span className="odometer" data-target="12">0</span>
                            <span className="text-lg text-gray-600 ml-1">ms</span>
                        </div>
                        <div className="flex items-center gap-1 h-1">
                            <div className="w-full bg-gray-800 rounded-full h-full overflow-hidden">
                                <div className="h-full bg-platinum w-0 animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* 3. HOLOGRAPHIC PRICING: Glass Stack */}
        {/* NOTE: Transparent background for Warp Grid visibility */}
        {/* Pricing Models */}
        <section className="px-6 md:px-12 mb-20 md:mb-32 relative overflow-hidden flex flex-col items-center">
            
            <h2 className="text-3xl md:text-5xl font-black text-platinum tracking-tighter uppercase mb-6 text-center pricing-title opacity-0 translate-y-10">
                WEB PACKAGES
            </h2>
            <p className="text-gray-400 font-mono text-sm text-center mb-20 max-w-2xl mx-auto pricing-title opacity-0 translate-y-10">
                Professional websites built to grow your restaurant business.
            </p>

            <div className="pricing-grid relative grid grid-cols-1 md:grid-cols-3 gap-8 p-1 group mb-24 max-w-7xl mx-auto w-full">
                
                {/* Tier 1: STARTER */}
                <div className="pricing-card group relative p-[1px] rounded-2xl overflow-hidden opacity-0 translate-y-20">
                    <div className="card-glitch-border absolute inset-0 rounded-2xl border border-white/5 pointer-events-none z-20"></div>

                    <div className="relative bg-zinc-900/90 backdrop-blur-xl p-8 rounded-2xl h-full z-10 transition-colors flex flex-col">
                        <h3 className="text-xl font-mono text-gray-400 mb-2 tracking-widest">[STARTER]</h3>
                        <p className="text-xs font-mono text-emerald-500 mb-6 uppercase tracking-widest">One-time payment</p>
                        <div className="text-4xl font-black text-platinum mb-8 h-10 flex items-center">
                            <span className="hacker-price" data-value="₹3,999">₹3,999</span>
                        </div>
                        <ul className="space-y-4 text-sm text-gray-400 font-mono mb-8 flex-grow">
                            <li className="flex items-center gap-2"><span className="text-emerald-500">{">>"}</span> 1 Page (Single scroll)</li>
                            <li className="flex items-center gap-2"><span className="text-emerald-500">{">>"}</span> Basic (5-6 photos) gallery</li>
                            <li className="flex items-center gap-2"><span className="text-emerald-500">{">>"}</span> Menu display</li>
                            <li className="flex items-center gap-2"><span className="text-emerald-500">{">>"}</span> Free lifetime hosting</li>
                        </ul>
                        
                        <div className="space-y-2 mb-6">
                            <p className="text-xs font-mono text-gray-500"><span className="text-white">Time:</span> 3–5 days</p>
                            <p className="text-xs font-mono text-gray-500"><span className="text-white">Revisions:</span> 1 round</p>
                        </div>

                        <a href="/contact?budget=starter" className="magnetic-btn btn-liquid w-full py-4 border border-white/10 rounded-lg uppercase tracking-widest text-xs font-bold text-white transition-colors block text-center mt-auto hover:bg-white/10">Get Started</a>
                    </div>
                </div>

                {/* Tier 2: STANDARD */}
                <div className="pricing-card group relative p-[1px] rounded-2xl overflow-hidden opacity-0 translate-y-20">
                    <div className="card-glitch-border absolute inset-0 rounded-2xl border border-white/10 pointer-events-none z-20"></div>
                    <div className="relative bg-zinc-900/90 backdrop-blur-xl p-8 rounded-2xl h-full z-10 transition-colors flex flex-col">
                        <h3 className="text-xl font-mono text-platinum mb-2 tracking-widest">[STANDARD]</h3>
                        <p className="text-xs font-mono text-cyan-400 mb-6 uppercase tracking-widest">One-time payment</p>
                        <div className="text-4xl font-black text-white mb-8 text-glow h-10 flex items-center">
                            <span className="hacker-price" data-value="₹7,999">₹7,999</span>
                        </div>
                        <ul className="space-y-4 text-sm text-gray-300 font-mono mb-8 flex-grow">
                            <li className="flex items-center gap-2"><span className="text-cyan-400">{">>"}</span> 3–5 pages</li>
                            <li className="flex items-center gap-2"><span className="text-cyan-400">{">>"}</span> Full photo gallery</li>
                            <li className="flex items-center gap-2"><span className="text-cyan-400">{">>"}</span> Menu & About Us</li>
                            <li className="flex items-center gap-2"><span className="text-cyan-400">{">>"}</span> Basic SEO setup</li>
                            <li className="flex items-center gap-2"><span className="text-cyan-400">{">>"}</span> Testimonials</li>
                        </ul>

                        <div className="space-y-2 mb-6">
                            <p className="text-xs font-mono text-gray-400"><span className="text-white">Time:</span> 5–7 days</p>
                            <p className="text-xs font-mono text-gray-400"><span className="text-white">Revisions:</span> 1 round</p>
                        </div>

                        <a href="/contact?budget=growth" className="magnetic-btn btn-liquid w-full py-4 border border-white rounded-lg uppercase tracking-widest text-xs font-bold text-white transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] block text-center mt-auto hover:bg-white/10">Get Started</a>
                    </div>
                </div>

                {/* Tier 3: PREMIUM */}
                <div className="pricing-card group relative p-[1px] rounded-2xl overflow-hidden opacity-0 translate-y-20">
                    <div className="card-glitch-border absolute inset-0 rounded-2xl border border-white/5 pointer-events-none z-20"></div>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 opacity-20 group-hover:opacity-100 transition-opacity animate-spin-slow"></div>

                    <div className="relative bg-zinc-900/90 backdrop-blur-xl p-8 rounded-2xl h-full z-10 transition-colors flex flex-col">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">Recommended</span>
                        </div>
                        <h3 className="text-xl font-mono text-gray-400 mb-2 tracking-widest">[PREMIUM]</h3>
                        <p className="text-xs font-mono text-fuchsia-500 mb-6 uppercase tracking-widest">One-time payment</p>
                        <div className="text-4xl font-black text-platinum mb-8 h-10 flex items-center">
                            <span className="hacker-price" data-value="₹14,999">₹14,999</span>
                        </div>
                        <ul className="space-y-4 text-sm text-gray-400 font-mono mb-8 flex-grow">
                            <li className="flex items-center gap-2"><span className="text-violet-500">{">>"}</span> Professional Photoshoot</li>
                            <li className="flex items-center gap-2"><span className="text-violet-500">{">>"}</span> Promo Video/Reel</li>
                            <li className="flex items-center gap-2"><span className="text-violet-500">{">>"}</span> Self-editable content</li>
                            <li className="flex items-center gap-2"><span className="text-violet-500">{">>"}</span> Online ordering button</li>
                        </ul>

                        <div className="space-y-2 mb-6">
                            <p className="text-xs font-mono text-gray-500"><span className="text-white">Time:</span> 10–12 days</p>
                            <p className="text-xs font-mono text-gray-500"><span className="text-white">Revisions:</span> 2 rounds</p>
                        </div>

                        <a href="/contact?budget=enterprise" className="magnetic-btn btn-liquid w-full py-4 border border-white/10 rounded-lg uppercase tracking-widest text-xs font-bold text-white transition-colors block text-center mt-auto hover:bg-white/10">Get Started</a>
                    </div>
                </div>

            </div>

            {/* FEATURE COMPARISON TABLE */}
            <div className="pricing-title opacity-0 translate-y-10 w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl mt-12 max-w-7xl mx-auto">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left font-mono text-sm min-w-[800px]">
                        <thead>
                            <tr className="bg-black/50 border-b border-white/10 text-xs tracking-widest uppercase text-gray-500">
                                <th className="p-6 font-semibold">Feature Matrix</th>
                                <th className="p-6 font-semibold text-center w-48 text-emerald-500">[STARTER]</th>
                                <th className="p-6 font-semibold text-center w-48 text-cyan-400">[STANDARD]</th>
                                <th className="p-6 font-semibold text-center w-48 text-fuchsia-500">[PREMIUM]</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 divide-y divide-white/5">
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">Number of pages</td>
                                <td className="p-6 text-center text-gray-400">1 (Single scroll)</td>
                                <td className="p-6 text-center text-white font-bold">3–5 pages</td>
                                <td className="p-6 text-center text-white font-bold">3–5 pages</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">Mobile responsive design</td>
                                <td className="p-6 text-center text-emerald-500">●</td>
                                <td className="p-6 text-center text-cyan-500">●</td>
                                <td className="p-6 text-center text-fuchsia-500">●</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">Menu / services display</td>
                                <td className="p-6 text-center text-emerald-500">●</td>
                                <td className="p-6 text-center text-cyan-400">(Dedicated page)</td>
                                <td className="p-6 text-center text-fuchsia-400">(Dedicated page)</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">Photo gallery</td>
                                <td className="p-6 text-center text-gray-400">Basic (5-6 photos)</td>
                                <td className="p-6 text-center text-cyan-400">Full gallery</td>
                                <td className="p-6 text-center text-fuchsia-400">Full gallery</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">About Us section</td>
                                <td className="p-6 text-center text-gray-600">-</td>
                                <td className="p-6 text-center text-cyan-500">●</td>
                                <td className="p-6 text-center text-fuchsia-500">●</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">Google Maps + location</td>
                                <td className="p-6 text-center text-emerald-500">●</td>
                                <td className="p-6 text-center text-cyan-500">●</td>
                                <td className="p-6 text-center text-fuchsia-500">●</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">WhatsApp / Call button</td>
                                <td className="p-6 text-center text-emerald-500">●</td>
                                <td className="p-6 text-center text-cyan-500">●</td>
                                <td className="p-6 text-center text-fuchsia-500">●</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">Customer testimonials</td>
                                <td className="p-6 text-center text-gray-600">-</td>
                                <td className="p-6 text-center text-cyan-500">●</td>
                                <td className="p-6 text-center text-fuchsia-500">●</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">Basic SEO setup</td>
                                <td className="p-6 text-center text-gray-600">-</td>
                                <td className="p-6 text-center text-cyan-500">●</td>
                                <td className="p-6 text-center text-fuchsia-500">●</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">Instagram/Facebook feed</td>
                                <td className="p-6 text-center text-gray-600">-</td>
                                <td className="p-6 text-center text-cyan-500">●</td>
                                <td className="p-6 text-center text-fuchsia-500">●</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">In-person photoshoot</td>
                                <td className="p-6 text-center text-gray-600">-</td>
                                <td className="p-6 text-center text-gray-600">-</td>
                                <td className="p-6 text-center text-fuchsia-500">●</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">Promo video/reel</td>
                                <td className="p-6 text-center text-gray-600">-</td>
                                <td className="p-6 text-center text-gray-600">-</td>
                                <td className="p-6 text-center text-fuchsia-500">●</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">Self-editable content</td>
                                <td className="p-6 text-center text-gray-600">-</td>
                                <td className="p-6 text-center text-gray-600">-</td>
                                <td className="p-6 text-center text-fuchsia-500">●</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">Online ordering button</td>
                                <td className="p-6 text-center text-gray-600">-</td>
                                <td className="p-6 text-center text-gray-600">-</td>
                                <td className="p-6 text-center text-fuchsia-500">●</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">Domain purchase help</td>
                                <td className="p-6 text-center text-emerald-500">●</td>
                                <td className="p-6 text-center text-cyan-500">●</td>
                                <td className="p-6 text-center text-fuchsia-500">●</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* WHY CHOOSE US */}
            <div className="pricing-title opacity-0 translate-y-10 mt-24 max-w-7xl mx-auto w-full">
                <h3 className="text-xl md:text-3xl font-black text-center text-white tracking-tighter uppercase mb-12">System Guarantees</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                        <span className="text-2xl mb-4">🔒</span>
                        <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">100% Secure</h4>
                        <p className="text-xs text-gray-400 font-mono">Safe & reliable</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                        <span className="text-2xl mb-4">🎧</span>
                        <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Support</h4>
                        <p className="text-xs text-gray-400 font-mono">Here to help</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                        <span className="text-2xl mb-4">📈</span>
                        <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Grow Biz</h4>
                        <p className="text-xs text-gray-400 font-mono">Built to convert</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                        <span className="text-2xl mb-4">🏅</span>
                        <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Guaranteed</h4>
                        <p className="text-xs text-gray-400 font-mono">Quality you trust</p>
                    </div>
                </div>
            </div>
            
        </section>

        {/* 4. MISSION SEQUENCE: Vertical Timeline */}
        <section id="process" className="relative min-h-screen py-32 bg-obsidian/40 backdrop-blur-sm flex items-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">

                <div className="mb-20 text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-platinum tracking-tighter uppercase">MISSION
                        PROTOCOL</h2>
                </div>

                <div
                    className="relative grid grid-cols-[60px_1fr] md:grid-cols-[100px_1fr] gap-6 md:gap-12 max-w-4xl mx-auto">

                    {/* Vertical Line */}
                    <div className="relative h-full">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-white/10"></div>
                        <div id="missionLineFill"
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-0 bg-cyan-500 box-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="space-y-32 py-12">

                        {/* Step 1 */}
                        <div className="mission-step group relative opacity-100 transition-all duration-500">
                            {/* Node (Aligned to center of Col 1) 
                                 Col 1 Center: 30px (mobile) / 50px (desktop)
                                 Gap: 24px (mobile) / 48px (desktop)
                                 Col 2 Start: 84px (mobile) / 148px (desktop)
                                 Offset Needed: -54px (mobile) / -98px (desktop)
                            */}
                            <div
                                className="absolute -left-[calc(30px+1.5rem)] md:-left-[calc(50px+3rem)] top-2 w-4 h-4 rounded-full bg-obsidian border border-white/20 group-[.active]:border-cyan-500 group-[.active]:bg-cyan-500 shadow-[0_0_0_0_rgba(6,182,212,0)] group-[.active]:shadow-[0_0_20px_2px_rgba(6,182,212,0.5)] transition-all duration-500 z-10">
                            </div>


                            <h3 className="text-2xl font-black text-white mb-4 uppercase flex items-center gap-4">
                                <span className="text-cyan-500 text-sm font-mono">01//</span>
                                <span className="mission-title" data-value="DISCOVERY">INIT</span>
                            </h3>
                            <p className="text-white font-mono text-sm leading-relaxed max-w-lg">
                                We infiltrate your operational data. Mapping structural weaknesses and identifying
                                high-leverage opportunities for digital intervention.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="mission-step group relative opacity-100 transition-all duration-500">
                            {/* Node */}
                            <div
                                className="absolute -left-[calc(30px+1.5rem)] md:-left-[calc(50px+3rem)] top-2 w-4 h-4 rounded-full bg-obsidian border border-white/20 group-[.active]:border-violet-500 group-[.active]:bg-violet-500 shadow-[0_0_0_0_rgba(139,92,246,0)] group-[.active]:shadow-[0_0_20px_2px_rgba(139,92,246,0.5)] transition-all duration-500 z-10">
                            </div>


                            <h3 className="text-2xl font-black text-white mb-4 uppercase flex items-center gap-4">
                                <span className="text-violet-500 text-sm font-mono">02//</span>
                                <span className="mission-title" data-value="ARCHITECTURE">PLAN</span>
                            </h3>
                            <p className="text-white font-mono text-sm leading-relaxed max-w-lg">
                                Engineering the blueprint. We select the tech stack not by trend, but by raw performance
                                metrics.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="mission-step group relative opacity-100 transition-all duration-500">
                            {/* Node */}
                            <div
                                className="absolute -left-[calc(30px+1.5rem)] md:-left-[calc(50px+3rem)] top-2 w-4 h-4 rounded-full bg-obsidian border border-white/20 group-[.active]:border-fuchsia-500 group-[.active]:bg-fuchsia-500 shadow-[0_0_0_0_rgba(217,70,239,0)] group-[.active]:shadow-[0_0_20px_2px_rgba(217,70,239,0.5)] transition-all duration-500 z-10">
                            </div>


                            <h3 className="text-2xl font-black text-white mb-4 uppercase flex items-center gap-4">
                                <span className="text-fuchsia-500 text-sm font-mono">03//</span>
                                <span className="mission-title" data-value="EXECUTION">BUILD</span>
                            </h3>
                            <p className="text-white font-mono text-sm leading-relaxed max-w-lg">
                                Rapid-fire development cycles. Code is written, tested, and optimized in a vacuum-sealed
                                environment to ensure zero defects.
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="mission-step group relative opacity-100 transition-all duration-500">
                            {/* Node */}
                            <div
                                className="absolute -left-[calc(30px+1.5rem)] md:-left-[calc(50px+3rem)] top-2 w-4 h-4 rounded-full bg-obsidian border border-white/20 group-[.active]:border-emerald-500 group-[.active]:bg-emerald-500 shadow-[0_0_0_0_rgba(16,185,129,0)] group-[.active]:shadow-[0_0_20px_2px_rgba(16,185,129,0.5)] transition-all duration-500 z-10">
                            </div>


                            <h3 className="text-2xl font-black text-white mb-4 uppercase flex items-center gap-4">
                                <span className="text-emerald-500 text-sm font-mono">04//</span>
                                <span className="mission-title" data-value="DEPLOYMENT">LIVE</span>
                            </h3>
                            <p className="text-white font-mono text-sm leading-relaxed max-w-lg">
                                System launch. Global CDN propagation. We monitor the heartbeat of your new digital
                                infrastructure.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        {/* 5. GRAVITATIONAL TECH ORBIT: The Core */}
        <section id="tech"
            className="relative min-h-screen py-32 bg-obsidian/40 backdrop-blur-sm flex items-center justify-center overflow-hidden perspective-[1000px]">

            {/* Central Text */}
            <div className="absolute z-20 text-center pointer-events-none mix-blend-difference">
                <h2 className="text-6xl md:text-9xl font-black text-white/10 tracking-tighter">STACK</h2>
            </div>

            {/* 3D Orbit System (Scaled down on mobile) */}
            <div id="orbitSystem"
                className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] transform-style-3d scale-75 md:scale-100 transition-transform duration-500">

                {/* Core */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white shadow-[0_0_100px_rgba(255,255,255,0.5)] z-10 animate-pulse flex items-center justify-center">
                    <span className="font-bold text-black tracking-widest text-xs">AETHER</span>
                </div>

                {/* Ring 1 */}
                <div
                    className="orbit-ring-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-cyan-500/30">
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-900 border border-cyan-500 flex items-center justify-center text-[10px] text-cyan-500 font-mono">
                        RCT</div>
                    <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-zinc-900 border border-cyan-500 flex items-center justify-center text-[10px] text-cyan-500 font-mono">
                        TS</div>
                </div>

                {/* Ring 2 */}
                <div
                    className="orbit-ring-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-violet-500/30">
                    <div
                        className="absolute left-0 top-1/2 -rotate-90 -translate-x-1/2 w-10 h-10 rounded-full bg-zinc-900 border border-violet-500 flex items-center justify-center text-[10px] text-violet-500 font-mono">
                        NEXT</div>
                    <div
                        className="absolute right-0 top-1/2 rotate-90 translate-x-1/2 w-10 h-10 rounded-full bg-zinc-900 border border-violet-500 flex items-center justify-center text-[10px] text-violet-500 font-mono">
                        NODE</div>
                </div>

                {/* Ring 3 */}
                <div
                    className="orbit-ring-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-fuchsia-500/30">
                    <div
                        className="absolute top-[15%] left-[15%] w-6 h-6 rounded-full bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,1)]">
                    </div>
                    <div
                        className="absolute bottom-[15%] right-[15%] w-6 h-6 rounded-full bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,1)]">
                    </div>
                </div>
            </div>

        </section>

        {/* 6. TESTIMONIALS: Depth Cards */}
        <section id="testimonials"
            className="relative min-h-[80vh] py-32 bg-obsidian/40 backdrop-blur-sm flex items-center overflow-hidden">

            {/* Background Grid (Rotated) */}
            <div className="absolute inset-0 bg-grid-vertical opacity-10 rotate-12 scale-150 transform-origin-center"></div>

            <div
                className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Text Side */}
                <div>
                    <h2 className="text-2xl md:text-5xl font-black text-platinum tracking-tighter uppercase mb-8">
                        DATA <br /><span
                            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-500">RESONANCE</span>
                    </h2>
                    <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-sm">
                        Feedback from the digital frontier. Our partners demand precision, and we deliver bespoke
                        architectures that scale infinitely.
                    </p>
                </div>

                {/* Parallax Cards Container */}
                <div className="relative h-[400px] perspective-[1000px]">

                    {/* Card 1 (Back) */}
                    <div
                        className="testimonial-card absolute top-8 right-0 md:top-0 md:right-0 w-full md:w-[80%] bg-zinc-900/60 backdrop-blur-md border border-white/5 p-8 rounded-2xl transform translate-z-[-100px] opacity-40 scale-90">
                        <p className="text-sm text-gray-400 font-mono italic mb-4">"Aether rewired our entire digital
                            nervous system. The speed is terrifying."</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                            <div>
                                <p className="text-xs font-bold text-white">CTO, Nexus Corp</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 (Middle) */}
                    <div
                        className="testimonial-card absolute top-12 right-0 md:top-[10%] md:right-[10%] w-full md:w-[80%] bg-zinc-900/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl transform translate-z-[-50px] opacity-70 scale-95 shadow-xl">
                        <p className="text-sm text-gray-300 font-mono italic mb-4">"Pure architectural elegance. They don't
                            just write code; they compose it."</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                            <div>
                                <p className="text-xs font-bold text-white">Director, Vertex AI</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 (Front - Active) */}
                    <div
                        className="testimonial-card active-card absolute top-16 right-0 md:top-[20%] md:right-[20%] w-full md:w-[80%] bg-zinc-900 border border-cyan-500/30 p-8 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.1)] transform translate-z-[0px] opacity-100 z-20">
                        <p className="text-lg text-platinum font-bold tracking-tight mb-6">"Operating at this level requires
                            absolute precision. Aether delivered a platform that feels alive."</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full"></div>
                            <div>
                                <p className="text-sm font-bold text-white">Sarah Jenkins</p>
                                <p className="text-[10px] text-cyan-400 font-mono">VP Product, Sypher Dynamics</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* 7. WARP SPEED CTA: The Launch */}
        <section id="cta" className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">

            {/* Canvas layer for explosion */}
            <canvas id="warpCanvas" className="absolute inset-0 pointer-events-none z-0"></canvas>

            <div className="relative z-10 text-center">
                <p className="text-xs font-mono text-cyan-500 mb-4 tracking-[0.3em]">SYSTEM READY</p>
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-12">
                    INITIATE<br />SEQUENCE
                </h2>

                {/* Warp Button */}
                <button id="warpBtn"
                    className="group relative w-64 h-64 rounded-full border border-white/10 bg-black flex items-center justify-center overflow-hidden transition-all duration-300 active:scale-95 select-none touch-none">
                    {/* Progress Ring */}
                    <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="#333" strokeWidth="1" />
                        <circle id="warpProgress" cx="50" cy="50" r="48" fill="none" stroke="#06b6d4" strokeWidth="2"
                            strokeDasharray="301" strokeDashoffset="301"
                            className="transition-all duration-75 ease-linear" />
                    </svg>

                    {/* Center Text */}
                    <div className="relative z-10 flex flex-col items-center group-hover:scale-110 transition-transform">
                        <span className="text-xs font-mono text-gray-500 mb-1 pointer-events-none">HOLD TO</span>
                        <span className="text-xl font-bold text-white tracking-widest pointer-events-none">LAUNCH</span>
                    </div>

                    {/* Inner Glow */}
                    <div
                        className="absolute inset-0 bg-cyan-500/10 rounded-full scale-0 group-active:scale-100 transition-transform duration-500 blur-xl">
                    </div>
                </button>
            </div>
        </section>

        {/* FOOTER */}
        

    
      </main>

      <Footer />
    </div>
  );
};

export default Agency;
