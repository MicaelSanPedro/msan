/* Shared accent color utility — Tailwind v4 compatible
 * Overrides --color-emerald-* CSS custom properties so ALL emerald utilities
 * (text-emerald-400, bg-emerald-500/20, border-emerald-500/30, arbitrary opacity, etc.)
 * automatically use the new accent color.
 */

export interface AccentPreset {
  primary: string;
  secondary: string;
  deep: string;
  glow: string;
}

export const ACCENT_PRESETS: Record<string, AccentPreset> = {
  emerald: { primary: "#34d399", secondary: "#6ee7b7", deep: "#059669", glow: "rgba(52,211,153,0.45)" },
  blue:    { primary: "#60a5fa", secondary: "#93c5fd", deep: "#2563eb", glow: "rgba(96,165,250,0.45)" },
  violet:  { primary: "#a78bfa", secondary: "#c4b5fd", deep: "#7c3aed", glow: "rgba(167,139,250,0.45)" },
  rose:    { primary: "#fb7185", secondary: "#fda4af", deep: "#e11d48", glow: "rgba(251,113,133,0.45)" },
  cyan:    { primary: "#22d3ee", secondary: "#67e8f9", deep: "#0891b2", glow: "rgba(34,211,238,0.45)" },
  white:   { primary: "#e2e8f0", secondary: "#f1f5f9", deep: "#94a3b8", glow: "rgba(226,232,240,0.35)" },
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/** Mix a color towards white (lighten) */
function lighten(rgb: [number, number, number], t: number): string {
  return `rgb(${Math.round(rgb[0] + (255 - rgb[0]) * t)},${Math.round(rgb[1] + (255 - rgb[1]) * t)},${Math.round(rgb[2] + (255 - rgb[2]) * t)})`;
}

/** Mix a color towards black (darken) */
function darken(rgb: [number, number, number], t: number): string {
  return `rgb(${Math.round(rgb[0] * (1 - t))},${Math.round(rgb[1] * (1 - t))},${Math.round(rgb[2] * (1 - t))})`;
}

/** Generate a full emerald 50-950 scale from 3 accent colors */
function generateScale(
  primary: [number, number, number],
  secondary: [number, number, number],
  deep: [number, number, number],
): Record<string, string> {
  return {
    "50":  lighten(secondary, 0.85),
    "100": lighten(secondary, 0.7),
    "200": lighten(secondary, 0.45),
    "300": `rgb(${secondary[0]},${secondary[1]},${secondary[2]})`,
    "400": `rgb(${primary[0]},${primary[1]},${primary[2]})`,
    "500": darken(primary, 0.15),
    "600": `rgb(${deep[0]},${deep[1]},${deep[2]})`,
    "700": darken(deep, 0.2),
    "800": darken(deep, 0.4),
    "900": darken(deep, 0.6),
    "950": darken(deep, 0.8),
  };
}

export function applyAccentToRoot(root: HTMLElement, preset: AccentPreset) {
  const primary = hexToRgb(preset.primary);
  const secondary = hexToRgb(preset.secondary);
  const deep = hexToRgb(preset.deep);

  /* Set semantic CSS vars */
  root.style.setProperty("--accent", preset.primary);
  root.style.setProperty("--accent-2", preset.secondary);
  root.style.setProperty("--accent-deep", preset.deep);
  root.style.setProperty("--accent-glow", preset.glow);

  /* Override Tailwind v4 --color-emerald-* custom properties.
   This makes ALL emerald utilities (including arbitrary opacity like /[0.08])
   automatically use the new accent color. */
  const scale = generateScale(primary, secondary, deep);
  for (const [shade, value] of Object.entries(scale)) {
    root.style.setProperty(`--color-emerald-${shade}`, value);
  }
}

/** Remove all accent overrides, restoring defaults */
export function removeAccentFromRoot(root: HTMLElement) {
  ["--accent", "--accent-2", "--accent-deep", "--accent-glow"].forEach(v =>
    root.style.removeProperty(v)
  );
  for (const shade of ["50","100","200","300","400","500","600","700","800","900","950"]) {
    root.style.removeProperty(`--color-emerald-${shade}`);
  }
  /* Remove old dynamic style if it exists */
  const old = document.getElementById("accent-dynamic");
  if (old) old.remove();
}
