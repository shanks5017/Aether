import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const textLine1Ref = useRef<HTMLHeadingElement>(null);
  const textLine2Ref = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax text
      gsap.fromTo(textLine1Ref.current,
        { y: -30 },
        { y: 30, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom bottom", scrub: true } }
      );
      gsap.fromTo(textLine2Ref.current,
        { y: 30 },
        { y: -30, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom bottom", scrub: true } }
      );
      gsap.fromTo(buttonRef.current,
        { y: 60 },
        { y: 0, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom bottom", scrub: 1.5 } }
      );

      // 3D Tilt Logic
      const footer = containerRef.current;
      const footerContent = contentWrapperRef.current;

      if (footer && footerContent) {
        const handleMouseMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2;
          const y = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(footerContent, {
            rotationY: x * 10,
            rotationX: -y * 10,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out"
          });

          // Magnetic button effect within footer
          if (buttonRef.current) {
            const rect = footer.getBoundingClientRect();
            const btnX = e.clientX - rect.left - rect.width / 2;
            const btnY = e.clientY - rect.top - rect.height / 2;

            gsap.to(buttonRef.current, {
              x: btnX * 0.15,
              y: btnY * 0.15,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to(footerContent, {
            rotationY: 0,
            rotationX: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)"
          });

          if (buttonRef.current) {
            gsap.to(buttonRef.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
          }
        };

        footer.addEventListener('mousemove', handleMouseMove);
        footer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          footer.removeEventListener('mousemove', handleMouseMove);
          footer.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="relative min-h-screen bg-obsidian z-50 flex flex-col justify-between overflow-hidden footer-3d-stage perspective-[1000px]">

      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,255,0.05),transparent_60%)]">
        </div>
      </div>

      <div ref={contentWrapperRef} className="flex-1 flex flex-col items-center justify-center relative z-10 footer-content-wrapper transform-style-3d">
        <div className="group relative cursor-pointer text-center">
          <h2
            ref={textLine1Ref}
            className="footer-text-1 text-[15vw] font-black tracking-tighter leading-[0.85] text-transparent stroke-text transition-all duration-700 group-hover:text-white/10 mix-blend-overlay select-none">
            READY
          </h2>
          <h2
            ref={textLine2Ref}
            className="footer-text-2 text-[15vw] font-black tracking-tighter leading-[0.85] text-white select-none relative z-10 text-glow">
            TO BUILD?
          </h2>

          {/* Floating Action Button */}
          <Link to="/contact"
            ref={buttonRef}
            className="footer-btn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center magnetic-btn hover:scale-110 transition-transform duration-500 z-20 mix-blend-difference">
            <span className="text-black font-black uppercase tracking-widest text-sm md:text-base animate-pulse">Let's
              Talk</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center md:items-end px-6 md:px-12 py-12 border-t border-white/10 relative z-20 bg-obsidian gap-8 md:gap-0">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold tracking-widest text-white mb-2">AETHER</h3>
          <p className="text-xs text-gray-500 font-mono">BESPOKE DIGITAL ARCHITECTS</p>
        </div>
        <div className="text-center md:text-right">
          <div className="flex gap-6 justify-center md:justify-end mb-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <a href="https://www.linkedin.com/in/shashank-tareehal" target="_blank" rel="noreferrer"
              className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://x.com/Shashank_5017" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter / X</a>
            <a href="https://www.instagram.com/shashank_5017/" target="_blank" rel="noreferrer"
              className="hover:text-white transition-colors">Instagram</a>
          </div>
          <p className="text-[10px] text-gray-600 font-mono mb-1">SYSTEM_STATUS: [OFFLINE]</p>
          <p className="text-[10px] text-gray-700 font-mono">&copy; 2025 AETHER AGENCY.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;