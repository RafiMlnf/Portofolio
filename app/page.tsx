"use client";

import React, { useState, useEffect, useRef } from "react";

interface Letter {
  char: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
  radius: number;
  width: number;
  height: number;
  baseX: number;
  baseY: number;
  resting: boolean;
  scale?: number;
  opacity?: number;
  targetScale?: number;
  targetOpacity?: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  desc: string;
  tags: string[];
  liveUrl?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "SOLFEGGIO ANALYZER",
    category: "DEVELOPMENT",
    year: "2026",
    desc: "A high-fidelity musical narrative synthesizer and acoustic mood visualizer pipeline.",
    tags: ["Next.js", "Web Audio", "Vercel"],
    liveUrl: "https://solfeggio-analyzer.vercel.app/"
  },
  {
    id: 2,
    title: "KINETIC TYPOGRAPHY PLAYGROUND",
    category: "ANIMATION",
    year: "2026",
    desc: "Interactive canvas environment for physics-based letters and responsive font-variation axes.",
    tags: ["React 19", "Matter.js", "Canvas"]
  },
  {
    id: 3,
    title: "STARK ARCHIVE PLATFORM",
    category: "DESIGN",
    year: "2025",
    desc: "A brutalist editorial database exploring historical modular design philosophies.",
    tags: ["Figma", "Brutalist", "Layout"]
  },
  {
    id: 4,
    title: "JS VS WASM BENCHMARK",
    category: "DEVELOPMENT",
    year: "2026",
    desc: "A high-performance benchmark playground comparing WebAssembly and JavaScript raw computation speeds.",
    tags: ["WebAssembly", "Rust", "JavaScript"],
    liveUrl: "https://jsvswasm.vercel.app/"
  },
  {
    id: 5,
    title: "AETHERIAL SOUNDSCAPE",
    category: "ANIMATION",
    year: "2025",
    desc: "Generative audio synthesizer mapping keyboard interactions to ambient frequencies.",
    tags: ["Web Audio", "Tone.js", "Motion"]
  },
  {
    id: 6,
    title: "BRUTALIST COMMERCE ENGINE",
    category: "DESIGN",
    year: "2026",
    desc: "Monochrome e-commerce checkout flow emphasizing grid structures and heavy typography.",
    tags: ["E-Commerce", "UX Design", "Wireframe"]
  }
];

