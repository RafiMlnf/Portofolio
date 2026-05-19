"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const statuses = [
  "PORTOFOLIO",
  "DOTS",
  "RAFI MAULANA FIRDAUS",
  "CREATIVE DEV"
];

const GlitchChar = ({ char, isUpper }: { char: string, isUpper: boolean }) => {
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
    }, 1000); // Change exactly every 0.5 seconds simultaneously
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
  const [index, setIndex] = useState(0);
  const [boxWidth, setBoxWidth] = useState<number>(100);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % statuses.length);
    }, 4500); // 4.5 seconds per status to enjoy the slow glitch
    return () => clearInterval(interval);
  }, []);

  const currentStatus = statuses[index];

  // Live width measurement of the dynamic glitching text
  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
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
              key={currentStatus}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center"
            >
              {currentStatus === "DOTS" ? (
                <div className="flex gap-1 items-center justify-center">
                  <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0 }} className="inline-block">.</motion.span>
                  <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="inline-block">.</motion.span>
                  <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="inline-block">.</motion.span>
                </div>
              ) : (
                <ScrambleText text={currentStatus} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
