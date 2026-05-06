import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const base = "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors";

  const variants: Record<string, string> = {
    default: "border-transparent bg-green-500/20 text-green-400",
    secondary: "border-transparent bg-white/10 text-white/70",
    destructive: "border-transparent bg-red-500/20 text-red-400",
    outline: "border-white/10 text-white/50 bg-transparent",
  };

  return (
    <span
      className={cn(base, variants[variant] || variants.default, className)}
      {...props}
    />
  );
}

export { Badge };
