"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { motion } from "motion/react";
import Hero from "../components/Hero";
import Profile from "../components/Profile";
import Skills from "../components/Skills";
import Achievements from "../components/Achievements";
import Projects from "../components/Projects";
import AnimatedStatus from "../components/AnimatedStatus";
import MusicPlayer from "../components/MusicPlayer";
import CustomCursor from "../components/CustomCursor";

const contacts = [
  {
    label: "INSTAGRAM",
    handle: "@rafimlnf",
    href: "https://instagram.com/rafimlnf",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "GMAIL",
    handle: "rafimaulanaf03@gmail.com",
    href: "mailto:rafimaulanaf03@gmail.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GITHUB",
    handle: "RafiMlnf",
    href: "https://github.com/RafiMlnf",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "DISCORD",
    handle: "xenithgg",
    href: "https://discord.com/users/xenithgg",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.084.116 18.11.134 18.124a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
      </svg>
    ),
  },
];

const GlitchChar = ({ char, isUpper }: { char: string; isUpper: boolean }) => {
  if (char === " ") return <span className="inline-block w-4 md:w-6"></span>;

  return (
    <motion.span
      layout
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 12,
        mass: 0.8
      }}
      className="inline-block origin-center"
      style={{ display: "inline-block" }}
    >
      {isUpper ? char.toUpperCase() : char.toLowerCase()}
    </motion.span>
  );
};

