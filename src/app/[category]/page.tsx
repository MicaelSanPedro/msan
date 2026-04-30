'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { downloads } from '@/data/downloads';
import { CategoryChips } from '@/components/category-chips';
import { BentoGrid } from '@/components/bento-grid';
import { SearchBar } from '@/components/search-bar';
import { OsToggle } from '@/components/os-toggle';
import { ChevronRight, Package } from 'lucide-react';

const validCategories = ['jogos', 'softwares', 'outros'];

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');

  const categoryInfo = downloads.find(
    (d) => d.category === category
  );
  const categoryItems = useMemo(() => {
    return downloads.filter((item) => {
      if (item.category !== category) return false;

      if (platformFilter !== 'all') {
        const hasPlatform = item.platform.some((p) => {
          if (platformFilter === 'windows') {
            return ['Windows', 'Mac', 'Linux'].includes(p);
          }
          if (platformFilter === 'android') {
            return ['Mobile', 'Console'].includes(p);
          }
          return true;
        });
        if (!hasPlatform) return false;
      }

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [category, platformFilter, searchQuery]);

  if (!validCategories.includes(category)) {
    return (
      <div className="max-w-6xl mx-auto px-4 pt-32 pb-20 text-center">
        <h1 className="text-6xl font-extrabold gradient-text mb-4">404</h1>
        <p className="text-zinc-400 mb-6">Categoria não encontrada</p>
        <Link href="/" className="text-sm text-violet-400 hover:text-violet-300">
          Voltar para o início
        </Link>
      </div>
    );
  }

  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const emoji = category === 'jogos' ? '🎮' : category === 'softwares' ? '💻' : '📦';

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-zinc-300 transition-colors">
          Início
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-300">{categoryLabel}</span>
      </nav>

      {/* Category Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{emoji}</span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {categoryLabel}
          </h1>
          <span className="text-sm text-zinc-500 bg-white/[0.04] px-2.5 py-0.5 rounded-full">
            {categoryItems.length} apps
          </span>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
        <CategoryChips active={category} onChange={(cat) => {
          if (cat !== 'all') {
            window.location.href = `/${cat}`;
          } else {
            window.location.href = '/';
          }
        }} />
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <OsToggle platform={platformFilter} onPlatformChange={setPlatformFilter} />
      </div>

      {/* Grid */}
      {categoryItems.length > 0 ? (
        <BentoGrid items={categoryItems} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <Package className="w-12 h-12 text-zinc-700 mb-4" />
          <p className="text-zinc-400">Nenhum app encontrado nesta categoria</p>
        </motion.div>
      )}
    </div>
  );
}
