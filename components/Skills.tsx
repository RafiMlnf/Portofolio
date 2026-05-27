"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";

/* ─── Skill Areas (Top Row) ─── */
const skillAreas = [
  {
    number: "01",
    title: "Frontend Development",
    description:
      "Membangun antarmuka web modern yang responsif dan performan menggunakan React, Next.js, dan Tailwind CSS. Fokus pada pengalaman pengguna yang mulus dan kode yang bersih.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    number: "02",
    title: "UI & Visual Design",
    description:
      "Merancang tampilan yang estetis dan fungsional mulai dari wireframe hingga high-fidelity mockup. Terbiasa bekerja dengan sistem desain dan tipografi.",
    tags: ["Figma", "Photoshop", "Branding", "Typography"],
  },
  {
    number: "03",
    title: "Backend & Database",
    description:
      "Membangun REST API, mengelola database, dan mengintegrasikan sistem backend dengan frontend. Pengalaman dengan PHP, Node.js, MySQL, dan Redis.",
    tags: ["PHP", "Node.js", "MySQL", "Redis"],
  },
  {
    number: "04",
    title: "Mobile Development",
    description:
      "Mengembangkan aplikasi mobile multiplatform dengan Flutter dan Dart, dari proses desain UI hingga deployment ke Android.",
    tags: ["Flutter", "Dart", "Android", "Cross-platform"],
  },
];

/* ─── Tool Categories (Bottom Row) ─── */
interface Tool {
  name: string;
  iconUrl: string;
  description: string;
  invertDark: boolean;
  isFeatured?: boolean;
  since?: string;
}

interface ToolGroup {
  category: string;
  tools: Tool[];
}

