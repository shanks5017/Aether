import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DataFlow: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const flowLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const flowLine = flowLineRef.current;
      if (flowLine) {
        const length = flowLine.getTotalLength();
        gsap.set(flowLine, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(flowLine, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-[80vh] bg-obsidian relative overflow-hidden py-32 flex flex-col items-center justify-center">
      <div className="text-center z-10 mb-20">
        <span className="text-xs font-mono text-cyan-500 tracking-widest uppercase mb-4 block">Central Intelligence</span>
        <h2 className="text-5xl md:text-7xl font-light text-white">DATA ORCHESTRATION</h2>
      </div>

      {/* Animated SVG Route */}
      <div className="relative w-full max-w-4xl h-[400px] z-10">
        <svg width="100%" height="100%" viewBox="0 0 1000 400" fill="none" className="overflow-visible">
          {/* Background Line */}
          <path d="M50,200 C250,200 250,50 500,50 C750,50 750,350 950,200" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          
          {/* Animated Line */}
          <path 
            ref={flowLineRef} 
            id="flow-line" 
            d="M50,200 C250,200 250,50 500,50 C750,50 750,350 950,200" 
            stroke="#06b6d4" 
            strokeWidth="4" 
            strokeLinecap="round" 
          />

          {/* Nodes */}
          <circle cx="50" cy="200" r="8" fill="#111" stroke="#fff" strokeWidth="2" className="flow-node" />
          <circle cx="500" cy="50" r="12" fill="#111" stroke="#06b6d4" strokeWidth="2" className="flow-node shadow-[0_0_20px_#06b6d4]" />
          <circle cx="950" cy="200" r="8" fill="#111" stroke="#fff" strokeWidth="2" className="flow-node" />
        </svg>
      </div>
    </section>
  );
};

export default DataFlow;
