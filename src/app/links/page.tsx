'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import LinkCard from '@/components/link-card';
import { links, categories, type CategoryType, getLinksByCategory } from '@/data/links';
import { getCategoryName } from '@/data/articles';

export default function LinksPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'all'>('all');

  const filteredLinks =
    activeCategory === 'all'
      ? links
      : getLinksByCategory(activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-8">
        <Link href="/" className="hover:text-accent transition-colors flex items-center gap-1">
          <Home className="h-3.5 w-3.5" /> Início
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-text-primary">Links Úteis</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">
          Links Úteis
        </h1>
        <p className="text-text-secondary text-base max-w-2xl">
          Nossa seleção curada dos melhores recursos da internet para nerds.
          Games, filmes, dev, ciência e muito mais.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            activeCategory === 'all'
              ? 'bg-accent text-background font-medium'
              : 'glass text-text-secondary hover:text-accent'
          }`}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              activeCategory === cat.id
                ? 'bg-accent text-background font-medium'
                : 'glass text-text-secondary hover:text-accent'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLinks.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>

      {filteredLinks.length === 0 && (
        <p className="text-text-muted text-center py-12 glass rounded-xl">
          Nenhum link encontrado nesta categoria.
        </p>
      )}
    </div>
  );
}
