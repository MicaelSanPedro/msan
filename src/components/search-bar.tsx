"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  category?: string;
}

export function SearchBar({
  defaultValue = "",
  placeholder = "Buscar jogos, softwares, ferramentas...",
  className = "",
  category,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(
        `/busca?q=${encodeURIComponent(query.trim())}${category ? `&cat=${category}` : ""}`
      );
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="search-glow relative flex items-center gap-2 glass rounded-2xl px-4 sm:px-5 py-3 sm:py-4 transition-all duration-300 border border-white/[0.06]">
        <Search className="w-5 h-5 text-white/30 shrink-0" />
        <input
          type="text"
          placeholder={placeholder}
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
  );
}
