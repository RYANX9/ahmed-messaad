import React from "react";
import { projects } from "./data";
import ProjectCard from "./ProjectCard";

interface Props {
  isLoading: boolean;
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
}

export default function MobileLayout({ isLoading, activeProject, setActiveProject }: Props) {
  return (
    <div className="lg:hidden pt-18 p-3">
      <div className="flex flex-col gap-3">
        {/* Same mobile sections as before */}
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
      </div>
    </div>
  );
}
