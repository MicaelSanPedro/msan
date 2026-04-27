"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { DownloadCard } from "@/components/download-card";
import { SearchBar } from "@/components/search-bar";
import { downloads, categories } from "@/data/downloads";

const categoryMeta: Record<
  string,
  { name: string; emoji: string; gradient: string; description: string }
> = {
  jogos: {
    name: "Jogos",
    emoji: "🎮",
    gradient: "from-rose-500 to-orange-500",
    description: "Os melhores jogos para PC e muito mais",
  },
  softwares: {
    name: "Softwares",
    emoji: "💻",
    gradient: "from-cyan-500 to-blue-500",
    description: "Ferramentas essenciais para produtividade",
  },
  outros: {
    name: "Outros",
    emoji: "📦",
    gradient: "from-emerald-500 to-teal-500",
    description: "Utilitários e ferramentas diversas",
  },
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const meta = categoryMeta[category];

  const [searchQuery, setSearchQuery] = useState("");

  const categoryItems = useMemo(() => {
    let items = downloads.filter((d) => d.category === category);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return items;
  }, [category, searchQuery]);

  if (!meta) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Categoria não encontrada
          </h1>
          <p className="text-white/40 mb-6">
            A categoria que você está procurando não existe.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold"
          >
            Voltar ao Início
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <BreadcrumbNav
        items={[
          { label: "Início", href: "/" },
          { label: meta.name },
        ]}
      />

      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 sm:mb-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-lg`}
          >
            <span className="text-3xl sm:text-4xl">{meta.emoji}</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
              {meta.name}
            </h1>
            <p className="text-sm sm:text-base text-white/40">
              {meta.description} •{" "}
              <span className="text-purple-400">
                {categoryItems.length}{" "}
                {categoryItems.length === 1 ? "item" : "itens"}
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search within category */}
      <div className="mb-8 sm:mb-10 max-w-md">
        <div className="relative">
          <div className="search-glow relative flex items-center gap-2 glass rounded-xl px-4 py-2.5 transition-all duration-300 border border-white/[0.06]">
            <Search className="w-4 h-4 text-white/30 shrink-0" />
            <input
              type="text"
              placeholder={`Buscar em ${meta.name.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-white/90 placeholder:text-white/25"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-white/40" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      {categoryItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {categoryItems.map((item, i) => (
            <DownloadCard key={item.id} item={item} index={i} />
          ))}
        </div>
      ) : (
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
            Tente buscar por outro termo
          </p>
        </motion.div>
      )}
    </div>
  );
}
