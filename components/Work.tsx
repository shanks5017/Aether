import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: 1, 
    name: "Aether Finance", 
    category: "Fintech", 
    subcategory: "Web Architecture",
    image: "https://placehold.co/1920x1080/111111/444444?text=Aether+Finance" 
  },
  { 
    id: 2, 
    name: "Lumina Gallery", 
    category: "Art Direction", 
    subcategory: "3D Interaction",
    image: "https://placehold.co/1920x1080/1a1a1a/555555?text=Lumina+Gallery" 
  },
  { 
    id: 3, 
    name: "Nexus AI", 
    category: "SaaS", 
    subcategory: "Product Design",
    image: "https://placehold.co/1920x1080/0f0f0f/666666?text=Nexus+AI" 
  }
];

const Work: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      const chars = titleRef.current?.querySelectorAll('.hero-char');
      if (chars) {
        gsap.from(chars, {
          y: 150,
          rotate: 5,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.15
        });
      }

      gsap.from(".hero-sub", {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.5
      });

      // Project Parallax
      const cards = document.querySelectorAll('.project-card');
      const isMobile = window.innerWidth < 768;

      cards.forEach(card => {
          const img = card.querySelector('.project-img');
          
          if (!isMobile && img) {
              gsap.to(img, {
                  yPercent: 15,
                  ease: "none",
                  scrollTrigger: {
                      trigger: card,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: true
                  }
              });
          }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full pt-24 md:pt-40 min-h-screen bg-obsidian text-platinum">
        
        {/* Page Header */}
        <div className="px-6 md:px-12 mb-20 md:mb-32">
            <div className="flex flex-col items-start justify-center">
                <h1 ref={titleRef} className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                    <div className="overflow-hidden"><span className="hero-char block origin-bottom-left">Selected</span></div>
                    <div className="overflow-hidden"><span className="hero-char block origin-bottom-left text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Work</span></div>
                </h1>
                <p className="hero-sub opacity-0 text-xs sm:text-sm md:text-base font-mono text-gray-400 max-w-xl leading-relaxed uppercase tracking-widest">
                    A curated archive of digital architecture and visual identity systems.
                </p>
            </div>
        </div>

        {/* Gallery */}
        <div className="px-6 md:px-12 space-y-20 md:space-y-48 pb-20">
            {projects.map((project) => (
                <div key={project.id} className="project-card group w-full cursor-pointer">
                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-white/5 border border-white/5">
                        <img 
                          src={project.image}
                          alt={project.name}
                          className="project-img absolute inset-0 w-full h-[115%] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out will-change-transform"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-8 border-b border-white/10 pb-6">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-light uppercase tracking-tight group-hover:text-white text-gray-300 transition-colors">
                            {project.name}
                        </h2>
                        <div className="flex gap-4 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">
                            <span>{project.category}</span>
                            <span>•</span>
                            <span>{project.subcategory}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <Footer />
    </div>
  );
};

export default Work;