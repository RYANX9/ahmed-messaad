"use client";

import React, { useState, useEffect } from "react";
import { projects } from "./data";
import ProjectCard from "./ProjectCard";

export default function Page() {
  const [activeProject, setActiveProject] = useState<string | null>("airm");
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);

  useEffect(() => {
    // Standard early exit for server-side rendering
    if (typeof window === "undefined") return;

    // Determine environment and target elements
    const isDesktop = window.innerWidth >= 1024;
    const animatedImg = document.getElementById('animated-profile') as HTMLImageElement;
    const targetSectionId = isDesktop ? 'profile-grid-section' : 'profile-mobile-section';
    const profileSection = document.getElementById(targetSectionId) as HTMLElement;

    // Cleanup/Completion Logic
    if (isTransitionComplete || !animatedImg || !profileSection) {
      if (!isTransitionComplete) {
        setIsLoading(false);
        profileSection.style.backgroundImage = `url('/ahmed.jpg')`;
        profileSection.style.backgroundSize = 'cover';
        profileSection.style.backgroundPosition = 'center';
        setIsTransitionComplete(true);
      }
      return;
    }

    // Set final background immediately (will be visible once the animated image fades out)
    profileSection.style.backgroundImage = `url('/ahmed.jpg')`;
    profileSection.style.backgroundSize = 'cover';
    profileSection.style.backgroundPosition = 'center';

    // Get target dimensions FIRST
    const rect = profileSection.getBoundingClientRect();
    
    // Animation Constants
    const INITIAL_DELAY = 400;
    const SCALE_DOWN_DURATION = 300;
    const SCALE_DOWN_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    const MOVE_DURATION = 1500;
    const MOVE_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
    const INITIAL_SIZE = isDesktop ? 240 : 180;
    const SHRINK_SCALE = 0.8;
    
    // Calculate EXACT final dimensions and position
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    const targetCenterX = rect.left + rect.width / 2;
    const targetCenterY = rect.top + rect.height / 2;
    const moveX = targetCenterX - screenCenterX;
    const moveY = targetCenterY - screenCenterY;
    
    // Final scale to match the section WIDTH exactly
    const finalScale = rect.width / INITIAL_SIZE;
    const finalBorderRadius = isDesktop ? '8px' : '6px';

    const imgStyle = animatedImg.style;
    let moveTransitionStart: NodeJS.Timeout | null = null;
    let completeDelay: NodeJS.Timeout | null = null;

    // --- Step 1: Initial Fixed State (Centered) ---
    imgStyle.position = 'fixed';
    imgStyle.top = '50vh';
    imgStyle.left = '50vw';
    imgStyle.width = `${INITIAL_SIZE}px`;
    imgStyle.height = `${INITIAL_SIZE}px`;
    imgStyle.borderRadius = '16px';
    imgStyle.zIndex = '100';
    imgStyle.opacity = '1';
    imgStyle.transform = `translate(-50%, -50%) scale(1)`;
    imgStyle.objectFit = 'cover';
    imgStyle.objectPosition = 'center';
    imgStyle.overflow = 'hidden';
    
    animatedImg.src = '/ahmed.jpg';
    imgStyle.display = 'block';

    // --- Step 2: Scale Down Animation (shrink to 80%) ---
    const initialDelayTimer = setTimeout(() => {
      imgStyle.transition = `transform ${SCALE_DOWN_DURATION}ms ${SCALE_DOWN_EASING}, border-radius ${SCALE_DOWN_DURATION}ms ${SCALE_DOWN_EASING}`;
      imgStyle.transform = `translate(-50%, -50%) scale(${SHRINK_SCALE})`;
      imgStyle.borderRadius = '8px';

      // --- Step 3: Move and scale to final position ---
      moveTransitionStart = setTimeout(() => {
        
        // Set transition for the move/scale
        imgStyle.transition = `
          transform ${MOVE_DURATION}ms ${MOVE_EASING}, 
          border-radius ${MOVE_DURATION}ms ${MOVE_EASING},
          width ${MOVE_DURATION}ms ${MOVE_EASING},
          height ${MOVE_DURATION}ms ${MOVE_EASING},
          opacity 200ms ${MOVE_DURATION - 200}ms linear
        `;

        // Change dimensions to EXACT final size
        imgStyle.width = `${rect.width}px`;
        imgStyle.height = `${rect.height}px`;
        
        // Apply final transform (move to final position, scale back to 1 since we changed the dimensions)
        imgStyle.transform = `translate3d(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px), 0) scale(1)`;
        imgStyle.borderRadius = finalBorderRadius;
        
        // Fade out near the end to reveal the background
        setTimeout(() => {
          imgStyle.opacity = '0';
        }, MOVE_DURATION - 200);

        // Cleanup
        completeDelay = setTimeout(() => {
          imgStyle.display = 'none';
          setIsTransitionComplete(true);
          setIsLoading(false);
        }, MOVE_DURATION + 50);

      }, SCALE_DOWN_DURATION + 50);

    }, INITIAL_DELAY);

    // Cleanup function for React
    return () => {
      clearTimeout(initialDelayTimer);
      if (moveTransitionStart) clearTimeout(moveTransitionStart);
      if (completeDelay) clearTimeout(completeDelay);
    };
  }, [isTransitionComplete]);


  
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

        .scroll-fade-bottom {
          position: relative;
        }

        .scroll-fade-bottom::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(to bottom, transparent, #0a0a0a 90%);
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      <div
        className={`fixed inset-0 bg-[#0a0a0a] z-[90] pointer-events-none transition-opacity duration-700 ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      />

      <img
        id="animated-profile"
        src={isTransitionComplete ? '' : "/ahmed.jpg"}
        alt="Ahmed Messaad"
        className={`object-cover ${isTransitionComplete ? 'hidden' : 'block'}`}
        style={{
          transform: `translate(-50%, -50%)`,
          zIndex: 100,
          pointerEvents: 'none',
        }}
      />

      <header
        className={`fixed top-0 left-0 right-0 h-16 lg:h-20 bg-[#0a0a0a] border-b border-[#2a2a2a] z-50 flex justify-between items-center px-4 lg:px-10 transition-opacity duration-700 ${
          isLoading ? "opacity-0" : "opacity-100 delay-300"
        } lg:grid lg:grid-cols-3`}
      >
        <div className="lg:col-span-1 lg:hidden font-mono text-sm font-bold tracking-wider">
          AHMED MESSAAD • AI RESEARCHER
        </div>
        
        <div className="hidden lg:block lg:col-span-1 lg:col-start-2 text-center font-mono text-xl font-bold tracking-wider">
          AHMED MESSAAD • AI RESEARCHER
        </div>
        
        <div className="flex justify-end items-center lg:col-span-1">
          <a
            href="/ahmed_messad_cv.pdf"
            download
            className="flex items-center text-white transition-colors duration-200"
          >
            <div className="flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 lg:px-4 py-1.5 lg:py-2 text-[12px] lg:text-[14px] font-mono tracking-wide hover:bg-[#252525] transition">
              <span className="hidden lg:inline">DOWNLOAD CV</span>
              <span className="lg:hidden inline">CV</span>
              <svg
                className="w-3 h-3 lg:w-4 lg:h-4 ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 15L12 3M12 15L8 11M12 15L16 11M20 17H4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
        </div>
      </header>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block lg:h-[calc(100vh-80px)] lg:mt-[80px] p-3">
        <div className="grid grid-cols-[9fr_6fr_10fr] auto-rows-fr gap-3 h-full">
          
          {/* HERO SECTION - FIXED */}
          <section
            className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 2xl:p-8 flex flex-col justify-between transition-all duration-1000 overflow-hidden ${
              isLoading
                ? "opacity-0 translate-y-[50px]"
                : "opacity-100 translate-y-0 delay-500"
            }`}
          >
            <div className="flex items-start justify-end flex-shrink-0">
              <svg
                className="w-12 h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 text-neutral-700"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              >
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
            
            <div className="flex-shrink-0 mt-auto">
              <h1 className="text-[18px] xl:text-[22px] 2xl:text-[28px] leading-[1.25] mb-3 xl:mb-4 2xl:mb-5">
                <span className="font-mono font-bold">Engineering Explainable AI </span>
                <span className="italic font-serif font-light">Systems </span>
                <span className="font-mono font-bold">for Clinical Impact</span>
              </h1>
              <div className="text-[9px] xl:text-[10px] 2xl:text-[11px] tracking-wider uppercase text-neutral-400 font-accent">
                Medical AI Research • Transfer Learning • Computer Vision
              </div>
            </div>
          </section>

          <section 
            id="profile-grid-section"
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden relative"
          />

          <aside
            id="projects"
            className={`row-span-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl flex flex-col overflow-hidden transition-all duration-1000 scroll-fade-bottom ${
              isLoading
                ? "opacity-0 translate-y-[50px]"
                : "opacity-100 translate-y-0 delay-900"
            }`}
          >
            <div className="flex-1 overflow-y-auto invisible-scroll">
              {projects.map((p, idx) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={idx}
                  activeProject={activeProject}
                  onToggle={setActiveProject}
                  isMobile={false}
                />
              ))}
            </div>
          </aside>
          
          <div className="col-span-2 flex gap-3 h-full">
            {/* ABOUT SECTION - FIXED */}
            <section
              id="about"
              className={`flex-1 w-1/2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 2xl:p-8 flex flex-col justify-between transition-all duration-1000 overflow-hidden ${
                isLoading
                  ? "opacity-0 translate-y-[50px]"
                  : "opacity-100 translate-y-0 delay-1100"
              }`}
            >
              <div className="flex items-start justify-start flex-shrink-0">
                <svg
                  className="w-10 h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 text-neutral-700"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <circle cx="50" cy="50" r="20" />
                  <circle cx="50" cy="50" r="5" />
                </svg>
              </div>
              
              <div className="flex-shrink-0 mt-auto">
                <h3 className="text-[9px] xl:text-[10px] 2xl:text-[11px] uppercase tracking-wider text-neutral-500 mb-3 xl:mb-4 2xl:mb-5 font-accent">
                  About
                </h3>
                <p className="text-neutral-300 text-[12px] xl:text-[13px] 2xl:text-[15px] leading-relaxed font-sans">
                  Developing clinically-deployable AI systems that bridge academic research and healthcare impact. 
                  My work investigates explainable deep learning architectures, transfer learning optimization, 
                  and diagnostic system design for resource-constrained clinical environments.
                </p>
              </div>
            </section>

            <section
              id="contact-section"
              onClick={() =>
                (window.location.href = "mailto:ahmed.messaad@outlook.com")
              }
              className={`flex-1 w-1/2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 2xl:p-8 flex flex-col cursor-pointer relative hover:bg-[#252525] transition-all duration-1000 overflow-hidden ${
                isLoading
                  ? "opacity-0 translate-y-[50px]"
                  : "opacity-100 translate-y-0 delay-1100"
              }`}
            >
              <div className="flex justify-between items-start flex-shrink-0">
                <div className="text-[9px] xl:text-[10px] tracking-wider uppercase text-neutral-500 font-accent">
                  Start a Conversation<br />
                </div>
                <svg
                  className="w-6 h-6 xl:w-7 xl:h-7 arrow-contact-animate"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 24L24 8M24 8H8M24 8V24" />
                </svg>
              </div>
              
              <div className="flex-1"></div>
              
              <div className="mt-auto flex-shrink-0"> 
                <h2 className="text-[48px] xl:text-[56px] font-bold leading-none mb-6 xl:mb-8">
                  <span className="font-mono">Contact</span>&thinsp;<span className="italic font-serif font-light">me</span>
                </h2>
                
                <div className="flex justify-between w-full text-[9px] xl:text-[10px] tracking-wider uppercase font-accent mb-3">
                  <a // <-- FIXED: Added missing <a> tag
                    href="https://linkedin.com/in/ahmedmessaad"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-neutral-500 hover:text-white transition"
                  >
                    LINKEDIN
                  </a>
                  
                  <a // <-- FIXED: Added missing <a> tag
                    href="https://github.com/RYANX9"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-neutral-500 hover:text-white transition"
                  >
                    GITHUB 
                  </a>
                  
                  <a // <-- FIXED: Added missing <a> tag
                    href="mailto:ahmed.messaad@outlook.com"
                    onClick={(e) => e.stopPropagation()}
                    className="text-neutral-500 hover:text-white transition"
                  >
                    EMAIL
                  </a>
                </div>
                
                <div className="text-[8px] text-neutral-500 uppercase tracking-widest font-mono">
                  Developed by Ahmed Messaad
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden pt-18 p-3">
        <div className="flex flex-col gap-3">
          
          <section
            className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-6 min-h-[30vh] transition-all duration-1000 ${
              isLoading
                ? "opacity-0 translate-y-[30px]"
                : "opacity-100 translate-y-0 delay-500"
            }`}
          >
            <div className="flex items-start justify-end">
              <svg
                className="w-14 h-14 text-neutral-700"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              >
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
              <h1 className="text-[34px] leading-[1.2] mb-5">
                <span className="font-mono font-bold">Engineering Explainable AI </span>
                <span className="italic font-serif font-light">Systems </span>
                <span className="font-mono font-bold">for Clinical Impact</span>
              </h1>
              <div className="text-[11px] tracking-wider uppercase text-neutral-400 font-accent">
                Medical AI Research • Transfer Learning • Computer Vision
              </div>
            </div>
          </section>

          <section
            id="profile-mobile-section"
            className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl flex items-center justify-center overflow-hidden h-[50vh] relative"
          />

          <section
            className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-6 min-h-[200px] transition-all duration-1000 ${
              isLoading
                ? "opacity-0 translate-y-[30px]"
                : "opacity-100 translate-y-0 delay-900"
            }`}
          >
            <div className="flex items-start justify-start">
              <svg
                className="w-10 h-10 text-neutral-700"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <circle cx="50" cy="50" r="20" />
                <circle cx="50" cy="50" r="5" />
              </svg>
            </div>
            
            <div className="mt-auto">
              <h3 className="text-[9px] uppercase tracking-wider text-neutral-500 mb-3 font-accent">
                About
              </h3>
              <p className="text-neutral-300 text-[14px] leading-relaxed font-sans">
                Developing clinically-deployable AI systems that bridge academic research and healthcare impact. 
                My work investigates explainable deep learning architectures, transfer learning optimization, 
                and diagnostic system design for resource-constrained clinical environments.
              </p>
            </div>
          </section>

          <aside
            id="projects"
            className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl overflow-hidden transition-all duration-1000 ${
              isLoading
                ? "opacity-0 translate-y-[30px]"
                : "opacity-100 translate-y-0 delay-1100"
            }`}
          >
            {projects.map((p, idx) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={idx}
                activeProject={activeProject}
                onToggle={setActiveProject}
                isMobile={true}
              />
            ))}
          </aside>

          <section
            onClick={() =>
              (window.location.href = "mailto:ahmed.messaad@outlook.com")
            }
            className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col cursor-pointer hover:bg-[#252525] transition-all duration-1000 relative justify-between min-h-[35vh] ${
              isLoading
                ? "opacity-0 translate-y-[30px]"
                : "opacity-100 translate-y-0 delay-1300"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="text-[9px] tracking-wider uppercase text-neutral-500 font-accent">
                Start a Conversation<br />
              </div>
              <svg
                className="w-5 h-5 arrow-contact-animate"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 24L24 8M24 8H8M24 8V24" />
              </svg>
            </div>
            
            <div className="flex-1"></div>
            
            <div className="mt-auto flex flex-col items-start">
              <h2 className="text-[48px] font-bold leading-none mb-4">
                  <span className="font-mono">Contact</span>&thinsp;<span className="italic font-serif font-light">me</span>
              </h2>
              
              <div className="flex justify-between w-full text-[9px] tracking-wider uppercase font-accent mb-4">
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
                  href="https://github.com/RYANX9"
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
            </div>
            
            <div className="text-[8px] text-neutral-500 uppercase tracking-widest font-mono mt-auto pt-2">
              Developed by Ahmed Messaad
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
