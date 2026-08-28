"use client";

import { useStore } from "@/lib/store";
import { distroLogos } from "@/lib/ascii-logos";
import { fastfetchModules, defaultModuleValues } from "@/lib/fastfetch-modules";
import { X, Minus, Maximize2, ChevronRight } from "lucide-react";

const ansiKeys = [
  "color0", "color1", "color2", "color3",
  "color4", "color5", "color6", "color7",
  "color8", "color9", "color10", "color11",
  "color12", "color13", "color14", "color15",
] as const;

export function TerminalPreview() {
  const { enabledModules, selectedDistro, username, hostname, theme, wallpaper } =
    useStore();

  const logo = distroLogos[selectedDistro] || distroLogos.Arch;
  const logoLines = logo.split("\n").filter((l) => l.length > 0);

  const activeModules = fastfetchModules.filter((m) => enabledModules[m.id]);
  const maxLines = Math.max(logoLines.length, activeModules.length + 3);

  const fg = theme.foreground || "#cdd6f4";
  const bg = theme.background || "#1e1e2e";

  const c1 = theme.color4 || "#89b4fa";
  const c2 = theme.color5 || "#f5c2e7";
  const c3 = theme.color6 || "#94e2d5";
  const cKey = theme.color5 || "#cdd6f4";
  const cSep = theme.color8 || "#585b70";
  const cVal = theme.color7 || "#bac2de";

  return (
    <div className="neo-glow overflow-hidden animate-fade-in-scale">
      {/* Title bar - pressed neomorphic */}
      <div className="neo-pressed rounded-b-none px-5 py-3.5 flex items-center gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-[13px] h-[13px] rounded-full bg-[#ff5f57] flex items-center justify-center group cursor-pointer transition-transform hover:scale-110"
            style={{ boxShadow: "2px 2px 4px var(--neo-shadow-dark), -1px -1px 3px var(--neo-shadow-light)" }}
          >
            <X className="w-[7px] h-[7px] text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="w-[13px] h-[13px] rounded-full bg-[#febc2e] flex items-center justify-center group cursor-pointer transition-transform hover:scale-110"
            style={{ boxShadow: "2px 2px 4px var(--neo-shadow-dark), -1px -1px 3px var(--neo-shadow-light)" }}
          >
            <Minus className="w-[7px] h-[7px] text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="w-[13px] h-[13px] rounded-full bg-[#28c840] flex items-center justify-center group cursor-pointer transition-transform hover:scale-110"
            style={{ boxShadow: "2px 2px 4px var(--neo-shadow-dark), -1px -1px 3px var(--neo-shadow-light)" }}
          >
            <Maximize2 className="w-[6px] h-[6px] text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-[11px] text-[var(--neo-text-dim)] font-mono tracking-wide">
            {username}@{hostname}: ~
          </span>
        </div>
        <div className="w-[54px]" />
      </div>

      {/* Terminal body - deep inset */}
      <div
        className="relative p-5 sm:p-6 font-mono text-[11px] sm:text-xs leading-[1.6] overflow-x-auto min-h-[340px] sm:min-h-[400px]"
        style={{
          background: wallpaper
            ? `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url('${wallpaper}') center/cover no-repeat`
            : bg,
          boxShadow: "inset 6px 6px 16px var(--neo-shadow-dark), inset -6px -6px 16px var(--neo-shadow-light)",
          borderRadius: "0 0 24px 24px",
        }}
      >
        {/* Noise overlay for wallpaper */}
        {wallpaper && (
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27 opacity=%270.5%27/%3E%3C/svg%3E')" }}
          />
        )}

        <div className="relative flex gap-5 sm:gap-7">
          {/* ASCII Logo */}
          <div className="shrink-0 select-none" style={{ color: c1 }}>
            {logoLines.map((line, i) => (
              <div key={i} className="leading-[1.5]" style={{
                animation: `fade-in-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.05}s both`,
              }}>{line}</div>
            ))}
          </div>

          {/* Info columns */}
          <div className="min-w-0">
            {/* Title */}
            <div className="mb-2.5 flex items-center gap-1.5" style={{
              animation: "fade-in-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both",
            }}>
              <span style={{ color: c2 }}>{username}</span>
              <span style={{ color: theme.color1 || "#f38ba8" }}>@</span>
              <span style={{ color: c3 }}>{hostname}</span>
            </div>

            {/* Separator */}
            <div className="mb-3 flex items-center gap-2" style={{
              animation: "fade-in-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both",
            }}>
              <ChevronRight className="w-3 h-3" style={{ color: c1 }} />
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${c1}33, transparent)` }} />
            </div>

            {/* Modules */}
            {activeModules.map((m, idx) => (
              <div
                key={m.id}
                className="flex items-baseline gap-1.5"
                style={{
                  animation: `fade-in-up 0.35s cubic-bezier(0.22, 1, 0.36, 1) ${0.35 + idx * 0.06}s both`,
                }}
              >
                <span className="inline-block w-[1px] h-3 rounded-full mr-1" style={{ background: c1 }} />
                <span className="font-semibold" style={{ color: cKey }}>
                  {m.key}
                </span>
                <span style={{ color: cSep }}>: </span>
                <span style={{ color: cVal }}>
                  {defaultModuleValues[m.id]}
                </span>
              </div>
            ))}

            {/* Spacer */}
            {activeModules.length + 3 < maxLines &&
              Array.from({ length: maxLines - activeModules.length - 3 }).map((_, i) => (
                <div key={`sp-${i}`} style={{ height: "1.5em" }} />
              ))}
          </div>
        </div>

        {/* ANSI color palette - neomorphed */}
        <div className="relative mt-5 pt-4" style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="neo-btn-sm w-3 h-3 bg-emerald-400 animate-pulse-soft" />
            <span className="text-[10px] text-[var(--neo-text-dim)] uppercase tracking-[0.15em] font-semibold">
              ANSI Palette
            </span>
          </div>
          <div className="flex gap-2">
            {ansiKeys.map((key, i) => (
              <div
                key={key}
                className="transition-all duration-300 hover:scale-110 cursor-default"
                style={{
                  background: theme[key],
                  width: "30px",
                  height: "24px",
                  borderRadius: "8px",
                  boxShadow: `
                    3px 3px 6px var(--neo-shadow-dark),
                    -3px -3px 6px var(--neo-shadow-light),
                    0 2px 10px ${theme[key]}44
                  `,
                  animation: `fade-in-scale 0.3s cubic-bezier(0.22, 1, 0.36, 1) ${0.6 + i * 0.03}s both`,
                }}
                title={`${key}: ${theme[key]}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
