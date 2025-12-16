import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

import { MagneticButtonProps } from '../types';

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', onClick, strength = 30 }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    if (!button || !text) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(button, {
        x: x * 0.2, // Move container slightly
        y: y * 0.2,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.to(text, {
        x: x * 0.1, // Move text less for parallax feel
        y: y * 0.1,
        duration: 1,
        ease: 'power3.out'
      });
    };

    const handleMouseEnter = () => {
        gsap.to(button, {
            scale: 1.1,
            duration: 0.5,
            ease: 'power3.out'
        });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      });
      
      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full transition-colors ${className}`}
    >
      <span ref={textRef} className="relative z-10 pointer-events-none block">
        {children}
      </span>
    </button>
  );
};

export default MagneticButton;