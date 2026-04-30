'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, ArrowRight } from 'lucide-react';
import ArticleCard from '@/components/article-card';
import CategoryCard from '@/components/category-card';
import LinkCard from '@/components/link-card';
import SkeletonGrid from '@/components/skeleton-grid';
import { articles, categories, getFeaturedArticles, getCategoryName } from '@/data/articles';
import { links, type CategoryType } from '@/data/links';

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const featured = getFeaturedArticles();
  const recentArticles = articles
    .filter((a) => !a.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 9);
  const highlightedLinks = links.filter((_, i) => i % 6 === 0 || i < 6).slice(0, 6);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero skeleton */}
        <div className="h-64 md:h-80 bg-surface rounded-xl animate-pulse mb-12" />
        {/* Grid skeleton */}
        <SkeletonGrid count={6} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-16">
        <Link href={`/artigo/${featured[0].id}`} className="group block">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${featured[0].coverGradient} border border-border-subtle`}
          >
            <div className="relative p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-1 z-10">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-accent-muted text-accent rounded-md mb-4">
                  {getCategoryName(featured[0].category)}
                </span>
                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-tight mb-4 group-hover:text-accent transition-colors">
                  {featured[0].title}
                </h1>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mb-6">
                  {featured[0].subtitle}
                </p>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span>{featured[0].author}</span>
                  <span>•</span>
                  <span>{new Date(featured[0].date + 'T00:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {featured[0].readTime} min de leitura
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-accent text-background font-medium text-sm rounded-lg hover:bg-accent-hover transition-colors">
                  Ler Artigo <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              <div className="text-8xl md:text-[10rem] opacity-40 group-hover:opacity-60 transition-opacity select-none">
                {featured[0].coverEmoji}
              </div>
            </div>
          </motion.div>
        </Link>
      </section>

      {/* Recent Articles */}
      <section className="mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-8"
        >
          <motion.h2 variants={fadeInUp} custom={0} className="font-serif text-2xl md:text-3xl font-bold text-text-primary mb-1">
            Artigos Recentes
          </motion.h2>
          <motion.p variants={fadeInUp} custom={1} className="text-text-secondary text-sm">
            Últimas publicações do Refúgio
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentArticles.map((article, i) => (
            <motion.div
              key={article.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={i}
              variants={fadeInUp}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-8"
        >
          <motion.h2 variants={fadeInUp} custom={0} className="font-serif text-2xl md:text-3xl font-bold text-text-primary mb-1">
            Por Categoria
          </motion.h2>
          <motion.p variants={fadeInUp} custom={1} className="text-text-secondary text-sm">
            Explore por área de interesse
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={i}
              variants={fadeInUp}
            >
              <CategoryCard category={cat} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Useful Links */}
      <section className="mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-8"
        >
          <motion.h2 variants={fadeInUp} custom={0} className="font-serif text-2xl md:text-3xl font-bold text-text-primary mb-1">
            Links Úteis
          </motion.h2>
          <motion.p variants={fadeInUp} custom={1} className="text-text-secondary text-sm">
            Recursos selecionados pela nossa equipe
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlightedLinks.map((link, i) => (
            <motion.div
              key={link.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={i}
              variants={fadeInUp}
            >
              <LinkCard link={link} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={6}
          className="mt-6 text-center"
        >
          <Link
            href="/links"
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors"
          >
            Ver Todos os Links <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
