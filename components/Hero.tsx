"use client";

import React, { useEffect, useRef, useState } from "react";

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
  color: string;
}

interface Flare {
  id: number;
  x: number;
  y: number;
  primary: string;
  secondary: string;
}

const FLARE_SCHEMES = [
  { primary: "rgb(0, 240, 255)", secondary: "rgb(255, 0, 180)" },   // Cyan & Magenta
  { primary: "rgb(0, 255, 100)", secondary: "rgb(255, 230, 0)" },   // Lime & Yellow
  { primary: "rgb(255, 240, 0)",   secondary: "rgb(255, 30, 0)" },    // Acid Yellow & Red
  { primary: "rgb(160, 0, 255)", secondary: "rgb(255, 0, 128)" },   // Toxic Purple & Pink
  { primary: "rgb(255, 0, 128)", secondary: "rgb(255, 100, 0)" },   // Hot Pink & Bright Orange
  { primary: "rgb(0, 255, 200)", secondary: "rgb(0, 60, 255)" }     // Mint Green & Electric Blue
];

export default function Hero({ isDarkMode }: { isDarkMode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [flares, setFlares] = useState<Flare[]>([]);
  const flareIdRef = useRef(0);

  // Physics states ref
  const lettersRef = useRef<Letter[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const isLerpingRef = useRef(false);
  const requestRef = useRef<number | null>(null);

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

      // Scale resolution down (half DPR) to avoid lag on high-DPI/Retina/Full HD screens
      const dpr = Math.max(1, (window.devicePixelRatio || 1) * 0.5);
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
          opacity: sw.opacity - 0.05,
          color: sw.color
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
        // Replace HSL with HSLA for opacity rendering
        ctx.strokeStyle = sw.color.replace("hsl", "hsla").replace(")", `, ${sw.opacity})`);
        ctx.lineWidth = 2.5;
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

    // Generate dynamic colors based on isDarkMode (poster electric blue & white for dark mode)
    let primaryColor = "";
    let secondaryColor = "";

    if (isDarkMode) {
      // Electric Blue (around 228) and White/Ice-blue
      const blueHue = 228 + (Math.random() - 0.5) * 8; // 224 to 232 (electric blue)
      primaryColor = `hsl(${blueHue}, 100%, 50%)`;
      secondaryColor = Math.random() > 0.5 ? "rgb(255, 255, 255)" : `hsl(${blueHue}, 100%, 82%)`;
    } else {
      // CMYK subtractive colors: vibrant randomized HSL spectrum
      const hue1 = Math.floor(Math.random() * 360);
      const hue2 = (hue1 + 60 + Math.floor(Math.random() * 120)) % 360;
      primaryColor = `hsl(${hue1}, 100%, 50%)`;
      secondaryColor = `hsl(${hue2}, 100%, 50%)`;
    }

    // Trigger shockwave animation (canvas ring)
    shockwavesRef.current.push({
      x: mx,
      y: my,
      radius: 5,
      maxRadius: 320,
      opacity: 0.8,
      color: primaryColor
    });

    // Trigger iridescent flare burst (DOM overlay)
    const id = flareIdRef.current++;
    setFlares(prev => [...prev, {
      id,
      x: e.clientX,
      y: e.clientY,
      primary: primaryColor,
      secondary: secondaryColor
    }]);
    setTimeout(() => {
      setFlares(prev => prev.filter(f => f.id !== id));
    }, 500);

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

  return (
    <section
      id="hero"
      onClick={handleHeroClick}
      onDoubleClick={handleHeroDoubleClick}
      className="w-full h-[60vh] md:h-[75vh] relative flex flex-col justify-center items-center px-4 md:px-8 lg:px-10 overflow-hidden select-none cursor-crosshair"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />

      {/* Iridescent Flare Bursts (DOM overlay, fixed to viewport) */}
      {flares.map(flare => {
        const blendMode = isDarkMode ? "plus-lighter" : "multiply";
        const brightnessVal = isDarkMode ? "3" : "0.95";
        const saturateVal = isDarkMode ? "3" : "2";

        return (
          <div
            key={flare.id}
            className="flare-burst pointer-events-none"
            style={{
              position: "fixed",
              left: flare.x,
              top: flare.y,
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
            }}
          >
            {/* Concentric Additive/Subtractive Layers */}
            <div 
              className="flare-core-white" 
              style={{
                mixBlendMode: blendMode,
                background: isDarkMode 
                  ? "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 50%, transparent 100%)"
                  : "radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 50%, transparent 100%)",
                filter: isDarkMode 
                  ? "blur(2px) brightness(3.5) drop-shadow(0 0 10px rgba(255, 255, 255, 1))"
                  : "blur(2px) brightness(0.8) drop-shadow(0 0 10px rgba(0, 0, 0, 0.45))"
              }}
            />
            
            <div 
              className="flare-core-cyan" 
              style={{
                mixBlendMode: blendMode,
                background: `radial-gradient(circle, ${flare.primary} 0%, ${flare.primary} 35%, transparent 100%)`,
                filter: isDarkMode
                  ? `blur(4px) brightness(${brightnessVal}) saturate(${saturateVal}) drop-shadow(0 0 12px ${flare.primary})`
                  : `blur(4px) brightness(${brightnessVal}) saturate(${saturateVal})`
              }}
            />
            
            <div 
              className="flare-core-magenta" 
              style={{
                mixBlendMode: blendMode,
                background: `radial-gradient(circle, ${flare.secondary} 0%, ${flare.secondary} 35%, transparent 100%)`,
                filter: isDarkMode
                  ? `blur(8px) brightness(${brightnessVal}) saturate(${saturateVal}) drop-shadow(0 0 18px ${flare.secondary})`
                  : `blur(8px) brightness(${brightnessVal}) saturate(${saturateVal})`
              }}
            />
            
            <div 
              className="flare-halo" 
              style={{
                mixBlendMode: blendMode,
                background: `radial-gradient(circle, ${flare.primary} 0%, ${flare.secondary} 50%, transparent 80%)`,
                filter: isDarkMode
                  ? `blur(3px) brightness(2.5) saturate(2)`
                  : `blur(3px) brightness(0.9) saturate(1.8)`
              }}
            />
            
            <div 
              className="flare-streak" 
              style={{
                mixBlendMode: blendMode,
                background: isDarkMode
                  ? `linear-gradient(90deg, transparent 0%, ${flare.primary} 15%, rgba(255, 255, 255, 1) 40%, ${flare.secondary} 50%, rgba(255, 255, 255, 1) 60%, ${flare.primary} 85%, transparent 100%)`
                  : `linear-gradient(90deg, transparent 0%, ${flare.primary} 15%, rgba(0, 0, 0, 1) 40%, ${flare.secondary} 50%, rgba(0, 0, 0, 1) 60%, ${flare.primary} 85%, transparent 100%)`,
                filter: isDarkMode
                  ? `blur(0.5px) brightness(3) saturate(2.5) drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))`
                  : `blur(0.5px) brightness(0.95) saturate(2.2)`
              }}
            />
          </div>
        );
      })}

      {/* Interactive hints */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[8px] sm:text-[9px] font-display tracking-widest pointer-events-none opacity-40 uppercase transition-opacity duration-300 text-center`}>
        click to push letters <span className="text-brand-blue mx-1">//</span> double click to align
      </div>
    </section>
  );
}
