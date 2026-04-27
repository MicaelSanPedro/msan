"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { stats } from "@/data/downloads";

export function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/20 rounded-full blur-[120px] animate-orb-1" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-cyan-500/15 rounded-full blur-[100px] animate-orb-2" />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 sm:w-72 sm:h-72 bg-rose-500/15 rounded-full blur-[100px] animate-orb-3" />
        <div
          className="absolute top-1/2 right-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-emerald-500/10 rounded-full blur-[80px] animate-orb-1"
          style={{ animationDelay: "5s" }}
        />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Decorative rotating ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] pointer-events-none opacity-[0.03]">
        <div className="w-full h-full border border-purple-500 rounded-full animate-rotate-slow" />
        <div
          className="absolute inset-8 border border-cyan-500 rounded-full animate-rotate-slow"
          style={{
            animationDirection: "reverse",
            animationDuration: "25s",
          }}
        />
        <div
          className="absolute inset-16 border border-rose-500 rounded-full animate-rotate-slow"
          style={{ animationDuration: "35s" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6 sm:mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs sm:text-sm font-medium text-white/70">
              Downloads rápidos e seguros
            </span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-4 sm:mb-6">
            <span className="text-white animate-text-glow">Baixe os melhores</span>
            <br />
            <span className="shimmer-text">Jogos & Softwares</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Encontre jogos, softwares e ferramentas essenciais para o seu dia a
            dia.
            <span className="text-purple-400/70"> Tudo gratuito</span>,
            organizado e com
            <span className="text-cyan-400/70"> links verificados</span>.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative max-w-xl mx-auto"
          >
            <form onSubmit={handleSearch}>
              <div className="search-glow relative flex items-center gap-2 glass rounded-2xl px-4 sm:px-5 py-3 sm:py-4 transition-all duration-300 border border-white/[0.06]">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white/30 shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar jogos, softwares, ferramentas..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-white/90 placeholder:text-white/25"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="p-1 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <X className="w-4 h-4 text-white/40" />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-14"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
              className="glass-light rounded-xl p-3 sm:p-4 group hover:neon-glow-purple transition-all duration-300 cursor-default"
            >
              <span className="text-xl sm:text-2xl mb-1 block">
                {stat.emoji}
              </span>
              <p className="text-lg sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs text-white/40 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
    </section>
  );
}
