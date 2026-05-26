"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";

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
  const lastX = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  const edgeCooldown = useRef(false);

  // Rotation spring lives in Framer Motion (that lag is fine — it's intentional feel)
  const targetRotation = useMotionValue(0);
  const rotation = useSpring(targetRotation, { stiffness: 80, damping: 18, mass: 1 });

  const handleMove = useCallback(
    (e: MouseEvent) => {
      // ── INSTANT position via direct DOM write ────────────────────
      if (wrapperRef.current) {
        wrapperRef.current.style.transform =
          `translate(${e.clientX - HALF}px, ${e.clientY - HALF}px)`;
      }

      // ── Edge detection (Hero section only) ──────────────────────
      const inHeroSection = window.scrollY < window.innerHeight;
      if (!edgeCooldown.current && inHeroSection) {
        let dir: "left" | "right" | "top" | "bottom" | null = null;
        if (e.clientX <= EDGE_THRESHOLD) dir = "left";
        else if (e.clientX >= window.innerWidth - EDGE_THRESHOLD) dir = "right";
        else if (e.clientY <= EDGE_THRESHOLD) dir = "top";
        else if (e.clientY >= window.innerHeight - EDGE_THRESHOLD) dir = "bottom";
        if (dir) {
          onEdgeHit(dir);
          edgeCooldown.current = true;
          setTimeout(() => { edgeCooldown.current = false; }, 600);
        }
      }

      // ── Directional rotation (spring, intentional latency) ───────
      const now = performance.now();
      if (lastX.current !== null && lastTime.current !== null) {
        const dt = now - lastTime.current;
        if (dt > 0) {
          const velocity = (e.clientX - lastX.current) / dt;
          const clamped = Math.max(-1, Math.min(1, velocity * 0.70));
          targetRotation.set(clamped * 160);
        }
      }
      lastX.current = e.clientX;
      lastTime.current = now;

      // ── Idle detection ───────────────────────────────────────────
      setIsMoving(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setIsMoving(false);
        targetRotation.set(0);
      }, 200);
    },
    [onEdgeHit, targetRotation],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [handleMove]);

  return (
    // Wrapper: position-only, updated by raw DOM write (no RAF lag)
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
        // Start off-screen
        transform: `translate(-200px, -200px)`,
        willChange: "transform",
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
        <Image
          src="/star.png"
          alt="cursor"
          width={SIZE}
          height={SIZE}
          style={{
            display: "block",
            userSelect: "none",
          }}
          priority
        />
      </motion.div>
    </div>
  );
}
