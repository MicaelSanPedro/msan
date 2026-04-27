"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  Star,
  HardDrive,
  Tag,
  Monitor,
  Gamepad2,
  Package,
} from "lucide-react";
import Link from "next/link";
import type { DownloadItem } from "@/data/downloads";

const categoryIcons = {
  jogos: <Gamepad2 className="w-3.5 h-3.5" />,
  softwares: <Monitor className="w-3.5 h-3.5" />,
  outros: <Package className="w-3.5 h-3.5" />,
};

const categoryColors = {
  jogos: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  softwares: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  outros: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

const categoryLabels = {
  jogos: "Jogo",
  softwares: "Software",
  outros: "Outro",
};

export function DownloadCard({
  item,
  index = 0,
}: {
  item: DownloadItem;
  index?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/${item.category}/${item.id}`} className="block h-full">
        <div className="relative h-full glass rounded-2xl sm:rounded-3xl overflow-hidden card-shine border border-white/[0.06] hover:border-purple-500/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
          {/* Top gradient accent */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-80 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : ""
            }`}
          />

          {/* Content */}
          <div className="p-4 sm:p-6 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 ${
                    isHovered ? "scale-110" : ""
                  }`}
                >
                  <span className="text-2xl sm:text-3xl">{item.emoji}</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-purple-300 transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-lg border ${categoryColors[item.category]}`}
                    >
                      {categoryIcons[item.category]}
                      {categoryLabels[item.category]}
                    </span>
                    {item.featured && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Star className="w-3 h-3 fill-amber-400" />
                        Destaque
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-white/40 leading-relaxed mb-3 sm:mb-4 line-clamp-2 flex-1">
              {item.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] sm:text-xs font-medium text-white/30 bg-white/[0.04] rounded-lg px-2 py-0.5 border border-white/[0.04]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 text-[10px] sm:text-xs text-white/30">
              <span className="flex items-center gap-1">
                <HardDrive className="w-3 h-3" />
                {item.size}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                v{item.version}
              </span>
              <div className="flex items-center gap-1">
                <Monitor className="w-3 h-3" />
                <span className="hidden sm:inline">
                  {item.platform.slice(0, 2).join(", ")}
                  {item.platform.length > 2 &&
                    ` +${item.platform.length - 2}`}
                </span>
                <span className="sm:hidden">
                  {item.platform.length} plataformas
                </span>
              </div>
            </div>

            {/* Platform icons row (mobile) */}
            <div className="flex items-center gap-1.5 mb-4 sm:hidden">
              {item.platform.map((p) => (
                <span
                  key={p}
                  className="text-[9px] font-medium text-white/25 bg-white/[0.03] rounded px-1.5 py-0.5"
                >
                  {p}
                </span>
              ))}
            </div>

            {/* Download Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="download-btn relative flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Baixar Agora</span>
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-50" />
            </motion.div>
          </div>

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl"
            animate={{
              boxShadow: isHovered
                ? "0 0 30px rgba(168, 85, 247, 0.15), 0 0 60px rgba(168, 85, 247, 0.05), inset 0 0 30px rgba(168, 85, 247, 0.03)"
                : "0 0 0px rgba(168, 85, 247, 0), inset 0 0 0px rgba(168, 85, 247, 0)",
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
