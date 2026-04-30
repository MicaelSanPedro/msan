'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Search } from 'lucide-react';
import ArticleCard from '@/components/article-card';
import LinkCard from '@/components/link-card';
import { searchArticles } from '@/data/articles';
import { searchLinks } from '@/data/links';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default function SearchPage({ searchParams }: Props) {
  const params = use(searchParams);
  const query = params.q || '';

  const articleResults = query ? searchArticles(query) : [];
  const linkResults = query ? searchLinks(query) : [];
  const totalResults = articleResults.length + linkResults.length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-8">
        <Link href="/" className="hover:text-accent transition-colors flex items-center gap-1">
          <Home className="h-3.5 w-3.5" /> Início
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-text-primary">Buscar</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">
          Buscar
        </h1>
        {query ? (
          <p className="text-text-secondary text-base">
            {totalResults} resultado{totalResults !== 1 ? 's' : ''} para{' '}
            <span className="text-accent font-medium">&ldquo;{query}&rdquo;</span>
          </p>
        ) : (
          <p className="text-text-secondary text-base">
            Use a barra de busca do menu para encontrar artigos e links.
          </p>
        )}
      </div>

      {/* No query */}
      {!query && (
        <div className="text-center py-16 glass rounded-xl">
          <Search className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary mb-2">Nenhuma busca realizada</p>
          <p className="text-sm text-text-muted">
            Digite algo na barra de busca para encontrar conteúdo.
          </p>
        </div>
      )}

      {/* Results */}
      {query && totalResults === 0 && (
        <div className="text-center py-16 glass rounded-xl">
          <Search className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary mb-2">Nenhum resultado encontrado</p>
          <p className="text-sm text-text-muted">
            Tente buscar com outros termos.
          </p>
        </div>
      )}

      {articleResults.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-xl font-bold text-text-primary mb-6">
            Artigos ({articleResults.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articleResults.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {linkResults.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-xl font-bold text-text-primary mb-6">
            Links ({linkResults.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {linkResults.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
