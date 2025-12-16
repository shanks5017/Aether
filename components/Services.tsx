import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Bespoke Digital Architecture",
    description: "We reject templates. We engineer bespoke digital environments where every pixel serves a purpose and every interaction is calculated for impact.",
    focus: "Web Design",
    color: "rgba(6,182,212,0.15)" // Cyan
  },
  {
    id: "02",
    title: "Visual Identity Systems",
    description: "A brand is more than a logo. We forge complete visual ecosystems—from typography to color theory—that command market authority.",
    focus: "Branding",
    color: "rgba(124,58,237,0.15)" // Violet
  },
  {
    id: "03",
    title: "Narrative & Content Strategy",
    description: "Words that convert. We craft your verbal identity and editorial content to resonate with human psychology and drive action.",
    focus: "Copywriting",
    color: "rgba(249,115,22,0.15)" // Orange
  },
  {
    id: "04",
    title: "Search Ecology & Performance",
    description: "Visibility is engineering. We optimize Core Web Vitals and structure semantic data to ensure your site dominates search rankings.",
    focus: "SEO",
    color: "rgba(16,185,129,0.15)" // Green
  }
];

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Animation for the list items
      const items = listRef.current?.children;
      if (items) {
        gsap.fromTo(items, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Cursor Logic (Desktop Only essentially via CSS pointer-events but handled here)
      const cursor = cursorRef.current;
      const container = containerRef.current;
      
      if (cursor && container) {
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

        const onMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          // Only track if inside container vertically
          if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
             xTo(e.clientX - rect.left);
             yTo(e.clientY - rect.top);
          }
        };
        
        const onEnter = () => {
          gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
        };
        
        const onLeave = () => {
          gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
        };

        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseenter', onEnter);
        container.addEventListener('mouseleave', onLeave);

        return () => {
          container.removeEventListener('mousemove', onMove);
          container.removeEventListener('mouseenter', onEnter);
          container.removeEventListener('mouseleave', onLeave);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 py-20 md:py-32 bg-obsidian cursor-none overflow-hidden">
      
      {/* Scoped Custom Cursor - Hidden on Touch devices via media query typically, but pointer-events-none helps */}
      <div 
        ref={cursorRef}
        className="pointer-events-none absolute top-0 left-0 z-50 w-20 h-20 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center opacity-0 scale-0"
      >
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center backdrop-blur-md mix-blend-exclusion">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" className="transform -rotate-45">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-12 md:mb-20 border-b border-white/10 pb-4 md:pb-6 flex justify-between items-end">
          <h2 className="text-xs md:text-sm font-mono text-gray-500 uppercase tracking-widest">
            Our Expertise
          </h2>
          <span className="hidden md:block text-xs text-gray-700 font-mono">
            EST. 2025
          </span>
        </div>

        {/* Hover Accordion List */}
        <div ref={listRef} className="flex flex-col">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group relative border-b border-white/10 transition-all duration-500 hover:border-white/30"
            >
              {/* Aurora Gradient Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at center, ${service.color}, transparent 60%)`,
                  filter: 'blur(60px)',
                  transform: 'translateZ(0)'
                }}
              />

              <div className="relative z-10 py-10 md:py-16 px-2 md:px-8 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                {/* Index Number */}
                <span className="text-xs md:text-lg font-mono text-gray-600 group-hover:text-white/80 transition-colors duration-500 w-12">
                  {service.id}
                </span>

                <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight text-gray-500 group-hover:text-white md:group-hover:translate-x-4 transition-all duration-500 ease-out origin-left">
                      {service.title}
                    </h3>

                    {/* Accordion Content */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                      <div className="overflow-hidden">
                        <div className="pt-6 md:pt-8 md:pl-4 lg:pl-6 max-w-2xl">
                          <p className="text-base md:text-xl text-gray-400 font-light leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                            {service.description}
                          </p>
                          <div className="mt-4 md:mt-6 flex items-center gap-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                             <div className="h-[1px] w-6 md:w-8 bg-white/30"></div>
                             <span className="text-[10px] md:text-xs font-bold text-white/50 uppercase tracking-widest">
                               Focus: {service.focus}
                             </span>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;