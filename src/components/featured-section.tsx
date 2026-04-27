"use client";

import { motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  Star,
  HardDrive,
  Tag,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { downloads } from "@/data/downloads";
import Link from "next/link";

export function FeaturedSection() {
  const featured = downloads.filter((d) => d.featured);

  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-4">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-medium text-white/60">
              Mais populares
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Em <span className="shimmer-text">Destaque</span>
          </h2>
          <p className="text-sm sm:text-base text-white/30 max-w-lg mx-auto">
            Os downloads mais procurados pela nossa comunidade
          </p>
        </motion.div>

        {/* Featured Horizontal Scroll on mobile, Grid on desktop */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-max sm:w-full">
            {featured.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative w-[300px] sm:w-auto shrink-0"
              >
                <Link href={`/${item.category}/${item.id}`} className="block h-full">
                  <div className="relative h-full glass rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06] hover:border-purple-500/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10">
                    {/* Gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500`}
                    />

                    {/* Top glow line */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`}
                    />

                    <div className="relative p-5 sm:p-7">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0`}
                        >
                          <span className="text-3xl sm:text-4xl">
                            {item.emoji}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-base sm:text-lg text-white truncate">
                              {item.name}
                            </h3>
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                          </div>
                          <p className="text-xs sm:text-sm text-white/35 leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Info row */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 text-[10px] sm:text-xs text-white/30">
                        <span className="flex items-center gap-1 bg-white/[0.04] rounded-lg px-2 py-1">
                          <HardDrive className="w-3 h-3" /> {item.size}
                        </span>
                        <span className="flex items-center gap-1 bg-white/[0.04] rounded-lg px-2 py-1">
                          <Tag className="w-3 h-3" /> v{item.version}
                        </span>
                        <span className="flex items-center gap-1 bg-white/[0.04] rounded-lg px-2 py-1">
                          <Clock className="w-3 h-3" /> Atualizado
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-[10px] sm:text-xs bg-white/[0.03] text-white/30 border-white/[0.06] rounded-lg hover:bg-white/[0.06] transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Download button */}
                      <div
                        className="download-btn flex items-center justify-center gap-2 w-full py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-purple-500/15 hover:shadow-purple-500/25"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                        Baixar Agora
                        <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
