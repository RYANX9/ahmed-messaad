"use client";
 
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [activeProject, setActiveProject] = useState<string | null>("airm");
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;

    if (!isDesktop) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      const animatedImg = document.getElementById('animated-profile');
      const gridSection = document.getElementById('profile-grid-section');
      
      if (animatedImg && gridSection) {
        const rect = gridSection.getBoundingClientRect();
        const gridCenterX = rect.left + rect.width / 2;
        const gridCenterY = rect.top + rect.height / 2;
        
        animatedImg.style.top = `${gridCenterY}px`;
        animatedImg.style.left = `${gridCenterX}px`;
        animatedImg.style.width = `${rect.width}px`;
        animatedImg.style.height = `${rect.height}px`;
        
        setTimeout(() => {
          animatedImg.style.visibility = 'hidden';
          setIsLoading(false);
        }, 1400);
      } else {
        setIsLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: "airm",
      name: "AIRM Brain Tumor System",
      context: "Clinical AI Platform",
      year: "2024",
      description:
        "Production-ready diagnostic system achieving 99% accuracy across four tumor categories. Built end-to-end DICOM pipeline with clinical interface validated by radiologists.",
      tech: ["EfficientNet-B7", "PyDICOM", "PyQt5", "SQL"],
      link: "https://youtu.be/2OeqBKF3X_A",
      linkText: "Watch Demo",
    },
    {
      id: "hemavision",
      name: "HemaVision",
      context: "Medical Automation",
      year: "2023–2024",
      description:
        "Automated hematology platform with 97% classification accuracy. Reduced diagnostic time from 45 minutes to 3 minutes while maintaining clinical-grade precision.",
      tech: ["YOLOv8", "U-Net", "OpenCV", "PyTorch"],
      link: "https://youtu.be/YxhA877Wyn0",
      linkText: "Watch Demo",
    },
    {
      id: "healthcost",
      name: "Healthcare Cost Prediction",
      context: "Deep Learning Research",
      year: "2024",
      description:
        "Conv1D neural network achieving R² = 0.88 for insurance cost forecasting. Feature engineering with SHAP analysis identified key cost drivers.",
      tech: ["Conv1D", "SHAP", "Scikit-learn", "Plotly"],
      link: "https://www.kaggle.com/code/ahmedmessaad/healthcare-cost-prediction-using-neural-networks",
      linkText: "View Project",
    },
    {
      id: "mydailyhealth",
      name: "My Daily Health",
      context: "Research Thesis",
      year: "2023",
      description:
        "Multi-disease diagnostic platform with 90-99% accuracy across five disease domains. Systematic evaluation of 12 architectures using stratified cross-validation.",
      tech: ["TensorFlow", "ResNet", "EfficientNet", "Flask"],
      link: "https://youtu.be/kh7WBjNPpEM",
      linkText: "Watch Demo",
    },
  ];

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;600;700&family=Inter:wght@300;400;500&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;600;700&family=Inter:wght@300;400;500&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=Mea+Culpa&display=swap');
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
        .font-meaculpa {
          font-family: 'Mea Culpa', cursive;
          font-weight: 400;
          letter-spacing: 0.03em;
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
      `}</style>

      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 bg-[#0a0a0a] z-[90] pointer-events-none transition-opacity duration-700 ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Animated Profile Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        id="animated-profile"
        src="/ahmed.jpg"
        alt="Ahmed Messaad"
        className="object-cover hidden lg:block" 
        style={{
          position: 'fixed',
          top: '50vh',
          left: '50vw',
          width: '280px',
          height: '280px',
          transform: 'translate(-50%, -50%)',
          transformOrigin: 'center center',
          zIndex: 100,
          pointerEvents: 'none',
          transition: 'top 1400ms cubic-bezier(0.76, 0, 0.24, 1), left 1400ms cubic-bezier(0.76, 0, 0.24, 1), width 1400ms cubic-bezier(0.76, 0, 0.24, 1), height 1400ms cubic-bezier(0.76, 0, 0.24, 1)',
        }}
      />
     

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 h-16 lg:h-20 bg-[#0a0a0a] border-b border-[#2a2a2a] z-50 flex justify-between items-center px-4 lg:px-10 transition-opacity duration-700 ${
          isLoading ? "opacity-0" : "opacity-100 delay-300"
        }`}
      >
        <div className="font-mono text-sm lg:text-xl font-bold tracking-wider"> 
           AHMED MESSAAD
        </div>
        <nav className="flex gap-3 lg:gap-8 text-[10px] lg:text-[13px] uppercase tracking-wide font-mono">
          <a className="text-neutral-400 hover:text-white transition">
            About
          </a>
          <a className="text-neutral-400 hover:text-white transition">
            Projects
          </a>
          <a className="text-neutral-400 hover:text-white transition">
            Contact
          </a>
        </nav>
      </header>

      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:auto-rows-fr gap-3 xl:gap-4 min-h-screen pt-20 p-3 xl:p-4 pb-6">
        {/* Hero - spans 1 column, taller */}
        <section
          className={`rounded-2xl xl:rounded-3xl border border-[#2a2a2a] p-10 xl:p-14 flex flex-col justify-between transition-all duration-1000 row-span-2 ${
            isLoading
              ? "opacity-0 translate-y-[50px]"
              : "opacity-100 translate-y-0 delay-500"
          }`}
        >
          <div className="relative w-12 h-12 xl:w-16 xl:h-16 mb-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="5"
                  x2="50"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  transform={`rotate(${i * 30} 50 50)`}
                />
              ))}
            </svg>
          </div>
          
          <div className="space-y-6 xl:space-y-8">
            <h1 className="text-[28px] xl:text-[38px] 2xl:text-[42px] leading-[1.15]">
              <span className="font-mono font-bold block">Advancing Clinical</span>
              <span className="font-mono font-bold block">Medicine </span>
              <span className="italic font-serif font-light">through </span>
              <span className="font-mono font-bold">Deep Learning</span>
            </h1>
            <div className="text-[11px] xl:text-[12px] tracking-wider uppercase text-neutral-500 font-accent">
              AI Research • Medical Imaging • Computer Vision
            </div>
          </div>
        </section>

        {/* Profile - square-ish */}
        <section 
          id="profile-grid-section"
          className={`rounded-2xl xl:rounded-3xl border border-[#2a2a2a] bg-[#1a1a1a] overflow-hidden relative min-h-[400px] transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[50px]"
              : "opacity-100 translate-y-0 delay-700"
          }`}
        >
          <Image
            src="/ahmed.jpg"
            alt="Ahmed Messaad"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </section>

        {/* About - square-ish */}
        <section
          id="about"
          className={`rounded-2xl xl:rounded-3xl border border-[#2a2a2a] p-10 xl:p-14 flex flex-col justify-between transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[50px]"
              : "opacity-100 translate-y-0 delay-900"
          }`}
        >
          <div className="relative w-10 h-10 xl:w-12 xl:h-12 mb-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <path d="M50,10 Q70,30 50,50 Q30,70 50,90" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </svg>
          </div>
          
          <div className="space-y-4 xl:space-y-5">
            <h3 className="text-[11px] xl:text-[12px] uppercase tracking-wider text-neutral-500 font-accent">
              About
            </h3>
            <p className="text-neutral-300 text-[14px] xl:text-[16px] leading-relaxed font-sans">
              AI research engineer specializing in clinically-deployable computer vision systems. Focused on transfer learning optimization and interpretable medical AI for resource-constrained environments.
            </p>
          </div>
        </section>

        {/* Projects - right column, full height */}
        <aside
          id="projects"
          className={`row-span-2 rounded-2xl xl:rounded-3xl border border-[#2a2a2a] bg-[#0a0a0a] overflow-hidden transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[50px]"
              : "opacity-100 translate-y-0 delay-700"
          }`}
        >
          <div className="h-full overflow-y-auto invisible-scroll">
            {projects.map((p, idx) => (
              <div
                key={p.id}
                className={`transition ${
                  activeProject === p.id ? "bg-[#151515]" : ""
                } ${idx !== projects.length - 1 ? "border-b border-[#2a2a2a]" : ""}`}
              >
                <button
                  onClick={() =>
                    setActiveProject(activeProject === p.id ? null : p.id)
                  }
                  className="w-full flex justify-between items-start px-8 xl:px-10 py-6 xl:py-7 text-left group"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="text-[17px] xl:text-[19px] font-semibold font-mono group-hover:text-neutral-300 transition">
                      {p.name}
                    </div>
                    <div className="text-[10px] xl:text-[11px] text-neutral-500 mt-1.5 font-accent uppercase tracking-wide">
                      {p.context} • {p.year}
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 xl:w-6 xl:h-6 transition-transform flex-shrink-0 ${
                      activeProject === p.id ? "rotate-90" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeProject === p.id ? "max-h-[700px]" : "max-h-0"
                  }`}
                >
                  <div className="px-8 xl:px-10 pb-6 xl:pb-7 space-y-5">
                    <p className="text-[14px] xl:text-[15px] text-neutral-400 leading-relaxed font-sans">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="bg-[#1a1a1a] text-neutral-300 border border-[#2a2a2a] rounded-lg text-[11px] xl:text-[12px] px-3 py-1.5 transition hover:bg-[#252525] hover:border-[#3a3a3a] font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="arrow-animate inline-flex items-center gap-2 text-white text-[12px] xl:text-[13px] tracking-wide transition font-mono hover:text-neutral-300"
                    >
                      {p.linkText}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Contact - wide */}
        <section
          id="contact"
          onClick={() =>
            (window.location.href = "mailto:ahmed.messaad@outlook.com")
          }
          className={`col-span-2 rounded-2xl xl:rounded-3xl border border-[#2a2a2a] bg-[#1a1a1a] p-10 xl:p-14 flex flex-col cursor-pointer relative hover:bg-[#252525] transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[50px]"
              : "opacity-100 translate-y-0 delay-1100"
          }`}
        >
          <svg
            className="absolute top-8 right-8 xl:top-12 xl:right-12 w-7 h-7 xl:w-9 xl:h-9 arrow-contact-animate opacity-70"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M8 24L24 8M24 8H8M24 8V24" />
          </svg>
          
          <div className="text-[10px] xl:text-[11px] tracking-wider uppercase text-neutral-500 font-accent mb-auto">
            Have some questions?
          </div>
          
          <div className="space-y-8">
            <h2 className="text-[52px] xl:text-[68px] 2xl:text-[76px] font-bold leading-none">
              <span className="font-mono block">Contact </span>
              <span className="italic font-serif font-light">me</span>
            </h2>
            
            <div className="flex gap-8 xl:gap-12 text-[10px] xl:text-[11px] tracking-wider uppercase font-accent">
              
                href="https://linkedin.com/in/ahmedmessaad"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-neutral-500 hover:text-white transition"
              >
                LINKEDIN
              </a>
              
                href="https://github.com/RYANX9"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-neutral-500 hover:text-white transition"
              >
                GITHUB
              </a>
              
                href="mailto:ahmed.messaad@outlook.com"
                onClick={(e) => e.stopPropagation()}
                className="text-neutral-500 hover:text-white transition"
              >
                EMAIL
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile Stack Layout */}
      <div className="lg:hidden pt-16 p-3 pb-6 space-y-3">
        {/* Hero */}
        <section
          className={`rounded-2xl border border-[#2a2a2a] p-8 min-h-[320px] flex flex-col justify-between transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[30px]"
              : "opacity-100 translate-y-0 delay-500"
          }`}
        >
          <div className="relative w-10 h-10 mb-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="5"
                  x2="50"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  transform={`rotate(${i * 30} 50 50)`}
                />
              ))}
            </svg>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-[22px] leading-[1.2]">
              <span className="font-mono font-bold block">Advancing Clinical</span>
              <span className="font-mono font-bold block">Medicine </span>
              <span className="italic font-serif font-light">through </span>
              <span className="font-mono font-bold">Deep Learning</span>
            </h1>
            <div className="text-[10px] tracking-wider uppercase text-neutral-500 font-accent">
              AI Research • Medical Imaging • Computer Vision
            </div>
          </div>
        </section>

        {/* Profile */}
        <section
          className={`rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] overflow-hidden h-[380px] relative transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[30px]"
              : "opacity-100 translate-y-0 delay-700"
          }`}
        >
          <Image
            src="/ahmed.jpg"
            alt="Ahmed Messaad"
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
        </section>

        {/* About */}
        <section
          className={`rounded-2xl border border-[#2a2a2a] p-8 flex flex-col justify-between min-h-[220px] transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[30px]"
              : "opacity-100 translate-y-0 delay-900"
          }`}
        >
          <div className="relative w-10 h-10 mb-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <path d="M50,10 Q70,30 50,50 Q30,70 50,90" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </svg>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-wider text-neutral-500 font-accent">
              About
            </h3>
            <p className="text-neutral-300 text-[14px] leading-relaxed font-sans">
              AI research engineer specializing in clinically-deployable computer vision systems. Focused on transfer learning optimization and interpretable medical AI for resource-constrained environments.
            </p>
          </div>
        </section>

        {/* Projects */}
        <aside
          id="projects"
          className={`rounded-2xl border border-[#2a2a2a] bg-[#0a0a0a] overflow-hidden transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[30px]"
              : "opacity-100 translate-y-0 delay-1100"
          }`}
        >
          {projects.map((p, idx) => (
            <div
              key={p.id}
              className={`transition ${
                activeProject === p.id ? "bg-[#151515]" : ""
              } ${idx !== projects.length - 1 ? "border-b border-[#2a2a2a]" : ""}`}
            >
              <button
                onClick={() =>
                  setActiveProject(activeProject === p.id ? null : p.id)
                }
                className="w-full flex justify-between items-start px-6 py-5 text-left group"
              >
                <div className="flex-1 min-w-0 pr-4">
                  <div className="text-[16px] font-semibold font-mono group-hover:text-neutral-300 transition">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-1 font-accent uppercase tracking-wide">
                    {p.context} • {p.year}
                  </div>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform flex-shrink-0 ${
                    activeProject === p.id ? "rotate-90" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeProject === p.id ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 space-y-4">
                  <p className="text-[14px] text-neutral-400 leading-relaxed font-sans">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-[#1a1a1a] text-neutral-300 border border-[#2a2a2a] rounded-lg text-[11px] px-2.5 py-1 transition hover:bg-[#252525] hover:border-[#3a3a3a] font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="arrow-animate inline-flex items-center gap-2 text-white text-[12px] tracking-wide transition font-mono hover:text-neutral-300"
                  >
                    {p.linkText}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* Contact */}
        <section
          onClick={() =>
            (window.location.href = "mailto:ahmed.messaad@outlook.com")
          }
          className={`rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] p-8 flex flex-col cursor-pointer hover:bg-[#252525] transition-all duration-1000 relative min-h-[240px] justify-between ${
            isLoading
              ? "opacity-0 translate-y-[30px]"
              : "opacity-100 translate-y-0 delay-1300"
          }`}
        >
          <svg
            className="absolute top-6 right-6 w-6 h-6 arrow-contact-animate opacity-70"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M8 24L24 8M24 8H8M24 8V24" />
          </svg>
          
          <div className="text-[10px] tracking-wider uppercase text-neutral-500 font-accent mb-auto">
            Have some questions?
          </div>
          
          <div className="space-y-6">
            <h2 className="text-[40px] font-bold leading-none">
              <span className="font-mono block">Contact </span>
              <span className="italic font-serif font-light">me</span>
            </h2>
            
            <div className="flex gap-6 text-[10px] tracking-wider uppercase font-accent">
              
                href="https://linkedin.com/in/ahmedmessaad"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-neutral-500 hover:text-white transition"
              >
                LINKEDIN
              </a>
              
                href="https://github.com/RYANX9"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-neutral-500 hover:text-white transition"
              >
                GITHUB
              </a>
              
                href="mailto:ahmed.messaad@outlook.com"
                onClick={(e) => e.stopPropagation()}
                className="text-neutral-500 hover:text-white transition"
              >
              EMAIL
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
