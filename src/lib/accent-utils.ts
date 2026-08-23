/* Shared accent color utility */

export interface AccentPreset {
  primary: string;
  secondary: string;
  deep: string;
  glow: string;
}

export const ACCENT_PRESETS: Record<string, AccentPreset> = {
  emerald: { primary: "#10b981", secondary: "#6ee7b7", deep: "#059669", glow: "rgba(16,185,129,0.45)" },
  blue:    { primary: "#3b82f6", secondary: "#93c5fd", deep: "#2563eb", glow: "rgba(59,130,246,0.45)" },
  violet:  { primary: "#8b5cf6", secondary: "#c4b5fd", deep: "#7c3aed", glow: "rgba(139,92,246,0.45)" },
  rose:    { primary: "#f43f5e", secondary: "#fda4af", deep: "#e11d48", glow: "rgba(244,63,94,0.45)" },
  cyan:    { primary: "#06b6d4", secondary: "#67e8f9", deep: "#0891b2", glow: "rgba(6,182,212,0.45)" },
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

let accentStyleEl: HTMLStyleElement | null = null;

export function applyAccentToRoot(root: HTMLElement, preset: AccentPreset) {
  const [r, g, b] = hexToRgb(preset.primary);
  const [r2, g2, b2] = hexToRgb(preset.secondary);
  const [rd, gd, bd] = hexToRgb(preset.deep);

  /* Set CSS vars on :root */
  root.style.setProperty("--accent", preset.primary);
  root.style.setProperty("--accent-2", preset.secondary);
  root.style.setProperty("--accent-deep", preset.deep);
  root.style.setProperty("--accent-glow", preset.glow);

  /* Inject a dynamic <style> that overrides all Tailwind emerald classes */
  const css = generateAccentCSS(r, g, b, r2, g2, b2, rd, gd, bd);
  if (!accentStyleEl) {
    accentStyleEl = document.createElement("style");
    accentStyleEl.id = "accent-dynamic";
    document.head.appendChild(accentStyleEl);
  }
  accentStyleEl.textContent = css;
}

function ra(r: number, g: number, b: number, a: number): string {
  return `rgba(${r},${g},${b},${a})`;
}

function generateAccentCSS(
  r: number, g: number, b: number,
  r2: number, g2: number, b2: number,
  rd: number, gd: number, bd: number,
): string {
  const p = ra; // shorthand
  return `
/* Dynamic accent overrides */
.text-emerald-400, .text-emerald-300, .text-emerald-500 { color: ${p(r,g,b,1)} !important; }
.text-emerald-300 { color: ${p(r2,g2,b2,1)} !important; }
.text-emerald-500 { color: ${p(rd,gd,bd,1)} !important; }
.fill-emerald-400 { fill: ${p(r,g,b,1)} !important; }
.bg-emerald-500\/5, .bg-emerald-500\/5 { background: ${p(r,g,b,0.05)} !important; }
.bg-emerald-500\/8, .bg-emerald-500\/8 { background: ${p(r,g,b,0.08)} !important; }
.bg-emerald-500\/10, .bg-emerald-500\/10 { background: ${p(r,g,b,0.1)} !important; }
.bg-emerald-500\/15, .bg-emerald-500\/15 { background: ${p(r,g,b,0.15)} !important; }
.bg-emerald-500\/20, .bg-emerald-500\/20 { background: ${p(r,g,b,0.2)} !important; }
.bg-emerald-500\/25, .bg-emerald-500\/25 { background: ${p(r,g,b,0.25)} !important; }
.bg-emerald-500\/30, .bg-emerald-500\/30 { background: ${p(r,g,b,0.3)} !important; }
.bg-emerald-500\/40, .bg-emerald-500\/40 { background: ${p(r,g,b,0.4)} !important; }
.bg-emerald-500\/50, .bg-emerald-500\/50 { background: ${p(r,g,b,0.5)} !important; }
.bg-emerald-500\/60, .bg-emerald-500\/60 { background: ${p(r,g,b,0.6)} !important; }
.bg-emerald-500\/70, .bg-emerald-500\/70 { background: ${p(r,g,b,0.7)} !important; }
.bg-emerald-500\/80, .bg-emerald-500\/80 { background: ${p(r,g,b,0.8)} !important; }
.border-emerald-500\/10, .border-emerald-500\/10 { border-color: ${p(r,g,b,0.1)} !important; }
.border-emerald-500\/15, .border-emerald-500\/15 { border-color: ${p(r,g,b,0.15)} !important; }
.border-emerald-500\/20, .border-emerald-500\/20 { border-color: ${p(r,g,b,0.2)} !important; }
.border-emerald-500\/25, .border-emerald-500\/25 { border-color: ${p(r,g,b,0.25)} !important; }
.border-emerald-500\/30, .border-emerald-500\/30 { border-color: ${p(r,g,b,0.3)} !important; }
.border-emerald-500\/40, .border-emerald-500\/40 { border-color: ${p(r,g,b,0.4)} !important; }
.border-emerald-500\/50, .border-emerald-500\/50 { border-color: ${p(r,g,b,0.5)} !important; }
.shadow-emerald-500\/20, .shadow-emerald-400\/50 { --tw-shadow-color: ${p(r,g,b,0.4)} !important; }
.ring-emerald-500\/30, .ring-emerald-400\/50 { --tw-ring-color: ${p(r,g,b,0.3)} !important; }
`; 
}
