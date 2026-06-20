"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ─── Technical Skills Data ─── */
const techGroups = [
  {
    category: "FRONTEND DEVELOPMENT",
    id: "frontend",
    number: "01",
    tools: [
      {
        name: "Next.js",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        invertDark: true,
      },
      {
        name: "TypeScript",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "JavaScript",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "Tailwind CSS",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
    ],
  },
  {
    category: "MOBILE DEVELOPMENT",
    id: "mobile",
    number: "02",
    tools: [
      {
        name: "Flutter",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
      },
      {
        name: "Dart",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
      },
    ],
  },
  {
    category: "BACKEND & DATABASE",
    id: "backend",
    number: "03",
    tools: [
      {
        name: "PHP",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      },
      {
        name: "PostgreSQL",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "MySQL",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "Redis",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      },
    ],
  },
  {
    category: "UI & VISUAL DESIGN",
    id: "design",
    number: "04",
    tools: [
      {
        name: "Photoshop",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
      },
      {
        name: "Premiere Pro",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg",
      },
      {
        name: "After Effects",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg",
      },
    ],
  },
];

const nonTechSkills = [
  {
    name: "EQ",
    description: "Kemampuan mengenali, memahami, dan mengelola emosi diri sendiri serta berempati terhadap orang lain. Membantu menjaga stabilitas komunikasi di situasi kritis dan menjalin hubungan kerja profesional yang sehat.",
    iconUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230033ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/></svg>",
  },
  {
    name: "Teamwork",
    description: "Bekerja sama secara aktif dan harmonis di dalam tim untuk mencapai visi bersama. Berfokus pada kejelasan komunikasi, koordinasi yang efisien, sikap suportif, serta apresiasi terhadap kontribusi setiap rekan kerja.",
    iconUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230033ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'/><circle cx='9' cy='7' r='4'/><path d='M22 21v-2a4 4 0 0 0-3-3.87'/><path d='M16 3.13a4 4 0 0 1 0 7.75'/></svg>",
  },
  {
    name: "Event Planner",
    description: "Merancang, menstrukturkan, dan mengeksekusi kegiatan secara terorganisir. Melibatkan keterampilan manajemen waktu yang ketat, delegasi tugas yang jelas, serta kemampuan adaptasi dalam pemecahan masalah.",
    iconUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230033ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M8 2v4'/><path d='M16 2v4'/><rect width='18' height='18' x='3' y='4' rx='2'/><path d='M3 10h18'/></svg>",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Skills({ isDarkMode }: { isDarkMode: boolean }) {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const toggleSkill = (skillName: string) => {
    setExpandedSkill((prev) => (prev === skillName ? null : skillName));
  };

  const border = isDarkMode ? "border-white/[0.08]" : "border-black/[0.08]";
  const fg = isDarkMode ? "text-white" : "text-black";
  const bgCard = isDarkMode ? "bg-white/[0.02]" : "bg-black/[0.01]";
  const bgCardHover = isDarkMode
    ? "hover:bg-white/[0.05] hover:border-brand-blue/50"
    : "hover:bg-black/[0.03] hover:border-brand-blue/50";

  // Group technical groups by columns
  const col1Groups = techGroups.filter((g) => g.id === "frontend" || g.id === "mobile");
  const col2Groups = techGroups.filter((g) => g.id === "backend" || g.id === "design");

  return (
    <section
      id="skills"
      className={`relative w-full select-none font-geist ${isDarkMode ? "bg-black" : "bg-[#f4f4f0]"}`}
    >
      {/* ═══ SECTION HEADER ═══ */}
      <div className={`px-8 md:px-10 py-8 flex items-center gap-6 border-b ${border}`}>
        <span className={`font-geist text-[22px] font-extrabold tracking-[0.25em] uppercase ${fg}`}>SKILLS</span>
        <div className={`flex-1 h-px ${isDarkMode ? "bg-white/8" : "bg-black/8"}`} />
      </div>

      {/* ═══ THREE COLUMN COMPACT GRID ═══ */}
      <div className={`grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x ${isDarkMode ? "divide-white/[0.08]" : "divide-black/[0.08]"} border-b ${border}`}>
        
        {/* COLUMN 1: Frontend & Mobile */}
        <div className="flex flex-col p-6 sm:p-8 gap-8">
          {col1Groups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={gi}
              variants={fadeUp}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="font-geist text-[8px] font-bold tracking-[0.25em] text-brand-blue">
                  {group.number}
                </span>
                <span className={`font-geist text-[9px] font-extrabold tracking-[0.2em] uppercase ${fg}`}>
                  {group.category}
                </span>
                <div className={`flex-1 h-px ${isDarkMode ? "bg-white/5" : "bg-black/5"}`} />
              </div>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className={`flex items-center gap-2.5 px-3 py-1.5 border ${border} ${bgCard} ${bgCardHover} transition-all duration-300`}
                  >
                    <img
                      src={tool.iconUrl}
                      alt={tool.name}
                      className={`w-4 h-4 object-contain ${isDarkMode && tool.invertDark ? "invert" : ""}`}
                    />
                    <span className={`font-geist text-[9px] font-bold tracking-[0.1em] ${fg}`}>
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* COLUMN 2: Backend & UI Design */}
        <div className="flex flex-col p-6 sm:p-8 gap-8">
          {col2Groups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={gi + 2}
              variants={fadeUp}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="font-geist text-[8px] font-bold tracking-[0.25em] text-brand-blue">
                  {group.number}
                </span>
                <span className={`font-geist text-[9px] font-extrabold tracking-[0.2em] uppercase ${fg}`}>
                  {group.category}
                </span>
                <div className={`flex-1 h-px ${isDarkMode ? "bg-white/5" : "bg-black/5"}`} />
              </div>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className={`flex items-center gap-2.5 px-3 py-1.5 border ${border} ${bgCard} ${bgCardHover} transition-all duration-300`}
                  >
                    <img
                      src={tool.iconUrl}
                      alt={tool.name}
                      className="w-4 h-4 object-contain"
                    />
                    <span className={`font-geist text-[9px] font-bold tracking-[0.1em] ${fg}`}>
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* COLUMN 3: Non-Technical (Expandable Only) */}
        <div className="flex flex-col p-6 sm:p-8 gap-5">
          <div className="flex items-center gap-3">
            <span className="font-geist text-[8px] font-bold tracking-[0.25em] text-brand-blue">
              05
            </span>
            <span className={`font-geist text-[9px] font-extrabold tracking-[0.2em] uppercase ${fg}`}>
              NON-TECHNICAL SKILLS
            </span>
            <div className={`flex-1 h-px ${isDarkMode ? "bg-white/5" : "bg-black/5"}`} />
          </div>

          <div className="flex flex-col gap-2.5">
            {nonTechSkills.map((skill, idx) => {
              const isOpen = expandedSkill === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  custom={idx + 4}
                  variants={fadeUp}
                  className={`border ${border} ${bgCard} transition-all duration-300 flex flex-col p-3.5`}
                >
                  {/* Clickable Header */}
                  <div
                    onClick={() => toggleSkill(skill.name)}
                    className="flex items-center justify-between cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={skill.iconUrl}
                        alt={skill.name}
                        className="w-4 h-4 object-contain filter drop-shadow-[0_0_1px_rgba(0,51,255,0.4)]"
                      />
                      <span className={`font-geist text-[9px] font-bold tracking-[0.12em] uppercase ${fg} transition-colors group-hover:text-brand-blue`}>
                        {skill.name}
                      </span>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="text-[13px] leading-none select-none font-bold text-brand-blue"
                    >
                      ›
                    </motion.span>
                  </div>

                  {/* Body description */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 10 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className={`font-geist text-[10.5px] leading-relaxed font-light ${isDarkMode ? "text-white/50" : "text-black/50"}`}>
                          {skill.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
