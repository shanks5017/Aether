/// <reference types="vite/client" />
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Footer from './Footer';

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Modal State & Refs
  const modalTerminalRef = useRef<HTMLDivElement>(null);
  const modalHeadlineRef = useRef<HTMLHeadingElement>(null);
  const modalBodyRef = useRef<HTMLParagraphElement>(null);
  const modalFooterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger Animation on Load
      gsap.from(".stagger-in", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
      });

      // Budget auto-select from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const budgetParam = urlParams.get('budget');
      if (budgetParam) {
        if (budgetParam === 'starter') setBudget('Starter (<20k)');
        if (budgetParam === 'growth') setBudget('Growth (20k-70k)');
        if (budgetParam === 'enterprise') setBudget('Enterprise (>1L)');
        
        // Scroll to form smoothly
        setTimeout(() => {
            const formSection = document.getElementById('intake-form');
            if (formSection) {
              formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrambleText = (element: HTMLElement, finalText: string, duration = 1000) => {
    const chars = 'ABCDEF0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        const ratio = progress / duration;
        const revealLength = Math.floor(finalText.length * ratio);

        const scrambled = finalText
          .split('')
          .map((char, index) => {
            if (index < revealLength) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        element.innerText = scrambled;
        requestAnimationFrame(animate);
      } else {
        element.innerText = finalText;
      }
    };
    requestAnimationFrame(animate);
  };

  const openModal = (status: 'success' | 'error') => {
    setSubmitStatus(status);
    
    setTimeout(() => {
        if (!modalTerminalRef.current || !modalHeadlineRef.current || !modalBodyRef.current || !modalFooterRef.current) return;

        let headlineText = "";

        if (status === 'success') {
            headlineText = "[ TRANSMISSION: RECEIVED ]";
        } else {
            headlineText = "// ERROR: SIGNAL DISRUPTED";
        }

        // Animate Terminal Entrance
        gsap.fromTo(modalTerminalRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        );

        // Run Scramble Effect
        setTimeout(() => {
            scrambleText(modalHeadlineRef.current!, headlineText);
        }, 200);

        // Stagger Content
        gsap.fromTo([modalBodyRef.current, modalFooterRef.current],
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, delay: 0.4, ease: "power2.out" }
        );
    }, 50);
  };

  const closeModal = () => {
    if(!modalTerminalRef.current) return;
    gsap.to(modalTerminalRef.current, {
      scaleX: 0.1,
      scaleY: 0.01,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => {
        setSubmitStatus('idle');
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name,
          email,
          project_type: projectType,
          budget,
          message
        })
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message);

      openModal('success');
      
      // Reset form
      setName('');
      setEmail('');
      setProjectType('');
      setBudget('');
      setMessage('');

    } catch (err) {
      console.error('Submission Error:', err);
      openModal('error');
    } finally {
        setTimeout(() => {
            setIsSubmitting(false);
        }, 3000);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-obsidian text-platinum pt-24 pb-0">
        <main className="max-w-5xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            
            {/* Left Column: Intelligence */}
            <div className="flex flex-col">
                <div className="mb-12 stagger-in">
                <p className="text-cyan-500 font-mono text-xs md:text-sm tracking-widest uppercase mb-4">// SECURE CHANNEL</p>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1.1] text-white">
                    Initiate<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600">Project</span>
                </h1>
                </div>

                <div className="space-y-8 max-w-sm stagger-in">
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                    Enter your parameters below. Our architects review all serious inquiries within 24 standard earth hours. 
                </p>
                <div className="border-l-2 border-white/10 pl-6 py-2">
                    <p className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">Direct Line</p>
                    <a href="mailto:shashankmtareehal@gmail.com" className="text-lg font-bold text-white hover:text-cyan-400 transition-colors">shashankmtareehal@gmail.com</a>
                </div>
                <div className="border-l-2 border-white/10 pl-6 py-2">
                    <p className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">Base of Operations</p>
                    <p className="text-lg font-bold text-white">Bangalore, IN</p>
                </div>
                </div>
            </div>

            {/* Right Column: Form Terminal */}
            <div className="relative stagger-in">
                {/* Decorative border */}
                <div className="absolute -inset-4 md:-inset-8 border border-white/5 rounded-2xl pointer-events-none hidden md:block">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30"></div>
                </div>

                <form id="intake-form" onSubmit={handleSubmit} className="space-y-12 relative z-10">
                
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                    <input type="text" id="name" required value={name} onChange={e => setName(e.target.value)} placeholder=" "
                        className="floating-input w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder-transparent" />
                    <label htmlFor="name" className="absolute left-0 top-3 text-gray-500 text-sm transition-all pointer-events-none">Name</label>
                    </div>
                    <div className="relative">
                    <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder=" "
                        className="floating-input w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder-transparent" />
                    <label htmlFor="email" className="absolute left-0 top-3 text-gray-500 text-sm transition-all pointer-events-none">Email Address</label>
                    </div>
                </div>

                {/* Project Type */}
                <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Project Type</label>
                    <div className="flex flex-wrap gap-3">
                    {['Web Design', 'Branding', 'SEO', 'Full Ecosystem'].map(type => (
                        <button key={type} type="button" onClick={() => setProjectType(type)}
                        className={`tag-btn px-4 py-2 border rounded-full text-xs font-bold uppercase tracking-widest transition-all ${projectType === type ? 'bg-white text-black border-white' : 'border-white/20 text-gray-300 hover:border-white/50'}`}>
                        {type}
                        </button>
                    ))}
                    </div>
                </div>

                {/* Budget */}
                <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Budget Range</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                        { label: 'Starter (₹3,999)', value: 'Starter' },
                        { label: 'Standard (₹7,999)', value: 'Standard' },
                        { label: 'Premium (₹14,999)', value: 'Premium' }
                    ].map(b => (
                        <button key={b.value} type="button" onClick={() => setBudget(b.value)}
                        className={`tag-btn px-4 py-3 border rounded-lg text-xs font-bold uppercase tracking-widest transition-all text-center ${budget === b.value ? 'bg-white text-black border-white' : 'border-white/20 text-gray-300 hover:border-white/50'}`}>
                        {b.label}
                        </button>
                    ))}
                    </div>
                </div>

                {/* Message */}
                <div className="relative">
                    <textarea id="message" rows={3} value={message} onChange={e => setMessage(e.target.value)} placeholder=" "
                    className="floating-input w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder-transparent resize-none"></textarea>
                    <label htmlFor="message" className="absolute left-0 top-3 text-gray-500 text-sm transition-all pointer-events-none">Tell us about the project...</label>
                </div>

                {/* Submit */}
                <button type="submit" disabled={isSubmitting}
                    className={`w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] transition-all duration-300 transform rounded-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gradient-to-r hover:from-white hover:to-gray-300 active:scale-[0.99]'}`}>
                    {isSubmitting ? 'TRANSMITTING...' : 'Initiate Project'}
                </button>

                </form>
            </div>
            </div>

        </main>

        <Footer />

        {/* TERMINAL MODAL */}
        {submitStatus !== 'idle' && (
            <div className="modal-backdrop active fixed inset-0 z-[9999] bg-obsidian/80 backdrop-blur-md flex items-center justify-center">
                <div ref={modalTerminalRef} className={`modal-terminal w-[90%] max-w-[600px] bg-charcoal border p-12 relative overflow-hidden ${submitStatus === 'success' ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]'}`}>
                    
                    <div className="scanline absolute top-0 left-0 w-full h-[2px] bg-white/50 opacity-50 pointer-events-none" style={{animation: 'scan 2s linear infinite'}}></div>

                    <div className="modal-content text-left space-y-6">
                        <h2 ref={modalHeadlineRef} className={`text-2xl md:text-3xl font-black font-mono uppercase tracking-tighter ${submitStatus === 'success' ? 'text-cyan-400' : 'text-red-500'}`}>
                            {/* Scrambled JS Text */}
                        </h2>
                        
                        <p ref={modalBodyRef} className="text-gray-400 font-mono text-sm leading-relaxed border-l-2 border-white/10 pl-4">
                            {submitStatus === 'success' 
                                ? "Your signal has successfully reached the Aether core. Like elegant code finding its perfect execution path, your message resonated with us. Our architects are analyzing the data and will initialize a connection sequence shortly."
                                : "An anomaly interrupted the transmission protocol. The void swallowed the data packet this time. Do not abandon hope; alternate communication frequencies are open."
                            }
                        </p>
                        
                        <div ref={modalFooterRef} className="pt-4">
                            {submitStatus === 'success' ? (
                                <button onClick={() => window.location.href = '/'} className="btn-action w-full py-3 font-bold font-mono text-sm uppercase tracking-widest transition-all text-center block cursor-pointer bg-cyan-900/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/40">
                                    ACKNOWLEDGE
                                </button>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">[ ESTABLISH ALTERNATE CONNECTION ]</span>
                                    <div className="flex gap-6 text-2xl">
                                        <a href="https://www.linkedin.com/in/shashank-tareehal" target="_blank" rel="noreferrer" className="social-icon text-gray-400 hover:text-white transition-colors"><i className="fab fa-linkedin"></i></a>
                                        <a href="https://www.instagram.com/shashank_5017/" target="_blank" rel="noreferrer" className="social-icon text-gray-400 hover:text-white transition-colors"><i className="fab fa-instagram"></i></a>
                                        <a href="https://x.com/Shashank_5017" target="_blank" rel="noreferrer" className="social-icon text-gray-400 hover:text-white transition-colors"><i className="fab fa-twitter"></i></a>
                                        <button onClick={closeModal} className="ml-auto text-xs font-mono text-red-500 hover:text-red-400 underline">CLOSE</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <style>{`
                    @keyframes scan {
                        0% { top: 0%; opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { top: 100%; opacity: 0; }
                    }
                    .social-icon:hover {
                        animation: pulseColor 1s infinite;
                    }
                    @keyframes pulseColor {
                        0% { transform: scale(1); filter: brightness(1); }
                        50% { transform: scale(1.1); filter: brightness(1.5); }
                        100% { transform: scale(1); filter: brightness(1); }
                    }
                    .floating-input:focus~label,
                    .floating-input:not(:placeholder-shown)~label {
                        top: -0.5rem;
                        font-size: 0.75rem;
                        color: #9ca3af;
                    }
                `}</style>
            </div>
        )}
    </div>
  );
};

export default Contact;
