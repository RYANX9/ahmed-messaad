"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [activeProject, setActiveProject] = useState<string | null>("airm");
  const [isLoading, setIsLoading] = useState(true);
  const [showStaticImage, setShowStaticImage] = useState(false);

  React.useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) {
      setIsLoading(false);
      setShowStaticImage(true);
      return;
    }

    const initialDelay = setTimeout(() => {
      const animatedImg = document.getElementById('animated-profile');
      const profileSection = document.getElementById('profile-grid-section');
      
      if (!animatedImg || !profileSection) {
        setIsLoading(false);
        setShowStaticImage(true);
        return;
      }

      const rect = profileSection.getBoundingClientRect();
      animatedImg.style.top = `${rect.top + window.scrollY}px`;
      animatedImg.style.left = `${rect.left + window.scrollX}px`;
      animatedImg.style.width = `${rect.width}px`;
      animatedImg.style.height = `${rect.height}px`;
      animatedImg.style.transform = 'none';

      const completeDelay = setTimeout(() => {
        animatedImg.style.visibility = 'hidden';
        setShowStaticImage(true);
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(completeDelay);
    }, 100);

    return () => clearTimeout(initialDelay);
  }, []);

  const projects = [
    {
      id: "airm",
      name: "AIRM Brain Tumor System",
      context: "Clinical AI Platform",
      year: "2024",
      description: "Production-ready diagnostic system achieving 99% accuracy across four tumor categories. Built end-to-end DICOM pipeline with clinical interface validated by radiologists.",
      tech: ["EfficientNet-B7", "PyDICOM", "PyQt5", "SQL"],
      link: "https://youtu.be/2OeqBKF3X_A",
      linkText: "Watch Demo",
      image: "/brain.jpg",
    },
    {
      id: "hemavision",
      name: "HemaVision",
      context: "Medical Automation",
      year: "2023–2024",
      description: "Automated hematology platform with 97% classification accuracy. Reduced diagnostic time from 45 minutes to 3 minutes while maintaining clinical-grade precision.",
      tech: ["YOLOv8", "U-Net", "OpenCV", "PyTorch"],
      link: "https://youtu.be/YxhA877Wyn0",
      linkText: "Watch Demo",
      image: "/blood.jpg",
    },
    {
      id: "healthcost",
      name: "Healthcare Cost Prediction",
      context: "Deep Learning Research",
      year: "2024",
      description: "Conv1D neural network achieving R² = 0.88 for insurance cost forecasting. Feature engineering with SHAP analysis identified key cost drivers.",
      tech: ["Conv1D", "SHAP", "Scikit-learn", "Plotly"],
      link: "https://www.kaggle.com/code/ahmedmessaad/healthcare-cost-prediction-using-neural-networks",
      linkText: "View Project",
      image: "/healthcarecost.png",
    },
    {
      id: "mydailyhealth",
      name: "My Daily Health",
      context: "Research Thesis",
      year: "2023",
      description: "Multi-disease diagnostic platform with 90-99% accuracy across five disease domains. Systematic evaluation of 12 architectures using stratified cross-validation.",
      tech: ["TensorFlow", "ResNet", "EfficientNet", "Flask"],
      link: "https://youtu.be/kh7WBjNPpEM",
      linkText: "Watch Demo",
      image: "/daily.png",
    },
  ];

  const fadeClass = (delay: number) => 
    `transition-all duration-1000 ${isLoading ? "opacity-0 translate-y-[50px]" : `opacity-100 translate-y-0 delay-${delay}`}`;

  const mobileFadeClass = (delay: number) => 
    `transition-all duration-1000 ${isLoading ? "opacity-0 translate-y-[30px]" : `opacity-100 translate-y-0 delay-${delay}`}`;

  const DecorativeSVG = ({ className, children }: { className: string; children: React.ReactNode }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor">
      {children}
    </svg>
  );

  const ProjectItem = ({ p, isMobile }: { p: typeof projects[0]; isMobile?: boolean }) => {
    const isActive = activeProject === p.id;
    const sizes = isMobile ? {
      text: "text-sm",
      meta: "text-[9px]",
      px: "px-6",
      py: "py-4",
      image: "h-40",
      tag: "text-[10px] px-2.5 py-1",
      arrow: "12"
    } : {
      text: "text-base xl:text-lg",
      meta: "text-[10px] xl:text-[11px]",
      px: "px-8 xl:px-10",
      py: "py-4 xl:py-5",
      image: "h-48 xl:h-56",
      tag: "text-[11px] xl:text-[12px] px-3 py-1.5",
      arrow: "14"
    };

    return (
      <div className={`${p.id !== "airm" ? 'border-t' : ''} border-[#2a2a2a] transition ${isActive ? "bg-[#151515]" : ""}`}>
        <button
          onClick={() => setActiveProject(isActive ? null : p.id)}
          className={`w-full flex justify-between items-center ${sizes.px} ${sizes.py} text-left`}
        >
          <div className="flex flex-col">
            <div className={`${sizes.text} font-semibold font-mono`}>{p.name}</div>
            <div className="flex items-center gap-4">
              <div className={`${sizes.meta} text-neutral-500 mt-1 font-accent uppercase tracking-wide`}>
                {p.context} • {p.year}
              </div>
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`arrow-animate inline-flex items-center gap-2 text-white ${sizes.meta} tracking-wide transition font-mono ${
                  isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } transition-opacity duration-300`}
              >
                {p.linkText}
                <svg width={sizes.arrow} height={sizes.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </div>
          <svg className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5 xl:w-6 xl:h-6'} transition-transform flex-shrink-0 ml-3 ${isActive ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div className={`overflow-hidden transition-all duration-500 ${isActive ? isMobile ? "max-h-[800px]" : "max-h-[900px]" : "max-h-0"}`}>
          <div className={`${sizes.px} ${isMobile ? 'pb-5' : 'pb-6 xl:pb-7'}`}>
            <div className={`relative w-full ${sizes.image} ${isMobile ? 'mb-4' : 'mb-4 xl:mb-5'} rounded-lg overflow-hidden`}>
              <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} sizes={isMobile ? "100vw" : "(min-width: 1024px) 20vw, 100vw"} />
            </div>
            <p className={`${isMobile ? 'mb-4 text-sm' : 'mb-4 xl:mb-5 text-[13px] xl:text-[14px]'} text-neutral-400 leading-relaxed font-sans`}>
              {p.description}
            </p>
            <div className={`flex flex-wrap ${isMobile ? 'gap-2 mb-4' : 'gap-2 xl:gap-2.5 mb-4 xl:mb-5'}`}>
              {p.tech.map((t) => (
                <span key={t} className={`bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded ${sizes.tag} transition hover:bg-[#333] font-mono`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;600;700&family=Inter:wght@300;400;500&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');
        *, *::-webkit-scrollbar { scrollbar-width: none !important; -ms-overflow-style: none !important; display: none !important; width: 0 !important; height: 0 !important; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.02em; }
        .font-serif { font-family: 'Crimson Pro', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-accent { font-family: 'Space Grotesk', sans-serif; letter-spacing: 0.05em; }
        @keyframes arrow-bounce { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
        @keyframes arrow-float { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 25% { transform: translate(3px, -3px) rotate(2deg); } 50% { transform: translate(0, -5px) rotate(0deg); } 75% { transform: translate(-3px, -3px) rotate(-2deg); } }
        .arrow-animate:hover svg { animation: arrow-bounce 0.6s ease-in-out infinite; }
        .arrow-contact-animate { animation: arrow-float 3s ease-in-out infinite; }
        .invisible-scroll { scrollbar-width: none !important; -ms-overflow-style: none !important; overflow-y: scroll !important; }
        .invisible-scroll::-webkit-scrollbar { display: none !important; }
        .scroll-fade-bottom { position: relative; }
        .scroll-fade-bottom::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 80px; background: linear-gradient(to bottom, transparent, #0a0a0a 90%); pointer-events: none; z-index: 10; }
      `}</style>

      <div className={`fixed inset-0 bg-[#0a0a0a] z-[90] pointer-events-none transition-opacity duration-700 ${isLoading ? "opacity-100" : "opacity-0"}`} />

      <img
        id="animated-profile"
        src="/ahmed.jpg"
        alt="Ahmed Messaad"
        className="object-cover hidden lg:block"
        style={{
          position: 'fixed', top: '50vh', left: '50vw', width: '240px', height: '240px',
          borderRadius: '16px', transform: 'translate(-50%, -50%)', zIndex: 100, pointerEvents: 'none',
          transition: 'all 1500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />

      <header className={`fixed top-0 left-0 right-0 h-16 lg:h-20 bg-[#0a0a0a] border-b border-[#2a2a2a] z-50 flex justify-center items-center px-4 lg:px-10 transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100 delay-300"}`}>
        <div className="font-mono text-sm lg:text-xl font-bold tracking-wider">AHMED MESSAAD</div>
      </header>

      <div className="hidden lg:block lg:h-[calc(100vh-80px)] lg:mt-[80px] p-3">
        <div className="grid grid-cols-3 auto-rows-fr gap-3 h-full">
          <section className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-8 xl:p-10 flex flex-col justify-between ${fadeClass(500)}`}>
            <div className="flex items-start justify-end">
              <DecorativeSVG className="w-16 h-16 xl:w-20 xl:h-20 text-neutral-700" strokeWidth="0.5">
                <circle cx="50" cy="50" r="40" />
                <circle cx="50" cy="50" r="30" />
                <circle cx="50" cy="50" r="20" />
                <circle cx="50" cy="50" r="10" />
                <line x1="50" y1="10" x2="50" y2="90" />
                <line x1="10" y1="50" x2="90" y2="50" />
                <line x1="20" y1="20" x2="80" y2="80" />
                <line x1="80" y1="20" x2="20" y2="80" />
              </DecorativeSVG>
            </div>
            <div>
              <h1 className="text-[26px] xl:text-[32px] leading-[1.2] mb-6">
                <span className="font-mono font-bold">Advancing Clinical Medicine</span>
                <span className="italic font-serif font-light">through </span>
                <span className="font-mono font-bold">Deep Learning Systems</span>
              </h1>
              <div className="text-[10px] xl:text-[11px] tracking-wider uppercase text-neutral-400 font-accent">
                AI Research • Medical Imaging • Computer Vision
              </div>
            </div>
          </section>

          <section id="profile-grid-section" className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden relative transition-all duration-700 ${showStaticImage ? "opacity-100" : "opacity-0"}`}>
            {showStaticImage && <Image src="/ahmed.jpg" alt="Ahmed Messaad" fill style={{ objectFit: 'cover' }} sizes="(min-width: 1024px) 33vw, 100vw" />}
          </section>

          <aside id="projects" className={`row-span-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl flex flex-col overflow-hidden scroll-fade-bottom ${fadeClass(900)}`}>
            <div className="flex-1 overflow-y-auto invisible-scroll">
              {projects.map((p) => <ProjectItem key={p.id} p={p} />)}
            </div>
          </aside>

          <section id="about" className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-8 xl:p-10 flex flex-col justify-between ${fadeClass(1100)}`}>
            <div className="flex items-start justify-start">
              <DecorativeSVG className="w-12 h-12 xl:w-14 xl:h-14 text-neutral-700" strokeWidth="1">
                <circle cx="50" cy="50" r="20" />
                <circle cx="50" cy="50" r="5" />
              </DecorativeSVG>
            </div>
            <div>
              <h3 className="text-[10px] xl:text-[11px] uppercase tracking-wider text-neutral-500 mb-4 xl:mb-5 font-accent">About</h3>
              <p className="text-neutral-300 text-[14px] xl:text-[16px] leading-relaxed font-sans">
                AI research engineer specializing in clinically-deployable computer vision systems. Focused on transfer learning optimization and interpretable medical AI for resource-constrained environments.
              </p>
            </div>
          </section>

          <section
            id="contact-section"
            onClick={() => window.location.href = "mailto:ahmed.messaad@outlook.com"}
            className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 xl:p-10 flex flex-col cursor-pointer relative hover:bg-[#252525] ${fadeClass(1100)}`}
          >
            <div className="flex justify-between items-start mb-auto">
              <div className="text-[9px] xl:text-[10px] tracking-wider uppercase text-neutral-500 font-accent">Let's Connect<br /></div>
              <svg className="w-6 h-6 xl:w-7 xl:h-7 arrow-contact-animate" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 24L24 8M24 8H8M24 8V24" />
              </svg>
            </div>
            <h2 className="text-[48px] xl:text-[56px] font-bold leading-none mb-6 xl:mb-8">
              <span className="font-mono">Contact </span>
              <span className="italic font-serif font-light">me</span>
            </h2>
            <div className="flex justify-between w-full text-[9px] xl:text-[10px] tracking-wider uppercase font-accent">
              {[
                { name: "LINKEDIN", url: "https://linkedin.com/in/ahmedmessaad" },
                { name: "GITHUB", url: "https://github.com/RYANX9" },
                { name: "EMAIL", url: "mailto:ahmed.messaad@outlook.com" }
              ].map(link => (
                <a key={link.name} href={link.url} target={link.name !== "EMAIL" ? "_blank" : undefined} rel={link.name !== "EMAIL" ? "noreferrer" : undefined} onClick={(e) => e.stopPropagation()} className="text-neutral-500 hover:text-white transition">
                  {link.name}
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="lg:hidden pt-16">
        <section className={`border-b border-[#2a2a2a] p-6 flex flex-col gap-6 h-[40vh] ${mobileFadeClass(500)}`}>
          <div className="flex items-start justify-end">
            <DecorativeSVG className="w-14 h-14 text-neutral-700" strokeWidth="0.5">
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="30" />
              <circle cx="50" cy="50" r="20" />
              <circle cx="50" cy="50" r="10" />
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="10" y1="50" x2="90" y2="50" />
              <line x1="20" y1="20" x2="80" y2="80" />
              <line x1="80" y1="20" x2="20" y2="80" />
            </DecorativeSVG>
          </div>
          <div className="mt-auto">
            <h1 className="text-[48px] leading-[1.15] mb-5">
              <span className="font-mono font-bold">Advancing Clinical Medicine </span>
              <span className="italic font-serif font-light">through </span>
              <span className="font-mono font-bold">Deep Learning</span>
            </h1>
            <div className="text-[11px] tracking-wider uppercase text-neutral-400 font-accent">
              AI Research • Medical Imaging • Computer Vision
            </div>
          </div>
        </section>

        <section className={`border-b border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-center overflow-hidden h-[50vh] relative ${mobileFadeClass(700)}`}>
          <Image src="/ahmed.jpg" alt="Ahmed Messaad" fill style={{ objectFit: 'cover' }} sizes="100vw" />
        </section>

        <section className={`border-b border-[#2a2a2a] p-6 flex flex-col gap-6 min-h-[240px] ${mobileFadeClass(900)}`}>
          <div className="flex items-start justify-start">
            <DecorativeSVG className="w-10 h-10 text-neutral-700" strokeWidth="1">
              <circle cx="50" cy="50" r="20" />
              <circle cx="50" cy="50" r="5" />
            </DecorativeSVG>
          </div>
          <div className="mt-auto">
            <h3 className="text-[9px] uppercase tracking-wider text-neutral-500 mb-3 font-accent">About</h3>
            <p className="text-neutral-300 text-[14px] leading-relaxed font-sans">
              AI research engineer specializing in clinically-deployable computer vision systems. Focused on transfer learning optimization and interpretable medical AI for resource-constrained environments.
            </p>
          </div>
        </section>

        <aside id="projects" className={`border-b border-[#2a2a2a] bg-[#0a0a0a] ${mobileFadeClass(1100)}`}>
          {projects.map((p) => <ProjectItem key={p.id} p={p} isMobile />)}
        </aside>

        <section
          onClick={() => window.location.href = "mailto:ahmed.messaad@outlook.com"}
          className={`border-b border-[#2a2a2a] bg-[#1a1a1a] p-6 flex flex-col gap-5 cursor-pointer hover:bg-[#252525] relative min-h-[280px] ${mobileFadeClass(1300)}`}
        >
          <div className="flex justify-between items-start">
            <div className="text-[9px] tracking-wider uppercase text-neutral-500 font-accent">Let's Connect<br /></div>
            <svg className="w-5 h-5 arrow-contact-animate" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 24L24 8M24 8H8M24 8V24" />
            </svg>
          </div>
          <h2 className="text-[40px] font-bold leading-none mt-auto mb-5">
            <span className="font-mono">Contact </span>
            <span className="italic font-serif font-light">me</span>
          </h2>
          <div className="flex justify-between w-full text-[9px] tracking-wider uppercase font-accent">
            {[
              { name: "LINKEDIN", url: "https://linkedin.com/in/ahmedmessaad" },
              { name: "GITHUB", url: "https://github.com/RYANX9" },
              { name: "EMAIL", url: "mailto:ahmed.messaad@outlook.com" }
            ].map(link => (
              <a key={link.name} href={link.url} target={link.name !== "EMAIL" ? "_blank" : undefined} rel={link.name !== "EMAIL" ? "noreferrer" : undefined} onClick={(e) => e.stopPropagation()} className="text-neutral-500 hover:text-white transition">
                {link.name}
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
