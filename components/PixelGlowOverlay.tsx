"use client";

import { useEffect, useRef } from "react";

const CELL = 64;          // px per grid square (larger pixel blocks)
const RADIUS = 260;       // glow radius in px
const MAX_ALPHA = 0.12;   // softer, dimmer peak brightness

export default function PixelGlowOverlay({ isDarkMode }: { isDarkMode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 }); // viewport coordinates
  const rafId = useRef<number | null>(null);
  const scrollYRef = useRef(0);
  const isDarkModeRef = useRef(isDarkMode);

  useEffect(() => {
    isDarkModeRef.current = isDarkMode;
  }, [isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fixed canvas = always viewport size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Store mouse in raw viewport coordinates (clientX, clientY)
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const vmx = mouse.current.x;
      const vmy = mouse.current.y;

      if (vmx < -999) {
        rafId.current = requestAnimationFrame(draw);
        return;
      }

      const color = isDarkModeRef.current ? "255,255,255" : "0,51,255";
      const scrollY = scrollYRef.current;

      const mx = vmx;
      const my = vmy + scrollY;

      // Only iterate rows visible in viewport + RADIUS buffer (in document space)
      const rowStart = Math.floor((scrollY - RADIUS) / CELL);
      const rowEnd   = Math.ceil((scrollY + h + RADIUS) / CELL);
      const cols = Math.ceil(w / CELL) + 1;

      for (let row = rowStart; row <= rowEnd; row++) {
        for (let col = 0; col < cols; col++) {
          // Cell center in DOCUMENT space (static, anchored to page)
          const cx_doc = col * CELL + CELL / 2;
          const cy_doc = row * CELL + CELL / 2;

          const dx = cx_doc - mx;
          const dy = cy_doc - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > RADIUS) continue;

          const t = 1 - dist / RADIUS;
          const alpha = MAX_ALPHA * t * t * t;

          // Convert document Y → viewport Y for drawing on fixed canvas
          const vy = row * CELL + 2 - scrollY;
          if (vy + CELL - 4 < 0 || vy > h) continue; // off-screen

          const size = CELL - 4;
          ctx.fillStyle = `rgba(${color},${alpha.toFixed(4)})`;
          ctx.fillRect(col * CELL + 2, vy, size, size);
        }
      }

      rafId.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    rafId.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none select-none"
      style={{ top: 0, left: 0, zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
