"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  Terminal,
  Monitor,
  Code,
  Shield,
  Cpu,
  Lightbulb,
  Gamepad2,
  ArrowUpRight,
} from "lucide-react";

interface CategoryTheme {
  icon: React.ReactNode;
  /** Solid color for accents (hex) */
  hex: string;
  /** RGB triplet for translucent backgrounds */
  rgb: string;
  /** Short tagline */
  tagline: string;
}

const themes: Record<string, CategoryTheme> = {
  Linux: {
    icon: <Terminal className="w-full h-full" />,
    hex: "#34d399",
    rgb: "52, 211, 153",
    tagline: "Distros, shell & poder",
  },
  Windows: {
    icon: <Monitor className="w-full h-full" />,
    hex: "#7dd3fc",
    rgb: "125, 211, 252",
    tagline: "Tweaks & produtividade",
  },
  Desenvolvimento: {
    icon: <Code className="w-full h-full" />,
    hex: "#6ee7b7",
    rgb: "110, 231, 183",
    tagline: "Code, ship, repeat",
  },
  "Segurança": {
    icon: <Shield className="w-full h-full" />,
    hex: "#fda4af",
    rgb: "253, 164, 175",
    tagline: "Hardening sem paranoia",
  },
  Hardware: {
    icon: <Cpu className="w-full h-full" />,
    hex: "#c4b5fd",
    rgb: "196, 181, 253",
    tagline: "GPU, CPU & fierro",
  },
  Dicas: {
    icon: <Lightbulb className="w-full h-full" />,
    hex: "#67e8f9",
    rgb: "103, 232, 249",
    tagline: "Atalhos & segredos",
  },
  Jogos: {
    icon: <Gamepad2 className="w-full h-full" />,
    hex: "#bef264",
    rgb: "190, 242, 100",
    tagline: "FPS, mods & setup",
  },
};

const defaultTheme: CategoryTheme = {
  icon: <Terminal className="w-full h-full" />,
  hex: "#34d399",
  rgb: "52, 211, 153",
  tagline: "Conteúdo selecionado",
};

interface CategoryCardProps {
  name: string;
  count: number;
  size?: "lg" | "md";
  className?: string;
}

