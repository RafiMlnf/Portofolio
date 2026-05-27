"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

interface ProjectDetail {
  objective: string;
  techStack: { label: string; items: string[] }[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  desc: string;
  tags: string[];
  liveUrl?: string;
  imageUrl?: string;
}

const PROJECTS_DATA: Project[] = [
  // ── HEAVIEST: AI + Fullstack + DSP ──
  {
    id: 1,
    title: "SOLFEGGIO ANALYZER",
    category: "DEVELOPMENT",
    year: "2026",
    desc: "Mesin analisis musik bertenaga AI yang genre-aware. Menganalisis audio dengan client-side DSP, Groq LLM, dan pencarian lirik hybrid tanpa perlu upload.",
    tags: ["Next.js", "TypeScript", "Web Audio API", "Groq AI", "Vercel"],
    liveUrl: "https://solfeggio-analyzer.vercel.app/",
  },
  // ── HEAVY: Fullstack Backend + Real DB + GPS ──
  {
    id: 9,
    title: "ELINA PKL TRACKER",
    category: "DEVELOPMENT",
    year: "2025",
    desc: "Sistem monitoring Prakerin (PKL) berbasis web untuk jurusan Elektronika Industri SMKN 2 Garut dengan presensi GPS dan jurnal digital.",
    tags: ["Native PHP", "MySQL", "Leaflet.js", "Geolocation", "Tailwind CSS"],
    liveUrl: "https://github.com/RafiMlnf/ELINA",
    imageUrl: "/assets/img/ssproject/elina.png",
  },
  // ── HEAVY: Fullstack + Cloud CDN ──
  {
    id: 8,
    title: "TADIKA CIRCLE ARCHIVE",
    category: "DEVELOPMENT",
    year: "2025",
    desc: "Platform arsip digital privat untuk sirkel pertemanan — menyimpan foto, cerita hangout, dan trip timeline dengan Cloudinary CDN.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Cloudinary"],
    liveUrl: "https://github.com/RafiMlnf/Tadika",
  },
  // ── MEDIUM-HIGH: Low-level Cross-compilation (C → Wasm) ──
  {
    id: 4,
    title: "JS VS WASM BENCHMARK",
    category: "DEVELOPMENT",
    year: "2026",
    desc: "Eksperimen perbandingan kecepatan eksekusi JavaScript vs WebAssembly langsung di browser menggunakan Emscripten & C source.",
    tags: ["WebAssembly", "C", "Emscripten", "JavaScript", "Vercel"],
    liveUrl: "https://jsvswasm.vercel.app/",
  },
  // ── MEDIUM: Native Mobile (Java + Android SDK) ──
  {
    id: 10,
    title: "MOBILE DEV MODULES",
    category: "DEVELOPMENT",
    year: "2024",
    desc: "Repositori tugas akademik Pemrograman Mobile 1 — kumpulan modul Android Studio dari Hello World hingga Fragment & Maps integration.",
    tags: ["Java", "Android SDK", "Android Studio", "XML"],
    liveUrl: "https://github.com/RafiMlnf/AndroidStudio-1",
  },
  // ── MEDIUM: Fullstack Booking Simulation (Vanilla HTML/CSS/JS + Bootstrap) ──
  {
    id: 11,
    title: "RPL KONSERKU",
    category: "DEVELOPMENT",
    year: "2024",
    desc: "Sistem informasi pemesanan tiket konser berbasis web dengan simulasi otorisasi multi-role, katalog dinamis, dan kalkulator kuota real-time.",
    tags: ["HTML5", "CSS3", "Bootstrap", "Vanilla JS", "Vercel"],
    liveUrl: "https://rpl-konser-ku.vercel.app",
  },
  // ── LIGHT: Frontend only ──
  {
    id: 7,
    title: "UX RESEARCH TOOLKIT",
    category: "DEVELOPMENT",
    year: "2026",
    desc: "Toolkit riset UX komprehensif dengan Persona Template, Journey Map, dan Usability Checklist — dikembangkan sebagai tugas Metodologi Penelitian.",
    tags: ["HTML5", "CSS", "JavaScript", "Vercel"],
    liveUrl: "https://ux-research-tool.vercel.app/",
  },
  // ── DESIGN: Complete 34 Local Assets Gallery ──
  {
    id: 100,
    title: "ARTBOARD STUDY II",
    category: "DESIGN",
    year: "2025",
    desc: "Komposisi brutalist yang mengeksplorasi penskalaan tipografi kontras tinggi dan grid digital yang ketat.",
    tags: ["Layout", "Brutalist", "Figma"],
    imageUrl: "/assets/img/test/Artboard 2.png",
  },
  {
    id: 101,
    title: "BACKEND GRAPHICS LABS",
    category: "DESIGN",
    year: "2026",
    desc: "Infografis teknis yang memetakan skema database relasional dan alur operasi backend.",
    tags: ["Infographic", "Photoshop"],
    imageUrl: "/assets/img/test/BE.png",
  },
  {
    id: 102,
    title: "COVER BUKU EDITORIAL",
    category: "DESIGN",
    year: "2025",
    desc: "Desain cover buku editorial bergaya brutalist menggunakan perataan kolom asimetris.",
    tags: ["Layout", "Typography", "Figma"],
    imageUrl: "/assets/img/test/CoverBuku.png",
  },
  {
    id: 103,
    title: "SOCIAL MEDIA BUNDLE I",
    category: "DESIGN",
    year: "2025",
    desc: "Template desain modular yang dikurasi untuk estetika pemasaran media sosial kontemporer.",
    tags: ["Social Media", "Figma", "Marketing"],
    imageUrl: "/assets/img/test/FEED1.png",
  },
  {
    id: 104,
    title: "FPOSTER GEOMETRIC ART",
    category: "DESIGN",
    year: "2025",
    desc: "Poster vektor kontras tinggi dengan memanfaatkan tata letak geometris dan wireframe yang rumit.",
    tags: ["Poster", "Vector", "Illustrator"],
    imageUrl: "/assets/img/test/FPOSTER.png",
  },
  {
    id: 105,
    title: "FAST UPB CAMPAIGN",
    category: "DESIGN",
    year: "2024",
    desc: "Tata letak promosi acara yang dirancang untuk program kampus fast-track dan kampanye akademik.",
    tags: ["Branding", "Banner", "Photoshop"],
    imageUrl: "/assets/img/test/IGA4-FASTUPB.png",
  },
  {
    id: 106,
    title: "MAULID NABI DIGITAL ART",
    category: "DESIGN",
    year: "2024",
    desc: "Ilustrasi ucapan hari besar keagamaan digital dengan penekanan pada tulisan vektor yang bersih.",
    tags: ["Vector", "Social Media"],
    imageUrl: "/assets/img/test/IGA4-MAULIDNABI.png",
  },
  {
    id: 107,
    title: "S3 LOGO SYMBOL",
    category: "DESIGN",
    year: "2024",
    desc: "Studi tanda merek minimalis yang berpusat pada geometri inti dan palet monokrom.",
    tags: ["Logo", "Identity", "Illustrator"],
    imageUrl: "/assets/img/test/IGA4_LOGOS3.png",
  },
  {
    id: 108,
    title: "S4 EMBLEM CONCEPTS",
    category: "DESIGN",
    year: "2024",
    desc: "Emblem merek teknis bergaya brutalist yang dirancang untuk infrastruktur digital dan keamanan siber.",
    tags: ["Logo", "Branding", "Illustrator"],
    imageUrl: "/assets/img/test/IGA4_LOGOS4.png",
  },
  {
    id: 109,
    title: "KEDAI SULTAN BRANDING",
    category: "DESIGN",
    year: "2026",
    desc: "Branding komersial, identitas visual, dan desain kolateral produk promosi.",
    tags: ["Branding", "Packaging", "Figma"],
    imageUrl: "/assets/img/test/KEDAISULTAN.png",
  },
  {
    id: 110,
    title: "LOGO S7 V2 LOCKUPS",
    category: "DESIGN",
    year: "2025",
    desc: "Desain logo sekunder yang disempurnakan dengan menonjolkan bentuk seimbang dan keserbagunaan tata letak.",
    tags: ["Logo", "Identity"],
    imageUrl: "/assets/img/test/LOGO S7 V2.png",
  },
  {
    id: 111,
    title: "WEBHOOK INTEGRATOR MARK",
    category: "DESIGN",
    year: "2025",
    desc: "Tanda digital modern yang memvisualisasikan webhook real-time dan konektivitas API.",
    tags: ["Logo", "Tech Style", "Illustrator"],
    imageUrl: "/assets/img/test/LOGO WEBHOOK (2).png",
  },
  {
    id: 112,
    title: "MOLE STRUCTURE POSTER",
    category: "DESIGN",
    year: "2025",
    desc: "Poster brutalist komprehensif yang menampilkan grid berdampak tinggi dan outline modular.",
    tags: ["Poster", "Brutalist", "Figma"],
    imageUrl: "/assets/img/test/MOLE.png",
  },
  {
    id: 113,
    title: "METODOLOGI PENELITIAN POSTER",
    category: "DESIGN",
    year: "2025",
    desc: "Tata letak poster akademik yang menjelaskan metodologi penelitian dan struktur alur kerja.",
    tags: ["Poster", "Academic", "Layout"],
    imageUrl: "/assets/img/test/POSTER - S7METOPEN.png",
  },
  {
    id: 114,
    title: "TYPOGRAPHY EXHIBIT II",
    category: "DESIGN",
    year: "2025",
    desc: "Poster cetak hitam-putih yang ramping dengan menekankan huruf modular dan hierarki visual.",
    tags: ["Poster", "Typography"],
    imageUrl: "/assets/img/test/POSTER 2.png",
  },
  {
    id: 115,
    title: "BACKEND TECH BINDER",
    category: "DESIGN",
    year: "2025",
    desc: "Poster infografis informatif yang menampilkan arsitektur API dan sistem server.",
    tags: ["Poster", "Backend", "Photoshop"],
    imageUrl: "/assets/img/test/PosterBE.png",
  },
  {
    id: 116,
    title: "MOBILE DB ARCHITECTURE",
    category: "DESIGN",
    year: "2024",
    desc: "Diagram modular terperinci yang menggambarkan database client-server pada perangkat mobile.",
    tags: ["Poster", "Infographic"],
    imageUrl: "/assets/img/test/PosterMBD2.png",
  },
  {
    id: 117,
    title: "PENGOLAHAN CITRA CITADEL I",
    category: "DESIGN",
    year: "2025",
    desc: "Desain grafis konseptual yang menampilkan langkah-langkah pemrosesan citra digital tingkat lanjut.",
    tags: ["Poster", "Creative", "Photoshop"],
    imageUrl: "/assets/img/test/PosterPCD1.png",
  },
  {
    id: 118,
    title: "SPATIAL IMAGE FILTERING II",
    category: "DESIGN",
    year: "2025",
    desc: "Tata letak poster edukatif yang menganalisis filter domain spasial dan kernel matriks.",
    tags: ["Poster", "Grid", "Academic"],
    imageUrl: "/assets/img/test/PosterPCD2.png",
  },
  {
    id: 119,
    title: "SEDOT WC SYSTEM CONTRAST",
    category: "DESIGN",
    year: "2026",
    desc: "Tata letak eksperimental yang mengontraskan iklan layanan masyarakat dengan grid minimalis modern.",
    tags: ["Brutalist", "Creative"],
    imageUrl: "/assets/img/test/PosterSedotWC.png",
  },
  {
    id: 120,
    title: "REKAP PERJALANAN BOGOR 2024",
    category: "DESIGN",
    year: "2024",
    desc: "Jurnal kolase visual yang merekap pengalaman perjalanan regional dan fotografi lanskap.",
    tags: ["Layout", "Y2K Style"],
    imageUrl: "/assets/img/test/RekapBogor2024.png",
  },
  {
    id: 121,
    title: "BLUE GRADIENT TECH POSTER",
    category: "DESIGN",
    year: "2024",
    desc: "Poster acara AI & Teknologi yang dirancang dengan gradien neon biru yang halus.",
    tags: ["Poster", "Gradient", "Photoshop"],
    imageUrl: "/assets/img/test/Salinan dari Blue Gradient Technology Poster (1).png",
  },
  {
    id: 122,
    title: "PANGANDARAN EVENT BANNER",
    category: "DESIGN",
    year: "2023",
    desc: "Tata letak spanduk luar ruangan format lebar untuk merayakan acara gathering musim panas.",
    tags: ["Banner", "Event", "Illustrator"],
    imageUrl: "/assets/img/test/Spanduk_Pangandaran23.png",
  },
  {
    id: 123,
    title: "TO BE A ROCK EXPERIMENT",
    category: "DESIGN",
    year: "2025",
    desc: "Karya cetak tipografi artistik yang mengeksplorasi kontras, skala visual, dan gaya retro.",
    tags: ["Poster", "Art", "Brutalist"],
    imageUrl: "/assets/img/test/ToBeARockAndNotToRoll.png",
  },
  {
    id: 124,
    title: "EDITORIAL GRID CONCEPT II",
    category: "DESIGN",
    year: "2025",
    desc: "Tata letak template mockup website kepadatan tinggi yang menekankan partisi konten terstruktur.",
    tags: ["Web", "Layout", "Figma"],
    imageUrl: "/assets/img/test/WEB2.png",
  },
  {
    id: 125,
    title: "SOCIAL HIGHLIGHT SYSTEM I",
    category: "DESIGN",
    year: "2024",
    desc: "Koleksi sampul sorotan Instagram yang dikurasi dengan menggunakan ikon geometris khusus.",
    tags: ["Icons", "Social Media"],
    imageUrl: "/assets/img/test/highlight1.png",
  },
  {
    id: 126,
    title: "JERSEY FULL BG BLACK",
    category: "DESIGN",
    year: "2024",
    desc: "Desain cetak jersey olahraga bertema gelap dengan fitur aksen neon biru digital.",
    tags: ["Jersey", "Merchandise", "Illustrator"],
    imageUrl: "/assets/img/test/jerseyfullBG.png",
  },
  {
    id: 127,
    title: "JERSEY FULL WG NEON",
    category: "DESIGN",
    year: "2024",
    desc: "Desain cetak jersey olahraga bertema terang dengan memanfaatkan garis-garis neon hijau cerah.",
    tags: ["Jersey", "Merchandise", "Illustrator"],
    imageUrl: "/assets/img/test/jerseyfullWG.png",
  },
  {
    id: 128,
    title: "CORE STRUCTURAL POSTER",
    category: "DESIGN",
    year: "2024",
    desc: "Poster tipografi konseptual modern yang menampilkan batas tepi (borders) berdampak tinggi.",
    tags: ["Poster", "Layout"],
    imageUrl: "/assets/img/test/poster.png",
  },
  {
    id: 129,
    title: "BOGOR RETROSCAP II",
    category: "DESIGN",
    year: "2024",
    desc: "Tata letak grid foto Y2K nostalgia yang mengabadikan momen-momen seru makrab mahasiswa.",
    tags: ["Poster", "Y2K Style", "Layout"],
    imageUrl: "/assets/img/test/posterbogor2.png",
  },
  {
    id: 130,
    title: "AVATAR CUSTOM LABS II",
    category: "DESIGN",
    year: "2025",
    desc: "Grafis avatar profil minimalis yang berfokus pada pengembang untuk digunakan di berbagai platform.",
    tags: ["Vector", "Icon"],
    imageUrl: "/assets/img/test/ppgithub2.png",
  },
  {
    id: 131,
    title: "PCD TUTORIAL THUMBNAIL",
    category: "DESIGN",
    year: "2025",
    desc: "Template thumbnail digital kontras tinggi untuk mengoptimalkan rasio klik video tutorial.",
    tags: ["Thumbnail", "Layout", "Photoshop"],
    imageUrl: "/assets/img/test/tmbPCD.png",
  },
  {
    id: 132,
    title: "UKM BOLA MARKETING FEED",
    category: "DESIGN",
    year: "2024",
    desc: "Desain grafis dan tata letak media sosial dinamis untuk mempromosikan klub olahraga bola.",
    tags: ["Social Media", "Branding", "Illustrator"],
    imageUrl: "/assets/img/test/ukmbolav1.png",
  },
  {
    id: 133,
    title: "TADIKA COLLAGE WALLPAPER",
    category: "DESIGN",
    year: "2025",
    desc: "Kolase visual resolusi tinggi untuk wallpaper desktop lebar yang menampilkan kenangan perjalanan.",
    tags: ["Collage", "Wallpaper", "Figma"],
    imageUrl: "/assets/img/test/wptadika2v2.png",
  },
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

const GithubPreview = ({ src, isDarkMode }: { src: string; isDarkMode: boolean }) => {
  const repoSlug = src.replace("https://github.com/", "");
  return (
    <div
      className={`w-full mb-4 border relative overflow-hidden h-32 flex flex-col justify-between p-3 bg-neutral-900/50 group/iframe ${
        isDarkMode ? "border-white/10" : "border-black/10"
      }`}
    >
      <div className="flex justify-between items-start">
        <GithubIcon className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-black"}`} />
        <span className="font-geist text-[8px] font-bold tracking-widest text-brand-blue bg-brand-blue/10 px-1.5 py-0.5 border border-brand-blue/20">
          GITHUB REPO
        </span>
      </div>
      <div className="font-geist text-[9px] tracking-wider font-semibold opacity-70 break-all">
        {repoSlug}
      </div>
      {/* Interaction hint overlay */}
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 bg-black/40 opacity-0 group-hover/iframe:opacity-100 flex items-center justify-center transition-opacity duration-300 text-[10px] font-geist font-bold tracking-widest text-white backdrop-blur-[2px]"
      >
        VIEW ON GITHUB ↗
      </a>
    </div>
  );
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
        className="absolute inset-0 bg-black/40 opacity-0 group-hover/iframe:opacity-100 flex items-center justify-center transition-opacity duration-300 text-[10px] font-geist font-bold tracking-widest text-white backdrop-blur-[2px]"
      >
        OPEN LIVE SITE ↗
      </a>
    </div>
  );
};

