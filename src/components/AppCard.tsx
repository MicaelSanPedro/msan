"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/DynamicIcon";
import { Star, Download, ChevronRight } from "lucide-react";
import type { App } from "@/data/apps";

interface AppCardProps {
  app: App;
  index: number;
  onClick: () => void;
}

export function AppCard({ app, index, onClick }: AppCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: Math.min(index * 0.04, 0.2), duration: 0.4 }}
    >
      <button
        onClick={onClick}
        className="w-full text-left group glass-card card-shine card-glow-hover rounded-2xl overflow-hidden hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      >
        {/* Left glow accent */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-emerald-500 to-lime-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5">
          {/* App Icon */}
          <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl ${app.iconColor} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 shrink-0`}>
            <DynamicIcon name={app.icon} className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-green-300 transition-colors truncate">
                {app.name}
              </h3>
              <Badge
                variant="outline"
                className="hidden sm:inline-flex text-[10px] bg-green-500/10 text-green-400 border-green-500/20 rounded-md font-normal shrink-0"
              >
                {app.category}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-white/40 leading-relaxed line-clamp-1 mb-1.5">
              {app.description}
            </p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-amber-400/70">
                <Star className="w-3 h-3 fill-amber-400/70" />
                {app.rating}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/25">
                <Download className="w-3 h-3" />
                {app.downloads}
              </span>
              <div className="hidden sm:flex items-center gap-1.5">
                {Object.keys(app.commands).map((pm) => (
                  <span
                    key={pm}
                    className="text-[10px] font-medium text-white/20 bg-white/[0.03] rounded px-1.5 py-0.5"
                  >
                    {pm}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="shrink-0 p-2 rounded-xl bg-white/[0.03] group-hover:bg-green-500/10 transition-colors duration-300">
            <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-green-400 transition-colors" />
          </div>
        </div>
      </button>
    </motion.div>
  );
}
