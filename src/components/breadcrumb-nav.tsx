"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function BreadcrumbNav({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 sm:mb-8"
    >
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-sm">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5 sm:gap-2.5">
            {i > 0 && (
              <span className="text-white/20" aria-hidden="true">
                /
              </span>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="text-white/40 hover:text-purple-400 transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-white/80 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  );
}
