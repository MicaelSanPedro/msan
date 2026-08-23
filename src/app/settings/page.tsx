"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  User,
  Moon,
  Sun,
  Trash2,
  ChevronRight,
  ArrowLeft,
  Shield,
  Type,
  Monitor,
  Smartphone,
  Info,
  Heart,
  Zap,
  RotateCcw,
  HardDrive,
  Palette,
  Keyboard,
  Globe,
  Sparkles,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  Check,
  Clock,
  Layout,
  Eye,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ToggleSlider } from "@/components/ToggleSlider";
import { applyAccentToRoot, removeAccentFromRoot, ACCENT_PRESETS, type AccentPreset } from "@/lib/accent-utils";
import { useSession } from "next-auth/react";

/* ─── Storage helpers ─── */
const KEYS = {
  theme: "techmate_theme",
  fontSize: "techmate_font_size",
  reducedMotion: "techmate_reduced_motion",
  compactMode: "techmate_compact_mode",
  accentColor: "techmate_accent_color",
} as const;

function getStored(key: string): string | null {
  if (typeof window === "undefined") return null;
  try { return localStorage.getItem(key); } catch { return null; }
}
function setStored(key: string, val: string) {
  try { localStorage.setItem(key, val); } catch { /* ignore */ }
}
function removeStored(key: string) {
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}

function getStorageSize(): string {
  if (typeof window === "undefined") return "0 B";
  try {
    let total = 0;
    for (const key of Object.keys(localStorage)) {
      total += (localStorage.getItem(key) || "").length;
    }
    if (total < 1024) return `${total} B`;
    return `${(total / 1024).toFixed(1)} KB`;
  } catch { return "0 B"; }
}
function getVisitCount(): number {
  try {
    const stored = localStorage.getItem("techmate_visits");
    if (stored) {
      const count = parseInt(stored, 10) + 1;
      localStorage.setItem("techmate_visits", String(count));
      return count;
    }
    localStorage.setItem("techmate_visits", "1");
    return 1;
  }
  catch { return 1; }
}
function getFirstVisit(): string {
  try {
    const stored = localStorage.getItem("techmate_first_visit");
    if (stored) return stored;
    const now = new Date();
    const formatted = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()}`;
    localStorage.setItem("techmate_first_visit", formatted);
    return formatted;
  }
  catch { return "Hoje"; }
}

/* ─── Font size presets ─── */
const FONT_SIZES = [
  { label: "Pequeno", value: "small", scale: 14, desc: "Textos mais compactos" },
  { label: "Padrao", value: "medium", scale: 16, desc: "Tamanho original do site" },
  { label: "Grande", value: "large", scale: 18, desc: "Textos maiores e mais legiveis" },
  { label: "Extra grande", value: "xlarge", scale: 20, desc: "Maxima legibilidade" },
] as const;

/* ─── Accent colors ─── */
const ACCENT_COLORS = [
  { label: "Esmeralda", value: "emerald", primary: "#34d399", secondary: "#6ee7b7", deep: "#059669", glow: "rgba(52,211,153,0.45)" },
  { label: "Azul", value: "blue", primary: "#60a5fa", secondary: "#93c5fd", deep: "#2563eb", glow: "rgba(96,165,250,0.45)" },
  { label: "Violeta", value: "violet", primary: "#a78bfa", secondary: "#c4b5fd", deep: "#7c3aed", glow: "rgba(167,139,250,0.45)" },
  { label: "Rosa", value: "rose", primary: "#fb7185", secondary: "#fda4af", deep: "#e11d48", glow: "rgba(251,113,133,0.45)" },
  { label: "Ciano", value: "cyan", primary: "#22d3ee", secondary: "#67e8f9", deep: "#0891b2", glow: "rgba(34,211,238,0.45)" },
  { label: "Branco", value: "white", primary: "#e2e8f0", secondary: "#f1f5f9", deep: "#94a3b8", glow: "rgba(226,232,240,0.35)" },
] as const;

/* ─── Sub-components ─── */

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-xl
                      bg-emerald-500/[0.08] border border-emerald-500/15">
        <Icon className="w-4 h-4 text-emerald-400" />
      </div>
      <h2 className="text-base font-bold text-white/90">{title}</h2>
    </div>
  );
}

function SettingRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 rounded-xl
                    hover:bg-white/[0.03] transition-colors duration-200">
      {children}
    </div>
  );
}

function SettingLabel({ label, description }: { label: string; description?: string }) {
  return (
    <div className="flex-1 mr-4">
      <p className="text-sm font-medium text-white/80">{label}</p>
      {description && <p className="text-xs text-white/35 mt-0.5">{description}</p>}
    </div>
  );
}

/* Toggle component replaced by ToggleSlider (v1/v2/v3 physical sliders) */

function DangerButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [confirm, setConfirm] = useState(false);

  if (!confirm) {
    return (
      <button
        type="button"
        onClick={() => setConfirm(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold
                   border border-red-500/20 bg-red-500/[0.08] text-red-400
                   hover:bg-red-500/[0.15] transition-colors cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
        {children}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-[11px] text-red-400/70 mr-1">Tem certeza?</p>
      <button
        type="button"
        onClick={() => { onClick(); setConfirm(false); }}
        className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer
                   border border-red-500/30 bg-red-500/[0.15] text-red-400
                   hover:bg-red-500/[0.25] transition-colors"
      >
        Sim, limpar
      </button>
      <button
        type="button"
        onClick={() => setConfirm(false)}
        className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer
                   border border-white/30 bg-white/[0.03] text-white/40
                   hover:bg-white/[0.06] transition-colors"
      >
        Cancelar
      </button>
    </div>
  );
}

function Divider() {
  return <div className="h-px mx-4 my-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />;
}

/* Segmented control for selecting from options */
function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  renderLabel,
}: {
  options: readonly { label: string; value: T; desc?: string }[];
  value: T;
  onChange: (val: T) => void;
  renderLabel?: (opt: { label: string; value: T; desc?: string }) => string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer
                       ${isActive
                         ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 shadow-[0_0_12px_var(--accent-glow)]"
                         : "bg-white/[0.03] border border-white/30 text-white/40 hover:bg-white/[0.06] hover:text-white/60"}`}
          >
            {renderLabel ? renderLabel(opt) : opt.label}
            {isActive && <Check className="w-3 h-3 inline ml-1" />}
          </button>
        );
      })}
    </div>
  );
}

