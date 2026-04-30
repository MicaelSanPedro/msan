'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import {
  Gamepad2, Film, Code2, BookOpen, Microscope, Dices,
} from 'lucide-react';
import ArticleCard from '@/components/article-card';
import LinkCard from '@/components/link-card';
import { articles, categories, getArticlesByCategory, getCategoryName, type CategoryType } from '@/data/articles';
import { getLinksByCategory, links as allLinks } from '@/data/links';

const iconMap: Record<CategoryType, React.ComponentType<{ className?: string }>> = {
  games: Gamepad2,
  'filmes-series': Film,
  'dev-tech': Code2,
  'comics-mangas': BookOpen,
  ciencia: Microscope,
  'cultura-geek': Dices,
};

const descriptionMap: Record<CategoryType, string> = {
  games: 'Reviews, análises e novidades do mundo dos games.',
  'filmes-series': 'Cinema, anime, séries e tudo sobre tela.',
  'dev-tech': 'Programação, ferramentas e tecnologia.',
  'comics-mangas': 'Quadrinhos, mangás e cultura pop visual.',
  ciencia: 'Descobertas, pesquisas e curiosidades científicas.',
  'cultura-geek': 'RPG, board games, cosplay e tudo que é nerd.',
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.category as string;
  const category = categories.find((c) => c.id === slug);

  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="font-serif text-4xl font-bold text-text-primary mb-4">
          Categoria não encontrada
        </h1>
        <p className="text-text-secondary mb-6">
          Essa categoria não existe. Volte para a página inicial.
        </p>
        <Link href="/" className="text-accent hover:text-accent-hover transition-colors">
          ← Voltar ao Início
        </Link>
      </div>
    );
  }

  const catArticles = getArticlesByCategory(category.id);
  const catLinks = getLinksByCategory(category.id);
  const Icon = iconMap[category.id];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-8">
        <Link href="/" className="hover:text-accent transition-colors flex items-center gap-1">
          <Home className="h-3.5 w-3.5" /> Início
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-text-primary">{category.name}</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center">
            <Icon className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
              {category.name}
            </h1>
          </div>
        </div>
        <p className="text-text-secondary text-base">{descriptionMap[category.id]}</p>
      </motion.div>

      {/* Articles */}
      <section className="mb-16">
        <h2 className="font-serif text-xl font-bold text-text-primary mb-6">
          Artigos ({catArticles.length})
        </h2>
        {catArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-center py-12 bg-surface rounded-xl border border-border-subtle">
            Nenhum artigo nesta categoria ainda. Em breve!
          </p>
        )}
      </section>

      {/* Links */}
      {catLinks.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-bold text-text-primary mb-6">
            Links Recomendados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {catLinks.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
