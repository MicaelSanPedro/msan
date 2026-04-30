'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { downloads } from '@/data/downloads';
import { HeroSection } from '@/components/hero-section';
import { CategoryChips } from '@/components/category-chips';
import { FeaturedCarousel } from '@/components/featured-carousel';
import { BentoGrid } from '@/components/bento-grid';
import { SkeletonGrid } from '@/components/skeleton-grid';
import { SearchBar } from '@/components/search-bar';
import { OsToggle } from '@/components/os-toggle';
import { Package } from 'lucide-react';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const featuredItems = useMemo(
    () => downloads.filter((d) => d.featured),
    []
  );

  const filteredItems = useMemo(() => {
    return downloads.filter((item) => {
      // Category filter
      if (activeCategory !== 'all') {
        const catMatch = item.category === activeCategory;
        // Also check tags for non-standard categories
        const tagMatch = item.tags.some(
          (t) => t.toLowerCase().replace(/[íã]/g, (m) => m === 'í' ? 'i' : 'a').replace(/ã/g, 'a') === activeCategory.toLowerCase().replace(/[íã]/g, (m) => m === 'í' ? 'i' : 'a').replace(/ã/g, 'a')
        );
        if (!catMatch && !tagMatch) return false;
      }

      // Platform filter
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

      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [activeCategory, searchQuery, platformFilter]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
        <SkeletonGrid />
      </div>
    );
  }

  return (
    <>
      <HeroSection />

      <div className="max-w-6xl mx-auto px-4 pb-20 space-y-14">
        {/* Category + Search + OS Filter */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <CategoryChips active={activeCategory} onChange={setActiveCategory} />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <OsToggle platform={platformFilter} onPlatformChange={setPlatformFilter} />
          </div>
        </motion.section>

        {/* Featured Carousel */}
        {activeCategory === 'all' && !searchQuery && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Apps em Destaque
            </h2>
            <FeaturedCarousel items={featuredItems} />
          </motion.section>
        )}

        {/* All Apps Grid */}
        <motion.section
          id="todos-apps"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Todos os Apps
            </h2>
            <span className="text-sm text-zinc-500 bg-white/[0.04] px-2.5 py-0.5 rounded-full">
              {filteredItems.length}
            </span>
          </div>

          {filteredItems.length > 0 ? (
            <BentoGrid items={filteredItems} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <Package className="w-12 h-12 text-zinc-700 mb-4" />
              <p className="text-zinc-400 text-base">Nenhum app encontrado</p>
              <p className="text-zinc-600 text-sm mt-1">
                Tente ajustar os filtros ou buscar por outro termo
              </p>
            </motion.div>
          )}
        </motion.section>
      </div>
    </>
  );
}
