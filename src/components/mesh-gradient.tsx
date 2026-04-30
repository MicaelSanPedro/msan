'use client';

import { motion } from 'framer-motion';

export function MeshGradient() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep violet orb */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          width: 400,
          height: 400,
          top: '-10%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(30, 27, 75, 0.6) 0%, transparent 70%)',
          filter: 'blur(120px)',
          borderRadius: '50%',
        }}
        animate={{
          x: [0, 80, -40, 60, 0],
          y: [0, 50, 100, 30, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Deep cyan orb */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          width: 350,
          height: 350,
          top: '30%',
          right: '-8%',
          background: 'radial-gradient(circle, rgba(14, 77, 92, 0.5) 0%, transparent 70%)',
          filter: 'blur(120px)',
          borderRadius: '50%',
        }}
        animate={{
          x: [0, -70, 30, -50, 0],
          y: [0, -40, 60, -20, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Subtle rose orb */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          width: 300,
          height: 300,
          bottom: '10%',
          left: '20%',
          background: 'radial-gradient(circle, rgba(45, 27, 61, 0.4) 0%, transparent 70%)',
          filter: 'blur(120px)',
          borderRadius: '50%',
        }}
        animate={{
          x: [0, 60, -30, 50, 0],
          y: [0, -60, -20, -80, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Deep indigo orb */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          width: 250,
          height: 250,
          top: '60%',
          left: '60%',
          background: 'radial-gradient(circle, rgba(30, 20, 70, 0.35) 0%, transparent 70%)',
          filter: 'blur(120px)',
          borderRadius: '50%',
        }}
        animate={{
          x: [0, -50, 40, -60, 0],
          y: [0, 30, -50, 40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