const toolGroups: ToolGroup[] = [
  {
    category: "Frontend",
    tools: [
      {
        name: "Next.js",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        description: "Framework React modern untuk produksi dengan Server-Side Rendering (SSR), routing otomatis, API routes, dan optimasi performa tinggi bawaan.",
        invertDark: true,
        isFeatured: true,
        since: "2024"
      },
      {
        name: "React",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        description: "Library JavaScript terpopuler untuk membangun antarmuka pengguna interaktif secara deklaratif menggunakan komponen modular yang reusable.",
        invertDark: false,
        since: "2024"
      },
      {
        name: "TypeScript",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        description: "Superset dari JavaScript yang menambahkan static typing, membantu mendeteksi error lebih awal dan menyediakan sistem autocomplete yang andal saat menulis kode.",
        invertDark: false,
        isFeatured: true,
        since: "2024"
      },
      {
        name: "JavaScript",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        description: "Bahasa pemrograman utama web yang digunakan untuk memberikan logika interaktif, mengelola state, dan menangani fungsionalitas di sisi klien.",
        invertDark: false,
        since: "2023"
      },
      {
        name: "Flutter",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
        description: "Software Development Kit (SDK) dari Google untuk membangun aplikasi yang dikompilasi secara native untuk mobile (Android & iOS) dari satu codebase.",
        invertDark: false,
        since: "2024"
      },
      {
        name: "Dart",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
        description: "Bahasa pemrograman yang dioptimalkan untuk pengembangan klien, menjadi fondasi utama bagi Flutter untuk rendering antarmuka berkecepatan tinggi.",
        invertDark: false,
        since: "2024"
      },
    ],
  },
  {
    category: "Backend",
    tools: [
      {
        name: "PHP",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        description: "Bahasa scripting sisi server yang andal dan luas digunakan untuk membangun web dinamis, memproses data form, serta menghubungkan database.",
        invertDark: false,
        since: "2023"
      },
      {
        name: "Node.js",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        description: "Runtime environment JavaScript di luar browser berbasis mesin V8, ideal untuk membangun layanan backend berskala besar, real-time, dan berorientasi event.",
        invertDark: false,
        since: "2024"
      },
      {
        name: "MySQL",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        description: "Relational Database Management System (RDBMS) berbasis SQL yang tangguh untuk menyimpan dan mengorganisir data proyek secara terstruktur.",
        invertDark: false,
        isFeatured: true,
        since: "2023"
      },
      {
        name: "Redis",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
        description: "Penyimpanan struktur data di dalam memori (in-memory) berkecepatan sangat tinggi, sering dimanfaatkan sebagai cache, broker pesan, dan pengelola sesi.",
        invertDark: false,
        isFeatured: true,
        since: "2025"
      },
      {
        name: "Cloudinary",
        iconUrl: "https://appexchange.salesforce.com/image_host/114124ea-20a8-4993-89dc-12613a17281e.png",
        description: "Layanan manajemen media berbasis cloud (SaaS) untuk optimasi otomatis, transformasi aset gambar/video, dan pengiriman CDN berkinerja tinggi.",
        invertDark: false,
        since: "2025"
      },
      {
        name: "PostgreSQL",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        description: "Sistem database relasional open-source tingkat enterprise yang sangat andal, mendukung query kompleks dan skalabilitas tinggi.",
        invertDark: false,
        since: "2025"
      },
      {
        name: "Prisma ORM",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
        description: "Object-Relational Mapping (ORM) modern untuk Node.js dan TypeScript, memudahkan pengelolaan skema data, migrasi, dan query database tipe aman.",
        invertDark: true,
        since: "2025"
      },
    ],
  },
  {
    category: "Design",
    tools: [
      {
        name: "Photoshop",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
        description: "Pertama kali menyentuh Photoshop ketika penasaran dengan tools ini yang memang 'to the next level' dalam cara saya menuangkan ekspresi. Sebelum mengenal tools digital ini, wadah ekspresi saya adalah menggambar secara manual.",
        invertDark: false,
        isFeatured: true,
        since: "2017"
      },
      {
        name: "Premiere Pro",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg",
        description: "Perangkat lunak penyuntingan video non-linear profesional untuk merakit rekaman, menambahkan efek audio-visual, dan kebutuhan storytelling.",
        invertDark: false,
        isFeatured: true,
        since: "2022"
      },
      {
        name: "After Effects",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg",
        description: "Perangkat lunak standar industri untuk pembuatan motion graphics, efek visual sinematik, serta animasi UI/UX interaktif yang dinamis.",
        invertDark: false,
        since: "2023"
      },
    ],
  },
  {
    category: "Additional / Project Stack",
    tools: [
      {
        name: "Figma",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        description: "Platform kolaboratif berbasis cloud untuk perancangan UI/UX, pembuatan mockup resolusi tinggi, sistem desain, dan prototipe interaktif.",
        invertDark: false,
        since: "2023"
      },
      {
        name: "Adobe Illustrator",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
        description: "Perangkat lunak standar industri desain grafis vektor untuk merancang aset digital, ilustrasi presisi tinggi, ikon antarmuka, serta logo branding.",
        invertDark: false,
        since: "2022"
      },
      {
        name: "Canva",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
        description: "Platform desain grafis online kolaboratif untuk merancang media sosial, presentasi, poster, dan dokumen visual lainnya dengan ribuan template instan.",
        invertDark: false,
        since: "2021"
      },
      {
        name: "CapCut",
        iconUrl: "https://play-lh.googleusercontent.com/M78HyakHaxKrjoeqYx41E9DXfVYYtx67nvc7Ks4G4zFQeaAJdGCi8gzzGSrHIwlrmnJS6zD9S4fAXqdEwfuHQAQ",
        description: "Perangkat lunak penyuntingan video yang intuitif dan serbaguna, ideal untuk pembuatan konten kreatif media sosial secara cepat dengan template dinamis.",
        invertDark: false,
        since: "2022"
      },
      {
        name: "C Language",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        description: "Bahasa pemrograman tingkat rendah berkinerja tinggi, digunakan dalam benchmark komputasi berat langsung di dalam browser menggunakan kompilator Emscripten.",
        invertDark: false,
        since: "2025"
      },
      {
        name: "Java",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        description: "Bahasa pemrograman berbasis kelas (OOP) yang tangguh, digunakan sebagai basis utama pengembangan aplikasi mobile native Android pada Android SDK.",
        invertDark: false,
        since: "2024"
      },
      {
        name: "Android SDK",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        description: "Kumpulan tools dan software development kit resmi untuk merancang, membangun, mengintegrasikan sensor, serta merilis aplikasi di ekosistem Android.",
        invertDark: false,
        since: "2024"
      },
      {
        name: "Leaflet.js",
        iconUrl: "https://leafletjs.com/docs/images/logo.png",
        description: "Library JavaScript open-source yang sangat ringan untuk merender peta interaktif ramah mobile, serta melakukan tracking geolokasi GPS secara real-time.",
        invertDark: false,
        since: "2025"
      },
      {
        name: "HTML5",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        description: "Bahasa markup standar untuk menstrukturkan halaman web, merender elemen semantik, serta menyediakan kerangka dasar aplikasi web.",
        invertDark: false,
        since: "2023"
      },
      {
        name: "CSS3",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        description: "Bahasa stylesheet untuk merancang tata letak web yang estetik dan responsif, mengelola tipografi, warna, transisi, dan visual web modern.",
        invertDark: false,
        since: "2023"
      }
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Gold shimmer keyframe name injected globally via globals.css
const goldBorderStyle: React.CSSProperties = {
  borderColor: "transparent",
  backgroundImage: "linear-gradient(#0a0a0a, #0a0a0a), linear-gradient(90deg, rgba(184,134,11,0.4) 0%, rgba(255,215,0,0.4) 30%, rgba(255,250,205,0.4) 50%, rgba(255,215,0,0.4) 70%, rgba(184,134,11,0.4) 100%)",
  backgroundOrigin: "border-box",
  backgroundClip: "padding-box, border-box",
  backgroundSize: "100% 100%, 200% 100%",
  animation: "gold-shimmer 2.4s linear infinite",
};

const goldBorderStyleLight: React.CSSProperties = {
  ...goldBorderStyle,
  backgroundImage: "linear-gradient(#f4f4f0, #f4f4f0), linear-gradient(90deg, rgba(184,134,11,0.4) 0%, rgba(255,215,0,0.4) 30%, rgba(255,250,205,0.4) 50%, rgba(255,215,0,0.4) 70%, rgba(184,134,11,0.4) 100%)",
};

export default function Skills({ isDarkMode }: { isDarkMode: boolean }) {
  const [activeTool, setActiveTool] = React.useState<Tool | null>(null);

  const border = isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const fg = isDarkMode ? "text-white" : "text-black";
  const fgMuted = isDarkMode ? "text-white/40" : "text-black/35";
  const totalTools = toolGroups.reduce((acc, g) => acc + g.tools.length, 0);

  // Split tool groups for layout
  const mainGroups = toolGroups.slice(0, 3);
  const additionalGroup = toolGroups[3];

  return (
    <section
      id="skills"
      className={`relative w-full select-none font-geist ${isDarkMode ? "bg-black" : "bg-[#f4f4f0]"}`}
    >
      {/* ═══ SECTION HEADER ═══ */}
      <div
        className="px-8 md:px-10 py-8 flex items-center gap-6"
        style={{ borderBottom: `1px solid ${border}` }}
      >
        <span className={`font-geist text-[22px] font-extrabold tracking-[0.25em] uppercase ${fg}`}>SKILLS</span>
        <div className={`flex-1 h-px ${isDarkMode ? "bg-white/8" : "bg-black/8"}`} />
      </div>

      {/* ═══ TOP ROW — Skill Areas ═══ */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ borderBottom: `1px solid ${border}` }}
      >
        {skillAreas.map((area, i) => (
          <motion.div
            key={area.number}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={i}
            variants={fadeUp}
            className={`flex flex-col gap-5 p-8 transition-colors duration-300 ${
              isDarkMode ? "hover:bg-white/[0.03]" : "hover:bg-black/[0.02]"
            }`}
            style={{
              borderRight: i < skillAreas.length - 1 ? `1px solid ${border}` : "none",
            }}
          >
            <div className="flex flex-col gap-2">
              <h3 className={`font-geist text-[15px] font-extrabold tracking-tight leading-tight ${fg}`}>
                {area.title}
              </h3>
            </div>

            <div className="w-8 h-[2px] bg-brand-blue" />

            <p
              className={`text-[12px] leading-[1.75] font-light ${isDarkMode ? "text-white/50" : "text-black/50"}`}
            >
              {area.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-auto">
              {area.tags.map((tag) => (
                <span
                  key={tag}
                  className={`font-geist text-[8px] font-bold tracking-[0.2em] uppercase px-2 py-1 border ${
                    isDarkMode ? "border-white/10 text-white/40" : "border-black/10 text-black/35"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ═══ BOTTOM — Categorized Tool Grids ═══ */}
      <div
        className="grid grid-cols-1 lg:grid-cols-3 mt-8"
        style={{ borderBottom: `1px solid ${border}`, borderTop: `1px solid ${border}` }}
      >
        {mainGroups.map((group, gi) => (
          <div
            key={group.category}
            className="border-b lg:border-b-0 lg:border-r last:border-b-0 lg:last:border-r-0"
            style={{
              borderColor: border,
            }}
          >
            {/* Category Header */}
            <div
              className="px-8 py-4 flex items-center gap-3"
              style={{ borderBottom: `1px solid ${border}` }}
            >
              <span className={`font-geist text-[9px] font-bold tracking-[0.35em] uppercase ${fg}`}>
                {group.category}
              </span>
            </div>

            {/* Tools List — rendered as badges with gap */}
            <div className="p-6 flex flex-wrap gap-3">
              {group.tools.map((tool, ti) => (
                <motion.div
                  key={tool.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={gi * 2 + ti * 0.4}
                  variants={fadeUp}
                  onClick={() => setActiveTool(tool)}
                  className={`flex items-center gap-3 px-4 py-1.5 border transition-colors duration-200 group cursor-pointer ${
                    tool.isFeatured
                      ? "hover:bg-white/[0.06] hover:shadow-[3px_3px_0px_#ffd700]"
                      : isDarkMode
                      ? "bg-white/[0.02] border-white/10 hover:border-brand-blue hover:bg-white/[0.06] hover:shadow-[3px_3px_0px_#0033ff]"
                      : "bg-black/[0.02] border-black/10 hover:border-brand-blue hover:bg-black/[0.04] hover:shadow-[3px_3px_0px_#0033ff]"
                  }`}
                  style={tool.isFeatured ? (isDarkMode ? goldBorderStyle : goldBorderStyleLight) : undefined}
                >
                  <img
                    src={tool.iconUrl}
                    alt={tool.name}
                    className={`w-6 h-6 object-contain transition-transform duration-200 group-hover:scale-110 ${
                      isDarkMode && tool.invertDark ? "invert" : ""
                    }`}
                  />
                  <div className="flex flex-col">
                    <span className={`font-geist text-[9px] font-bold tracking-[0.15em] leading-tight ${fg}`}>
                      {tool.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ═══ ADDITIONAL / PROJECT STACK (Horizontal Navbar-style Dock with Spacing) ═══ */}
      {additionalGroup && (
        <div className="px-8 md:px-10 py-8">
          <div
            className="flex flex-col md:flex-row md:items-center border"
            style={{ borderColor: border }}
          >
            {/* Header Tag */}
            <div
              className="px-8 py-4 flex items-center gap-3 shrink-0 border-b md:border-b-0 md:border-r"
              style={{ borderColor: border }}
            >
              <span className={`font-geist text-[9px] font-bold tracking-[0.35em] uppercase ${fg}`}>
                {additionalGroup.category}
              </span>
            </div>

            {/* Icons Row */}
            <div className="flex-1 px-8 py-3.5 flex flex-wrap items-center gap-4 md:gap-5 overflow-x-auto select-none">
              {additionalGroup.tools.map((tool, ti) => (
                <motion.div
                  key={tool.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={ti * 0.08}
                  variants={fadeUp}
                  title={tool.name}
                  className={`flex items-center justify-center p-2 border transition-all duration-200 group cursor-default ${
                    isDarkMode
                      ? "bg-white/[0.02] border-white/10 hover:border-brand-blue hover:bg-white/[0.06] hover:shadow-[2px_2px_0px_#0033ff]"
                      : "bg-black/[0.02] border-black/10 hover:border-brand-blue hover:bg-black/[0.04] hover:shadow-[2px_2px_0px_#0033ff]"
                  }`}
                >
                  <img
                    src={tool.iconUrl}
                    alt={tool.name}
                    className={`w-5 h-5 object-contain transition-transform duration-200 group-hover:scale-110 ${
                      isDarkMode && tool.invertDark ? "invert" : ""
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ DESCRIPTION POPUP ═══ */}
      <AnimatePresence>
        {activeTool && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveTool(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[1000] cursor-pointer"
            />

            {/* Popup Box */}
            <div className="fixed inset-0 flex items-center justify-center z-[1001] pointer-events-none p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`w-full max-w-[380px] p-6 border-2 shadow-[6px_6px_0px_#0033ff] pointer-events-auto flex flex-col gap-4 ${
                  isDarkMode ? "bg-[#0b0b0b] border-white text-white" : "bg-[#f4f4f0] border-black text-black"
                }`}
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <img
                    src={activeTool.iconUrl}
                    alt={activeTool.name}
                    className={`w-7 h-7 object-contain ${isDarkMode && activeTool.invertDark ? "invert" : ""}`}
                  />
                  <h4 className="font-geist text-sm font-extrabold tracking-[0.15em] uppercase">
                    {activeTool.name}
                  </h4>
                  <button
                    onClick={() => setActiveTool(null)}
                    className={`ml-auto font-geist text-[10px] font-bold px-2.5 py-1 border transition-all duration-150 cursor-pointer ${
                      isDarkMode
                        ? "border-white/20 hover:border-white hover:bg-white hover:text-black"
                        : "border-black/20 hover:border-black hover:bg-black hover:text-white"
                    }`}
                  >
                    ×
                  </button>
                </div>

                {/* Divider */}
                <div className={`h-px w-full ${isDarkMode ? "bg-white/10" : "bg-black/10"}`} />

                {/* Year + Description */}
                <div className="flex flex-col gap-3">
                  {activeTool.since && (
                    <div className="flex items-center gap-2">
                      <span className={`font-geist text-[8px] font-bold tracking-[0.3em] uppercase ${isDarkMode ? "text-white/30" : "text-black/30"}`}>
                        Since
                      </span>
                      <span className={`font-geist text-[10px] font-extrabold tracking-[0.2em] ${
                        isDarkMode ? "text-white/60" : "text-black/60"
                      }`}>
                        {activeTool.since}
                      </span>
                    </div>
                  )}
                  <p
                    className={`text-[12.5px] leading-[1.65] font-light ${isDarkMode ? "text-white/70" : "text-black/70"}`}
                  >
                    {activeTool.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
