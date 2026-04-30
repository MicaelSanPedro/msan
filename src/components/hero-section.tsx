'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export function HeroSection() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const stats = [
    { value: '300+', label: 'Apps' },
    { value: '2.4M', label: 'Downloads' },
    { value: '850K', label: 'Usuários' },
  ];

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 pt-24 pb-12">
      <motion.div
        className="text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 gradient-text leading-[1.1]">
          Descubra os Melhores Apps
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-[15px] md:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Downloads seguros e verificados para Windows e Android. Tudo gratuito,
          sempre atualizado.
        </motion.p>

        {/* CTA Button with mouse glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-14"
        >
          <button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => {
              document.getElementById('todos-apps')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative rounded-full px-8 py-4 text-base font-semibold text-white overflow-hidden animate-pulse-subtle cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
            }}
          >
            {/* Mouse-following glow */}
            {isHovering && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.25), transparent 60%)`,
                }}
              />
            )}
            <span className="relative z-10">Explorar Apps</span>
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="flex items-center justify-center gap-3 md:gap-6 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <span className="text-lg md:text-xl font-bold text-white">{stat.value}</span>
              <span className="text-sm text-zinc-500">{stat.label}</span>
              {i < stats.length - 1 && (
                <span className="ml-2 w-1 h-1 rounded-full bg-zinc-600 hidden md:block" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
