"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ─── Data ─── */
const tags = ["DESIGNER", "DEVELOPER", "CREATIVE"];

const quickStats = [
  { val: "3+", label: "YRS EXP" },
  { val: "15+", label: "PROJECTS" },
  { val: "∞", label: "CURIOSITY" },
];


/* ─── Bottom Bar Buttons ─── */
const barActions = [
  {
    id: "cv",
    label: "LIHAT CV",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5 19.5 4.5m0 0H8.25m11.25 0v11.25" />
      </svg>
    ),
  },
  {
    id: "music",
    label: "SETEL MUSIK",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 10l12-3M9 14a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GITHUB",
    href: "https://github.com/RafiMlnf",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "INSTAGRAM",
    href: "https://instagram.com/rafimlnf",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: "scroll-down",
    label: "NEXT SECTION",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    ),
  },
];

/* ─── Component ─── */
export default function Profile({ isDarkMode }: { isDarkMode: boolean }) {
  const [isCvOpen, setIsCvOpen] = React.useState(false);

  const border = isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const fg = isDarkMode ? "text-white" : "text-black";
  const fgMuted = isDarkMode ? "text-white/40" : "text-black/35";
  const bgSection = isDarkMode ? "bg-black" : "bg-[#f4f4f0]";

  const handleBarAction = (id: string, href?: string) => {
    if (id === "cv") { setIsCvOpen(true); return; }
    if (id === "music") {
      window.dispatchEvent(new CustomEvent("toggle-music-player"));
      return;
    }
    if (id === "scroll-down") {
      document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <section
        id="profile"
        className={`relative w-full select-none overflow-hidden ${bgSection}`}
        style={{
          height: "calc(100vh - 57px)", // exact viewport minus navbar
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ═══ MAIN 3-COLUMN GRID ═══ */}
        <div
          className="flex flex-1 overflow-hidden"
          style={{ minHeight: 0 }}
        >

          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-between px-8 py-10 flex-shrink-0"
            style={{
              width: "360px",
              borderRight: `1px solid ${border}`,
            }}
          >
            {/* Section tag */}
            <motion.div custom={0} variants={fadeUp} className="flex items-center gap-2.5">
              <span className={`font-display text-[14px] font-extrabold tracking-[0.3em] uppercase ${fg}`}>PROFILE</span>
            </motion.div>

            {/* Name */}
            <div className="flex flex-col gap-1">
              <motion.div custom={1} variants={fadeUp}>
                <span className={`font-display block text-[11px] font-bold tracking-[0.4em] uppercase mb-4 ${fgMuted}`}>
                  BANDUNG, INDONESIA
                </span>
              </motion.div>

              <motion.h2
                custom={2}
                variants={fadeUp}
                className={`font-geist font-extrabold tracking-tighter leading-none ${fg}`}
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                <span className="block" style={{ fontSize: "clamp(48px, 4.8vw, 76px)", lineHeight: 0.9 }}>
                  Rafi
                </span>
                <span
                  className={`block font-medium tracking-normal mt-2 ${fgMuted}`}
                  style={{ fontSize: "clamp(15px, 1.5vw, 21px)", lineHeight: 1.25 }}
                >
                  Maulana Firdaus
                </span>
              </motion.h2>
            </div>

            {/* Bio */}
            <motion.div custom={3} variants={fadeUp} className="flex gap-3 items-start">
              <div className="w-[2px] flex-shrink-0 self-stretch bg-brand-blue mt-1" />
              <p
                className={`text-[13px] leading-[1.75] font-light ${isDarkMode ? "text-white/55" : "text-black/55"}`}
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                Kreator dengan latar belakang kuat di bidang visual dan pembangunan — graphic design, musik, dan pengembangan digital.
              </p>
            </motion.div>

            {/* Role tags */}
            <motion.div custom={4} variants={fadeUp} className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`font-display text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 border ${
                    isDarkMode
                      ? "border-white/15 text-white/50"
                      : "border-black/15 text-black/45"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Quick stats */}
            <motion.div custom={5} variants={fadeUp} className="flex gap-6">
              {quickStats.map((s) => (
                <div key={s.val} className="flex flex-col gap-0.5">
                  <span className="font-display text-[28px] font-extrabold tracking-tighter text-brand-blue leading-none">
                    {s.val}
                  </span>
                  <span className={`font-display text-[8px] font-bold tracking-[0.22em] uppercase ${fgMuted}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── CENTER COLUMN — Photo ── */}
          <div
            className="flex-1 relative flex items-end justify-center overflow-hidden"
            style={{ minWidth: 0 }}
          >
            {/* Subtle grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: isDarkMode
                  ? "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"
                  : "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            {/* Photo — sits at bottom, bleeds to edges */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeIn}
              className="relative w-full flex justify-center"
              style={{ height: "90%" }}
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop&crop=face"
                alt="rAFI mAULANA fIRDAUS"
                className="h-full object-cover object-top"
                style={{
                  maxWidth: "340px",
                  width: "100%",
                  filter: isDarkMode ? "grayscale(0.15)" : "grayscale(0.05)",
                  maskImage: "linear-gradient(to top, transparent 0%, black 18%, black 100%)",
                  WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 18%, black 100%)",
                }}
              />

              {/* Center cross-hair accent */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
                <span className={`font-display text-[8px] font-bold tracking-[0.4em] uppercase ${fgMuted}`}>
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-between px-8 py-10 flex-shrink-0 items-end text-right"
            style={{
              width: "300px",
              borderLeft: `1px solid ${border}`,
            }}
          >
            {/* Availability badge */}
            <motion.div custom={0.5} variants={fadeUp} className="flex items-center gap-2 flex-row-reverse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span className={`font-display text-[9px] font-bold tracking-[0.25em] uppercase ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                CONSIDERING INTERESTING OFFERS
              </span>
            </motion.div>

            {/* Current status */}
            <motion.div custom={1.5} variants={fadeUp} className="flex flex-col gap-3 items-end">
              <span className={`font-display text-[9px] font-bold tracking-[0.35em] uppercase ${fgMuted}`}>
                CURRENTLY
              </span>
              <div className="flex flex-col gap-2 items-end">
                <div className="flex flex-col gap-0.5 items-end">
                  <span className={`font-display text-[10px] font-bold tracking-[0.15em] uppercase ${isDarkMode ? "text-white/80" : "text-black/75"}`}>
                    Full Stack Web Developer
                  </span>
                  <span
                    className={`text-[11px] leading-[1.5] font-light text-right ${isDarkMode ? "text-white/50" : "text-black/45"}`}
                    style={{ fontFamily: "'Geist', sans-serif" }}
                  >
                    Magang @ PT Menara Terus Makmur
                  </span>
                  <span
                    className={`font-display text-[8px] font-bold tracking-[0.25em] uppercase ${fgMuted}`}
                  >
                    Cikarang, Jawa Barat
                  </span>
                </div>
                <div className={`w-full h-px ${isDarkMode ? "bg-white/8" : "bg-black/8"}`} />
                <div className="flex flex-col gap-0.5 items-end">
                  <span className={`font-display text-[10px] font-bold tracking-[0.15em] uppercase ${isDarkMode ? "text-white/80" : "text-black/75"}`}>
                    Mahasiswa Semester Akhir
                  </span>
                  <span
                    className={`text-[11px] leading-[1.5] font-light text-right ${isDarkMode ? "text-white/50" : "text-black/45"}`}
                    style={{ fontFamily: "'Geist', sans-serif" }}
                  >
                    Sedang menyusun skripsi
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div custom={2.5} variants={fadeUp} className="flex flex-col gap-3 items-end">
              <span className={`font-display text-[9px] font-bold tracking-[0.35em] uppercase ${fgMuted}`}>
                PASSION
              </span>
              <div className="flex flex-col gap-1.5 items-end">
                {[
                  { label: "UI / UX Design", icon: "✦" },
                  { label: "Music Production", icon: "✦" },
                  { label: "Visual Storytelling", icon: "✦" },
                  { label: "Open Source", icon: "✦" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 flex-row-reverse">
                    <span className="text-brand-blue text-[8px] flex-shrink-0">{item.icon}</span>
                    <span
                      className={`text-[12px] font-light ${isDarkMode ? "text-white/55" : "text-black/55"}`}
                      style={{ fontFamily: "'Geist', sans-serif" }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Open to collab */}
            <motion.div custom={3.5} variants={fadeUp} className="flex flex-col gap-3 items-end">
              <span className={`font-display text-[9px] font-bold tracking-[0.35em] uppercase ${fgMuted}`}>
                OPEN TO
              </span>
              <div className="flex flex-col gap-1.5 items-end">
                {["Freelance", "Collaboration", "Full-time"].map((item) => (
                  <div key={item} className="flex items-center gap-2 flex-row-reverse">
                    <span className="w-1 h-1 rounded-full bg-brand-blue flex-shrink-0" />
                    <span
                      className={`text-[12px] font-light ${isDarkMode ? "text-white/55" : "text-black/55"}`}
                      style={{ fontFamily: "'Geist', sans-serif" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Index */}
            <motion.div custom={4.5} variants={fadeUp}>
              <span className={`font-display text-[9px] font-bold tracking-[0.35em] uppercase ${fgMuted}`}>
                RMF — 2026
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ═══ FLOATING BOTTOM BAR ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 px-8 pb-6 pt-0"
        >
          <div
            className={`flex items-center gap-0 overflow-hidden ${isDarkMode ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/10"}`}
            style={{ backdropFilter: "blur(12px)" }}
          >
            {/* Left accent */}
            <div className="w-1 self-stretch bg-brand-blue flex-shrink-0" />

            <div className="flex items-center flex-1">
              {barActions.map((action, i) => (
                <button
                  key={action.id}
                  onClick={() => handleBarAction(action.id, action.href)}
                  className={`group flex items-center gap-2.5 px-5 py-3.5 font-display text-[9px] font-bold tracking-[0.22em] uppercase transition-all duration-200 whitespace-nowrap flex-1 justify-center ${
                    isDarkMode
                      ? "text-white/50 hover:text-white hover:bg-white/8"
                      : "text-black/45 hover:text-black hover:bg-black/8"
                  } ${i === 0 ? "hover:text-brand-blue" : ""}`}
                  style={{
                    borderRight: i < barActions.length - 1 ? `1px solid ${border}` : "none",
                  }}
                >
                  <span className={`transition-colors duration-200 ${i === 0 ? "text-brand-blue" : isDarkMode ? "text-white/30 group-hover:text-white/70" : "text-black/25 group-hover:text-black/60"}`}>
                    {action.icon}
                  </span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ BEYOND TECHNICAL ═══ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full ${bgSection}`}
        style={{ borderTop: `1px solid ${border}` }}
      >
        {/* Header row */}
        <div
          className="px-8 md:px-10 py-6 flex items-center gap-6"
          style={{ borderBottom: `1px solid ${border}` }}
        >
          <span className={`font-geist text-[9px] font-bold tracking-[0.35em] uppercase ${fg}`}>
            Beyond Technical
          </span>
          <div className="flex-1 h-px" style={{ background: border }} />
          <span className={`font-geist text-[8px] tracking-[0.2em] uppercase ${isDarkMode ? "text-white/25" : "text-black/25"}`}>
            soft skills · character
          </span>
        </div>

        {/* Two-column content */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderBottom: `1px solid ${border}` }}>
          {/* Left */}
          <div
            className="px-8 md:px-10 py-10"
            style={{ borderBottom: `1px solid ${border}`, borderRight: `0px` }}
          >
            <p className={`font-geist text-[13px] leading-[1.85] font-light ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
              Saya tipe yang lebih banyak diam. Bukan berarti tidak ada yang mau disampaikan — lebih ke saya lebih suka mengamati dulu, baca situasi, pahami polanya, baru bicara kalau memang perlu. Orang yang baru kenal saya mungkin butuh waktu lebih untuk benar-benar tahu saya seperti apa, dan itu tidak masalah. Saya tidak berusaha membuat diri sulit dipahami — memang begitu adanya.
            </p>
            <p className={`font-geist text-[13px] leading-[1.85] font-light mt-5 ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
              Ada satu momen yang cukup berkesan — diminta jadi speaker webinar di salah satu universitas. Buat orang lain mungkin biasa, tapi buat saya yang cenderung diam, itu semacam pembuktian kecil. Ternyata kalau memang situasinya mengharuskan saya hadir penuh, saya bisa melakukannya.
            </p>
          </div>

          {/* Right */}
          <div
            className="px-8 md:px-10 py-10"
            style={{ borderLeft: `1px solid ${border}` }}
          >
            <p className={`font-geist text-[13px] leading-[1.85] font-light ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
              Ekspresi saya biasanya keluar lewat visual — desain jadi semacam bahasa lain buat saya. Untuk musik, saya lebih ke pendengar yang serius; cari makna di balik lirik, pergi ke konser, duduk sendiri sambil dengerin album dari awal sampai akhir. Buat saya musik bukan sekadar latar, ada sesuatu yang lebih dalam di sana.
            </p>
            <p className={`font-geist text-[13px] leading-[1.85] font-light mt-5 ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
              Soal skill non-teknis — saya tidak terlalu yakin dengan daftar yang saya buat sendiri, tapi orang-orang di sekitar saya bilang saya bisa menenangkan situasi yang mulai kacau, dan saya tidak panik mudah. Mungkin itu yang dimaksud EQ. Entahlah, saya juga masih belajar mengenal diri sendiri.
            </p>
            <div className="flex flex-wrap gap-2 mt-7">
              {[
                "Analytical Thinker",
                "High EQ",
                "Calm Under Pressure",
                "Observant",
                "Low-profile",
                "Visual & Musical",
              ].map((trait) => (
                <span
                  key={trait}
                  className={`font-geist text-[7.5px] font-bold tracking-[0.3em] uppercase px-2.5 py-1.5 border ${
                    isDarkMode
                      ? "border-white/10 text-white/35"
                      : "border-black/10 text-black/30"
                  }`}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══ CV DRAWER ═══ */}
      <AnimatePresence>
        {isCvOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsCvOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[998] cursor-pointer"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed top-0 right-0 h-screen w-full sm:w-[500px] md:w-[620px] z-[999] border-l-2 shadow-2xl flex flex-col ${
                isDarkMode ? "bg-[#080808] border-white" : "bg-[#f4f4f0] border-black"
              }`}
            >
              <div
                className="px-5 py-4 flex items-center justify-between flex-shrink-0"
                style={{ borderBottom: `1px solid ${border}` }}
              >
                <span className={`font-display text-[9px] font-bold tracking-[0.35em] uppercase ${fgMuted}`}>
                  CURRICULUM VITAE — RAFI MAULANA FIRDAUS
                </span>
                <button
                  onClick={() => setIsCvOpen(false)}
                  className={`font-display text-[9px] font-bold tracking-widest uppercase px-3 py-2 border transition-all duration-150 cursor-pointer ${
                    isDarkMode
                      ? "border-white/30 text-white hover:bg-white hover:text-black"
                      : "border-black/30 text-black hover:bg-black hover:text-white"
                  }`}
                >
                  TUTUP ×
                </button>
              </div>
              <div className="flex-1 w-full overflow-hidden">
                <iframe
                  src="/cv.pdf#view=FitH&toolbar=0"
                  className="w-full h-full border-none"
                  title="CV PDF"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
