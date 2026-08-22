"use client";

import React from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { usePortfolioData } from "@/lib/usePortfolioData";

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

/* ── Profile Grid Canvas (100% pixel-perfect alignment with global PixelGlow) ── */
function ProfileGridCanvas({ isDarkMode }: { isDarkMode: boolean }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const displayW = Math.round(rect.width);
      const displayH = Math.round(rect.height);

      if (canvas.width !== displayW || canvas.height !== displayH) {
        canvas.width = displayW;
        canvas.height = displayH;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const CELL = 64;
      const scrollY = window.scrollY;
      ctx.strokeStyle = isDarkMode ? "rgba(255, 255, 255, 0.035)" : "rgba(0, 0, 0, 0.035)";
      ctx.lineWidth = 1;

      // Match global document coordinates (x = c * 64, y = r * 64)
      const startCol = Math.floor(rect.left / CELL);
      const endCol = Math.ceil((rect.left + rect.width) / CELL);

      ctx.beginPath();
      for (let c = startCol; c <= endCol; c++) {
        const localX = Math.round(c * CELL - rect.left) + 0.5;
        ctx.moveTo(localX, 0);
        ctx.lineTo(localX, canvas.height);
      }

      const docTop = rect.top + scrollY;
      const startRow = Math.floor(docTop / CELL);
      const endRow = Math.ceil((docTop + rect.height) / CELL);

      for (let r = startRow; r <= endRow; r++) {
        const localY = Math.round(r * CELL - docTop) + 0.5;
        ctx.moveTo(0, localY);
        ctx.lineTo(canvas.width, localY);
      }
      ctx.stroke();
    };

    render();
    window.addEventListener("resize", render);
    window.addEventListener("scroll", render, { passive: true });

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(render);
      ro.observe(canvas);
    }

    return () => {
      window.removeEventListener("resize", render);
      window.removeEventListener("scroll", render);
      ro?.disconnect();
    };
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ─── Component ─── */
export default function Profile({ isDarkMode }: { isDarkMode: boolean }) {
  const { profile } = usePortfolioData();
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

  const fullText = profile.name || "Rafi";
  const [displayText, setDisplayText] = React.useState(fullText);
  const [fontIndex, setFontIndex] = React.useState(7); // default starting with Geist
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [typingSpeed, setTypingSpeed] = React.useState(1200); // initial pause

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

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
        className="relative w-full select-none overflow-visible flex flex-col"
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
              <div className={`flex-1 h-px ${isDarkMode ? "bg-white" : "bg-black"}`} />
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
                  {profile.fullName || "Maulana Firdaus"}
                </span>
              </motion.h2>

              <motion.div custom={2} variants={fadeUp} className="mt-2">
                <span className={`block text-xs font-semibold uppercase ${fgMuted}`}>
                  {profile.location || "CIKARANG, INDONESIA"}
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
                {profile.bio || "Kreator dengan latar belakang kuat di bidang visual dan pembangunan — graphic design, musik, dan pengembangan digital."}
              </p>
            </motion.div>


          </motion.div>

          {/* ── CENTER COLUMN — Photo ── */}
          <div className="flex-1 relative flex items-end justify-center overflow-hidden min-w-0">
            {/* Subtle grid overlay — synchronized with global PixelGlow */}
            <ProfileGridCanvas isDarkMode={isDarkMode} />

            {/* Photo — sits at bottom, bleeds to edges */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeIn}
              className="relative w-full flex justify-center"
              style={{ height: "100%" }}
            >
              <img
                src={profile.photoUrl || "/assets/img/profile/porto1.png"}
                alt={profile.fullName || "rAFI mAULANA fIRDAUS"}
                className="h-full object-contain object-bottom"
                style={{
                  maxWidth: "490px",
                  width: "100%",
                  filter: isDarkMode ? "grayscale(0.15)" : "grayscale(0.05)",
                  transform: "translateY(40px)",
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
                {profile.availability || "CONSIDERING INTERESTING OFFERS"}
              </span>
            </motion.div>

            {/* Current status */}
            <motion.div custom={1.5} variants={fadeUp} className="flex flex-col gap-3 items-end">
              <span className={`font-display text-[9px] font-bold tracking-[0.35em] uppercase ${fgMuted}`}>
                CURRENTLY
              </span>
              <div className="flex flex-col gap-2 items-end">
                {(profile.currently && profile.currently.length > 0 ? profile.currently : [
                  { role: "Full Stack Web Developer & UI QA Tester", place: "Magang @ PT Menara Terus Makmur", location: "Cikarang, Jawa Barat" },
                  { role: "Mahasiswa Semester Akhir", place: "Sedang menyusun skripsi" }
                ]).map((item, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <div className={`w-full h-px ${isDarkMode ? "bg-white/8" : "bg-black/8"}`} />}
                    <div className="flex flex-col gap-0.5 items-end">
                      <span className={`font-display text-[10px] font-bold tracking-[0.15em] uppercase ${isDarkMode ? "text-white/80" : "text-black/75"}`}>
                        {item.role}
                      </span>
                      <span
                        className={`text-[11px] leading-[1.5] font-light text-right ${isDarkMode ? "text-white/50" : "text-black/45"}`}
                        style={{ fontFamily: "'Geist', sans-serif" }}
                      >
                        {item.place}
                      </span>
                      {item.location && (
                        <span className={`font-display text-[8px] font-bold tracking-[0.25em] uppercase ${fgMuted}`}>
                          {item.location}
                        </span>
                      )}
                    </div>
                  </React.Fragment>
                ))}
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
                {(profile.passions && profile.passions.length > 0 ? profile.passions : [
                  "Design Graphic", "Visual", "UI/UX Design", "Music Enthusiast"
                ]).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 flex-row-reverse">
                    <span className="text-brand-blue text-[8px] flex-shrink-0">✦</span>
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
              className={`relative flex items-center gap-0 overflow-hidden backdrop-blur-md ${isDarkMode ? "bg-[#0c0c0c]/90 border border-white/10" : "bg-[#f4f4f0]/90 border border-black/10"}`}
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
