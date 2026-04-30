'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/jogos', label: 'Jogos' },
  { href: '/softwares', label: 'Softwares' },
  { href: '/outros', label: 'Outros' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl transition-colors duration-300 ${
          scrolled
            ? 'bg-black/40 border-white/[0.08]'
            : 'bg-transparent border-transparent'
        }`}
        animate={{
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.4)'
            : '0 0px 0px rgba(0,0,0,0)',
        }}
        style={{
          borderRadius: '1rem',
          border: '1px solid',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <Link href="/" className="text-xl font-extrabold tracking-tighter gradient-text">
            MSAN
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-xl hover:bg-white/[0.06]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const q = prompt('Buscar apps...');
                if (q) window.location.href = `/busca?q=${encodeURIComponent(q)}`;
              }}
              className="p-2 text-zinc-400 hover:text-white transition-colors rounded-xl hover:bg-white/[0.06]"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded-xl hover:bg-white/[0.06]"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="absolute top-20 left-4 right-4 bg-black/50 backdrop-blur-[24px] border border-white/[0.08] rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
