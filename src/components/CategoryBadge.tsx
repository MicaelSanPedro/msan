import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  linux: "bg-emerald-900/60 text-emerald-100 border-emerald-500/50 shadow-[0_0_18px_-6px_rgba(52,211,153,0.5)]",
  windows: "bg-sky-900/60 text-sky-100 border-sky-500/50 shadow-[0_0_18px_-6px_rgba(56,189,248,0.5)]",
  dev: "bg-emerald-900/60 text-emerald-100 border-emerald-500/50 shadow-[0_0_18px_-6px_rgba(52,211,153,0.5)]",
  desenvolvimento: "bg-emerald-900/60 text-emerald-100 border-emerald-500/50 shadow-[0_0_18px_-6px_rgba(52,211,153,0.5)]",
  segurança: "bg-rose-900/60 text-rose-100 border-rose-500/50 shadow-[0_0_18px_-6px_rgba(251,113,133,0.5)]",
  hardware: "bg-violet-900/60 text-violet-100 border-violet-500/50 shadow-[0_0_18px_-6px_rgba(167,139,250,0.5)]",
  dicas: "bg-cyan-900/60 text-cyan-100 border-cyan-500/50 shadow-[0_0_18px_-6px_rgba(34,211,238,0.5)]",
  jogos: "bg-lime-900/60 text-lime-100 border-lime-500/50 shadow-[0_0_18px_-6px_rgba(163,230,53,0.5)]",
};

function getColorClasses(category: string): string {
  const key = category.toLowerCase();
  if (categoryColors[key]) return categoryColors[key];
  for (const [k, v] of Object.entries(categoryColors)) {
    if (key.includes(k)) return v;
  }
  return categoryColors.linux;
}

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "liquid-glass-pill inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider border",
        getColorClasses(category),
        className
      )}
    >
      <span className="w-1 h-1 rounded-full bg-current opacity-80" />
      {category}
    </span>
  );
}
