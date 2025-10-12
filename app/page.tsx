use client";

import React, { useState } from "react";

export default function Page() {
  const [activeProject, setActiveProject] = useState<string | null>("airm");
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Determine the breakpoint (Tailwind's 'lg' is 1024px)
    // We check window.innerWidth to decide whether to run the animation
    const isDesktop = window.innerWidth >= 1024;

    if (!isDesktop) {
      // Mobile/Small screen: Skip animation and immediately show content
      setIsLoading(false);
      return;
    }

    // Desktop/Large screen: Run the animation
    const timer = setTimeout(() => {
      const animatedImg = document.getElementById('animated-profile');
      const gridSection = document.getElementById('profile-grid-section');
      
      if (animatedImg && gridSection) {
        const rect = gridSection.getBoundingClientRect();
        
        // Calculate the center point of the grid cell
        const gridCenterX = rect.left + rect.width / 2;
        const gridCenterY = rect.top + rect.height / 2;
        
        // Move image to grid position - maintaining center point origin
        animatedImg.style.top = `${gridCenterY}px`;
        animatedImg.style.left = `${gridCenterX}px`;
        animatedImg.style.width = `${rect.width}px`;
        animatedImg.style.height = `${rect.height}px`;
        
        // After animation completes, just hide it behind - NO opacity change
        setTimeout(() => {
          animatedImg.style.visibility = 'hidden';
          setIsLoading(false);
        }, 1400);
      } else {
        // Fallback if elements are missing, still set loading to false
        setIsLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

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
        
        /* Primary - Bold titles and headers */
        .font-mono {
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.02em;
        }
        
        /* Secondary - Elegant italics */
        .font-serif {
          font-family: 'Crimson Pro', serif;
        }
        
        /* Tertiary - Modern sans for body */
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
        
        /* Accent - Tech labels */
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

        /* Completely invisible scrollbar - ALWAYS HIDDEN - NO LAYOUT SHIFT */
        .invisible-scroll {
          scrollbar-width: none !important; /* Firefox */
          -ms-overflow-style: none !important; /* IE/Edge */
          overflow-y: scroll !important;
        }
        
        .invisible-scroll::-webkit-scrollbar {
          display: none !important; /* Chrome/Safari/Opera */
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
      `}</style>

      {/* Loading Overlay - Behind picture */}
      <div
        className={`fixed inset-0 bg-[#0a0a0a] z-[90] pointer-events-none transition-opacity duration-700 ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Single Animated Profile Image - STARTS FROM CENTER POINT */}
      <img
        id="animated-profile"
        src="/ahmed.jpg"
        alt="Ahmed Messaad"
        className="object-cover hidden lg:block" // ADDED 'hidden lg:block' to hide on mobile
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
          <a href="" className="text-neutral-400 hover:text-white transition">
            Projects
          </a>
          <a href="" className="text-neutral-400 hover:text-white transition">
            About
          </a>
          <a href="" className="text-neutral-400 hover:text-white transition">
            Contact
          </a>
        </nav>
      </header>

      {/* Desktop Grid Layout - No Scroll */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:grid-rows-2 h-screen pt-20">
        {/* Hero */}
        <section
          className={`border border-[#2a2a2a] p-8 xl:p-12 flex flex-col justify-center transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[50px]"
              : "opacity-100 translate-y-0 delay-500"
          }`}
        >
          <h1 className="text-[28px] xl:text-[38px] leading-tight">
            <span className="font-mono font-bold">Researcher Building</span>
            <br />
            <span className="font-serif italic font-light">Healthcare</span>{" "}
            <span className="font-mono font-bold">with</span>
            <br />
            <span className="font-mono font-bold">Intelligent Systems</span>
          </h1>
          <div className="mt-4 xl:mt-6 text-[10px] xl:text-[12px] tracking-wider uppercase text-neutral-500 font-accent">
            AI/ML • Medical Imaging • Deep Learning
          </div>
        </section>

        {/* Profile - Picture destination */}
        <section 
          id="profile-grid-section"
          className="border border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-center overflow-hidden relative"
        >
          <img
            src="/ahmed.jpg"
            alt="Ahmed Messaad"
            className="w-full h-full object-cover"
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
          <div className="flex-1 overflow-y-auto invisible-scroll py-4">
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
                  className="w-full flex justify-between items-center px-10 xl:px-12 py-8 xl:py-10 text-left"
                >
                  <div className="text-xl xl:text-2xl font-semibold font-mono">
                    {p.name}
                  </div>
                  <svg
                    className={`w-6 h-6 xl:w-7 xl:h-7 transition-transform ${
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
                  <div className="px-10 xl:px-12 pb-8 xl:pb-10 text-[15px] xl:text-[16px] text-neutral-400 leading-relaxed">
                    <p className="mb-7 xl:mb-8 font-sans">{p.description}</p>
                    <div className="flex flex-wrap gap-2.5 xl:gap-3 mb-7 xl:mb-8">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded text-[12px] xl:text-[13px] px-3.5 py-2 transition hover:bg-[#333] font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="arrow-animate inline-flex items-center gap-2 text-white text-[13px] xl:text-[14px] tracking-wide transition font-mono"
                    >
                      {p.linkText}
                      <svg
                        width="16"
                        height="16"
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
          className={`border border-[#2a2a2a] p-8 xl:p-12 flex flex-col justify-center transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[50px]"
              : "opacity-100 translate-y-0 delay-900"
          }`}
        >
          <h3 className="text-[10px] xl:text-[11px] uppercase tracking-wider text-neutral-500 mb-4 xl:mb-6 font-accent">
            About
          </h3>
          <p className="text-neutral-300 text-[13px] xl:text-[15px] leading-relaxed font-sans">
            Ahmed MBridging the gap between deep learning and the hospital floor. 
            As an AI/ML Researcher in M'sila, Algeria, 
            I engineer Medical Diagnostic systems that transform research into high-impact, globally accessible tools, 
            delivering advanced clinical insight wherever it's needed.
          </p>
        </section>

        {/* Contact */}
        <section
          id="contact"
          onClick={() =>
            (window.location.href = "mailto:ahmed.messaad@outlook.com")
          }
          className={`border border-[#2a2a2a] bg-[#1a1a1a] p-8 xl:p-12 flex flex-col cursor-pointer relative hover:bg-[#252525] transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[50px]"
              : "opacity-100 translate-y-0 delay-900"
          }`}
        >
          <svg
            className="absolute top-6 right-6 xl:top-10 xl:right-10 w-6 h-6 xl:w-7 xl:h-7"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M8 24L24 8M24 8H8M24 8V24" />
          </svg>
          <div className="text-[9px] xl:text-[10px] tracking-wider uppercase text-neutral-500 font-accent mb-auto">
            Ready to Collaborate?
          </div>
          <h2 className="text-[44px] xl:text-[56px] font-bold leading-none mb-6 xl:mb-8">
            <span className="font-mono">CONTACT</span>
            <span className="italic font-serif font-light ml-2">me</span>
          </h2>
          <div className="flex justify-between w-full text-[9px] xl:text-[10px] tracking-wider uppercase font-accent">
            <a
              href="https://linkedin.com/in/ahmedmessaad"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-500 hover:text-white transition"
            >
              LINKEDIN
            </a>
            <a
              href="https://github.com/ahmedmessaad"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-500 hover:text-white transition"
            >
              GITHUB
            </a>
            <a
              href="mailto:ahmed.messaad@outlook.com"
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-500 hover:text-white transition"
            >
              EMAIL
            </a>
          </div>
        </section>
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
          className={`border-b border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-center overflow-hidden h-[350px] transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[30px]"
              : "opacity-100 translate-y-0 delay-700"
          }`}
        >
          <img
            src="/ahmed.jpg"
            alt="Ahmed Messaad"
            className="w-full h-full object-cover"
          />
        </section>

        {/* About */}
        <section
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
            diagnostics. Based in M'sila, Algeria, he bridges deep learning
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
                  <a
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
            <a
              href="https://linkedin.com/in/ahmedmessaad"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-500 hover:text-white transition"
            >
              LINKEDIN
            </a>
            <a
              href="https://github.com/ahmedmessaad"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-500 hover:text-white transition"
            >
              GITHUB
            </a>
            <a
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
