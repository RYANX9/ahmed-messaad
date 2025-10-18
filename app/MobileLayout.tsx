import React from "react";
import ProjectCard from "./ProjectCard"; // Assuming ProjectCard is in the same directory
import { Project } from "./data"; // Assuming 'Project' type is exported from data

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
  return (
    <div className="lg:hidden pt-18 p-3">
      <div className="flex flex-col gap-3">
        
        {/* HERO SECTION */}
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

        {/* PROFILE IMAGE SECTION - TARGET FOR ANIMATION */}
        <section
          id="profile-mobile-section"
          className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl flex items-center justify-center overflow-hidden h-[50vh] relative"
        />

        {/* ABOUT SECTION */}
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

        {/* PROJECTS SECTION */}
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

        {/* CONTACT SECTION */}
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
            Designed & Built by Ahmed Messaad
          </div>
        </section>
      </div>
    </div>
  );
}
