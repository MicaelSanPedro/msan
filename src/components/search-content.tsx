"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { AppCard } from "@/components/app-card";
import { downloads } from "@/data/downloads";
import type { DownloadItem } from "@/data/downloads";

interface SearchContentProps {
  initialQuery: string;
}

export function SearchContent({ initialQuery }: SearchContentProps) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return downloads.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="max-w-xl mb-10">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-violet-400 transition-colors" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar apps..."
            autoFocus
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
          />
        </div>
      </form>

      {/* Results */}
      {query.trim() ? (
        <>
          <p className="text-sm text-zinc-500 mb-6">
            {results.length} {results.length === 1 ? "resultado" : "resultados"}
          </p>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
              {results.map((item) => (
                <AppCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-12 h-12 mx-auto text-zinc-700 mb-4" />
              <p className="text-zinc-400 font-medium">
                Nenhum resultado encontrado
              </p>
              <p className="text-sm text-zinc-500 mt-1">
                Tente buscar por outro termo
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <Search className="w-12 h-12 mx-auto text-zinc-700 mb-4" />
          <p className="text-zinc-400 font-medium">
            Digite algo para buscar
          </p>
        </div>
      )}
    </>
  );
}
