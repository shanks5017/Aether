import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class TextScramble {
  el: HTMLElement;
  chars: string;
  queue: any[];
  frame: number;
  frameRequest: number;
  resolve: any;

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.queue = [];
    this.frame = 0;
    this.frameRequest = 0;
    this.update = this.update.bind(this);
  }

  setText(newText: string) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);

    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="opacity-50 text-green-500">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      if (textContainerRef.current) {
          tl.fromTo(textContainerRef.current, 
            { y: -100, scale: 1.15, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 2.2,
              ease: "expo.out"
            }
          );
      }

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

      // Text Scramble Effect
      tl.call(() => {
        const phrases = [
          { id: 'scramble-1', text: 'WE BUILD' },
          { id: 'scramble-2', text: 'DIGITAL' },
          { id: 'scramble-3', text: 'LEGACIES' }
        ];
        phrases.forEach((p, i) => {
          const el = document.getElementById(p.id);
          if (el) {
            el.style.opacity = '1';
            const fx = new TextScramble(el);
            setTimeout(() => { fx.setText(p.text); }, i * 200);
          }
        });
      }, undefined, "-=1.5");

      gsap.to(textContainerRef.current, {
        yPercent: 50,
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
      
      <div ref={textContainerRef} className="hero-content z-10 flex flex-col items-center text-center will-change-transform">
        
        <div className="flex flex-col leading-[0.95] md:leading-[0.85] font-black uppercase tracking-tighter text-platinum mix-blend-difference">
          <div className="overflow-hidden py-1">
            <h1 id="scramble-1" className="text-[12vw] md:text-[11vw] opacity-0">WE BUILD</h1>
          </div>
          <div className="overflow-hidden py-1">
            <h1 id="scramble-2" className="text-[12vw] md:text-[11vw] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10 opacity-0">
              DIGITAL
            </h1>
          </div>
          <div className="overflow-hidden py-1">
            <h1 id="scramble-3" className="text-[12vw] md:text-[11vw] opacity-0">LEGACIES</h1>
          </div>
        </div>

        <div className="mt-8 md:mt-12 max-w-lg md:max-w-xl hero-sub opacity-0">
          <p className="text-gray-400 text-xs md:text-sm font-medium tracking-[0.2em] uppercase leading-relaxed text-center">
            Hand-coded excellence for brands that demand distinction
          </p>
        </div>

      </div>

      <div ref={chevronRef} className="absolute bottom-12 z-10 animate-bounce opacity-0 hero-sub">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white">
          <path d="M6 9L12 15L18 9" />
        </svg>
      </div>

    </section>
  );
};

export default Hero;