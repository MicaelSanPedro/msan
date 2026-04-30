'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export function MagneticButton({ onClick, size = 'sm' }: MagneticButtonProps) {
  const [clicked, setClicked] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.sqrt(distX * distX + distY * distY);
    if (dist < 100) {
      x.set(distX * 0.15);
      y.set(distY * 0.15);
    }
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      onClick?.();
      setTimeout(() => setClicked(false), 3000);
    }
  };

  const isSm = size === 'sm';

  return (
    <motion.button
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`relative rounded-full font-semibold overflow-hidden transition-all duration-300 cursor-pointer ${
        isSm ? 'px-4 py-2 text-xs' : 'px-8 py-3.5 text-sm'
      } ${
        clicked
          ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
          : 'bg-white/[0.06] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-white/[0.15]'
      }`}
    >
      {/* Liquid fill on hover */}
      {!clicked && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600"
          initial={{ y: '100%' }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <span className="relative z-10">
        {clicked ? '✓ Baixado!' : 'Baixar'}
      </span>
    </motion.button>
  );
}
