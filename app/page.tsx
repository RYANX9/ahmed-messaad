"use client";

import React, { useState, useEffect, useRef } from "react";
import { projects } from "./data";
import ProjectCard from "./ProjectCard";
import './animations.css';

export default function Page() {
  const [activeProject, setActiveProject] = useState<string | null>("airm");
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDesktop = window.innerWidth >= 1024;
    const animatedImg = document.getElementById('animated-profile') as HTMLImageElement;
    const targetSectionId = isDesktop ? 'profile-grid-section' : 'profile-mobile-section';
    const profileSection = document.getElementById(targetSectionId) as HTMLElement;

    if (isTransitionComplete || !animatedImg || !profileSection) {
      if (!isTransitionComplete && profileSection) {
        setIsLoading(false);
        profileSection.style.backgroundImage = `url('/ahmed.jpg')`;
        profileSection.style.backgroundSize = 'cover';
        profileSection.style.backgroundPosition = 'center';
        setIsTransitionComplete(true);
      }
      return;
    }

    // Set background immediately
    profileSection.style.backgroundImage = `url('/ahmed.jpg')`;
    profileSection.style.backgroundSize = 'cover';
    profileSection.style.backgroundPosition = 'center';
    profileSection.style.opacity = '0';

    // Force a reflow to ensure everything is rendered
    void profileSection.offsetHeight;

    // Get precise measurements
    const rect = profileSection.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Constants
    const INITIAL_SIZE = isDesktop ? 240 : 180;
    const INITIAL_DELAY = 400;
    const SHRINK_DURATION = 300;
    const MOVE_DURATION = 1400;
    const FADE_DURATION = 200;

    // Calculate exact positions
    const startX = viewportWidth / 2;
    const startY = viewportHeight / 2;
    const endX = rect.left + rect.width / 2;
    const endY = rect.top + rect.height / 2;
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // Calculate scales
    const shrinkScale = 0.85;
    const finalScaleX = rect.width / INITIAL_SIZE;
    const finalScaleY = rect.height / INITIAL_SIZE;

    const imgStyle = animatedImg.style;
    let startTime: number | null = null;
    let phase: 'initial' | 'shrink' | 'move' | 'fade' | 'complete' = 'initial';

    // Setup initial state
    imgStyle.position = 'fixed';
    imgStyle.top = '0';
    imgStyle.left = '0';
    imgStyle.width = `${INITIAL_SIZE}px`;
    imgStyle.height = `${INITIAL_SIZE}px`;
    imgStyle.margin = '0';
    imgStyle.padding = '0';
    imgStyle.border = 'none';
    imgStyle.borderRadius = '16px';
    imgStyle.zIndex = '100';
    imgStyle.opacity = '1';
    imgStyle.objectFit = 'cover';
    imgStyle.objectPosition = 'center';
    imgStyle.transform = `translate(${startX - INITIAL_SIZE / 2}px, ${startY - INITIAL_SIZE / 2}px) scale(1)`;
    imgStyle.transition = 'none';
    imgStyle.willChange = 'transform, border-radius, opacity';
    imgStyle.backfaceVisibility = 'hidden';
    imgStyle.WebkitBackfaceVisibility = 'hidden';
    imgStyle.perspective = '1000px';
    imgStyle.WebkitPerspective = '1000px';
    
    animatedImg.src = '/ahmed.jpg';
    imgStyle.display = 'block';

    // Force reflow
    void animatedImg.offsetHeight;

    // Animation function using requestAnimationFrame for smoothness
    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      // Phase 1: Initial delay
      if (phase === 'initial') {
        if (elapsed >= INITIAL_DELAY) {
          phase = 'shrink';
          startTime = timestamp;
        }
      }
      
      // Phase 2: Shrink animation
      else if (phase === 'shrink') {
        const progress = Math.min(elapsed / SHRINK_DURATION, 1);
        const eased = easeOutCubic(progress);
        
        const currentScale = 1 + (shrinkScale - 1) * eased;
        const currentBorderRadius = 16 + (12 - 16) * eased;
        
        imgStyle.transform = `translate(${startX - INITIAL_SIZE / 2}px, ${startY - INITIAL_SIZE / 2}px) scale(${currentScale})`;
        imgStyle.borderRadius = `${currentBorderRadius}px`;
        
        if (progress >= 1) {
          phase = 'move';
          startTime = timestamp;
        }
      }
      
      // Phase 3: Move and scale animation
      else if (phase === 'move') {
        const progress = Math.min(elapsed / MOVE_DURATION, 1);
        const eased = easeInOutCubic(progress);
        
        // Current position
        const currentDeltaX = deltaX * eased;
        const currentDeltaY = deltaY * eased;
        const currentX = startX + currentDeltaX - INITIAL_SIZE / 2;
        const currentY = startY + currentDeltaY - INITIAL_SIZE / 2;
        
        // Current scale
        const scaleX = shrinkScale + (finalScaleX - shrinkScale) * eased;
        const scaleY = shrinkScale + (finalScaleY - shrinkScale) * eased;
        
        // Current border radius
        const finalBorderRadius = isDesktop ? 8 : 6;
        const currentBorderRadius = 12 + (finalBorderRadius - 12) * eased;
        
        imgStyle.transform = `translate(${currentX}px, ${currentY}px) scale(${scaleX}, ${scaleY})`;
        imgStyle.borderRadius = `${currentBorderRadius}px`;
        
        // Start fading near the end
        if (progress >= 0.85 && phase === 'move') {
          phase = 'fade';
          startTime = timestamp;
        } else if (progress >= 1) {
          phase = 'complete';
        }
      }
      
      // Phase 4: Fade out
      else if (phase === 'fade') {
        const fadeProgress = Math.min(elapsed / FADE_DURATION, 1);
        const currentOpacity = 1 - fadeProgress;
        
        imgStyle.opacity = `${currentOpacity}`;
        
        // Make background visible as we fade
        profileSection.style.opacity = `${fadeProgress}`;
        
        if (fadeProgress >= 1) {
          phase = 'complete';
        }
      }

      // Continue animation or complete
      if (phase !== 'complete') {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Cleanup
        imgStyle.display = 'none';
        profileSection.style.opacity = '1';
        setIsTransitionComplete(true);
        setIsLoading(false);
        
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      }
    };

    // Easing functions
    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function easeInOutCubic(t: number): number {
      return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isTransitionComplete]);

  
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
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
          
          {/* HERO SECTION */}
          <section
            className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 2xl:p-8 flex flex-col justify-between transition-all duration-1000 overflow-hidden ${
              isLoading
                ? "opacity-0 translate-y-[50px]"
                : "opacity-100 translate-y-0 delay-500"
            }`}
          >
            <div className="flex items-start justify-end flex-shrink-0">
              <img 
                src="/ai.svg" 
                alt="AI Icon"
                className={`w-12 h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 ai-svg-white ${!isLoading ? 'spin-delayed' : ''}`}
              />
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
            {/* ABOUT SECTION */}
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
              <img 
                src="/ai.svg" 
                alt="AI Icon"
                className={`w-14 h-14 ai-svg-white ${!isLoading ? 'spin-delayed' : ''}`}
              />
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
