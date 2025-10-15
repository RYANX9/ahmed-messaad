"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// --- START: Data & Constant Abstractions ---

const PROJECTS = [
  { id: "airm", name: "AIRM Brain Tumor System", context: "Clinical AI Platform", year: "2024", description: "Production-ready diagnostic system achieving 99% accuracy across four tumor categories. Built end-to-end DICOM pipeline with clinical interface validated by radiologists.", tech: ["EfficientNet-B7", "PyDICOM", "PyQt5", "SQL"], link: "https://youtu.be/2OeqBKF3X_A", linkText: "Watch Demo", image: "/brain.jpg" },
  { id: "hemavision", name: "HemaVision", context: "Medical Automation", year: "2023–2024", description: "Automated hematology platform with 97% classification accuracy. Reduced diagnostic time from 45 minutes to 3 minutes while maintaining clinical-grade precision.", tech: ["YOLOv8", "U-Net", "OpenCV", "PyTorch"], link: "https://youtu.be/YxhA877Wyn0", linkText: "Watch Demo", image: "/blood.jpg" },
  { id: "healthcost", name: "Healthcare Cost Prediction", context: "Deep Learning Research", year: "2024", description: "Conv1D neural network achieving R² = 0.88 for insurance cost forecasting. Feature engineering with SHAP analysis identified key cost drivers.", tech: ["Conv1D", "SHAP", "Scikit-learn", "Plotly"], link: "https://www.kaggle.com/code/ahmedmessaad/healthcare-cost-prediction-using-neural-networks", linkText: "View Project", image: "/healthcarecost.png" },
  { id: "mydailyhealth", name: "My Daily Health", context: "Research Thesis", year: "2023", description: "Multi-disease diagnostic platform with 90-99% accuracy across five disease domains. Systematic evaluation of 12 architectures using stratified cross-validation.", tech: ["TensorFlow", "ResNet", "EfficientNet", "Flask"], link: "https://youtu.be/kh7WBjNPpEM", linkText: "Watch Demo", image: "/daily.png" },
];

const SOCIAL_LINKS = [
  { href: "https://linkedin.com/in/ahmedmessaad", text: "LINKEDIN" },
  { href: "https://github.com/RYANX9", text: "GITHUB" },
  { href: "mailto:ahmed.messaad@outlook.com", text: "EMAIL" },
];

const SECTION_CONTENT = {
  hero: {
    id: "hero",
    titlePrimary: "Advancing Clinical Medicine",
    titleSecondary: "Deep Learning Systems",
    titleSecondaryMobile: "AI-Driven Design",
    subtext: "AI Research • Medical Imaging • Computer Vision",
    icon: "logo",
    desktopLayout: "flex flex-col justify-between",
    mobileLayout: "flex flex-col gap-6 min-h-[60vh]",
  },
  about: {
    id: "about",
    titlePrimary: "About",
    description: "AI research engineer specializing in clinically-deployable computer vision systems. Focused on transfer learning optimization and interpretable medical AI for resource-constrained environments.",
    icon: "about",
    desktopLayout: "flex flex-col justify-between",
    mobileLayout: "flex flex-col gap-6 min-h-[240px]",
  }
};

// --- START: Icon Components ---

const ArrowIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
);
const ContactArrowIcon = (props) => (
  <svg {...props} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 24L24 8M24 8H8M24 8V24" /></svg>
);
const ChevronIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
);
const LogoIcon = (props) => (
  <svg {...props} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
    <circle cx="50" cy="50" r="40" /><circle cx="50" cy="50" r="30" />
    <circle cx="50" cy="50" r="20" /><circle cx="50" cy="50" r="10" />
    <line x1="50" y1="10" x2="50" y2="90" /><line x1="10" y1="50" x2="90" y2="50" />
    <line x1="20" y1="20" x2="80" y2="80" /><line x1="80" y1="20" x2="20" y2="80" />
  </svg>
);
const AboutIcon = (props) => (
  <svg {...props} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
    <circle cx="50" cy="50" r="20" /><circle cx="50" cy="50" r="5" />
  </svg>
);