const IframePreview = ({ src, title }: { src: string; title: string }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.25);
  const [height, setHeight] = useState(176);

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.getBoundingClientRect().width;
        const currentScale = wrapperWidth / 1280;
        setScale(currentScale);
        setHeight(720 * currentScale);
      }
    };

    handleResize();
    const timeout = setTimeout(handleResize, 100);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div 
      ref={wrapperRef} 
      style={{ height: `${height}px` }}
      className="w-full mb-4 border border-brand-blue/30 relative overflow-hidden bg-[#121212] group/iframe"
    >
      <iframe
        src={src}
        title={title}
        style={{
          width: "1280px",
          height: "720px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        className="border-none pointer-events-none absolute top-0 left-0"
        loading="lazy"
      />
      {/* Interaction hint overlay */}
      <a 
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 bg-black/40 opacity-0 group-hover/iframe:opacity-100 flex items-center justify-center transition-opacity duration-300 text-[10px] font-display font-bold tracking-widest text-white backdrop-blur-[2px]"
      >
        OPEN LIVE SITE ↗
      </a>
    </div>
  );
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Physics states ref
  const lettersRef = useRef<Letter[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const isLerpingRef = useRef(false);
  const requestRef = useRef<number | null>(null);

  // Sync theme with local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
    }

    // Scroll progress handler
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentScroll = window.scrollY;
        const progress = (currentScroll / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Set up Canvas and Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const chars = ["P", "o", "R", "T", "F", "o", "L", "I", "O"];

    const initializeLetters = (w: number, h: number) => {
      // Dynamic font size: 11% of width, up to 130px max
      const fontSize = Math.min(w * 0.11, 130);
      ctx.font = `normal ${fontSize}px 'SS Broad', sans-serif`;

      // Calculate individual metrics and total width
      const metrics = chars.map(char => {
        const textWidth = ctx.measureText(char).width;
        return { char, width: textWidth };
      });

      const totalWidth = metrics.reduce((acc, m) => acc + m.width, 0);
      const startX = (w - totalWidth) / 2;
      const centerY = h / 2;

      let currentX = startX;
      lettersRef.current = metrics.map(m => {
        const charWidth = m.width;
        // Radius based on width to create tight circles around characters
        const radius = charWidth / 2;
        const letterX = currentX + charWidth / 2;
        currentX += charWidth;

        return {
          char: m.char,
          x: letterX,
          y: centerY,
          vx: 0,
          vy: 0,
          angle: 0,
          vAngle: 0,
          radius: radius,
          width: charWidth,
          height: fontSize,
          baseX: letterX,
          baseY: centerY,
          resting: true
        };
      });
    };

    // Mouse tracking inside canvas for proximity zoom & fade
    const mousePos = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mousePos.x = -1000;
      mousePos.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      width = rect.width;
      height = rect.height;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      initializeLetters(rect.width, rect.height);
    };

    window.addEventListener("resize", handleResize);
    // Initial size setup
    handleResize();

    // PHYSICS & RENDER LOOP
    const updatePhysics = () => {
      const letters = lettersRef.current;
      const shockwaves = shockwavesRef.current;
      const isLerping = isLerpingRef.current;

      // 1. Update Shockwaves
      shockwavesRef.current = shockwaves
        .map(sw => ({
          ...sw,
          radius: sw.radius + (sw.maxRadius - sw.radius) * 0.15,
          opacity: sw.opacity - 0.05
        }))
        .filter(sw => sw.opacity > 0);

      // 2. Lerp back state
      if (isLerping) {
        let allResting = true;
        letters.forEach(l => {
          l.x += (l.baseX - l.x) * 0.12;
          l.y += (l.baseY - l.y) * 0.12;
          l.angle += (0 - l.angle) * 0.12;
          l.vx = 0;
          l.vy = 0;
          l.vAngle = 0;
          // Smooth lerp scale back to normal
          l.targetScale = 1.0;
          if (l.scale === undefined) l.scale = 1;
          l.scale += (l.targetScale - l.scale) * 0.12;

          const dist = Math.sqrt((l.baseX - l.x) ** 2 + (l.baseY - l.y) ** 2);
          if (dist > 0.2 || Math.abs(l.angle) > 0.01) {
            allResting = false;
          } else {
            l.x = l.baseX;
            l.y = l.baseY;
            l.angle = 0;
          }
        });

        if (allResting) {
          isLerpingRef.current = false;
          letters.forEach(l => l.resting = true);
        }
      } else {
        // 3. Normal Physics Update
        const gravity = 0.35;
        const bounce = 0.55;
        const friction = 0.985;

        letters.forEach(l => {
          // Calculate distance to mouse for zoom hover effect
          const dx = l.x - mousePos.x;
          const dy = l.y - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            l.targetScale = 1.45;
          } else {
            l.targetScale = 1.0;
          }

          if (l.scale === undefined) l.scale = 1.0;

          l.scale += (l.targetScale - l.scale) * 0.12;

          if (l.resting) return;

          // Apply forces
          l.vy += gravity;
          l.vx *= friction;
          l.vy *= friction;
          l.vAngle *= 0.98;

          // Update position & rotation
          l.x += l.vx;
          l.y += l.vy;
          l.angle += l.vAngle;

          // Boundary Collisions
          // Floor
          if (l.y + l.radius > height) {
            l.y = height - l.radius;
            l.vy = -l.vy * bounce;
            l.vx *= 0.9;
            l.vAngle *= 0.9;
          }
          // Roof
          if (l.y - l.radius < 0) {
            l.y = l.radius;
            l.vy = -l.vy * bounce;
          }
          // Left Wall
          if (l.x - l.radius < 0) {
            l.x = l.radius;
            l.vx = -l.vx * bounce;
            l.vAngle *= 0.9;
          }
          // Right Wall
          if (l.x + l.radius > width) {
            l.x = width - l.radius;
            l.vx = -l.vx * bounce;
            l.vAngle *= 0.9;
          }
        });

        // 4. Handle letter-to-letter collisions (Circle collision resolution)
        for (let i = 0; i < letters.length; i++) {
          for (let j = i + 1; j < letters.length; j++) {
            const li = letters[i];
            const lj = letters[j];

            if (li.resting && lj.resting) continue;

            const dx = lj.x - li.x;
            const dy = lj.y - li.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = li.radius + lj.radius;

            if (dist < minDist && dist > 0.01) {
              // Awaken sleeping nodes if hit
              li.resting = false;
              lj.resting = false;

              // Overlap resolution
              const overlap = minDist - dist;
              const nx = dx / dist;
              const ny = dy / dist;

              li.x -= nx * overlap * 0.5;
              li.y -= ny * overlap * 0.5;
              lj.x += nx * overlap * 0.5;
              lj.y += ny * overlap * 0.5;

              // Elastic collision velocities swap
              const kx = li.vx - lj.vx;
              const ky = li.vy - lj.vy;
              const vn = kx * nx + ky * ny;

              if (vn > 0) {
                const impulse = vn * (1 + bounce);
                li.vx -= nx * impulse * 0.5;
                li.vy -= ny * impulse * 0.5;
                lj.vx += nx * impulse * 0.5;
                lj.vy += ny * impulse * 0.5;

                // Transfer spin
                const spinTransfer = (li.vAngle - lj.vAngle) * 0.2;
                li.vAngle -= spinTransfer;
                lj.vAngle += spinTransfer;
              }
            }
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const letters = lettersRef.current;
      const shockwaves = shockwavesRef.current;

      // 1. Draw Shockwaves
      shockwaves.forEach(sw => {
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 51, 255, ${sw.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // 2. Draw Letters
      const fontSize = Math.min(width * 0.11, 130);
      ctx.font = `normal ${fontSize}px 'SS Broad', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";

      letters.forEach(l => {
        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.angle);
        ctx.scale(l.scale || 1.0, l.scale || 1.0);
        ctx.fillText(l.char, 0, 0);
        ctx.restore();
      });
    };

    const loop = () => {
      updatePhysics();
      draw();
      requestRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isDarkMode]);

  // Click handler on Hero zone to create shockwave & apply explosion push forces
  const handleHeroClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // Trigger shockwave animation
    shockwavesRef.current.push({
      x: mx,
      y: my,
      radius: 5,
      maxRadius: 320,
      opacity: 0.8
    });

    // Cancel lerp back if in progress
    isLerpingRef.current = false;

    // Apply push forces
    const letters = lettersRef.current;
    const pushRadius = 480;
    const maxForce = 30;

    letters.forEach(l => {
      const dx = l.x - mx;
      const dy = l.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < pushRadius) {
        l.resting = false;

        // Push normal vector
        const nx = dist > 0.01 ? dx / dist : (Math.random() - 0.5);
        const ny = dist > 0.01 ? dy / dist : (Math.random() - 0.5);

        // Force drops off linearly with distance
        const force = (1 - dist / pushRadius) * maxForce;

        // Distribute force to velocity
        l.vx += nx * force * 1.2;
        l.vy += ny * force * 1.2;

        // Random rotational push
        l.vAngle += (Math.random() - 0.5) * force * 0.08;
      }
    });
  };

  // Double Click handler to trigger smooth lerp back to original positions
  const handleHeroDoubleClick = () => {
    isLerpingRef.current = true;
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <div suppressHydrationWarning className={`w-full min-h-screen flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? "bg-black text-white" : "bg-[#f4f4f0] text-black"
      }`}>

      {/* FIXED NAVBAR */}
      <header className={`w-full sticky top-0 z-50 py-4 px-4 md:py-6 md:px-8 lg:px-10 transition-colors duration-300 ${isDarkMode ? "bg-black/90 backdrop-blur-md text-white" : "bg-[#f4f4f0]/90 backdrop-blur-md text-black"
        }`}>
        <nav className="flex items-center gap-1 sm:gap-2 w-full font-display text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest">
          <a href="#hero" className="whitespace-nowrap px-2 py-1 hover:bg-brand-blue hover:text-white transition-all duration-200">
            hEaD
          </a>
          <a href="#summary" className="whitespace-nowrap px-2 py-1 hover:bg-brand-blue hover:text-white transition-all duration-200">
            SUmMARY
          </a>
          <a href="#skills" className="whitespace-nowrap px-2 py-1 hover:bg-brand-blue hover:text-white transition-all duration-200">
            SkILLS
          </a>
          <a href="#projects" className="whitespace-nowrap px-2 py-1 hover:bg-brand-blue hover:text-white transition-all duration-200">
            PRoJECTS
          </a>

          {/* Separator line with scroll-progress sliding star */}
          <div className="h-px flex-1 mx-2 md:mx-4 relative flex items-center justify-start">
            <div className={`absolute inset-0 h-px transition-colors duration-300 ${isDarkMode ? "bg-white opacity-40" : "bg-black opacity-40"
              }`}></div>
            {/* The sliding star */}
            <div
              style={{ left: `${scrollProgress}%` }}
              className="absolute -translate-x-1/2 w-4 h-4 md:w-5 md:h-5 flex items-center justify-center pointer-events-none select-none transition-all duration-75"
            >
              <img
                src="/star.png"
                alt="Scroll star"
                className={`w-full h-full object-contain transition-all duration-300 ${!isDarkMode ? "invert" : ""
                  }`}
              />
            </div>
          </div>

          {/* Accent blue box */}
          <div className="bg-brand-blue text-white px-3 py-1 font-bold whitespace-nowrap text-[9px] sm:text-[10px] md:text-xs tracking-widest">
            .........
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-1 sm:p-1.5 ml-1 transition-colors duration-200 focus:outline-none flex items-center justify-center ${isDarkMode
              ? 'hover:bg-white/10 text-white hover:text-brand-blue'
              : 'hover:bg-black/10 text-black hover:text-brand-blue'
              }`}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              // Sun Icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.625 1.625M17.775 17.775l1.625 1.625M3 12h2.25m13.5 0H21M4.22 19.78l1.625-1.625M17.775 6.225l1.625-1.625M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            ) : (
              // Moon Icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* SECTION 1: HERO (With HTML5 Canvas physics simulation) */}
      <section
        id="hero"
        onClick={handleHeroClick}
        onDoubleClick={handleHeroDoubleClick}
        className="w-full h-[60vh] md:h-[75vh] relative flex flex-col justify-center items-center px-4 md:px-8 lg:px-10 overflow-hidden select-none cursor-crosshair"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Interactive hints */}
        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-[8px] sm:text-[9px] font-display tracking-widest pointer-events-none opacity-40 uppercase transition-opacity duration-300 text-center`}>
          click to push letters <span className="text-brand-blue mx-1">//</span> double click to align
        </div>
      </section>

      {/* DOUBLE DIVIDER === */}
      <div className="w-full flex flex-col gap-[3px] px-4 md:px-8 lg:px-10">
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
      </div>

      {/* SECTION 2: SUMMARY */}
      <section id="summary" className="w-full px-4 md:px-8 lg:px-10 py-16 md:py-28 select-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
          
          {/* Left Column: Title & Stark Info Panel */}
          <div className={`lg:col-span-4 flex flex-col gap-6 pb-8 lg:pb-0 border-b lg:border-b-0 lg:border-r pr-0 lg:pr-12 transition-colors duration-300 ${
            isDarkMode ? "border-white/10" : "border-black/10"
          }`}>
            <div>
              <h2 className="font-display text-sm md:text-base font-bold tracking-widest text-brand-blue">
                02 / SUmMARY
              </h2>
              <div className="text-[9px] font-display font-light opacity-50 tracking-wider mt-1">// CORE_PROFILE_V2.0</div>
            </div>

            {/* Brutalist Sub-Section Tree Navigation */}
            <div className="flex flex-col gap-2.5 my-2 font-display text-[9px] sm:text-[10px] font-bold tracking-widest">
              <a 
                href="#summary-overview" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("summary-overview")?.scrollIntoView({ behavior: "smooth", block: "center" });
                }} 
                className="flex items-center group hover:text-brand-blue transition-colors"
              >
                <span className="opacity-60 group-hover:opacity-100">└─ OVERVIEW</span>
                <span className={`flex-1 border-b border-dotted mx-2 opacity-20 group-hover:opacity-50 transition-opacity ${isDarkMode ? "border-white" : "border-black"}`}></span>
                <span className="text-[8px] opacity-40 group-hover:opacity-100 font-normal">// 02.1</span>
              </a>
              <a 
                href="#summary-stats" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("summary-stats")?.scrollIntoView({ behavior: "smooth", block: "center" });
                }} 
                className="flex items-center group hover:text-brand-blue transition-colors"
              >
                <span className="opacity-60 group-hover:opacity-100">└─ STATISTICS</span>
                <span className={`flex-1 border-b border-dotted mx-2 opacity-20 group-hover:opacity-50 transition-opacity ${isDarkMode ? "border-white" : "border-black"}`}></span>
                <span className="text-[8px] opacity-40 group-hover:opacity-100 font-normal">// 02.2</span>
              </a>
              <a 
                href="#summary-stack" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("summary-stack")?.scrollIntoView({ behavior: "smooth", block: "center" });
                }} 
                className="flex items-center group hover:text-brand-blue transition-colors"
              >
                <span className="opacity-60 group-hover:opacity-100">└─ TECH STACK</span>
                <span className={`flex-1 border-b border-dotted mx-2 opacity-20 group-hover:opacity-50 transition-opacity ${isDarkMode ? "border-white" : "border-black"}`}></span>
                <span className="text-[8px] opacity-40 group-hover:opacity-100 font-normal">// 02.3</span>
              </a>
            </div>

          </div>

          {/* Right Column: Paragraph, Marquee, Stats Grid & Icons */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Main Paragraph */}
            <p id="summary-overview" className="font-sans text-lg sm:text-xl md:text-2xl font-light leading-relaxed tracking-wide text-justify uppercase">
              CREATIVE DEVELOPER AND DESIGNER SPECIALIZING IN HIGH-CONTRAST INTERFACES, BOLD BRUTALISM, AND INTERACTIVE DIGITAL STORIES. INTEGRATING STARK AESTHETICS WITH METICULOUS MODERN CODE TO SHAPE UNFORGETTABLE DIGITAL JOURNEYS.
            </p>


            {/* Brutalist Stats Grid */}
            <div id="summary-stats" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: "4+", label: "YRS EXPERIENCE" },
                { value: "30+", label: "PROJECTS COMPLETE" },
                { value: "99.9%", label: "SYSTEM UPTIME" },
                { value: "250K+", label: "LINES OF CODE" }
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className={`border p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#0033ff] ${
                    isDarkMode ? "border-white/10 hover:border-white bg-[#0e0e0e]" : "border-black/10 hover:border-black hover:border-brand-blue bg-white"
                  }`}
                >
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-brand-blue tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="font-display text-[8px] sm:text-[9px] font-bold tracking-widest opacity-60 mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Technology Stack Subtitle */}
            <div id="summary-stack" className="flex items-center gap-2 mt-2">
              <div className="h-px bg-brand-blue/30 flex-1"></div>
              <span className="font-display text-[9px] font-bold tracking-widest text-brand-blue">CORE_STACK</span>
              <div className="h-px bg-brand-blue/30 flex-1"></div>
            </div>

            {/* Colored Skill Icons List */}
            <div className="flex flex-wrap gap-4">
              {[
                { name: "PHOTOSHOP", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
                { name: "PREMIERE PRO", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" },
                { name: "JAVASCRIPT", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                { name: "TYPESCRIPT / TSX", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                { name: "DART", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
                { name: "REDIS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
                { name: "PHP", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" }
              ].map((skill, index) => (
                <div 
                  key={index}
                  className={`group relative flex items-center justify-center p-3 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#0033ff] ${
                    isDarkMode 
                      ? "border-white/10 hover:border-white bg-[#0e0e0e]" 
                      : "border-black/10 hover:border-black bg-white"
                  }`}
                >
                  <img 
                    src={skill.iconUrl} 
                    alt={skill.name} 
                    className="w-6 h-6 object-contain"
                  />
                  {/* Brutalist Tooltip */}
                  <span className="absolute -top-9 scale-0 transition-all duration-200 group-hover:scale-100 bg-brand-blue text-white text-[8px] font-display font-bold tracking-widest px-2 py-1.5 whitespace-nowrap z-10 pointer-events-none">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* DOUBLE DIVIDER === */}
      <div className="w-full flex flex-col gap-[3px] px-4 md:px-8 lg:px-10">
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
      </div>

      {/* SECTION 3: SKILLS */}
      <section id="skills" className="w-full px-4 md:px-8 lg:px-10 py-16 md:py-28 select-none">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
          {/* Section ID */}
          <div className="md:col-span-4">
            <h2 className="font-display text-sm md:text-base font-bold tracking-widest">
              03 / SkILLS
            </h2>
          </div>
          {/* Skills Grid */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "TYPOGRAPHY DESIGN",
              "NEXT.JS & REACT 19",
              "WEB APPLICATION DEV",
              "UX/UI BRUTALISM",
              "TAILWIND STYLING",
              "MOTION & ANIMATION",
            ].map((skill, index) => (
              <div
                key={index}
                className={`p-4 border transition-all duration-300 flex items-center justify-between font-display text-[10px] sm:text-xs font-bold tracking-widest hover:bg-brand-blue hover:text-white group ${isDarkMode ? 'border-white/20' : 'border-black/20 hover:border-brand-blue'
                  }`}
              >
                <span>{skill}</span>
                {/* Accent Star inside cards */}
                <img
                  src="/star.png"
                  alt="Star"
                  className={`w-3.5 h-3.5 object-contain transition-all duration-300 group-hover:invert-0 ${!isDarkMode ? 'invert' : ''
                    }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOUBLE DIVIDER === */}
      <div className="w-full flex flex-col gap-[3px] px-4 md:px-8 lg:px-10">
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
      </div>

      {/* SECTION 4: PROJECTS */}
      <section id="projects" className="w-full px-4 md:px-8 lg:px-10 py-16 md:py-28 select-none">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
          {/* Section ID */}
          <div className="md:col-span-4">
            <h2 className="font-display text-sm md:text-base font-bold tracking-widest mb-6 md:mb-0">
              04 / PRoJECTS
            </h2>
          </div>
          {/* Filter and Cards Content */}
          <div className="md:col-span-8 flex flex-col">
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["ALL", "DEVELOPMENT", "DESIGN", "ANIMATION"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 border font-display text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest transition-all duration-300 ${selectedCategory === cat
                      ? "bg-brand-blue text-white border-brand-blue"
                      : isDarkMode
                        ? "border-white/20 hover:border-white text-white hover:bg-white/5"
                        : "border-black/20 hover:border-black text-black hover:bg-black/5"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {PROJECTS_DATA.filter(
                p => selectedCategory === "ALL" || p.category === selectedCategory
              ).map((p) => (
                <div
                  key={p.id}
                  className={`border p-6 flex flex-col justify-between transition-all duration-300 group relative hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0033ff] ${isDarkMode
                      ? "border-white/10 hover:border-white bg-[#0e0e0e]"
                      : "border-black/10 hover:border-black hover:border-brand-blue bg-white"
                    }`}
                >
                  {/* Category & Year */}
                  <div className="flex justify-between items-center mb-4 text-[9px] font-display font-bold tracking-widest opacity-60">
                    <span>{p.category}</span>
                    <span>{p.year}</span>
                  </div>

                  {/* Live Web Preview Frame */}
                  {p.liveUrl && (
                    <IframePreview src={p.liveUrl} title={p.title} />
                  )}

                  {/* Title & Description */}
                  <div className="mb-6">
                    <h3 className="font-display text-sm sm:text-base font-bold tracking-wider mb-2 group-hover:text-brand-blue transition-colors">
                      {p.title}
                    </h3>
                    <p className="font-sans text-[11px] sm:text-xs font-light leading-relaxed opacity-85">
                      {p.desc}
                    </p>
                  </div>

                  {/* Footer tags and Arrow */}
                  <div className="flex justify-between items-end mt-auto pt-4 border-t border-dashed border-neutral-800">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[8px] font-display tracking-widest px-2 py-0.5 border ${isDarkMode
                              ? "border-white/10 text-white/60 bg-[#161616]"
                              : "border-black/10 text-black/60 bg-neutral-100"
                            }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Arrow */}
                    <div className="text-brand-blue font-bold text-base sm:text-lg group-hover:translate-x-1.5 transition-transform duration-300">
                      →
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* DOUBLE DIVIDER === */}
      <div className="w-full flex flex-col gap-[3px] px-4 md:px-8 lg:px-10">
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
        <div className={`h-px w-full transition-colors duration-300 ${isDarkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`}></div>
      </div>

      {/* FOOTER */}
      <footer className="w-full px-4 md:px-8 lg:px-10 py-12 md:py-16 text-center select-none">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] sm:text-[10px] md:text-xs font-display tracking-widest font-bold opacity-60">
          <div>© {new Date().getFullYear()} LLLYUE. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-4">
            <a href="#hero" className="hover:text-brand-blue transition-colors">BACK TO TOP</a>
            <span>//</span>
            <span className="text-brand-blue">STARK BRUTALISM CONCEPT</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
