'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type DownloadItem } from '@/data/downloads';
import { AppCard } from '@/components/app-card';

interface FeaturedCarouselProps {
  items: DownloadItem[];
}

export function FeaturedCarousel({ items }: FeaturedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener('scroll', checkScroll, { passive: true });
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let interval: ReturnType<typeof setInterval>;
    let paused = false;

    const handleMouseEnter = () => { paused = true; };
    const handleMouseLeave = () => { paused = false; };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    interval = setInterval(() => {
      if (!paused && el) {
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: 380, behavior: 'smooth' });
        }
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -380 : 380,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x-mandatory pb-4"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="snap-start flex-shrink-0 w-[320px] md:w-[380px]"
          >
            <AppCard item={item} featured />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] text-white hover:bg-white/[0.12] transition-colors cursor-pointer"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] text-white hover:bg-white/[0.12] transition-colors cursor-pointer"
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  );
}
