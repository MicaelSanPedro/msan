'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Gamepad2, Film, Code2, BookOpen, Microscope, Dices,
} from 'lucide-react';
import type { CategoryType } from '@/data/articles';
import { articles, categories } from '@/data/articles';

const iconMap: Record<CategoryType, React.ComponentType<{ className?: string }>> = {
  games: Gamepad2,
  'filmes-series': Film,
  'dev-tech': Code2,
  'comics-mangas': BookOpen,
  ciencia: Microscope,
  'cultura-geek': Dices,
};

const gradientMap: Record<CategoryType, string> = {
  games: 'from-amber-900/20 to-orange-900/20 border-amber-500/10 hover:border-amber-500/30',
  'filmes-series': 'from-rose-900/20 to-pink-900/20 border-rose-500/10 hover:border-rose-500/30',
  'dev-tech': 'from-blue-900/20 to-cyan-900/20 border-blue-500/10 hover:border-blue-500/30',
  'comics-mangas': 'from-indigo-900/20 to-purple-900/20 border-indigo-500/10 hover:border-indigo-500/30',
  ciencia: 'from-teal-900/20 to-emerald-900/20 border-teal-500/10 hover:border-teal-500/30',
  'cultura-geek': 'from-red-900/20 to-amber-900/20 border-red-500/10 hover:border-red-500/30',
};

const glowMap: Record<CategoryType, string> = {
  games: 'hover:shadow-amber-500/5',
  'filmes-series': 'hover:shadow-rose-500/5',
  'dev-tech': 'hover:shadow-blue-500/5',
  'comics-mangas': 'hover:shadow-indigo-500/5',
  ciencia: 'hover:shadow-teal-500/5',
  'cultura-geek': 'hover:shadow-red-500/5',
};

export default function CategoryCard({ category }: { category: typeof categories[number] }) {
  const Icon = iconMap[category.id];
  const count = articles.filter((a) => a.category === category.id).length;
  const gradient = gradientMap[category.id];
  const glow = glowMap[category.id];

  return (
    <Link href={`/${category.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={`group bg-gradient-to-br ${gradient} border rounded-xl p-6 transition-all duration-200 hover:shadow-lg cursor-pointer ${glow}`}
      >
        <Icon className="h-8 w-8 text-text-secondary group-hover:text-accent transition-colors mb-3" />
        <h3 className="font-serif text-lg font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
          {category.name}
        </h3>
        <p className="text-sm text-text-muted">
          {count} {count === 1 ? 'artigo' : 'artigos'}
        </p>
      </motion.div>
    </Link>
  );
}