export function CategoryCard({ name, count, size = "md", className = "" }: CategoryCardProps) {
  const theme = themes[name] || defaultTheme;
  const cardRef = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mx", `${x}%`);
    cardRef.current.style.setProperty("--my", `${y}%`);
  }

  const isLg = size === "lg";

  // All colors via inline style — NO Tailwind dynamic classes
  const cardStyle: React.CSSProperties = {
    background: `
      radial-gradient(circle at 100% 0%, rgba(${theme.rgb}, 0.18) 0%, transparent 50%),
      linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 100%)
    `,
    borderColor: `rgba(${theme.rgb}, 0.3)`,
    boxShadow: `
      inset 0 1px 2px 0 rgba(255,255,255,0.6),
      inset 0 -1px 2px 0 rgba(0,0,0,0.1),
      0 20px 50px rgba(0,0,0,0.25)
    `,
    backdropFilter: 'blur(24px) saturate(200%) contrast(105%)',
    WebkitBackdropFilter: 'blur(24px) saturate(200%) contrast(105%)',
  };

  return (
    <Link
      ref={cardRef}
      href={`/blog?category=${encodeURIComponent(name)}`}
      onMouseMove={handleMouseMove}
      style={cardStyle}
      className={`category-card group relative block overflow-hidden rounded-3xl border
                  transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                  hover:-translate-y-1.5 hover:scale-[1.015]
                  active:scale-[1.005]
                  hover:border-white/[0.45]
                  ${isLg
                    ? "min-h-[260px] sm:min-h-[300px] p-6 sm:p-8"
                    : "min-h-[180px] p-5 sm:p-6"}
                  ${className}`}
    >
      {/* ─── Specular top highlight ─── */}
      <div
        className="absolute top-0 left-[8%] right-[8%] h-px pointer-events-none z-[2]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.45) 80%, transparent 100%)',
        }}
      />
      {/* ─── Inner refraction glow ─── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at 25% 12%, rgba(255,255,255,0.10) 0%, transparent 45%)',
        }}
      />
      {/* ─── Hover spotlight (liquid glass refraction) ─── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(${theme.rgb}, 0.10), rgba(255,255,255,0.03) 30%, transparent 60%)`,
        }}
      />

      {/* ─── Top-right glow blob ─── */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
        style={{ background: theme.hex }}
      />

      {/* ─── Subtle grid pattern (only on LG) ─── */}
      {isLg && (
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(${theme.rgb}, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(${theme.rgb}, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at top right, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at top right, black 0%, transparent 70%)",
          }}
        />
      )}

      {/* ─── Content ─── */}
      <div className="relative flex flex-col h-full">
        {/* Top row: icon + arrow */}
        <div className="flex items-start justify-between mb-6 sm:mb-8">
          {/* Icon (NO flex shrink, FIXED dimensions) */}
          <div
            className={`flex items-center justify-center rounded-2xl border

                        ${isLg ? "w-14 h-14" : "w-12 h-12"}
                        group-hover:scale-110 group-hover:-rotate-3
                        transition-transform duration-500 backdrop-blur-[24px] saturate-[200%] contrast-[105%]`}
            style={{
              color: theme.hex,
              background: `rgba(${theme.rgb}, 0.12)`,
              borderColor: `rgba(${theme.rgb}, 0.3)`,
              boxShadow: `inset 0 1px 2px 0 rgba(255,255,255,0.6), inset 0 -1px 2px 0 rgba(0,0,0,0.1), 0 20px 50px rgba(0,0,0,0.25)`,
            }}
          >
            <div className={isLg ? "w-7 h-7" : "w-6 h-6"}>
              {theme.icon}
            </div>
          </div>

          {/* Arrow — liquid glass mini pill */}
          <div
            className="flex items-center justify-center w-9 h-9 rounded-2xl
                       border opacity-60 group-hover:opacity-100
                       group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                       backdrop-blur-[24px] saturate-[200%] contrast-[105%]
                       transition-all duration-300"
            style={{
              color: theme.hex,
              background: `rgba(${theme.rgb}, 0.12)`,
              borderColor: `rgba(${theme.rgb}, 0.3)`,
              boxShadow: `inset 0 1px 2px 0 rgba(255,255,255,0.6), inset 0 -1px 2px 0 rgba(0,0,0,0.1), 0 20px 50px rgba(0,0,0,0.25)`,
            }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Bottom: name + tagline + count */}
        <div className="mt-auto">
          <h3
            className={`font-extrabold text-white leading-[1.1] tracking-tight mb-2
                        ${isLg ? "text-3xl sm:text-4xl" : "text-2xl"}
                        transition-colors duration-300`}
          >
            <span className="group-hover:hidden">{name}</span>
            <span
              className="hidden group-hover:inline"
              style={{ color: theme.hex }}
            >
              {name}
            </span>
          </h3>

          {isLg && (
            <p className="text-sm text-white/65 mb-4">
              {theme.tagline}
            </p>
          )}

          <div
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider
                       backdrop-blur-[24px] saturate-[200%] contrast-[105%]"
            style={{
              color: theme.hex,
              background: `rgba(${theme.rgb}, 0.12)`,
              border: `1px solid rgba(${theme.rgb}, 0.3)`,
              boxShadow: `inset 0 1px 2px 0 rgba(255,255,255,0.6), inset 0 -1px 2px 0 rgba(0,0,0,0.1), 0 20px 50px rgba(0,0,0,0.25)`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: theme.hex,
                boxShadow: `0 0 8px ${theme.hex}`,
              }}
            />
            <span className="tabular-nums">{String(count).padStart(2, "0")}</span>
            <span className="opacity-70">
              {count === 1 ? "artigo" : "artigos"}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Border glow on hover (liquid glass) ─── */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 0 1px rgba(${theme.rgb}, 0.3) inset, 0 30px 60px -10px rgba(${theme.rgb}, 0.2), inset 0 1px 2px 0 rgba(255,255,255,0.6), inset 0 -1px 2px 0 rgba(0,0,0,0.1)`,
        }}
      />
    </Link>
  );
}
