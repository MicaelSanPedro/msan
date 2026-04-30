'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Search, BookOpen } from 'lucide-react';
import { categories } from '@/data/articles';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 glass-nav ${
        scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.3)]' : ''
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <BookOpen className="h-5 w-5 text-accent" />
            <span className="font-serif text-xl font-bold text-text-primary tracking-tight">
              O Refúgio
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.id}`}
                className="px-3 py-2 text-sm text-text-secondary hover:text-accent transition-colors rounded-md hover:bg-accent-muted"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
                  setSearchQuery('');
                }
              }}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar artigos, links..."
                className="w-64 pl-9 pr-4 py-2 text-sm glass-input rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none transition-all"
              />
            </form>
            <Link
              href="/links"
              className="px-4 py-2 text-sm font-medium text-accent border border-border-accent rounded-lg hover:bg-accent-muted transition-colors"
            >
              Links Úteis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-text-secondary hover:text-accent transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-border-subtle py-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${cat.id}`}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 text-sm text-text-secondary hover:text-accent transition-colors rounded-md hover:bg-accent-muted"
                >
                  {cat.name}
                </Link>
              ))}
              <hr className="border-border-subtle my-2" />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchQuery('');
                    setIsOpen(false);
                  }
                }}
                className="mt-2"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar artigos, links..."
                    className="w-full pl-9 pr-4 py-2.5 text-sm glass-input rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none transition-all"
                  />
                </div>
              </form>
              <Link
                href="/links"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 text-sm text-accent hover:bg-accent-muted transition-colors rounded-md"
              >
                Links Úteis
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
