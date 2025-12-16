import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const Agency: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Fade In
      gsap.from(".hero-fade", {
        y: 30,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Pricing Cards Stagger
      gsap.from(".pricing-card", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".pricing-grid",
          start: "top 80%"
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full pt-24 md:pt-40 min-h-screen bg-obsidian text-platinum">
        
        {/* Hero Section: Philosophy */}
        <section className="px-6 md:px-12 mb-20 md:mb-32 flex flex-col items-center text-center">
            <h1 className="hero-fade text-3xl sm:text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[1.1] md:leading-tight mb-6 md:mb-8 max-w-5xl">
                We Build Intelligent<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Brand Ecosystems</span>
            </h1>
            <p className="hero-fade text-xs sm:text-sm md:text-lg font-mono text-gray-400 max-w-xs sm:max-w-2xl leading-relaxed mx-auto">
                Aether is where data meets design intuition. We reject templates to engineer bespoke digital architectures for brands that demand distinction.
            </p>
        </section>

        {/* Pricing Models */}
        <section className="px-6 md:px-12 mb-20 md:mb-32">
            <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                
                {/* Card 1: Starter */}
                <div className="pricing-card relative p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm flex flex-col hover:border-white/20 transition-colors order-2 md:order-1">
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest mb-2 text-gray-300">Starter Presence</h3>
                    <p className="text-xs font-mono text-gray-500 mb-6 md:mb-8">For local brands & creators.</p>
                    <div className="text-3xl font-light mb-6 md:mb-8">₹14,999</div>
                    
                    <ul className="flex-1 space-y-4 mb-8 text-sm text-gray-400 font-light">
                        <li className="flex items-start gap-3"><span className="text-white">●</span> 3–5 Page Custom Hybrid Site</li>
                        <li className="flex items-start gap-3"><span className="text-white">●</span> Basic Brand Identity</li>
                        <li className="flex items-start gap-3"><span className="text-white">●</span> Copywriting (5 Sections)</li>
                        <li className="flex items-start gap-3"><span className="text-white">●</span> SEO-Ready Structure</li>
                        <li className="flex items-start gap-3"><span className="text-white">●</span> WhatsApp Integration</li>
                    </ul>

                    <button className="w-full py-4 border border-white/20 rounded-lg uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
                        Select Starter
                    </button>
                </div>

                {/* Card 2: Brand Experience (Featured) */}
                <div className="pricing-card relative p-6 md:p-8 rounded-2xl border border-white/20 bg-white/[0.05] backdrop-blur-md flex flex-col transform md:-translate-y-4 shadow-[0_0_50px_rgba(124,58,237,0.1)] order-1 md:order-2">
                    {/* Violet Glow */}
                    <div className="absolute inset-0 bg-violet-500/10 blur-3xl -z-10 rounded-2xl pointer-events-none"></div>
                    
                    <div className="absolute top-0 right-0 px-4 py-1 bg-violet-500/20 text-violet-300 text-[10px] font-bold uppercase tracking-widest rounded-bl-lg rounded-tr-lg">
                        Recommended
                    </div>

                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest mb-2 text-white">Brand Experience</h3>
                    <p className="text-xs font-mono text-violet-200/70 mb-6 md:mb-8">For growing businesses.</p>
                    <div className="text-4xl font-light mb-6 md:mb-8 text-white">₹34,999</div>
                    
                    <ul className="flex-1 space-y-4 mb-8 text-sm text-gray-300 font-light">
                        <li className="flex items-start gap-3"><span className="text-violet-400">●</span> 7–10 Page Bespoke Site</li>
                        <li className="flex items-start gap-3"><span className="text-violet-400">●</span> Full Identity System</li>
                        <li className="flex items-start gap-3"><span className="text-violet-400">●</span> Strategic Copywriting</li>
                        <li className="flex items-start gap-3"><span className="text-violet-400">●</span> Advanced On-Page SEO</li>
                        <li className="flex items-start gap-3"><span className="text-violet-400">●</span> 1 Month Maintenance</li>
                    </ul>

                    <button className="w-full py-4 bg-white text-black rounded-lg uppercase text-xs font-bold tracking-widest hover:bg-gray-200 transition-colors shadow-lg">
                        Start Transformation
                    </button>
                </div>

                {/* Card 3: Complete Ecosystem */}
                <div className="pricing-card relative p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm flex flex-col hover:border-white/20 transition-colors order-3">
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest mb-2 text-gray-300">Complete Ecosystem</h3>
                    <p className="text-xs font-mono text-gray-500 mb-6 md:mb-8">For market domination.</p>
                    <div className="text-3xl font-light mb-6 md:mb-8">₹69,999</div>
                    
                    <ul className="flex-1 space-y-4 mb-8 text-sm text-gray-400 font-light">
                        <li className="flex items-start gap-3"><span className="text-white">●</span> Full Branding Suite</li>
                        <li className="flex items-start gap-3"><span className="text-white">●</span> 10–15 Page Custom Site</li>
                        <li className="flex items-start gap-3"><span className="text-white">●</span> CMS Integration</li>
                        <li className="flex items-start gap-3"><span className="text-white">●</span> Advanced SEO & Analytics</li>
                        <li className="flex items-start gap-3"><span className="text-white">●</span> Conversion Landing Pages</li>
                    </ul>

                    <button className="w-full py-4 border border-white/20 rounded-lg uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
                        Go Dominant
                    </button>
                </div>

            </div>
        </section>

        {/* Add-Ons Section */}
        <section className="px-6 md:px-12 mb-32">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-xs md:text-sm font-mono text-gray-500 uppercase tracking-widest mb-8 text-center md:text-left">
                    Expansion Packs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-white/5 p-6 rounded-lg flex justify-between items-center hover:bg-white/5 transition-colors">
                        <div>
                            <h4 className="font-bold text-gray-300 uppercase text-xs md:text-sm">Maintenance</h4>
                            <p className="text-[10px] md:text-xs text-gray-500 font-mono mt-1">Updates & Backups</p>
                        </div>
                        <span className="text-sm font-light">₹2,999/mo</span>
                    </div>

                    <div className="border border-white/5 p-6 rounded-lg flex justify-between items-center hover:bg-white/5 transition-colors">
                        <div>
                            <h4 className="font-bold text-gray-300 uppercase text-xs md:text-sm">SEO Retainer</h4>
                            <p className="text-[10px] md:text-xs text-gray-500 font-mono mt-1">Link optimization & Reporting</p>
                        </div>
                        <span className="text-sm font-light">₹4,999/mo</span>
                    </div>

                    <div className="border border-white/5 p-6 rounded-lg flex justify-between items-center hover:bg-white/5 transition-colors">
                        <div>
                            <h4 className="font-bold text-gray-300 uppercase text-xs md:text-sm">Copy Upgrade</h4>
                            <p className="text-[10px] md:text-xs text-gray-500 font-mono mt-1">Human-edited depth</p>
                        </div>
                        <span className="text-sm font-light">₹3,999</span>
                    </div>

                    <div className="border border-white/5 p-6 rounded-lg flex justify-between items-center hover:bg-white/5 transition-colors">
                        <div>
                            <h4 className="font-bold text-gray-300 uppercase text-xs md:text-sm">E-Commerce</h4>
                            <p className="text-[10px] md:text-xs text-gray-500 font-mono mt-1">Shopify/Stripe Setup</p>
                        </div>
                        <span className="text-sm font-light">₹9,999</span>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </div>
  );
};

export default Agency;