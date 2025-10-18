"use client";

import React, { useState, useEffect } from "react";
import { projects } from "./data"; // Assuming 'projects' and 'Project' are exported from data
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

// Import the external CSS file
import './animations.css'; 

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
      if (!isTransitionComplete && profileSection) {
        setIsLoading(false);
        // Ensure final background is set if the effect runs on load without animation
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

    // Animation Constants
    const INITIAL_DELAY = 400;
    const SCALE_DOWN_DURATION = 300;
    const SCALE_DOWN_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    const MOVE_DURATION = 1500;
    const MOVE_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
    const INITIAL_SIZE = isDesktop ? 240 : 180;

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
    imgStyle.transform = `translate(-50%, -50%) scale(1)`; // Initial centering transform
    animatedImg.src = '/ahmed.jpg';
    imgStyle.display = 'block';

    // --- Step 2: Scale Down Animation ---
    const initialDelayTimer = setTimeout(() => {
      const TARGET_SCALE = 0.8;
      // Apply scale down transition and new transform
      imgStyle.transition = `transform ${SCALE_DOWN_DURATION}ms ${SCALE_DOWN_EASING}, border-radius ${SCALE_DOWN_DURATION}ms`;
      imgStyle.transform = `translate(-50%, -50%) scale(${TARGET_SCALE})`;
      imgStyle.borderRadius = '8px';

      // --- Step 3: Wait for scale down, then start the main move ---
      moveTransitionStart = setTimeout(() => {
        const rect = profileSection.getBoundingClientRect();

        // 1. Calculate the required translation (Move image center from screen center to target center)
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;
        const targetCenterX = rect.left + rect.width / 2;
        const targetCenterY = rect.top + rect.height / 2;
        
        const moveX = targetCenterX - screenCenterX;
        const moveY = targetCenterY - screenCenterY;

        // 2. Calculate the final scale factor 
        const finalScale = rect.width / INITIAL_SIZE;

        // 3. Set the long transition on transform and opacity only
        imgStyle.transition = `transform ${MOVE_DURATION}ms ${MOVE_EASING}, opacity 200ms ${MOVE_DURATION - 200}ms linear, border-radius ${MOVE_DURATION}ms ${MOVE_EASING}`;

        // 4. Set the final transform (combines initial centering, move, and final scale)
        imgStyle.transform = `translate3d(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px), 0) scale(${finalScale})`;

        // 5. Update border radius for the final shape
        imgStyle.borderRadius = isDesktop ? '8px' : '6px';
        
        // Set opacity to 0 shortly before the end
        setTimeout(() => {
          imgStyle.opacity = '0';
        }, MOVE_DURATION - 200);

        // Final cleanup after the main transition
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
      
      {/* GLOBAL BACKGROUND FADE */}
      <div
        className={`fixed inset-0 bg-[#0a0a0a] z-[90] pointer-events-none transition-opacity duration-700 ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ANIMATED PROFILE IMAGE - Must be in Page.tsx for useEffect access */}
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

      {/* HEADER - Remains here for simplicity or can be split into Header.tsx */}
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
      <DesktopLayout
        isLoading={isLoading}
        projects={projects}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />

      {/* MOBILE LAYOUT */}
      <MobileLayout
        isLoading={isLoading}
        projects={projects}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />
    </main>
  );
}
