import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 cursor-pointer";

  const variants: Record<string, string> = {
    default: "bg-green-600 text-white shadow-sm hover:bg-green-500",
    destructive: "bg-red-600 text-white shadow-sm hover:bg-red-500",
    outline: "border border-white/10 bg-transparent shadow-sm hover:bg-white/5 hover:text-white",
    secondary: "bg-white/10 text-white shadow-sm hover:bg-white/15",
    ghost: "hover:bg-white/5",
    link: "text-green-400 underline-offset-4 hover:underline",
  };

  const sizes: Record<string, string> = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md gap-1.5 px-3 text-xs",
    lg: "h-10 rounded-md px-6",
    icon: "size-9",
  };

  return (
    <button
      className={cn(base, variants[variant] || variants.default, sizes[size] || sizes.default, className)}
      {...props}
    />
  );
}

export { Button };
