"use client";

import React from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

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

const floatingBarVariants = {
  hidden: {
    scaleX: 0.02,
    scaleY: 0,
    opacity: 0,
    transformOrigin: "center",
    transition: {
      scaleX: { duration: 0.2, ease: "easeIn" as const },
      scaleY: { delay: 0.1, duration: 0.15, ease: "easeIn" as const },
      opacity: { delay: 0.25, duration: 0.1, ease: "linear" as const }
    }
  },
  visible: {
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    transformOrigin: "center",
    transition: {
      opacity: { duration: 0.2, ease: "easeOut" as const },
      scaleY: { duration: 0.35, ease: [0.175, 0.885, 0.32, 1.275] as const },
      scaleX: { delay: 0.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
    }
  }
};

/* ─── Data ─── */
const tags = ["DESIGNER", "DEVELOPER", "CREATIVE"];




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
    id: "contact",
    label: "CONTACT ME",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

/* ─── Component ─── */
export default function Profile({ isDarkMode }: { isDarkMode: boolean }) {
  const [isCvOpen, setIsCvOpen] = React.useState(false);
  const [isShimmering, setIsShimmering] = React.useState(false);
  const shimmerTimeoutRef = React.useRef<any>(null);

  React.useEffect(() => {
    return () => {
      if (shimmerTimeoutRef.current) clearTimeout(shimmerTimeoutRef.current);
    };
  }, []);

  /* ── Typing Animation & Font Cycle ── */
  const fonts = React.useMemo(() => [
    "var(--font-reverie, 'REVERIE', sans-serif)",
    "var(--font-gloock, 'Gloock', serif)",
    "var(--font-pixelify, 'Pixelify Sans', sans-serif)",
    "var(--font-tanamera, 'TANAMERA', sans-serif)",
    "var(--font-wendy, 'Wendy Neue', sans-serif)",
    "var(--font-glasfur, 'GLASFUR Trial', sans-serif)",
    "var(--font-sans, 'SS Broad', sans-serif)",
    "var(--font-geist, 'Geist', sans-serif)"
  ], []);

  const [displayText, setDisplayText] = React.useState("Rafi");
  const [fontIndex, setFontIndex] = React.useState(7); // default starting with Geist
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [typingSpeed, setTypingSpeed] = React.useState(1200); // initial pause

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = "Rafi";

    const handleTyping = () => {
      if (!isDeleting) {
        if (displayText === fullText) {
          setIsDeleting(true);
          setTypingSpeed(1200); // pause 1.2s when full
          return;
        }
        const nextText = fullText.slice(0, displayText.length + 1);
        setDisplayText(nextText);
        setTypingSpeed(60); // fast snappy typing
      } else {
        if (displayText === "") {
          setIsDeleting(false);
          let nextFontIndex;
          do {
            nextFontIndex = Math.floor(Math.random() * fonts.length);
          } while (nextFontIndex === fontIndex && fonts.length > 1);

          setFontIndex(nextFontIndex);
          setTypingSpeed(250); // fast transition pause
          return;
        }
        const nextText = fullText.slice(0, displayText.length - 1);
        setDisplayText(nextText);
        setTypingSpeed(30); // super fast deleting
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typingSpeed, fontIndex, fonts]);

  const containerRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const fg = isDarkMode ? "text-white" : "text-black";
  const fgMuted = isDarkMode ? "text-white/40" : "text-black/35";
  const border = isDarkMode ? "border-white/10" : "border-black/10";

  const handleBarAction = (id: string, href?: string) => {
    if (id === "cv") { setIsCvOpen(true); return; }
    if (id === "contact") {
      document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <section
        ref={containerRef}
        id="profile"
        className={`relative w-full select-none overflow-visible flex flex-col ${isDarkMode ? "bg-black" : "bg-[#f4f4f0]"}`}
        style={{ height: "calc(100vh - 57px)" }}
      >
        {/* ═══ MAIN 3-COLUMN GRID ═══ */}
        <div className="flex flex-1 overflow-hidden min-h-0">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            className={`flex flex-col justify-between px-8 py-10 flex-shrink-0 w-[360px] border-r ${border}`}
          >
            {/* Section tag */}
            <motion.div custom={0} variants={fadeUp} className={`flex items-center gap-6 w-full pb-6 mb-5 border-b ${border}`}>
              <span className={`font-geist text-[22px] font-extrabold tracking-[0.25em] uppercase ${fg}`}>PROFILE</span>
              <div className={`flex-1 h-px ${isDarkMode ? "bg-white/8" : "bg-black/8"}`} />
            </motion.div>

            {/* Name */}
            <div className="flex flex-col gap-1">
              <motion.h2
                custom={1}
                variants={fadeUp}
                className={`font-geist font-extrabold tracking-tighter leading-none ${fg}`}
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                <div 
                  className="relative block" 
                  style={{ 
                    fontSize: "clamp(48px, 4.8vw, 76px)", 
                    height: "0.9em"
                  }}
                >
                  <span 
                    className="absolute left-0 bottom-0 block font-normal whitespace-nowrap" 
                    style={{ 
                      fontSize: "1em", 
                      lineHeight: 0.9,
                      fontFamily: fonts[fontIndex],
                      textTransform: "none",
                      fontWeight: "normal"
                    }}
                  >
                    {displayText}
                    <span className="inline-block w-[3px] h-[0.85em] ml-1 bg-brand-blue animate-caret-blink" style={{ verticalAlign: "middle" }} />
                  </span>
                </div>
                <span
                  className={`block font-medium tracking-normal ${fgMuted}`}
                  style={{ fontSize: "clamp(15px, 1.5vw, 21px)", lineHeight: 1.25 }}
                >
                  Maulana Firdaus
                </span>
              </motion.h2>

              <motion.div custom={2} variants={fadeUp} className="mt-4">
                <span className={`font-display block text-[11px] font-bold tracking-[0.4em] uppercase ${fgMuted}`}>
                  CIKARANG, INDONESIA
                </span>
              </motion.div>
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


          </motion.div>

          {/* ── CENTER COLUMN — Photo ── */}
          <div className="flex-1 relative flex items-end justify-center overflow-hidden min-w-0">
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

          <motion.div
            initial="hidden"
            animate="visible"
            className={`flex flex-col justify-end gap-6 px-8 py-10 flex-shrink-0 items-end text-right w-[300px] border-l ${border}`}
          >
            {/* Availability badge */}
            <motion.div custom={0.5} variants={fadeUp} className="flex items-center gap-2 flex-row-reverse mb-auto">
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

            {/* Thin grid separator above PASSION */}
            <div className={`w-full border-t ${border}`} />

            {/* Interests */}
            <motion.div custom={2.5} variants={fadeUp} className="flex flex-col gap-3 items-end">
              <span className={`font-display text-[9px] font-bold tracking-[0.35em] uppercase ${fgMuted}`}>
                PASSION
              </span>
              <div className="flex flex-col gap-1.5 items-end">
                {[
                  { label: "Design Graphic", icon: "✦" },
                  { label: "Visual", icon: "✦" },
                  { label: "UI/UX Design", icon: "✦" },
                  { label: "Music Enthusiast", icon: "✦" },
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


          </motion.div>
        </div>

        {/* ═══ FLOATING BOTTOM BAR ═══ */}
        <motion.div
          style={{ y: parallaxY }}
          className="flex-shrink-0 px-8 pb-6 pt-0"
        >
          <motion.div
            variants={floatingBarVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            onAnimationStart={(definition) => {
              if (definition === "visible") {
                setIsShimmering(true);
                if (shimmerTimeoutRef.current) clearTimeout(shimmerTimeoutRef.current);
                shimmerTimeoutRef.current = setTimeout(() => {
                  setIsShimmering(false);
                }, 1000);
              } else if (definition === "hidden") {
                setIsShimmering(false);
              }
            }}
          >
            <div
              className={`relative flex items-center gap-0 overflow-hidden backdrop-blur-md ${isDarkMode ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/10"}`}
            >
              {isShimmering && (
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 1, 0] }}
                  transition={{ duration: 1, times: [0, 0.6, 1], ease: "easeOut" }}
                  style={{
                    border: '1px solid transparent',
                    background: 'linear-gradient(90deg, rgba(184,134,11,0.6) 0%, rgba(255,215,0,0.8) 35%, rgba(255,250,205,0.9) 50%, rgba(255,215,0,0.8) 65%, rgba(184,134,11,0.6) 100%) border-box',
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    animation: 'gold-shimmer 1s linear infinite',
                    backgroundSize: '200% 100%',
                    zIndex: 10
                  }}
                />
              )}
              {/* Left accent */}
              <div className="w-1 self-stretch bg-brand-blue flex-shrink-0" />

              <div className="flex items-center flex-1">
                {barActions.map((action, i) => (
                  <button
                    key={action.id}
                    onClick={() => handleBarAction(action.id)}
                    className={`group flex items-center gap-2.5 px-5 py-3.5 font-display text-[9px] font-bold tracking-[0.22em] uppercase transition-all duration-200 whitespace-nowrap flex-1 justify-center ${isDarkMode
                      ? "text-white/50 hover:text-white hover:bg-white/8"
                      : "text-black/45 hover:text-black hover:bg-black/8"
                      } ${i === 0 ? "hover:text-brand-blue" : ""} ${i < barActions.length - 1 ? `border-r ${border}` : ""}`}
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
        </motion.div>
      </section>

      {/* GAP/SPACING KOSONG BETWEEN PROFILE AND BEYOND TECHNICAL === */}
      <div className="w-full h-16 md:h-24" />

      {/* ═══ BEYOND TECHNICAL ═══ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full border-t ${border} ${isDarkMode ? "bg-black" : "bg-[#f4f4f0]"}`}
      >
        {/* Header row */}
        <div className={`px-8 md:px-10 py-6 flex items-center gap-6 border-b ${border}`}>
          <span className={`font-geist text-[12px] font-bold tracking-[0.35em] uppercase ${fg}`}>
            Beyond Technical
          </span>
          <div className={`flex-1 h-px ${isDarkMode ? "bg-white/10" : "bg-black/10"}`} />
        </div>

        {/* Two-column content */}
        <div className={`grid grid-cols-1 md:grid-cols-2 border-b ${border}`}>
          {/* Left */}
          <div className={`px-8 md:px-10 py-10 border-b md:border-b-0 ${border}`}>
            <p className={`font-geist text-[13px] leading-[1.85] font-light ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
              Saya tipe yang lebih banyak diam. Bukan berarti tidak ada yang mau disampaikan — lebih ke saya lebih suka mengamati dulu, baca situasi, pahami polanya, baru bicara kalau memang perlu. Orang yang baru kenal saya mungkin butuh waktu lebih untuk benar-benar tahu saya seperti apa, dan itu tidak masalah. Saya tidak berusaha membuat diri sulit dipahami — memang begitu adanya.
            </p>
            <p className={`font-geist text-[13px] leading-[1.85] font-light mt-5 ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
              Ada satu momen yang cukup berkesan — diminta jadi speaker webinar di salah satu universitas. Buat orang lain mungkin biasa, tapi buat saya yang cenderung diam, itu semacam pembuktian kecil. Ternyata kalau memang situasinya mengharuskan saya hadir penuh, saya bisa melakukannya.
            </p>
          </div>

          {/* Right */}
          <div className={`px-8 md:px-10 py-10 md:border-l ${border}`}>
            <p className={`font-geist text-[13px] leading-[1.85] font-light ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
              Ekspresi saya biasanya keluar lewat visual — desain jadi semacam bahasa lain buat saya. Untuk musik, saya lebih ke pendengar yang serius; cari makna di balik lirik, pergi ke konser, duduk sendiri sambil dengerin album dari awal sampai akhir. Buat saya musik bukan sekadar latar, ada sesuatu yang lebih dalam di sana.
            </p>
            <p className={`font-geist text-[13px] leading-[1.85] font-light mt-5 ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
              Soal skill non-teknis — saya tidak terlalu yakin dengan daftar yang saya buat sendiri, tapi orang-orang di sekitar saya bilang saya bisa menenangkan situasi yang mulai kacau, dan saya tidak panik mudah. Mungkin itu yang dimaksud EQ. Entahlah, saya juga masih belajar mengenal diri sendiri.
            </p>
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
              className={`fixed top-0 right-0 h-screen w-full sm:w-[500px] md:w-[620px] z-[999] border-l-2 shadow-2xl flex flex-col ${isDarkMode ? "bg-[#080808] border-white" : "bg-[#f4f4f0] border-black"
                }`}
            >
              <div
                className={`px-5 py-4 flex items-center justify-between flex-shrink-0 border-b ${border}`}
              >
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
    </>
  );
}
