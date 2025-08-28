"use client";

import { useEffect } from "react";

export default function CursorAura() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let raf = 0;
    let targetX = -200;
    let targetY = -200;
    let x = targetX;
    let y = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const step = () => {
      // simple smoothing
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;
      const root = document.documentElement;
      root.style.setProperty("--aura-x", `${x}px`);
      root.style.setProperty("--aura-y", `${y}px`);
      raf = window.requestAnimationFrame(step);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = window.requestAnimationFrame(step);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}

