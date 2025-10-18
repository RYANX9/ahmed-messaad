import React from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "./data";

interface DesktopLayoutProps {
  isLoading: boolean;
  projects: Project[]; // Assuming Project is defined with an 'id'
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
}

export default function DesktopLayout({
  isLoading,
  projects,
  activeProject,
  setActiveProject,
}: DesktopLayoutProps) {
  return (
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
            {/* Replaced inline SVG with image from public folder: /ai.svg */}
            <img
              src="/ai.svg"
              alt="AI Icon"
              // Adjusting size to match the original inline SVG (100x100)
              className="w-[100px] h-[100px] flex-shrink-0"
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

        {/* PROFILE IMAGE SECTION - TARGET FOR ANIMATION */}
        <section 
          id="profile-grid-section"
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden relative"
        />

        {/* PROJECTS SECTION */}
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
              {/* Replaced inline SVG with image from public folder: /noun.svg */}
              <img
                src="/noun.svg"
                alt="About Icon"
                // Retained sizing classes from original SVG
                className="w-10 h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 flex-shrink-0"
              />
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

          {/* CONTACT SECTION */}
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
                Designed & Built by Ahmed Messaad
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
