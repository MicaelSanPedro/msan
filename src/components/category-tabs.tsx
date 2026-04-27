"use client";

import { motion } from "framer-motion";
import { categories, downloads } from "@/data/downloads";

export function CategoryTabs({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string;
  setActiveCategory: (c: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <motion.button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-all duration-300 ${
              isActive
                ? "text-white"
                : "text-white/50 hover:text-white/80 glass-light hover:border-white/10"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className={`absolute inset-0 bg-gradient-to-r ${cat.gradient} rounded-xl sm:rounded-2xl opacity-90`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10 text-base sm:text-lg">
              {cat.emoji}
            </span>
            <span className="relative z-10">{cat.name}</span>
            {isActive && (
              <span className="relative z-10 text-[10px] sm:text-xs font-medium bg-white/20 rounded-full px-2 py-0.5">
                {cat.id === "all"
                  ? downloads.length
                  : downloads.filter((d) => d.category === cat.id).length}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
