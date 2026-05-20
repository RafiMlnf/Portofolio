"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";

const contacts = [
  {
    label: "INSTAGRAM",
    handle: "@rafimlnf",
    href: "https://instagram.com/rafimlnf",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "GMAIL",
    handle: "rafimaulanaf03@gmail.com",
    href: "mailto:rafimaulanaf03@gmail.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
      </svg>
    ),
  },
  {
    label: "LINKEDIN",
    handle: "Rafi Maulana Firdaus",
    href: "https://linkedin.com/in/rafimaulanafirdaus",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GITHUB",
    handle: "RafiMlnf",
    href: "https://github.com/RafiMlnf",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "DISCORD",
    handle: "xenithgg",
    href: "https://discord.com/users/xenithgg",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.084.116 18.11.134 18.124a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
      </svg>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Profile({ isDarkMode }: { isDarkMode: boolean }) {
  const [isCvOpen, setIsCvOpen] = React.useState(false);

  const border = isDarkMode ? "border-white" : "border-black";
  const borderFaint = isDarkMode ? "border-white/15" : "border-black/15";
  const fg = isDarkMode ? "text-white" : "text-black";
  const fgMuted = isDarkMode ? "text-white/40" : "text-black/35";
  const bg = isDarkMode ? "bg-black" : "bg-[#f4f4f0]";

  return (
    <section
      id="profile"
      className={`relative w-full px-4 md:px-8 lg:px-10 py-20 md:py-32 select-none overflow-hidden ${bg}`}
    >

      {/* ── SECTION INDEX ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0}
        variants={fadeUp}
        className="flex items-start justify-between mb-16 md:mb-24"
      >
        {/* Left: Giant rotated number */}
        <div className="relative">
          <span
            className={`font-display text-[120px] md:text-[180px] leading-none font-extrabold tracking-tighter select-none ${fgMuted}`}
            style={{ lineHeight: 0.85 }}
          >
            02
          </span>
          <span
            className={`absolute bottom-0 left-0 font-display text-[9px] md:text-[10px] font-bold tracking-[0.35em] uppercase ${fgMuted} mb-1`}
          >
            / PROFILE
          </span>
        </div>

        {/* Right: Diagonal accent lines — abstract decoration */}
        <div className="hidden md:flex flex-col items-end gap-2 pt-4 pr-2">
          {[80, 120, 56, 100, 40].map((w, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: w, originX: 1 }}
              className={`h-px ${i === 2 ? "bg-brand-blue" : isDarkMode ? "bg-white/30" : "bg-black/30"}`}
            />
          ))}
        </div>
      </motion.div>

      {/* ── MAIN BODY ── */}
      <div className="flex flex-col lg:flex-row gap-0">

        {/* ── LEFT COLUMN ── */}
        <div className="flex-1 lg:pr-16 xl:pr-24 flex flex-col gap-0">

          {/* NAME — massive editorial */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
            variants={fadeUp}
            className={`border-t ${borderFaint} pt-8 md:pt-12 pb-10 md:pb-14`}
          >
            <h2
              className={`font-display font-extrabold tracking-tighter ${fg}`}
            >
              <span className="block text-[56px] sm:text-[72px] md:text-[88px] lg:text-[100px] leading-[0.88]">
                r<span style={{ fontFamily: "'Geist', sans-serif" }} className="font-extrabold tracking-tight">afi</span>
              </span>
              <span style={{ fontFamily: "'Geist', sans-serif" }} className={`block text-[32px] sm:text-[40px] md:text-[50px] lg:text-[58px] leading-[1.05] font-bold tracking-tight ${fgMuted}`}>Maulana</span>
              <span style={{ fontFamily: "'Geist', sans-serif" }} className={`block text-[32px] sm:text-[40px] md:text-[50px] lg:text-[58px] leading-[1.05] font-bold tracking-tight ${fgMuted}`}>Firdaus</span>
            </h2>
          </motion.div>

          {/* ROLE TAG ROW */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={2}
            variants={fadeUp}
            className={`border-t ${borderFaint} py-5 flex flex-wrap gap-2`}
          >
            {["DESIGNER", "DEVELOPER", "CREATIVE"].map((tag) => (
              <span
                key={tag}
                className={`font-display text-[9px] sm:text-[10px] font-bold tracking-[0.3em] px-3 py-1.5 border ${tag === "CREATIVE"
                  ? "bg-brand-blue text-white border-brand-blue"
                  : `${border} ${fg}`
                  }`}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* BIO PARAGRAPH */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={3}
            variants={fadeUp}
            className={`border-t ${borderFaint} pt-8 pb-10`}
          >
            {/* Pull quote accent */}
            <div className="flex gap-5 items-start">
              <div className="w-1 flex-shrink-0 self-stretch bg-brand-blue" />
              <p
                style={{ fontFamily: "'Geist', sans-serif" }}
                className={`text-sm sm:text-[15px] md:text-base leading-[1.75] font-light ${isDarkMode ? "text-white/70" : "text-black/65"
                  }`}
              >
                Seorang kreator dengan latar belakang kuat di bidang visual dan pembangunan — graphic design, musik, dan pengembangan produk digital. Berpenalaran tinggi dalam estetika, visual storytelling, dan ideasi konten. Terbiasa menjembatani sisi teknis dan kreatif dalam satu alur kerja yang kohesif.
              </p>
            </div>
          </motion.div>

          {/* CV BUTTON — brutalist */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={4}
            variants={fadeUp}
            className={`border-t ${borderFaint} pt-6`}
          >
            <button
              onClick={() => setIsCvOpen(true)}
              className={`group relative inline-flex items-center gap-4 px-6 py-4 border-2 font-display text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase transition-all duration-200 cursor-pointer overflow-hidden ${isDarkMode
                ? "border-white text-white hover:bg-white hover:text-black"
                : "border-black text-black hover:bg-black hover:text-white"
                }`}
            >
              <span>LIHAT CURRICULUM VITAE</span>
              {/* Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5 19.5 4.5m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0 flex flex-col gap-0 mt-12 lg:mt-0 lg:border-l lg:pl-10 xl:pl-14"
          style={{ borderColor: isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)" }}
        >

          {/* ABSTRACT SHAPE — brutalist art element */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1.5}
            variants={fadeUp}
            className={`border-t ${borderFaint} pt-8 pb-10`}
          >
            <div className="relative w-full aspect-square max-w-[260px] mx-auto lg:mx-0">
              {/* Outer border box */}
              <div className={`absolute inset-0 border-2 ${border}`} />
              {/* Offset inner box */}
              <div
                className="absolute border-2 bg-brand-blue"
                style={{
                  top: "12%", left: "12%",
                  right: "-8%", bottom: "-8%",
                  borderColor: "#0033ff",
                }}
              />
              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className={`px-4 py-3 border-2 ${bg} ${border} text-center`}>
                  <span className={`font-display text-[8px] font-bold tracking-[0.3em] uppercase block ${fgMuted} mb-1`}>EST.</span>
                  <span className={`font-display text-4xl font-extrabold tracking-tighter ${fg}`}>2002</span>
                </div>
              </div>
              {/* Floating label */}
              <div className="absolute -top-3 left-4">
                <span className={`font-display text-[8px] font-bold tracking-[0.3em] uppercase px-2 ${bg} ${fgMuted}`}>
                  BANDUNG, ID
                </span>
              </div>
            </div>
          </motion.div>

          {/* STATS — minimal typographic */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={2.5}
            variants={fadeUp}
            className={`border-t ${borderFaint}`}
          >
            {[
              { val: "3+", desc: "Tahun berkecimpung di dunia desain & kreatif" },
              { val: "15+", desc: "Proyek yang selesai dirampungkan" },
              { val: "∞", desc: "Rasa ingin tahu yang tidak pernah padam" },
            ].map((s, i) => (
              <div
                key={i}
                className={`flex items-baseline gap-4 py-5 border-b ${borderFaint}`}
              >
                <span className={`font-display text-3xl md:text-4xl font-extrabold tracking-tighter text-brand-blue flex-shrink-0 w-16`}>
                  {s.val}
                </span>
                <span
                  style={{ fontFamily: "'Geist', sans-serif" }}
                  className={`text-[11px] sm:text-xs leading-snug ${fgMuted}`}
                >
                  {s.desc}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ── CONTACT STRIP ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={5}
        variants={fadeUp}
        className={`mt-20 md:mt-28 border-t-2 ${border}`}
      >
        <div className="pt-6 pb-2">
          <span className={`font-display text-[9px] font-bold tracking-[0.4em] uppercase ${fgMuted}`}>
            REACH OUT
          </span>
        </div>

        <div className="flex flex-col divide-y"
          style={{ borderColor: isDarkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)" }}
        >
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={6 + i * 0.4}
              variants={fadeUp}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between gap-4 py-4 transition-all duration-150 cursor-pointer`}
            >
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                {/* Index */}
                <span className={`font-display text-[9px] font-bold tracking-widest flex-shrink-0 ${fgMuted}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Label */}
                <span className={`font-display text-xs sm:text-sm font-extrabold tracking-wider uppercase flex-shrink-0 transition-colors duration-150 group-hover:text-brand-blue ${fg} flex items-center gap-2`}>
                  <span className={`transition-colors duration-150 ${fgMuted} group-hover:text-brand-blue`}>
                    {c.icon}
                  </span>
                  {c.label}
                </span>
                {/* Handle */}
                <span
                  style={{ fontFamily: "'Geist', sans-serif" }}
                  className={`text-[11px] sm:text-xs font-light truncate transition-colors duration-150 group-hover:text-brand-blue ${fgMuted} pt-0.5`}
                >
                  {c.handle}
                </span>
              </div>

              {/* Arrow that slides in */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className={`w-3.5 h-3.5 flex-shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-brand-blue`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5 19.5 4.5m0 0H8.25m11.25 0v11.25" />
              </svg>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* ── CV DRAWER ── */}
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
              className={`fixed top-0 right-0 h-screen w-full sm:w-[500px] md:w-[600px] lg:w-[700px] z-[999] border-l-2 shadow-2xl flex flex-col ${isDarkMode
                ? "bg-[#080808] border-white"
                : "bg-[#f4f4f0] border-black"
                }`}
            >
              {/* Drawer header */}
              <div className={`px-5 py-4 border-b-2 flex items-center justify-between ${isDarkMode ? "border-white/20" : "border-black/20"}`}>
                <span className={`font-display text-[9px] font-bold tracking-[0.35em] uppercase ${fgMuted}`}>
                  CURRICULUM VITAE — RAFI MAULANA FIRDAUS
                </span>
                <button
                  onClick={() => setIsCvOpen(false)}
                  className={`font-display text-[9px] font-bold tracking-widest uppercase px-3 py-2 border transition-all duration-150 cursor-pointer ${isDarkMode
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

    </section>
  );
}
