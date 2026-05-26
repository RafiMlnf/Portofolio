"use client";

import React from "react";
import { motion } from "motion/react";

const coreStack = [
  {
    name: "PHOTOSHOP",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
    year: "Mulai 2020",
    description: "Manipulasi gambar, desain aset grafis, dan mockup visual."
  },
  {
    name: "PREMIERE PRO",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg",
    year: "Mulai 2021",
    description: "Editing video, perakitan footage, dan visual storytelling."
  },
  {
    name: "JAVASCRIPT",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    year: "Mulai 2021",
    description: "Pemrograman logika interaktif dan manipulasi DOM dinamis."
  },
  {
    name: "TYPESCRIPT",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    year: "Mulai 2023",
    description: "Penulisan kode aman dengan static typing pada skala aplikasi besar."
  },
  {
    name: "DART",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
    year: "Mulai 2022",
    description: "Bahasa pemrograman utama untuk framework Flutter."
  },
  {
    name: "REDIS",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    year: "Mulai 2023",
    description: "Penyimpanan caching cepat dan manajemen sesi database."
  },
  {
    name: "PHP",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    year: "Mulai 2021",
    description: "Pengembangan sisi server, REST API, dan integrasi database."
  },
  {
    name: "NEXT.JS",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    year: "Mulai 2023",
    description: "Framework React modern dengan SSR dan optimasi performa tinggi."
  },
  {
    name: "REACT",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    year: "Mulai 2022",
    description: "Pembuatan antarmuka web reaktif berbasis komponen modular."
  },
  {
    name: "FLUTTER",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    year: "Mulai 2022",
    description: "Pengembangan aplikasi mobile native multiplatform (Android/iOS)."
  },
];

// Y2K & Brutalist SVG Icons
const SparkleIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
  </svg>
);

const GlobeWireframeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20M3 6h18M3 18h18" />
  </svg>
);

const OSWindowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="2" y="3" width="20" height="18" rx="1" />
    <path d="M2 8h20M6 5.5h.01M9 5.5h.01M12 5.5h.01" strokeLinecap="round" />
  </svg>
);

const SmileyIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 9h.01M16 9h.01M7 15h10" strokeLinecap="round" strokeWidth="2" />
  </svg>
);

const ButterflyIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M12 22C12 22 7.5 13 3 13C1 13 1 10 4 10C7 10 9.5 12 12 15C14.5 12 17 10 20 10C23 10 23 13 21 13C16.5 13 12 22 12 22Z" />
    <path d="M12 2C12 2 8 8 4 8C2.5 8 2 6 4.5 5C7 4 9.5 5.5 12 7.5C14.5 5.5 17 4 19.5 5C22 6 21.5 8 20 8C16 8 12 2 12 2Z" />
    <circle cx="12" cy="11" r="1" fill="currentColor" />
  </svg>
);

const CrosshairIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 2v20M2 12h20" />
  </svg>
);

