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
type ExperienceEntry = {
  id: string;
  type: "FULL-TIME" | "INTERNSHIP" | "FREELANCE" | "SPEAKER" | "VOLUNTEER";
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  stack?: string[];
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
      "Bergabung dalam Tim Digitalisasi internal PT Menara Terus Makmur (member of Astra Otoparts), perusahaan manufaktur komponen otomotif terkemuka. Bertanggung jawab penuh merancang dan membangun sistem digitalisasi operasional pabrik, dengan fokus utama mengembangkan aplikasi web jembatan timbang (Weighting Truck) untuk otomasi pencatatan logistik secara real-time.",
    stack: ["Next.js", "PostgreSQL", "Prisma ORM", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "exp-02",
    type: "VOLUNTEER",
    role: "IoT Developer — Pengabdian Masyarakat",
    company: "RT 02 / RW 17 Graha Cikarang",
    period: "2025",
    location: "Cikarang, Indonesia · On-site",
    description:
      "Melaksanakan pengabdian masyarakat dengan merancang dan merakit perangkat keras IoT penyiram tanaman otomatis berbasis mikrokontroler ESP32, yang dikoneksikan ke internet secara nirkabel dan terintegrasi dengan dasbor kontrol Blynk untuk pemantauan dan pengelolaan jarak jauh.",
    stack: ["ESP32", "Blynk", "IoT", "C++", "Embedded Systems"],
  },
  {
    id: "exp-03",
    type: "SPEAKER",
    role: "Webinar Speaker — UI/UX Mobile",
    company: "Universitas Pelita Bangsa",
    period: "2024",
    location: "Bekasi, Indonesia · Remote",
    description:
      "Diundang sebagai narasumber webinar dalam kurikulum OBE (Outcome-Based Education) Universitas Pelita Bangsa. Membawakan materi tentang tren terkini, best practices, serta standar UI/UX dalam pengembangan aplikasi mobile — mencakup desain adaptif, aksesibilitas, dan alur kerja modern berbasis Figma.",
    stack: ["UI/UX Design", "Figma", "Mobile Design", "OBE Curriculum"],
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
  const border = isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const fg = isDarkMode ? "#ffffff" : "#050505";
  const fgMuted = isDarkMode ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)";

  return (
    <section
      id="experience"
      className={`relative w-full select-none font-geist ${isDarkMode ? "bg-black" : "bg-[#f4f4f0]"}`}
    >
      {/* ═══ SECTION HEADER ═══ */}
      <div
        className="px-8 md:px-10 py-8 flex items-center gap-6"
        style={{ borderBottom: `1px solid ${border}` }}
      >
        <span
          className="font-geist text-[22px] font-extrabold tracking-[0.25em] uppercase"
          style={{ color: fg }}
        >
          EXPERIENCE
        </span>
        <div className="flex-1 h-px" style={{ background: border }} />
        <span
          className="font-geist text-[9px] font-bold tracking-[0.3em] uppercase"
          style={{ color: fgMuted }}
        >
          {EXPERIENCE.length} ENTRIES
        </span>
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
                          boxShadow: [
                            "0 0 0 0px rgba(255,255,255,0.5)",
                            "0 0 0 6px rgba(255,255,255,0)",
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
                          ? "2px solid rgba(255,255,255,0.75)"
                          : `1px solid ${border}`,
                        boxShadow: item.id === "exp-01"
                          ? "0 0 8px rgba(255,255,255,0.3)"
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
                  <div className="flex-1 min-w-0" style={{ borderBottom: `1px solid ${border}` }}>
                    {/* Header — clickable row */}
                    <div
                      className="flex items-center justify-between gap-4 py-5 cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    >
                      {/* Left info */}
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span
                          className="self-start font-geist text-[7.5px] font-bold tracking-[0.35em] uppercase px-1.5 py-0.5 mb-1"
                          style={{ color: accent, border: `1px solid ${accent}44` }}
                        >
                          {cfg.label}
                        </span>
                        <h3
                          className="font-geist text-[14px] font-extrabold tracking-tight leading-tight"
                          style={{ color: fg }}
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
                            className="font-geist text-[12px] font-bold tracking-[0.1em] uppercase"
                            style={{ color: fgMuted }}
                          >
                            {item.period}
                          </span>
                          {item.location && (
                            <span
                              className="font-geist text-[10px] tracking-[0.05em]"
                              style={{ color: fgMuted }}
                            >
                              {item.location}
                            </span>
                          )}
                        </div>
                        <motion.span
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="font-geist text-[18px] font-light leading-none"
                          style={{ color: fgMuted }}
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
                            className="pb-6"
                            style={{ borderTop: `1px solid ${border}`, paddingTop: "1rem" }}
                          >
                            <p
                              className="font-geist text-[11.5px] leading-relaxed tracking-[0.02em] mb-4"
                              style={{ color: isDarkMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)" }}
                            >
                              {item.description}
                            </p>
                            {item.stack && item.stack.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {item.stack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="font-geist text-[8px] font-bold tracking-[0.2em] uppercase px-2 py-0.5"
                                    style={{ color: fgMuted, border: `1px solid ${border}` }}
                                  >
                                    {tech}
                                  </span>
                                ))}
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
