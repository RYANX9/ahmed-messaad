import React from "react";
import { projects } from "./data";
import ProjectCard from "./ProjectCard";

interface Props {
  isLoading: boolean;
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
}

export default function DesktopLayout({ isLoading, activeProject, setActiveProject }: Props) {
  return (
    <div className="hidden lg:block lg:h-[calc(100vh-80px)] lg:mt-[80px] p-3">
      <div className="grid grid-cols-[9fr_6fr_10fr] auto-rows-fr gap-3 h-full">
        {/* Header section */}
        <section
          className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-8 xl:p-10 flex flex-col justify-between transition-all duration-1000 ${
            isLoading ? "opacity-0 translate-y-[50px]" : "opacity-100 translate-y-0 delay-500"
          }`}
        >
          <div className="flex items-start justify-end">
            <svg
              className="w-16 h-16 xl:w-20 xl:h-20 text-neutral-700"
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
              <span className="italic font-serif font-light text-[80%]">Systems </span>
              <span className="font-mono font-bold">for Clinical Impact</span>
            </h1>
            <div className="text-[10px] xl:text-[11px] tracking-wider uppercase text-neutral-400 font-accent">
              Medical AI Research • Transfer Learning • Computer Vision
            </div>
          </div>
        </section>

        <section id="profile-grid-section" className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden relative" />

        <aside
          id="projects"
          className={`row-span-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl flex flex-col overflow-hidden transition-all duration-1000 scroll-fade-bottom ${
            isLoading ? "opacity-0 translate-y-[50px]" : "opacity-100 translate-y-0 delay-900"
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
      </div>
    </div>
  );
}
