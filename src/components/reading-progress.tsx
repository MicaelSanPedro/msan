'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setProgress(0);

    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollHeight > 0) {
        setProgress((scrollTop / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Only show on article pages
  if (!pathname.startsWith('/artigo/')) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-accent to-accent-hover transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
