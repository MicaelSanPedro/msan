"use client";

import { useEffect } from "react";
import { ACCENT_PRESETS, applyAccentToRoot } from "@/lib/accent-utils";

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

function getStored(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}

export function ThemeSync() {
  useEffect(() => {
    function sync() {
      const root = document.documentElement;
      try {
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

        const fontSize = getStored(FONT_SIZE_KEY);
        if (fontSize && FONT_SCALES[fontSize]) {
          const scale = FONT_SCALES[fontSize];
          root.style.setProperty("--user-font-scale", String(scale));
          root.style.fontSize = `${Math.round(scale * 16)}px`;
        }

        const reducedMotion = getStored(REDUCED_MOTION_KEY);
        root.classList.toggle("reduced-motion", reducedMotion === "true");

        const compactMode = getStored(COMPACT_MODE_KEY);
        root.classList.toggle("compact-mode", compactMode === "true");

        const accentColor = getStored(ACCENT_COLOR_KEY);
        if (accentColor && ACCENT_PRESETS[accentColor]) {
          applyAccentToRoot(root, ACCENT_PRESETS[accentColor]);
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
