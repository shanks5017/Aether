import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const Expertise: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowBlobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Animation
      gsap.from(".header-animate", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.1
      });

      // 2. Background Color Shift & Section Animations
      const sections = document.querySelectorAll('.section-trigger');
      
      sections.forEach((section) => {
        // Color Shift
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
             const color = section.getAttribute('data-color');
             if(glowBlobRef.current) {
                gsap.to(glowBlobRef.current, { backgroundColor: color, opacity: 0.15, duration: 1.5, ease: "power2.out" });
             }
          },
          onEnterBack: () => {
             const color = section.getAttribute('data-color');
             if(glowBlobRef.current) {
                gsap.to(glowBlobRef.current, { backgroundColor: color, opacity: 0.15, duration: 1.5, ease: "power2.out" });
             }
          }
        });

        // Content Animations
        const leftElements = section.querySelectorAll('.animate-in');
        const rightElements = section.querySelectorAll('.animate-up');

        if(leftElements.length > 0) {
            gsap.fromTo(leftElements, 
              { x: -50, opacity: 0 },
              {
                x: 0, 
                opacity: 1, 
                stagger: 0.1, 
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                   trigger: section,
                   start: "top 70%"
                }
              }
            );
        }

        if(rightElements.length > 0) {
            gsap.fromTo(rightElements, 
              { y: 30, opacity: 0 },
              {
                y: 0, 
                opacity: 1, 
                stagger: 0.15, 
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                   trigger: section,
                   start: "top 60%"
                }
              }
            );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full pt-24 md:pt-40 min-h-screen">
        
        {/* Local Background Blob for this page */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
             <div ref={glowBlobRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full mix-blend-screen filter blur-[120px] opacity-10 transition-colors duration-1000 ease-in-out bg-cyan-500/10"></div>
        </div>

        {/* Page Header */}
        <div className="px-6 md:px-12 mb-20 md:mb-32 relative z-10">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
            <div className="overflow-hidden"><span className="header-animate block">Our</span></div>
            <div className="overflow-hidden"><span className="header-animate block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Expertise</span></div>
            </h1>
            <div className="header-animate mt-8 h-[1px] w-full bg-white/10"></div>
        </div>

        {/* Section 1: Bespoke Digital Architecture (Cyan) */}
        <section id="architecture" className="section-trigger relative flex flex-col md:flex-row border-t border-white/10 z-10" data-color="#06b6d4">
            {/* Sticky Left Column (Sticky only on desktop) */}
            <div className="w-full md:w-[40%] md:h-screen md:sticky md:top-0 p-6 md:p-12 flex flex-col justify-center border-b md:border-b-0 border-white/10 md:border-r bg-obsidian/80 backdrop-blur-sm z-10">
                <div className="text-xs font-mono text-cyan-400 mb-4 opacity-0 animate-in">01</div>
                <h2 className="text-3xl md:text-6xl font-light uppercase tracking-tight leading-none opacity-0 animate-in">
                    Bespoke<br/>Digital<br/>Architecture
                </h2>
            </div>
            {/* Scrollable Right Column */}
            <div className="w-full md:w-[60%] p-6 md:p-12 pt-12 md:pt-32 pb-20 md:pb-32 bg-obsidian/40 backdrop-blur-[2px]">
                <div className="max-w-2xl">
                    <div className="mb-12 md:mb-16 opacity-0 animate-up">
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">The Philosophy</h3>
                        <p className="text-lg md:text-3xl font-light leading-relaxed text-gray-200">
                            Code as art. We reject templates to engineer headless, component-driven architectures where every pixel serves a purpose and every interaction is calculated for impact.
                        </p>
                    </div>

                    <div className="mb-12 md:mb-16 opacity-0 animate-up">
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">The Architecture</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="border border-white/10 p-4 hover:bg-white/5 transition-colors duration-300">
                                <div className="text-cyan-400 mb-2">●</div>
                                <div className="font-medium text-sm">Cursor-Assisted Dev</div>
                            </li>
                            <li className="border border-white/10 p-4 hover:bg-white/5 transition-colors duration-300">
                                <div className="text-cyan-400 mb-2">●</div>
                                <div className="font-medium text-sm">React & Next.js</div>
                            </li>
                            <li className="border border-white/10 p-4 hover:bg-white/5 transition-colors duration-300">
                                <div className="text-cyan-400 mb-2">●</div>
                                <div className="font-medium text-sm">WebGL & GLSL Shaders</div>
                            </li>
                            <li className="border border-white/10 p-4 hover:bg-white/5 transition-colors duration-300">
                                <div className="text-cyan-400 mb-2">●</div>
                                <div className="font-medium text-sm">Headless CMS</div>
                            </li>
                        </ul>
                    </div>

                    <div className="opacity-0 animate-up">
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">Deliverables</h3>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 md:px-4 py-2 bg-white/5 rounded-full text-xs md:text-sm">High-Performance Landers</span>
                            <span className="px-3 md:px-4 py-2 bg-white/5 rounded-full text-xs md:text-sm">3D Web Experiences</span>
                            <span className="px-3 md:px-4 py-2 bg-white/5 rounded-full text-xs md:text-sm">Scalable Web Apps</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 2: Visual Identity Systems (Violet) */}
        <section id="identity" className="section-trigger relative flex flex-col md:flex-row border-t border-white/10 z-10" data-color="#7c3aed">
            <div className="w-full md:w-[40%] md:h-screen md:sticky md:top-0 p-6 md:p-12 flex flex-col justify-center border-b md:border-b-0 border-white/10 md:border-r bg-obsidian/80 backdrop-blur-sm z-10">
                <div className="text-xs font-mono text-violet-400 mb-4 opacity-0 animate-in">02</div>
                <h2 className="text-3xl md:text-6xl font-light uppercase tracking-tight leading-none opacity-0 animate-in">
                    Visual<br/>Identity<br/>Systems
                </h2>
            </div>
            <div className="w-full md:w-[60%] p-6 md:p-12 pt-12 md:pt-32 pb-20 md:pb-32 bg-obsidian/40 backdrop-blur-[2px]">
                <div className="max-w-2xl">
                    <div className="mb-12 md:mb-16 opacity-0 animate-up">
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">The Philosophy</h3>
                        <p className="text-lg md:text-3xl font-light leading-relaxed text-gray-200">
                            A brand is a living operating system. We forge complete visual ecosystems—from typography to color theory—that command market authority and define perception.
                        </p>
                    </div>

                    <div className="mb-12 md:mb-16 opacity-0 animate-up">
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">The Engine</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="border border-white/10 p-4 hover:bg-white/5 transition-colors duration-300">
                                <div className="text-violet-400 mb-2">●</div>
                                <div className="font-medium text-sm">Generative Visual Synthesis</div>
                            </li>
                            <li className="border border-white/10 p-4 hover:bg-white/5 transition-colors duration-300">
                                <div className="text-violet-400 mb-2">●</div>
                                <div className="font-medium text-sm">Vector Logic Systems</div>
                            </li>
                            <li className="border border-white/10 p-4 hover:bg-white/5 transition-colors duration-300">
                                <div className="text-violet-400 mb-2">●</div>
                                <div className="font-medium text-sm">Dynamic Typography</div>
                            </li>
                        </ul>
                    </div>

                    <div className="opacity-0 animate-up">
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">Deliverables</h3>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 md:px-4 py-2 bg-white/5 rounded-full text-xs md:text-sm">Logo Ecosystems</span>
                            <span className="px-3 md:px-4 py-2 bg-white/5 rounded-full text-xs md:text-sm">Motion Assets</span>
                            <span className="px-3 md:px-4 py-2 bg-white/5 rounded-full text-xs md:text-sm">Brand Guidelines</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 3: Narrative & Content Strategy (Orange) */}
        <section id="narrative" className="section-trigger relative flex flex-col md:flex-row border-t border-white/10 z-10" data-color="#f97316">
            <div className="w-full md:w-[40%] md:h-screen md:sticky md:top-0 p-6 md:p-12 flex flex-col justify-center border-b md:border-b-0 border-white/10 md:border-r bg-obsidian/80 backdrop-blur-sm z-10">
                <div className="text-xs font-mono text-orange-400 mb-4 opacity-0 animate-in">03</div>
                <h2 className="text-3xl md:text-6xl font-light uppercase tracking-tight leading-none opacity-0 animate-in">
                    Narrative &<br/>Content<br/>Strategy
                </h2>
            </div>
            <div className="w-full md:w-[60%] p-6 md:p-12 pt-12 md:pt-32 pb-20 md:pb-32 bg-obsidian/40 backdrop-blur-[2px]">
                <div className="max-w-2xl">
                    <div className="mb-12 md:mb-16 opacity-0 animate-up">
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">The Philosophy</h3>
                        <p className="text-lg md:text-3xl font-light leading-relaxed text-gray-200">
                            Verbal identity engineering. We use data-driven linguistics to craft copy that converts human psychology into revenue and drives action.
                        </p>
                    </div>

                    <div className="mb-12 md:mb-16 opacity-0 animate-up">
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">The Mechanics</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="border border-white/10 p-4 hover:bg-white/5 transition-colors duration-300">
                                <div className="text-orange-400 mb-2">●</div>
                                <div className="font-medium text-sm">LLM-Augmented Drafting</div>
                            </li>
                            <li className="border border-white/10 p-4 hover:bg-white/5 transition-colors duration-300">
                                <div className="text-orange-400 mb-2">●</div>
                                <div className="font-medium text-sm">Semantic Analysis</div>
                            </li>
                            <li className="border border-white/10 p-4 hover:bg-white/5 transition-colors duration-300">
                                <div className="text-orange-400 mb-2">●</div>
                                <div className="font-medium text-sm">Editorial Tuning</div>
                            </li>
                        </ul>
                    </div>

                    <div className="opacity-0 animate-up">
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">Deliverables</h3>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 md:px-4 py-2 bg-white/5 rounded-full text-xs md:text-sm">Brand Voice</span>
                            <span className="px-3 md:px-4 py-2 bg-white/5 rounded-full text-xs md:text-sm">Conversion Copy</span>
                            <span className="px-3 md:px-4 py-2 bg-white/5 rounded-full text-xs md:text-sm">Editorial Direction</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 4: Search Ecology (Green) */}
        <section id="seo" className="section-trigger relative flex flex-col md:flex-row border-t border-white/10 z-10" data-color="#10b981">
            <div className="w-full md:w-[40%] md:h-screen md:sticky md:top-0 p-6 md:p-12 flex flex-col justify-center border-b md:border-b-0 border-white/10 md:border-r bg-obsidian/80 backdrop-blur-sm z-10">
                <div className="text-xs font-mono text-emerald-400 mb-4 opacity-0 animate-in">04</div>
                <h2 className="text-3xl md:text-6xl font-light uppercase tracking-tight leading-none opacity-0 animate-in">
                    Search<br/>Ecology &<br/>Performance
                </h2>
            </div>
            <div className="w-full md:w-[60%] p-6 md:p-12 pt-12 md:pt-32 pb-20 md:pb-32 bg-obsidian/40 backdrop-blur-[2px]">
                <div className="max-w-2xl">
                    <div className="mb-12 md:mb-16 opacity-0 animate-up">
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">The Philosophy</h3>
                        <p className="text-lg md:text-3xl font-light leading-relaxed text-gray-200">
                            Dominance through data. We optimize Core Web Vitals and structure semantic pathways that ensure your site dominates global search rankings.
                        </p>
                    </div>

                    <div className="mb-12 md:mb-16 opacity-0 animate-up">
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">The Tactics</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="border border-white/10 p-4 hover:bg-white/5 transition-colors duration-300">
                                <div className="text-emerald-400 mb-2">●</div>
                                <div className="font-medium text-sm">Predictive Keyword Modeling</div>
                            </li>
                            <li className="border border-white/10 p-4 hover:bg-white/5 transition-colors duration-300">
                                <div className="text-emerald-400 mb-2">●</div>
                                <div className="font-medium text-sm">Semantic Schema</div>
                            </li>
                            <li className="border border-white/10 p-4 hover:bg-white/5 transition-colors duration-300">
                                <div className="text-emerald-400 mb-2">●</div>
                                <div className="font-medium text-sm">Web Vitals Optimization</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </div>
  );
};

export default Expertise;