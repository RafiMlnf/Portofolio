import React from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

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
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.084.116 18.11.134 18.124a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "3+", label: "YEARS EXP" },
  { value: "15+", label: "PROJECTS" },
  { value: "5+", label: "TECH STACK" },
];

export default function Profile({ isDarkMode }: { isDarkMode: boolean }) {
  const [isCvHovered, setIsCvHovered] = React.useState(false);
  const [isCvOpen, setIsCvOpen] = React.useState(false);

  const sectionRef = React.useRef<HTMLElement>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section ref={sectionRef} id="profile" className="relative w-full px-4 md:px-8 lg:px-10 py-16 md:py-28 select-none overflow-hidden">

      {/* Background Y2K Grid Pattern */}
      <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${
        isDarkMode ? "text-white" : "text-black"
      }`}>
        <svg width="100%" height="100%">
          <pattern id="profile-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#profile-grid)" />
        </svg>
      </div>

      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0}
        variants={fadeUp}
        className="mb-12 md:mb-20"
      >
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-brand-blue uppercase">
          02 / PROFILE
        </h2>
      </motion.div>

      {/* === BENTO GRID === */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 w-full">

        {/* CARD 1: Profile Image — spans 5 cols */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={1}
          variants={fadeUp}
          className={`lg:col-span-5 relative group overflow-hidden border transition-colors duration-300 ${
            isDarkMode ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-black/[0.01]"
          }`}
        >
          <div className="aspect-[4/5] w-full overflow-hidden relative flex flex-col justify-center items-center p-6 select-none">
            {/* Y2K Grid Background inside card */}
            <div className={`absolute inset-0 opacity-10 ${isDarkMode ? "bg-white/[0.01]" : "bg-black/[0.01]"}`}>
              <svg width="100%" height="100%">
                <pattern id="card-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#card-grid)" />
              </svg>
            </div>

            {/* Futuristic Vector Starburst Logo */}
            <div className="relative w-40 h-40 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out mb-16">
              {/* Outer HUD ring */}
              <svg className={`absolute w-full h-full animate-[spin_12s_linear_infinite] ${isDarkMode ? "text-white/20" : "text-black/20"}`} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3, 5" />
                <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="0.25" />
              </svg>
              
              {/* Inner tech ring */}
              <svg className={`absolute w-5/6 h-5/6 animate-[spin_8s_linear_infinite_reverse] ${isDarkMode ? "text-brand-blue/30" : "text-brand-blue/30"}`} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="15, 8" />
              </svg>

              {/* The iconic Y2K 4-Point Star logo mark */}
              <svg 
                className="w-24 h-24 text-brand-blue drop-shadow-[0_0_15px_rgba(0,51,255,0.6)] animate-pulse" 
                viewBox="0 0 100 100" 
                fill="currentColor"
              >
                <path d="M50 0 C50 35, 35 50, 0 50 C35 50, 50 65, 50 100 C50 65, 65 50, 100 50 C65 50, 50 35, 50 0 Z" />
              </svg>
            </div>

            {/* Bottom overlay info */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 border-t border-dashed border-neutral-800/10">
              <p className="font-display text-[8px] sm:text-[9px] font-bold tracking-[0.3em] text-brand-blue mb-2">
                // BRAND MARK
              </p>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tighter leading-[0.9] uppercase">
                RAFI<br />
                <span className="opacity-50">MAULANA</span><br />
                <span className="opacity-50">FIRDAUS</span>
              </h3>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN — spans 7 cols, stacked vertically */}
        <div className="lg:col-span-7 flex flex-col gap-4 md:gap-5">

          {/* CARD 2: About Me Description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={2}
            variants={fadeUp}
            className="relative overflow-hidden"
          >
            {/* Y2K Spinning Globe floating in background */}
            <div className={`absolute top-4 right-4 opacity-10 pointer-events-none transition-opacity duration-300 ${
              isDarkMode ? "text-white" : "text-black"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-20 h-20 animate-[spin_25s_linear_infinite]">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20M3 6h18M3 18h18" />
              </svg>
            </div>

            <div className={`p-6 md:p-8 border transition-colors duration-300 relative z-10 ${
              isDarkMode ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-black/[0.01]"
            }`}>
              <span className="font-display text-[8px] sm:text-[9px] font-bold tracking-[0.3em] text-brand-blue block mb-4">
                // ABOUT ME
              </span>
              <p
                style={{ fontFamily: "'Geist', sans-serif" }}
                className={`text-sm sm:text-[15px] font-light leading-relaxed text-justify ${
                  isDarkMode ? "text-white/75" : "text-black/70"
                }`}
              >
                Seorang software developer dengan latar belakang kuat di bidang kreatif-teknis, mencakup graphic design, musik, dan programming/development. Memiliki kemampuan penalaran visual yang tinggi serta ketertarikan mendalam pada visual storytelling dan estetika, yang tercermin dari pengalaman dalam ideasi konten video dan kepekaan terhadap desain. Terbiasa bekerja dalam lingkungan kolaboratif dan adaptif, dengan kapasitas untuk menjembatani sisi teknis dan kreatif dalam sebuah proyek.
              </p>
            </div>
            {/* Blue accent bar */}
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue" />
          </motion.div>

          {/* CARD 3: Stats Row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={3}
            variants={fadeUp}
            className="grid grid-cols-3 gap-4 md:gap-5"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`p-4 md:p-6 border text-center transition-all duration-300 group hover:bg-brand-blue hover:border-brand-blue ${
                  isDarkMode
                    ? "border-white/10 bg-white/[0.02]"
                    : "border-black/10 bg-black/[0.01]"
                }`}
              >
                <span className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tighter text-brand-blue group-hover:text-white transition-colors duration-300">
                  {stat.value}
                </span>
                <p className={`font-display text-[7px] sm:text-[8px] font-bold tracking-[0.2em] mt-2 transition-colors duration-300 group-hover:text-white/80 ${
                  isDarkMode ? "text-white/40" : "text-black/40"
                }`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CARD 4: CV Button — large accent card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={4}
            variants={fadeUp}
            className="relative"
          >
            {/* Floating Chat Bubble */}
            <AnimatePresence>
              {isCvHovered && (
                <motion.div
                  initial={{ scale: 0, y: 10, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0, y: 10, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className={`absolute bottom-full left-6 mb-3 z-20 bg-brand-blue text-white text-[8px] md:text-[9px] font-display font-extrabold tracking-wider border whitespace-nowrap uppercase px-3 py-1.5 ${
                    isDarkMode ? "border-white shadow-[2px_2px_0px_#fff]" : "border-black shadow-[2px_2px_0px_#000]"
                  }`}
                >
                  hey, lihat cv saya disini!
                  <div className="absolute top-full left-4 w-0 h-0 border-t-[6px] border-t-brand-blue border-x-[6px] border-x-transparent" />
                  <div className={`absolute top-full left-[15px] w-0 h-0 border-t-[7px] border-x-[7px] border-x-transparent -z-10 transition-colors duration-300 ${isDarkMode ? "border-t-white" : "border-t-black"}`} />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsCvOpen(true)}
              onMouseEnter={() => setIsCvHovered(true)}
              onMouseLeave={() => setIsCvHovered(false)}
              className="w-full group flex items-center justify-between gap-4 p-5 md:p-6 bg-brand-blue text-white border border-brand-blue transition-all duration-300 hover:shadow-[6px_6px_0px_rgba(0,51,255,0.3)] cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <div className="flex flex-col items-start gap-0.5">
                  <span className="font-display text-[9px] sm:text-[10px] font-extrabold tracking-[0.2em] uppercase">
                    CURRICULUM VITAE
                  </span>
                  <span style={{ fontFamily: "'Geist', sans-serif" }} className="text-[10px] sm:text-xs font-light text-white/70">
                    Buka / Lihat CV
                  </span>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          </motion.div>

        </div>
      </div>

      {/* === CONTACT GRID === */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={5}
        variants={fadeUp}
        className="mt-14 md:mt-20"
      >
        <span className={`font-display text-[9px] font-bold tracking-[0.3em] block mb-5 ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
          // CONTACT
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {contacts.map((c, i) => (
            <motion.a
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={6 + i * 0.5}
              variants={fadeUp}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between gap-3 px-4 py-3.5 border transition-all duration-200 hover:bg-brand-blue hover:text-white cursor-pointer ${
                isDarkMode
                  ? "border-white/10 bg-white/[0.02] hover:border-brand-blue"
                  : "border-black/10 bg-black/[0.01] hover:border-brand-blue"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`flex-shrink-0 transition-colors duration-200 ${isDarkMode ? "text-white/40" : "text-black/40"} group-hover:text-white`}>
                  {c.icon}
                </span>
                <span className="font-display text-[8px] sm:text-[9px] font-bold tracking-wider uppercase flex-shrink-0">
                  {c.label}:
                </span>
                <span
                  style={{ fontFamily: "'Geist', sans-serif" }}
                  className={`text-[10px] sm:text-[11px] font-light truncate transition-colors duration-200 ${isDarkMode ? "text-white/60" : "text-black/60"} group-hover:text-white`}
                >
                  {c.handle}
                </span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                className="w-3 h-3 transition-all duration-200 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* CV Sidebar Drawer */}
      <AnimatePresence>
        {isCvOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              onClick={() => setIsCvOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] cursor-pointer"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className={`fixed top-0 right-0 h-screen w-full sm:w-[500px] md:w-[600px] lg:w-[700px] z-[999] border-l-2 shadow-2xl flex flex-col ${isDarkMode
                ? "bg-[#0c0c0c] border-white/20"
                : "bg-[#fcfcf9] border-black/20"
              }`}
            >
              <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? "border-white/10" : "border-black/10"}`}>
                <span className="font-display text-[10px] font-bold tracking-widest text-brand-blue uppercase">
                  // RAFI_MAULANA_CV.PDF
                </span>
                <button
                  onClick={() => setIsCvOpen(false)}
                  className={`px-3 py-1.5 border font-display text-[9px] font-bold tracking-widest transition-all duration-200 hover:bg-brand-blue hover:text-white cursor-pointer ${isDarkMode
                    ? "border-white/20 text-white bg-transparent"
                    : "border-black/20 text-black bg-transparent"
                  }`}
                >
                  [X] CLOSE
                </button>
              </div>
              <div className="flex-1 w-full bg-neutral-900 p-1 relative overflow-hidden">
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
