"use client";

import React, { useState, useEffect } from "react";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
import "./animations.css"; // 

export default function Page() {
  const [activeProject, setActiveProject] = useState<string | null>("airm");
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDesktop = window.innerWidth >= 1024;
    const animatedImg = document.getElementById("animated-profile") as HTMLImageElement;
    const targetSectionId = isDesktop ? "profile-grid-section" : "profile-mobile-section";
    const profileSection = document.getElementById(targetSectionId) as HTMLElement;

    if (isTransitionComplete || !animatedImg || !profileSection) {
      if (!isTransitionComplete) {
        setIsLoading(false);
        profileSection.style.backgroundImage = `url('/ahmed.jpg')`;
        profileSection.style.backgroundSize = "cover";
        profileSection.style.backgroundPosition = "center";
        setIsTransitionComplete(true);
      }
      return;
    }

    profileSection.style.backgroundImage = `url('/ahmed.jpg')`;
    profileSection.style.backgroundSize = "cover";
    profileSection.style.backgroundPosition = "center";

    const INITIAL_DELAY = 400;
    const MOVE_DURATION = 1500;
    const MOVE_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
    const INITIAL_SIZE = isDesktop ? 240 : 180;

    const imgStyle = animatedImg.style;
    imgStyle.position = "fixed";
    imgStyle.top = "50vh";
    imgStyle.left = "50vw";
    imgStyle.width = `${INITIAL_SIZE}px`;
    imgStyle.height = `${INITIAL_SIZE}px`;
    imgStyle.borderRadius = "16px";
    imgStyle.zIndex = "100";
    imgStyle.opacity = "1";
    imgStyle.transform = `translate(-50%, -50%)`;
    animatedImg.src = "/ahmed.jpg";

    const moveTransitionStart = setTimeout(() => {
      const rect = profileSection.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const absoluteLeft = rect.left + window.scrollX;

      imgStyle.transition = `all ${MOVE_DURATION}ms ${MOVE_EASING}`;
      imgStyle.top = `${absoluteTop}px`;
      imgStyle.left = `${absoluteLeft}px`;
      imgStyle.width = `${rect.width + 1}px`;
      imgStyle.height = `${rect.height + 1}px`;
      imgStyle.borderRadius = isDesktop ? "8px" : "6px";
      imgStyle.transform = "none";

      const completeDelay = setTimeout(() => {
        imgStyle.display = "none";
        imgStyle.opacity = "0";
        setIsTransitionComplete(true);
        setIsLoading(false);
      }, MOVE_DURATION + 50);

      return () => clearTimeout(completeDelay);
    }, MOVE_DURATION + INITIAL_DELAY);

    return () => clearTimeout(moveTransitionStart);
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
        src={isTransitionComplete ? "" : "/ahmed.jpg"}
        alt="Ahmed Messaad"
        className={`object-cover ${isTransitionComplete ? "hidden" : "block"}`}
        style={{
          transform: `translate(-50%, -50%)`,
          zIndex: 100,
          pointerEvents: "none",
        }}
      />

      {/* Layouts */}
      <DesktopLayout
        isLoading={isLoading}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />
      <MobileLayout
        isLoading={isLoading}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />
    </main>
  );
}
