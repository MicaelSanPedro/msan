'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Monitor, Smartphone } from 'lucide-react';
import { type DownloadItem } from '@/data/downloads';
import { StarRating } from '@/components/star-rating';
import { MagneticButton } from '@/components/magnetic-button';

interface AppCardProps {
  item: DownloadItem;
  featured?: boolean;
}

export function AppCard({ item, featured = false }: AppCardProps) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-white/[0.04] backdrop-blur-[24px] rounded-2xl border border-white/[0.08] overflow-hidden transition-all duration-300 hover:border-white/[0.15] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:scale-[1.01] ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Spotlight effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-150"
          style={{
            background: `radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(139,92,246,0.08), transparent 60%)`,
          }}
        />
      )}

      <Link href={`/${item.category}/${item.id}`} className="block relative z-10">
        <div className={`p-4 md:p-5 ${featured ? 'md:flex md:gap-5' : ''}`}>
          {/* Top section: icon, name, badge */}
          <div className="flex items-start gap-3 mb-3">
            <div
              className={`flex items-center justify-center bg-gradient-to-br ${item.gradient} rounded-[20%] text-2xl md:text-3xl flex-shrink-0 ${
                featured ? 'w-16 h-16 md:w-20 md:h-20' : 'w-12 h-12 md:w-14 md:h-14'
              }`}
            >
              {item.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-semibold text-white truncate">
                {item.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-zinc-500 capitalize">
                  {item.category}
                </span>
                {item.featured && (
                  <span className="text-[10px] font-medium text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded-full">
                    Destaque
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Middle: description + tags */}
          <p className="text-[13px] text-zinc-400 leading-relaxed mb-3 line-clamp-2">
            {item.description}
          </p>

          {featured && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {item.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-zinc-400 bg-white/[0.06] px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom: metadata */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <div className="flex items-center gap-1">
                {item.platform.map((p) => (
                  <span key={p} className="flex items-center gap-0.5">
                    {p.includes('indows') || p.includes('Mac') || p.includes('Linux') ? (
                      <Monitor className="w-3 h-3" />
                    ) : (
                      <Smartphone className="w-3 h-3" />
                    )}
                  </span>
                ))}
              </div>
              <span>v{item.version}</span>
              <span>{item.size}</span>
            </div>
            <StarRating id={item.id} />
          </div>
        </div>
      </Link>

      {/* Download button - outside Link to avoid navigation */}
      <div className="relative z-20 px-4 md:px-5 pb-4 md:pb-5 pt-0">
        <div onClick={(e) => e.stopPropagation()}>
          <MagneticButton size={featured ? 'md' : 'sm'} />
        </div>
      </div>
    </motion.div>
  );
}
