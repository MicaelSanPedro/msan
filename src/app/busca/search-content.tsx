"use client";

import { useState, useMemo, use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, X, Home } from "lucide-react";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { DownloadCard } from "@/components/download-card";
import { downloads } from "@/data/downloads";
import Link from "next/link";

export function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return downloads.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <BreadcrumbNav
        items={[
          { label: "Início", href: "/" },
          { label: "Buscar" },
        ]}
      />

      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 sm:mb-10"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
          <span className="shimmer-text">Buscar</span> Downloads
        </h1>
        <p className="text-sm sm:text-base text-white/30">
          Encontre jogos, softwares e ferramentas rapidamente
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8 sm:mb-10">
        <form onSubmit={handleSearch}>
          <div className="search-glow relative flex items-center gap-2 glass rounded-2xl px-4 sm:px-5 py-3 sm:py-4 transition-all duration-300 border border-white/[0.06]">
            <Search className="w-5 h-5 text-white/30 shrink-0" />
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
                onClick={() => {
                  setQuery("");
                  router.push("/busca");
                }}
                className="p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4 text-white/40" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Results */}
      {initialQuery ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 sm:mb-8"
          >
            <p className="text-sm sm:text-base text-white/40">
              {results.length}{" "}
              {results.length === 1 ? "resultado" : "resultados"} para{" "}
              <span className="text-purple-400 font-medium">
                &quot;{initialQuery}&quot;
              </span>
            </p>
          </motion.div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {results.map((item, i) => (
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
              <p className="text-sm text-white/30 mb-6">
                Tente buscar por outro termo ou explore nossas categorias
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold text-sm"
              >
                <Home className="w-4 h-4" />
                Voltar ao Início
              </Link>
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🔎</div>
          <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-2">
            Digite algo para buscar
          </h3>
          <p className="text-sm text-white/30">
            Use a barra de busca acima para encontrar downloads
          </p>
        </motion.div>
      )}
    </div>
  );
}
