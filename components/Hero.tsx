import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // "The Landing" - Entry Animation
      const tl = gsap.timeline();
      
      // Animate the entire container "touching down"
      // Starts large and high, settles to normal size and position
      if (textContainerRef.current) {
          tl.fromTo(textContainerRef.current, 
            { y: -100, scale: 1.15, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 2.2,
              ease: "expo.out" // Fast approach, very slow "flare" finish
            }
          );
      }

      // Subtext and Chevron fade in late
      const subtext = textContainerRef.current?.querySelector('p');
      if(subtext) {
        tl.from(subtext, {
          y: 20,
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out'
        }, "-=1.0");
      }

      tl.from(chevronRef.current, {
        y: -10,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      }, "-=0.5");

      // Parallax Effect on Scroll
      gsap.to(textContainerRef.current, {
        yPercent: 50, // Move slower than scroll (parallax)
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] md:min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-0 md:pt-24 overflow-hidden">
      
      <div ref={textContainerRef} className="z-10 flex flex-col items-center text-center will-change-transform">
        
        {/* Main Title Stack */}
        <div className="flex flex-col leading-[0.85] font-black uppercase tracking-tighter text-platinum">
          <div className="overflow-hidden py-1">
            <h1 className="text-[12vw] md:text-[11vw]">WE BUILD</h1>
          </div>
          <div className="overflow-hidden py-1">
            <h1 className="text-[12vw] md:text-[11vw] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10">
              DIGITAL
            </h1>
          </div>
          <div className="overflow-hidden py-1">
            <h1 className="text-[12vw] md:text-[11vw]">LEGACIES</h1>
          </div>
        </div>

        {/* Subtext */}
        <div className="mt-8 md:mt-12 max-w-lg md:max-w-xl">
          <p className="text-gray-400 text-xs md:text-sm font-medium tracking-[0.2em] uppercase leading-relaxed text-center">
            Hand-coded excellence for brands that demand distinction
          </p>
        </div>

      </div>

      {/* Chevron Down */}
      <div ref={chevronRef} className="absolute bottom-12 z-10 animate-bounce opacity-50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white">
          <path d="M6 9L12 15L18 9" />
        </svg>
      </div>

    </section>
  );
};

export default Hero;