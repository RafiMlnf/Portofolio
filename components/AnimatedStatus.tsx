"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const TEXTS = [
  "PORTOFOLIO",
  "RAFI MAULANA FIRDAUS",
  "CREATIVE DEV",
  "HELLO, WELCOME",
  "APA KABAR?",
  "KEREN YAK???",
  "; )"
];

const DOTS_KEY = "DOTS";
const DOTS_CHANCE = 0.33;
const TEXT_DURATION = 4500; // ms — regular texts stay this long
const DOTS_DURATION = 2000; // ms — dots only flash for 2s

/**
 * - If current is DOTS → must pick a text (no consecutive DOTS)
 * - Otherwise → 33% DOTS, 67% from TEXTS excluding current
 */
function pickNext(currentKey: string): string {
  if (currentKey === DOTS_KEY) {
    return TEXTS[Math.floor(Math.random() * TEXTS.length)];
  }
  if (Math.random() < DOTS_CHANCE) return DOTS_KEY;
  const pool = TEXTS.filter((t) => t !== currentKey);
  return pool[Math.floor(Math.random() * pool.length)];
}

const GlitchChar = ({ char, isUpper }: { char: string; isUpper: boolean }) => {
  if (char === " ") return <span className="inline-block w-1 sm:w-1.5"></span>;
  return (
    <motion.span
      layout
      transition={{ duration: 0.4, ease: "easeInOut" }}
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
    const interval = setInterval(() => {
      setCases(text.split("").map(() => Math.random() > 0.5));
    }, 1000);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <div className="flex items-center">
      {text.split("").map((char, i) => (
        <GlitchChar key={`${text}-${i}`} char={char} isUpper={cases[i] ?? true} />
      ))}
    </div>
  );
};

export default function AnimatedStatus() {
  const [current, setCurrent] = useState<string>(TEXTS[0]);
  const [boxWidth, setBoxWidth] = useState<number>(100);
  const contentRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Recursive variable-duration scheduler
  useEffect(() => {
    const schedule = (key: string) => {
      const delay = key === DOTS_KEY ? DOTS_DURATION : TEXT_DURATION;
      timerRef.current = setTimeout(() => {
        const next = pickNext(key);
        setCurrent(next);
        schedule(next);
      }, delay);
    };

    schedule(current);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live width measurement
  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setBoxWidth(entry.target.getBoundingClientRect().width);
      }
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      animate={{ width: boxWidth }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-brand-blue text-white font-bold text-[9px] sm:text-[10px] md:text-xs tracking-widest overflow-hidden relative flex items-center justify-center"
      style={{ height: "24px" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={contentRef} className="w-max flex items-center justify-center px-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center"
            >
              {current === DOTS_KEY ? (
                <div className="flex gap-1 items-center justify-center">
                  <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0 }} className="inline-block">.</motion.span>
                  <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="inline-block">.</motion.span>
                  <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="inline-block">.</motion.span>
                </div>
              ) : (
                <ScrambleText text={current} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
