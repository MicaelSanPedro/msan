"use client";

import { motion } from "framer-motion";
import { DynamicIcon } from "@/components/DynamicIcon";

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryCard({ id, name, icon, count, isActive, onClick }: CategoryCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-3 p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
        isActive
          ? "glass-card border-green-500/30 neon-glow-green"
          : "glass-card card-glow-hover hover:border-green-500/20"
      }`}
    >
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
          isActive
            ? "bg-green-500/20 text-green-400 shadow-lg shadow-green-500/20"
            : "bg-white/5 text-white/40 group-hover:text-green-400"
        }`}
      >
        <DynamicIcon name={icon} className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
      <div className="text-center">
        <p className={`text-sm sm:text-base font-semibold transition-colors duration-300 ${
          isActive ? "text-green-400" : "text-white/70 group-hover:text-white"
        }`}>
          {name}
        </p>
        <p className={`text-xs mt-0.5 transition-colors duration-300 ${
          isActive ? "text-green-400/60" : "text-white/30"
        }`}>
          {count} {count === 1 ? "app" : "apps"}
        </p>
      </div>
      {isActive && (
        <motion.div
          layoutId="categoryActive"
          className="absolute inset-0 rounded-2xl border-2 border-green-500/40 pointer-events-none"
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        />
      )}
    </motion.button>
  );
}
