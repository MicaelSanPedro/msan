"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Home, ArrowRight, Sparkles, Ghost } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    setMounted(true);
    const generated = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setParticles(generated);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Animated background gradient that follows mouse ── */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%,
              rgba(52, 211, 153, 0.08) 0%,
              rgba(139, 92, 246, 0.04) 30%,
              transparent 60%),
            radial-gradient(400px circle at ${(1 - mousePos.x) * 100}% ${(1 - mousePos.y) * 100}%,
              rgba(244, 63, 94, 0.06) 0%,
              transparent 50%)
          `,
        }}
      />

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-emerald-400"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(52,211,153,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52,211,153,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Scan line effect ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
        {/* Glitch 404 number */}
        <div className="relative mb-6">
          <h1
            className="text-[9rem] sm:text-[12rem] font-black leading-none tracking-tighter select-none"
            style={{
              background: "linear-gradient(135deg, #34d399 0%, #6ee7b7 30%, #a7f3d0 50%, #6ee7b7 70%, #34d399 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer-404 4s linear infinite",
              filter: `drop-shadow(0 0 40px rgba(52,211,153,0.3))`,
            }}
          >
            404
          </h1>

          {/* Glitch layers */}
          <div
            className="absolute inset-0 text-[9rem] sm:text-[12rem] font-black leading-none tracking-tighter pointer-events-none select-none"
            style={{
              color: "rgba(59,130,246,0.15)",
              animation: "glitch-1 3s infinite",
              clipPath: "inset(20% 0 60% 0)",
            }}
            aria-hidden
          >
            404
          </div>
          <div
            className="absolute inset-0 text-[9rem] sm:text-[12rem] font-black leading-none tracking-tighter pointer-events-none select-none"
            style={{
              color: "rgba(244,63,94,0.15)",
              animation: "glitch-2 3s infinite",
              clipPath: "inset(60% 0 10% 0)",
            }}
            aria-hidden
          >
            404
          </div>

          {/* Glow behind number */}
          <div
            className="absolute inset-0 -z-10 blur-3xl opacity-30 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(52,211,153,0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Message */}
        <div className="space-y-3 mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Ghost className="w-5 h-5 text-emerald-400/60 animate-float-y" />
            <p className="text-sm font-medium text-emerald-400/80 uppercase tracking-[0.2em]">
              Página não encontrada
            </p>
            <Ghost className="w-5 h-5 text-emerald-400/60 animate-float-y" style={{ animationDelay: "1s" }} />
          </div>
          <p className="text-white/65 text-base leading-relaxed max-w-sm mx-auto">
            Ops! Essa página se perdeu no{" "}
            <span className="text-emerald-400/70 font-semibold">ciberespacio</span>.
            Talvez ela tenha ficado presa entre os bytes.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Link
            href="/"
            className="group flex items-center gap-2.5 px-6 py-3 rounded-2xl
                       bg-gradient-to-b from-emerald-400/90 to-emerald-500
                       text-emerald-950 text-sm font-bold
                       shadow-[0_4px_20px_-4px_rgba(52,211,153,0.5),inset_0_1px_0_rgba(255,255,255,0.4)]
                       hover:shadow-[0_8px_32px_-4px_rgba(52,211,153,0.7),inset_0_1px_0_rgba(255,255,255,0.5)]
                       hover:from-emerald-300 hover:to-emerald-400
                       border border-emerald-400/30
                       hover:scale-105 active:scale-[0.98]
                       transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Voltar ao início
          </Link>
          <Link
            href="/blog"
            className="group flex items-center gap-2.5 px-6 py-3 rounded-2xl
                       liquid-glass-pill
                       text-white/70 text-sm font-semibold
                       hover:text-white/90
                       hover:scale-105 active:scale-[0.98]
                       transition-all duration-300"
          >
            Ver artigos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Decorative terminal snippet */}
        <div className="mt-14 animate-fade-in" style={{ animationDelay: "0.9s" }}>
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl
                         glass-card">
            <Sparkles className="w-4 h-4 text-emerald-400/50" />
            <div className="text-left font-mono text-xs sm:text-sm">
              <span className="text-white/25">$</span>{" "}
              <span className="text-emerald-400/70">find</span>{" "}
              <span className="text-white/70">/pagina-perdida</span>
              <br />
              <span className="text-white/25">...</span>{" "}
              <span className="text-red-400/60 animate-terminal-blink">not found</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Corner decorations ── */}
      <div className="absolute top-6 left-6 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <Logo className="w-8 h-8 opacity-40" />
      </div>

      <div className="absolute bottom-6 right-6 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <p className="text-[10px] text-white/15 font-mono">
          HTTP 404
        </p>
      </div>

      {/* ── Animated border ring ── */}
      <div
        className="absolute inset-[8%] rounded-full border border-white/[0.03] pointer-events-none animate-rotate-slow"
        aria-hidden
      />
      <div
        className="absolute inset-[15%] rounded-full border border-emerald-500/[0.03] pointer-events-none animate-rotate-slow"
        style={{ animationDirection: "reverse", animationDuration: "40s" }}
        aria-hidden
      />
    </div>
  );
}
