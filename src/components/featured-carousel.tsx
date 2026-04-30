"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { AppCard } from "@/components/app-card";
import { downloads } from "@/data/downloads";

export function FeaturedCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const featuredApps = downloads.filter((item) => item.featured);

  const checkScrollability = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.85;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollToNext = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.85;
    if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(scrollToNext, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, scrollToNext]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScrollability();
    el.addEventListener("scroll", checkScrollability, { passive: true });
    return () => el.removeEventListener("scroll", checkScrollability);
  }, [checkScrollability]);

  return (
    <section className="relative py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-violet-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Apps em Destaque
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="p-2 rounded-xl bg-white/5 border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all focus-ring"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="p-2 rounded-xl bg-white/5 border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all focus-ring"
            aria-label="Proximo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto snap-x-mandatory scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {featuredApps.map((item) => (
          <div
            key={item.id}
            className="shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] snap-start"
          >
            <div className="h-full animate-float-gentle" style={{ animationDelay: `${item.id * 0.1}s` }}>
              <AppCard item={item} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
