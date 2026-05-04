import React from "react";
import Image from "next/image";
import { Project } from "./data";

interface ProjectCardProps {
  project: Project;
  index: number;
  activeProject: string | null;
  onToggle: (id: string) => void;
  isMobile?: boolean;
}

export default function ProjectCard({
  project: p,
  index: idx,
  activeProject,
  onToggle,
  isMobile = false,
}: ProjectCardProps) {
  const isPublication = p.type === "publication";

  if (isPublication) {
    return (
      <div
        className={`${idx !== 0 ? "border-t" : ""} border-[#2a2a2a] border-l-2 border-l-white transition ${
          activeProject === p.id ? "bg-[#151515]" : ""
        }`}
      >
        <button
          onClick={() => onToggle(activeProject === p.id ? "" : p.id)}
          className={`w-full flex justify-between items-center ${
            isMobile ? "px-6 py-4" : "px-8 xl:px-10 py-4 xl:py-5"
          } text-left`}
        >
          <div className="flex flex-col flex-1 min-w-0">
            {/* Always-visible badge — shown even when collapsed */}
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`${
                  isMobile ? "text-[8px]" : "text-[8px] xl:text-[9px]"
                } uppercase tracking-widest font-mono text-neutral-500 border border-[#3a3a3a] rounded px-1.5 py-0.5`}
              >
                Publication
              </span>
            </div>

            {/* Title */}
            <div
              className={`${
                isMobile ? "text-sm" : "text-base xl:text-lg"
              } font-semibold font-mono`}
            >
              {p.name}
            </div>

            {/* Context + link row */}
            <div className="flex items-center gap-4 mt-1">
              <div
                className={`${
                  isMobile ? "text-[9px]" : "text-[10px] xl:text-[11px]"
                } text-neutral-500 font-accent uppercase tracking-wide`}
              >
                {p.context} • {p.year}
              </div>

              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`arrow-animate inline-flex items-center gap-2 text-white ${
                  isMobile ? "text-[9px]" : "text-[10px] xl:text-[11px]"
                } tracking-wide font-mono transition-opacity duration-300 ${
                  activeProject === p.id
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                {p.linkText}
                <svg
                  width={isMobile ? "12" : "14"}
                  height={isMobile ? "12" : "14"}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </div>

          <svg
            className={`${
              isMobile ? "w-4 h-4" : "w-5 h-5 xl:w-6 xl:h-6"
            } transition-transform flex-shrink-0 ml-3 ${
              activeProject === p.id ? "rotate-90" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Expanded content */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            activeProject === p.id
              ? isMobile
                ? "max-h-[600px]"
                : "max-h-[700px]"
              : "max-h-0"
          }`}
        >
          <div className={isMobile ? "px-6 pb-5" : "px-8 xl:px-10 pb-6 xl:pb-7"}>
            <p
              className={`${
                isMobile
                  ? "mb-4 text-sm"
                  : "mb-4 xl:mb-5 text-[13px] xl:text-[14px]"
              } text-neutral-400 leading-relaxed font-sans`}
            >
              {p.description}
            </p>

            <div
              className={`flex flex-wrap ${
                isMobile ? "gap-2" : "gap-2 xl:gap-2.5"
              }`}
            >
              {p.tech.map((t) => {
                const isAward = t.startsWith("★");
                return (
                  <span
                    key={t}
                    className={`rounded font-mono ${
                      isMobile
                        ? "text-[10px] px-2.5 py-1"
                        : "text-[11px] xl:text-[12px] px-3 py-1.5"
                    } ${
                      isAward
                        ? "bg-[#1a1a1a] text-white border border-white"
                        : "bg-[#1a1a1a] text-white border border-[#2a2a2a] hover:bg-[#333] transition"
                    }`}
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Standard project card ──────────────────────────────────────────────────
  return (
    <div
      className={`${idx !== 0 ? "border-t" : ""} border-[#2a2a2a] transition ${
        activeProject === p.id ? "bg-[#151515]" : ""
      }`}
    >
      <button
        onClick={() => onToggle(activeProject === p.id ? "" : p.id)}
        className={`w-full flex justify-between items-center ${
          isMobile ? "px-6 py-4" : "px-8 xl:px-10 py-4 xl:py-5"
        } text-left`}
      >
        <div className="flex flex-col">
          <div
            className={`${
              isMobile ? "text-sm" : "text-base xl:text-lg"
            } font-semibold font-mono`}
          >
            {p.name}
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`${
                isMobile ? "text-[9px]" : "text-[10px] xl:text-[11px]"
              } text-neutral-500 mt-1 font-accent uppercase tracking-wide`}
            >
              {p.context} • {p.year}
            </div>

            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`arrow-animate inline-flex items-center gap-2 text-white ${
                isMobile ? "text-[9px]" : "text-[10px] xl:text-[11px]"
              } tracking-wide transition font-mono ${
                activeProject === p.id
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              } transition-opacity duration-300`}
            >
              {p.linkText}
              <svg
                width={isMobile ? "12" : "14"}
                height={isMobile ? "12" : "14"}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>

        <svg
          className={`${
            isMobile ? "w-4 h-4" : "w-5 h-5 xl:w-6 xl:h-6"
          } transition-transform flex-shrink-0 ml-3 ${
            activeProject === p.id ? "rotate-90" : ""
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
          activeProject === p.id
            ? isMobile
              ? "max-h-[800px]"
              : "max-h-[900px]"
            : "max-h-0"
        }`}
      >
        <div className={isMobile ? "px-6 pb-5" : "px-8 xl:px-10 pb-6 xl:pb-7"}>
          <div
            className={`relative w-full ${
              isMobile ? "h-40 mb-4" : "h-48 xl:h-56 mb-4 xl:mb-5"
            } rounded-lg overflow-hidden`}
          >
            <Image
              src={p.image}
              alt={p.name}
              fill
              unoptimized
              style={{ objectFit: "cover" }}
              sizes={isMobile ? "100vw" : "(min-width: 1024px) 20vw, 100vw"}
            />
          </div>

          <p
            className={`${
              isMobile
                ? "mb-4 text-sm"
                : "mb-4 xl:mb-5 text-[13px] xl:text-[14px]"
            } text-neutral-400 leading-relaxed font-sans`}
          >
            {p.description}
          </p>

          <div
            className={`flex flex-wrap ${
              isMobile ? "gap-2 mb-4" : "gap-2 xl:gap-2.5 mb-4 xl:mb-5"
            }`}
          >
            {p.tech.map((t) => (
              <span
                key={t}
                className={`bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded ${
                  isMobile
                    ? "text-[10px] px-2.5 py-1"
                    : "text-[11px] xl:text-[12px] px-3 py-1.5"
                } transition hover:bg-[#333] font-mono`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
