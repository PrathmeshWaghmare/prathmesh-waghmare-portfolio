"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient dark-theme background: a slow animated gradient wash, a faint
 * grid, a canvas starfield/particle layer, and a radial "mouse glow" that
 * tracks the pointer. Pure canvas + CSS — no 3D engine required, which
 * keeps this cheap enough to run behind every section.
 */
export default function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Particle = { x: number; y: number; r: number; vx: number; vy: number; o: number };
    const count = Math.min(70, Math.floor((width * height) / 22000));
    let particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      o: Math.random() * 0.5 + 0.15,
    }));

    function resize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    function tick() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx * dpr;
        p.y += p.vy * dpr;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.o})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    if (!prefersReducedMotion) {
      raf = requestAnimationFrame(tick);
    } else {
      // Draw a single static frame for reduced-motion users.
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.o})`;
        ctx.fill();
      }
    }

    function onMouseMove(e: MouseEvent) {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    }
    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      particles = [];
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base */}
      <div className="absolute inset-0 bg-[var(--color-bg)]" />

      {/* Animated gradient wash */}
      <div className="absolute -top-1/3 left-1/4 h-[60vw] w-[60vw] rounded-full bg-[var(--color-primary)]/20 blur-[120px] animate-[drift1_22s_ease-in-out_infinite]" />
      <div className="absolute top-1/2 -right-1/4 h-[50vw] w-[50vw] rounded-full bg-[var(--color-purple)]/15 blur-[130px] animate-[drift2_26s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-1/3 h-[40vw] w-[40vw] rounded-full bg-[var(--color-accent)]/10 blur-[110px] animate-[drift1_30s_ease-in-out_infinite_reverse]" />

      {/* Grid */}
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_20%,transparent_75%)]" />

      {/* Mouse glow */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 hidden h-[500px] w-[500px] rounded-full bg-[var(--color-primary)]/[0.07] blur-[80px] transition-transform duration-300 ease-out md:block"
      />

      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      <style jsx>{`
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(4%, 6%) scale(1.08); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-5%, 4%) scale(1.06); }
        }
      `}</style>
    </div>
  );
}
