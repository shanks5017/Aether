import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import NoiseOverlay from './components/NoiseOverlay';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Expertise from './components/Expertise';
import Work from './components/Work';
import Agency from './components/Agency';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const { pathname } = useLocation();
  const currentView = pathname.replace('/', '') || 'home';

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Navbar Scroll Logic
    const handleScroll = () => {
      const nav = document.getElementById('main-nav');
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('py-3', 'bg-obsidian/70', 'backdrop-blur-md', 'border-b', 'border-white/10');
          nav.classList.remove('py-8', 'bg-transparent');
        } else {
          nav.classList.add('py-8', 'bg-transparent');
          nav.classList.remove('py-3', 'bg-obsidian/70', 'backdrop-blur-md', 'border-b', 'border-white/10');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-obsidian text-platinum min-h-screen w-full relative overflow-x-hidden">
      <CustomCursor />
      <ScrollToTop />
      {/* Background Layers */}
      <NoiseOverlay />
      <div className="fixed inset-0 z-0 bg-grid-vertical pointer-events-none opacity-20"></div>
      
      {/* Navigation */}
      <Navbar currentView={currentView} setView={() => {}} />

      {/* Main Content Router */}
      <main className="relative z-10 flex flex-col w-full min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/work" element={<Work />} />
          <Route path="/agency" element={<Agency />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;