"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

import { usePortfolioData } from "@/lib/usePortfolioData";
import { Project, ProjectDetail } from "@/lib/portfolioData";

// Y2K & Brutalist Icons
const FloppyIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const StarIcon = ({ className = "w-3 h-3 text-amber-400" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const SparkleIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
  </svg>
);

const OSWindowIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <rect x="2" y="3" width="20" height="18" rx="1" />
    <path d="M2 8h20M6 5.5h.01M9 5.5h.01M12 5.5h.01" strokeLinecap="round" />
  </svg>
);

const CategoryIcon = ({ category, className = "w-3 h-3" }: { category: string; className?: string }) => {
  switch (category) {
    case "DEVELOPMENT":
      return <FloppyIcon className={className} />;
    case "DESIGN":
      return <SparkleIcon className={className} />;
    default:
      return null;
  }
};

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

// ── Autoscroll Image Carousel (card & modal) ──
// ── Lazy Loading Wrapper for Media Previews ──
const LazyMedia = ({ children, heightClass = "aspect-video" }: { children: React.ReactNode; heightClass?: string }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" } // load slightly in advance
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={shouldRender ? "w-full" : `w-full relative ${heightClass}`}>
      {shouldRender ? children : <div className="absolute inset-0 bg-[#0d0d0d] animate-pulse" />}
    </div>
  );
};

const ImageCarousel = ({
  images,
  title,
  isDarkMode,
  aspectClass = "aspect-video",
  objectFit = "object-cover",
  onImageClick,
}: {
  images: string[];
  title: string;
  isDarkMode: boolean;
  aspectClass?: string;
  objectFit?: string;
  onImageClick?: (src: string) => void;
}) => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // auto-advance only when visible in the viewport
  useEffect(() => {
    if (!isVisible) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2800);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length, isVisible]);

  const goTo = (i: number) => {
    setCurrent(i);
    if (timerRef.current) clearInterval(timerRef.current);
    if (isVisible) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 2800);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={onImageClick ? () => onImageClick(images[current]) : undefined}
      className={`w-full ${aspectClass} relative overflow-hidden border ${isDarkMode ? "border-white/10" : "border-black/10"} bg-[#121212] group/carousel ${onImageClick ? "cursor-zoom-in" : ""}`}
    >
      {/* Slides (only render current, previous, and next images to save memory) */}
      {images.map((src, i) => {
        const isNear = Math.abs(i - current) <= 1 || (current === 0 && i === images.length - 1) || (current === images.length - 1 && i === 0);
        if (!isNear) return null;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={src}
              alt={`${title} — ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, 600px"
              className={`${objectFit} transition-transform duration-700 ${i === current ? "scale-100" : "scale-105"}`}
              priority={i === 0}
              quality={40}
            />
          </div>
        );
      })}

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Slide counter badge */}
      <div className="absolute top-2 right-2 z-20 font-sans text-[8px] font-bold tracking-widest bg-black/60 text-white px-1.5 py-0.5 backdrop-blur-sm">
        {current + 1}/{images.length}
      </div>

      {/* Hover hint overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/carousel:opacity-100 flex items-center justify-center transition-opacity duration-300 text-[9px] font-sans font-bold tracking-widest text-white backdrop-blur-[1px] z-30">
        {onImageClick ? "VIEW FULLSCREEN ↗" : "OPEN PROJECT DETAILS ↗"}
      </div>
    </div>
  );
};

const GithubPreview = ({ src, isDarkMode }: { src: string; isDarkMode: boolean }) => {
  const repoSlug = src.replace("https://github.com/", "");
  return (
    <div
      className="w-full relative overflow-hidden h-32 flex flex-col justify-between p-3 bg-neutral-900/50 group/iframe"
    >
      <div className="flex justify-between items-start">
        <GithubIcon className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-black"}`} />
        <span className="font-sans text-[8px] font-bold tracking-widest text-brand-blue bg-brand-blue/10 px-1.5 py-0.5 border border-brand-blue/20">
          GITHUB REPO
        </span>
      </div>
      <div className="font-sans text-[9px] tracking-wider font-semibold opacity-70 break-all">
        {repoSlug}
      </div>
      {/* Interaction hint overlay */}
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 bg-black/40 opacity-0 group-hover/iframe:opacity-100 flex items-center justify-center transition-opacity duration-300 text-[10px] font-sans font-bold tracking-widest text-white backdrop-blur-[2px]"
      >
        VIEW ON GITHUB ↗
      </a>
    </div>
  );
};

const IntranetPreview = ({ isDarkMode, title }: { isDarkMode: boolean; title: string }) => {
  return (
    <div
      className={`w-full relative overflow-hidden h-32 flex flex-col justify-between p-3 font-sans ${isDarkMode
        ? "bg-[#0d0d0d] text-zinc-400"
        : "bg-neutral-50 text-neutral-600"
        }`}
    >
      <div className="flex justify-between items-center">
        <span className="text-[7px] sm:text-[7.5px] tracking-widest text-emerald-500 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          ACTIVE DEPLOYMENT
        </span>
        <span className="text-[7.5px] font-bold text-amber-500 px-1.5 py-0.5 border border-amber-500/20 bg-amber-500/5">
          🔒 INTRANET
        </span>
      </div>
      <div className="flex flex-col gap-1.5 my-2">
        <div className="text-[8.5px] sm:text-[9px] tracking-wider opacity-70 flex justify-between">
          <span>HOST:</span>
          <span className="font-semibold uppercase">PT MTM ON-PREMISES</span>
        </div>
        <div className="text-[8.5px] sm:text-[9px] tracking-wider opacity-70 flex justify-between">
          <span>SECURITY:</span>
          <span className="font-semibold text-emerald-500">PROTECTED DATA</span>
        </div>
      </div>
      <div className={`text-[7.5px] text-center py-1 border-t ${isDarkMode ? "border-white/5" : "border-black/5"} opacity-65 font-sans tracking-wide`}>
        Source code public (using dummy data)
      </div>
    </div>
  );
};

const SkeletonLoader = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="flex-1 flex flex-col p-3 space-y-3 animate-pulse">
    {/* Mock header */}
    <div className="flex justify-between items-center">
      <div className={`h-2.5 w-12 rounded ${isDarkMode ? "bg-zinc-800" : "bg-neutral-200"}`} />
      <div className="flex gap-2">
        <div className={`h-2 w-8 rounded ${isDarkMode ? "bg-zinc-800" : "bg-neutral-200"}`} />
        <div className={`h-2 w-8 rounded ${isDarkMode ? "bg-zinc-800" : "bg-neutral-200"}`} />
      </div>
    </div>
    {/* Mock body content */}
    <div className="flex-1 flex gap-3">
      {/* Mock Sidebar */}
      <div className={`w-8 rounded ${isDarkMode ? "bg-zinc-800" : "bg-neutral-200"}`} />
      {/* Mock Grid */}
      <div className="flex-1 flex flex-col space-y-2">
        <div className={`h-6 w-3/4 rounded ${isDarkMode ? "bg-zinc-800" : "bg-neutral-200"}`} />
        <div className={`h-2.5 w-full rounded ${isDarkMode ? "bg-zinc-800" : "bg-neutral-200"}`} />
        <div className={`h-2.5 w-5/6 rounded ${isDarkMode ? "bg-zinc-800" : "bg-neutral-200"}`} />
        <div className="flex gap-2 pt-1.5">
          <div className={`h-5 w-10 rounded ${isDarkMode ? "bg-zinc-800" : "bg-neutral-200"}`} />
          <div className={`h-5 w-10 rounded ${isDarkMode ? "bg-zinc-800" : "bg-neutral-200"}`} />
        </div>
      </div>
    </div>
  </div>
);

