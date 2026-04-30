"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Monitor, Smartphone, Menu, X } from "lucide-react";

interface NavbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  platformFilter?: string;
  onPlatformChange?: (platform: string) => void;
  isHome?: boolean;
}

export function Navbar({
  searchQuery = "",
  onSearchChange,
  platformFilter = "all",
  onPlatformChange,
  isHome = false,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/busca?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-[#0A0A0B]/80 border-b border-white/[0.06] shadow-lg shadow-black/10"
          : "backdrop-blur-md bg-[#0A0A0B]/60 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 focus-ring rounded-lg px-1"
          >
            <span className="text-xl font-bold gradient-text">MSAN</span>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-auto"
          >
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-violet-400 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Buscar apps..."
                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
              />
            </div>
          </form>

          {/* Desktop: Platform Toggles */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => onPlatformChange?.("all")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                platformFilter === "all"
                  ? "bg-violet-600/20 text-violet-300 shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => onPlatformChange?.("Windows")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                platformFilter === "Windows"
                  ? "bg-violet-600/20 text-violet-300 shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden lg:inline">Windows</span>
            </button>
            <button
              onClick={() => onPlatformChange?.("Mobile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                platformFilter === "Mobile"
                  ? "bg-cyan-600/20 text-cyan-300 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden lg:inline">Android</span>
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors focus-ring"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors focus-ring"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden pb-3 animate-fade-in">
            <form onSubmit={handleSearch}>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder="Buscar apps..."
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.06] animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/jogos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Jogos
            </Link>
            <Link
              href="/softwares"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Softwares
            </Link>
            <Link
              href="/outros"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Utilitarios
            </Link>
            <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center gap-2">
              <button
                onClick={() => {
                  onPlatformChange?.("all");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  platformFilter === "all"
                    ? "bg-violet-600/20 text-violet-300"
                    : "text-zinc-400 hover:bg-white/5"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => {
                  onPlatformChange?.("Windows");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  platformFilter === "Windows"
                    ? "bg-violet-600/20 text-violet-300"
                    : "text-zinc-400 hover:bg-white/5"
                }`}
              >
                <Monitor className="w-4 h-4" />
                Windows
              </button>
              <button
                onClick={() => {
                  onPlatformChange?.("Mobile");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  platformFilter === "Mobile"
                    ? "bg-cyan-600/20 text-cyan-300"
                    : "text-zinc-400 hover:bg-white/5"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                Android
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
