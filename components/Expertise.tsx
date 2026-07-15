import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const Expertise: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Kinetic Hero Animation
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#expertise-hero",
          start: "bottom center",
          end: "bottom top",
          scrub: 1
        }
      });

      // Initial Intro
      gsap.to("#system-text", { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power4.out", delay: 0.2 });
      gsap.to("#logic-text", { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power4.out", delay: 0.4 });
      gsap.to("#hero-line", { height: "48px", duration: 1, ease: "expo.out", delay: 0.8 });
      gsap.to("#scroll-hint", { opacity: 1, duration: 1, delay: 1 });

      heroTl
        .to("#hero-line", { height: 0, opacity: 0, duration: 0.2 })
        .to("#scroll-hint", { opacity: 0, duration: 0.2 }, "<")
        .to({}, { duration: 0.3 })
        .to("#data-beam", { height: "50vh", duration: 0.5, ease: "power2.in" }, "<")
        .to("#system-text", {
          xPercent: -40,
          yPercent: -20,
          opacity: 0,
          filter: "blur(20px)",
          scale: 1.1,
          duration: 1
        }, "split")
        .to("#logic-text", {
          xPercent: 40,
          yPercent: 20,
          opacity: 0,
          filter: "blur(20px)",
          scale: 1.1,
          duration: 1
        }, "split");

      // 2. Sentience Node Animation
      gsap.timeline({
        scrollTrigger: {
          trigger: "#sentience-node",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })
        .to(".node-ring", { rotation: 360, duration: 1, stagger: 0.1, transformOrigin: "50% 50%" })
        .to(".node-core", { rotation: -360, scale: 0.5, duration: 1, transformOrigin: "50% 50%" }, "<")
        .fromTo(".node-axis", { scale: 0.5, opacity: 0 }, { scale: 1.2, opacity: 1, duration: 1, transformOrigin: "50% 50%" }, "<");

      // 3. Service Cards Animation
      const cards = document.querySelectorAll('.service-card-section');
      cards.forEach((card) => {
        const texts = card.querySelectorAll('.animate-text');
        gsap.from(texts, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        });

        const glow = card.querySelector('.mouse-glow');
        if (glow) {
          card.addEventListener('mousemove', (e: any) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(glow, {
              x: x - 300,
              y: y - 300,
              duration: 1.5,
              ease: "power3.out"
            });
          });
        }
      });

      // 4. Tilt Effect
      document.querySelectorAll('.perspective-container').forEach((container) => {
        const card = container.querySelector('.tilt-card');
        if (card) {
          container.addEventListener('mousemove', (e: any) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -2;
            const rotateY = ((x - centerX) / centerX) * 2;

            gsap.to(card, {
              rotationX: rotateX,
              rotationY: rotateY,
              duration: 1,
              ease: "power2.out",
              transformPerspective: 1000
            });
          });

          container.addEventListener('mouseleave', () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              duration: 1,
              ease: "power2.out"
            });
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="service-card-stack relative w-full pt-16">
      
      {/* KINETIC HERO (Vandslab Style Refined) */}
      <section
        className="h-[100vh] flex flex-col items-center justify-center bg-obsidian relative overflow-hidden text-center"
        id="expertise-hero">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z\' fill=\'%23ffffff\' fillOpacity=\'0.05\' fillRule=\'evenodd\'/%3E%3C/svg%3E')] opacity-10"></div>

        {/* Overlapping Centered Typography */}
        <div className="relative z-10 flex flex-col items-center justify-center">

          {/* SYSTEM */}
          <div className="relative mix-blend-difference mb-[-8vw] md:mb-[-6vw] z-20 overflow-hidden">
            <h1 className="text-[18vw] leading-none font-black tracking-tighter text-white perspective-text opacity-0 transform translate-y-full blur-xl"
              id="system-text">
              SYSTEM
            </h1>
          </div>

          {/* LOGIC */}
          <div className="relative mix-blend-difference z-10 overflow-hidden">
            <h1 className="text-[18vw] leading-none font-black tracking-tighter text-gray-500 perspective-text opacity-0 transform -translate-y-full blur-xl"
              id="logic-text">
              LOGIC
            </h1>
          </div>

        </div>

        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 mix-blend-difference z-30">
          <div className="w-[1px] h-0 bg-white" id="hero-line"></div>
          {/* Data Beam Connector */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1px] bg-cyan-500/50 h-[0vh] z-0"
            id="data-beam"></div>
          <span className="text-[10px] font-mono text-gray-400 tracking-[0.3em] uppercase opacity-0"
            id="scroll-hint">Scroll to Decode</span>
        </div>
      </section>

      {/* SENTIENCE NODE (Bridge Section) */}
      <section className="min-h-[40vh] flex flex-col items-center justify-center bg-obsidian relative z-[5]"
        id="sentience-node">
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
          {/* Animated Rings SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-50 mix-blend-screen" id="node-svg">
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.5" fill="none" className="node-ring" />
            <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="0.5" fill="none" className="node-ring"
              style={{ opacity: 0.6 }} />
            <circle cx="50" cy="50" r="25" stroke="white" strokeWidth="0.5" fill="none" className="node-ring"
              style={{ opacity: 0.4 }} />
            <path d="M50 5 L50 95 M5 50 L95 50" stroke="white" strokeWidth="0.2" className="node-axis" />
            <rect x="35" y="35" width="30" height="30" stroke="white" strokeWidth="0.5" fill="none"
              className="node-core" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[10px] font-mono text-cyan-500 tracking-widest animate-pulse">AETHER_CORE::ONLINE</span>
          </div>
        </div>
      </section>


      {/* CARD 1: DIGITAL ARCHITECTURE (Cyan) */}
      <section
        className="sticky top-0 h-[100svh] w-full bg-obsidian border-t border-white/10 z-10 flex flex-col justify-center overflow-hidden service-card-section perspective-container">
        <div className="absolute inset-0 pointer-events-none">
          {/* Mouse Follow Blob */}
          <div
            className="mouse-glow absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ease-out">
          </div>
        </div>

        <div
          className="max-w-[1600px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 relative z-10 h-full items-center tilt-card">
          {/* Left: Number */}
          <div
            className="flex flex-col justify-center h-full border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 card-content-left">
            <span className="text-[15vw] md:text-[12vw] font-black text-white/15 leading-none select-none">01</span>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center card-content-right">
            <h2
              className="animate-text text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-8 leading-tight">
              Immersive<br /><span className="text-cyan-400">Engineering</span>
            </h2>
            <p className="animate-text text-gray-400 text-lg md:text-2xl font-light leading-relaxed max-w-xl mb-12">
              Beyond static pages. We architect bespoke digital realities where seamless performance meets
              fluid motion, creating living environments that feel instantaneous and responsive.
            </p>

            <div className="animate-text flex flex-wrap gap-4">
              <span
                className="px-6 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-none">React</span>
              <span
                className="px-6 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-none">WebGL</span>
              <span
                className="px-6 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-none">Next.js</span>
            </div>
          </div>
        </div>
      </section>

      {/* CARD 2: VISUAL IDENTITY (Violet) */}
      <section
        className="sticky top-0 h-[100svh] w-full bg-obsidian border-t border-white/10 z-20 flex flex-col justify-center overflow-hidden service-card-section perspective-container">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="mouse-glow absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ease-out">
          </div>
        </div>

        <div
          className="max-w-[1600px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 relative z-10 h-full items-center tilt-card">
          <div
            className="flex flex-col justify-center h-full border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 card-content-left">
            <span className="text-[15vw] md:text-[12vw] font-black text-white/15 leading-none select-none">02</span>
          </div>
          <div className="flex flex-col justify-center card-content-right">
            <h2
              className="animate-text text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-8 leading-tight">
              Aesthetic<br /><span className="text-violet-400">Intelligence</span>
            </h2>
            <p className="animate-text text-gray-400 text-lg md:text-2xl font-light leading-relaxed max-w-xl mb-12">
              Identity is influence. We synthesize color, type, and motion into a commanding visual dialect
              that elevates your perceived value and distances you from competition.
            </p>
            <div className="animate-text flex flex-wrap gap-4">
              <span
                className="px-6 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-none">Generative
                AI</span>
              <span
                className="px-6 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-none">Vector
                Logic</span>
              <span
                className="px-6 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-none">Motion</span>
            </div>
          </div>
        </div>
      </section>

      {/* CARD 3: NARRATIVE STRATEGY (Orange) */}
      <section
        className="sticky top-0 h-[100svh] w-full bg-obsidian border-t border-white/10 z-30 flex flex-col justify-center overflow-hidden service-card-section perspective-container">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="mouse-glow absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ease-out">
          </div>
        </div>

        <div
          className="max-w-[1600px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 relative z-10 h-full items-center tilt-card">
          <div
            className="flex flex-col justify-center h-full border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 card-content-left">
            <span className="text-[15vw] md:text-[12vw] font-black text-white/15 leading-none select-none">03</span>
          </div>
          <div className="flex flex-col justify-center card-content-right">
            <h2
              className="animate-text text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-8 leading-tight">
              Cognitive<br /><span className="text-orange-400">Design</span>
            </h2>
            <p className="animate-text text-gray-400 text-lg md:text-2xl font-light leading-relaxed max-w-xl mb-12">
              Strategy that resonates. We distill complex value propositions into clear, potent narratives
              that bypass friction and connect directly with your audience's internal drivers.
            </p>
            <div className="animate-text flex flex-wrap gap-4">
              <span
                className="px-6 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-none">LLM
                Tuning</span>
              <span
                className="px-6 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-none">Semantic
                Analysis</span>
            </div>
          </div>
        </div>
      </section>

      {/* CARD 4: SEARCH ECOLOGY (Emerald) */}
      <section
        className="sticky top-0 h-[100svh] w-full bg-obsidian border-t border-white/10 z-40 flex flex-col justify-center overflow-hidden service-card-section perspective-container">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="mouse-glow absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ease-out">
          </div>
        </div>

        <div
          className="max-w-[1600px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 relative z-10 h-full items-center tilt-card">
          <div
            className="flex flex-col justify-center h-full border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 card-content-left">
            <span className="text-[15vw] md:text-[12vw] font-black text-white/15 leading-none select-none">04</span>
          </div>
          <div className="flex flex-col justify-center card-content-right">
            <h2
              className="animate-text text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-8 leading-tight">
              Algorithmic<br /><span className="text-emerald-400">Authority</span>
            </h2>
            <p className="animate-text text-gray-400 text-lg md:text-2xl font-light leading-relaxed max-w-xl mb-12">
              Visibility by design. We calibrate your technical foundations to speak the native language of
              search engines, securing organic supremacy through pure performance and structure.
            </p>
            <div className="animate-text flex flex-wrap gap-4">
              <span
                className="px-6 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-none">Core
                Web Vitals</span>
              <span
                className="px-6 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-none">Schema</span>
            </div>
          </div>
        </div>
      </section>

      {/* THE ARSENAL (Tech Stack) */}
      <section className="relative z-50 bg-neutral-900 py-32 px-6 md:px-12 overflow-hidden border-t-2 border-white/10">
        <div className="max-w-[1600px] mx-auto mb-16">
          <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">The Arsenal</h2>
          <h3 className="text-5xl font-light text-white">COMMAND LINE READY.</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10">
          {/* Grid Items */}
          {[
            { id: '01', title: 'React 19', desc: 'Concurrent UI framework', color: 'cyan' },
            { id: '02', title: 'TypeScript', desc: 'Type-safe development', color: 'violet' },
            { id: '03', title: 'Node.js', desc: 'Server-side runtime', color: 'emerald' },
            { id: '04', title: 'Python', desc: 'AI & data processing', color: 'orange' },
            { id: '05', title: 'WebGL', desc: '3D graphics rendering', color: 'pink' },
            { id: '06', title: 'GSAP', desc: 'Premium animations', color: 'yellow' },
            { id: '07', title: 'MongoDB', desc: 'NoSQL database', color: 'green' },
            { id: '08', title: 'Docker', desc: 'Containerization', color: 'blue' }
          ].map((tech) => (
            <div
              key={tech.id}
              className="tech-item aspect-square bg-obsidian p-6 flex flex-col justify-between relative overflow-hidden cursor-pointer group">
              <div
                className={`absolute inset-0 bg-gradient-to-br from-${tech.color}-500/0 to-${tech.color}-500/0 group-hover:from-${tech.color}-500/20 group-hover:to-transparent transition-all duration-700 pointer-events-none`}>
              </div>
              <span
                className="text-xs font-mono opacity-50 group-hover:opacity-100 transition-opacity relative z-10">{tech.id}</span>
              <div className="relative z-10">
                <span
                  className="text-xl font-bold block group-hover:scale-110 transition-transform duration-500 ease-out">{tech.title}</span>
                <p
                  className="text-xs font-mono text-gray-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out mt-2">
                  {tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Expertise;