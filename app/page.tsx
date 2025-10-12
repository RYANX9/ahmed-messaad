"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const projects = [
    {
      title: "AIRM Brain Tumor System",
      link: "https://youtu.be/2OeqBKF3X_A",
      date: "2024",
      desc: "99% accuracy brain tumor classification using EfficientNet-B7. Complete DICOM integration with PyQt5 clinical interface for real-world deployment.",
      tech: ["PyTorch", "EfficientNet-B7", "DICOM", "PyQt5"],
    },
    {
      title: "HemaVision",
      link: "https://youtu.be/YxhA877Wyn0",
      date: "2023–2024",
      desc: "Complete blood analysis system: automated cell detection, segmentation, counting & classification (97% accuracy) with organized table display — eliminating manual microscopy.",
      tech: ["YOLOv8", "OpenCV", "ResNet", "Disease Classification"],
    },
    {
      title: "My Daily Health",
      link: "https://youtu.be/kh7WBjNPpEM",
      date: "2023",
      desc: "Multi-disease AI diagnostic ensemble (90-99% accuracy) combining ResNet50, DenseNet121 & EfficientNet-B3 with interpretable real-time predictions.",
      tech: ["TensorFlow", "Keras", "Transfer Learning", "Tkinter"],
    },
    {
      title: "Healthcare Cost Prediction",
      link: "https://www.kaggle.com/ahmedmessaad/healthcostpridiction",
      date: "2024",
      desc: "Conv1D neural network achieving R² = 0.8793 for healthcare cost forecasting with comprehensive feature engineering and statistical analysis.",
      tech: ["Conv1D", "Feature Engineering", "Plotly"],
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextProject = () => setCurrent((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrent((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <main className="min-h-screen w-full bg-[#0f1115] text-gray-100 font-sans flex flex-col py-8 md:py-0">
      <div className="max-w-[1400px] w-full mx-auto flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-center px-4 sm:px-6 lg:px-8 pb-20 lg:pb-8">

        {/* Left column — Intro with profile picture */}
        <section className="lg:col-span-6 w-full flex flex-col justify-center">
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 12 }}
            className="space-y-4 md:space-y-6 flex flex-col items-start"
          >
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <img
                src="/ahmed.jpg"
                alt="Ahmed Messaad"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-extrabold tracking-tight">Ahmed Messaad</h1>
            
            <div className="text-sm md:text-base text-gray-400 tracking-wide -mt-2">AI / ML Researcher • M'sila, Algeria</div>

            <p className="text-base md:text-xl text-gray-300 max-w-xl">Developing intelligent healthcare systems that bridge cutting-edge AI research with real-world clinical deployment — from medical imaging to predictive analytics.</p>

            <div className="flex items-center gap-3 md:gap-4 mt-2 flex-wrap">
              <a href="mailto:ahmed.messaad@outlook.com" className="inline-flex items-center gap-2 md:gap-3 rounded-2xl px-4 py-2 border border-gray-700 text-xs md:text-sm hover:border-gray-500 transition-colors">Contact</a>
              <a href="https://linkedin.com/in/ahmedmessaad" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 md:gap-3 rounded-2xl px-4 py-2 bg-white/5 text-xs md:text-sm hover:bg-white/7 transition-colors">LinkedIn</a>
            </div>

            <div className="mt-4 md:mt-6 text-xs md:text-sm text-gray-400 max-w-prose leading-relaxed">
              <strong className="text-gray-200">Expertise:</strong> Deep learning for medical imaging (CNNs, transfer learning), embedded AI systems, DICOM pipeline integration, and clinical-grade model deployment. Published researcher at ICSTEM 2023.
            </div>
          </motion.div>
        </section>

        {/* Right column — Projects as slideshow */}
        <aside className="lg:col-span-6 w-full flex flex-col justify-center space-y-4 md:space-y-6">
          <div className="relative rounded-2xl min-h-[280px] md:h-[260px] p-5 md:p-6 border border-white/6 bg-white/2 backdrop-blur-md flex flex-col justify-between overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={projects[current].title} 
                initial={{ opacity: 0, x: 40 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -40 }} 
                transition={{ duration: 0.4 }} 
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <div className="text-xs text-gray-300">Project</div>
                  <h3 className="text-base md:text-lg font-semibold mt-1">{projects[current].title}</h3>
                  <a href={projects[current].link} target="_blank" rel="noreferrer" className="text-xs md:text-sm text-cyan-400 hover:underline inline-block mt-1">View Demo ↗</a>
                  <p className="mt-2 md:mt-3 text-xs md:text-sm text-gray-300 leading-relaxed">{projects[current].desc}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-400 mt-4 gap-2">
                  <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                    <span>{projects[current].date}</span>
                    <span className="text-gray-500">|</span>
                    <span className="break-words">{projects[current].tech.join(" • ")}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 right-4 flex gap-2 md:gap-3 z-10">
              <button onClick={prevProject} className="text-xs px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 transition-colors bg-[#0f1115]/80 backdrop-blur-sm">← Prev</button>
              <button onClick={nextProject} className="text-xs px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 transition-colors bg-[#0f1115]/80 backdrop-blur-sm">Next →</button>
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            className="rounded-2xl min-h-[140px] p-4 md:p-5 border border-white/6 flex flex-col justify-between bg-[#06070a]"
          >
            <div>
              <div className="text-xs text-gray-500">International Recognition</div>
              <h3 className="text-base md:text-lg font-semibold mt-1">ICSTEM 2023 — Outstanding Research</h3>
              <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-400">"Brain Disease Diagnosis Using Deep Learning" • Istanbul, Turkey</p>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-xs text-gray-500 mt-3 flex-wrap">
              <span>FIA Robotics Finalist 2023</span>
              <span>•</span>
              <span>5-Star Academic Excellence</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            className="rounded-2xl min-h-[130px] p-4 md:p-5 border border-white/6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/2"
          >
            <div className="flex-1">
              <div className="text-xs text-gray-300">Education</div>
              <h3 className="text-base md:text-lg font-semibold mt-1">M.Sc. Embedded Systems</h3>
              <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-300 max-w-xs">University Mohamed Boudiaf • Specializing in embedded AI for medical devices and edge computing</p>
            </div>
            <div className="text-xs md:text-sm text-gray-400 sm:text-right">
              <div className="font-medium text-gray-300">Open to Collaborations</div>
              <div className="mt-1">Research • Consulting • Projects</div>
            </div>
          </motion.div>
        </aside>
      </div>

      {/* Footer bar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 w-full max-w-4xl">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4 }} 
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 bg-white/3 border border-white/6 rounded-full px-4 py-2.5 backdrop-blur-md text-xs md:text-sm mx-auto w-fit"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden sm:block">
              <path d="M12 2v20" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 10h16" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs text-gray-200">Ahmed Messaad — AI/ML Researcher</span>
          </div>
          <div className="hidden sm:block text-xs text-gray-300">•</div>
          <div className="text-xs text-gray-300">M'sila, Algeria</div>
          <a href="mailto:ahmed.messaad@outlook.com" className="text-xs underline underline-offset-2 hover:text-white transition-colors">ahmed.messaad@outlook.com</a>
        </motion.div>
      </div>
    </main>
  );
}