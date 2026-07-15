import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Kinetic Manifesto (Split & Skew Reveal)
      gsap.set("#manifesto-top", { yPercent: 100, opacity: 0, skewY: 10 });
      gsap.set("#manifesto-bottom", { yPercent: -100, opacity: 0, skewY: -10 });

      const manifestoTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "center center",
          scrub: 1,
        }
      });

      manifestoTl
        .to("#manifesto-top", { yPercent: 0, opacity: 1, skewY: 0, duration: 1, ease: "power2.out" })
        .to("#manifesto-bottom", { yPercent: 0, opacity: 1, skewY: 0, duration: 1, ease: "power2.out" }, "<")
        .to("#manifesto-line", { width: "300px", opacity: 1, duration: 1 }, "<0.2");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[50vh] flex flex-col items-center justify-center bg-obsidian overflow-hidden py-32"
      id="manifesto-section"
    >
      <div className="absolute inset-0 bg-grid-vertical opacity-10"></div>
      <div className="max-w-[1600px] mx-auto px-6 w-full text-center relative z-10 flex flex-col items-center justify-center gap-0">
        
        {/* Top Half */}
        <div className="overflow-hidden">
          <h2
            className="text-[11vw] leading-[0.8] font-black uppercase text-white mix-blend-difference transform translate-y-[0%]"
            id="manifesto-top"
          >
            HUMAN INTENT
          </h2>
        </div>

        {/* Center Line (Expands) */}
        <div className="h-[1px] w-0 bg-white opacity-50 my-2" id="manifesto-line"></div>

        {/* Bottom Half */}
        <div className="overflow-hidden">
          <h2
            className="text-[11vw] leading-[0.8] font-black uppercase text-gray-500 mix-blend-difference transform translate-y-[0%]"
            id="manifesto-bottom"
          >
            MACHINE PRECISION
          </h2>
        </div>

      </div>
      <div className="absolute bottom-10 text-xs font-mono text-gray-600 animate-pulse">SCROLL TO MERGE</div>
    </section>
  );
};

export default Manifesto;
