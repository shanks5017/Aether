import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textLine1Ref = useRef<HTMLDivElement>(null);
  const textLine2Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a parallax effect where the text comes together or moves at different rates
      
      // "READY TO" moves down slightly
      gsap.fromTo(textLine1Ref.current,
        { y: -50 },
        {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true
          }
        }
      );

      // "SCALE?" moves up slightly (faster convergence)
      gsap.fromTo(textLine2Ref.current,
        { y: 50 },
        {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true
          }
        }
      );

      // Button floats independently
      gsap.fromTo(buttonRef.current,
        { y: 100 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.5 // Extra smooth lag
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="relative z-10 min-h-screen flex flex-col justify-between bg-obsidian pt-24 pb-8 px-6 md:px-12 overflow-hidden border-t border-white/5">
      
      {/* Massive CTA */}
      <div className="flex-1 flex flex-col items-center justify-center w-full relative">
         <div className="flex flex-col items-center justify-center leading-none mb-12 select-none pointer-events-none">
            <div ref={textLine1Ref} className="will-change-transform">
                <span className="text-[12vw] font-light text-white tracking-tighter block">READY TO</span>
            </div>
            <div ref={textLine2Ref} className="will-change-transform">
                {/* Changed from text-outline to solid gray as requested */}
                <span className="text-[12vw] font-black text-neutral-800 tracking-tighter block">SCALE?</span>
            </div>
         </div>

         <div ref={buttonRef} className="will-change-transform">
            <a href="contact.html" className="inline-block">
                <MagneticButton className="group relative px-12 py-6 md:px-16 md:py-8 bg-white rounded-full text-black">
                    <span className="text-sm md:text-base font-bold uppercase tracking-widest">
                    Start Your Project
                    </span>
                </MagneticButton>
            </a>
         </div>
      </div>

      {/* Footer Info */}
      <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-end gap-8 pt-12 border-t border-white/10 text-xs font-mono text-gray-500 uppercase tracking-widest">
        <div>
           © 2025 Aether Agency. All Rights Reserved.
        </div>

        <ul className="flex gap-8">
            <li><a href="#" className="hover:text-white transition-colors duration-300">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">LinkedIn</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;