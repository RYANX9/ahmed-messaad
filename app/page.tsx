"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [activeProject, setActiveProject] = useState<string | null>("airm");
  const [showContent, setShowContent] = useState(false);

  React.useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;

    if (!isDesktop) {
      setShowContent(true);
      return;
    }

    const timer = setTimeout(() => {
      const profileImg = document.getElementById('profile-image');
      const profileSection = document.getElementById('profile-grid-section');
      
      if (!profileImg || !profileSection) {
        setShowContent(true);
        return;
      }

      const rect = profileSection.getBoundingClientRect();
      
      profileImg.style.top = `${rect.top}px`;
      profileImg.style.left = `${rect.left}px`;
      profileImg.style.width = `${rect.width}px`;
      profileImg.style.height = `${rect.height}px`;
      profileImg.style.borderRadius = '16px';

      setTimeout(() => {
        setShowContent(true);
      }, 1600);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: "airm",
      name: "AIRM Brain Tumor System",
      context: "Clinical AI Platform",
      year: "2024",
      description: "Production-ready diagnostic system achieving 99% accuracy across four tumor categories. Built end-to-end DICOM pipeline with clinical interface validated by radiologists.",
      tech: ["EfficientNet-B7", "PyDICOM", "PyQt5", "SQL"],
      link: "https://youtu.be/2OeqBKF3X_A",
      linkText: "Watch Demo",
      image: "/brain.jpg",
    },
    {
      id: "hemavision",
      name: "HemaVision",
      context: "Medical Automation",
      year: "2023–2024",
      description: "Automated hematology platform with 97% classification accuracy. Reduced diagnostic time from 45 minutes to 3 minutes while maintaining clinical-grade precision.",
      tech: ["YOLOv8", "U-Net", "OpenCV", "PyTorch"],
      link: "https://youtu.be/YxhA877Wyn0",
      linkText: "Watch Demo",
      image: "/blood.jpg",
    },
    {
      id: "healthcost",
      name: "Healthcare Cost Prediction",
      context: "Deep Learning Research",
      year: "2024",
      description: "Conv1D neural network achieving R² = 0.88 for insurance cost forecasting. Feature engineering with SHAP analysis identified key cost drivers.",
      tech: ["Conv1D", "SHAP", "Scikit-learn", "Plotly"],
      link: "https://www.kaggle.com/code/ahmedmessaad/healthcare-cost-prediction-using-neural-networks",
      linkText: "View Project",
      image: "/healthcarecost.png",
    },
    {
      id: "mydailyhealth",
      name: "My Daily Health",
      context: "Research Thesis",
      year: "2023",
      description: "Multi-disease diagnostic platform with 90-99% accuracy across five disease domains. Systematic evaluation of 12 architectures using stratified cross-validation.",
      tech: ["TensorFlow", "ResNet", "EfficientNet", "Flask"],
      link: "https://youtu.be/kh7WBjNPpEM",
      linkText: "Watch Demo",
      image: "/daily.png",
    },
  ];

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;600;700&family=Inter:wght@300;400;500&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');
        
        * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        
        *::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        
        .font-mono {
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.02em;
        }
        
        .font-serif {
          font-family: 'Crimson Pro', serif;
        }
        
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
        
        .font-accent {
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.05em;
        }

        @keyframes arrow-bounce {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
        }

        @keyframes arrow-float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(3px, -3px) rotate(2deg);
          }
          50% {
            transform: translate(0, -5px) rotate(0deg);
          }
          75% {
            transform: translate(-3px, -3px) rotate(-2deg);
          }
        }

        .arrow-animate:hover svg {
          animation: arrow-bounce 0.6s ease-in-out infinite;
        }

        .arrow-contact-animate {
          animation: arrow-float 3s ease-in-out infinite;
        }

        .invisible-scroll {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
          overflow-y: scroll !important;
        }
        
        .invisible-scroll::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
        }

        #profile-image {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 240px;
          height: 240px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 100;
          transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          object-fit: cover;
        }
      `}</style>

      <div className={`fixed inset-0 bg-[#0a0a0a] z-[90] pointer-events-none transition-opacity duration-700 ${showContent ? "opacity-0" : "opacity-100"}`} />

      <img
        id="profile-image"
        src="/ahmed.jpg"
        alt="Ahmed Messaad"
        className="hidden lg:block"
      />

      <header className={`fixed top-0 left-0 right-0 h-16 lg:h-20 bg-[#0a0a0a] border-b border-[#2a2a2a] z-50 flex justify-center items-center px-4 lg:px-10 transition-opacity duration-700 ${showContent ? "opacity-100 delay-300" : "opacity-0"}`}>
        <div className="font-mono text-sm lg:text-xl font-bold tracking-wider">AHMED MESSAAD</div>
      </header>

      <div className="hidden lg:grid lg:grid-cols-3 lg:auto-rows-fr gap-3 h-screen p-3 pt-[84px]">
        
        <section className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-8 xl:p-10 flex flex-col justify-between transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-[50px]"}`}>
          <div className="flex items-start justify-end">
            <svg className="w-16 h-16 xl:w-20 xl:h-20 text-neutral-700" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="30" />
              <circle cx="50" cy="50" r="20" />
              <circle cx="50" cy="50" r="10" />
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="10" y1="50" x2="90" y2="50" />
              <line x1="20" y1="20" x2="80" y2="80" />
              <line x1="80" y1="20" x2="20" y2="80" />
            </svg>
          </div>
          <div>
            <h1 className="text-[26px] xl:text-[32px] leading-[1.2] mb-6">
              <span className="font-mono font-bold">Advancing Clinical Medicine </span>
              <span className="italic font-serif font-light">through </span>
              <span className="font-mono font-bold">AI-Driven Design</span>
            </h1>
            <div className="text-[10px] xl:text-[11px] tracking-wider uppercase text-neutral-400 font-accent">
              AI Research • Medical Imaging • Computer Vision
            </div>
          </div>
        </section>

        <section id="profile-grid-section" className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden relative">
        </section>

        <aside id="projects" className={`row-span-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl flex flex-col overflow-hidden transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0 delay-900" : "opacity-0 translate-y-[50px]"}`}>
          <div className="flex-1 overflow-y-auto invisible-scroll">
            {projects.map((p, idx) => (
              <div key={p.id} className={`${idx !== 0 ? 'border-t' : ''} border-[#2a2a2a] transition ${activeProject === p.id ? "bg-[#151515]" : ""}`}>
                <button onClick={() => setActiveProject(activeProject === p.id ? null : p.id)} className="w-full flex justify-between items-center px-8 xl:px-10 py-4 xl:py-5 text-left">
                  <div className="flex flex-col">
                    <div className="text-base xl:text-lg font-semibold font-mono">{p.name}</div>
                    <div className="flex items-center gap-4">
                      <div className="text-[10px] xl:text-[11px] text-neutral-500 mt-1 font-accent uppercase tracking-wide">{p.context} • {p.year}</div>
                      <a href={p.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className={`arrow-animate inline-flex items-center gap-2 text-white text-[10px] xl:text-[11px] tracking-wide transition font-mono ${activeProject === p.id ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
                        {p.linkText}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 xl:w-6 xl:h-6 transition-transform flex-shrink-0 ml-3 ${activeProject === p.id ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${activeProject === p.id ? "max-h-[900px]" : "max-h-0"}`}>
                  <div className="px-8 xl:px-10 pb-6 xl:pb-7">
                    <div className="relative w-full h-48 xl:h-56 mb-4 xl:mb-5 rounded-lg overflow-hidden">
                      <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="(min-width: 1024px) 20vw, 100vw" />
                    </div>
                    <p className="mb-4 xl:mb-5 text-[13px] xl:text-[14px] text-neutral-400 leading-relaxed font-sans">{p.description}</p>
                    <div className="flex flex-wrap gap-2 xl:gap-2.5">
                      {p.tech.map((t) => (
                        <span key={t} className="bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded text-[11px] xl:text-[12px] px-3 py-1.5 transition hover:bg-[#333] font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section id="about" className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-8 xl:p-10 flex flex-col justify-between transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0 delay-1100" : "opacity-0 translate-y-[50px]"}`}>
          <div className="flex items-start justify-start">
            <svg className="w-12 h-12 xl:w-14 xl:h-14 text-neutral-700" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="50" cy="50" r="20" />
              <circle cx="50" cy="50" r="5" />
            </svg>
          </div>
          <div>
            <h3 className="text-[10px] xl:text-[11px] uppercase tracking-wider text-neutral-500 mb-4 xl:mb-5 font-accent">About</h3>
            <p className="text-neutral-300 text-[14px] xl:text-[16px] leading-relaxed font-sans">
              AI research engineer specializing in clinically-deployable computer vision systems. Focused on transfer learning optimization and interpretable medical AI for resource-constrained environments.
            </p>
          </div>
        </section>

        <section id="contact-section" onClick={() => (window.location.href = "mailto:ahmed.messaad@outlook.com")} className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 xl:p-10 flex flex-col cursor-pointer relative hover:bg-[#252525] transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0 delay-1100" : "opacity-0 translate-y-[50px]"}`}>
          <div className="flex justify-between items-start mb-auto">
            <div className="text-[9px] xl:text-[10px] tracking-wider uppercase text-neutral-500 font-accent">Have some<br />questions?</div>
            <svg className="w-6 h-6 xl:w-7 xl:h-7 arrow-contact-animate" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 24L24 8M24 8H8M24 8V24" />
            </svg>
          </div>
          <h2 className="text-[48px] xl:text-[56px] font-bold leading-none mb-6 xl:mb-8">
            <span className="font-mono">Contact </span>
            <span className="italic font-serif font-light">me</span>
          </h2>
          <div className="flex justify-between w-full text-[9px] xl:text-[10px] tracking-wider uppercase font-accent">
            <a href="https://linkedin.com/in/ahmedmessaad" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-neutral-500 hover:text-white transition">LINKEDIN</a>
            <a href="https://github.com/RYANX9" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-neutral-500 hover:text-white transition">GITHUB</a>
            <a href="mailto:ahmed.messaad@outlook.com" onClick={(e) => e.stopPropagation()} className="text-neutral-500 hover:text-white transition">EMAIL</a>
          </div>
        </section>
      </div>

      <div className="lg:hidden pt-16">
        
        <section className={`border-b border-[#2a2a2a] p-6 flex flex-col gap-6 min-h-[320px] transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-[30px]"}`}>
          <div className="flex items-start justify-end">
            <svg className="w-14 h-14 text-neutral-700" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="30" />
              <circle cx="50" cy="50" r="20" />
              <circle cx="50" cy="50" r="10" />
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="10" y1="50" x2="90" y2="50" />
              <line x1="20" y1="20" x2="80" y2="80" />
              <line x1="80" y1="20" x2="20" y2="80" />
            </svg>
          </div>
          <div className="mt-auto">
            <h1 className="text-[22px] leading-[1.2] mb-4">
              <span className="font-mono font-bold">Advancing Clinical Medicine </span>
              <span className="italic font-serif font-light">through </span>
              <span className="font-mono font-bold">AI-Driven Design</span>
            </h1>
            <div className="text-[9px] tracking-wider uppercase text-neutral-400 font-accent">
              AI Research • Medical Imaging • Computer Vision
            </div>
          </div>
        </section>

        <section className={`border-b border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-center overflow-hidden h-[380px] relative transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-[30px]"}`}>
          <Image src="/ahmed.jpg" alt="Ahmed Messaad" fill style={{ objectFit: 'cover' }} sizes="100vw" priority />
        </section>

        <section className={`border-b border-[#2a2a2a] p-6 flex flex-col gap-6 min-h-[240px] transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0 delay-900" : "opacity-0 translate-y-[30px]"}`}>
          <div className="flex items-start justify-start">
            <svg className="w-10 h-10 text-neutral-700" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="50" cy="50" r="20" />
              <circle cx="50" cy="50" r="5" />
            </svg>
          </div>
          <div className="mt-auto">
            <h3 className="text-[9px] uppercase tracking-wider text-neutral-500 mb-3 font-accent">About</h3>
            <p className="text-neutral-300 text-[14px] leading-relaxed font-sans">
              AI research engineer specializing in clinically-deployable computer vision systems. Focused on transfer learning optimization and interpretable medical AI for resource-constrained environments.
            </p>
          </div>
        </section>

        <aside id="projects" className={`border-b border-[#2a2a2a] bg-[#0a0a0a] transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0 delay-1100" : "opacity-0 translate-y-[30px]"}`}>
          {projects.map((p, idx) => (
            <div key={p.id} className={`${idx !== 0 ? 'border-t' : ''} border-[#2a2a2a] transition ${activeProject === p.id ? "bg-[#151515]" : ""}`}>
              <button onClick={() => setActiveProject(activeProject === p.id ? null : p.id)} className="w-full flex justify-between items-center px-6 py-4 text-left">
                <div className="flex flex-col">
                  <div className="text-sm font-semibold font-mono">{p.name}</div>
                  <div className="flex items-center gap-4">
                    <div className="text-[9px] text-neutral-500 mt-1 font-accent uppercase tracking-wide">{p.context} • {p.year}</div>
                    <a href={p.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className={`arrow-animate inline-flex items-center gap-2 text-white text-[9px] tracking-wide transition font-mono ${activeProject === p.id ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
                      {p.linkText}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </div>
                </div>
                <svg className={`w-4 h-4 transition-transform flex-shrink-0 ml-3 ${activeProject === p.id ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${activeProject === p.id ? "max-h-[800px]" : "max-h-0"}`}>
                <div className="px-6 pb-5">
                  <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                    <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="100vw" />
                  </div>
                  <p className="mb-4 text-sm text-neutral-400 leading-relaxed font-sans">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded text-[10px] px-2.5 py-1 transition hover:bg-[#333] font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </aside>

        <section onClick={() => (window.location.href = "mailto:ahmed.messaad@outlook.com")} className={`border-b border-[#2a2a2a] bg-[#1a1a1a] p-6 flex flex-col gap-5 cursor-pointer hover:bg-[#252525] transition-all duration-1000 relative min-h-[280px] ${showContent ? "opacity-100 translate-y-0 delay-1300" : "opacity-0 translate-y-[30px]"}`}>
          <div className="flex justify-between items-start">
            <div className="text-[9px] tracking-wider uppercase text-neutral-500 font-accent">Have some<br />questions?</div>
            <svg className="w-5 h-5 arrow-contact-animate" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 24L24 8M24 8H8M24 8V24" />
            </svg>
          </div>
          <h2 className="text-[40px] font-bold leading-none mt-auto mb-5">
            <span className="font-mono">Contact </span>
            <span className="italic font-serif font-light">me</span>
          </h2>
          <div className="flex justify-between w-full text-[9px] tracking-wider uppercase font-accent">
            <a href="https://linkedin.com/in/ahmedmessaad" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-neutral-500 hover:text-white transition">LINKEDIN</a>
            <a href="https://github.com/RYANX9" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-neutral-500 hover:text-white transition">GITHUB</a>
            <a href="mailto:ahmed.messaad@outlook.com" onClick={(e) => e.stopPropagation()} className="text-neutral-500 hover:text-white transition">EMAIL</a>
          </div>
        </section>
      </div>
    </main>
  );
}
