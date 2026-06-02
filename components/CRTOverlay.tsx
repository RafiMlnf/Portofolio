"use client";

import React from "react";

/**
 * CRTOverlay — Full-screen VHS/CRT aesthetic overlay.
 * Creates the illusion of a convex CRT screen through layered effects:
 *  - Heavy edge darkening (inset shadows) that simulate curved glass depth
 *  - Center highlight that makes the screen appear to bulge outward
 *  - Fine scanlines
 *  - Rolling CRT refresh band
 *  - Dreamy VHS glow bloom
 *  - Animated noise grain
 *  - Rounded CRT bezel edges
 */

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

interface CRTOverlayProps {
  enabled: boolean;
}

export default function CRTOverlay({ enabled }: CRTOverlayProps) {
  if (!enabled) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9997, borderRadius: "22px" }}
      aria-hidden="true"
    >
      {/* ── Layer 1: Fine horizontal scanlines ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.028) 2px, rgba(0,0,0,0.028) 4px)",
          animation: "crt-flicker 9s ease-in-out infinite",
        }}
      />

      {/* ── Layer 2: CRT rolling refresh band ── */}
      <div
        className="absolute inset-x-0"
        style={{
          height: "28%",
          top: 0,
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.018) 45%, rgba(255,255,255,0.012) 55%, transparent)",
          animation: "crt-roll 10s linear infinite",
          willChange: "transform",
        }}
      />

      {/* ── Layer 3: VHS dreamy glow bloom ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 28% 38%, rgba(140,70,255,0.055) 0%, transparent 55%), radial-gradient(ellipse at 72% 62%, rgba(0,210,255,0.04) 0%, transparent 50%), radial-gradient(ellipse at 50% 20%, rgba(255,120,200,0.025) 0%, transparent 40%)",
          mixBlendMode: "screen",
          animation: "crt-glow-pulse 7s ease-in-out infinite alternate",
        }}
      />

      {/* ── Layer 4: Noise / grain ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: NOISE_SVG,
          backgroundSize: "256px 256px",
          opacity: 0.045,
          animation: "crt-noise 0.45s steps(1) infinite",
          willChange: "transform",
        }}
      />

      {/* ── Layer 5: CRT convex glass curvature ──
           Heavy, layered inset shadows darken the edges progressively,
           creating the illusion of curved glass receding at the edges.
           This is the primary visual cue for CRT curvature. */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: "22px",
          boxShadow: [
            // Deepest outer edge (bezel shadow)
            "inset 0 0 200px 80px rgba(0,0,0,0.6)",
            // Mid shadow layer
            "inset 0 0 100px 40px rgba(0,0,0,0.4)",
            // Inner shadow layer
            "inset 0 0 50px 15px rgba(0,0,0,0.35)",
            // Tight edge darkening
            "inset 0 0 20px 5px rgba(0,0,0,0.5)",
          ].join(", "),
        }}
      />

      {/* ── Layer 6: Glass highlight / convex center bulge ──
           A bright radial "hot spot" in the upper-center area simulates
           light reflecting off the protruding curved glass surface.
           This makes the center appear closer (convex). */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: "22px",
          background: [
            // Main center highlight
            "radial-gradient(ellipse 70% 45% at 50% 40%, rgba(255,255,255,0.04) 0%, transparent 70%)",
            // Subtle secondary bottom-center glow
            "radial-gradient(ellipse 50% 30% at 50% 85%, rgba(255,255,255,0.015) 0%, transparent 60%)",
          ].join(", "),
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Layer 7: Vertical edge gradient (left & right darkening) ──
           Additional horizontal darkening at the sides to reinforce the
           "curved toward edges" look that CRT screens have. */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: "22px",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.25) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* ── Layer 8: Horizontal edge gradient (top & bottom darkening) ── */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: "22px",
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.2) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.2) 100%)",
        }}
      />
    </div>
  );
}
