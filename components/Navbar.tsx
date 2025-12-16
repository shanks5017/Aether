import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'work', label: 'Work' },
    { id: 'agency', label: 'Agency' }
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    
    // Update Hash (Triggers App.tsx listener)
    if (id === 'home') {
       window.history.pushState(null, '', ' '); // Clear hash for home
       // Manually set view if hash doesn't trigger
       setView('home');
    } else {
       window.location.hash = id;
    }

    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      // Close animation
      tlRef.current?.reverse();
      setIsMobileMenuOpen(false);
      document.body.style.overflow = 'auto';
    } else {
      // Open animation
      setIsMobileMenuOpen(true);
      document.body.style.overflow = 'hidden';
      
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(menuRef.current, {
        x: '0%',
        duration: 0.8,
        ease: 'power4.inOut'
      })
      .fromTo(linksRef.current?.children || [], 
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out'
        },
        "-=0.4"
      );
    }
  };

  // Helper to determine active state
  const isActive = (id: string) => currentView === id;

  return (
    <>
      <nav 
        id="main-nav"
        className="fixed top-0 left-0 w-full z-[1000] px-6 md:px-12 py-6 md:py-8 flex justify-between items-center transition-all duration-700 ease-in-out pointer-events-auto bg-transparent"
      >
        {/* Logo */}
        <div className="flex-1 relative z-[1002]">
           <a 
             href="#"
             onClick={(e) => handleNavClick(e, 'home')}
             className="text-xl md:text-2xl font-bold tracking-[0.2em] text-white cursor-pointer hover:opacity-80 transition-opacity"
           >
             AETHER
           </a>
        </div>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 relative z-[1001]">
             {navItems.map((item) => (
               <a 
                 key={item.id}
                 href={`#${item.id}`}
                 onClick={(e) => handleNavClick(e, item.id)}
                 className={`relative group py-2 block cursor-pointer ${isActive(item.id) ? 'text-white' : ''}`}
               >
                 <div className="relative overflow-hidden">
                   <div className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      {item.label}
                   </div>
                   <div className="absolute top-0 left-0 w-full block transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0 text-white">
                      {item.label}
                   </div>
                 </div>
                 <span 
                   className={`absolute bottom-1 left-0 w-full h-[1px] bg-white transform transition-transform duration-300 ease-out 
                     ${isActive(item.id) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left'}
                   `}
                 ></span>
               </a>
             ))}
        </div>

        {/* Mobile Toggle & Desktop CTA */}
        <div className="flex-1 flex justify-end items-center relative z-[1002]">
          
          {/* Mobile "Glass Pill" Toggle */}
          <div className={`md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             <button 
                onClick={toggleMobileMenu}
                className="group relative px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 overflow-hidden transition-all duration-300 active:scale-95"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Menu</span>
                <div className="flex flex-col gap-[4px] items-end">
                    <span className="h-[1px] bg-white w-5 group-hover:w-3 transition-all duration-300 ease-out"></span>
                    <span className="h-[1px] bg-white w-3 group-hover:w-5 transition-all duration-300 ease-out"></span>
                </div>
              </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a href="contact.html" className="inline-block">
                <MagneticButton className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                   <span className="text-[10px] font-bold uppercase tracking-widest">Let's Talk</span>
                </MagneticButton>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay (Glassmorphic) */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-[1001] bg-obsidian/90 backdrop-blur-xl w-full h-screen transform translate-x-full md:hidden flex flex-col pt-32 px-8"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-[0.05] pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={toggleMobileMenu}
          className="absolute top-6 right-6 z-[1003] p-4 text-white hover:rotate-90 transition-transform duration-500 ease-out"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
        
        <div ref={linksRef} className="flex flex-col items-start gap-8 relative z-10 relative z-10">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Navigation</span>
          
          {navItems.map((item, index) => (
             <a 
               key={item.id}
               href={`#${item.id}`}
               onClick={(e) => handleNavClick(e, item.id)}
               className={`text-5xl font-light uppercase tracking-tight hover:text-white transition-colors relative z-10
                 ${isActive(item.id) ? 'text-white italic' : 'text-gray-400'}
               `}
             >
               <span className="text-sm font-mono mr-6 align-top opacity-30 inline-block -translate-y-2">0{index + 1}</span>
               {item.label}
             </a>
           ))}
        </div>

        <div className="mt-auto mb-12 w-full relative z-10">
            <div className="w-full h-[1px] bg-white/10 mb-8"></div>
            <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Start a project</span>
                <a 
                    href="contact.html"
                    className="text-sm font-bold uppercase tracking-widest text-black bg-white px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
                >
                    Let's Talk
                </a>
            </div>
            <div className="mt-8 text-[10px] text-gray-700 font-mono tracking-widest uppercase text-center">
                © Aether Agency 2025
            </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;