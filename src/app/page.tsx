"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Gamepad2, Monitor, Package, Download } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { FeaturedSection } from "@/components/featured-section";
import { DownloadCard } from "@/components/download-card";
import { downloads, categories } from "@/data/downloads";

const categoryMeta = [
  {
    id: "jogos",
    name: "Jogos",
    emoji: "🎮",
    gradient: "from-rose-500 to-orange-500",
    icon: Gamepad2,
    description: "Os melhores jogos para PC e muito mais",
  },
  {
    id: "softwares",
    name: "Softwares",
    emoji: "💻",
    gradient: "from-cyan-500 to-blue-500",
    icon: Monitor,
    description: "Ferramentas essenciais para produtividade",
  },
  {
    id: "outros",
    name: "Outros",
    emoji: "📦",
    gradient: "from-emerald-500 to-teal-500",
    icon: Package,
    description: "Utilitários e ferramentas diversas",
  },
] as const;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredDownloads = downloads.filter((item) => {
    return activeCategory === "all" || item.category === activeCategory;
  });

  const recentDownloads = downloads.slice(0, 8);

  const sectionsToShow =
    activeCategory === "all"
      ? (["jogos", "softwares", "outros"] as const)
      : ([activeCategory] as const);

  return (
    <div>
      {/* Hero with search */}
      <HeroSection />

      {/* Category Overview Cards */}
      <section className="relative py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Explorar por{" "}
              <span className="shimmer-text">Categoria</span>
            </h2>
            <p className="text-sm sm:text-base text-white/30">
              Navegue pelas categorias e encontre o que precisa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {categoryMeta.map((cat, i) => {
              const count = downloads.filter(
                (d) => d.category === cat.id
              ).length;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link href={`/${cat.id}`} className="block group">
                    <div className="relative glass rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06] hover:border-purple-500/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 p-6 sm:p-8">
                      {/* Gradient background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500`}
                      />
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.gradient} opacity-60`}
                      />
                      <div className="relative">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            <span className="text-3xl sm:text-4xl">
                              {cat.emoji}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-white">
                              {cat.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-white/30">
                              {count}{" "}
                              {count === 1 ? "item disponível" : "itens disponíveis"}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed mb-4">
                          {cat.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                          <span>Ver todos</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <FeaturedSection />

      {/* Category Filter Tabs + Recent Downloads */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Downloads{" "}
              <span className="shimmer-text">Recentes</span>
            </h2>
            <p className="text-sm sm:text-base text-white/30">
              Os últimos itens adicionados ao nosso catálogo
            </p>
          </motion.div>

          {/* Category tabs */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-white/50 hover:text-white/80 glass-light hover:border-white/10"
                    }`}
                  >
                    {isActive && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${cat.gradient} rounded-xl sm:rounded-2xl opacity-90`}
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
                  </button>
                );
              })}
            </div>
          </div>

          {/* Downloads Grid */}
          {sectionsToShow.map((sectionKey) => {
            const sectionItems = filteredDownloads.filter(
              (d) => d.category === sectionKey
            );
            if (sectionItems.length === 0) return null;

            const sectionTitle =
              categoryMeta.find((c) => c.id === sectionKey)?.name || sectionKey;
            const sectionEmoji =
              categoryMeta.find((c) => c.id === sectionKey)?.emoji || "📁";

            return (
              <div
                key={sectionKey}
                className="mb-12 sm:mb-16 last:mb-0"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl glass flex items-center justify-center text-xl sm:text-2xl">
                    {sectionEmoji}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      {sectionTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/30">
                      {sectionItems.length}{" "}
                      {sectionItems.length === 1
                        ? "item disponível"
                        : "itens disponíveis"}
                    </p>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4 hidden sm:block" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                  {sectionItems.map((item, i) => (
                    <DownloadCard key={item.id} item={item} index={i} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Empty state */}
          {filteredDownloads.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-sm text-white/30">
                Tente buscar por outro termo ou mudar a categoria
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
