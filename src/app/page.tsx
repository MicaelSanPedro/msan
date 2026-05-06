"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ChevronRight,
  Package,
  Search,
  Code,
  Copy,
  Zap,
  Monitor,
  Download,
  ExternalLink,
  Star,
  ArrowRight,
  Heart,
  Shield,
  Users,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { AppCard } from "@/components/AppCard";
import { CategoryCard } from "@/components/CategoryCard";
import { CodeBlock } from "@/components/CodeBlock";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AppDetail } from "@/components/AppDetail";
import { apps, categories, type App } from "@/data/apps";

/* ═══════════════════════════════════════════════════════
   ANIMATED TERMINAL HERO
   ═══════════════════════════════════════════════════════ */

function HeroTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const fullLines = [
    "$ sudo flatpak install flathub org.mozilla.firefox",
    "  Installing... ██████████████████ 100%",
    "  Firefox instalado com sucesso! ✓",
  ];

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    const currentLines: string[] = [];
    const interval = setInterval(() => {
      if (lineIdx >= fullLines.length) {
        clearInterval(interval);
        return;
      }
      if (charIdx <= fullLines[lineIdx].length) {
        currentLines[lineIdx] = fullLines[lineIdx].slice(0, charIdx);
        setLines([...currentLines]);
        charIdx++;
      } else {
        lineIdx++;
        charIdx = 0;
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-block max-w-lg mx-auto">
      <div className="terminal-header">
        <div className="flex gap-1.5">
          <span className="terminal-dot bg-red-500" />
          <span className="terminal-dot bg-yellow-500" />
          <span className="terminal-dot bg-green-500" />
        </div>
        <span className="text-xs text-white/40 ml-2 font-mono">~terminal</span>
      </div>
      <div className="terminal-body min-h-[80px]">
        {lines.map((line, i) => (
          <div key={i} className="mb-1 last:mb-0">
            {line.startsWith("$") ? (
              <span>
                <span className="terminal-prompt">{line.slice(0, 2)}</span>
                <span className="terminal-command">{line.slice(2)}</span>
                {i === 0 && line.length < fullLines[0].length && (
                  <span className="animate-terminal-blink text-green-400">▋</span>
                )}
              </span>
            ) : line.includes("█") ? (
              <span className="text-green-300">{line}</span>
            ) : line.includes("✓") ? (
              <span className="text-green-400">{line}</span>
            ) : (
              <span className="text-white/50">{line}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */

function HeroSection({
  onExplore,
}: {
  onExplore: () => void;
}) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Decorative rotating ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] pointer-events-none opacity-[0.03]">
        <div className="w-full h-full border border-green-500 rounded-full animate-rotate-slow" />
        <div className="absolute inset-8 border border-emerald-500 rounded-full animate-rotate-slow" style={{ animationDirection: "reverse", animationDuration: "25s" }} />
        <div className="absolute inset-16 border border-lime-500 rounded-full animate-rotate-slow" style={{ animationDuration: "35s" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6 sm:mb-8"
        >
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-xs sm:text-sm font-medium text-white/70">
            Comandos prontos para copiar
          </span>
          <Zap className="w-4 h-4 text-emerald-400" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-4 sm:mb-6"
        >
          <span className="text-white">Seu guia definitivo para </span>
          <br />
          <span className="shimmer-text">apps Linux</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
        >
          Encontre os melhores aplicativos para sua distribuição.{" "}
          <span className="text-green-400/70">Comandos prontos para copiar</span>,{" "}
          <span className="text-emerald-400/70">observações</span> e{" "}
          <span className="text-lime-400/70">dicas úteis</span>.
        </motion.p>

        {/* Terminal animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <HeroTerminal />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Button
            onClick={onExplore}
            size="lg"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 text-sm sm:text-base"
          >
            Explorar Apps
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            onClick={() => {
              document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" });
            }}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-8 py-3 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white/80 font-semibold rounded-xl transition-all duration-300 text-sm sm:text-base"
          >
            <Monitor className="w-4 h-4 mr-2" />
            Ver Tutoriais
          </Button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f0d] to-transparent pointer-events-none" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FEATURED APPS SECTION
   ═══════════════════════════════════════════════════════ */

function FeaturedAppsSection({ onAppClick }: { onAppClick: (app: App) => void }) {
  const featured = apps.slice(0, 6);

  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-4">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs sm:text-sm font-medium text-white/60">
              Populares
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Apps <span className="shimmer-text">Populares</span>
          </h2>
          <p className="text-sm sm:text-base text-white/30 max-w-lg mx-auto">
            Os aplicativos mais procurados pela comunidade Linux
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featured.map((app, i) => (
            <AppCard
              key={app.id}
              app={app}
              index={i}
              onClick={() => onAppClick(app)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CATEGORIES SECTION
   ═══════════════════════════════════════════════════════ */

function CategoriesSection({ onCategoryClick }: { onCategoryClick: (cat: string) => void }) {
  const displayCategories = categories.filter((c) => c.id !== "all");

  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-4">
            <Package className="w-4 h-4 text-green-400" />
            <span className="text-xs sm:text-sm font-medium text-white/60">
              Organize por categoria
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            <span className="shimmer-text">Categorias</span>
          </h2>
          <p className="text-sm sm:text-base text-white/30 max-w-lg mx-auto">
            Explore apps por área de interesse
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {displayCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              icon={cat.icon}
              count={cat.count}
              isActive={false}
              onClick={() => onCategoryClick(cat.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   STATS SECTION
   ═══════════════════════════════════════════════════════ */

function StatsSection() {
  const stats = [
    { value: `${apps.length}+`, label: "Apps catalogados", icon: Package, color: "text-green-400" },
    { value: `${categories.length - 1}`, label: "Categorias", icon: Monitor, color: "text-emerald-400" },
    { value: "10+", label: "Distros Suportadas", icon: Cpu, color: "text-lime-400" },
    { value: "50+", label: "Comandos prontos", icon: Terminal, color: "text-teal-400" },
  ];

  return (
    <section className="relative py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-6 sm:p-8 rounded-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-3`} />
                <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-white/40">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   HOW IT WORKS SECTION
   ═══════════════════════════════════════════════════════ */

function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Busque o app",
      description: "Use a barra de busca ou navegue pelas categorias para encontrar o aplicativo desejado.",
      icon: Search,
      color: "from-green-500 to-emerald-500",
    },
    {
      step: "02",
      title: "Copie o comando",
      description: "Encontre o comando de instalação para sua distribuição e clique para copiar.",
      icon: Copy,
      color: "from-emerald-500 to-teal-500",
    },
    {
      step: "03",
      title: "Cole no terminal",
      description: "Abra o terminal e cole o comando. Pronto! O app será instalado automaticamente.",
      icon: Terminal,
      color: "from-teal-500 to-lime-500",
    },
  ];

  return (
    <section id="como-funciona" className="relative py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-4">
            <Zap className="w-4 h-4 text-lime-400" />
            <span className="text-xs sm:text-sm font-medium text-white/60">
              Simples e rápido
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Como <span className="shimmer-text">Funciona</span>
          </h2>
          <p className="text-sm sm:text-base text-white/30 max-w-lg mx-auto">
            Três passos simples para instalar qualquer app
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative group"
            >
              <div className="glass-card p-6 sm:p-8 rounded-2xl text-center card-glow-hover h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-bold text-green-400/60 tracking-widest mb-2 block">
                  PASSO {item.step}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Arrow connector (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden sm:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                  <ChevronRight className="w-6 h-6 text-green-500/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   APPS VIEW
   ═══════════════════════════════════════════════════════ */

function AppsView({
  searchQuery,
  setSearchQuery,
  onAppClick,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onAppClick: (app: App) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesCategory = activeCategory === "all" || app.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        app.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="relative py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            <span className="shimmer-text">Apps</span> para Linux
          </h2>
          <p className="text-sm sm:text-base text-white/30 max-w-lg mx-auto">
            {apps.length} aplicativos catalogados com comandos de instalação
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <div className="search-glow glass-input flex items-center gap-2 rounded-xl px-3.5 py-2.5 transition-all duration-300">
              <Search className="w-4 h-4 text-white/30 shrink-0" />
              <input
                type="text"
                placeholder="Filtrar apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm text-white/90 placeholder:text-white/25 w-full"
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-white/[0.03] text-white/40 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white/60"
                }`}
              >
                {cat.name}
                <span className="ml-1.5 text-[10px] opacity-60">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-white/30 mb-4">
          Mostrando {filteredApps.length} de {apps.length} apps
          {activeCategory !== "all" && (
            <span>
              {" "}na categoria &quot;{categories.find((c) => c.id === activeCategory)?.name}&quot;
            </span>
          )}
          {searchQuery && (
            <span>
              {" "}para &quot;{searchQuery}&quot;
            </span>
          )}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredApps.map((app, i) => (
            <AppCard
              key={app.id}
              app={app}
              index={i}
              onClick={() => onAppClick(app)}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredApps.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-2">
              Nenhum app encontrado
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
   ABOUT VIEW
   ═══════════════════════════════════════════════════════ */

function AboutView() {
  return (
    <section className="relative py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Sobre o <span className="shimmer-text">LinuxZeiro</span>
          </h2>
          <p className="text-sm sm:text-base text-white/30 max-w-lg mx-auto">
            Feito pela e para a comunidade Linux
          </p>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 sm:p-8 rounded-2xl"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Nossa Missão</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  O LinuxZeiro nasceu da necessidade de ter um guia completo e em português para encontrar e instalar aplicativos no Linux. Acreditamos que o Linux deve ser acessível para todos, e que a instalação de apps não precisa ser complicada. Comandos prontos para copiar e observações úteis fazem toda a diferença.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 sm:p-8 rounded-2xl"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Open Source</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Valorizamos o software livre e de código aberto. Priorizamos apps que respeitam a privacidade dos usuários e que são desenvolvidos de forma transparente. Nosso catálogo inclui tanto aplicativos open-source quanto opções proprietárias que são úteis para a comunidade.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 sm:p-8 rounded-2xl"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-lime-500 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Comunidade</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  O LinuxZeiro é construído com a ajuda da comunidade. Se você encontrou um erro em algum comando, quer sugerir um novo app ou contribuir de alguma forma, fique à vontade! Juntos podemos tornar o Linux mais acessível para todos os brasileiros.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 sm:p-8 rounded-2xl"
          >
            <h3 className="text-lg font-bold text-white mb-4">Distribuições Suportadas</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "Ubuntu",
                "Debian",
                "Fedora",
                "Arch Linux",
                "Linux Mint",
                "Pop!_OS",
                "Manjaro",
                "openSUSE",
                "elementary OS",
              ].map((distro) => (
                <div
                  key={distro}
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm text-white/60">{distro}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hash routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "apps" || hash === "sobre" || hash === "home") {
        setActiveTab(hash);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleSetTab = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  const handleAppClick = (app: App) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  const handleExploreApps = () => {
    handleSetTab("apps");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (catId: string) => {
    setSearchQuery("");
    handleSetTab("apps");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleSetTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HeroSection onExplore={handleExploreApps} />
              <FeaturedAppsSection onAppClick={handleAppClick} />
              <CategoriesSection onCategoryClick={handleCategoryClick} />
              <StatsSection />
              <HowItWorksSection />
            </motion.div>
          )}

          {activeTab === "apps" && (
            <motion.div
              key="apps"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-24"
            >
              <AppsView
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onAppClick={handleAppClick}
              />
            </motion.div>
          )}

          {activeTab === "sobre" && (
            <motion.div
              key="sobre"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-24"
            >
              <AboutView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <ScrollToTop />

      {/* App Detail Modal */}
      <AppDetail
        app={selectedApp}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
