'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, BookOpen } from 'lucide-react';
import { categories } from '@/data/articles';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full border-b border-border-subtle bg-background/95 backdrop-blur-sm sticky top-0 z-50 transition-colors ${
        scrolled ? 'bg-background' : ''
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
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/busca"
              className="p-2 text-text-secondary hover:text-accent transition-colors rounded-md hover:bg-accent-muted"
              aria-label="Buscar"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              href="/links"
              className="ml-2 px-4 py-2 text-sm font-medium text-accent border border-border-accent rounded-lg hover:bg-accent-muted transition-colors"
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
              <Link
                href="/busca"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 text-sm text-text-secondary hover:text-accent transition-colors rounded-md hover:bg-accent-muted flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Buscar
              </Link>
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
