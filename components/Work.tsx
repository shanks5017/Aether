import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const Work: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from('.hero-title', { opacity: 0, y: 100, duration: 1.5, ease: 'power4.out', delay: 0.5 });
      gsap.from('.subtitle', { opacity: 0, y: 50, duration: 1, delay: 1 });

      // Card Stacking Animation
      const cards = gsap.utils.toArray(".project-card") as HTMLElement[];

      cards.forEach((card, i) => {
        if (i !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            }
          });
        }
      });

      // Magnetic Button Logic (Projects)
      const projectLinks = document.querySelectorAll('.project-card a');
      projectLinks.forEach(link => {
        const btn = link.querySelector('.magnetic-btn');

        if (btn) {
          link.addEventListener('mousemove', (e: any) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
              x: x * 0.5,
              y: y * 0.5,
              duration: 0.4,
              ease: "power2.out"
            });
          });

          link.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const projectsData = [
    {
      num: "01",
      title1: "Bridge", title2: "Head",
      desc: "Revolutionizing B2B connections with a robust React & TypeScript architecture. A full-stack platform built for scalability and performance.",
      tags: ["React", "MongoDB", "TypeScript"],
      img: "/assets/images/img1.png",
      link: "https://github.com/shanks5017/Bridgehead.git",
      action: "View"
    },
    {
      num: "02",
      title1: "Foundry", title2: "Blog",
      desc: "Immersive reading experience crafted with Next.js. A minimalist aesthetic meeting maximum performance and readability.",
      tags: ["Next.js", "Tailwind"],
      img: "/assets/images/img2.png",
      link: "https://foundryblog.vercel.app/",
      action: "Read"
    },
    {
      num: "03",
      title1: "Aero", title2: "Calc",
      desc: "Real-time physics computations visualized in the browser. Where heavy mathematics meets elegant, interactive design.",
      tags: ["Physics", "WebGL"],
      img: "/assets/images/img3.png",
      link: "https://aerodynamics-calcy.vercel.app/",
      action: "Run"
    },
    {
      num: "04",
      title1: "Open", title2: "Source",
      desc: "Contributing to the global ecosystem. Building tools, fixing bugs, and driving technical innovation forward.",
      tags: ["Community", "DevTools"],
      img: "/assets/images/img4.png",
      link: "https://github.com/shanks5017",
      action: "Code"
    },
    {
      num: "05",
      title1: "Shanks", title2: "Works",
      desc: "The comprehensive showcase of development. You are experiencing it right now.",
      tags: ["Design", "Web"],
      img: "/assets/images/img5.png",
      link: "https://shanksportfolio.vercel.app/",
      action: "Visit"
    },
    {
      num: "06",
      title1: "Job", title2: "Hiest",
      desc: "A modern platform connecting top talent with industry-leading opportunities.",
      tags: ["Platform", "Jobs"],
      img: "/assets/images/jobs.png",
      link: "http://jobhiest.in/",
      action: "View"
    },
    {
      num: "07",
      title1: "Glacier", title2: "Frost",
      desc: "A cool aesthetic web experience focusing on ultra-minimalist design language.",
      tags: ["Design", "Aesthetic"],
      img: "/assets/images/glacier.png",
      link: "https://glacierfrost.vercel.app/",
      action: "Explore"
    },
    {
      num: "08",
      title1: "Noir", title2: "Bean",
      desc: "Sleek and sophisticated e-commerce experience tailored for premium coffee beans.",
      tags: ["E-Commerce", "UI/UX"],
      img: "/assets/images/noir.png",
      link: "https://noir-bean-omega.vercel.app/",
      action: "Shop"
    },
    {
      num: "09",
      title1: "Shashank", title2: "MT",
      desc: "A highly interactive personal portfolio highlighting creative development skills.",
      tags: ["Portfolio", "Creative"],
      img: "/assets/images/portfolio.png",
      link: "https://shashankmt.vercel.app/",
      action: "Visit"
    },
    {
      num: "10",
      title1: "Wild", title2: "Sugar",
      desc: "Vibrant and sweet digital presence for a modern bakery and dessert brand.",
      tags: ["Branding", "Web"],
      img: "/assets/images/wild.png",
      link: "https://wildsugar.vercel.app/",
      action: "View"
    },
    {
      num: "11",
      title1: "Zone", title2: "K",
      desc: "Next-generation corporate B2B solution serving high-performance data architectures.",
      tags: ["B2B", "Enterprise"],
      img: "/assets/images/zonek.png",
      link: "https://bridgehead.vercel.app/",
      action: "View"
    }
  ];

  return (
    <main ref={containerRef} className="relative z-10 w-full pt-16">
      
      {/* Glitch & Float styles are defined in index.css as custom classes already or we add them inline */}
      <style>{`
        .glitch {
          position: relative;
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
            -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
            0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          animation: glitch 500ms infinite;
        }

        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }

          14% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }

          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }

          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }

          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }

          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }

          100% {
            text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
        }

        /* Floating Animation */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        /* Text Scramble */
        .scramble {
          font-variant-numeric: tabular-nums;
        }

        /* Outlined Text */
        .font-outline-2 {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
          color: transparent;
        }

        @keyframes scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>

      {/* HERO SECTION - Centered with Advanced Animations */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
          </div>
        </div>

        {/* Aurora Orbs */}
        <div
          className="absolute top-[-30%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-cyan-500/10 blur-[150px] float-animation">
        </div>
        <div
          className="absolute bottom-[-30%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-violet-500/10 blur-[150px] float-animation"
          style={{ animationDelay: '3s' }}></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10 pt-32">
          {/* Main Hero Title */}
          <div className="mb-12 overflow-hidden">
            <h1 className="text-7xl md:text-[12rem] font-black uppercase tracking-tighter leading-[0.85] hero-title">
              <div className="inline-block">
                <span className="scramble glitch">SELECTED</span>
              </div>
              <br />
              <div
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400">
                <span className="scramble">WORK</span>
              </div>
            </h1>
          </div>

          {/* Subtitle with Typewriter Effect */}
          <p className="text-sm md:text-xl font-mono text-gray-400 mb-16 tracking-widest subtitle">
            CRAFTING DIGITAL EXPERIENCES THAT LEAVE A MARK
          </p>

          {/* Scroll Indicator */}
          <div className="scroll-prompt flex flex-col items-center gap-4 mt-20">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest animate-pulse">Scroll to Explore</span>
            <div className="w-[2px] h-16 bg-gradient-to-b from-white via-gray-500 to-transparent overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-8 bg-white animate-scroll"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CINEMATIC VERTICAL STACKING SHOWCASE */}
      <section id="showcase-container" className="relative bg-obsidian text-white pb-32">

        {/* Kinetic Background Typography */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none z-0">
          <h2
            className="text-[20vw] font-black uppercase whitespace-nowrap leading-none tracking-tighter mix-blend-difference"
            id="bg-text">
            FEATURED
          </h2>
        </div>

        <div className="projects-column max-w-7xl mx-auto px-6 md:px-0 relative z-10 w-full flex flex-col items-center">

          {projectsData.map((project, index) => (
            <div
              key={project.num}
              className="project-card sticky top-[10vh] w-full min-h-[85vh] bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl mb-24 origin-top">
              <div className="flex flex-col md:flex-row h-full">
                <div
                  className="w-full md:w-5/12 p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 relative bg-[#0f0f0f]">
                  <div>
                    <span className="text-6xl font-bold font-outline-2 text-white/10">{project.num}</span>
                    <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4 mb-8 leading-[0.9]">
                      {project.title1}<br /><span className="text-gray-600">{project.title2}</span>
                    </h3>
                    <p className="text-gray-400 font-mono text-sm md:text-md max-w-sm leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                  <div className="flex gap-3 flex-wrap mt-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 bg-white/5">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-7/12 relative overflow-hidden group">
                  <a href={project.link} target="_blank" rel="noreferrer"
                    className="block w-full h-full cursor-none">
                    <img src={project.img}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      alt={`${project.title1} ${project.title2}`} />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none magnetic-parent">
                      <div
                        className="w-24 h-24 bg-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 magnetic-btn shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        <span className="text-black font-black uppercase text-xs tracking-widest">{project.action}</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Work;