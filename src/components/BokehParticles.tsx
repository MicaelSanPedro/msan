"use client";

import { useEffect, useRef } from "react";

export function BokehParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Non-null aliases for use in nested closures
    const c = canvas as NonNullable<typeof canvas>;
    const g = ctx as NonNullable<typeof ctx>;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = w + "px";
      c.style.height = h + "px";
      g.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "rgba(52,211,153,",  // emerald
      "rgba(110,231,183,",  // emerald lighter
      "rgba(244,63,94,",   // rose
      "rgba(56,189,248,",  // sky
      "rgba(163,230,53,",  // lime
      "rgba(139,92,246,",  // violet
    ];

    interface Particle {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      color: string;
      alpha: number;
      pulse: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = [];
    const count = Math.min(12, Math.floor(w / 100));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.5 + 0.8,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.15 - 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.25 + 0.05,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.004,
      });
    }

    let animId: number;

    function animate() {
      g.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        p.pulse += p.pulseSpeed;
        const a = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));

        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;

        // Outer glow
        const glowR = Math.max(0.1, p.r * 10);
        const grad = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        grad.addColorStop(0, p.color + (a * 0.7).toFixed(3) + ")");
        grad.addColorStop(0.35, p.color + (a * 0.2).toFixed(3) + ")");
        grad.addColorStop(1, p.color + "0)");
        g.beginPath();
        g.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        g.fillStyle = grad;
        g.fill();

        // Core
        const coreR = Math.max(0.1, p.r);
        g.beginPath();
        g.arc(p.x, p.y, coreR, 0, Math.PI * 2);
        g.fillStyle = p.color + (a * 1.4).toFixed(3) + ")";
        g.fill();
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="bokeh-canvas hidden sm:block" aria-hidden />;
}
