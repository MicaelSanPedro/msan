"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export function Navbar({ activeTab, setActiveTab, searchQuery, setSearchQuery }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Início", tab: "home" },
    { label: "Apps", tab: "apps" },
    { label: "Sobre", tab: "sobre" },
  ];

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab("apps");
      setMobileSearch(false);
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav shadow-lg shadow-green-500/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2.5 group"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 transition-shadow duration-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z"/>
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-1.5">
                <span className="text-white">Linux</span>
                <span className="shimmer-text">Zeiro</span>
                <BadgeCheck className="w-5 h-5 text-blue-500" strokeWidth={2.5} />
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.tab}
                  onClick={() => handleNavClick(link.tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === link.tab
                      ? "text-green-400 bg-green-500/10"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:block relative w-64 lg:w-72">
              <div className="search-glow glass-input flex items-center gap-2 rounded-xl px-3.5 py-2.5 transition-all duration-300">
                <Search className="w-4 h-4 text-white/30 shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white/90 placeholder:text-white/25 w-full"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-0.5 rounded hover:bg-white/5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-white/40" />
                  </button>
                )}
              </div>
            </form>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              {!mobileOpen && (
                <button
                  onClick={() => setMobileSearch(!mobileSearch)}
                  className="p-2 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <Search className="w-5 h-5 text-white/80" />
                </button>
              )}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-white/80" />
                ) : (
                  <Menu className="w-5 h-5 text-white/80" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <AnimatePresence>
            {mobileSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden mb-3"
              >
                <form onSubmit={handleSearch}>
                  <div className="search-glow glass-input flex items-center gap-2 rounded-xl px-3.5 py-2.5">
                    <Search className="w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      placeholder="Buscar apps..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="flex-1 bg-transparent border-none outline-none text-sm text-white/90 placeholder:text-white/25"
                    />
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 glass-nav border-b border-green-500/10 md:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.tab}
                  onClick={() => handleNavClick(link.tab)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    activeTab === link.tab
                      ? "text-green-400 bg-green-500/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
