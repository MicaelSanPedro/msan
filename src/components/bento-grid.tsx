'use client';

import { motion } from 'framer-motion';
import { type DownloadItem } from '@/data/downloads';
import { AppCard } from '@/components/app-card';

interface BentoGridProps {
  items: DownloadItem[];
}

export function BentoGrid({ items }: BentoGridProps) {
  if (items.length === 0) return null;

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.05 },
        },
      }}
    >
      {items.map((item, idx) => {
        // First featured item takes 2 columns on md+
        const isFirstFeatured = idx === 0 && item.featured;
        return (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className={isFirstFeatured ? 'md:col-span-2' : ''}
          >
            <AppCard item={item} featured={isFirstFeatured} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
