/**
 * TechMate Logo
 * Uses the SVG logo for crisp rendering at any size.
 * Falls back to WebP for contexts that need raster.
 */

interface LogoProps {
  className?: string;
  glow?: boolean;
  variant?: "amber" | "dark";
}

export function Logo({ className = "w-10 h-10", glow = false }: LogoProps) {
  return (
    <img
      src="/logo.svg"
      alt="TechMate"
      className={`object-cover ${className}`}
      style={
        glow
          ? { filter: "drop-shadow(0 0 12px rgba(249, 189, 24, 0.45))" }
          : undefined
      }
    />
  );
}
