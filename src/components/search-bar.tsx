'use client';

import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (q: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Buscar apps...' }: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      animate={{ scale: focused ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 transition-all duration-200 ${
          focused
            ? 'bg-white/[0.06] border border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.15)]'
            : 'bg-white/[0.04] border border-white/[0.08]'
        }`}
      >
        <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="bg-transparent outline-none text-sm text-white placeholder-zinc-500 w-full"
        />
      </div>
    </motion.div>
  );
}
