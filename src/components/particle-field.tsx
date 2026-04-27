"use client";

import { useState, useEffect } from "react";
import { categories, downloads } from "@/data/downloads";

export function ParticleField() {
  const [particles, setParticles] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
      duration: number;
      delay: number;
      color: string;
    }[]
  >([]);

  useEffect(() => {
    const colors = [
      "rgba(168, 85, 247, 0.6)",
      "rgba(6, 182, 212, 0.5)",
      "rgba(244, 63, 94, 0.4)",
      "rgba(16, 185, 129, 0.5)",
      "rgba(245, 158, 11, 0.4)",
    ];
    const p = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(p);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `particle-rise ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
