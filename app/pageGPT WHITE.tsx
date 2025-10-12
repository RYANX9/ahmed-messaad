"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const pages = [
    "Home",
    "About",
    "Projects",
    "Skills",
    "Contact",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, pages.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
      if (e.key === "Home") setIndex(0);
      if (e.key === "End") setIndex(pages.length - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="w-screen h-screen overflow-hidden bg-neutral-50 text-neutral-900 font-sans">
      <div className="absolute top-6 left-6 z-30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center text-white font-semibold">AM</div>
          <div className="hidden sm:block">
            <div className="text-sm">Ahmed Messaad</div>
            <div className="text-xs text-neutral-500">AI / ML Researcher • M’sila, Algeria</div>
          </div>
        </div>
      </div>

      {/* Left vertical nav */}
      <nav className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 flex flex-col gap-2">
        {pages.map((p, i) => (
          <button
            key={p}
            onClick={() => setIndex(i)}
            aria-current={index === i}
            className={`w-3 h-3 rounded-full transition-all ring-1 ring-neutral-200 hover:scale-110 ${
              index === i ? "bg-indigo-600 scale-125 shadow-lg" : "bg-neutral-200"
            }`}
            title={p}
          />
        ))}
      </nav>

      {/* Right utilities */}
      <div className="absolute right-6 top-6 z-30 flex items-center gap-3">
        <a href="mailto:ahmed.messaad@outlook.com" className="text-xs">Email</a>
        <a href="https://linkedin.com/in/ahmedmessaad" target="_blank" rel="noreferrer" className="text-xs">LinkedIn</a>
      </div>

      {/* Panels container: no scroll, switch panels with transform */}
      <div className="w-full h-full relative overflow-hidden"> 
        {/* ADDED: overflow-hidden to the outer container for clean edge */}
        <div
          className="h-full flex transition-transform duration-700 ease-in-out"
          style={{ 
            width: `${pages.length * 100}vw`, // Set width to 500vw (5 pages)
            transform: `translateX(-${index * 100}vw)` // Translate by the page width
          }}
        >

          {/* Home - REMOVED w-screen */}
          <section className="h-full flex flex-shrink-0 items-center justify-center p-8" style={{ width: '100vw' }}>
            <div className="max-w-3xl text-center">
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight">
                Hello — I’m Ahmed.
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                I build intelligent systems for healthcare. Deep learning, medical imaging, and edge deployment.
              </p>

              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={() => setIndex(2)}
                  className="px-5 py-3 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition"
                >
                  View Projects
                </button>

                <button
                  onClick={() => setIndex(4)}
                  className="px-5 py-3 rounded-2xl bg-indigo-600 text-white hover:brightness-105 transition"
                >
                  Contact
                </button>
              </div>

              <div className="mt-12 flex items-center justify-center gap-6 text-xs text-neutral-500">
                <div>Master's in Electronics of Embedded Systems — Univ. Mohamed Boudiaf</div>
              </div>
            </div>
          </section>

          {/* About - REMOVED w-screen */}
          <section className="h-full flex flex-shrink-0 items-center justify-center p-8 bg-gradient-to-b from-white to-neutral-100" style={{ width: '100vw' }}>
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold">About</h2>
              <p className="mt-4 text-neutral-600">
                I specialize in deep learning and computer vision to create diagnostic systems that bridge research and clinical practice. My work focuses on pragmatic models that can be deployed in real clinical environments — from DICOM pipelines to edge-friendly inference.
              </p>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <li>
                  <strong>Approach:</strong> Practical models, interpretable outputs, and robust pipelines.
                </li>
                <li>
                  <strong>Background:</strong> ICSTEM 2023 publication, startup collaborations, and academic research.
                </li>
                <li>
                  <strong>Interests:</strong> Medical imaging, transfer learning, embedded AI.
                </li>
                <li>
                  <strong>Tools:</strong> PyTorch, TensorFlow, YOLOv8, OpenCV.
                </li>
              </ul>

              <div className="mt-8 flex gap-4">
                <a href="/resume.pdf" className="text-sm underline">Resume (PDF)</a>
                <a href="mailto:ahmed.messaad@outlook.com" className="text-sm underline">Contact</a>
              </div>
            </div>
          </section>

          {/* Projects - REMOVED w-screen */}
          <section className="h-full flex flex-shrink-0 items-center justify-center p-8" style={{ width: '100vw' }}>
            <div className="max-w-4xl w-full">
              <h2 className="text-3xl font-semibold">Selected Projects</h2>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <article className="p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition">
                  <div className="text-xs text-neutral-500">Startup Collaboration • 2024</div>
                  <h3 className="mt-2 font-semibold">AIRM — Brain Tumor System</h3>
                  <p className="mt-2 text-sm text-neutral-600">EfficientNet-B7 based classifier, DICOM pipeline, PyQt5 interface — focused on clinical usability.</p>
                  <div className="mt-4 text-xs text-neutral-500">Tech: PyTorch • EfficientNet • DICOM • PyQt5</div>
                </article>

                <article className="p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition">
                  <div className="text-xs text-neutral-500">Hemolab Startup • 2023–2024</div>
                  <h3 className="mt-2 font-semibold">HemaVision</h3>
                  <p className="mt-2 text-sm text-neutral-600">Blood cell segmentation & classification using YOLOv8 with custom preprocessing for robust lab results.</p>
                  <div className="mt-4 text-xs text-neutral-500">Tech: YOLOv8 • OpenCV • ResNet</div>
                </article>

                <article className="p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition">
                  <div className="text-xs text-neutral-500">Master’s Thesis • 2023</div>
                  <h3 className="mt-2 font-semibold">My Daily Health</h3>
                  <p className="mt-2 text-sm text-neutral-600">Multi-disease diagnostic ensemble for brain tumors, Alzheimer’s, and COVID-19 — interpretable and realtime.</p>
                  <div className="mt-4 text-xs text-neutral-500">Tech: TensorFlow • Keras • Transfer Learning</div>
                </article>

                <article className="p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition">
                  <div className="text-xs text-neutral-500">Data Analytics • 2024</div>
                  <h3 className="mt-2 font-semibold">Healthcare Cost Prediction</h3>
                  <p className="mt-2 text-sm text-neutral-600">Predictive modeling to optimize resources — Conv1D networks and feature engineering yielded strong R² performance.</p>
                  <div className="mt-4 text-xs text-neutral-500">Tech: CNN • Plotly</div>
                </article>
              </div>

            </div>
          </section>

          {/* Skills - REMOVED w-screen */}
          <section className="h-full flex flex-shrink-0 items-center justify-center p-8 bg-gradient-to-b from-white to-neutral-100" style={{ width: '100vw' }}>
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold">Expertise</h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-600">
                <div>
                  <strong>AI & ML:</strong>
                  <div className="mt-2">Deep Learning, Computer Vision, Transfer Learning, Model Optimization</div>
                </div>
                <div>
                  <strong>Frameworks:</strong>
                  <div className="mt-2">PyTorch, TensorFlow, Keras, OpenCV, YOLOv8</div>
                </div>
                <div>
                  <strong>Development:</strong>
                  <div className="mt-2">Python, C++, PyQt5, Tkinter, Jupyter, Agile</div>
                </div>
                <div>
                  <strong>Specialized:</strong>
                  <div className="mt-2">Medical Imaging, DICOM Processing, Embedded AI, Edge Computing</div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact - REMOVED w-screen */}
          <section className="h-full flex flex-shrink-0 items-center justify-center p-8" style={{ width: '100vw' }}>
            <div className="max-w-xl text-center">
              <h2 className="text-3xl font-semibold">Get in touch</h2>
              <p className="mt-4 text-neutral-600">I’m available for research collaborations, healthcare projects, and consulting opportunities.</p>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <a href="mailto:ahmed.messaad@outlook.com" className="px-4 py-3 rounded-xl border">Email: ahmed.messaad@outlook.com</a>
                <a href="https://linkedin.com/in/ahmedmessaad" target="_blank" rel="noreferrer" className="px-4 py-3 rounded-xl border">LinkedIn</a>
                <a href="/resume.pdf" className="px-4 py-3 rounded-xl border">Download Resume</a>
              </div>

              <div className="mt-8 text-xs text-neutral-400">Tip: use ← → keys to navigate between sections</div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer small controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-4">
        <button onClick={() => setIndex((index) => Math.max(0, index - 1))} className="p-2 rounded-full border">←</button>
        <div className="text-xs text-neutral-500">{pages[index]}</div>
        <button onClick={() => setIndex((index) => Math.min(pages.length - 1, index + 1))} className="p-2 rounded-full border">→</button>
      </div>

    </main>
  );
}