"use client";

import React, { useState, useEffect, useRef } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  desc: string;
  tags: string[];
  liveUrl?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "SOLFEGGIO ANALYZER",
    category: "DEVELOPMENT",
    year: "2026",
    desc: "A high-fidelity musical narrative synthesizer and acoustic mood visualizer pipeline.",
    tags: ["Next.js", "Web Audio", "Vercel"],
    liveUrl: "https://solfeggio-analyzer.vercel.app/"
  },
  {
    id: 2,
    title: "KINETIC TYPOGRAPHY PLAYGROUND",
    category: "ANIMATION",
    year: "2026",
    desc: "Interactive canvas environment for physics-based letters and responsive font-variation axes.",
    tags: ["React 19", "Matter.js", "Canvas"]
  },
  {
    id: 3,
    title: "STARK ARCHIVE PLATFORM",
    category: "DESIGN",
    year: "2025",
    desc: "A brutalist editorial database exploring historical modular design philosophies.",
    tags: ["Figma", "Brutalist", "Layout"]
  },
  {
    id: 4,
    title: "JS VS WASM BENCHMARK",
    category: "DEVELOPMENT",
    year: "2026",
    desc: "A high-performance benchmark playground comparing WebAssembly and JavaScript raw computation speeds.",
    tags: ["WebAssembly", "Rust", "JavaScript"],
    liveUrl: "https://jsvswasm.vercel.app/"
  },
  {
    id: 5,
    title: "AETHERIAL SOUNDSCAPE",
    category: "ANIMATION",
    year: "2025",
    desc: "Generative audio synthesizer mapping keyboard interactions to ambient frequencies.",
    tags: ["Web Audio", "Tone.js", "Motion"]
  },
  {
    id: 6,
    title: "BRUTALIST COMMERCE ENGINE",
    category: "DESIGN",
    year: "2026",
    desc: "Monochrome e-commerce checkout flow emphasizing grid structures and heavy typography.",
    tags: ["E-Commerce", "UX Design", "Wireframe"]
  },
  {
    id: 7,
    title: "UX RESEARCH PLATFORM",
    category: "DEVELOPMENT",
    year: "2026",
    desc: "A collaborative usability diagnostics workbench featuring interactive user heuristics and visual user flow tracking.",
    tags: ["Next.js", "UX Research", "Tailwind", "Vercel"],
    liveUrl: "https://ux-research-tool.vercel.app/"
  }
];

// Y2K & Brutalist Icons
const FloppyIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const SparkleIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
  </svg>
);

const ButterflyIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12 22C12 22 7.5 13 3 13C1 13 1 10 4 10C7 10 9.5 12 12 15C14.5 12 17 10 20 10C23 10 23 13 21 13C16.5 13 12 22 12 22Z" />
    <path d="M12 2C12 2 8 8 4 8C2.5 8 2 6 4.5 5C7 4 9.5 5.5 12 7.5C14.5 5.5 17 4 19.5 5C22 6 21.5 8 20 8C16 8 12 2 12 2Z" />
  </svg>
);

const OSWindowIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <rect x="2" y="3" width="20" height="18" rx="1" />
    <path d="M2 8h20M6 5.5h.01M9 5.5h.01M12 5.5h.01" strokeLinecap="round" />
  </svg>
);

const GlobeIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

const CategoryIcon = ({ category, className = "w-3 h-3" }: { category: string; className?: string }) => {
  switch (category) {
    case "DEVELOPMENT":
      return <FloppyIcon className={className} />;
    case "DESIGN":
      return <SparkleIcon className={className} />;
    case "ANIMATION":
      return <ButterflyIcon className={className} />;
    default:
      return null;
  }
};

