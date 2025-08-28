"use client";

import { useEffect, useRef } from "react";

type Ripple = {
  x: number;
  y: number;
  t0: number;
  amp: number; // strength [0..1]
  spacing: number; // px between echo rings
  speed: number; // px per ms
};

export default function RippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastRef = useRef<
    | {
        x: number;
        y: number;
        t: number;
        v: number; // px/ms
        a: number; // px/ms^2 (approx on magnitude)
      }
    | null
  >(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return; // Respect accessibility

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let raf = 0;

    const colours = {
      a: getCSS('--accent') || '#2a7bff',
      b: getCSS('--accent-2') || '#ff7a59',
      c: getCSS('--accent-3') || '#7c5cff',
    };

    function getCSS(name: string) {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const addRipple = (x: number, y: number) => {
      const now = performance.now();
      const last = lastRef.current;
      let v = 0, a = 0, j = 0;
      if (last) {
        const dt = Math.max(1, now - last.t); // ms
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        v = dist / dt; // px/ms
        a = (v - last.v) / dt; // px/ms^2
        j = (a - last.a) / dt; // px/ms^3

        // Dynamic throttle: generally sparser; only dense under very fast/jerky motion
        const vN = 1 - Math.exp(-v * 2.0);
        const jN = 1 - Math.exp(-Math.abs(j) * 1800);
        const minDtBase = 34; // ms
        const minDtReduce = Math.min(14, vN * 10 + jN * 8);
        const minDt = minDtBase - minDtReduce;
        const minDist = 14 + 30 * (1 - vN); // require more movement when slow
        if (dt < minDt && dist < minDist) return;
      }

      const vN = 1 - Math.exp(-v * 2.0);
      const aN = 1 - Math.exp(-Math.abs(a) * 120);
      const jN = 1 - Math.exp(-Math.abs(j) * 1800);

      // Strength [0.12..0.55]
      const amp = clamp(0.12 + 0.28 * vN + 0.14 * aN + 0.18 * jN, 0.12, 0.55);
      // Wave speed and density (slower diffusion, sparser rings)
      const waveSpeed = 0.28 * (1 + 0.35 * vN + 0.15 * aN); // px/ms
      const baseSpacing = 34;
      const spacing = clamp(baseSpacing * (1 - 0.20 * vN - 0.12 * jN), 18, 52);

      // Spawn 1 or 2 echoes depending on energy, mostly 1
      const energy = clamp(vN * 0.55 + aN * 0.25 + jN * 0.60, 0, 1);
      const spawnCount = energy > 0.72 ? 2 : 1;
      const nowBase = now;
      for (let k = 0; k < spawnCount; k++) {
        const t0 = nowBase - k * 24; // slight phase offset for richer echoes
        ripplesRef.current.push({ x, y, t0, amp, spacing, speed: waveSpeed });
      }

      // Cap memory/CPU
      if (ripplesRef.current.length > 450) {
        ripplesRef.current.splice(0, ripplesRef.current.length - 450);
      }

      lastRef.current = { x, y, t: now, v, a };
    };

    const onMove = (e: PointerEvent) => {
      addRipple(e.clientX, e.clientY);
    };

    const duration = 1700; // ms

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      ripplesRef.current = ripplesRef.current.filter((r) => now - r.t0 < duration);
      for (const r of ripplesRef.current) {
        const age = now - r.t0;
        const baseR = age * r.speed;
        const life = 1 - age / duration; // 1 → 0

        for (let k = 0; k < 3; k++) {
          const rad = baseR + k * r.spacing;
          if (rad <= 0) continue;
          ctx.beginPath();
          ctx.arc(r.x, r.y, rad, 0, Math.PI * 2);
          const widthBase = Math.max(0.8, 1.2 * r.amp);
          ctx.lineWidth = Math.max(1, 3 - k) * widthBase * (0.8 + life * 0.6);
          // cycle colours a→b→c
          ctx.strokeStyle = k === 0 ? colours.a : k === 1 ? colours.b : colours.c;
          const alphaBase = 0.22 * r.amp;
          ctx.globalAlpha = Math.max(0, alphaBase * life - k * 0.05);
          ctx.stroke();
        }
      }
      ctx.restore();
      raf = window.requestAnimationFrame(draw);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', resize);
    raf = window.requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  function clamp(x: number, lo: number, hi: number) {
    return Math.max(lo, Math.min(hi, x));
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
