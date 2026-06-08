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
  dots?: Array<{ x: number; y: number; maxRadius: number }>;
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
  const textCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [flares, setFlares] = useState<Flare[]>([]);
  const flareIdRef = useRef(0);

  // Physics states ref
  const lettersRef = useRef<Letter[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const isLerpingRef = useRef(false);
  const requestRef = useRef<number | null>(null);
  // Stable anchor assignment: letterIndex → anchorIndex (random, assigned once per movement burst)
  const trackLineMapRef = useRef<Map<number, number>>(new Map());

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

        // Pre-calculate local halftone dots
        const dotsList: Array<{ x: number; y: number; maxRadius: number }> = [];
        const pad = 20;
        const offW = Math.ceil(charWidth + pad * 2);
        const offH = Math.ceil(fontSize + pad * 2);

        const offscreen = document.createElement("canvas");
        offscreen.width = offW;
        offscreen.height = offH;
        const octx = offscreen.getContext("2d");
        if (octx) {
          octx.font = `normal ${fontSize}px 'SS Broad', sans-serif`;
          octx.textAlign = "center";
          octx.textBaseline = "middle";
          octx.fillStyle = "white";
          octx.fillText(m.char, offW / 2, offH / 2);

          const imgData = octx.getImageData(0, 0, offW, offH);
          const data = imgData.data;

          const step = 10; // grid step size for dots
          const maxDotRadius = step * 0.5;

          for (let py = 0; py < offH; py += step) {
            for (let px = 0; px < offW; px += step) {
              const idx = (py * offW + px) * 4;
              const alpha = data[idx + 3];
              if (alpha > 35) {
                dotsList.push({
                  x: px - offW / 2,
                  y: py - offH / 2,
                  maxRadius: (alpha / 255) * maxDotRadius
                });
              }
            }
          }
        }

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
          resting: true,
          dots: dotsList
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

      // Setup/resize the offscreen text canvas
      if (!textCanvasRef.current) {
        textCanvasRef.current = document.createElement("canvas");
      }
      textCanvasRef.current.width = canvas.width;
      textCanvasRef.current.height = canvas.height;
      const tctx = textCanvasRef.current.getContext("2d");
      if (tctx) {
        tctx.setTransform(1, 0, 0, 1, 0, 0);
        tctx.scale(dpr, dpr);
      }

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
      const textCanvas = textCanvasRef.current;
      const tctx = textCanvas?.getContext("2d");

      if (tctx) {
        // Clear the offscreen buffer canvas first
        tctx.clearRect(0, 0, width, height);

        const fontSize = Math.min(width * 0.11, 130);
        tctx.font = `normal ${fontSize}px 'SS Broad', sans-serif`;
        tctx.textAlign = "center";
        tctx.textBaseline = "middle";

        const cursorRadius = 140; // proximity radius for dots
        const cutoutRadius = 110; // solid letter cutout radius (smaller to overlap dots)

        if (mousePos.x !== -1000) {
          // ── A. DRAW SOLID LETTERS WITH HOLE ON BUFFER ──
          tctx.save();
          tctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
          letters.forEach(l => {
            tctx.save();
            tctx.translate(l.x, l.y);
            tctx.rotate(l.angle);
            tctx.scale(l.scale || 1.0, l.scale || 1.0);
            tctx.fillText(l.char, 0, 0);
            tctx.restore();
          });

          // Cut a hole using destination-out with a very narrow gradient around cutoutRadius to ensure smooth vector edge without dark glow
          tctx.globalCompositeOperation = "destination-out";
          const grad = tctx.createRadialGradient(
            mousePos.x, mousePos.y, cutoutRadius - 4,
            mousePos.x, mousePos.y, cutoutRadius + 4
          );
          grad.addColorStop(0, "rgba(0, 0, 0, 1.0)");
          grad.addColorStop(1, "rgba(0, 0, 0, 0.0)");
          tctx.fillStyle = grad;
          tctx.beginPath();
          tctx.arc(mousePos.x, mousePos.y, cutoutRadius + 4, 0, Math.PI * 2);
          tctx.fill();
          tctx.restore();

          // ── B. DRAW HALFTONE DOTS INSIDE THE HOLE ON BUFFER ──
          tctx.save();
          tctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
          letters.forEach(l => {
            if (!l.dots) return;

            const cos = Math.cos(l.angle);
            const sin = Math.sin(l.angle);
            const s = l.scale || 1.0;

            l.dots.forEach(d => {
              // Project relative dot coordinate to global canvas coordinates
              const gx = l.x + (d.x * cos - d.y * sin) * s;
              const gy = l.y + (d.x * sin + d.y * cos) * s;

              // Distance to mouse position
              const dx = gx - mousePos.x;
              const dy = gy - mousePos.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < cursorRadius) {
                // Proximity factor: 1 at cursor center, 0 at boundary
                const proximity = 1.0 - (dist / cursorRadius);
                // Scale size: 2.2x at center, tapering down to 0 at boundary
                const r = d.maxRadius * proximity * 2.2;

                tctx.beginPath();
                tctx.arc(gx, gy, r, 0, Math.PI * 2);
                tctx.fill();
              }
            });
          });
          tctx.restore();
        } else {
          // Draw normal solid letters without any mouse interaction
          tctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
          letters.forEach(l => {
            tctx.save();
            tctx.translate(l.x, l.y);
            tctx.rotate(l.angle);
            tctx.scale(l.scale || 1.0, l.scale || 1.0);
            tctx.fillText(l.char, 0, 0);
            tctx.restore();
          });
        }

        // Draw the composed text from buffer canvas onto main canvas
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform for exact pixel match
        ctx.drawImage(textCanvas!, 0, 0);
        ctx.restore();
      }

      // 3. ── TRACK BOX VFX ──────────────────────────────────────────────────
      // Active only when letters are GENUINELY moving:
      //  - Post-explosion: speed must exceed threshold (ignores idle-settled letters)
      //  - Lerp-back (double-click): check displacement from base instead (vx/vy are 0 during lerp)
      const movingLetters = letters.filter(l => {
        if (l.resting) return false;
        const speed = Math.sqrt(l.vx * l.vx + l.vy * l.vy);
        const distFromBase = Math.sqrt(
          (l.x - l.baseX) * (l.x - l.baseX) + (l.y - l.baseY) * (l.y - l.baseY)
        );
        return speed > 1.5 || (isLerpingRef.current && distFromBase > 8);
      });

      if (movingLetters.length > 0) {
        const t = Date.now() / 1000;

        // Organic flicker: layered sines + rare random dropout spikes
        const slow    = Math.sin(t * 2.1)  * 0.10;
        const fast    = Math.sin(t * 17.3) * 0.07;
        const spike   = Math.sin(t * 43.1) * 0.05;
        const dropout = Math.random() < 0.04 ? -(Math.random() * 0.45) : 0;
        const flicker = Math.max(0.15, Math.min(1.0, 0.72 + slow + fast + spike + dropout));

        // HUD color: neutral light gray/off-white for dark mode, near-black for light mode
        const [tr, tg, tb] = isDarkMode ? [220, 220, 220] : [15, 15, 15];
        const tc = (a: number) => `rgba(${tr},${tg},${tb},${(a * flicker).toFixed(2)})`;

        // Fast fill flicker (evaluates per-frame)
        const fillOpacity = (0.04 + Math.random() * 0.08) * flicker;
        const fillStyle = `rgba(${tr}, ${tg}, ${tb}, ${fillOpacity.toFixed(3)})`;

        const fontSize = Math.min(width * 0.11, 130);
        const halfH = fontSize / 2;
        const padX  = 10;
        const padY  = 6;
        const cLen  = Math.min(width * 0.018, 14); // corner bracket length

        // Helper: draw L-shaped corner brackets from 3 points
        const drawBracket = (pts: [number, number][]) => {
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          ctx.lineTo(pts[1][0], pts[1][1]);
          ctx.lineTo(pts[2][0], pts[2][1]);
          ctx.stroke();
        };

        // ── Fixed anchor points (canvas-edge proxies for page landmarks) ─────
        // Top edge = navbar zone, sides = page edges, bottom = footer/status area
        const anchors: { x: number; y: number }[] = [
          { x: width * 0.50, y: 0 },             // Navbar center
          { x: width * 0.88, y: 0 },             // Dark mode icon (top-right)
          { x: width * 0.12, y: 0 },             // Animated status / logo (top-left)
          { x: width * 0.28, y: 0 },             // Nav link left cluster
          { x: width * 0.72, y: 0 },             // Nav link right cluster
          { x: 0,            y: height * 0.30 }, // Left side upper
          { x: width,        y: height * 0.30 }, // Right side upper
          { x: 0,            y: height * 0.65 }, // Left side lower
          { x: width,        y: height * 0.65 }, // Right side lower
          { x: 0,            y: 0 },             // Top-left corner
          { x: width,        y: 0 },             // Top-right corner
          { x: 0,            y: height },        // Bottom-left (status area)
          { x: width * 0.50, y: height },        // Bottom center
          { x: width,        y: height },        // Bottom-right corner
        ];

        const tlMap = trackLineMapRef.current;

        // Remove anchor entries for letters that stopped moving
        letters.forEach((l, idx) => {
          if (!movingLetters.includes(l)) tlMap.delete(idx);
        });

        // Assign a random anchor to each newly-active letter (stable per burst)
        movingLetters.forEach(l => {
          const idx = letters.indexOf(l);
          if (!tlMap.has(idx)) {
            tlMap.set(idx, Math.floor(Math.random() * anchors.length));
          }
        });

        // ── TRACKING LINES (drawn first, behind brackets) ─────────────────────
        movingLetters.forEach(l => {
          const idx = letters.indexOf(l);
          const anchorIdx = tlMap.get(idx);
          if (anchorIdx === undefined) return;

          const anchor = anchors[anchorIdx];
          const sc = l.scale || 1;
          const bx = l.x - (l.width / 2) * sc - padX;
          const by = l.y - halfH * sc - padY;
          const bw = l.width * sc + padX * 2;
          const bh = halfH * 2 * sc + padY * 2;

          // Find the nearest track-box corner to the anchor
          const corners: [number, number][] = [
            [bx,      by],
            [bx + bw, by],
            [bx,      by + bh],
            [bx + bw, by + bh],
          ];
          const [nearX, nearY] = corners.reduce<[number, number]>((best, c) =>
            Math.hypot(c[0] - anchor.x, c[1] - anchor.y) <
            Math.hypot(best[0] - anchor.x, best[1] - anchor.y) ? c : best,
            corners[0]
          );

          ctx.save();

          // Dashed tracking line from box corner to anchor
          ctx.strokeStyle = tc(0.85);
          ctx.lineWidth = 0.75;
          ctx.setLineDash([3, 7]);
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(nearX, nearY);
          ctx.lineTo(anchor.x, anchor.y);
          ctx.stroke();
          ctx.setLineDash([]);

          // Small cross-tick at the anchor endpoint
          const tk = 4;
          ctx.strokeStyle = tc(0.65);
          ctx.lineWidth = 1.5;
          ctx.lineCap = "square";
          ctx.beginPath();
          ctx.moveTo(anchor.x - tk, anchor.y);
          ctx.lineTo(anchor.x + tk, anchor.y);
          ctx.moveTo(anchor.x, anchor.y - tk);
          ctx.lineTo(anchor.x, anchor.y + tk);
          ctx.stroke();

          ctx.restore();
        });

        // ── Per-letter corner brackets ──
        movingLetters.forEach(l => {
          const sc = l.scale || 1;
          const bx = l.x - (l.width / 2) * sc - padX;
          const by = l.y - halfH * sc - padY;
          const bw = l.width * sc + padX * 2;
          const bh = halfH * 2 * sc + padY * 2;

          ctx.save();
          
          // Draw fast flickering fill background
          ctx.fillStyle = fillStyle;
          ctx.fillRect(bx, by, bw, bh);

          ctx.strokeStyle = tc(0.85);
          ctx.lineWidth = 1.5;
          ctx.lineCap = "square";

          drawBracket([[bx + cLen, by],      [bx,      by],      [bx,      by + cLen]]);
          drawBracket([[bx+bw-cLen, by],     [bx+bw,   by],      [bx+bw,   by + cLen]]);
          drawBracket([[bx + cLen, by+bh],   [bx,      by+bh],   [bx,      by+bh-cLen]]);
          drawBracket([[bx+bw-cLen, by+bh],  [bx+bw,   by+bh],  [bx+bw,   by+bh-cLen]]);

          // Center reticle dot
          ctx.beginPath();
          ctx.arc(l.x, l.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = tc(0.55);
          ctx.fill();

          ctx.restore();
        });

        // ── Global bounding box (2+ letters) ──
        if (movingLetters.length >= 2) {
          const sc0 = (l: Letter) => l.scale || 1;
          const minX = Math.min(...movingLetters.map(l => l.x - (l.width / 2) * sc0(l)));
          const minY = Math.min(...movingLetters.map(l => l.y - halfH * sc0(l)));
          const maxX = Math.max(...movingLetters.map(l => l.x + (l.width / 2) * sc0(l)));
          const maxY = Math.max(...movingLetters.map(l => l.y + halfH * sc0(l)));

          const gPad = 24;
          const gx = minX - gPad;
          const gy = minY - gPad;
          const gw = (maxX - minX) + gPad * 2;
          const gh = (maxY - minY) + gPad * 2;
          const gcl = Math.min(gw * 0.13, 22);

          ctx.save();

          // Draw global fill background
          ctx.fillStyle = `rgba(${tr}, ${tg}, ${tb}, ${(fillOpacity * 0.4).toFixed(3)})`;
          ctx.fillRect(gx, gy, gw, gh);

          // Dashed border (subtle)
          ctx.strokeStyle = tc(0.85);
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 8]);
          ctx.strokeRect(gx, gy, gw, gh);
          ctx.setLineDash([]);

          // Bold corner brackets on global box
          ctx.strokeStyle = tc(1.0);
          ctx.lineWidth = 2;
          ctx.lineCap = "square";

          drawBracket([[gx + gcl,    gy],      [gx,       gy],      [gx,       gy + gcl]]);
          drawBracket([[gx+gw-gcl,   gy],      [gx+gw,    gy],      [gx+gw,    gy + gcl]]);
          drawBracket([[gx + gcl,    gy+gh],   [gx,       gy+gh],   [gx,       gy+gh-gcl]]);
          drawBracket([[gx+gw-gcl,   gy+gh],   [gx+gw,    gy+gh],   [gx+gw,    gy+gh-gcl]]);

          // ── HUD label (top-left) ──
          const avgVel = movingLetters.reduce(
            (s, l) => s + Math.sqrt(l.vx ** 2 + l.vy ** 2), 0
          ) / movingLetters.length;
          const status = isLerpingRef.current ? "ALIGNING" : "TRACKING";
          const labelPx = Math.max(9, Math.min(width * 0.009, 11));

          ctx.font = `${labelPx}px 'Courier New', monospace`;
          ctx.fillStyle = tc(0.9);
          ctx.textAlign = "left";
          ctx.textBaseline = "bottom";
          ctx.fillText(`◈ ${status}  ${movingLetters.length}obj  v:${avgVel.toFixed(1)}`, gx + 2, gy - 3);

          // ── Coords label (bottom-right) ──
          ctx.textAlign = "right";
          ctx.textBaseline = "top";
          const cx = Math.round((minX + maxX) / 2);
          const cy = Math.round((minY + maxY) / 2);
          ctx.fillText(`[${cx}, ${cy}]`, gx + gw - 2, gy + gh + 3);

          ctx.restore();
        }
      }
      // ── END TRACK BOX ────────────────────────────────────────────────────
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

    // Generate dynamic colors
    let primaryColor = "";
    let secondaryColor = "";

    if (isDarkMode) {
      // Crystal prism dispersion: pick a random spectral hue pair as the "refraction angle"
      // Colors mimic chromatic aberration: cyan↔orange, blue↔gold, violet↔lime
      const prismPairs: [string, string][] = [
        ["rgb(0, 220, 255)",   "rgb(255, 140, 0)"],    // cyan ↔ orange
        ["rgb(80, 160, 255)",  "rgb(255, 210, 0)"],    // blue ↔ gold
        ["rgb(180, 0, 255)",   "rgb(100, 255, 80)"],   // violet ↔ lime
        ["rgb(255, 255, 255)", "rgb(0, 200, 255)"],    // white ↔ cyan
        ["rgb(255, 80, 200)",  "rgb(0, 255, 200)"],    // pink ↔ mint
      ];
      const pair = prismPairs[Math.floor(Math.random() * prismPairs.length)];
      primaryColor   = pair[0];
      secondaryColor = pair[1];
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
        if (!isDarkMode) {
          // Light mode: subtractive blending
          return (
            <div key={flare.id} className="flare-burst" style={{ position: "fixed", left: flare.x, top: flare.y, transform: "translate(-50%, -50%)", zIndex: 9999 }}>
              <div className="flare-core-white" style={{ mixBlendMode: "multiply", background: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)", filter: "blur(2px) brightness(0.8) drop-shadow(0 0 10px rgba(0,0,0,0.45))" }} />
              <div className="flare-core-cyan"  style={{ mixBlendMode: "multiply", background: `radial-gradient(circle, ${flare.primary} 0%, ${flare.primary} 35%, transparent 100%)`, filter: "blur(4px) brightness(0.95) saturate(2)" }} />
              <div className="flare-core-magenta" style={{ mixBlendMode: "multiply", background: `radial-gradient(circle, ${flare.secondary} 0%, ${flare.secondary} 35%, transparent 100%)`, filter: "blur(8px) brightness(0.95) saturate(2)" }} />
              <div className="flare-halo" style={{ mixBlendMode: "multiply", background: `radial-gradient(circle, ${flare.primary} 0%, ${flare.secondary} 50%, transparent 80%)`, filter: "blur(3px) brightness(0.9) saturate(1.8)" }} />
              <div className="flare-streak" style={{ mixBlendMode: "multiply", background: `linear-gradient(90deg, transparent 0%, ${flare.primary} 15%, rgba(0,0,0,1) 40%, ${flare.secondary} 50%, rgba(0,0,0,1) 60%, ${flare.primary} 85%, transparent 100%)`, filter: "blur(0.5px) brightness(0.95) saturate(2.2)" }} />
            </div>
          );
        }

        // ── DARK MODE: Crystal Prism Dispersion ──
        // Random rotation per burst for directional variety
        const rot = Math.floor(Math.random() * 360);
        const rot2 = rot + 55 + Math.floor(Math.random() * 70);
        const rot3 = rot - 40 - Math.floor(Math.random() * 60);
        const c1 = flare.primary;
        const c2 = flare.secondary;
        // Chromatic mid-band: the "white" dispersion center
        const cWhite = "rgba(255, 255, 255, 0.95)";

        return (
          <div key={flare.id} className="flare-burst" style={{ position: "fixed", left: flare.x, top: flare.y, transform: "translate(-50%, -50%)", zIndex: 9999 }}>

            {/* Core white hotspot */}
            <div className="crystal-core" style={{
              background: `radial-gradient(circle, white 0%, ${c1} 50%, transparent 100%)`,
              filter: `blur(1px) brightness(8) drop-shadow(0 0 3px white)`,
              mixBlendMode: "plus-lighter"
            }} />

            {/* Chromatic aberration blobs */}
            <div className="crystal-blob" style={{
              background: `radial-gradient(ellipse at 40% 60%, ${c1} 0%, transparent 70%)`,
              filter: `blur(8px) brightness(5) saturate(4)`,
              mixBlendMode: "plus-lighter",
              transform: `translate(-50%, -50%) rotate(${rot}deg) translateX(55px)`,
            }} />
            <div className="crystal-blob" style={{
              background: `radial-gradient(ellipse at 60% 40%, ${c2} 0%, transparent 70%)`,
              filter: `blur(8px) brightness(5) saturate(4)`,
              mixBlendMode: "plus-lighter",
              transform: `translate(-50%, -50%) rotate(${rot + 180}deg) translateX(55px)`,
            }} />

            {/* Main dispersion streak: cyan→white→orange spread */}
            <div className="crystal-streak-main" style={{
              background: `linear-gradient(90deg,
                transparent 0%,
                ${c2} 10%,
                ${cWhite} 28%,
                white 42%,
                ${cWhite} 55%,
                ${c1} 75%,
                transparent 100%)`,
              filter: `blur(4px) brightness(5) saturate(3) drop-shadow(0 0 10px ${c1})`,
              mixBlendMode: "plus-lighter",
              // @ts-expect-error CSS custom properties
              "--streak-transform-start": `translate(-50%, -50%) rotate(${rot}deg) scaleX(0.05)`,
              "--streak-transform-end":   `translate(-50%, -50%) rotate(${rot}deg) scaleX(1.4)`,
            }} />

            {/* Secondary narrower streak (chromatic split) */}
            <div className="crystal-streak-thin" style={{
              background: `linear-gradient(90deg,
                transparent 0%,
                ${c1} 15%,
                ${cWhite} 45%,
                ${c2} 75%,
                transparent 100%)`,
              filter: `blur(3px) brightness(5) saturate(4)`,
              mixBlendMode: "plus-lighter",
              // @ts-expect-error CSS custom properties
              "--streak-transform-start": `translate(-50%, -50%) rotate(${rot2}deg) scaleX(0.05)`,
              "--streak-transform-end":   `translate(-50%, -50%) rotate(${rot2}deg) scaleX(1.3)`,
            }} />

            {/* Tertiary streak – opposite dispersion angle */}
            <div className="crystal-streak-thin" style={{
              background: `linear-gradient(90deg,
                transparent 0%,
                ${c2} 20%,
                rgba(255,255,255,0.8) 50%,
                ${c1} 80%,
                transparent 100%)`,
              filter: `blur(3px) brightness(4.5) saturate(3.5)`,
              mixBlendMode: "plus-lighter",
              // @ts-expect-error CSS custom properties
              "--streak-transform-start": `translate(-50%, -50%) rotate(${rot3}deg) scaleX(0.05)`,
              "--streak-transform-end":   `translate(-50%, -50%) rotate(${rot3}deg) scaleX(1.3)`,
            }} />

            {/* Wide soft halo – the light bleed / frosted glass around shards */}
            <div className="crystal-halo" style={{
              background: `radial-gradient(ellipse, ${c1} 0%, ${c2} 35%, transparent 70%)`,
              filter: `blur(24px) brightness(4) saturate(3)`,
              mixBlendMode: "plus-lighter"
            }} />
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