const IframePreview = ({ src, title, isDarkMode }: { src: string; title: string; isDarkMode: boolean }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.25);
  const [height, setHeight] = useState(176);

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.getBoundingClientRect().width;
        const currentScale = wrapperWidth / 1280;
        setScale(currentScale);
        setHeight(720 * currentScale);
      }
    };

    handleResize();
    const timeout = setTimeout(handleResize, 100);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div 
      ref={wrapperRef} 
      style={{ height: `${height}px` }}
      className={`w-full mb-4 border relative overflow-hidden bg-[#121212] group/iframe ${
        isDarkMode ? "border-white/10" : "border-black/10"
      }`}
    >
      <iframe
        src={src}
        title={title}
        style={{
          width: "1280px",
          height: "720px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        className="border-none pointer-events-none absolute top-0 left-0"
        loading="lazy"
      />
      {/* Interaction hint overlay */}
      <a 
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 bg-black/40 opacity-0 group-hover/iframe:opacity-100 flex items-center justify-center transition-opacity duration-300 text-[10px] font-display font-bold tracking-widest text-white backdrop-blur-[2px]"
      >
        OPEN LIVE SITE ↗
      </a>
    </div>
  );
};

export default function Projects({ isDarkMode }: { isDarkMode: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  return (
    <section id="projects" className="relative w-full px-4 md:px-8 lg:px-10 py-16 md:py-28 select-none overflow-hidden">

      {/* Background Y2K Dotted Matrix Pattern */}
      <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${
        isDarkMode ? "text-white" : "text-black"
      }`}>
        <svg width="100%" height="100%">
          <pattern id="projects-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#projects-dots)" />
        </svg>
      </div>

      {/* Section Header */}
      <div className="mb-10 md:mb-16 relative z-10">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-brand-blue uppercase flex items-center gap-3">
          04 / PRoJECTS
        </h2>
        <div className="text-[10px] sm:text-xs font-display font-light opacity-50 tracking-widest mt-2 uppercase">
          // WORK_SHOWCASE_V4
        </div>
      </div>

      {/* Filter and Cards Content */}
      <div className="flex flex-col w-full">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["ALL", "DEVELOPMENT", "DESIGN", "ANIMATION"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 border font-display text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest transition-all duration-300 flex items-center gap-2 ${selectedCategory === cat
                  ? "bg-brand-blue text-white border-brand-blue"
                  : isDarkMode
                    ? "border-white/20 hover:border-white text-white hover:bg-white/5"
                    : "border-black/20 hover:border-black text-black hover:bg-black/5"
                }`}
            >
              {cat === "DEVELOPMENT" && <OSWindowIcon className="w-3 h-3" />}
              {cat === "DESIGN" && <SparkleIcon className="w-3 h-3" />}
              {cat === "ANIMATION" && <GlobeIcon className="w-3.5 h-3.5" />}
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {PROJECTS_DATA.filter(
            p => selectedCategory === "ALL" || p.category === selectedCategory
          ).map((p) => (
            <div
              key={p.id}
              className={`border p-4 flex flex-col justify-between transition-all duration-300 group relative hover:-translate-y-1 hover:shadow-[4px_4px_0px_#0033ff] ${isDarkMode
                  ? "border-white/10 hover:border-white bg-[#0e0e0e]"
                  : "border-black/10 hover:border-black bg-white"
                }`}
            >
              {/* Category & Year */}
              <div className="flex justify-between items-center mb-3 text-[8px] font-display font-bold tracking-widest opacity-60">
                <span className="flex items-center gap-1.5">
                  <CategoryIcon category={p.category} className="w-2.5 h-2.5 text-brand-blue" />
                  {p.category}
                </span>
                <span>{p.year}</span>
              </div>

              {/* Live Web Preview Frame */}
              {p.liveUrl && (
                <IframePreview src={p.liveUrl} title={p.title} isDarkMode={isDarkMode} />
              )}

              {/* Title & Description */}
              <div className="mb-4">
                <h3 className="font-display text-xs sm:text-sm font-bold tracking-wider mb-1.5 group-hover:text-brand-blue transition-colors">
                  {p.title}
                </h3>
                <p className="font-sans text-[10px] sm:text-[11px] font-light leading-relaxed opacity-85">
                  {p.desc}
                </p>
              </div>

              {/* Footer tags and Arrow */}
              <div className="flex justify-between items-end mt-auto pt-3 border-t border-dashed border-neutral-800">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[7px] font-display tracking-widest px-1.5 py-0.5 border ${isDarkMode
                          ? "border-white/10 text-white/60 bg-[#161616]"
                          : "border-black/10 text-black/60 bg-neutral-100"
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Arrow */}
                <div className="text-brand-blue font-bold text-sm sm:text-base group-hover:translate-x-1.5 transition-transform duration-300">
                  →
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