const getTechIconUrl = (tag: string, isDarkMode: boolean) => {
  const t = tag.toLowerCase();
  let slug = "";
  let colorOverride = "";

  if (t.includes("next.js")) {
    slug = "nextdotjs";
    colorOverride = isDarkMode ? "white" : "black";
  } else if (t.includes("react")) {
    slug = "react";
  } else if (t.includes("typescript")) {
    slug = "typescript";
  } else if (t.includes("javascript") || t.includes("js")) {
    slug = "javascript";
  } else if (t.includes("tailwind")) {
    slug = "tailwindcss";
  } else if (t.includes("flutter")) {
    slug = "flutter";
  } else if (t.includes("fastapi")) {
    slug = "fastapi";
  } else if (t.includes("pytorch")) {
    slug = "pytorch";
  } else if (t.includes("onnx")) {
    slug = "onnx";
    colorOverride = isDarkMode ? "white" : "black";
  } else if (t.includes("cuda")) {
    slug = "nvidia";
  } else if (t.includes("python")) {
    slug = "python";
  } else if (t.includes("node")) {
    slug = "nodedotjs";
  } else if (t.includes("nestjs") || t.includes("nest")) {
    slug = "nestjs";
  } else if (t.includes("postgresql")) {
    slug = "postgresql";
  } else if (t.includes("mysql")) {
    slug = "mysql";
  } else if (t.includes("prisma")) {
    slug = "prisma";
    colorOverride = isDarkMode ? "white" : "black";
  } else if (t.includes("wasm") || t.includes("webassembly")) {
    slug = "webassembly";
  } else if (t.includes("php")) {
    slug = "php";
  } else if (t.includes("html")) {
    slug = "html5";
  } else if (t.includes("css")) {
    slug = "css3";
  } else if (t.includes("vercel")) {
    slug = "vercel";
    colorOverride = isDarkMode ? "white" : "black";
  } else if (t.includes("cloudinary")) {
    slug = "cloudinary";
  } else if (t.includes("figma")) {
    slug = "figma";
  } else if (t.includes("photoshop")) {
    slug = "adobephotoshop";
  } else if (t.includes("excel")) {
    slug = "microsoftexcel";
  } else if (t.includes("websocket")) {
    slug = "socketdotio";
  } else if (t.includes("java")) {
    slug = "openjdk";
  } else if (t.includes("android")) {
    slug = "android";
  } else if (t.includes("c")) {
    slug = "c";
  } else if (t.includes("groq")) {
    slug = "openai";
  } else if (t.includes("upstash")) {
    slug = "upstash";
  } else if (t.includes("bootstrap")) {
    slug = "bootstrap";
  }

  if (slug) {
    return `https://cdn.simpleicons.org/${slug}${colorOverride ? `/${colorOverride}` : ""}`;
  }
  return null;
};

