"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import type { PostSummary } from "@/lib/posts";

interface SearchBarProps {
  allPosts: PostSummary[];
  alwaysOpen?: boolean;
}

export function SearchBar({ allPosts, alwaysOpen = false }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(alwaysOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [results, setResults] = useState<PostSummary[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const closeSearch = useCallback(() => {
    if (alwaysOpen) {
      setQuery("");
      return;
    }
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setQuery("");
    }, 200);
  }, [alwaysOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allPosts.filter(
      (post) =>
        post.frontmatter.title.toLowerCase().includes(q) ||
        post.frontmatter.excerpt.toLowerCase().includes(q) ||
        post.frontmatter.category.toLowerCase().includes(q) ||
        post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(q))
    );
    setResults(filtered.slice(0, 6));
    setSelectedIndex(-1);
  }, [query, allPosts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isClosing) return;
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [alwaysOpen, isClosing, closeSearch]);

  useEffect(() => {
    if (isOpen && inputRef.current && !alwaysOpen) {
      inputRef.current.focus();
    }
  }, [isOpen, alwaysOpen]);

  useEffect(() => {
    if (alwaysOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [alwaysOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (alwaysOpen || isClosing) return;
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [alwaysOpen, isClosing, closeSearch]);

  function handleSelect(slug: string) {
    if (!alwaysOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 200);
    }
    setQuery("");
    router.push(`/blog/${slug}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex].slug);
    }
  }

  if (!isOpen && !isClosing && !alwaysOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl relative overflow-hidden
                   backdrop-blur-[24px] saturate-[200%] contrast-[105%]
                   bg-gradient-to-b from-white/[0.18] to-white/[0.05]
                   border border-white/30
                   shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.6),inset_0_-1px_2px_0_rgba(0,0,0,0.1),0_20px_50px_rgba(0,0,0,0.25)]
                   text-white/55 hover:text-white/70 hover:border-white/45
                   active:scale-95 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] text-sm"
        aria-label="Buscar artigos"
        type="button"
      >
        <span className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
        <Search className="w-4 h-4" />
        <span className="hidden lg:inline">Buscar...</span>
        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] text-white/40 font-mono">
          Ctrl K
        </kbd>
      </button>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${isClosing ? 'searchbar-closing' : ''}`}>
      {/* Input */}
      <div className={`searchbar-input-wrap ${isClosing ? 'searchbar-input-closing' : ''}`}>
        <span className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent pointer-events-none z-[2]" />
        <Search className="w-4 h-4 text-emerald-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar artigos, tags..."
          className="searchbar-input"
        />
        <button
          onClick={closeSearch}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors duration-150 shrink-0"
          type="button"
          aria-label="Fechar busca"
        >
          <X className="w-3.5 h-3.5 text-white/55" />
        </button>
      </div>

      {/* Results dropdown */}
      <div className="searchbar-dropdown">
        {results.length > 0 && query.trim().length >= 2 && (
          <>
            <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-[3]" />
            <div className="p-1 max-h-[60vh] overflow-y-auto">
              {results.map((post, i) => (
                <button
                  key={post.slug}
                  onClick={() => handleSelect(post.slug)}
                  className={`searchbar-result ${i === selectedIndex ? "searchbar-result-active" : ""}`}
                  type="button"
                >
                  <span className="text-emerald-400 mt-0.5 shrink-0">
                    <Search className="w-3.5 h-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white font-medium truncate">
                      {post.frontmatter.title}
                    </p>
                    <p className="text-xs text-white/40 truncate mt-0.5">
                      {post.frontmatter.category} · {post.frontmatter.readTime} de leitura
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <div className="px-3 py-2 border-t border-white/[0.04]">
              <p className="text-[11px] text-white/30">
                {results.length} resultado{results.length !== 1 ? "s" : ""} · Enter para abrir
              </p>
            </div>
          </>
        )}

        {query.trim().length >= 2 && results.length === 0 && (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-white/40">
              Nenhum resultado para &quot;{query}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