const skills = [
  { name: "TYPOGRAPHY DESIGN", icon: <CrosshairIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" /> },
  { name: "NEXT.JS & REACT 19", icon: <GlobeWireframeIcon className="w-4 h-4 animate-[spin_8s_linear_infinite]" /> },
  { name: "WEB APPLICATION DEV", icon: <OSWindowIcon className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform duration-300" /> },
  { name: "UX/UI BRUTALISM", icon: <SmileyIcon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" /> },
  { name: "TAILWIND STYLING", icon: <SparkleIcon className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" /> },
  { name: "MOTION & ANIMATION", icon: <ButterflyIcon className="w-4 h-4 group-hover:translate-x-[2px] transition-transform duration-300" /> },
];

export default function Skills({ isDarkMode }: { isDarkMode: boolean }) {
  const [activeTech, setActiveTech] = React.useState<string | null>(null);

  return (
    <section id="skills" className="relative w-full px-4 md:px-8 lg:px-10 py-16 md:py-28 select-none overflow-hidden">

      {/* Background Y2K Diagonal Striped Pattern */}
      <div className={`absolute inset-0 opacity-[0.02] pointer-events-none ${isDarkMode ? "text-white" : "text-black"
        }`}>
        <svg width="100%" height="100%">
          <pattern id="skills-stripes" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="20" stroke="currentColor" strokeWidth="2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#skills-stripes)" />
        </svg>
      </div>

      {/* Section Header */}
      <div className="mb-10 md:mb-16 relative z-10">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-brand-blue">
          03 / SkILLs
        </h2>
        <div className="text-[10px] sm:text-xs font-display font-light opacity-50 tracking-widest mt-2 uppercase">
          // EXPERTISE_STACK_V3
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: Skills grid */}
        <div className={`flex flex-col gap-6 pb-10 lg:pb-0 lg:pr-12 border-b lg:border-b-0 lg:border-r transition-colors duration-300 ${isDarkMode ? "border-white/10" : "border-black/10"
          }`}>
          <span className={`font-display text-[9px] font-bold tracking-widest ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
            // CAPABILITIES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`p-4 border transition-all duration-300 flex items-center justify-between font-display text-[10px] sm:text-xs font-bold tracking-widest hover:bg-brand-blue hover:text-white group ${isDarkMode ? "border-white/20 hover:border-white" : "border-black/20 hover:border-black"
                  }`}
              >
                <span>{skill.name}</span>
                <span className={`transition-colors duration-300 ${isDarkMode ? "text-white/60" : "text-black/60"} group-hover:text-white`}>
                  {skill.icon}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Core Stack */}
        <div className="flex flex-col gap-6 pt-10 lg:pt-0 lg:pl-12">
          <span className={`font-display text-[9px] font-bold tracking-widest ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
            // CORE_STACK
          </span>

          <motion.div layout transition={{ layout: { type: "spring", stiffness: 400, damping: 35 } }} className="flex flex-wrap gap-3">
            {coreStack.map((tech, index) => {
              const isActive = activeTech === tech.name;
              return (
                <motion.div
                  layout
                  layoutId={`badge-${tech.name}`}
                  key={tech.name}
                  onClick={() => setActiveTech(isActive ? null : tech.name)}
                  transition={{ layout: { type: "spring", stiffness: 400, damping: 35 } }}
                  className={`group relative flex items-center gap-2.5 px-3 py-2.5 border cursor-pointer select-none ${
                    isDarkMode
                      ? isActive
                        ? "border-brand-blue bg-[#161616] shadow-[3px_3px_0px_#0033ff]"
                        : "border-white/10 hover:border-white bg-[#0e0e0e] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#0033ff]"
                      : isActive
                        ? "border-brand-blue bg-blue-50/50 shadow-[3px_3px_0px_#0033ff]"
                        : "border-black/10 hover:border-black bg-white hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#0033ff]"
                  } transition-[border-color,background-color,box-shadow,transform] duration-200`}
                >
                  <img
                    src={tech.iconUrl}
                    alt={tech.name}
                    className="w-4 h-4 object-contain flex-shrink-0"
                  />
                  <span className="font-display text-[8px] sm:text-[9px] font-bold tracking-widest flex-shrink-0">
                    {tech.name}
                  </span>

                  {/* Expanding detail panel */}
                  <motion.div
                    initial={false}
                    animate={{
                      maxWidth: isActive ? 500 : 0,
                      opacity: isActive ? 1 : 0,
                      marginLeft: isActive ? 0 : -6,
                    }}
                    transition={{
                      maxWidth: { type: "spring", stiffness: 320, damping: 32 },
                      opacity: { duration: isActive ? 0.2 : 0.1, delay: isActive ? 0.1 : 0 },
                      marginLeft: { type: "spring", stiffness: 320, damping: 32 },
                    }}
                    className="flex items-center gap-2 text-[8px] sm:text-[9px] overflow-hidden"
                    style={{ willChange: "max-width, opacity" }}
                  >
                    {/* Divider */}
                    <div className={`w-px h-3 flex-shrink-0 ${isDarkMode ? "bg-white/20" : "bg-black/20"}`} />
                    {/* Year */}
                    <span className="font-mono text-brand-blue font-black tracking-widest whitespace-nowrap flex-shrink-0">
                      [{tech.year}]
                    </span>
                    {/* Divider */}
                    <div className={`w-px h-3 flex-shrink-0 ${isDarkMode ? "bg-white/20" : "bg-black/20"}`} />
                    {/* Description */}
                    <span className="font-sans font-light normal-case tracking-normal leading-relaxed whitespace-nowrap flex-shrink-0" style={{ opacity: 0.7 }}>
                      {tech.description}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