/* Color picker grid */
function ColorPicker({
  colors,
  value,
  onChange,
}: {
  colors: typeof ACCENT_COLORS;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((c) => {
        const isActive = value === c.value;
        return (
          <button
            key={c.value}
            type="button"
            onClick={() => onChange(c.value)}
            className="relative w-9 h-9 rounded-xl border-2 transition-all duration-200 cursor-pointer
                       hover:scale-110 active:scale-95"
            style={{
              backgroundColor: c.primary,
              borderColor: isActive ? c.primary : "transparent",
              boxShadow: isActive ? `0 0 16px ${c.glow}` : "none",
              opacity: isActive ? 1 : 0.5,
            }}
            title={c.label}
          >
            {isActive && (
              <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow-md" />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Main Settings Page ─── */

export default function SettingsPage() {
  const { data: session } = useSession();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [fontSize, setFontSize] = useState<string>("medium");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [accentColor, setAccentColor] = useState("emerald");
  const [mounted, setMounted] = useState(false);
  const [storageSize, setStorageSize] = useState("0 B");
  const [visitCount, setVisitCount] = useState(1);
  const [firstVisit, setFirstVisit] = useState("Hoje");
  const [savedMsg, setSavedMsg] = useState("");

  const hydrate = useCallback(() => {
    setMounted(true);

    const t = getStored(KEYS.theme);
    if (t === "light") setTheme("light");

    const fs = getStored(KEYS.fontSize);
    if (fs) setFontSize(fs);

    const rm = getStored(KEYS.reducedMotion);
    if (rm === "true") setReducedMotion(true);

    const cm = getStored(KEYS.compactMode);
    if (cm === "true") setCompactMode(true);

    const ac = getStored(KEYS.accentColor);
    if (ac) setAccentColor(ac);

    setStorageSize(getStorageSize());
    setVisitCount(getVisitCount());
    setFirstVisit(getFirstVisit());
  }, []);

  useEffect(() => { hydrate(); }, [hydrate]);

  /* ── Apply preferences to document ── */
  const applyFontSize = useCallback((size: string) => {
    const root = document.documentElement;
    const preset = FONT_SIZES.find((f) => f.value === size);
    if (preset) {
      const scale = preset.scale / 16;
      root.style.setProperty("--user-font-scale", String(scale));
      root.style.fontSize = `${preset.scale}px`;
    } else {
      root.style.removeProperty("--user-font-scale");
      root.style.fontSize = "";
    }
  }, []);

  const applyReducedMotion = useCallback((enabled: boolean) => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add("reduced-motion");
    } else {
      root.classList.remove("reduced-motion");
    }
  }, []);

  const applyCompactMode = useCallback((enabled: boolean) => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add("compact-mode");
    } else {
      root.classList.remove("compact-mode");
    }
  }, []);

  const applyAccentColor = useCallback((color: string) => {
    const preset = ACCENT_PRESETS[color];
    if (!preset) return;
    applyAccentToRoot(document.documentElement, preset);
    document.documentElement.setAttribute("data-accent", color);
  }, []);

  /* Apply on mount */
  useEffect(() => {
    if (!mounted) return;
    applyFontSize(fontSize);
    applyReducedMotion(reducedMotion);
    applyCompactMode(compactMode);
    applyAccentColor(accentColor);
  }, [mounted, fontSize, reducedMotion, compactMode, accentColor, applyFontSize, applyReducedMotion, applyCompactMode, applyAccentColor]);

  const showSaved = useCallback(() => {
    setSavedMsg("Salvo!");
    setTimeout(() => setSavedMsg(""), 2000);
  }, []);

  /* ── Handlers ── */
  const handleThemeToggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setStored(KEYS.theme, next);
    if (next === "light") {
      document.documentElement.classList.remove("dark");
      const m = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
      if (m) m.content = "#f0f5f2";
    } else {
      document.documentElement.classList.add("dark");
      const m = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
      if (m) m.content = "#060a08";
    }
    showSaved();
  };

  const handleFontSizeChange = (val: string) => {
    setFontSize(val);
    setStored(KEYS.fontSize, val);
    applyFontSize(val);
    showSaved();
  };

  const handleReducedMotionToggle = (val: boolean) => {
    setReducedMotion(val);
    setStored(KEYS.reducedMotion, String(val));
    applyReducedMotion(val);
    showSaved();
  };

  const handleCompactModeToggle = (val: boolean) => {
    setCompactMode(val);
    setStored(KEYS.compactMode, String(val));
    applyCompactMode(val);
    showSaved();
  };

  const handleAccentColorChange = (val: string) => {
    setAccentColor(val);
    setStored(KEYS.accentColor, val);
    applyAccentColor(val);
    showSaved();
  };

  const handleClearData = () => {
    try { localStorage.clear(); } catch { /* ignore */ }
    setTheme("dark");
    setFontSize("medium");
    setReducedMotion(false);
    setCompactMode(false);
    setAccentColor("emerald");
    setStorageSize("0 B");
    setVisitCount(0);
    setFirstVisit("Hoje");
    localStorage.removeItem("techmate_visits");
    localStorage.removeItem("techmate_first_visit");
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("reduced-motion", "compact-mode");
    document.documentElement.style.removeProperty("--user-font-scale");
    document.documentElement.style.fontSize = "";
    removeAccentFromRoot(document.documentElement);
    const m = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (m) m.content = "#060a08";
    window.dispatchEvent(new CustomEvent("techmate:username-set"));
    showSaved();
  };

  const handleResetTheme = () => {
    setTheme("dark");
    setStored(KEYS.theme, "dark");
    document.documentElement.classList.add("dark");
    const m = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (m) m.content = "#060a08";
    showSaved();
  };

  /* ── Compute display values ── */
  const currentFontLabel = FONT_SIZES.find((f) => f.value === fontSize)?.label || "Padrao";
  const currentAccentLabel = ACCENT_COLORS.find((c) => c.value === accentColor)?.label || "Esmeralda";
  const currentAccentColor = ACCENT_COLORS.find((c) => c.value === accentColor)?.primary || "#34d399";

  if (!mounted) return null;

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* ── Header ── */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-xl
                       liquid-glass-pill
                       hover:bg-white/[0.08] active:scale-95
                       transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 text-white/60" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Configurações</h1>
            <p className="text-xs text-white/35 mt-0.5">Personalize sua experiência no TechMate</p>
          </div>
          {savedMsg && (
            <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-emerald-400 animate-fade-in">
              <Check className="w-3.5 h-3.5" />
              {savedMsg}
            </span>
          )}
        </div>

        {/* ══════════════════════════════════════════
            SECTION 1: CONTA
        ══════════════════════════════════════════ */}
        <section className="liquid-glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <SectionTitle icon={User} title="Conta" />
          <Divider />

          {session?.user ? (
            <>
              <div className="flex items-center gap-4 py-3 px-4">
                {session.user.image ? (
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0
                              border-2 border-emerald-400/30 shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                    <img src={session.user.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-14 h-14 rounded-full shrink-0
                              bg-gradient-to-br from-emerald-400/20 to-emerald-500/10 border border-emerald-400/20">
                    <User className="w-7 h-7 text-emerald-400" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white/85 truncate">
                    {session.user.name || session.user.login || "Usuario"}
                  </p>
                  <p className="text-xs text-white/35 mt-0.5 flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Conectado via GitHub
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="py-6 px-4 text-center">
              <p className="text-sm text-white/50 mb-3">Voce nao esta conectado</p>
              <button
                onClick={() => {
                  const event = new CustomEvent("techmate:signin-open");
                  window.dispatchEvent(event);
                }}
                className="btn-primary text-sm"
              >
                Entrar com GitHub
              </button>
            </div>
          )}

          <Divider />

          <SettingRow>
            <SettingLabel label="Visitas ao site" description="Total de vezes que voce acessou o TechMate" />
            <span className="text-sm font-mono text-white/40 tabular-nums">{visitCount}x</span>
          </SettingRow>

          <Divider />

          <SettingRow>
            <SettingLabel label="Primeira visita" description="Quando voce descobriu o TechMate" />
            <span className="text-sm font-mono text-white/40">{firstVisit}</span>
          </SettingRow>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2: APARENCIA
        ══════════════════════════════════════════ */}
        <section className="liquid-glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <SectionTitle icon={Palette} title="Aparencia" />
          <Divider />

          {/* Theme toggle */}
          <SettingRow>
            <div className="flex items-center gap-3 flex-1 mr-4">
              <div className={`flex items-center justify-center w-9 h-9 rounded-xl border
                              ${theme === "dark"
                                ? "bg-indigo-500/[0.08] border-indigo-500/15"
                                : "bg-yellow-500/[0.08] border-yellow-500/15"}`}>
                {theme === "dark"
                  ? <Moon className="w-4 h-4 text-indigo-400" />
                  : <Sun className="w-4 h-4 text-yellow-400" />}
              </div>
              <SettingLabel
                label={theme === "dark" ? "Modo Escuro" : "Modo Claro"}
                description={theme === "dark"
                  ? "Ideal para uso noturno e ambientes com pouca luz"
                  : "Ideal para uso diurno e ambientes claros"}
              />
            </div>
            <ToggleSlider checked={theme === "light"} onChange={handleThemeToggle} variant="v3" aria-label="Alternar tema claro/escuro" />
          </SettingRow>

          <Divider />

          {/* Accent color */}
          <div className="py-3 px-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl
                              bg-white/[0.05] border border-white/30">
                <Palette className="w-4 h-4 text-white/50" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">Cor de destaque</p>
                <p className="text-xs text-white/35 mt-0.5">
                  Atual: <span className="font-semibold" style={{ color: currentAccentColor }}>{currentAccentLabel}</span>
                </p>
              </div>
            </div>
            <ColorPicker
              colors={ACCENT_COLORS}
              value={accentColor}
              onChange={handleAccentColorChange}
            />
          </div>

          <Divider />

          <SettingRow>
            <SettingLabel
              label="Restaurar tema padrao"
              description="Volta para o modo escuro (tema padrao do TechMate)"
            />
            <button
              type="button"
              onClick={handleResetTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                         bg-white/[0.04] border border-white/30 text-white/50
                         hover:bg-white/[0.07] hover:text-white/70 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Restaurar
            </button>
          </SettingRow>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 3: PREFERENCIAS (tudo funcional!)
        ══════════════════════════════════════════ */}
        <section className="liquid-glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <SectionTitle icon={Monitor} title="Preferencias" />
          <Divider />

          {/* Font size — interactive selector */}
          <div className="py-3 px-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl
                              bg-emerald-500/[0.08] border border-emerald-500/15">
                <Type className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">Tamanho da fonte</p>
                <p className="text-xs text-white/35 mt-0.5">
                  Atual: <span className="font-semibold text-white/60">{currentFontLabel}</span>
                </p>
              </div>
            </div>
            <SegmentedControl
              options={FONT_SIZES.map((f) => ({ label: f.label, value: f.value }))}
              value={fontSize}
              onChange={handleFontSizeChange}
            />
            {/* Preview */}
            <div className="mt-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <p className="text-white/50 transition-all duration-200"
                 style={{ fontSize: `${(FONT_SIZES.find((f) => f.value === fontSize)?.scale || 16)}px` }}>
                Exemplo de texto para preview do tamanho escolhido.
              </p>
            </div>
          </div>

          <Divider />

          {/* Reduced motion toggle */}
          <SettingRow>
            <div className="flex items-center gap-3 flex-1 mr-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl border
                              bg-white/[0.05] border-white/30">
                {reducedMotion
                  ? <VolumeX className="w-4 h-4 text-white/50" />
                  : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <SettingLabel
                label="Animacoes reduzidas"
                description={reducedMotion
                  ? "Animacoes desativadas para melhor acessibilidade"
                  : "Ative para reduzir animacoes e efeitos visuais"}
              />
            </div>
            <ToggleSlider checked={reducedMotion} onChange={handleReducedMotionToggle} variant="v3" aria-label="Animações reduzidas" />
          </SettingRow>

          <Divider />

          {/* Compact mode toggle */}
          <SettingRow>
            <div className="flex items-center gap-3 flex-1 mr-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl border
                              bg-white/[0.05] border-white/30">
                {compactMode
                  ? <Minimize2 className="w-4 h-4 text-emerald-400" />
                  : <Maximize2 className="w-4 h-4 text-white/50" />}
              </div>
              <SettingLabel
                label="Modo compacto"
                description={compactMode
                  ? "Espaçamento reduzido, mais conteúdo na tela"
                  : "Ative para reduzir espaçamentos e mostrar mais conteúdo"}
              />
            </div>
            <ToggleSlider checked={compactMode} onChange={handleCompactModeToggle} variant="v3" aria-label="Modo compacto" />
          </SettingRow>

          <Divider />

          {/* Language (locked to PT-BR for now) */}
          <SettingRow>
            <div className="flex items-center gap-3 flex-1 mr-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl
                              bg-emerald-500/[0.08] border border-emerald-500/15">
                <Globe className="w-4 h-4 text-emerald-400" />
              </div>
              <SettingLabel
                label="Idioma"
                description="Portugues Brasileiro (unico idioma disponivel no momento)"
              />
            </div>
            <span className="text-xs font-medium text-white/30 px-2.5 py-1 rounded-lg
                           bg-white/[0.03] border border-white/[0.06]">
              PT-BR
            </span>
          </SettingRow>

          <Divider />

          {/* Keyboard shortcuts link */}
          <SettingRow>
            <div className="flex items-center gap-3 flex-1 mr-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl
                              bg-emerald-500/[0.08] border border-emerald-500/15">
                <Keyboard className="w-4 h-4 text-emerald-400" />
              </div>
              <SettingLabel
                label="Atalhos de teclado"
                description="Atalhos rapidos para navegar no site"
              />
            </div>
            <Link
              href="/settings#shortcuts"
              className="flex items-center gap-1 text-xs text-emerald-400/70 hover:text-emerald-300 transition-colors"
            >
              Ver
              <ChevronRight className="w-3 h-3" />
            </Link>
          </SettingRow>

          <Divider />

          {/* Platform info */}
          <SettingRow>
            <div className="flex items-center gap-3 flex-1 mr-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl
                              bg-emerald-500/[0.08] border border-emerald-500/15">
                <Smartphone className="w-4 h-4 text-emerald-400" />
              </div>
              <SettingLabel
                label="Plataforma"
                description="Dispositivo que você está usando"
              />
            </div>
            <span className="text-xs font-medium text-white/30 px-2.5 py-1 rounded-lg
                           bg-white/[0.03] border border-white/[0.06]">
              Web
            </span>
          </SettingRow>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 4: ARMAZENAMENTO
        ══════════════════════════════════════════ */}
        <section className="liquid-glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <SectionTitle icon={HardDrive} title="Armazenamento" />
          <Divider />

          <SettingRow>
            <div className="flex items-center gap-3 flex-1 mr-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl
                              bg-emerald-500/[0.08] border border-emerald-500/15">
                <HardDrive className="w-4 h-4 text-emerald-400" />
              </div>
              <SettingLabel
                label="Dados salvos"
                description="Espaco usado pelo TechMate no seu navegador"
              />
            </div>
            <span className="text-sm font-mono text-white/40 tabular-nums">{storageSize}</span>
          </SettingRow>

          {/* Storage breakdown */}
          <Divider />
          <div className="px-4 py-3">
            <p className="text-xs text-white/30 mb-2 font-medium uppercase tracking-wider">Dados armazenados</p>
            <div className="space-y-1.5">
              {[
                { label: "Tema", key: KEYS.theme },
                { label: "Tamanho da fonte", key: KEYS.fontSize },
                { label: "Animacoes reduzidas", key: KEYS.reducedMotion },
                { label: "Modo compacto", key: KEYS.compactMode },
                { label: "Cor de destaque", key: KEYS.accentColor },
              ].map((item) => {
                const val = getStored(item.key);
                return (
                  <div key={item.key} className="flex items-center justify-between py-1.5">
                    <span className="text-xs text-white/45">{item.label}</span>
                    <span className="text-xs text-white/25 font-mono truncate max-w-[140px]">
                      {val || "(vazio)"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <Divider />

          <div className="py-3 px-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-white/25" />
              <p className="text-xs text-white/30">
                Todos os dados sao armazenados localmente no seu navegador. Nada e enviado para servidores.
              </p>
            </div>
            <DangerButton onClick={handleClearData}>
              Limpar todos os dados
            </DangerButton>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 5: ATALHOS DE TECLADO
        ══════════════════════════════════════════ */}
        <section className="liquid-glass-card rounded-2xl p-5 sm:p-6 mb-5" id="shortcuts">
          <SectionTitle icon={Keyboard} title="Atalhos de Teclado" />
          <Divider />

          <div className="space-y-0.5 py-2">
            {[
              { keys: ["Ctrl", "K"], desc: "Abrir busca" },
              { keys: ["Ctrl", "/"], desc: "Ir para blog" },
              { keys: ["Esc"], desc: "Fechar painel/busca" },
              { keys: ["T"], desc: "Ir para o topo" },
            ].map((shortcut) => (
              <div key={shortcut.desc} className="flex items-center justify-between px-4 py-2.5">
                <span className="text-sm text-white/50">{shortcut.desc}</span>
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, i) => (
                    <span key={i}>
                      <kbd className="inline-flex items-center justify-center px-2 py-0.5 rounded-md
                                   text-[11px] font-mono font-medium
                                   bg-white/[0.06] border border-white/30
                                   text-white/40 min-w-[1.75rem]">
                        {key}
                      </kbd>
                      {i < shortcut.keys.length - 1 && (
                        <span className="text-white/15 mx-0.5 text-[10px]">+</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 6: SOBRE
        ══════════════════════════════════════════ */}
        <section className="liquid-glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <SectionTitle icon={Info} title="Sobre o TechMate" />
          <Divider />

          <div className="flex items-center gap-4 py-4 px-4">
            <Logo className="w-14 h-14" glow />
            <div>
              <h3 className="text-base font-bold text-white/90">TechMate</h3>
              <p className="text-xs text-white/35 mt-0.5">Seu parceiro em tech</p>
              <p className="text-[10px] text-white/20 mt-1 font-mono">v1.0.0</p>
            </div>
          </div>

          <Divider />

          <SettingRow>
            <SettingLabel label="Feito com" />
            <div className="flex items-center gap-1 text-red-400/60 text-xs">
              <Heart className="w-3 h-3" />
              <span>por Micael</span>
            </div>
          </SettingRow>

          <Divider />

          <SettingRow>
            <SettingLabel
              label="Tecnologias"
              description="Next.js, React, Tailwind CSS, TypeScript"
            />
            <div className="flex items-center gap-1.5">
              {["Next.js", "React", "Tailwind"].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium
                           bg-white/[0.04] border border-white/30 text-white/35"
                >
                  {tech}
                </span>
              ))}
            </div>
          </SettingRow>

          <Divider />

          <div className="py-3 px-4">
            <p className="text-xs text-white/25 leading-relaxed">
              TechMate é um blog independente focado em conteúdo técnico honesto e prático.
              Tutoriais sobre Linux, Windows, desenvolvimento, segurança e gaming.
              Sem enrolação, direto ao ponto.
            </p>
          </div>
        </section>

        {/* ── Footer ── */}
        <div className="flex items-center justify-center gap-2 pt-4 pb-2">
          <Zap className="w-3 h-3 text-emerald-400/30" />
          <p className="text-[11px] text-white/15">TechMate v1.0.0</p>
        </div>

      </div>
    </div>
  );
}
