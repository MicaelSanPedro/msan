'use client';

import { motion } from 'framer-motion';
import {
  Gamepad2,
  Cpu,
  Package,
  Palette,
  Wrench,
  Music,
  Shield,
  BarChart3,
} from 'lucide-react';

interface CategoryChipsProps {
  active: string;
  onChange: (cat: string) => void;
}

const categories = [
  { id: 'all', label: 'Todos', icon: Package },
  { id: 'jogos', label: 'Jogos', icon: Gamepad2 },
  { id: 'softwares', label: 'Softwares', icon: Cpu },
  { id: 'outros', label: 'Outros', icon: Palette },
  { id: 'utilitarios', label: 'Utilitários', icon: Wrench },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'ferramentas', label: 'Ferramentas', icon: Wrench },
  { id: 'midia', label: 'Mídia', icon: Music },
  { id: 'seguranca', label: 'Segurança', icon: Shield },
  { id: 'produtividade', label: 'Produtividade', icon: BarChart3 },
];

export function CategoryChips({ active, onChange }: CategoryChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
      {categories.map((cat) => {
        const isActive = active === cat.id;
        const Icon = cat.icon;
        return (
          <motion.button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              isActive
                ? 'bg-violet-600/20 border border-violet-500/30 text-violet-300'
                : 'bg-white/[0.04] border border-white/[0.06] text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-300'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {cat.label}
          </motion.button>
        );
      })}
    </div>
  );
}
