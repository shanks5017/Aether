import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const aetherRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  let state = 'default';

  useEffect(() => {
    setMounted(true);
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const aether = aetherRef.current;
    const shape = shapeRef.current;
    if (!dot || !ring || !aether || !shape) return;

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });
    gsap.set(aether, { xPercent: -50, yPercent: -50, width: 12, height: 12, rotation: 45 });
    gsap.set(shape, { borderRadius: 0, backgroundColor: "white", border: "none" });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    const xAether = gsap.quickTo(aether, "x", { duration: 0.1, ease: "power3" });
    const yAether = gsap.quickTo(aether, "y", { duration: 0.1, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      xAether(e.clientX);
      yAether(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const interactiveSelectors = "a, button, .cursor-pointer, .tag-btn, input, textarea, .project-card, .tech-item";

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      
      // 1. Interactive dot-ring
      if (target.closest(interactiveSelectors)) {
        gsap.to(dot, { scale: 0, opacity: 0 });
        gsap.to(ring, { scale: 1.5, backgroundColor: "rgba(255, 255, 255, 0.2)", borderColor: "transparent" });
      }

      // 2. Polymorphic shape
      if (['p', 'h1', 'h2', 'h3', 'span', 'li', 'label'].includes(tagName) || target.closest('p, h1, h2, h3, span')) {
          if (state !== 'text') {
              gsap.to(aether, { width: 2, height: 30, rotation: 0, duration: 0.4, ease: "power3.out" });
              gsap.to(shape, { borderRadius: 0, backgroundColor: "white", border: "none", duration: 0.4 });
              state = 'text';
          }
      } else if (tagName === 'img' || target.closest('.project-card') || target.closest('.service-card')) {
          if (state !== 'lens') {
              gsap.to(aether, { width: 80, height: 80, rotation: 0, duration: 0.4, ease: "back.out(1.7)" });
              gsap.to(shape, { borderRadius: 0, backgroundColor: "transparent", border: "1px solid white", duration: 0.4 });
              state = 'lens';
          }
      } else if (tagName === 'a' || tagName === 'button' || target.closest('a') || target.closest('button')) {
          if (state !== 'button') {
              gsap.to(aether, { width: 40, height: 40, rotation: 0, duration: 0.4, ease: "power3.out" });
              gsap.to(shape, { borderRadius: "50%", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.5)", duration: 0.4 });
              state = 'button';
          }
          
          const btn = target.closest('a') || target.closest('button');
          if (btn && !btn.classList.contains('magnetic-btn')) {
              const moveBtn = (evt: MouseEvent) => {
                  const rect = btn.getBoundingClientRect();
                  const relX = evt.clientX - (rect.left + rect.width / 2);
                  const relY = evt.clientY - (rect.top + rect.height / 2);
                  gsap.to(btn, { x: relX * 0.2, y: relY * 0.2, duration: 0.5 });
              };
              const resetBtn = () => {
                  gsap.to(btn, { x: 0, y: 0, duration: 0.5 });
                  btn.removeEventListener('mousemove', moveBtn as EventListener);
                  btn.removeEventListener('mouseleave', resetBtn);
              };
              btn.addEventListener('mousemove', moveBtn as EventListener);
              btn.addEventListener('mouseleave', resetBtn);
          }
      } else {
          if (state !== 'default') {
              gsap.to(aether, { width: 12, height: 12, rotation: 45, duration: 0.4, ease: "power3.out" });
              gsap.to(shape, { borderRadius: 0, backgroundColor: "white", border: "none", duration: 0.4 });
              state = 'default';
          }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelectors)) {
        gsap.to(dot, { scale: 1, opacity: 1 });
        gsap.to(ring, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(255, 255, 255, 0.8)" });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div ref={aetherRef} className="aether-cursor">
        <div ref={shapeRef} className="cursor-shape"></div>
      </div>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={ringRef} className="cursor-ring"></div>
    </>,
    document.body
  );
};

export default CustomCursor;
