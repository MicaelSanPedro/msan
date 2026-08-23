/* Shared accent color utility — Tailwind v4 compatible
 * Dual approach:
 *   1. Sets --color-emerald-* CSS custom properties (for color-mix() opacity variants)
 *   2. Injects a <style> with !important overrides (belt-and-suspenders for all emerald classes)
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

function rgba(r: number, g: number, b: number, a: number): string {
  return `rgba(${r},${g},${b},${a})`;
}

function lighten(rgb: [number, number, number], t: number): [number, number, number] {
  return [
    Math.round(rgb[0] + (255 - rgb[0]) * t),
    Math.round(rgb[1] + (255 - rgb[1]) * t),
    Math.round(rgb[2] + (255 - rgb[2]) * t),
  ];
}

function darken(rgb: [number, number, number], t: number): [number, number, number] {
  return [
    Math.round(rgb[0] * (1 - t)),
    Math.round(rgb[1] * (1 - t)),
    Math.round(rgb[2] * (1 - t)),
  ];
}

function rgbStr(c: [number, number, number]): string {
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

/** Generate a full emerald 50-950 scale from 3 accent colors */
function generateScale(
  primary: [number, number, number],
  secondary: [number, number, number],
  deep: [number, number, number],
): Record<string, [number, number, number]> {
  return {
    "50":  lighten(secondary, 0.85),
    "100": lighten(secondary, 0.7),
    "200": lighten(secondary, 0.45),
    "300": secondary,
    "400": primary,
    "500": darken(primary, 0.15),
    "600": deep,
    "700": darken(deep, 0.2),
    "800": darken(deep, 0.4),
    "900": darken(deep, 0.6),
    "950": darken(deep, 0.8),
  };
}

let accentStyleEl: HTMLStyleElement | null = null;

