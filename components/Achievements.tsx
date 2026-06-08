"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const IoTIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className}>
    {/* Microchip frame */}
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" strokeLinecap="round" />
    {/* Leaf / Sprout */}
    <path d="M12 9c-1.5 2-2.5 3.5-2.5 4.5a2.5 2.5 0 0 0 5 0c0-1-1-2.5-2.5-4.5z" fill="currentColor" opacity="0.15" />
    <path d="M12 9c-1.5 2-2.5 3.5-2.5 4.5a2.5 2.5 0 0 0 5 0c0-1-1-2.5-2.5-4.5z" />
  </svg>
);

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const lineGrow = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ─── Experience Data ─── */
type SubProject = {
  name: string;
  description: string;
  stack?: string[];
};

type ExperienceEntry = {
  id: string;
  type: "FULL-TIME" | "INTERNSHIP" | "FREELANCE" | "SPEAKER" | "VOLUNTEER";
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  stack?: string[];
  images?: string[];
  subProjects?: SubProject[];
};



const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "exp-01",
    type: "INTERNSHIP",
    role: "Full Stack Web Developer",
    company: "PT Menara Terus Makmur (Astra Otoparts Group)",
    period: "Mei 2026 – Sekarang",
    location: "Bekasi, Indonesia · On-site",
    description:
      "Bergabung dalam Tim Digitalisasi internal PT Menara Terus Makmur (member of Astra Otoparts), perusahaan manufaktur komponen otomotif terkemuka. Bertanggung jawab penuh merancang dan membangun sistem digitalisasi operasional pabrik.",
    stack: ["Next.js", "PostgreSQL", "Prisma ORM", "Tailwind CSS", "TypeScript"],
    images: ["", "", ""],
    subProjects: [
      {
        name: "WEIGHTING TRUCK",
        description: "Sistem jembatan timbang (weighbridge) truk logistik PT Menara Terus Makmur (Astra Otoparts Group) untuk pencatatan otomatis berat gross, tare, dan net terintegrasi database PostgreSQL.",
        stack: ["Next.js", "PostgreSQL", "Prisma ORM", "TypeScript", "Tailwind CSS", "NextAuth.js"],
      },
      {
        name: "DOV",
        description: "Sistem monitoring performa logistik vendor (KPI & DO Generator) dengan custom SVG charting engine dan pemrosesan data spreadsheet Excel SAP untuk mengotomatiskan kalkulasi KPI dari data SAP secara real-time.",
        stack: ["Next.js", "NestJS (v11)", "TypeScript", "PostgreSQL", "Prisma Client", "Tailwind CSS", "Custom SVG Chart", "Excel Parser"],
      },
      {
        name: "MPS",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sunt in culpa qui officia deserunt mollit anim id est laborum. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        stack: ["Next.js", "PostgreSQL", "TypeScript"],
      },
    ],
  },
  {
    id: "exp-02",
    type: "VOLUNTEER",
    role: "IoT Developer - Kuliah Kerja Praktek",
    company: "RT 02 / RW 17 Graha Cikarang",
    period: "2025",
    location: "Cikarang, Indonesia · On-site",
    description:
      "Melaksanakan pengabdian masyarakat dengan merancang dan merakit perangkat keras IoT penyiram tanaman otomatis berbasis mikrokontroler ESP32, yang dikoneksikan ke internet secara nirkabel dan terintegrasi dengan dasbor kontrol Blynk untuk pemantauan dan pengelolaan jarak jauh.",
    stack: ["ESP32", "Blynk", "IoT"],
    images: ["", "", ""],
  },
  {
    id: "exp-03",
    type: "SPEAKER",
    role: "Webinar Speaker - UI/UX Mobile",
    company: "Universitas Pelita Bangsa",
    period: "19 Desember 2024",
    location: "Bekasi, Indonesia · Remote",
    description:
      "Diundang sebagai narasumber webinar dalam kurikulum OBE (Outcome-Based Education) Universitas Pelita Bangsa. Membawakan materi tentang tren terkini, best practices, serta standar UI/UX dalam pengembangan aplikasi mobile — mencakup desain adaptif, aksesibilitas, dan alur kerja modern berbasis Figma.",
    stack: ["UI/UX Design", "Figma", "Mobile Design", "Android Studio"],
    images: ["/assets/img/experiences/webinar/IM3G-20241216-WA0007.jpg", "", ""],
  },
];

const TYPE_CONFIG: Record<
  ExperienceEntry["type"],
  { label: string; accent: string; accentDark: string; dotBg: string; dotBgDark: string }
> = {
  SPEAKER: {
    label: "SPEAKER",
    accent: "#404040",
    accentDark: "#a3a3a3",
    dotBg: "#525252",
    dotBgDark: "#a3a3a3",
  },
  INTERNSHIP: {
    label: "INTERNSHIP",
    accent: "#404040",
    accentDark: "#a3a3a3",
    dotBg: "#525252",
    dotBgDark: "#a3a3a3",
  },
  "FULL-TIME": {
    label: "FULL-TIME",
    accent: "#404040",
    accentDark: "#a3a3a3",
    dotBg: "#525252",
    dotBgDark: "#a3a3a3",
  },
  FREELANCE: {
    label: "FREELANCE",
    accent: "#404040",
    accentDark: "#a3a3a3",
    dotBg: "#525252",
    dotBgDark: "#a3a3a3",
  },
  VOLUNTEER: {
    label: "VOLUNTEER",
    accent: "#404040",
    accentDark: "#a3a3a3",
    dotBg: "#525252",
    dotBgDark: "#a3a3a3",
  },
};



