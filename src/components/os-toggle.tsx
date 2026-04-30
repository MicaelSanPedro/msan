'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone } from 'lucide-react';

interface OsToggleProps {
  platform: string;
  onPlatformChange: (p: string) => void;
}

export function OsToggle({ platform, onPlatformChange }: OsToggleProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative bg-white/[0.06] rounded-full p-1 flex items-center gap-1">
      <motion.div
        className="absolute top-1 bottom-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full"
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          left: platform === 'all' ? '4px' : platform === 'windows' ? 'calc(33.33% + 2px)' : 'calc(66.66% + 0px)',
          width: 'calc(33.33% - 4px)',
        }}
      />
      {[
        { id: 'all', label: 'Todos', icon: null },
        { id: 'windows', label: 'Windows', icon: Monitor },
        { id: 'android', label: 'Android', icon: Smartphone },
      ].map((opt) => {
        const isActive = platform === opt.id;
        const Icon = opt.icon;
        return (
          <button
            key={opt.id}
            onClick={() => onPlatformChange(opt.id)}
            onMouseEnter={() => setHovered(opt.id)}
            onMouseLeave={() => setHovered(null)}
            className={`relative z-10 flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors cursor-pointer ${
              isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {Icon && (
              <motion.span
                animate={{
                  scale: isActive ? 1.15 : 1,
                  filter: isActive ? 'drop-shadow(0 0 6px rgba(139,92,246,0.5))' : 'none',
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-3.5 h-3.5" />
              </motion.span>
            )}
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