const ScrambleText = ({ text }: { text: string }) => {
  const [cases, setCases] = useState<boolean[]>(text.split("").map(() => true));

  useEffect(() => {
    const len = text.length;
    let timeoutId: NodeJS.Timeout;

    const runScramble = () => {
      setCases((prev) => {
        const next = [...prev];

        // Find current indices of lowercase (false) and uppercase (true)
        const lowercaseIndices = next.reduce<number[]>((acc, isUpper, idx) => {
          if (!isUpper) acc.push(idx);
          return acc;
        }, []);

        const uppercaseIndices = next.reduce<number[]>((acc, isUpper, idx) => {
          if (isUpper) acc.push(idx);
          return acc;
        }, []);

        const currentCount = lowercaseIndices.length;
        const maxLimit = Math.min(5, len);

        // Deciding step:
        if (currentCount >= maxLimit) {
          // Must restore one to uppercase
          const restoreIdx = lowercaseIndices[Math.floor(Math.random() * lowercaseIndices.length)];
          next[restoreIdx] = true;
        } else if (currentCount === 0) {
          // Must turn one to lowercase
          if (uppercaseIndices.length > 0) {
            const lowerIdx = uppercaseIndices[Math.floor(Math.random() * uppercaseIndices.length)];
            next[lowerIdx] = false;
          }
        } else {
          // Count is between 1 and maxLimit - 1: stochastically transition (50% add lowercase, 50% restore uppercase)
          if (Math.random() > 0.5 && uppercaseIndices.length > 0) {
            const lowerIdx = uppercaseIndices[Math.floor(Math.random() * uppercaseIndices.length)];
            next[lowerIdx] = false;
          } else if (lowercaseIndices.length > 0) {
            const restoreIdx = lowercaseIndices[Math.floor(Math.random() * lowercaseIndices.length)];
            next[restoreIdx] = true;
          }
        }

        return next;
      });

      // Schedule next scramble with a random delay between 800ms and 1800ms
      const nextDelay = 800 + Math.random() * 1000;
      timeoutId = setTimeout(runScramble, nextDelay);
    };

    // De-synchronize initial starts of multiple instances
    const initialDelay = Math.random() * 1000;
    timeoutId = setTimeout(runScramble, initialDelay);

    return () => clearTimeout(timeoutId);
  }, [text]);

  return (
    <span className="inline-flex items-center">
      {text.split("").map((char, i) => (
        <GlitchChar key={`${text}-${i}`} char={char} isUpper={cases[i] ?? true} />
      ))}
    </span>
  );
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isShaking, setIsShaking] = useState(false);
  const [edgeShake, setEdgeShake] = useState<"left" | "right" | "top" | "bottom" | null>(null);
  const edgeShakeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const starRef = React.useRef<HTMLDivElement | null>(null);
  const lenisRef = React.useRef<Lenis | null>(null);
  const isShakingRef = React.useRef(false);

  const triggerEdgeShake = React.useCallback((dir: "left" | "right" | "top" | "bottom") => {
    setEdgeShake(dir);
    if (edgeShakeTimer.current) clearTimeout(edgeShakeTimer.current);
    edgeShakeTimer.current = setTimeout(() => setEdgeShake(null), 400);
  }, []);

  // Sync theme with local storage and set up scroll animations
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
    }

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let ticking = false;
    let baseWidth = 0;

    const updateBaseWidth = () => {
      if (starRef.current?.parentElement) {
        baseWidth = starRef.current.parentElement.getBoundingClientRect().width;
      }
    };
    // Measure base width initially
    setTimeout(updateBaseWidth, 100);

    // Shared star position update logic
    const updateStarPosition = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0 && starRef.current && starRef.current.parentElement) {
        const currentScroll = window.scrollY;
        const progress = currentScroll / totalScroll; // 0 to 1
        const parentWidth = starRef.current.parentElement.getBoundingClientRect().width;

        let targetPx = progress * baseWidth;

        // Blending logic: if scroll is past 90%, smoothly blend from baseWidth to dynamic parentWidth
        // This ensures the star is 100% stable in the middle, but dynamically hugs the text boundary at the end
        if (progress > 0.9) {
          const blendFactor = (progress - 0.9) / 0.1; // 0 at 90% scroll, 1 at 100% scroll
          const blendedWidth = baseWidth * (1 - blendFactor) + parentWidth * blendFactor;
          targetPx = progress * blendedWidth;
        }

        // Clamp to prevent any overshoot
        if (targetPx > parentWidth) {
          targetPx = parentWidth;
        }

        starRef.current.style.left = `${targetPx}px`;
        starRef.current.style.transform = "translateX(-50%)";
      }
    };

    // Scroll progress handler
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateStarPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Overscroll shake effect at top
    const handleWheel = (e: WheelEvent) => {
      // DeltaY < 0 means scrolling up
      if (window.scrollY <= 10 && e.deltaY < 0) {
        if (!isShakingRef.current) {
          isShakingRef.current = true;
          setIsShaking(true);
          setTimeout(() => {
            setIsShaking(false);
            isShakingRef.current = false;
          }, 300);
        }
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });

    // Lenis RAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Set up ResizeObserver to update position instantly when parent container's width changes (text scramble wiggles)
    let resizeObserver: ResizeObserver | null = null;
    if (starRef.current?.parentElement) {
      resizeObserver = new ResizeObserver(() => {
        updateStarPosition();
      });
      resizeObserver.observe(starRef.current.parentElement);
    }

    const handleResize = () => {
      updateBaseWidth();
      updateStarPosition();
    };
    window.addEventListener("resize", handleResize);

    const handleLockScroll = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.lock) {
        lenis.stop();
        document.documentElement.classList.add("overflow-hidden");
        document.body.classList.add("overflow-hidden");
      } else {
        lenis.start();
        document.documentElement.classList.remove("overflow-hidden");
        document.body.classList.remove("overflow-hidden");
      }
    };
    window.addEventListener("lock-scroll", handleLockScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("lock-scroll", handleLockScroll);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#") {
      lenisRef.current?.scrollTo(0);
    } else {
      const target = document.querySelector(href);
      if (target instanceof HTMLElement) {
        lenisRef.current?.scrollTo(target);
      }
    }
  };

  return (
    <>
    <motion.div
      suppressHydrationWarning
      animate={
        isShaking
          ? { y: [0, 12, -6, 3, 0], x: 0 }
          : edgeShake === "left"
          ? { x: [0, -14, 8, -4, 0], y: 0 }
          : edgeShake === "right"
          ? { x: [0, 14, -8, 4, 0], y: 0 }
          : edgeShake === "top"
          ? { y: [0, -14, 8, -4, 0], x: 0 }
          : edgeShake === "bottom"
          ? { y: [0, 14, -8, 4, 0], x: 0 }
          : { x: 0, y: 0 }
      }
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`w-full min-h-screen flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? "bg-black text-white" : "bg-[#f4f4f0] text-black"}`}
    >

      {/* FIXED NAVBAR */}
      <header className={`w-full sticky top-0 z-50 py-4 px-4 md:py-6 md:px-8 lg:px-10 transition-colors duration-300 ${isDarkMode ? "bg-black/90 backdrop-blur-md text-white" : "bg-[#f4f4f0]/90 backdrop-blur-md text-black"
        }`}>
        <nav className="flex items-center gap-1 sm:gap-2 w-full font-display text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest">
          {[
            { title: "HEAD", href: "#" },
            { title: "PROFILE", href: "#profile" },
            { title: "SKILLS", href: "#skills" },
            { title: "EXPERIENCE", href: "#experience" },
            { title: "PROJECTS", href: "#projects" }
          ].map((item) => (
            <div key={item.title} className="relative">
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="inline-block whitespace-nowrap px-2 py-1 hover:bg-brand-blue hover:text-white transition-all duration-200"
              >
                {item.title}
              </a>
            </div>
          ))}

          {/* Separator line with scroll-progress sliding star */}
          <div className="h-px flex-1 mx-2 md:mx-4 relative flex items-center justify-start">
            <div className={`absolute inset-0 h-px transition-colors duration-300 ${isDarkMode ? "bg-white opacity-40" : "bg-black opacity-40"
              }`}></div>
            {/* The sliding star */}
            <div
              ref={starRef}
              style={{
                left: "0px",
                transform: "translateX(-50%)",
                // Creating a solid outer stroke using multiple drop-shadows matching the background
                filter: `drop-shadow(3px 0px 0px ${isDarkMode ? "black" : "#f4f4f0"}) 
                         drop-shadow(-3px 0px 0px ${isDarkMode ? "black" : "#f4f4f0"}) 
                         drop-shadow(0px 3px 0px ${isDarkMode ? "black" : "#f4f4f0"}) 
                         drop-shadow(0px -3px 0px ${isDarkMode ? "black" : "#f4f4f0"})`
              }}
              className="absolute w-4 h-4 md:w-5 md:h-5 flex items-center justify-center pointer-events-none select-none z-10 transition-[filter] duration-300"
            >
              <img
                src="/star.png"
                alt="Scroll star"
                className={`w-full h-full object-contain transition-all duration-300 ${!isDarkMode ? "invert" : ""
                  }`}
              />
            </div>
          </div>

          {/* Animated Accent blue box */}
          <AnimatedStatus />

          {/* Theme Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={toggleTheme}
            className={`p-1 sm:p-1.5 ml-1 transition-colors duration-200 focus:outline-none flex items-center justify-center ${isDarkMode
              ? 'hover:bg-white/10 text-white hover:text-brand-blue'
              : 'hover:bg-black/10 text-black hover:text-brand-blue'
              }`}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              // Sun Icon
              <motion.svg
                key="sun"
                initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.625 1.625M17.775 17.775l1.625 1.625M3 12h2.25m13.5 0H21M4.22 19.78l1.625-1.625M17.775 6.225l1.625-1.625M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </motion.svg>
            ) : (
              // Moon Icon
              <motion.svg
                key="moon"
                initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </motion.svg>
            )}
          </motion.button>
        </nav>
      </header>

      <Hero isDarkMode={isDarkMode} />

      {/* GAP/SPACING KOSONG BETWEEN HERO AND PROFILE === */}
      <div className="w-full h-16 md:h-24" />

      <Profile isDarkMode={isDarkMode} />

      {/* GAP/SPACING KOSONG BETWEEN PROFILE AND SKILLS === */}
      <div className="w-full h-16 md:h-24" />

      <Skills isDarkMode={isDarkMode} />

      {/* GAP/SPACING KOSONG BETWEEN SKILLS AND ACHIEVEMENTS === */}
      <div className="w-full h-16 md:h-24" />

      <Achievements isDarkMode={isDarkMode} />

      {/* GAP/SPACING KOSONG BETWEEN ACHIEVEMENTS AND PROJECTS === */}
      <div className="w-full h-16 md:h-24" />

      <Projects isDarkMode={isDarkMode} />

      {/* GAP/SPACING KOSONG BETWEEN PROJECTS AND FOOTER === */}
      <div className="w-full h-16 md:h-24" />

      {/* FOOTER (DARK OVERHAUL) */}
      <footer className="w-full bg-[#050505] text-white pt-16 md:pt-24 pb-8 select-none border-t border-neutral-900 mt-20">
        {/* Top Content: Big brutalist typography */}
        <div className="px-4 md:px-8 lg:px-10 mb-12 md:mb-20">
          <h2 style={{ fontFamily: "'SS Broad', sans-serif", letterSpacing: "1px" }} className="font-display text-6xl sm:text-7xl md:text-[100px] lg:text-[130px] font-normal leading-[0.85] flex flex-col items-start">
            <ScrambleText text="LET'S" />
            <span className="text-brand-blue">
              <ScrambleText text="CONNECT." />
            </span>
          </h2>
        </div>

        {/* Reach Out / Socials List */}
        <div className="px-4 md:px-8 lg:px-10 mb-16 md:mb-20">
          <div className="pt-6 pb-2 border-t border-white/10">
            <span className="font-display text-[9px] font-bold tracking-[0.4em] uppercase text-white/40">
              REACH OUT
            </span>
          </div>

          <div className="flex flex-col divide-y divide-white/10">
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-4 transition-all duration-150 cursor-pointer"
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  {/* Index */}
                  <span className="font-display text-[11px] sm:text-xs font-bold tracking-widest flex-shrink-0 text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Label */}
                  <span className="font-display text-sm sm:text-base font-extrabold tracking-wider uppercase flex-shrink-0 transition-colors duration-150 group-hover:text-brand-blue text-white flex items-center gap-3">
                    <span className="transition-colors duration-150 text-white/40 group-hover:text-brand-blue">
                      {c.icon}
                    </span>
                    {c.label}
                  </span>
                  {/* Handle */}
                  <span
                    style={{ fontFamily: "'Geist', sans-serif" }}
                    className="text-xs sm:text-sm font-light truncate transition-colors duration-150 group-hover:text-brand-blue text-white/40 pt-0.5"
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
                  className="w-4 h-4 flex-shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-brand-blue"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5 19.5 4.5m0 0H8.25m11.25 0v11.25" />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>


        {/* Bottom Copyright & Links */}
        <div className="px-4 md:px-8 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] sm:text-[10px] md:text-xs font-display tracking-widest font-bold">
          <div className="opacity-50">
            © {new Date().getFullYear()} rAFI MAuLANA fIRDAUs.
          </div>


          <div>
            <a href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center gap-2 group hover:text-brand-blue transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue group-hover:animate-ping" />
              BACK TO TOP
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Music Player */}
      <MusicPlayer isDarkMode={isDarkMode} />

    </motion.div>

    {/* Custom Star Cursor — rendered outside main motion.div so it overlays everything */}
    <CustomCursor isDarkMode={isDarkMode} onEdgeHit={triggerEdgeShake} />
    </>
  );
}
