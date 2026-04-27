"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Menu,
  X,
  Search,
  Gamepad2,
  Monitor,
  Package,
  ArrowUp,
  Sparkles,
  Star,
  ChevronDown,
  ExternalLink,
  Filter,
  TrendingUp,
  Clock,
  HardDrive,
  Tag,
  Github,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  downloads,
  categories,
  stats,
  type DownloadItem,
} from "@/data/downloads";

/* ═══════════════════════════════════════════════════════
   PARTICLE BACKGROUND
   ═══════════════════════════════════════════════════════ */

function ParticleField() {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number; color: string }[]
  >([]);

  useEffect(() => {
    const colors = [
      "rgba(168, 85, 247, 0.6)",
      "rgba(6, 182, 212, 0.5)",
      "rgba(244, 63, 94, 0.4)",
      "rgba(16, 185, 129, 0.5)",
      "rgba(245, 158, 11, 0.4)",
    ];
    const p = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(p);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `particle-rise ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Destaques", href: "#destaques" },
    { label: "Jogos", href: "#jogos" },
    { label: "Softwares", href: "#softwares" },
    { label: "Outros", href: "#outros" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-lg shadow-purple-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow duration-300">
                <Download className="w-5 h-5 text-white" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Download className="w-5 h-5 text-white absolute" />
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight">
                <span className="shimmer-text">MSAN</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-white/80" />
              ) : (
                <Menu className="w-5 h-5 text-white/80" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 glass border-b border-purple-500/10 md:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */

function HeroSection({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/20 rounded-full blur-[120px] animate-orb-1" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-cyan-500/15 rounded-full blur-[100px] animate-orb-2" />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 sm:w-72 sm:h-72 bg-rose-500/15 rounded-full blur-[100px] animate-orb-3" />
        <div className="absolute top-1/2 right-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-emerald-500/10 rounded-full blur-[80px] animate-orb-1" style={{ animationDelay: "5s" }} />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Decorative rotating ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] pointer-events-none opacity-[0.03]">
        <div className="w-full h-full border border-purple-500 rounded-full animate-rotate-slow" />
        <div className="absolute inset-8 border border-cyan-500 rounded-full animate-rotate-slow" style={{ animationDirection: "reverse", animationDuration: "25s" }} />
        <div className="absolute inset-16 border border-rose-500 rounded-full animate-rotate-slow" style={{ animationDuration: "35s" }} />
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
            Encontre jogos, softwares e ferramentas essenciais para o seu dia a dia.
            <span className="text-purple-400/70"> Tudo gratuito</span>, organizado e com
            <span className="text-cyan-400/70"> links verificados</span>.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative max-w-xl mx-auto"
          >
            <div className="search-glow relative flex items-center gap-2 glass rounded-2xl px-4 sm:px-5 py-3 sm:py-4 transition-all duration-300 border border-white/[0.06]">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white/30 shrink-0" />
              <input
                type="text"
                placeholder="Buscar jogos, softwares, ferramentas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-white/90 placeholder:text-white/25"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4 text-white/40" />
                </button>
              )}
            </div>
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
              <span className="text-xl sm:text-2xl mb-1 block">{stat.emoji}</span>
              <p className="text-lg sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs text-white/40 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CATEGORY TABS
   ═══════════════════════════════════════════════════════ */

function CategoryTabs({
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
            <span className="relative z-10 text-base sm:text-lg">{cat.emoji}</span>
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

/* ═══════════════════════════════════════════════════════
   DOWNLOAD CARD
   ═══════════════════════════════════════════════════════ */

function DownloadCard({ item, index }: { item: DownloadItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

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
      <div className="relative h-full glass rounded-2xl sm:rounded-3xl overflow-hidden card-shine border border-white/[0.06] hover:border-purple-500/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
        {/* Top gradient accent */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-80 transition-opacity duration-300 ${isHovered ? "opacity-100" : ""}`} />

        {/* Content */}
        <div className="p-4 sm:p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}>
                <span className="text-2xl sm:text-3xl">{item.emoji}</span>
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-purple-300 transition-colors leading-tight">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-lg border ${categoryColors[item.category]}`}>
                    {categoryIcons[item.category]}
                    {item.category === "jogos" ? "Jogo" : item.category === "softwares" ? "Software" : "Outro"}
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
                {item.platform.length > 2 && ` +${item.platform.length - 2}`}
              </span>
              <span className="sm:hidden">
                {item.platform.length} platforms
              </span>
            </div>
          </div>

          {/* Platform icons row (mobile) */}
          <div className="flex items-center gap-1.5 mb-4 sm:hidden">
            {item.platform.map((p) => (
              <span key={p} className="text-[9px] font-medium text-white/25 bg-white/[0.03] rounded px-1.5 py-0.5">{p}</span>
            ))}
          </div>

          {/* Download Button */}
          <motion.a
            href={item.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="download-btn relative flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Baixar Agora</span>
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-50" />
          </motion.a>
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
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   FEATURED SECTION
   ═══════════════════════════════════════════════════════ */

function FeaturedSection() {
  const featured = downloads.filter((d) => d.featured);

  return (
    <section id="destaques" className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-4">
            <TrendingUp className="w-4 h-4 text-amber-400" />
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

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative h-full glass rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06] hover:border-purple-500/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500`} />

                {/* Top glow line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />

                <div className="relative p-5 sm:p-7">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                      <span className="text-3xl sm:text-4xl">{item.emoji}</span>
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
                      <Badge key={tag} variant="outline" className="text-[10px] sm:text-xs bg-white/[0.03] text-white/30 border-white/[0.06] rounded-lg hover:bg-white/[0.06] transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Download button */}
                  <a
                    href={item.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-btn flex items-center justify-center gap-2 w-full py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-purple-500/15 hover:shadow-purple-500/25"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    Baixar Agora
                    <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   DOWNLOADS SECTION
   ═══════════════════════════════════════════════════════ */

function DownloadsSection({
  activeCategory,
  searchQuery,
}: {
  activeCategory: string;
  searchQuery: string;
}) {
  const filteredDownloads = downloads.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const sectionTitles: Record<string, { title: string; emoji: string; id: string }> = {
    jogos: { title: "Jogos", emoji: "🎮", id: "jogos" },
    softwares: { title: "Softwares", emoji: "💻", id: "softwares" },
    outros: { title: "Outros", emoji: "📦", id: "outros" },
  };

  const sectionsToShow =
    activeCategory === "all"
      ? (Object.keys(sectionTitles) as Array<keyof typeof sectionTitles>)
      : activeCategory === "jogos"
        ? ["jogos"]
        : activeCategory === "softwares"
          ? ["softwares"]
          : ["outros"];

  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sectionsToShow.map((sectionKey) => {
          const section = sectionTitles[sectionKey];
          const sectionItems = filteredDownloads.filter(
            (d) => d.category === sectionKey
          );

          if (sectionItems.length === 0) return null;

          return (
            <div key={sectionKey} id={section.id} className="mb-16 sm:mb-20 last:mb-0">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl glass flex items-center justify-center text-xl sm:text-2xl">
                  {section.emoji}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    {section.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/30">
                    {sectionItems.length} {sectionItems.length === 1 ? "item disponível" : "itens disponíveis"}
                  </p>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4 hidden sm:block" />
              </motion.div>

              {/* Grid */}
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
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04]">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold shimmer-text">MSAN</span>
            </div>
            <p className="text-xs sm:text-sm text-white/30 leading-relaxed max-w-xs">
              O melhor site de downloads com links verificados e atualizados. Jogos, softwares e ferramentas gratuitas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 mb-4">Categorias</h4>
            <ul className="space-y-2">
              {categories.slice(1).map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.id}`}
                    className="text-xs sm:text-sm text-white/30 hover:text-purple-400 transition-colors flex items-center gap-2"
                  >
                    <span>{cat.emoji}</span> {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 mb-4">Info</h4>
            <ul className="space-y-2">
              {["Sobre nós", "Termos de Uso", "Política de Privacidade", "Contato"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-xs sm:text-sm text-white/30 hover:text-purple-400 transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 mb-4">Redes Sociais</h4>
            <div className="flex items-center gap-3">
              <a href="https://github.com/MicaelSanPedro" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass-light flex items-center justify-center hover:neon-glow-purple transition-all duration-300 group">
                <Github className="w-4 h-4 text-white/40 group-hover:text-purple-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © 2025 MSAN Downloads. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/20 flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> por MicaelSanPedro
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   SCROLL TO TOP BUTTON
   ═══════════════════════════════════════════════════════ */

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow duration-300 hover:scale-110 active:scale-95"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background effects */}
      <ParticleField />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Category Filter */}
          <div className="relative z-10 -mt-6 sm:-mt-8 mb-8 sm:mb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            </div>
          </div>

          {/* Featured */}
          {activeCategory === "all" && searchQuery === "" && <FeaturedSection />}

          {/* All Downloads */}
          <DownloadsSection activeCategory={activeCategory} searchQuery={searchQuery} />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
