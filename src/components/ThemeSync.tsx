"use client";

import { useEffect } from "react";

const THEME_KEY = "techmate_theme";
const FONT_SIZE_KEY = "techmate_font_size";
const REDUCED_MOTION_KEY = "techmate_reduced_motion";
const COMPACT_MODE_KEY = "techmate_compact_mode";
const ACCENT_COLOR_KEY = "techmate_accent_color";

const FONT_SCALES: Record<string, number> = {
  small: 14 / 16,
  medium: 16 / 16,
  large: 18 / 16,
  xlarge: 20 / 16,
};

const ACCENT_PRESETS: Record<string, { primary: string; glow: string }> = {
  emerald: { primary: "#10b981", glow: "rgba(16,185,129,0.45)" },
  blue: { primary: "#3b82f6", glow: "rgba(59,130,246,0.45)" },
  violet: { primary: "#8b5cf6", glow: "rgba(139,92,246,0.45)" },
  rose: { primary: "#f43f5e", glow: "rgba(244,63,94,0.45)" },
  cyan: { primary: "#06b6d4", glow: "rgba(6,182,212,0.45)" },
};

function getStored(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}

export function ThemeSync() {
  useEffect(() => {
    function sync() {
      const root = document.documentElement;
      try {
        /* Theme */
        const theme = getStored(THEME_KEY);
        if (theme === "light") {
          root.classList.remove("dark");
          const m = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
          if (m) m.content = "#f0f5f2";
        } else {
          root.classList.add("dark");
          const m = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
          if (m) m.content = "#060a08";
        }

        /* Font size */
        const fontSize = getStored(FONT_SIZE_KEY);
        if (fontSize && FONT_SCALES[fontSize]) {
          const scale = FONT_SCALES[fontSize];
          root.style.setProperty("--user-font-scale", String(scale));
          const pxSize = Math.round(scale * 16);
          root.style.fontSize = `${pxSize}px`;
        }

        /* Reduced motion */
        const reducedMotion = getStored(REDUCED_MOTION_KEY);
        if (reducedMotion === "true") {
          root.classList.add("reduced-motion");
        } else {
          root.classList.remove("reduced-motion");
        }

        /* Compact mode */
        const compactMode = getStored(COMPACT_MODE_KEY);
        if (compactMode === "true") {
          root.classList.add("compact-mode");
        } else {
          root.classList.remove("compact-mode");
        }

        /* Accent color */
        const accentColor = getStored(ACCENT_COLOR_KEY);
        if (accentColor && ACCENT_PRESETS[accentColor]) {
          const preset = ACCENT_PRESETS[accentColor];
          root.style.setProperty("--accent", preset.primary);
          root.style.setProperty("--accent-glow", preset.glow);
          root.setAttribute("data-accent", accentColor);
        }
      } catch {}
    }

    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return null;
}