export default function Projects({ isDarkMode }: { isDarkMode: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState("DEVELOPMENT");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
  const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
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
    setLoadingDetail(true);
    setErrorDetail(null);

    try {
      const res = await fetch(`/api/project-detail?id=${p.id}`);
      if (!res.ok) {
        throw new Error("Gagal mengambil detail proyek dari database.");
      }
      const data = await res.json();
      setProjectDetail(data);
    } catch (err: any) {
      setErrorDetail(err.message || "Terjadi kesalahan koneksi.");
    } finally {
      setLoadingDetail(false);
    }
  };

  const border = isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const fg = isDarkMode ? "text-white" : "text-black";
  const fgMuted = isDarkMode ? "text-white/40" : "text-black/35";

  return (
    <section
      id="projects"
      className={`relative w-full select-none overflow-hidden font-geist ${isDarkMode ? "bg-black" : "bg-[#f4f4f0]"}`}
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
      <div
        className="px-8 md:px-10 py-8 flex items-center gap-6"
        style={{ borderBottom: `1px solid ${border}` }}
      >
        <span className={`font-geist text-[22px] font-extrabold tracking-[0.25em] uppercase ${fg}`}>PROJECTS</span>
        <div className={`flex-1 h-px ${isDarkMode ? "bg-white/8" : "bg-black/8"}`} />
        <span className={`font-geist text-[9px] font-bold tracking-[0.3em] uppercase ${fgMuted}`}>
          {PROJECTS_DATA.length} PROJECTS
        </span>
      </div>

      {/* Filter and Cards Content */}
      <div className="flex flex-col w-full px-8 md:px-10 py-10 md:py-16 relative z-10">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["DEVELOPMENT", "DESIGN"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 border font-geist text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-brand-blue text-white border-brand-blue"
                  : isDarkMode
                  ? "border-white/20 hover:border-white text-white hover:bg-white/5"
                  : "border-black/20 hover:border-black text-black hover:bg-black/5"
              }`}
            >
              {cat === "DEVELOPMENT" && <OSWindowIcon className="w-3 h-3" />}
              {cat === "DESIGN" && <SparkleIcon className="w-3 h-3" />}
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid - responsive 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {PROJECTS_DATA.filter(
            (p) => p.category === selectedCategory
          ).map((p) => {
            if (p.category === "DESIGN") {
              return (
                <div
                  key={p.id}
                  onClick={() => p.imageUrl && setLightboxImage({ src: p.imageUrl, title: p.title })}
                  className={`overflow-hidden aspect-[3/4] bg-neutral-900 group relative border transition-all duration-300 cursor-pointer ${
                    isDarkMode ? "border-white/10" : "border-black/10"
                  }`}
                >
                  <Image
                    src={p.imageUrl || ""}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={p.id === 3 || p.id === 6}
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 z-10">
                    <span className="text-[10px] tracking-widest font-bold text-white bg-black/60 px-3 py-1.5 border border-white/20">
                      VIEW FULL IMAGE
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={p.id}
                onClick={() => handleProjectClick(p)}
                className={`border p-4 flex flex-col justify-between transition-all duration-300 group relative hover:-translate-y-1 hover:shadow-[4px_4px_0px_#0033ff] cursor-pointer ${
                  isDarkMode
                    ? "border-white/10 hover:border-white bg-[#0e0e0e]"
                    : "border-black/10 hover:border-black bg-white"
                }`}
              >
                {/* Category & Year */}
                <div className="flex justify-between items-center mb-3 text-[8px] font-geist font-bold tracking-widest opacity-60">
                  <span className="flex items-center gap-1.5">
                    <CategoryIcon category={p.category} className="w-2.5 h-2.5 text-brand-blue" />
                    {p.category}
                  </span>
                  <span>{p.year}</span>
                </div>

                {/* Preview Container: Image Preview or Live Site Iframe or Github Link */}
                {p.imageUrl ? (
                  <div className={`w-full aspect-video mb-4 border relative overflow-hidden bg-[#121212] group/iframe ${
                    isDarkMode ? "border-white/10" : "border-black/10"
                  }`}>
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={p.id === 9}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 text-[9px] font-geist font-bold tracking-widest text-white backdrop-blur-[1px]">
                      OPEN PROJECT DETAILS ↗
                    </div>
                  </div>
                ) : p.liveUrl && (
                  p.liveUrl.includes("github.com") ? (
                    <GithubPreview src={p.liveUrl} isDarkMode={isDarkMode} />
                  ) : (
                    <IframePreview src={p.liveUrl} title={p.title} isDarkMode={isDarkMode} />
                  )
                )}

                {/* Title & Description */}
                <div className="mb-4">
                  <h3 className="font-geist text-xs sm:text-sm font-bold tracking-wider mb-1.5 group-hover:text-brand-blue transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-geist text-[10px] sm:text-[11px] font-light leading-relaxed opacity-85">
                    {p.desc}
                  </p>
                </div>

                {/* Footer tags and Arrow */}
                <div className="flex justify-between items-end mt-auto pt-3 border-t border-neutral-800">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[7px] font-geist tracking-widest px-1.5 py-0.5 border ${
                          isDarkMode
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
            );
          })}
        </div>
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
                className={`w-full max-w-5xl max-h-[92vh] overflow-y-auto border-2 pointer-events-auto ${
                  isDarkMode
                    ? "bg-[#0a0a0a] border-zinc-800 shadow-[8px_8px_0px_#000000]"
                    : "bg-[#f5f5f1] border-black shadow-[8px_8px_0px_#000000]"
                }`}
              >
                {/* Modal Header */}
                <div className={`flex items-start justify-between p-5 border-b ${
                  isDarkMode ? "border-white/10" : "border-black/10"
                }`}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CategoryIcon category={activeProject.category} className="w-3 h-3 text-brand-blue" />
                      <span className="font-geist text-[9px] font-bold tracking-[0.25em] text-brand-blue">{activeProject.category} · {activeProject.year}</span>
                    </div>
                    <h2 className={`font-geist text-lg font-extrabold tracking-wider ${isDarkMode ? "text-white" : "text-black"}`}>
                      {activeProject.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveProject(null)}
                    className={`font-geist text-[10px] font-bold px-3 py-1.5 border ml-4 shrink-0 cursor-pointer transition-all ${
                      isDarkMode ? "border-white/30 text-white hover:bg-white hover:text-black" : "border-black/30 text-black hover:bg-black hover:text-white"
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
                    <p className={`font-mono text-[9px] tracking-[0.2em] font-bold ${
                      isDarkMode ? "text-white/60" : "text-black/60"
                    }`}>RETRIEVING_DATABASE_RECORD...</p>
                  </div>
                )}

                {/* Error state inside modal */}
                {errorDetail && (
                  <div className="p-12 text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 border-2 border-red-500 bg-red-500/10 text-red-500 font-bold text-sm mb-2">
                      !
                    </div>
                    <p className={`font-geist text-xs font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                      {errorDetail}
                    </p>
                    <button
                      onClick={() => handleProjectClick(activeProject)}
                      className={`font-geist text-[10px] font-bold px-4 py-2 border transition-all cursor-pointer ${
                        isDarkMode 
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
                  <div className={`grid grid-cols-1 md:grid-cols-12 md:divide-x ${
                    isDarkMode ? "md:divide-white/10" : "md:divide-black/10"
                  }`}>
                    {/* Left Column (Main Info & Highlights) */}
                    <div className="col-span-12 md:col-span-8 p-5 sm:p-6 space-y-5">
                      {/* Image (DESIGN only / any project with imageUrl) */}
                      {activeProject.imageUrl && (
                        <div className={`w-full aspect-video overflow-hidden border ${
                          isDarkMode ? "border-white/10" : "border-black/10"
                        }`}>
                          <img src={activeProject.imageUrl} alt={activeProject.title} className="w-full h-full object-cover" />
                        </div>
                      )}

                      {/* Objective */}
                      <div>
                        <p className={`font-geist text-[9px] font-bold tracking-[0.25em] mb-1.5 ${
                          isDarkMode ? "text-white/40" : "text-black/40"
                        }`}>TUJUAN PROYEK</p>
                        <p className={`font-geist text-xs sm:text-sm leading-relaxed ${
                          isDarkMode ? "text-white/85" : "text-black/85"
                        }`}>{projectDetail.objective}</p>
                      </div>

                      {/* Highlights */}
                      {projectDetail.highlights && projectDetail.highlights.length > 0 && (
                        <div>
                          <p className={`font-geist text-[9px] font-bold tracking-[0.25em] mb-2 ${
                            isDarkMode ? "text-white/40" : "text-black/40"
                          }`}>HIGHLIGHTS</p>
                          <ul className="space-y-1.5">
                            {projectDetail.highlights.map((h, i) => (
                              <li key={i} className={`font-geist text-xs leading-relaxed flex gap-2 ${
                                isDarkMode ? "text-white/80" : "text-black/80"
                              }`}>
                                <span className="text-brand-blue shrink-0 font-bold">→</span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right Column (Tech Stack & Action Links) */}
                    <div className="col-span-12 md:col-span-4 p-5 sm:p-6 flex flex-col justify-between space-y-6">
                      <div>
                        {/* Tech Stack */}
                        {projectDetail.techStack && projectDetail.techStack.length > 0 && (
                          <div>
                            <p className={`font-geist text-[9px] font-bold tracking-[0.25em] mb-3.5 ${
                              isDarkMode ? "text-white/40" : "text-black/40"
                            }`}>TECH STACK</p>
                            <div className="space-y-3.5">
                              {projectDetail.techStack.map((group) => (
                                <div key={group.label} className="space-y-1">
                                  <span className={`font-geist text-[8px] font-bold tracking-widest block uppercase ${
                                    isDarkMode ? "text-white/40" : "text-black/40"
                                  }`}>{group.label}</span>
                                  <div className="flex flex-wrap gap-1">
                                    {group.items.map((item) => (
                                      <span key={item} className={`font-geist text-[9px] font-medium px-2 py-0.5 border ${
                                        isDarkMode ? "border-white/15 text-white/80 bg-white/5" : "border-black/15 text-black/80 bg-black/5"
                                      }`}>{item}</span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Links */}
                      <div className={`flex flex-row gap-3 pt-5 border-t ${
                        isDarkMode ? "border-white/10" : "border-black/10"
                      }`}>
                        {projectDetail.liveUrl && (
                          <a href={projectDetail.liveUrl} target="_blank" rel="noopener noreferrer"
                            className="font-geist text-[10px] font-bold tracking-widest px-4 py-2.5 bg-brand-blue text-white border border-brand-blue hover:bg-blue-700 transition-colors text-center flex-1">
                            LIVE SITE ↗
                          </a>
                        )}
                        {projectDetail.githubUrl && (
                          <a href={projectDetail.githubUrl} target="_blank" rel="noopener noreferrer"
                            className={`font-geist text-[10px] font-bold tracking-widest px-4 py-2.5 border transition-colors text-center flex-1 ${
                              isDarkMode ? "border-white/30 text-white hover:bg-white hover:text-black" : "border-black/30 text-black hover:bg-black hover:text-white"
                            }`}>
                            GITHUB ↗
                          </a>
                        )}
                      </div>
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
              <span className="font-geist text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase">
                {lightboxImage.title}
              </span>
              <button
                onClick={() => setLightboxImage(null)}
                className="font-geist text-[10px] font-bold px-3 py-1.5 border border-white/30 text-white hover:bg-white hover:text-black transition-all cursor-pointer"
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
