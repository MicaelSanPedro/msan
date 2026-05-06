"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/DynamicIcon";
import type { App } from "@/data/apps";

interface AppCardProps {
  app: App;
  index: number;
  onClick: () => void;
}

export function AppCard({ app, index, onClick }: AppCardProps) {
  const firstCommand = Object.values(app.commands)[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: Math.min(index * 0.06, 0.3), duration: 0.5 }}
    >
      <button
        onClick={onClick}
        className="w-full text-left group relative h-full glass-card card-shine card-glow-hover rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        {/* Top glow line */}
        <div className="h-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="p-4 sm:p-5 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start gap-3.5 mb-3">
            <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${app.iconColor} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 shrink-0`}>
              <DynamicIcon name={app.icon} className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-green-300 transition-colors truncate">
                {app.name}
              </h3>
              <Badge
                variant="outline"
                className="mt-1 text-[10px] sm:text-xs bg-green-500/10 text-green-400 border-green-500/20 rounded-md font-normal"
              >
                {app.category}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-white/40 leading-relaxed mb-3 line-clamp-2 flex-1">
            {app.description}
          </p>

          {/* Command preview */}
          {firstCommand && (
            <div className="bg-black/40 border border-white/5 rounded-lg px-3 py-2 mb-3 overflow-hidden">
              <code className="text-[10px] sm:text-xs text-green-400/70 font-mono truncate block">
                <span className="text-white/30">$ </span>
                {firstCommand.length > 50 ? firstCommand.substring(0, 50) + "..." : firstCommand}
              </code>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {app.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium text-white/25 bg-white/[0.03] rounded-md px-2 py-0.5 border border-white/[0.04]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>
    </motion.div>
  );
}
