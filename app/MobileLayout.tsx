import React from "react";

// Assuming these imports are correct based on the initial provided code snippet
import ProjectCard from "./ProjectCard";
import { Project } from "./data";

interface MobileLayoutProps {
  isLoading: boolean;
  projects: Project[]; // Assuming Project is defined with an 'id'
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
}

export default function MobileLayout({
  isLoading,
  projects,
  activeProject,
  setActiveProject,
}: MobileLayoutProps) {
  // Base classes for a light theme look
  const lightBg = "bg-white border border-neutral-200";
  const darkText = "text-neutral-900";
  const subtleText = "text-neutral-500";
  const bodyText = "text-neutral-700";
  const hoverBg = "hover:bg-neutral-100";

  return (
    // Main container with a slight off-white background
    <div className="lg:hidden pt-18 p-3 bg-neutral-50 min-h-screen">
      <div className="flex flex-col gap-3">
        {/* HERO SECTION - Now Light Theme */}
        <section
          className={`${lightBg} rounded-2xl p-6 flex flex-col gap-6 min-h-[30vh] transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[30px]"
              : "opacity-100 translate-y-0 delay-500"
          }`}
        >
          <div className="flex items-start justify-end">
            {/* SVG REPLACEMENT: Using <img> tag pointing to /ai.svg */}
            <img 
                src="/ai.svg" 
                alt="AI System Icon" 
                className="w-20 h-20 object-contain"
            />
          </div>

          <div className="mt-auto">
            <h1 className={`text-[34px] leading-[1.2] mb-5 ${darkText}`}>
              <span className="font-mono font-bold">Engineering Explainable AI </span>
              <span className="italic font-serif font-light">Systems </span>
              <span className="font-mono font-bold">for Clinical Impact</span>
            </h1>
            <div className={`text-[11px] tracking-wider uppercase ${subtleText} font-accent`}>
              Medical AI Research • Transfer Learning • Computer Vision
            </div>
          </div>
        </section>

        {/* PROFILE IMAGE SECTION - TARGET FOR ANIMATION (Unchanged aside from background) */}
        <section
          id="profile-mobile-section"
          className={`${lightBg} rounded-2xl flex items-center justify-center overflow-hidden h-[50vh] relative`}
        />

        {/* ABOUT SECTION - Now Light Theme */}
        <section
          className={`${lightBg} rounded-2xl p-6 flex flex-col gap-6 min-h-[200px] transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[30px]"
              : "opacity-100 translate-y-0 delay-900"
          }`}
        >
          <div className="flex items-start justify-start">
            {/* SVG REPLACEMENT: Using <img> tag pointing to /noun.svg */}
            <img 
                src="/noun.svg" 
                alt="About Icon" 
                className="w-12 h-12 object-contain"
            />
          </div>

          <div className="mt-auto">
            <h3 className={`text-[9px] uppercase tracking-wider ${subtleText} mb-3 font-accent`}>
              About
            </h3>
            <p className={`${bodyText} text-[14px] leading-relaxed font-sans`}>
              Developing clinically-deployable AI systems that bridge academic research and healthcare impact. 
              My work investigates explainable deep learning architectures, transfer learning optimization, 
              and diagnostic system design for resource-constrained clinical environments.
            </p>
          </div>
        </section>

        {/* PROJECTS SECTION - Now Light Theme */}
        <aside
          id="projects"
          className={`${lightBg} rounded-2xl overflow-hidden transition-all duration-1000 ${
            isLoading
              ? "opacity-0 translate-y-[30px]"
              : "opacity-100 translate-y-0 delay-1100"
          }`}
        >
          {projects.map((p, idx) => (
            // Assuming ProjectCard handles its own dark/light theme adjustments internally,
            // or uses props for styling if necessary. Keeping current structure.
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

        {/* CONTACT SECTION - Now Light Theme */}
        <section
          onClick={() =>
            (window.location.href = "mailto:ahmed.messaad@outlook.com")
          }
          className={`bg-neutral-100 border border-neutral-200 rounded-2xl p-6 flex flex-col cursor-pointer ${hoverBg} transition-all duration-1000 relative justify-between min-h-[35vh] ${
            isLoading
              ? "opacity-0 translate-y-[30px]"
              : "opacity-100 translate-y-0 delay-1300"
          }`}
        >
          <div className="flex justify-between items-start">
            <div className={`text-[9px] tracking-wider uppercase ${subtleText} font-accent`}>
              Start a Conversation
              <br />
            </div>
            {/* Arrow icon is now dark by default (currentColor = text-neutral-900) */}
            <svg
              className={`w-5 h-5 arrow-contact-animate ${darkText}`}
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
            <h2 className={`text-[48px] font-bold leading-none mb-4 ${darkText}`}>
              <span className="font-mono">Contact</span>
              &thinsp;
              <span className="italic font-serif font-light">me</span>
            </h2>

            <div className="flex justify-between w-full text-[9px] tracking-wider uppercase font-accent mb-4">
              <a
                href="https://linkedin.com/in/ahmedmessaad"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`${subtleText} hover:text-neutral-900 transition`}
              >
                LINKEDIN
              </a>
              <a
                href="https://github.com/RYANX9"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`${subtleText} hover:text-neutral-900 transition`}
              >
                GITHUB
              </a>
              <a
                href="mailto:ahmed.messaad@outlook.com"
                onClick={(e) => e.stopPropagation()}
                className={`${subtleText} hover:text-neutral-900 transition`}
              >
                EMAIL
              </a>
            </div>
          </div>

          <div className="text-[8px] text-neutral-400 uppercase tracking-widest font-mono mt-auto pt-2">
            Designed & Built by Ahmed Messaad
          </div>
        </section>
      </div>
    </div>
  );
}
