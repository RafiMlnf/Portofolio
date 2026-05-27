"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface CustomCursorProps {
  isDarkMode: boolean;
  onEdgeHit: (dir: "left" | "right" | "top" | "bottom") => void;
}

const EDGE_THRESHOLD = 4;
const SIZE = 24;
const HALF = SIZE / 2;

export default function CustomCursor({ isDarkMode, onEdgeHit }: CustomCursorProps) {
  // Raw DOM ref — position updated DIRECTLY, zero React overhead
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isMoving, setIsMoving] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Mouse position and velocity tracking refs
  const mousePos = useRef({ x: -200, y: -200 });
  const lastX = useRef<number | null>(null);
  const lastY = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  const edgeCooldown = useRef(false);
  const rafId = useRef<number | null>(null);

  // Rotation spring lives in Framer Motion
  const targetRotation = useMotionValue(0);
  const rotation = useSpring(targetRotation, { stiffness: 80, damping: 18, mass: 1 });

  // Update positions inside requestAnimationFrame (RAF) for buttery smooth cursor rendering
  const updatePosition = useCallback(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translate3d(${mousePos.current.x - HALF}px, ${mousePos.current.y - HALF}px, 0)`;
    }
    rafId.current = null;
  }, []);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Make visible once mouse actually moves inside window
      if (wrapperRef.current && wrapperRef.current.style.opacity !== "1") {
        wrapperRef.current.style.opacity = "1";
      }

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updatePosition);
      }

      // Calculate velocity (pixels per millisecond)
      const now = performance.now();
      let vx = 0;
      let vy = 0;
      if (lastX.current !== null && lastY.current !== null && lastTime.current !== null) {
        const dt = now - lastTime.current;
        if (dt > 0) {
          vx = (e.clientX - lastX.current) / dt;
          vy = (e.clientY - lastY.current) / dt;
          
          // Directional rotation (using vx)
          const clamped = Math.max(-1, Math.min(1, vx * 0.70));
          targetRotation.set(clamped * 160);
        }
      }
      lastX.current = e.clientX;
      lastY.current = e.clientY;
      lastTime.current = now;

      // ── Edge detection (Hero section only, require fast hitting velocity) ──────────────────────
      const inHeroSection = window.scrollY < window.innerHeight;
      if (!edgeCooldown.current && inHeroSection) {
        let dir: "left" | "right" | "top" | "bottom" | null = null;
        
        // Only trigger shake if cursor is hitting the edge with a velocity above 0.85 px/ms (fast sweep)
        const VELOCITY_THRESHOLD = 0.85;

        if (e.clientX <= EDGE_THRESHOLD && vx < -VELOCITY_THRESHOLD) {
          dir = "left";
        } else if (e.clientX >= window.innerWidth - EDGE_THRESHOLD && vx > VELOCITY_THRESHOLD) {
          dir = "right";
        } else if (e.clientY <= EDGE_THRESHOLD && vy < -VELOCITY_THRESHOLD) {
          dir = "top";
        } else if (e.clientY >= window.innerHeight - EDGE_THRESHOLD && vy > VELOCITY_THRESHOLD) {
          dir = "bottom";
        }

        if (dir) {
          onEdgeHit(dir);
          edgeCooldown.current = true;
          setTimeout(() => { edgeCooldown.current = false; }, 600);
        }
      }

      // ── Idle detection ───────────────────────────────────────────
      setIsMoving(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setIsMoving(false);
        targetRotation.set(0);
      }, 200);
    },
    [onEdgeHit, targetRotation, updatePosition],
  );

  useEffect(() => {
    // Listen to mousemove on window
    window.addEventListener("mousemove", handleMove);

    // Hide when cursor leaves the document/viewport area
    const handleMouseLeave = () => {
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = "0";
      }
    };
    
    // Show when cursor enters the document/viewport area
    const handleMouseEnter = () => {
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = "1";
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleMove]);

  return (
    // Wrapper: position-only, updated by GPU-accelerated translate3d on RAF
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        pointerEvents: "none",
        zIndex: 99999,
        mixBlendMode: "difference",
        transform: `translate3d(-200px, -200px, 0)`,
        willChange: "transform",
        opacity: 0, // start hidden to prevent flash of cursor
        transition: "opacity 0.1s ease",
      }}
    >
      {/* Inner motion.div: handles ONLY rotation spring + idle scale twitch */}
      <motion.div
        animate={isMoving ? { scale: 1 } : { scale: [1, 1.3, 1] }}
        transition={
          isMoving
            ? { duration: 0 }
            : {
                scale: {
                  duration: 1.6,
                  repeat: Infinity,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.063, 0.156],
                  repeatDelay: 0.9,
                },
              }
        }
        style={{
          rotate: rotation,
          width: SIZE,
          height: SIZE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/star.png"
          alt="cursor"
          width={SIZE}
          height={SIZE}
          style={{
            display: "block",
            userSelect: "none",
          }}
        />
      </motion.div>
    </div>
  );
}
