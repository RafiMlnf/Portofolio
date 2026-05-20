"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";



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
  const [activeBadge, setActiveBadge] = React.useState<string | null>(null);
  const [imageError, setImageError] = React.useState(false);

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

      {/* ── SECTION HEADER ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0}
        variants={fadeUp}
        className="mb-10 md:mb-16 relative z-10"
      >
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-brand-blue">
          02 / PROFILE
        </h2>
        <div className={`text-[10px] sm:text-xs font-display font-light tracking-widest mt-2 uppercase ${fgMuted}`}>
          // IDENTITY_DOSSIER_V2
        </div>
      </motion.div>

      {/* ── MAIN BODY ── */}
      <div className="flex flex-col lg:flex-row gap-0">

        {/* ── LEFT COLUMN (PHOTO & STATS) ── */}
        <div className="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0 flex flex-col gap-0 mb-12 lg:mb-0 lg:border-r lg:pr-10 xl:pr-14"
          style={{ borderColor: isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)" }}
        >
          {/* PHOTO FRAME — brutalist art element */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1.5}
            variants={fadeUp}
            className={`border-t ${borderFaint} pt-8 pb-10`}
          >
            <div className="relative w-full aspect-[4/5] max-w-[320px] mx-auto lg:mx-0">
              {/* Outer border box */}
              <div className={`absolute inset-0 border-2 ${border} overflow-hidden bg-black/5 dark:bg-white/5`}>
                {!imageError ? (
                  <img
                    src="/avatar.png"
                    onError={() => setImageError(true)}
                    alt="Rafi Maulana Firdaus"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-brand-blue/10 dark:bg-brand-blue/5 text-center p-4">
                    <svg className="w-12 h-12 text-brand-blue mb-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className="font-display text-[10px] font-bold tracking-widest text-brand-blue uppercase mb-1">
                      TEMPATKAN FOTO DI SINI
                    </span>
                    <span className="font-mono text-[8px] opacity-45">
                      /public/rafi.jpg
                    </span>
                  </div>
                )}
              </div>
              {/* Offset inner box style element */}
              <div
                className="absolute border-2 -z-10 pointer-events-none"
                style={{
                  top: "6%", left: "6%",
                  right: "-6%", bottom: "-6%",
                  borderColor: isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
                }}
              />
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

        {/* ── RIGHT COLUMN (NAME, BIO, TAGS, CV) ── */}
        <div className="flex-1 lg:pl-16 xl:pl-24 flex flex-col gap-0">

          {/* NAME & BIO GRID — Grid list layout with thin separator */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left Cell: Name */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
              className={`md:col-span-5 border-t ${borderFaint} pt-8 md:pt-12 pb-10 md:pb-14 pr-0 md:pr-8`}
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

            {/* Right Cell: Bio Paragraph */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={2}
              variants={fadeUp}
              className={`md:col-span-7 border-t md:border-l ${borderFaint} pt-8 md:pt-12 pb-10 md:pb-14 pl-0 md:pl-8 flex items-center`}
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
          </div>

          {/* ROLE TAG ROW */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={3}
            variants={fadeUp}
            className={`border-t ${borderFaint} py-6 flex flex-wrap gap-4`}
          >
            {[
              {
                tag: "DESIGNER",
                desc: "VISUAL & UI",
                bgHover: "hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black",
                accent: "border-brand-blue/30 hover:border-brand-blue",
                shadow: "hover:shadow-[3px_3px_0px_rgba(0,51,255,1)]",
                icon: (
                  <svg className="w-4.5 h-4.5 transition-transform duration-300 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                tag: "DEVELOPER",
                desc: "LOGIC & TECH",
                bgHover: "hover:bg-brand-blue hover:text-white hover:border-brand-blue",
                accent: "border-brand-blue/30",
                shadow: "hover:shadow-[3px_3px_0px_#00c3ff]",
                icon: (
                  <svg className="w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )
              },
              {
                tag: "CREATIVE",
                desc: "IDEAS & SOUND",
                bgHover: "bg-brand-blue text-white border-brand-blue",
                accent: "",
                shadow: "shadow-[3px_3px_0px_rgba(0,0,0,0.15)] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.15)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none",
                icon: (
                  <svg className="w-4.5 h-4.5 animate-[spin_6s_linear_infinite]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
                  </svg>
                )
              }
            ].map((role) => (
              <button
                key={role.tag}
                onClick={() => setActiveBadge(activeBadge === role.tag ? null : role.tag)}
                className={`group relative flex items-center gap-3 px-4 py-3 border-2 font-display transition-all duration-300 ${border} ${fg} ${role.accent} ${role.bgHover} ${role.shadow} text-left cursor-pointer outline-none ${
                  activeBadge === role.tag
                    ? role.tag === "DESIGNER"
                      ? "bg-white text-black dark:bg-white dark:text-black border-brand-blue shadow-[3px_3px_0px_rgba(0,51,255,1)]"
                      : role.tag === "DEVELOPER"
                        ? "bg-brand-blue text-white border-brand-blue shadow-[3px_3px_0px_#00c3ff]"
                        : "bg-brand-blue text-white border-brand-blue translate-x-0.5 translate-y-0.5 shadow-none"
                    : ""
                }`}
              >
                {/* Icon wrapper */}
                <div className="flex items-center justify-center">
                  {role.icon}
                </div>
                
                {/* Text wrapper */}
                <div className="flex flex-col items-start leading-none gap-1">
                  <span className="text-[10px] sm:text-xs font-black tracking-[0.25em]">
                    {role.tag}
                  </span>
                  <span className="text-[7px] sm:text-[8px] font-bold tracking-[0.15em] opacity-40 group-hover:opacity-100 transition-opacity">
                    {role.desc}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>

          {/* ACTIVE BADGE EXPLANATION BOX */}
          <AnimatePresence>
            {activeBadge && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div
                  className={`border-2 ${border} p-5 relative ${isDarkMode ? "bg-[#0c0c0c]" : "bg-white"} shadow-[4px_4px_0px_#0033ff]`}
                >
                  {/* Accent tag */}
                  <div className="flex items-center justify-between mb-3 border-b pb-2" style={{ borderColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}>
                    <span className="font-display text-[9px] font-black tracking-widest text-brand-blue flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-blue animate-ping rounded-full" />
                      KENAPA SAYA SEORANG {activeBadge}?
                    </span>
                    <button
                      onClick={() => setActiveBadge(null)}
                      className={`font-display text-[9px] font-bold tracking-widest uppercase hover:text-brand-blue cursor-pointer ${fgMuted}`}
                    >
                      TUTUP ×
                    </button>
                  </div>
                  
                  {/* Explanation Text */}
                  <p
                    style={{ fontFamily: "'Geist', sans-serif" }}
                    className={`text-xs sm:text-sm leading-relaxed font-light ${isDarkMode ? "text-white/80" : "text-black/75"}`}
                  >
                    {activeBadge === "DESIGNER" && (
                      "Bagi saya, desain bukan sekadar mempercantik visual, melainkan media bercerita (visual storytelling) dan pemecahan masalah. Latar belakang saya di bidang graphic design dan estetika Y2K/Brutalist mendorong saya untuk merancang antarmuka yang berkarakter, berani, namun tetap fungsional dan intuitif bagi pengguna."
                    )}
                    {activeBadge === "DEVELOPER" && (
                      "Sebagai developer, saya senang merealisasikan ide kreatif menjadi produk digital yang hidup. Dengan keahlian di bidang pengembangan frontend modern seperti React 19 dan Next.js, saya fokus pada penulisan kode yang bersih, arsitektur performan, serta integrasi teknologi audio yang presisi."
                    )}
                    {activeBadge === "CREATIVE" && (
                      "Sisi kreatif adalah penghubung dari seluruh keahlian saya. Dari eksplorasi aransemen musik hingga ideasi konten visual, saya terbiasa menjembatani pemikiran teknis dan artistik dalam satu alur kerja yang sinergis demi menciptakan karya yang autentik dan memiliki kedalaman makna."
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
      </div>



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