const TechIcon = ({ tag, isDarkMode }: { tag: string; isDarkMode: boolean }) => {
  const iconUrl = getTechIconUrl(tag, isDarkMode);
  if (iconUrl) {
    return (
      <img
        src={iconUrl}
        alt={tag}
        className="w-4 h-4 object-contain shrink-0 filter transition-all duration-300 hover:brightness-110"
        loading="lazy"
      />
    );
  }
  return (
    <span className="text-[7px] font-sans font-bold tracking-wider px-1.5 py-0.5 border border-current opacity-70 leading-none select-none shrink-0">
      {tag.slice(0, 4).toUpperCase()}
    </span>
  );
};

const IframePreview = ({ src, title, isDarkMode }: { src: string; title: string; isDarkMode: boolean }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.25);
  const [height, setHeight] = useState(176);
  const [iframeLoaded, setIframeLoaded] = useState(false);

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
      className={`w-full mb-4 border relative overflow-hidden bg-[#0d0d0d] group/iframe select-none flex flex-col justify-between ${
        isDarkMode ? "border-white/10" : "border-black/10"
      }`}
    >
      <iframe
        src={src}
        title={title}
        onLoad={() => setIframeLoaded(true)}
        style={{
          width: "1280px",
          height: "720px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          top: "0px",
        }}
        className={`border-none pointer-events-none absolute left-0 transition-opacity duration-500 ${
          iframeLoaded ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      />

      {!iframeLoaded && (
        <SkeletonLoader isDarkMode={isDarkMode} />
      )}

      {iframeLoaded && (
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 bg-black/45 opacity-0 group-hover/iframe:opacity-100 flex items-center justify-center transition-opacity duration-300 text-[10px] font-sans font-bold tracking-widest text-white backdrop-blur-[1px] z-30"
        >
          OPEN LIVE SITE ↗
        </a>
      )}
    </div>
  );
};

export default function Projects({ isDarkMode }: { isDarkMode: boolean }) {
  const { projects: PROJECTS_DATA, projectDetails } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState("DEVELOPMENT");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
  const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [visibleDesigns, setVisibleDesigns] = useState(12);

  useEffect(() => {
    const isLocked = !!activeProject || !!lightboxImage;
    const event = new CustomEvent("lock-scroll", { detail: { lock: isLocked } });
    window.dispatchEvent(event);

    return () => {
      const cleanupEvent = new CustomEvent("lock-scroll", { detail: { lock: false } });
      window.dispatchEvent(cleanupEvent);
    };
  }, [activeProject, lightboxImage]);

  const handleProjectClick = async (p: Project) => {
    setActiveProject(p);
    setProjectDetail(null);
    setErrorDetail(null);

    // 1. Direct local lookup for instant zero-latency modal view
    const detailKey = String(p.id);
    if (projectDetails && projectDetails[detailKey]) {
      setProjectDetail(projectDetails[detailKey]);
      setLoadingDetail(false);
      return;
    }

    setLoadingDetail(true);
    try {
      const res = await fetch(`/api/project-detail?id=${p.id}`);
      if (!res.ok) {
        throw new Error("Gagal mengambil detail proyek.");
      }
      const data = await res.json();
      setProjectDetail(data);
    } catch (err: any) {
      setErrorDetail(err.message || "Terjadi kesalahan koneksi.");
    } finally {
      setLoadingDetail(false);
    }
  };

  const border = isDarkMode ? "border-white/[0.08]" : "border-black/[0.08]";
  const fg = isDarkMode ? "text-white" : "text-black";
  const fgMuted = isDarkMode ? "text-white/40" : "text-black/35";

  return (
    <section
      id="projects"
      className="relative w-full select-none overflow-hidden font-sans"
    >
      {/* Background Y2K Dotted Matrix Pattern */}
      <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${isDarkMode ? "text-white" : "text-black"}`}>
        <svg width="100%" height="100%">
          <pattern id="projects-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#projects-dots)" />
        </svg>
      </div>

      {/* ═══ SECTION HEADER ═══ */}
      <div className={`px-4 md:px-8 lg:px-10 py-8 flex items-center gap-6 border-b ${border}`}>
        <span className={`font-sans text-[44px] font-extrabold tracking-[0.05em] ${fg}`}>Projects</span>
        <div className={`flex-1 h-px ${isDarkMode ? "bg-white" : "bg-black"}`} />
      </div>

      {/* Filter and Cards Content */}
      <div className="flex flex-col w-full px-4 md:px-8 lg:px-10 py-10 md:py-16 relative z-10">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["DEVELOPMENT", "DESIGN"].map((cat) => {
            const count = PROJECTS_DATA.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 border font-sans text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${selectedCategory === cat
                  ? "bg-brand-blue text-white border-brand-blue"
                  : isDarkMode
                    ? "border-white/20 hover:border-white text-white hover:bg-white/5"
                    : "border-black/20 hover:border-black text-black hover:bg-black/5"
                  }`}
              >
                {cat === "DEVELOPMENT" && <OSWindowIcon className="w-3 h-3" />}
                {cat === "DESIGN" && <SparkleIcon className="w-3 h-3" />}
                <span>{cat}</span>
                <span className={`text-[8px] sm:text-[9px] font-sans font-bold px-1.5 py-0.5 border ${selectedCategory === cat
                  ? "bg-white/20 border-white/30 text-white"
                  : isDarkMode
                    ? "bg-white/5 border-white/10 text-white/60"
                    : "bg-black/5 border-black/10 text-black/60"
                  }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid - responsive 4 columns */}
        {selectedCategory === "DEVELOPMENT" ? (
          <div className="space-y-16 w-full animate-fadeIn">
            {/* Grid 1: Enterprise & Information Systems */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={`flex-1 h-px ${isDarkMode ? "bg-white/10" : "bg-black/10"}`} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {[...PROJECTS_DATA]
                  .filter((p) => p.category === "DEVELOPMENT" && [12, 9, 11, 7, 13, 16, 18].includes(p.id))
                  .sort((a, b) => {
                    const dateA = a.date || a.year;
                    const dateB = b.date || b.year;
                    return dateB.localeCompare(dateA);
                  })
                  .map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleProjectClick(p)}
                      className={`border flex flex-col justify-between transition-all duration-300 group relative hover:-translate-y-1 cursor-pointer overflow-hidden ${
                        p.favorite
                          ? isDarkMode
                            ? "border-transparent bg-[#0e0e0e] shadow-[0_0_15px_rgba(234,179,8,0.12)] hover:shadow-[4px_4px_0px_#eab308]"
                            : "border-transparent bg-white shadow-[0_0_15px_rgba(234,179,8,0.15)] hover:shadow-[4px_4px_0px_#eab308]"
                          : isDarkMode
                            ? "border-white/10 hover:border-white bg-[#0e0e0e] hover:shadow-[4px_4px_0px_#0033ff]"
                            : "border-black/10 hover:border-black bg-white hover:shadow-[4px_4px_0px_#0033ff]"
                        }`}
                    >
                      {/* Animated Gold Shimmer Frame for Starred/Favorite Project */}
                      {p.favorite && (
                        <div
                          className="absolute inset-0 pointer-events-none z-30"
                          style={{
                            border: "1.5px solid transparent",
                            background: "linear-gradient(90deg, #996515 0%, #ffd700 25%, #fffbe6 50%, #ffd700 75%, #996515 100%) border-box",
                            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                            animation: "gold-shimmer 2.5s linear infinite",
                            backgroundSize: "200% 100%",
                          }}
                        />
                      )}
                      {/* Preview Container: Carousel / Single Image / Iframe / Github */}
                      {p.images && p.images.length > 0 ? (
                        <LazyMedia heightClass="aspect-video">
                          <ImageCarousel images={p.images} title={p.title} isDarkMode={isDarkMode} aspectClass="aspect-video" />
                        </LazyMedia>
                      ) : p.imageUrl ? (
                        <LazyMedia heightClass="aspect-video">
                          <div className="w-full aspect-video relative overflow-hidden bg-[#121212] group/iframe">
                            <Image
                              src={p.imageUrl}
                              alt={p.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 300px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              priority={p.id === 9}
                              quality={40}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 text-[9px] font-sans font-bold tracking-widest text-white backdrop-blur-[1px]">
                              OPEN PROJECT DETAILS ↗
                            </div>
                          </div>
                        </LazyMedia>
                      ) : p.liveUrl && (
                        p.liveUrl.includes("github.com") ? (
                          <LazyMedia heightClass="h-32">
                            <GithubPreview src={p.liveUrl} isDarkMode={isDarkMode} />
                          </LazyMedia>
                        ) : (
                          <LazyMedia heightClass="h-[120px] sm:h-[150px] md:h-[180px]">
                            <IframePreview src={p.liveUrl} title={p.title} isDarkMode={isDarkMode} />
                          </LazyMedia>
                        )
                      )}

                      {/* Detail Container */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        {/* Title & Description */}
                        <div className="mb-4">
                          <h3 className="font-sans text-xs sm:text-sm font-bold tracking-wider mb-1.5 group-hover:text-brand-blue transition-colors flex items-center gap-1.5">
                            <span>{p.title}</span>
                            {p.favorite && (
                              <StarIcon className="w-3.5 h-3.5 text-amber-400 drop-shadow-[0_0_6px_rgba(234,179,8,0.7)] shrink-0" />
                            )}
                          </h3>
                          <p className={`font-sans text-[11px] font-light leading-relaxed tracking-normal ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                            {p.desc}
                          </p>
                        </div>

                        {/* Footer tags and Arrow */}
                        <div className="flex justify-between items-center mt-auto pt-3 border-t border-neutral-800">
                          <div className="flex flex-wrap items-center gap-2">
                            {p.tags.map((tag) => (
                              <div key={tag} className="hover:scale-110 transition-transform duration-200" title={tag}>
                                <TechIcon tag={tag} isDarkMode={isDarkMode} />
                              </div>
                            ))}
                          </div>
                          {/* Year & Arrow */}
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-sans opacity-60 font-medium">{p.year}</span>
                            <div className="text-brand-blue font-bold text-sm sm:text-base group-hover:translate-x-1.5 transition-transform duration-300">
                              →
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Grid 2: Experimental Labs & R&D */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h3 className={`font-sans text-xs sm:text-sm font-extrabold tracking-[0.2em] ${fg}`}>
                  EXPERIMENTAL LABS & PERSONAL R&D
                </h3>
                <div className={`flex-1 h-px ${isDarkMode ? "bg-white/10" : "bg-black/10"}`} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {[...PROJECTS_DATA]
                  .filter((p) => p.category === "DEVELOPMENT" && [1, 8, 4, 10, 14, 15, 17].includes(p.id))
                  .sort((a, b) => {
                    const dateA = a.date || a.year;
                    const dateB = b.date || b.year;
                    return dateB.localeCompare(dateA);
                  })
                  .map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleProjectClick(p)}
                      className={`border flex flex-col justify-between transition-all duration-300 group relative hover:-translate-y-1 cursor-pointer overflow-hidden ${
                        p.favorite
                          ? isDarkMode
                            ? "border-transparent bg-[#0e0e0e] shadow-[0_0_15px_rgba(234,179,8,0.12)] hover:shadow-[4px_4px_0px_#eab308]"
                            : "border-transparent bg-white shadow-[0_0_15px_rgba(234,179,8,0.15)] hover:shadow-[4px_4px_0px_#eab308]"
                          : isDarkMode
                            ? "border-white/10 hover:border-white bg-[#0e0e0e] hover:shadow-[4px_4px_0px_#0033ff]"
                            : "border-black/10 hover:border-black bg-white hover:shadow-[4px_4px_0px_#0033ff]"
                        }`}
                    >
                      {/* Animated Gold Shimmer Frame for Starred/Favorite Project */}
                      {p.favorite && (
                        <div
                          className="absolute inset-0 pointer-events-none z-30"
                          style={{
                            border: "1.5px solid transparent",
                            background: "linear-gradient(90deg, #996515 0%, #ffd700 25%, #fffbe6 50%, #ffd700 75%, #996515 100%) border-box",
                            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                            animation: "gold-shimmer 2.5s linear infinite",
                            backgroundSize: "200% 100%",
                          }}
                        />
                      )}
                      {/* Preview Container: Carousel / Single Image / Intranet / Iframe / Github */}
                      {p.images && p.images.length > 0 ? (
                        <LazyMedia heightClass="aspect-video">
                          <ImageCarousel images={p.images} title={p.title} isDarkMode={isDarkMode} aspectClass="aspect-video" />
                        </LazyMedia>
                      ) : p.imageUrl ? (
                        <LazyMedia heightClass="aspect-video">
                          <div className="w-full aspect-video relative overflow-hidden bg-[#121212] group/iframe">
                            <Image
                              src={p.imageUrl}
                              alt={p.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 300px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              priority={p.id === 9}
                              quality={40}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 text-[9px] font-sans font-bold tracking-widest text-white backdrop-blur-[1px]">
                              OPEN PROJECT DETAILS ↗
                            </div>
                          </div>
                        </LazyMedia>
                      ) : p.deployment === "intranet" ? (
                        <LazyMedia heightClass="h-32">
                          <IntranetPreview isDarkMode={isDarkMode} title={p.title} />
                        </LazyMedia>
                      ) : p.liveUrl && (
                        p.liveUrl.includes("github.com") ? (
                          <LazyMedia heightClass="h-32">
                            <GithubPreview src={p.liveUrl} isDarkMode={isDarkMode} />
                          </LazyMedia>
                        ) : (
                          <LazyMedia heightClass="h-[120px] sm:h-[150px] md:h-[180px]">
                            <IframePreview src={p.liveUrl} title={p.title} isDarkMode={isDarkMode} />
                          </LazyMedia>
                        )
                      )}

                      {/* Detail Container */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        {/* Title & Description */}
                        <div className="mb-4">
                          <h3 className="font-sans text-xs sm:text-sm font-bold tracking-wider mb-1.5 group-hover:text-brand-blue transition-colors flex items-center gap-1.5">
                            <span>{p.title}</span>
                            {p.favorite && (
                              <StarIcon className="w-3.5 h-3.5 text-amber-400 drop-shadow-[0_0_6px_rgba(234,179,8,0.7)] shrink-0" />
                            )}
                          </h3>
                          <p className={`font-sans text-[11px] font-light leading-relaxed tracking-normal ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                            {p.desc}
                          </p>
                        </div>

                        {/* Footer tags and Arrow */}
                        <div className="flex justify-between items-center mt-auto pt-3 border-t border-neutral-800">
                          <div className="flex flex-wrap items-center gap-2">
                            {p.tags.map((tag) => (
                              <div key={tag} className="hover:scale-110 transition-transform duration-200" title={tag}>
                                <TechIcon tag={tag} isDarkMode={isDarkMode} />
                              </div>
                            ))}
                          </div>
                          {/* Year & Arrow */}
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-sans opacity-60 font-medium">{p.year}</span>
                            <div className="text-brand-blue font-bold text-sm sm:text-base group-hover:translate-x-1.5 transition-transform duration-300">
                              →
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          /* DESIGN category */
          <div className="space-y-8 w-full animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {[...PROJECTS_DATA]
                .filter((p) => p.category === "DESIGN")
                .sort((a, b) => parseInt(b.year) - parseInt(a.year))
                .slice(0, visibleDesigns)
                .map((p) => (
                  <div
                    key={p.id}
                    onClick={() => p.imageUrl && setLightboxImage({ src: p.imageUrl, title: p.title })}
                    className={`overflow-hidden aspect-[3/4] bg-neutral-900 group relative border transition-all duration-300 cursor-pointer ${isDarkMode ? "border-white/10" : "border-black/10"
                      }`}
                  >
                    <LazyMedia heightClass="aspect-[3/4]">
                      <Image
                        src={p.imageUrl || ""}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={p.id === 3 || p.id === 6}
                        quality={35}
                      />
                    </LazyMedia>
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 z-10">
                      <span className="text-[10px] tracking-widest font-bold text-white bg-black/60 px-3 py-1.5 border border-white/20">
                        VIEW FULL IMAGE
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Load More Button */}
            {visibleDesigns < PROJECTS_DATA.filter((p) => p.category === "DESIGN").length && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setVisibleDesigns((prev) => prev + 12)}
                  className={`px-6 py-3 border font-sans text-[10px] md:text-xs font-bold tracking-widest transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                    isDarkMode
                      ? "border-white/20 hover:border-white text-white bg-[#0e0e0e] hover:shadow-[4px_4px_0px_#0033ff]"
                      : "border-black/20 hover:border-black text-black bg-white hover:shadow-[4px_4px_0px_#0033ff]"
                  }`}
                >
                  LOAD MORE WORK (+{PROJECTS_DATA.filter((p) => p.category === "DESIGN").length - visibleDesigns} REMAINING)
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══ DETAIL MODAL ═══ */}
      <AnimatePresence>
        {activeProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[2000] cursor-pointer"
            />
            <div className="fixed inset-0 flex items-center justify-center z-[2001] pointer-events-none p-4 md:p-6">
              <motion.div
                data-lenis-prevent
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className={`w-full max-w-5xl max-h-[92vh] overflow-y-auto border-2 pointer-events-auto ${isDarkMode
                  ? "bg-[#0a0a0a] border-zinc-800 shadow-[8px_8px_0px_#000000]"
                  : "bg-[#f5f5f1] border-black shadow-[8px_8px_0px_#000000]"
                  }`}
              >
                {/* Modal Header */}
                <div className={`flex items-start justify-between p-5 border-b ${isDarkMode ? "border-white/10" : "border-black/10"
                  }`}>
                  <div>
                    <h2 className={`font-sans text-lg font-extrabold tracking-wider ${isDarkMode ? "text-white" : "text-black"}`}>
                      {activeProject.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveProject(null)}
                    className={`font-sans text-[10px] font-bold px-3 py-1.5 border ml-4 shrink-0 cursor-pointer transition-all ${isDarkMode ? "border-white/30 text-white hover:bg-white hover:text-black" : "border-black/30 text-black hover:bg-black hover:text-white"
                      }`}
                  >CLOSE ×</button>
                </div>

                {/* Loading state inside modal */}
                {loadingDetail && (
                  <div className="p-12 flex flex-col items-center justify-center space-y-4">
                    <div className="flex space-x-1.5 items-center">
                      <div className="w-2.5 h-6 bg-brand-blue animate-[pulse_0.8s_infinite_0ms]" />
                      <div className="w-2.5 h-6 bg-brand-blue animate-[pulse_0.8s_infinite_150ms]" />
                      <div className="w-2.5 h-6 bg-brand-blue animate-[pulse_0.8s_infinite_300ms]" />
                      <div className="w-2.5 h-6 bg-brand-blue animate-[pulse_0.8s_infinite_450ms]" />
                    </div>
                    <p className={`font-sans text-[9px] tracking-[0.2em] font-bold ${isDarkMode ? "text-white/60" : "text-black/60"
                      }`}>RETRIEVING_DATABASE_RECORD...</p>
                  </div>
                )}

                {/* Error state inside modal */}
                {errorDetail && (
                  <div className="p-12 text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 border-2 border-red-500 bg-red-500/10 text-red-500 font-bold text-sm mb-2">
                      !
                    </div>
                    <p className={`font-sans text-xs font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                      {errorDetail}
                    </p>
                    <button
                      onClick={() => handleProjectClick(activeProject)}
                      className={`font-sans text-[10px] font-bold px-4 py-2 border transition-all cursor-pointer ${isDarkMode
                        ? "border-white/30 text-white hover:bg-white hover:text-black"
                        : "border-black/30 text-black hover:bg-black hover:text-white"
                        }`}
                    >
                      TRY AGAIN
                    </button>
                  </div>
                )}
{/* Loaded state */}
                {!loadingDetail && !errorDetail && projectDetail && (
                  <div className={`grid grid-cols-1 md:grid-cols-12 md:divide-x ${isDarkMode ? "md:divide-white/10" : "md:divide-black/10"
                    }`}>
                    {/* Right Column (Tech Stack & Action Links) */}
                    <div className="col-span-12 md:col-span-4 p-5 sm:p-6 flex flex-col justify-between space-y-6">
                      <div>
                        {/* Intranet badge above tech stack */}
                        {activeProject.deployment === "intranet" && (
                          <div className="mb-4">
                            <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-widest px-3 py-1.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 select-none inline-flex items-center gap-1.5 uppercase">
                              ⚡ Intranet Project
                            </span>
                          </div>
                        )}

                        {/* Tech Stack */}
                        {projectDetail.techStack && projectDetail.techStack.length > 0 && (
                          <div>
                            <p className={`font-sans text-[9px] font-bold tracking-[0.25em] mb-3 ${isDarkMode ? "text-white/40" : "text-black/40"
                              }`}>TECH STACK</p>
                            <div className="flex flex-wrap gap-1.5">
                              {Array.from(
                                new Set(projectDetail.techStack.flatMap((group) => group.items))
                              )
                                .slice(0, 6)
                                .map((item) => (
                                  <span
                                    key={item}
                                    className={`font-sans text-[9px] font-medium px-2.5 py-0.5 border ${isDarkMode
                                      ? "border-white/15 text-white/80 bg-black"
                                      : "border-black/15 text-black/80 bg-white"
                                      }`}
                                  >
                                    {item}
                                  </span>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Links */}
                      <div className="flex flex-col gap-2.5 pt-5 border-t border-neutral-800">
                        {activeProject.deployment !== "intranet" && (
                          <div className="flex flex-row gap-3">
                            {projectDetail.liveUrl && (
                              <a href={projectDetail.liveUrl} target="_blank" rel="noopener noreferrer"
                                className="font-sans text-[10px] font-bold tracking-widest px-4 py-2.5 bg-brand-blue text-white border border-brand-blue hover:bg-blue-700 transition-colors text-center flex-1">
                                LIVE SITE ↗
                              </a>
                            )}
                            {projectDetail.githubUrl && (
                              <a href={projectDetail.githubUrl} target="_blank" rel="noopener noreferrer"
                                className={`font-sans text-[10px] font-bold tracking-widest px-4 py-2.5 border transition-colors text-center flex-1 ${isDarkMode ? "border-white/30 text-white hover:bg-white hover:text-black" : "border-black/30 text-black hover:bg-black hover:text-white"
                                  }`}>
                                GITHUB ↗
                              </a>
                            )}
                          </div>
                        )}
                        {activeProject.deployment === "intranet" && (
                          <p className={`font-sans text-[9.5px] leading-relaxed mt-1 opacity-75 ${isDarkMode ? "text-white/40" : "text-black/45"
                            }`}>
                            * Proyek ini di-deploy secara internal pada server lokal PT Menara Terus Makmur. Tautan repositori kode dan demonstrasi publik dinonaktifkan untuk menjaga keamanan data korporasi.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Left Column (Main Info & Highlights) */}
                    <div className="col-span-12 md:col-span-8 p-5 sm:p-6 space-y-5">
                      {/* Image / Carousel (modal top) */}
                      {activeProject.images && activeProject.images.length > 0 ? (
                        <ImageCarousel
                          images={activeProject.images}
                          title={activeProject.title}
                          isDarkMode={isDarkMode}
                          aspectClass="aspect-video"
                          objectFit="object-cover"
                          onImageClick={(src) => setLightboxImage({ src, title: activeProject.title })}
                        />
                      ) : activeProject.imageUrl && (
                        <div
                          onClick={() => setLightboxImage({ src: activeProject.imageUrl!, title: activeProject.title })}
                          className={`w-full aspect-video overflow-hidden border cursor-zoom-in group/img relative ${isDarkMode ? "border-white/10" : "border-black/10"
                            }`}
                        >
                          <img src={activeProject.imageUrl} alt={activeProject.title} className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity duration-300 text-[9px] font-sans font-bold tracking-widest text-white backdrop-blur-[1px] z-30">
                            VIEW FULLSCREEN ↗
                          </div>
                        </div>
                      )}

                      {/* Objective */}
                      <div>
                        <p className={`font-sans text-[9px] font-bold tracking-[0.25em] mb-1.5 ${isDarkMode ? "text-white/40" : "text-black/40"
                          }`}>TUJUAN PROYEK</p>
                        <p className={`font-sans text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-white/85" : "text-black/85"
                          }`}>{projectDetail.objective}</p>
                      </div>

                      {/* Highlights */}
                      {projectDetail.highlights && projectDetail.highlights.length > 0 && (
                        <div>
                          <p className={`font-sans text-[9px] font-bold tracking-[0.25em] mb-2 ${isDarkMode ? "text-white/40" : "text-black/40"
                            }`}>HIGHLIGHTS</p>
                          <ul className="space-y-1.5">
                            {projectDetail.highlights.map((h, i) => (
                              <li key={i} className={`font-sans text-xs leading-relaxed flex gap-2 ${isDarkMode ? "text-white/80" : "text-black/80"
                                }`}>
                                <span className="text-brand-blue shrink-0 font-bold">→</span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ LIGHTBOX (DESIGN image full-screen) ═══ */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[3000] flex flex-col items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            {/* Close hint */}
            <div className="absolute top-5 right-5 flex items-center gap-3">
              <span className="font-sans text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase">
                {lightboxImage.title}
              </span>
              <button
                onClick={() => setLightboxImage(null)}
                className="font-sans text-[10px] font-bold px-3 py-1.5 border border-white/30 text-white hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                CLOSE ×
              </button>
            </div>

            {/* Full image */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[75vh] md:h-[80vh] shadow-[0_0_80px_rgba(0,0,0,0.8)] cursor-default"
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