export default function Achievements({ isDarkMode }: { isDarkMode: boolean }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const border = isDarkMode ? "border-white/[0.08]" : "border-black/[0.08]";
  const fg = isDarkMode ? "text-white" : "text-black";
  const fgMuted = isDarkMode ? "text-white/[0.38]" : "text-black/[0.38]";

  return (
    <section
      id="experience"
      className={`relative w-full select-none font-geist ${isDarkMode ? "bg-black" : "bg-[#f4f4f0]"}`}
    >
      {/* ═══ SECTION HEADER ═══ */}
      <div className={`px-8 md:px-10 py-8 flex items-center gap-6 border-b ${border}`}>
        <span
          className={`font-geist text-[22px] font-extrabold tracking-[0.25em] uppercase ${fg}`}
        >
          EXPERIENCE
        </span>
        <div className={`flex-1 h-px ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"}`} />
       </div>

      {/* ═══ TIMELINE ═══ */}
      <div className="px-8 md:px-10 py-10 md:py-14">
        <div className="relative max-w-3xl">
          {/* Vertical spine line */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={lineGrow}
            className="absolute left-[31px] top-0 bottom-0 w-[1px] origin-top"
            style={{ background: `linear-gradient(to bottom, ${isDarkMode ? "#ffffff22" : "#00000018"}, transparent)` }}
          />

          <div className="flex flex-col">
            {EXPERIENCE.map((item, i) => {
              const cfg = TYPE_CONFIG[item.type];
              const accent = isDarkMode ? cfg.accentDark : cfg.accent;
              const dotColor = isDarkMode ? cfg.dotBgDark : cfg.dotBg;
              const isExpanded = expandedId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="relative flex gap-5"
                >
                  {/* ── Left: logo/icon ── */}
                  <div className="relative flex-shrink-0 flex flex-col items-center" style={{ width: 64, paddingTop: 17 }}>
                    {/* Outer pulse ring — only for active MTM entry */}
                    {item.id === "exp-01" && (
                      <motion.div
                        className="absolute z-0 rounded-full"
                        animate={{
                          boxShadow: isDarkMode
                            ? [
                                "0 0 0 0px rgba(255,255,255,0.5)",
                                "0 0 0 6px rgba(255,255,255,0)",
                              ]
                            : [
                                "0 0 0 0px rgba(0,51,255,0.85)",
                                "0 0 0 6px rgba(0,51,255,0)",
                              ],
                        }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                        style={{ width: 56, height: 56 }}
                      />
                    )}
                    {/* Scale-in entrance wrapper */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1, type: "spring", stiffness: 200, damping: 18 }}
                      className="relative z-10 rounded-full flex items-center justify-center overflow-hidden"
                      style={{
                        width: 56,
                        height: 56,
                        background: isDarkMode ? "#171717" : "#ffffff",
                        border: item.id === "exp-01"
                          ? (isDarkMode ? "2px solid rgba(255,255,255,0.75)" : "1px solid #0033ff")
                          : `1px solid ${border}`,
                        boxShadow: item.id === "exp-01"
                          ? (isDarkMode ? "0 0 8px rgba(255,255,255,0.3)" : "none")
                          : `0 0 0 3px ${isDarkMode ? "#000000" : "#f4f4f0"}`,
                      }}
                    >
                      {/* MTM Logo */}
                      {item.id === "exp-01" && (
                        <div className="relative w-9 h-9">
                          <Image
                            src="/assets/img/mtm.png"
                            alt="MTM Logo"
                            fill
                            sizes="36px"
                            className="object-contain"
                          />
                        </div>
                      )}
                      {/* IoT Icon */}
                      {item.id === "exp-02" && (
                        <div className={isDarkMode ? "text-neutral-300" : "text-neutral-700"}>
                          <IoTIcon className="w-7 h-7" />
                        </div>
                      )}
                      {/* UPB Logo */}
                      {item.id === "exp-03" && (
                        <div className="relative w-9 h-9">
                          <Image
                            src="/assets/img/upb.png"
                            alt="UPB Logo"
                            fill
                            sizes="36px"
                            className="object-contain"
                          />
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* ── Right: content ── */}
                  <div className={`flex-1 min-w-0 border-b ${border}`}>
                    {/* Header — clickable row */}
                    <div
                      className="flex items-center justify-between gap-4 py-5 cursor-pointer"
                      onClick={() => {
                        setExpandedId(isExpanded ? null : item.id);
                        setZoomedImage(null);
                      }}
                    >
                      {/* Left info */}
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span
                          className={`self-start font-geist text-[7.5px] font-bold tracking-[0.35em] uppercase px-1.5 py-0.5 mb-1`}
                          style={{ color: accent, border: `1px solid ${accent}44` }}
                        >
                          {cfg.label}
                        </span>
                        <h3
                          className={`font-geist text-[14px] font-extrabold tracking-tight leading-tight ${fg}`}
                        >
                          {item.role}
                        </h3>
                        <span
                          className="font-geist text-[11px] font-medium tracking-[0.03em]"
                          style={{ color: accent }}
                        >
                          {item.company}
                        </span>
                      </div>

                      {/* Right: meta + chevron */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`font-geist text-[12px] font-bold tracking-[0.1em] uppercase ${fgMuted}`}
                          >
                            {item.period}
                          </span>
                          {item.location && (
                            <span
                              className={`font-geist text-[10px] tracking-[0.05em] ${fgMuted}`}
                            >
                              {item.location}
                            </span>
                          )}
                        </div>
                        <motion.span
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className={`font-geist text-[18px] font-light leading-none ${fgMuted}`}
                        >
                          ›
                        </motion.span>
                      </div>
                    </div>

                    {/* Expandable body */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div
                            className={`pb-6 pt-4 border-t ${border}`}
                          >
                            <p
                              className={`font-geist text-[11.5px] leading-relaxed tracking-[0.02em] mb-4 ${isDarkMode ? "text-white/55" : "text-black/50"}`}
                            >
                              {item.description}
                            </p>
                            {/* Gallery of photos */}
                            {item.images && item.images.filter(img => img.trim() !== "").length > 0 && (
                              <div className={`grid gap-3 mt-5 items-start ${
                                item.images.filter(img => img.trim() !== "").length === 1
                                  ? "grid-cols-1"
                                  : item.images.filter(img => img.trim() !== "").length === 2
                                    ? "grid-cols-2"
                                    : "grid-cols-3"
                              }`}>
                                {item.images
                                  .filter(img => img.trim() !== "")
                                  .map((imageUrl, idx) => {
                                    const isZoomed = zoomedImage === imageUrl;
                                    return (
                                      <motion.div
                                        layout
                                        key={idx}
                                        onClick={() => setZoomedImage(isZoomed ? null : imageUrl)}
                                        className={`relative border group cursor-pointer transition-all duration-300 overflow-hidden self-start ${
                                          isZoomed
                                            ? "border-brand-blue w-full max-w-[400px]"
                                            : "w-full max-w-[200px] aspect-video"
                                        } ${
                                          isDarkMode 
                                            ? "border-white/10 hover:border-white/20 bg-white/[0.02]" 
                                            : "border-black/10 hover:border-black/20 bg-black/[0.02]"
                                        }`}
                                      >
                                        <motion.img
                                          layout="position"
                                          src={imageUrl}
                                          alt={`${item.role} gallery image ${idx + 1}`}
                                          className={`w-full block transition-transform duration-300 ${
                                            isZoomed
                                              ? "h-auto object-contain"
                                              : "h-full object-cover aspect-video group-hover:scale-105"
                                          }`}
                                        />
                                        <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 text-[8px] font-mono text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                          {isZoomed ? "CLICK TO COLLAPSE" : "CLICK TO EXPAND"}
                                        </div>
                                      </motion.div>
                                    );
                                  })}
                              </div>
                            )}

                            {/* Sub-projects grid for MTM */}
                            {item.subProjects && item.subProjects.length > 0 && (
                              <div className={`mt-6 flex flex-col border-t pt-5 gap-4 ${border}`}>
                                <span className={`font-geist text-[8px] font-bold tracking-[0.35em] uppercase ${fgMuted}`}>
                                  PROJECT SCOPE
                                </span>
                                <div className="flex flex-col gap-3">
                                  {item.subProjects.map((sub, si) => (
                                    <div
                                      key={sub.name}
                                      className={`flex flex-col gap-2 p-4 border ${isDarkMode ? "border-white/[0.07] bg-white/[0.02]" : "border-black/[0.07] bg-black/[0.02]"}`}
                                    >
                                      {/* Sub-project header */}
                                      <div className="flex items-center gap-3">
                                        <span className={`font-geist text-[8px] font-bold tracking-[0.15em] uppercase ${isDarkMode ? "text-white/30" : "text-black/25"}`}>
                                          {String(si + 1).padStart(2, "0")}
                                        </span>
                                        <div className="w-3 h-px bg-brand-blue" />
                                        <span className={`font-geist text-[10px] font-bold tracking-[0.2em] uppercase ${isDarkMode ? "text-white/80" : "text-black/75"}`}>
                                          {sub.name}
                                        </span>
                                      </div>
                                      {/* Description */}
                                      <p className={`font-geist text-[11px] leading-relaxed font-light ${isDarkMode ? "text-white/50" : "text-black/45"}`}>
                                        {sub.description}
                                      </p>
                                      {/* Stack tags */}
                                      {sub.stack && sub.stack.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                          {sub.stack.map((t) => (
                                            <span
                                              key={t}
                                              className={`font-geist text-[7px] font-bold tracking-[0.2em] uppercase px-1.5 py-0.5 border ${border} ${fgMuted}`}
                                            >
                                              {t}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
