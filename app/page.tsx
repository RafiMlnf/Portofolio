"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { motion } from "motion/react";
import Hero from "../components/Hero";
import Profile from "../components/Profile";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import AnimatedStatus from "../components/AnimatedStatus";
import MusicPlayer from "../components/MusicPlayer";

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
  const starRef = React.useRef<HTMLDivElement | null>(null);
  const lenisRef = React.useRef<Lenis | null>(null);
  const isShakingRef = React.useRef(false);

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
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
      if (target) {
        lenisRef.current?.scrollTo(target);
      }
    }
  };

  return (
    <motion.div
      suppressHydrationWarning
      animate={isShaking ? { y: [0, 12, -6, 3, 0] } : { y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`w-full min-h-screen flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? "bg-black text-white" : "bg-[#f4f4f0] text-black"}`}
    >

      {/* FIXED NAVBAR */}
      <header className={`w-full sticky top-0 z-50 py-4 px-4 md:py-6 md:px-8 lg:px-10 transition-colors duration-300 ${isDarkMode ? "bg-black/90 backdrop-blur-md text-white" : "bg-[#f4f4f0]/90 backdrop-blur-md text-black"
        }`}>
        <nav className="flex items-center gap-1 sm:gap-2 w-full font-display text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest">
          {[
            {
              title: "hEaD",
              href: "#",
            },
            {
              title: "PROFILE",
              href: "#profile",
              sub: [
                { title: "WHO IS RAFI", href: "#profile" },
                { title: "DESCRIPTION", href: "#profile" },
                { title: "CONTACT", href: "#profile" }
              ]
            },
            {
              title: "SkILLS",
              href: "#skills",
              sub: [
                { title: "CAPABILITIES", href: "#skills" },
                { title: "CORE STACK", href: "#skills" }
              ]
            },
            {
              title: "PRoJECTS",
              href: "#projects",
              sub: [
                { title: "SHOWCASE", href: "#projects" },
                { title: "CATALOG", href: "#projects" }
              ]
            }
          ].map((item) => (
            <div key={item.title} className="relative group">
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="inline-block whitespace-nowrap px-2 py-1 hover:bg-brand-blue hover:text-white transition-all duration-200"
              >
                {item.title}
              </a>
              {/* Dropdown Hover Sub Section */}
              {item.sub && (
                <div
                  className={`absolute top-full left-0 flex flex-col border opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 shadow-xl ${isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                    }`}
                >
                  {item.sub.map((subItem) => (
                    <a
                      key={subItem.title}
                      href={subItem.href}
                      onClick={(e) => handleNavClick(e, subItem.href)}
                      className={`block px-4 py-2.5 text-[8px] sm:text-[9px] hover:bg-brand-blue hover:text-white whitespace-nowrap transition-colors border-b last:border-b-0 ${isDarkMode ? "border-white/10" : "border-black/10"
                        }`}
                    >
                      {subItem.title}
                    </a>
                  ))}
                </div>
              )}
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

      {/* DOUBLE DIVIDER === */}
      <div className="w-full flex flex-col gap-[3px] px-4 md:px-8 lg:px-10">
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
      </div>

      <Profile isDarkMode={isDarkMode} />

      {/* DOUBLE DIVIDER === */}
      <div className="w-full flex flex-col gap-[3px] px-4 md:px-8 lg:px-10">
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
      </div>

      <Skills isDarkMode={isDarkMode} />

      {/* DOUBLE DIVIDER === */}
      <div className="w-full flex flex-col gap-[3px] px-4 md:px-8 lg:px-10">
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
      </div>

      <Projects isDarkMode={isDarkMode} />

      {/* DOUBLE DIVIDER === */}
      <div className="w-full flex flex-col gap-[3px] px-4 md:px-8 lg:px-10">
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
      </div>

      {/* FOOTER (DARK OVERHAUL) */}
      <footer className="w-full bg-[#050505] text-white pt-16 md:pt-24 pb-8 select-none border-t border-neutral-900 mt-20">
        {/* Top Content: Big brutalist typography */}
        <div className="px-4 md:px-8 lg:px-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-12 md:mb-20">
          <h2 style={{ fontFamily: "'SS Broad', sans-serif", letterSpacing: "1px" }} className="font-display text-6xl sm:text-7xl md:text-[100px] lg:text-[130px] font-normal leading-[0.85] flex flex-col items-start">
            <ScrambleText text="LET'S" />
            <span className="text-brand-blue">
              <ScrambleText text="CONNECT." />
            </span>
          </h2>

          <a
            href="mailto:rafimaulanaf03@gmail.com"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 md:px-10 md:py-6 bg-brand-blue text-white font-display text-[10px] sm:text-xs font-bold tracking-widest uppercase border border-brand-blue transition-all duration-300 hover:bg-white hover:text-black hover:border-white shadow-[6px_6px_0px_rgba(255,255,255,0.1)] hover:shadow-[8px_8px_0px_rgba(255,255,255,1)]"
          >
            <span>SAY HELLO</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>

        {/* Infinite Marquee Border Strip */}
        <div className="w-full py-4 md:py-6 border-y border-white/10 overflow-hidden bg-[#0a0a0a] whitespace-nowrap flex mb-12 md:mb-20">
          <div className="animate-marquee flex gap-6 items-center">
            {[...Array(8)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="font-display text-sm md:text-lg font-bold tracking-widest uppercase text-white/50">OPEN FOR NEW OPPORTUNITIES</span>
                <span className="text-brand-blue text-2xl mx-4 md:mx-6">*</span>
                <span className="font-display text-sm md:text-lg font-bold tracking-widest uppercase text-white/50">AVAILABLE FOR WORK</span>
                <span className="text-brand-blue text-2xl mx-4 md:mx-6">*</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Links */}
        <div className="px-4 md:px-8 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] sm:text-[10px] md:text-xs font-display tracking-widest font-bold">
          <div className="opacity-50">
            © {new Date().getFullYear()} RAFI MAULANA FIRDAUS.
          </div>

          <div className="flex gap-6 opacity-70">
            <a href="https://github.com/RafiMlnf" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">GITHUB</a>
            <a href="https://linkedin.com/in/rafimaulanafirdaus" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">LINKEDIN</a>
            <a href="https://instagram.com/rafimlnf" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">INSTAGRAM</a>
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
  );
}
