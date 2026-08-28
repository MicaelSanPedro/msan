"use client";

import { useStore } from "@/lib/store";
import { kittyPresets } from "@/lib/kitty-presets";
import type { KittyTheme } from "@/lib/kitty-presets";
import type { ChangeEvent } from "react";

const colorLabels: Record<keyof KittyTheme, string> = {
  name: "Nome",
  background: "Fundo",
  foreground: "Texto",
  cursor: "Cursor",
  color0: "Black", color1: "Red", color2: "Green", color3: "Yellow",
  color4: "Blue", color5: "Magenta", color6: "Cyan", color7: "White",
  color8: "Bright Black", color9: "Bright Red", color10: "Bright Green",
  color11: "Bright Yellow", color12: "Bright Blue", color13: "Bright Magenta",
  color14: "Bright Cyan", color15: "Bright White",
};

const ansiKeys: (keyof KittyTheme)[] = [
  "color0", "color1", "color2", "color3",
  "color4", "color5", "color6", "color7",
  "color8", "color9", "color10", "color11",
  "color12", "color13", "color14", "color15",
];

const baseKeys: (keyof KittyTheme)[] = ["background", "foreground", "cursor"];

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="neo-flat px-3.5 py-3 flex items-center gap-3 transition-all duration-300 hover:shadow-[6px_6px_14px_var(--neo-shadow-dark),-6px_-6px_14px_var(--neo-shadow-light)]">
      <div className="relative shrink-0">
        <div className="neo-btn w-11 h-11 p-0.5 flex items-center justify-center">
          <input
            type="color"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            className="w-full h-full rounded-lg cursor-pointer border-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-none"
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-[var(--neo-text-dim)] font-medium">{label}</p>
        <p className="text-[12px] font-mono text-white/60 truncate mt-0.5">{value}</p>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v);
        }}
        className="neo-input w-[76px] h-9 text-[11px] font-mono text-center text-white/70 focus:text-white/90"
        maxLength={7}
      />
    </div>
  );
}

export function KittyConfig() {
  const { theme, setThemeColor, applyPreset } = useStore();

  return (
    <div className="space-y-8">
      {/* Kitty-only notice */}
      <div className="neo-pressed p-4">
        <p className="text-[12px] text-white/60 leading-relaxed">
          As cores e o wallpaper gerados aqui <span className="text-white/90 font-semibold">só funcionam no Kitty</span>. Outros terminais ignoram o <span className="font-mono text-[11px] text-emerald-300/70">kitty.conf</span>.
        </p>
      </div>

      {/* Presets */}
      <div className="space-y-3.5">
        <p className="text-[var(--neo-text-dim)] text-[11px] uppercase tracking-[0.15em] font-semibold flex items-center gap-2.5">
          <div className="neo-btn-sm w-2 h-2 bg-purple-400" />
          Temas Prontos
        </p>
        <div className="flex flex-wrap gap-2.5">
          {kittyPresets.map((preset, idx) => {
            const isActive =
              preset.background === theme.background &&
              preset.foreground === theme.foreground &&
              preset.name === theme.name;
            return (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-[14px] text-[12px] font-medium transition-all duration-300
                  ${isActive ? "neo-pressed text-emerald-300" : "neo-flat text-[var(--neo-text-dim)] hover:text-white/70"}
                `}
                style={isActive ? {
                  boxShadow: `
                    inset 3px 3px 8px var(--neo-shadow-dark),
                    inset -3px -3px 8px var(--neo-shadow-light),
                    0 0 20px rgba(16,185,129,0.1)
                  `,
                  animation: `fade-in-scale 0.3s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.05}s both`,
                } : {
                  animation: `fade-in-up 0.3s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.05}s both`,
                }}
              >
                <div className="flex gap-[3px]">
                  {[preset.color0, preset.color1, preset.color2, preset.color4].map((c, ci) => (
                    <span
                      key={ci}
                      className="w-3 h-3 rounded-md"
                      style={{
                        background: c,
                        boxShadow: `1px 1px 3px var(--neo-shadow-dark), -1px -1px 3px var(--neo-shadow-light)`,
                      }}
                    />
                  ))}
                </div>
                {preset.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Base colors */}
      <div className="space-y-3.5">
        <p className="text-[var(--neo-text-dim)] text-[11px] uppercase tracking-[0.15em] font-semibold flex items-center gap-2.5">
          <div className="neo-btn-sm w-2 h-2 bg-cyan-400" />
          Cores Base
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {baseKeys.map((key) => (
            <ColorPicker key={key} label={colorLabels[key]} value={theme[key]} onChange={(v) => setThemeColor(key, v)} />
          ))}
        </div>
      </div>

      {/* ANSI 16 colors */}
      <div className="space-y-3.5">
        <p className="text-[var(--neo-text-dim)] text-[11px] uppercase tracking-[0.15em] font-semibold flex items-center gap-2.5">
          <div className="neo-btn-sm w-2 h-2 bg-amber-400" />
          Cores ANSI
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ansiKeys.map((key) => (
            <ColorPicker key={key} label={colorLabels[key]} value={theme[key]} onChange={(v) => setThemeColor(key, v)} />
          ))}
        </div>
      </div>
    </div>
  );
}