/** Generate comprehensive CSS that overrides ALL emerald utility classes */
function generateAccentCSS(scale: Record<string, [number, number, number]>): string {
  const r = (shade: string, a: number) => {
    const c = scale[shade];
    if (!c) return rgba(0, 0, 0, a);
    return rgba(c[0], c[1], c[2], a);
  };
  const c = (shade: string) => {
    const v = scale[shade];
    return v ? rgbStr(v) : "rgb(0,0,0)";
  };

  /* Escape helper for CSS selectors with / */
  const s = (cls: string) => cls.replace(/\//g, "\\/");

  let css = `/* Accent dynamic overrides */\n`;

  /* text-emerald-* (all shades used) */
  ["50", "100", "200", "300", "400", "950"].forEach(shade => {
    css += `.${s(`text-emerald-${shade}`)}{color:${c(shade)} !important}\n`;
  });
  /* text-emerald with opacity variants */
  ["300/70", "300/80", "400/30", "400/50", "400/60", "400/70", "400/80", "200/80"].forEach(v => {
    const [shade, op] = v.split("/");
    css += `.${s(`text-emerald-${v}`)}{color:${r(shade, parseInt(op) / 100)} !important}\n`;
  });

  /* bg-emerald-* full opacity */
  ["400", "500", "600"].forEach(shade => {
    css += `.${s(`bg-emerald-${shade}`)}{background-color:${c(shade)} !important}\n`;
  });
  /* bg-emerald-500/opacity */
  ["10", "15", "20", "30", "50"].forEach(op => {
    css += `.${s(`bg-emerald-500/${op}`)}{background-color:${r("500", parseInt(op) / 100)} !important}\n`;
  });
  /* bg-emerald-900/60 (used in CategoryBadge) */
  css += `.${s("bg-emerald-900/60")}{background-color:${r("900", 0.6)} !important}\n`;
  /* bg-emerald-500/[arbitrary] */
  css += `.${s("bg-emerald-500/[0.04]")}{background-color:${r("500", 0.04)} !important}\n`;
  css += `.${s("bg-emerald-500/[0.06]")}{background-color:${r("500", 0.06)} !important}\n`;
  css += `.${s("bg-emerald-500/[0.08]")}{background-color:${r("500", 0.08)} !important}\n`;

  /* border-emerald-* */
  ["500"].forEach(shade => {
    css += `.${s(`border-emerald-${shade}`)}{border-color:${c(shade)} !important}\n`;
  });
  ["400/15", "400/20", "400/25", "400/30", "500/15", "500/20", "500/30", "500/50"].forEach(v => {
    const [shade, op] = v.split("/");
    css += `.${s(`border-emerald-${v}`)}{border-color:${r(shade, parseInt(op) / 100)} !important}\n`;
  });
  css += `.${s("border-emerald-500/[0.03]")}{border-color:${r("500", 0.03)} !important}\n`;

  /* fill-emerald-400 */
  css += `.fill-emerald-400{fill:${c("400")} !important}\n`;

  /* Gradient from/to/via emerald */
  ["300", "400", "500"].forEach(shade => {
    css += `.from-emerald-${shade}{--tw-gradient-from:${c(shade)} !important}\n`;
    css += `.to-emerald-${shade}{--tw-gradient-to:${c(shade)} !important}\n`;
  });
  /* Gradient with opacity */
  ["400/20", "400/40", "400/90", "500/30"].forEach(v => {
    const [shade, op] = v.split("/");
    css += `.from-emerald-${s(v)}{--tw-gradient-from:${r(shade, parseInt(op) / 100)} !important}\n`;
  });
  ["500/10", "600/10", "600/30"].forEach(v => {
    const [shade, op] = v.split("/");
    css += `.to-emerald-${s(v)}{--tw-gradient-to:${r(shade, parseInt(op) / 100)} !important}\n`;
  });
  ["300/30", "400/50", "500/10", "500/30"].forEach(v => {
    const [shade, op] = v.split("/");
    css += `.via-emerald-${s(v)}{--tw-gradient-via:${r(shade, parseInt(op) / 100)} !important}\n`;
  });
  css += `.from-emerald-${s("900/15")}{--tw-gradient-from:${r("900", 0.15)} !important}\n`;
  css += `.from-emerald-${s("500/[0.06]")}{--tw-gradient-from:${r("500", 0.06)} !important}\n`;

  /* Shadow and ring */
  css += `.shadow-emerald-500\/20, .shadow-emerald-400\/50{--tw-shadow-color:${r("400", 0.4)} !important}\n`;
  css += `.ring-emerald-500\/30, .ring-emerald-400\/50{--tw-ring-color:${r("400", 0.3)} !important}\n`;

  return css;
}

export function applyAccentToRoot(root: HTMLElement, preset: AccentPreset) {
  const primary = hexToRgb(preset.primary);
  const secondary = hexToRgb(preset.secondary);
  const deep = hexToRgb(preset.deep);
  const scale = generateScale(primary, secondary, deep);

  /* 1. Set semantic CSS vars used in globals.css custom classes */
  root.style.setProperty("--accent", preset.primary);
  root.style.setProperty("--accent-2", preset.secondary);
  root.style.setProperty("--accent-deep", preset.deep);
  root.style.setProperty("--accent-glow", preset.glow);
  root.style.setProperty("--accent-rgb", `${primary[0]}, ${primary[1]}, ${primary[2]}`);
  root.style.setProperty("--accent-2-rgb", `${secondary[0]}, ${secondary[1]}, ${secondary[2]}`);
  root.style.setProperty("--accent-deep-rgb", `${deep[0]}, ${deep[1]}, ${deep[2]}`);
  root.style.setProperty("--accent-light", rgbStr(lighten(secondary, 0.45)));
  root.style.setProperty("--accent-dark", rgbStr(darken(deep, 0.8)));

  /* 2. Override --color-emerald-* for Tailwind v4 color-mix() */
  for (const [shade, rgb] of Object.entries(scale)) {
    root.style.setProperty(`--color-emerald-${shade}`, rgbStr(rgb));
  }

  /* 3. Inject <style> with !important overrides for all Tailwind emerald classes */
  const css = generateAccentCSS(scale);
  if (!accentStyleEl) {
    accentStyleEl = document.createElement("style");
    accentStyleEl.id = "accent-dynamic";
    document.head.appendChild(accentStyleEl);
  }
  accentStyleEl.textContent = css;
}

/** Remove all accent overrides, restoring defaults */
export function removeAccentFromRoot(root: HTMLElement) {
  ["--accent", "--accent-2", "--accent-deep", "--accent-glow", "--accent-rgb", "--accent-2-rgb", "--accent-deep-rgb", "--accent-light", "--accent-dark"].forEach(v =>
    root.style.removeProperty(v)
  );
  for (const shade of ["50","100","200","300","400","500","600","700","800","900","950"]) {
    root.style.removeProperty(`--color-emerald-${shade}`);
  }
  if (accentStyleEl) {
    accentStyleEl.remove();
    accentStyleEl = null;
  }
}
