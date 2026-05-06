"use client";

import * as LucideIcons from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
}

// This is a stable component - the icon name is just a prop
// The component itself is declared statically
const iconsMap = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;

export function DynamicIcon({ name, className }: DynamicIconProps) {
  const Icon = iconsMap[name] || LucideIcons.Package;
  return <Icon className={className} />;
}
