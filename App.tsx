import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import NoiseOverlay from './components/NoiseOverlay';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Expertise from './components/Expertise';
import Work from './components/Work';
import Agency from './components/Agency';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [view, setView] = useState('home');

  useEffect(() => {
    // Initialize Lenis for smooth scrolling - Heavy Landing Config
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Sync Lenis with GSAP ScrollTrigger
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

  // Hash Navigation Handler
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews = ['home', 'expertise', 'work', 'agency'];
      
      if (validViews.includes(hash)) {
        setView(hash);
      } else if (hash === '' || hash === 'top') {
        setView('home');
      }
    };

    // Check on initial load
    handleHashChange();

    // Listen for hash changes (Back button, manual URL change)
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Force scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="bg-obsidian text-platinum min-h-screen w-full relative overflow-x-hidden">
      {/* Background Layers */}
      <NoiseOverlay />
      <div className="fixed inset-0 z-0 bg-grid-vertical pointer-events-none opacity-20"></div>
      
      {/* Navigation */}
      <Navbar currentView={view} setView={setView} />

      {/* Main Content Router */}
      <main className="relative z-10 flex flex-col w-full min-h-screen">
        {view === 'home' && <Home />}
        {view === 'expertise' && <Expertise />}
        {view === 'work' && <Work />}
        {view === 'agency' && <Agency />}
      </main>
    </div>
  );
};

export default App;