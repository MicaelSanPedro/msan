"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-[56px] left-0 right-0 h-[3px] bg-amber-500 origin-left z-[100] sm:top-16 lg:top-[72px] sm:h-1"
      style={{
        scaleX,
        boxShadow: "0 2px 10px rgba(245, 158, 11, 0.4)"
      }}
    />
  );
}