const getIcon = (type, isDesktop) => {
  if (type === 'logo') {
    return <LogoIcon className={`text-neutral-700 ${isDesktop ? "w-16 h-16 xl:w-20 xl:h-20" : "w-14 h-14"}`} />;
  }
  if (type === 'about') {
    return <AboutIcon className={`text-neutral-700 ${isDesktop ? "w-12 h-12 xl:w-14 xl:h-14" : "w-10 h-10"}`} />;
  }
  return null;
}
// --- END: Icon Components ---

// --- START: Reusable Content Components ---

const ProjectItem = ({ p, activeProject, setActiveProject, isDesktop, isFirst }) => {
  const isActive = activeProject === p.id;
  const activeClass = isActive ? "bg-[#151515]" : "";
  
  const buttonClasses = isDesktop ? 'px-8 xl:px-10 py-4 xl:py-5' : 'px-6 py-4';
  const nameClasses = isDesktop ? 'text-base xl:text-lg' : 'text-sm';
  const metaClasses = isDesktop ? 'text-[10px] xl:text-[11px]' : 'text-[9px]';
  const linkTextClasses = isDesktop ? 'text-[10px] xl:text-[11px]' : 'text-[9px]';
  const chevronClasses = isDesktop ? 'w-5 h-5 xl:w-6 xl:h-6' : 'w-4 h-4';
  const paddingClasses = isDesktop ? 'px-8 xl:px-10 pb-6 xl:pb-7' : 'px-6 pb-5';
  const imageSizeClasses = isDesktop ? 'h-48 xl:h-56' : 'h-40';
  const descClasses = isDesktop ? 'text-[13px] xl:text-[14px]' : 'text-sm';
  const tagClasses = isDesktop ? 'text-[11px] xl:text-[12px] px-3 py-1.5' : 'text-[10px] px-2.5 py-1';

  return (
    <div className={`${!isFirst ? 'border-t' : ''} border-[#2a2a2a] transition ${activeClass}`}>
      <button onClick={() => setActiveProject(isActive ? null : p.id)} className={`w-full flex justify-between items-center text-left ${buttonClasses}`}>
        <div className="flex flex-col">
          <div className={`${nameClasses} font-semibold font-mono`}>{p.name}</div>
          <div className="flex items-center gap-4"> 
            <div className={`${metaClasses} text-neutral-500 mt-1 font-accent uppercase tracking-wide`}>{p.context} • {p.year}</div>
            <a
              href={p.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} 
              className={`arrow-animate inline-flex items-center gap-2 text-white ${linkTextClasses} tracking-wide transition font-mono ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}
            >
              {p.linkText}
              <ArrowIcon width={isDesktop ? 14 : 12} height={isDesktop ? 14 : 12} />
            </a>
          </div>
        </div>
        <ChevronIcon className={`${chevronClasses} transition-transform flex-shrink-0 ml-3 ${isActive ? "rotate-90" : ""}`} />
      </button>

      <div className={`overflow-hidden transition-all duration-500 ${isActive ? "max-h-[900px]" : "max-h-0"}`}>
        <div className={paddingClasses}>
          <div className={`relative w-full ${imageSizeClasses} mb-4 rounded-lg overflow-hidden`}>
            <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} sizes={isDesktop ? "(min-width: 1024px) 20vw, 100vw" : "100vw"} />
          </div>
          <p className={`mb-4 text-neutral-400 leading-relaxed font-sans ${descClasses}`}>{p.description}</p>
          <div className="flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span key={t} className={`bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded ${tagClasses} transition hover:bg-[#333] font-mono`}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionWrapper = ({ content, isDesktop, transitionDelay }) => {
  const isHero = content.id === 'hero';
  const bgColor = isHero ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a]';
  const classes = isDesktop ? 
    `bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-8 xl:p-10 ${content.desktopLayout} transition-all duration-1000 opacity-0 translate-y-[50px] ${transitionDelay}` : 
    `border-b border-[#2a2a2a] p-6 ${content.mobileLayout} transition-all duration-1000 opacity-0 translate-y-[30px] ${transitionDelay}`;

  // Conditional styling based on section and device
  const iconAlignment = isHero ? (isDesktop ? 'justify-end' : 'justify-end') : (isDesktop ? 'justify-start' : 'justify-start');
  const titleContainerClasses = isHero ? (isDesktop ? '' : 'mt-auto') : (isDesktop ? '' : 'mt-auto');
  const h1Classes = isDesktop ? 'text-[26px] xl:text-[32px] leading-[1.2] mb-6' : 'text-[34px] leading-[1.2] mb-5';
  const h3Classes = isDesktop ? 'text-[10px] xl:text-[11px] uppercase tracking-wider text-neutral-500 mb-4 xl:mb-5' : 'text-[9px] uppercase tracking-wider text-neutral-500 mb-3';
  const descClasses = isDesktop ? 'text-neutral-300 text-[14px] xl:text-[16px] leading-relaxed font-sans' : 'text-neutral-300 text-[14px] leading-relaxed font-sans';
  const subtextClasses = isDesktop ? 'text-[10px] xl:text-[11px] tracking-wider uppercase text-neutral-400 font-accent' : 'text-[11px] tracking-wider uppercase text-neutral-400 font-accent';

  const desktopTransition = `opacity-100 translate-y-0 delay-${isHero ? 500 : 1100}`;
  const mobileTransition = `opacity-100 translate-y-0 delay-${isHero ? 500 : 900}`;


  return (
    <section 
      id={content.id}
      className={`${classes} ${isDesktop ? desktopTransition : mobileTransition}`}
    >
      <div className={`flex items-start ${iconAlignment}`}>
        {getIcon(content.icon, isDesktop)}
      </div>
      
      <div className={titleContainerClasses}>
        {isHero ? (
          <>
            <h1 className={h1Classes}>
              <span className="font-mono font-bold">{content.titlePrimary}</span>
              <span className="italic font-serif font-light">through </span>
              <span className="font-mono font-bold">{isDesktop ? content.titleSecondary : content.titleSecondaryMobile}</span>
            </h1>
            <div className={subtextClasses}>
              {content.subtext}
            </div>
          </>
        ) : (
          <>
            <h3 className={h3Classes}>
              {content.titlePrimary}
            </h3>
            <p className={descClasses}>
              {content.description}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

const ContactSection = ({ isDesktop, transitionDelay }) => {
  const classes = isDesktop ? 
    `bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl flex flex-col cursor-pointer relative hover:bg-[#252525] transition-all duration-1000 p-8 xl:p-10 opacity-0 translate-y-[50px] ${transitionDelay}` :
    `border-b border-[#2a2a2a] bg-[#1a1a1a] p-6 flex flex-col gap-5 cursor-pointer hover:bg-[#252525] transition-all duration-1000 relative min-h-[280px] opacity-0 translate-y-[30px] ${transitionDelay}`;

  const titleClasses = isDesktop ? 'text-[48px] xl:text-[56px] mb-6 xl:mb-8' : 'text-[40px] mb-5 mt-auto';
  const topTextClasses = isDesktop ? 'text-[9px] xl:text-[10px]' : 'text-[9px]';
  const linkClasses = isDesktop ? 'text-[9px] xl:text-[10px]' : 'text-[9px]';
  const arrowClasses = isDesktop ? 'w-6 h-6 xl:w-7 xl:h-7' : 'w-5 h-5';

  const desktopTransition = `opacity-100 translate-y-0 delay-1100`;
  const mobileTransition = `opacity-100 translate-y-0 delay-1300`;

  return (
    <section
      id="contact-section"
      onClick={() => (window.location.href = "mailto:ahmed.messaad@outlook.com")}
      className={`${classes} ${isDesktop ? desktopTransition : mobileTransition}`}
    >
      <div className="flex justify-between items-start mb-auto">
        <div className={`${topTextClasses} tracking-wider uppercase text-neutral-500 font-accent`}>Let's Connect<br /></div>
        <ContactArrowIcon className={`${arrowClasses} arrow-contact-animate`} />
      </div>
      
      <h2 className={`${titleClasses} font-bold leading-none`}>
        <span className="font-mono">Contact </span>
        <span className="italic font-serif font-light">me</span>
      </h2>
      
      <div className={`flex justify-between w-full ${linkClasses} tracking-wider uppercase font-accent`}>
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.text} href={link.href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
            className="text-neutral-500 hover:text-white transition"
          >
            {link.text}
          </a>
        ))}
      </div>
    </section>
  );
};
// --- END: Reusable Content Components ---


export default function Page() {
  const [activeProject, setActiveProject] = useState("airm");
  const [isLoading, setIsLoading] = useState(true);
  const [showStaticImage, setShowStaticImage] = useState(false);

  const isDesktopRef = React.useRef(false);

  useEffect(() => {
    isDesktopRef.current = window.innerWidth >= 1024;
    
    if (!isDesktopRef.current) {
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
      const absoluteTop = rect.top + window.scrollY;
      const absoluteLeft = rect.left + window.scrollX;

      Object.assign(animatedImg.style, {
        top: `${absoluteTop}px`, left: `${absoluteLeft}px`, width: `${rect.width}px`, height: `${rect.height}px`, transform: 'none'
      });

      const completeDelay = setTimeout(() => {
        animatedImg.style.visibility = 'hidden';
        setShowStaticImage(true);
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(completeDelay);
    }, 100);

    return () => clearTimeout(initialDelay);
  }, []);
  
  const renderProjectList = (isDesktop) => (
    PROJECTS.map((p, idx) => (
      <ProjectItem
        key={p.id}
        p={p}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        isDesktop={isDesktop}
        isFirst={idx === 0}
      />
    ))
  );


  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
      {/* Global Styles (Unchanged) */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;600;700&family=Inter:wght@300;400;500&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');
        * { scrollbar-width: none !important; -ms-overflow-style: none !important; }
        *::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.02em; }
        .font-serif { font-family: 'Crimson Pro', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-accent { font-family: 'Space Grotesk', sans-serif; letter-spacing: 0.05em; }
        @keyframes arrow-bounce { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
        @keyframes arrow-float { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 25% { transform: translate(3px, -3px) rotate(2deg); } 50% { transform: translate(0, -5px) rotate(0deg); } 75% { transform: translate(-3px, -3px) rotate(-2deg); } }
        .arrow-animate:hover svg { animation: arrow-bounce 0.6s ease-in-out infinite; }
        .arrow-contact-animate { animation: arrow-float 3s ease-in-out infinite; }
        .invisible-scroll { scrollbar-width: none !important; -ms-overflow-style: none !important; overflow-y: scroll !important; }
        .invisible-scroll::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; background: transparent !important; }
        .scroll-fade-bottom { position: relative; }
        .scroll-fade-bottom::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 80px; background: linear-gradient(to bottom, transparent, #0a0a0a 90%); pointer-events: none; z-index: 10; }
      `}</style>

      {/* Loading Overlay and Animated Image (Unchanged) */}
      <div className={`fixed inset-0 bg-[#0a0a0a] z-[90] pointer-events-none transition-opacity duration-700 ${isLoading ? "opacity-100" : "opacity-0"}`} />
      <img
        id="animated-profile" src="/ahmed.jpg" alt="Ahmed Messaad" className="object-cover hidden lg:block" 
        style={{ position: 'fixed', top: '50vh', left: '50vw', width: '240px', height: '240px', borderRadius: '16px', transform: 'translate(-50%, -50%)', zIndex: 100, pointerEvents: 'none', transition: 'all 1500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      />

      {/* Header (Unchanged) */}
      <header className={`fixed top-0 left-0 right-0 h-16 lg:h-20 bg-[#0a0a0a] border-b border-[#2a2a2a] z-50 flex justify-center items-center px-4 lg:px-10 transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100 delay-300"}`}>
        <div className="font-mono text-sm lg:text-xl font-bold tracking-wider">AHMED MESSAAD</div>
      </header>

      {/* -------------------- Desktop Layout (Grid) -------------------- */}
      <div className="hidden lg:block lg:h-[calc(100vh-80px)] lg:mt-[80px] p-3">
        <div className="grid grid-cols-3 auto-rows-fr gap-3 h-full">
          
          {/* Section 1: Title (Uses SectionWrapper) */}
          <SectionWrapper content={SECTION_CONTENT.hero} isDesktop={true} transitionDelay="delay-500" />

          {/* Section 2: Profile Image (Unchanged) */}
          <section 
            id="profile-grid-section" 
            className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden relative transition-all duration-700 ${showStaticImage ? "opacity-100" : "opacity-0"}`}
          >
            {showStaticImage && <Image src="/ahmed.jpg" alt="Ahmed Messaad" fill style={{ objectFit: 'cover' }} sizes="(min-width: 1024px) 33vw, 100vw" />}
          </section>

          {/* Section 3: Projects (2-row span) (Uses renderProjectList) */}
          <aside id="projects" className={`row-span-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl flex flex-col overflow-hidden scroll-fade-bottom transition-all duration-1000 ${isLoading ? "opacity-0 translate-y-[50px]" : "opacity-100 translate-y-0 delay-900"}`}>
            <div className="flex-1 overflow-y-auto invisible-scroll">
              {renderProjectList(true)}
            </div>
          </aside>

          {/* Section 4: About (Uses SectionWrapper) */}
          <SectionWrapper content={SECTION_CONTENT.about} isDesktop={true} transitionDelay="delay-1100" />

          {/* Section 5: Contact (Uses ContactSection) */}
          <div className={`transition-all duration-1000 ${isLoading ? "opacity-0 translate-y-[50px]" : "opacity-100 translate-y-0 delay-1100"}`}>
            <ContactSection isDesktop={true} />
          </div>
        </div>
      </div>

      {/* -------------------- Mobile Layout (Linear) -------------------- */}
      <div className="lg:hidden pt-16">
        
        {/* Mobile Section 1: Title (Uses SectionWrapper) */}
        <SectionWrapper content={SECTION_CONTENT.hero} isDesktop={false} transitionDelay="delay-500" />

        {/* Mobile Section 2: Profile Image (Unchanged) */}
        <section className={`border-b border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-center overflow-hidden h-[50vh] relative transition-all duration-1000 ${isLoading ? "opacity-0 translate-y-[30px]" : "opacity-100 translate-y-0 delay-700"}`}>
          <Image src="/ahmed.jpg" alt="Ahmed Messaad" fill style={{ objectFit: 'cover' }} sizes="100vw" />
        </section>

        {/* Mobile Section 3: About (Uses SectionWrapper) */}
        <SectionWrapper content={SECTION_CONTENT.about} isDesktop={false} transitionDelay="delay-900" />

        {/* Mobile Section 4: Projects (Uses renderProjectList) */}
        <aside id="projects" className={`border-b border-[#2a2a2a] bg-[#0a0a0a] transition-all duration-1000 ${isLoading ? "opacity-0 translate-y-[30px]" : "opacity-100 translate-y-0 delay-1100"}`}>
          {renderProjectList(false)}
        </aside>

        {/* Mobile Section 5: Contact (Uses ContactSection) */}
        <div className={`border-b border-[#2a2a2a] transition-all duration-1000 ${isLoading ? "opacity-0 translate-y-[30px]" : "opacity-100 translate-y-0 delay-1300"}`}>
          <ContactSection isDesktop={false} />
        </div>
      </div>
    </main>
  );
}
