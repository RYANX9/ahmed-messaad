// =============================================================================
// PAGE.TSX - Main Portfolio Page with Theme Support (Working)
// =============================================================================

"use client";

import React, { useState, useEffect, useCallback } from "react";
// Assuming 'data' and 'colors' are in the same directory or accessible path
import { projects } from "./data"; 
import ProjectCard from "./ProjectCard";
import { themes, ThemeType } from "./colors";

// Define the cycle order for the themes
const themeCycle: ThemeType[] = ['dark', 'cream', 'retro'];

export default function Page() {
  const [activeProject, setActiveProject] = useState<string | null>("airm");
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('dark');
  
  // CRITICAL: This line correctly retrieves the active theme object
  const theme = themes[currentTheme];

  // ========== PROFILE IMAGE ANIMATION EFFECT ==========
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDesktop = window.innerWidth >= 1024;
    const animatedImg = document.getElementById('animated-profile') as HTMLImageElement;
    const targetSectionId = isDesktop ? 'profile-grid-section' : 'profile-mobile-section';
    const profileSection = document.getElementById(targetSectionId) as HTMLElement;

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

    profileSection.style.backgroundImage = `url('/ahmed.jpg')`;
    profileSection.style.backgroundSize = 'cover';
    profileSection.style.backgroundPosition = 'center';

    const INITIAL_DELAY = 400;
    const MOVE_DURATION = 1500;
    const MOVE_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
    const INITIAL_SIZE = isDesktop ? 240 : 180;

    const imgStyle = animatedImg.style;
    imgStyle.position = 'fixed';
    imgStyle.top = '50vh';
    imgStyle.left = '50vw';
    imgStyle.width = `${INITIAL_SIZE}px`;
    imgStyle.height = `${INITIAL_SIZE}px`;
    imgStyle.borderRadius = '16px';
    imgStyle.zIndex = '100';
    imgStyle.opacity = '1';
    imgStyle.transform = `translate(-50%, -50%)`;
    animatedImg.src = '/ahmed.jpg';

    // Simplified the cleanup logic and moved the start inside the check
    const timeout = setTimeout(() => {
        const rect = profileSection.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const absoluteLeft = rect.left + window.scrollX;

        imgStyle.transition = `all ${MOVE_DURATION}ms ${MOVE_EASING}`;
        imgStyle.top = `${absoluteTop}px`;
        imgStyle.left = `${absoluteLeft}px`;
        imgStyle.width = `${rect.width + 1}px`;
        imgStyle.height = `${rect.height + 1}px`;
        imgStyle.borderRadius = isDesktop ? '8px' : '6px';
        imgStyle.transform = 'none';

        const completeDelay = setTimeout(() => {
          imgStyle.display = 'none';
          imgStyle.opacity = '0';
          setIsTransitionComplete(true);
          setIsLoading(false);
        }, MOVE_DURATION + 50);

        // Cleanup for the inner timeout
        return () => clearTimeout(completeDelay);
    }, INITIAL_DELAY);

    // Cleanup for the outer timeout
    return () => clearTimeout(timeout);
  }, [isTransitionComplete]);


  // ========== THEME TOGGLE FUNCTION (FIXED) ==========
  const toggleTheme = useCallback(() => {
    setCurrentTheme(prevTheme => {
      const currentIndex = themeCycle.indexOf(prevTheme);
      const nextIndex = (currentIndex + 1) % themeCycle.length;
      return themeCycle[nextIndex];
    });
  }, []); // Added useCallback for stability

  // Helper to determine the *next* theme name for the button label
  const getNextThemeName = (current: ThemeType) => {
    const currentIndex = themeCycle.indexOf(current);
    const nextIndex = (currentIndex + 1) % themeCycle.length;
    return themeCycle[nextIndex].toUpperCase();
  };

  return (
    <main 
      className="min-h-screen overflow-x-hidden transition-colors duration-500"
      style={{ 
        backgroundColor: theme.background,
        color: theme.textPrimary
      }}
    >
      {/* ========== GLOBAL STYLES (Dynamic parts use theme colors) ========== */}
      {/* NOTE: The global style block correctly injects theme.background 
        into the .scroll-fade-bottom::after pseudo-element.
      */}
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
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }

        @keyframes arrow-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(3px, -3px) rotate(2deg); }
          50% { transform: translate(0, -5px) rotate(0deg); }
          75% { transform: translate(-3px, -3px) rotate(-2deg); }
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

        /* DYNAMIC THEME COLOR INJECTION FOR SCROLL FADE */
        .scroll-fade-bottom::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(to bottom, transparent, ${theme.background} 90%);
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      {/* ========== LOADING OVERLAY (Theme-aware) ========== */}
      <div
        className={`fixed inset-0 z-[90] pointer-events-none transition-opacity duration-700 ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: theme.background }}
      />

      {/* ========== ANIMATED PROFILE IMAGE ========== */}
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

      {/* ========== HEADER (Theme-aware) ========== */}
      <header
        className={`fixed top-0 left-0 right-0 h-16 lg:h-20 border-b z-50 flex justify-between items-center px-4 lg:px-10 transition-all duration-700 ${
          isLoading ? "opacity-0" : "opacity-100 delay-300"
        } lg:grid lg:grid-cols-3`}
        style={{
          backgroundColor: theme.background,
          borderColor: theme.border
        }}
      >
        {/* Mobile Title */}
        <div className="lg:col-span-1 lg:hidden font-mono text-sm font-bold tracking-wider">
          AHMED MESSAAD • AI RESEARCHER
        </div>
      
        {/* Desktop Title (Center) */}
        <div className="hidden lg:block lg:col-span-1 lg:col-start-2 text-center font-mono text-xl font-bold tracking-wider">
          AHMED MESSAAD • AI RESEARCHER
        </div>
      
        {/* Right Side Buttons */}
        <div className="flex justify-end items-center gap-2 lg:col-span-1">
          {/* Theme Toggle Button (Updated Text) */}
          <button
            onClick={toggleTheme}
            className="flex items-center border rounded-lg px-3 lg:px-4 py-1.5 lg:py-2 text-[12px] lg:text-[14px] font-mono tracking-wide transition"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
              color: theme.textPrimary
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.surfaceHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.surface}
          >
            {/* Show the next theme name on desktop */}
            <span className="hidden lg:inline">{getNextThemeName(currentTheme)}</span>
            {/* Show emoji based on current theme for mobile */}
            <span className="lg:hidden inline">
              {currentTheme === 'dark' ? '☀️' : currentTheme === 'cream' ? '📜' : '📺'}
            </span>
            <svg
              className="w-3 h-3 lg:w-4 lg:h-4 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
          </button>

          {/* CV Download Button (Theme-aware hover effects) */}
          <a
            href="/ahmed_messad_cv.pdf"
            download
            className="flex items-center transition-colors duration-200"
            style={{ color: theme.textPrimary }}
          >
            <div 
              className="flex items-center border rounded-lg px-3 lg:px-4 py-1.5 lg:py-2 text-[12px] lg:text-[14px] font-mono tracking-wide transition"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.border
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.surfaceHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.surface}
            >
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

      {/* ========================================================================== */}
      {/* ========================== DESKTOP LAYOUT (Theme-aware) =============================== */}
      {/* ========================================================================== */}
      <div className="hidden lg:block lg:h-[calc(100vh-80px)] lg:mt-[80px] p-3">
        <div className="grid grid-cols-[9fr_6fr_10fr] auto-rows-fr gap-3 h-full">
          
          {/* ========== TITLE/INTRO SECTION ========== */}
          <section
            className={`border rounded-2xl p-8 xl:p-10 flex flex-col justify-between transition-all duration-1000 ${
              isLoading
                ? "opacity-0 translate-y-[50px]"
                : "opacity-100 translate-y-0 delay-500"
            }`}
            style={{
              backgroundColor: theme.background,
              borderColor: theme.border
            }}
          >
            <div className="flex items-start justify-end">
              <svg
                className="w-16 h-16 xl:w-20 xl:h-20"
                style={{ color: theme.accentLight }}
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
            
            <div>
              <h1 className="text-[26px] xl:text-[32px] leading-[1.2] mb-6">
                <span className="font-mono font-bold">Engineering Explainable AI </span>
                <span className="italic font-serif font-light">Systems </span>
                <span className="font-mono font-bold">for Clinical Impact</span>
              </h1>
              <div 
                className="text-[10px] xl:text-[11px] tracking-wider uppercase font-accent"
                style={{ color: theme.textTertiary }}
              >
                Medical AI Research • Transfer Learning • Computer Vision
              </div>
            </div>
          </section>

          {/* ========== PROFILE PICTURE SECTION ========== */}
          <section 
            id="profile-grid-section"
            className="border rounded-2xl overflow-hidden relative"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border
            }}
          />

          {/* ========== PROJECTS SECTION ========== */}
          <aside
            id="projects"
            className={`row-span-2 border rounded-2xl flex flex-col overflow-hidden transition-all duration-1000 scroll-fade-bottom ${
              isLoading
                ? "opacity-0 translate-y-[50px]"
                : "opacity-100 translate-y-0 delay-900"
            }`}
            style={{
              backgroundColor: theme.background,
              borderColor: theme.border
            }}
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
                  theme={theme} // Pass the theme object
                />
              ))}
            </div>
          </aside>
          
          {/* ========== ABOUT & CONTACT ROW ========== */}
          <div className="col-span-2 flex gap-3 h-full">
            
            {/* ========== ABOUT SECTION ========== */}
            <section
              id="about"
              className={`flex-1 w-1/2 border rounded-2xl p-8 xl:p-10 flex flex-col justify-between transition-all duration-1000 ${
                isLoading
                  ? "opacity-0 translate-y-[50px]"
                  : "opacity-100 translate-y-0 delay-1100"
              }`}
              style={{
                backgroundColor: theme.background,
                borderColor: theme.border
              }}
            >
              <div className="flex items-start justify-start">
                <svg
                  className="w-12 h-12 xl:w-14 xl:h-14"
                  style={{ color: theme.accentLight }}
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <circle cx="50" cy="50" r="20" />
                  <circle cx="50" cy="50" r="5" />
                </svg>
              </div>
              
              <div>
                <h3 
                  className="text-[10px] xl:text-[11px] uppercase tracking-wider mb-4 xl:mb-5 font-accent"
                  style={{ color: theme.textTertiary }}
                >
                  About
                </h3>
                <p 
                  className="text-[14px] xl:text-[16px] leading-relaxed font-sans"
                  style={{ color: theme.textSecondary }}
                >
                  Developing clinically-deployable AI systems that bridge academic research and healthcare impact. 
                  My work investigates explainable deep learning architectures, transfer learning optimization, 
                  and diagnostic system design for resource-constrained clinical environments.
                </p>
              </div>
            </section>

            {/* ========== CONTACT SECTION (Theme-aware hover effects) ========== */}
            <section
              id="contact-section"
              onClick={() => (window.location.href = "mailto:ahmed.messaad@outlook.com")}
              className={`flex-1 w-1/2 border rounded-2xl p-8 xl:p-10 flex flex-col cursor-pointer relative transition-all duration-1000 ${
                isLoading
                  ? "opacity-0 translate-y-[50px]"
                  : "opacity-100 translate-y-0 delay-1100"
              }`}
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.border
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.surfaceHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.surface}
            >
              <div className="flex justify-between items-start">
                <div 
                  className="text-[9px] xl:text-[10px] tracking-wider uppercase font-accent"
                  style={{ color: theme.textTertiary }}
                >
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
              
              <div className="mt-auto pb-1"> 
                <h2 className="text-[48px] xl:text-[56px] font-bold leading-none mb-3">
                  <span className="font-mono">Contact</span>&thinsp;<span className="italic font-serif font-light">me</span>
                </h2>
                
                <div className="flex justify-between w-full text-[9px] xl:text-[10px] tracking-wider uppercase font-accent mb-2">
                  <a
                    href="https://linkedin.com/in/ahmedmessaad"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="transition"
                    style={{ color: theme.textTertiary }}
                    onMouseEnter={(e) => e.currentTarget.style.color = theme.textPrimary}
                    onMouseLeave={(e) => e.currentTarget.style.color = theme.textTertiary}
                  >
                    LINKEDIN
                  </a>
                  <a
                    href="https://github.com/RYANX9"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="transition"
                    style={{ color: theme.textTertiary }}
                    onMouseEnter={(e) => e.currentTarget.style.color = theme.textPrimary}
                    onMouseLeave={(e) => e.currentTarget.style.color = theme.textTertiary}
                  >
                    GITHUB 
                  </a>
                  <a
                    href="mailto:ahmed.messaad@outlook.com"
                    onClick={(e) => e.stopPropagation()}
                    className="transition"
                    style={{ color: theme.textTertiary }}
                    onMouseEnter={(e) => e.currentTarget.style.color = theme.textPrimary}
                    onMouseLeave={(e) => e.currentTarget.style.color = theme.textTertiary}
                  >
                    EMAIL
                  </a>
                </div>
                
                <div 
                  className="text-[8px] uppercase tracking-widest font-mono"
                  style={{ color: theme.textTertiary }}
                >
                  Designed & Built by Ahmed Messaad
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ========================================================================== */}
      {/* =========================== MOBILE LAYOUT (Theme-aware) =============================== */}
      {/* ========================================================================== */}
      <div className="lg:hidden pt-18 p-3">
        <div className="flex flex-col gap-3">
          
          {/* ========== TITLE/INTRO SECTION ========== */}
          <section
            className={`border rounded-2xl p-6 flex flex-col gap-6 min-h-[30vh] transition-all duration-1000 ${
              isLoading
                ? "opacity-0 translate-y-[30px]"
                : "opacity-100 translate-y-0 delay-500"
            }`}
            style={{
              backgroundColor: theme.background,
              borderColor: theme.border
            }}
          >
            <div className="flex items-start justify-end">
              <svg
                className="w-14 h-14"
                style={{ color: theme.accentLight }}
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
              <div 
                className="text-[11px] tracking-wider uppercase font-accent"
                style={{ color: theme.textTertiary }}
              >
                Medical AI Research • Transfer Learning • Computer Vision
              </div>
            </div>
          </section>

          {/* ========== PROFILE PICTURE SECTION ========== */}
          <section
            id="profile-mobile-section"
            className="border rounded-2xl flex items-center justify-center overflow-hidden h-[50vh] relative"
            style={{
              backgroundColor: theme.background,
              borderColor: theme.border
            }}
          />

          {/* ========== ABOUT SECTION ========== */}
          <section
            className={`border rounded-2xl p-6 flex flex-col gap-6 min-h-[200px] transition-all duration-1000 ${
              isLoading
                ? "opacity-0 translate-y-[30px]"
                : "opacity-100 translate-y-0 delay-900"
            }`}
            style={{
              backgroundColor: theme.background,
              borderColor: theme.border
            }}
          >
            <div className="flex items-start justify-start">
              <svg
                className="w-10 h-10"
                style={{ color: theme.accentLight }}
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
              <h3 
                className="text-[9px] uppercase tracking-wider mb-3 font-accent"
                style={{ color: theme.textTertiary }}
              >
                About
              </h3>
              <p 
                className="text-[14px] leading-relaxed font-sans"
                style={{ color: theme.textSecondary }}
              >
                Developing clinically-deployable AI systems that bridge academic research and healthcare impact. 
                My work investigates explainable deep learning architectures, transfer learning optimization, 
                and diagnostic system design for resource-constrained clinical environments.
              </p>
            </div>
          </section>

          {/* ========== PROJECTS SECTION ========== */}
          <aside
            id="projects"
            className={`border rounded-2xl overflow-hidden transition-all duration-1000 ${
              isLoading
                ? "opacity-0 translate-y-[30px]"
                : "opacity-100 translate-y-0 delay-1100"
            }`}
            style={{
              backgroundColor: theme.background,
              borderColor: theme.border
            }}
          >
            {projects.map((p, idx) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={idx}
                activeProject={activeProject}
                onToggle={setActiveProject}
                isMobile={true}
                theme={theme} // Pass the theme object
              />
            ))}
          </aside>

          {/* ========== CONTACT SECTION (Theme-aware hover effects) ========== */}
          <section
            onClick={() => (window.location.href = "mailto:ahmed.messaad@outlook.com")}
            className={`border rounded-2xl p-6 flex flex-col cursor-pointer transition-all duration-1000 relative justify-between min-h-[35vh] ${
              isLoading
                ? "opacity-0 translate-y-[30px]"
                : "opacity-100 translate-y-0 delay-1300"
            }`}
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.surfaceHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.surface}
          >
            <div className="flex justify-between items-start">
              <div 
                className="text-[9px] tracking-wider uppercase font-accent"
                style={{ color: theme.textTertiary }}
              >
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
                  className="transition"
                  style={{ color: theme.textTertiary }}
                  onMouseEnter={(e) => e.currentTarget.style.color = theme.textPrimary}
                  onMouseLeave={(e) => e.currentTarget.style.color = theme.textTertiary}
                >
                  LINKEDIN
                </a>
                <a
                  href="https://github.com/RYANX9"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="transition"
                  style={{ color: theme.textTertiary }}
                  onMouseEnter={(e) => e.currentTarget.style.color = theme.textPrimary}
                  onMouseLeave={(e) => e.currentTarget.style.color = theme.textTertiary}
                >
                  GITHUB
                </a>
                <a
                  href="mailto:ahmed.messaad@outlook.com"
                  onClick={(e) => e.stopPropagation()}
                  className="transition"
                  style={{ color: theme.textTertiary }}
                  onMouseEnter={(e) => e.currentTarget.style.color = theme.textPrimary}
                  onMouseLeave={(e) => e.currentTarget.style.color = theme.textTertiary}
                >
                  EMAIL
                </a>
              </div>
            </div>
            
            <div 
              className="text-[8px] uppercase tracking-widest font-mono mt-auto pt-2"
              style={{ color: theme.textTertiary }}
            >
              Designed & Built by Ahmed Messaad
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
