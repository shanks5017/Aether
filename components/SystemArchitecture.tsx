import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SystemArchitecture: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rolesTrack = trackRef.current;
      if (rolesTrack) {
        gsap.to(rolesTrack, {
          x: () => -(rolesTrack.scrollWidth - document.documentElement.clientWidth) - 50,
          ease: "none",
          scrollTrigger: {
            trigger: "#roles-pin",
            pin: true,
            scrub: 1,
            start: "center center",
            end: () => "+=" + (rolesTrack.scrollWidth * 0.8),
            anticipatePin: 1
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="roles-wrapper" className="relative bg-obsidian py-32 overflow-hidden border-t border-white/10">
      <div className="absolute top-12 left-6 md:left-12 flex items-center gap-4">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
        <span className="text-xs font-mono text-red-500 uppercase tracking-widest">Live System Architecture</span>
      </div>

      <div className="sticky top-0 h-screen flex items-center overflow-hidden" id="roles-pin">
        <div ref={trackRef} className="flex gap-12 px-12 md:px-32 relative will-change-transform" id="roles-track">

          {/* Card 01: Architect */}
          <div className="role-card min-w-[350px] md:min-w-[450px] p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col justify-between hover:border-white/30 transition-colors group">
            <div>
              <span className="text-6xl font-light text-white/10 group-hover:text-white/30 transition-colors">01</span>
              <h3 className="mt-8 text-2xl font-bold uppercase tracking-wide text-white">AI System Architect</h3>
              <p className="mt-4 text-sm text-gray-400 font-mono leading-relaxed">Design overall AI-integrated system architecture and communication flow.</p>
            </div>
            <div className="mt-12 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-wider text-gray-500">Marketplace</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-wider text-gray-500">Scalability</span>
            </div>
          </div>

          {/* Card 02: Model Integrity */}
          <div className="role-card min-w-[350px] md:min-w-[450px] p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col justify-between hover:border-white/30 transition-colors group">
            <div>
              <span className="text-6xl font-light text-white/10 group-hover:text-white/30 transition-colors">02</span>
              <h3 className="mt-8 text-2xl font-bold uppercase tracking-wide text-white">AI Model Integration</h3>
              <p className="mt-4 text-sm text-gray-400 font-mono leading-relaxed">Implement and maintain all AI-powered components of the platform.</p>
            </div>
            <div className="mt-12 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-wider text-gray-500">Gemini API</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-wider text-gray-500">Contextual Data</span>
            </div>
          </div>

          {/* Card 03: Backend */}
          <div className="role-card min-w-[350px] md:min-w-[450px] p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col justify-between hover:border-white/30 transition-colors group">
            <div>
              <span className="text-6xl font-light text-white/10 group-hover:text-white/30 transition-colors">03</span>
              <h3 className="mt-8 text-2xl font-bold uppercase tracking-wide text-white">Backend Engineer</h3>
              <p className="mt-4 text-sm text-gray-400 font-mono leading-relaxed">Develop and maintain backend services for users, properties, and marketplace logic.</p>
            </div>
            <div className="mt-12 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-wider text-gray-500">GraphQL</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-wider text-gray-500">Auth</span>
            </div>
          </div>

          {/* Card 04: Database */}
          <div className="role-card min-w-[350px] md:min-w-[450px] p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col justify-between hover:border-white/30 transition-colors group">
            <div>
              <span className="text-6xl font-light text-white/10 group-hover:text-white/30 transition-colors">04</span>
              <h3 className="mt-8 text-2xl font-bold uppercase tracking-wide text-white">Database Engineer</h3>
              <p className="mt-4 text-sm text-gray-400 font-mono leading-relaxed">Design and optimize data storage systems with AI-assisted maintenance.</p>
            </div>
            <div className="mt-12 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-wider text-gray-500">Indexing</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-wider text-gray-500">Data Integrity</span>
            </div>
          </div>

          {/* Card 05: Matching System */}
          <div className="role-card min-w-[350px] md:min-w-[450px] p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col justify-between hover:border-white/30 transition-colors group">
            <div>
              <span className="text-6xl font-light text-white/10 group-hover:text-white/30 transition-colors">05</span>
              <h3 className="mt-8 text-2xl font-bold uppercase tracking-wide text-white">Matching System</h3>
              <p className="mt-4 text-sm text-gray-400 font-mono leading-relaxed">Develop AI-driven matching systems for connecting demands, entrepreneurs, and properties.</p>
            </div>
          </div>

          {/* Card 06: Product Analyst */}
          <div className="role-card min-w-[350px] md:min-w-[450px] p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col justify-between hover:border-white/30 transition-colors group">
            <div>
              <span className="text-6xl font-light text-white/10 group-hover:text-white/30 transition-colors">06</span>
              <h3 className="mt-8 text-2xl font-bold uppercase tracking-wide text-white">Product Analyst</h3>
              <p className="mt-4 text-sm text-gray-400 font-mono leading-relaxed">Monitor and analyze platform data using AI for insight generation.</p>
            </div>
          </div>

          {/* Card 07: Automation */}
          <div className="role-card min-w-[350px] md:min-w-[450px] p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col justify-between hover:border-white/30 transition-colors group">
            <div>
              <span className="text-6xl font-light text-white/10 group-hover:text-white/30 transition-colors">07</span>
              <h3 className="mt-8 text-2xl font-bold uppercase tracking-wide text-white">Automation Engineer</h3>
              <p className="mt-4 text-sm text-gray-400 font-mono leading-relaxed">Create automated workflows using tools or custom scripts.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SystemArchitecture;
