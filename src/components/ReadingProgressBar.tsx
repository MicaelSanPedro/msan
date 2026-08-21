"use client";

import { useState, useEffect, useRef } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
        rafRef.current = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed top-[56px] left-0 right-0 h-[3px] bg-amber-500 origin-left z-[100] sm:top-16 lg:top-[72px] sm:h-1"
      style={{
        transform: `scaleX(${progress})`,
        boxShadow: "0 2px 10px rgba(245, 158, 11, 0.4)",
        willChange: "transform"
      }}
    />
  );
}
