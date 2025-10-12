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

  // Navigation handler - only works on mobile
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    const isMobile = window.innerWidth < 1024;
    
    if (!isMobile) {
      e.preventDefault();
      return;
    }
    
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projects = [
    {
      id: "airm",
      name: "AIRM Brain Tumor System",
      year: "(2024)",
      description:
        "99% accuracy brain tumor classification using EfficientNet-B7. Complete DICOM integration with PyQt5 clinical interface for real-world deployment.",
      tech: ["PyTorch", "EfficientNet-B7", "DICOM", "PyQt5"],
      link: "https://youtu.be/2OeqBKF3X_A",
      linkText: "Watch Demo",
    },
    {
      id: "hemavision",
      name: "HemaVision",
      year: "(2023–2024)",
      description:
        "Complete blood analysis system: automated cell detection, segmentation, counting & classification (97% accuracy) with organized table display — eliminating manual microscopy.",
      tech: ["YOLOv8", "OpenCV", "ResNet", "Disease Classification"],
      link: "https://youtu.be/YxhA877Wyn0",
      linkText: "Watch Demo",
    },
    {
      id: "mydailyhealth",
      name: "My Daily Health",
      year: "(2023)",
      description:
        "Multi-disease AI diagnostic ensemble (90-99% accuracy) combining ResNet50, DenseNet121 & EfficientNet-B3 with interpretable real-time predictions.",
      tech: ["TensorFlow", "Keras", "Transfer Learning", "Tkinter"],
      link: "https://youtu.be/kh7WBjNPpEM",
      linkText: "Watch Demo",
    },
    {
      id: "healthcost",
      name: "Healthcare Cost Prediction",
      year: "(2024)",
      description:
        "Conv1D neural network achieving R² = 0.8793 for healthcare cost forecasting with comprehensive feature engineering and statistical analysis.",
      tech: ["Conv1D", "Feature Engineering", "Plotly"],
      link: "https://www.kaggle.com/code/ahmedmessaad/healthcare-cost-prediction-using-neural-networks",
      linkText: "View Details",
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

        .arrow-animate:hover svg {
          animation: arrow-bounce 0.6s ease-in-out infinite;
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
        
        .invisible-scroll::-webkit-scrollbar-track {
          display: none !important;
        }
        
        .invisible-scroll::-webkit-scrollbar-thumb {
          display: none !important;
        }

        /* 16:9 Aspect Ratio Container */
        .aspect-ratio-container {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
        }

        .aspect-ratio-content {
          width: 100%;
          height: 100%;
          max-width: 177.78vh; /* 16:9 based on height */
          max-height: 56.25vw; /* 9:16 based on width */
          margin: 0 auto;
        }
      `}</style>

      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 bg-[#0a0a0a] z-[90] pointer-events-none transition-opacity duration-700 ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Single Animated Profile Image */}
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
          <a 
            href="#projects" 
            onClick={(e) => handleNavClick(e, 'projects')}
            className="text-neutral-400 hover:text-white transition cursor-pointer"
          >
            Projects
          </a>
          <a 
            href="#about" 
            onClick={(e) => handleNavClick(e, 'about')}
            className="text-neutral-400 hover:text-white transition cursor-pointer"
          >
            About
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, 'contact')}
            className="text-neutral-400 hover:text-white transition cursor-pointer"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Desktop 16:9 Grid Layout */}
      <div className="hidden lg:block aspect-ratio-container pt-20">
        <div className="aspect-ratio-content grid grid-cols-3 grid-rows-2 h-full">
          {/* Hero */}
          <section
            className={`border border-[#2a2a2a] p-6 2xl:p-12 flex flex-col justify-center transition-all duration-1000 ${
              isLoading
                ? "opacity-0 translate-y-[50px]"
                : "opacity-100 translate-y-0 delay-500"
            }`}
          >
            <h1 className="text-[clamp(20px,2.2vw,38px)] leading-[1.2]">
              <span className="font-mono font-bold">Researcher Building</span>
              <br />
              <span className="font-serif italic font-light">Healthcare</span>{" "}
              <span className="font-mono font-bold">with</span>
              <br />
              <span className="font-mono font-bold">Intelligent Systems</span>
            </h1>
            <div className="mt-4 2xl:mt-6 text-[clamp(9px,0.8vw,12px)] tracking-wider uppercase text-neutral-500 font-accent">
              AI/ML • Medical Imaging • Deep Learning
            </div>
          </section>

          {/* Profile */}
          <section 
            id="profile-grid-section"
            className="border border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-center overflow-hidden relative"
          >
            <Image
              src="/ahmed.jpg"
              alt="Ahmed Messaad"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(min-width: 1024px) 33vw, 100vw"
              priority
            />
          </section>

          {/* Projects */}
          <aside
            id="projects"
            className={`row-span-2 border border-[#2a2a2a] bg-[#0a0a0a] flex flex-col overflow-hidden transition-all duration-1000 ${
              isLoading
                ? "opacity-0 translate-y-[50px]"
                : "opacity-100 translate-y-0 delay-700"
            }`}
          >
            <div className="flex-1 overflow-y-auto invisible-scroll py-2">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className={`border-b border-[#2a2a2a] transition ${
                    activeProject === p.id ? "bg-[#151515]" : ""
                  }`}
                >
                  <button
                    onClick={() =>
                      setActiveProject(activeProject === p.id ? null : p.id)
                    }
                    className="w-full flex justify-between items-center px-6 2xl:px-12 py-5 2xl:py-10 text-left"
                  >
                    <div className="text-[clamp(14px,1.4vw,22px)] font-semibold font-mono">
                      {p.name}
                    </div>
                    <svg
                      className={`w-5 h-5 2xl:w-7 2xl:h-7 transition-transform flex-shrink-0 ${
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
                    <div className="px-6 2xl:px-12 pb-5 2xl:pb-10 text-[clamp(12px,1vw,16px)] text-neutral-400 leading-relaxed">
                      <p className="mb-4 2xl:mb-8 font-sans">{p.description}</p>
                      <div className="flex flex-wrap gap-2 2xl:gap-3 mb-4 2xl:mb-8">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded text-[clamp(10px,0.85vw,13px)] px-2.5 2xl:px-3.5 py-1.5 2xl:py-2 transition hover:bg-[#333] font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="arrow-animate inline-flex items-center gap-2 text-white text-[clamp(11px,0.9vw,14px)] tracking-wide transition font-mono"
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

          {/* About */}
          <section
            id="about"
            className={`border border-[#2a2a2a] p-6 2xl:p-12 flex flex-col justify-center transition-all duration-1000 ${
              isLoading
                ? "opacity-0 translate-y-[50px]"
                : "opacity-100 translate-y-0 delay-900"
            }`}
          >
            <h3 className="text-[clamp(9px,0.75vw,11px)] uppercase tracking-wider text-neutral-500 mb-3 2xl:mb-6 font-accent">
              About
            </h3>
            <p className="text-neutral-300 text-[clamp(11px,1vw,15px)] leading-relaxed font-sans">
              Ahmed MBridging the gap between deep learning and the hospital floor. 
              As an AI/ML Researcher in **M&apos;sila**, Algeria, 
              I engineer Medical Diagnostic systems that transform research into high-impact, globally accessible tools, 
              delivering advanced clinical insight wherever it&apos;s needed.
            </p>
          </section>

          {/* Contact */}
          <section
            id="contact"
            onClick={() =>
              (window.location.href = "mailto:ahmed.messaad@outlook.com")
            }
            className={`border border-[#2a2a2a] bg-[#1a1a1a] p-6 2xl:p-12 flex flex-col cursor-pointer relative hover:bg-[#252525] transition-all duration-1000 ${
              isLoading
                ? "opacity-0 translate-y-[50px]"
                : "opacity-100 translate-y-0 delay-900"
            }`}
          >
            <svg
              className="absolute top-4 right-4 2xl:top-10 2xl:right-10 w-5 h-5 2xl:w-7 2xl:h-7"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 24L24 8M24 8H8M24 8V24" />
            </svg>
            <div className="text-[clamp(8px,0.7vw,10px)] tracking-wider uppercase text-neutral-500 font-accent mb-auto">
              Ready to Collaborate?
            </div>
            <h2 className="text-[clamp(32px,3.5vw,56px)] font-bold leading-none mb-4 2xl:mb-8">
              <span className="font-mono">CONTACT</span>
              <span className="italic font-serif font-light ml-2">me</span>
            </h2>
            <div className="flex justify-between w-full text-[clamp(8px,0.7vw,10px)] tracking-wider uppercase font-accent">
              
                href="https://linkedin.com/in/ahmedmessaad"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-neutral-500 hover:text-white transition"
              >
                LINKEDIN
              </a>
              
                href="https://github.com/ahmedmessaad"
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
      </div>

      {/* Mobile Stack Layout */}
      <div className="lg:hidden pt-16">
        {/* Hero */}
        <section
          className={`border-b border-[#2a2a2a] p-6 transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[30px]"
              : "opacity-100 translate-y-0 delay-500"
          }`}
        >
          <h1 className="text-[24px] leading-tight">
            <span className="font-mono font-bold">Researcher Building</span>
            <br />
            <span className="font-serif italic font-light">Healthcare</span>{" "}
            <span className="font-mono font-bold">with</span>
            <br />
            <span className="font-mono font-bold">Intelligent Systems</span>
          </h1>
          <div className="mt-3 text-[9px] tracking-wider uppercase text-neutral-500 font-accent">
            AI/ML • Medical Imaging • Deep Learning
          </div>
        </section>

        {/* Profile */}
        <section
          className={`border-b border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-center overflow-hidden h-[350px] relative transition-all duration-1000 ${
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
            priority
          />
        </section>

        {/* About */}
        <section
          id="about"
          className={`border-b border-[#2a2a2a] p-6 transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[30px]"
              : "opacity-100 translate-y-0 delay-900"
          }`}
        >
          <h3 className="text-[9px] uppercase tracking-wider text-neutral-500 mb-3 font-accent">
            About
          </h3>
          <p className="text-neutral-300 text-[13px] leading-relaxed font-sans">
            Ahmed Messaad is an AI/ML researcher specializing in medical
            diagnostics. Based in **M&apos;sila**, Algeria, he bridges deep learning
            research with clinical practice, creating intelligent systems
            accessible globally.
          </p>
        </section>

        {/* Projects */}
        <aside
          id="projects"
          className={`border-b border-[#2a2a2a] bg-[#0a0a0a] transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[30px]"
              : "opacity-100 translate-y-0 delay-1100"
          }`}
        >
          {projects.map((p) => (
            <div
              key={p.id}
              className={`border-b border-[#2a2a2a] transition ${
                activeProject === p.id ? "bg-[#151515]" : ""
              }`}
            >
              <button
                onClick={() =>
                  setActiveProject(activeProject === p.id ? null : p.id)
                }
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <div className="text-base font-semibold font-mono">
                  {p.name}
                </div>
                <svg
                  className={`w-4 h-4 transition-transform ${
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
                <div className="px-6 pb-5 text-sm text-neutral-400 leading-relaxed">
                  <p className="mb-5 font-sans">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded text-[10px] px-2.5 py-1 transition hover:bg-[#333] font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="arrow-animate inline-flex items-center gap-2 text-white text-[11px] tracking-wide transition font-mono"
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
          id="contact"
          onClick={() =>
            (window.location.href = "mailto:ahmed.messaad@outlook.com")
          }
          className={`border-b border-[#2a2a2a] bg-[#1a1a1a] p-6 flex flex-col gap-5 cursor-pointer hover:bg-[#252525] transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[30px]"
              : "opacity-100 translate-y-0 delay-1300"
          }`}
        >
          <div className="text-[9px] tracking-wider uppercase text-neutral-500 font-accent">
            Ready to Collaborate?
          </div>
          <h2 className="text-[36px] font-bold leading-none">
            <span className="font-mono">CONTACT</span>
            <span className="italic font-serif font-light ml-2">me</span>
          </h2>
          <div className="flex justify-between w-full text-[9px] tracking-wider uppercase font-accent">
            
              href="https://linkedin.com/in/ahmedmessaad"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-500 hover:text-white transition"
            >
              LINKEDIN
            </a>
            
              href="https://github.com/ahmedmessaad"
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
