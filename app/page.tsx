"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";

export default function Page() {
  const [activeProject, setActiveProject] = useState<string | null>("airm");
  const [isLoading, setIsLoading] = useState(true);
  const animatedImgRef = useRef<HTMLImageElement>(null);
  const gridSectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null); // ✅ Fixed initialization to null

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;

    if (!isDesktop) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      const animatedImg = animatedImgRef.current;
      const gridSection = gridSectionRef.current;

      if (animatedImg && gridSection) {
        const rect = gridSection.getBoundingClientRect();
        const gridCenterX = rect.left + rect.width / 2;
        const gridCenterY = rect.top + rect.height / 2;

        rafRef.current = requestAnimationFrame(() => {
          animatedImg.style.top = `${gridCenterY}px`;
          animatedImg.style.left = `${gridCenterX}px`;
          animatedImg.style.width = `${rect.width}px`;
          animatedImg.style.height = `${rect.height}px`;
        });

        setTimeout(() => {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }
          rafRef.current = requestAnimationFrame(() => {
            if (animatedImg) {
              animatedImg.style.visibility = "hidden";
            }
            setIsLoading(false);
          });
        }, 1400);
      } else {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const projects = useMemo(
    () => [
      {
        id: "airm",
        name: "AIRM Brain Tumor System",
        context: "Startup Collaboration",
        year: "2024",
        description:
          "An advanced AI platform for brain tumor detection achieving 99% accuracy, combining EfficientNet-B7 with a full DICOM workflow and intuitive clinical interface.",
        tech: ["PyTorch", "EfficientNet-B7", "DICOM", "PyQt5"],
        link: "https://youtu.be/2OeqBKF3X_A",
        linkText: "Watch Demo",
      },
      {
        id: "hemavision",
        name: "HemaVision",
        context: "Hemolab Startup",
        year: "2023–2024",
        description:
          "Complete blood analysis system: automated cell detection, segmentation, counting & classification (97% accuracy) with organized table display — eliminating manual microscopy.",
        tech: ["YOLOv8", "OpenCV", "ResNet", "EfficientNet"],
        link: "https://youtu.be/YxhA877Wyn0",
        linkText: "Watch Demo",
      },
      {
        id: "mydailyhealth",
        name: "My Daily Health",
        context: "Master's Thesis",
        year: "2023",
        description:
          "An ensemble deep learning solution for real-time detection of brain tumors, Alzheimer's, and COVID-19, merging accuracy with interpretability.",
        tech: ["TensorFlow", "Keras", "Transfer Learning", "Tkinter"],
        link: "https://youtu.be/kh7WBjNPpEM",
        linkText: "Watch Demo",
      },
      {
        id: "healthcost",
        name: "Healthcare Cost Prediction",
        context: "Data Analytics",
        year: "2024",
        description:
          "A predictive deep learning model using Conv1D networks to uncover cost drivers and forecast healthcare expenses with exceptional reliability.",
        tech: ["CNN", "Statistical Analysis", "Plotly"],
        link: "https://www.kaggle.com/code/ahmedmessaad/healthcare-cost-prediction-using-neural-networks",
        linkText: "View Project",
      },
    ],
    []
  );

  const handleProjectToggle = useCallback((projectId: string) => {
    setActiveProject((prev) => (prev === projectId ? null : projectId));
  }, []);

  const handleContactClick = useCallback(() => {
    window.location.href = "mailto:ahmed.messaad@outlook.com";
  }, []);

  interface ProjectItemProps {
    project: typeof projects[0];
    isActive: boolean;
    onToggle: (id: string) => void;
  }

  const ProjectItem = React.memo<ProjectItemProps>(({ project, isActive, onToggle }) => (
    <div
      className={`border-b border-[#2a2a2a] transition-colors will-change-auto ${
        isActive ? "bg-[#151515]" : ""
      }`}
    >
      <button
        onClick={() => onToggle(project.id)}
        className="w-full flex justify-between items-center px-8 xl:px-10 py-6 xl:py-7 text-left"
      >
        <div>
          <div className="text-lg xl:text-xl font-semibold font-mono">{project.name}</div>
          <div className="text-[10px] xl:text-[11px] text-neutral-500 mt-1 font-accent uppercase tracking-wide">
            {project.context} • {project.year}
          </div>
        </div>
        <svg
          className={`w-5 h-5 xl:w-6 xl:h-6 transition-transform duration-300 flex-shrink-0 ml-3 ${
            isActive ? "rotate-90" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          isActive ? "max-h-[700px]" : "max-h-0"
        }`}
      >
        <div className="px-8 xl:px-10 pb-6 xl:pb-7 text-[14px] xl:text-[15px] text-neutral-400 leading-relaxed">
          <p className="mb-5 xl:mb-6 font-sans">{project.description}</p>
          <div className="flex flex-wrap gap-2 xl:gap-2.5 mb-5 xl:mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded text-[11px] xl:text-[12px] px-3 py-1.5 transition-colors hover:bg-[#333] font-mono"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="arrow-animate inline-flex items-center gap-2 text-white text-[12px] xl:text-[13px] tracking-wide transition font-mono"
          >
            {project.linkText}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  ));

  ProjectItem.displayName = "ProjectItem";

  const MobileProjectItem = React.memo<ProjectItemProps>(({ project, isActive, onToggle }) => (
    <div
      className={`border-b border-[#2a2a2a] transition-colors will-change-auto ${
        isActive ? "bg-[#151515]" : ""
      }`}
    >
      <button
        onClick={() => onToggle(project.id)}
        className="w-full flex justify-between items-center px-6 py-5 text-left"
      >
        <div>
          <div className="text-base font-semibold font-mono">{project.name}</div>
          <div className="text-[9px] text-neutral-500 mt-1 font-accent uppercase tracking-wide">
            {project.context} • {project.year}
          </div>
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ml-3 ${
            isActive ? "rotate-90" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          isActive ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-5 text-sm text-neutral-400 leading-relaxed">
          <p className="mb-5 font-sans">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded text-[10px] px-2.5 py-1 transition-colors hover:bg-[#333] font-mono"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="arrow-animate inline-flex items-center gap-2 text-white text-[11px] tracking-wide transition font-mono"
          >
            {project.linkText}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  ));

  MobileProjectItem.displayName = "MobileProjectItem";

  return (
    <main className="min-h-screen bg-black text-white">
      <section ref={gridSectionRef} className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center font-mono">
          Featured AI Projects
        </h1>

        <div className="hidden md:block">
          {projects.map((p) => (
            <ProjectItem
              key={p.id}
              project={p}
              isActive={activeProject === p.id}
              onToggle={handleProjectToggle}
            />
          ))}
        </div>

        <div className="block md:hidden">
          {projects.map((p) => (
            <MobileProjectItem
              key={p.id}
              project={p}
              isActive={activeProject === p.id}
              onToggle={handleProjectToggle}
            />
          ))}
        </div>
      </section>

      <div className="flex justify-center pb-16">
        <button
          onClick={handleContactClick}
          className="border border-neutral-700 px-6 py-3 text-sm font-mono tracking-widest hover:bg-neutral-900 transition-colors"
        >
          CONTACT
        </button>
      </div>

      <Image
        ref={animatedImgRef}
        src="/grid-placeholder.png"
        alt="animation"
        width={1920}
        height={1080}
        priority
        className="fixed top-0 left-0 opacity-0 pointer-events-none transition-all duration-700"
      />
    </main>
  );
}
