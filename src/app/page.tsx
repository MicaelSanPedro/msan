"use client";

import { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AppCard } from "@/components/app-card";
import { CategoryChips } from "@/components/category-chips";
import { FeaturedCarousel } from "@/components/featured-carousel";
import { SkeletonGrid } from "@/components/skeleton-grid";
import { downloads } from "@/data/downloads";
import type { DownloadItem } from "@/data/downloads";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredApps = useMemo(() => {
    let result: DownloadItem[] = [...downloads];

    // Platform filter
    if (platformFilter !== "all") {
      result = result.filter((item) =>
        item.platform.includes(platformFilter)
      );
    }

    // Category/tag filter
    if (activeCategory !== "all") {
      const isCategory = ["jogos", "softwares", "outros"].includes(
        activeCategory
      );
      if (isCategory) {
        result = result.filter(
          (item) => item.category === activeCategory
        );
      } else {
        result = result.filter((item) =>
          item.tags.some(
            (tag) => tag.toLowerCase() === activeCategory.toLowerCase()
          )
        );
      }
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [searchQuery, activeCategory, platformFilter]);

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        platformFilter={platformFilter}
        onPlatformChange={setPlatformFilter}
        isHome
      />

      <HeroSection />
      <CategoryChips
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <FeaturedCarousel />

      {/* All Apps Section */}
      <section id="apps" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {activeCategory === "all"
              ? "Todos os Apps"
              : activeCategory === "jogos"
                ? "Jogos"
                : activeCategory === "softwares"
                  ? "Softwares"
                  : activeCategory === "outros"
                    ? "Utilitarios"
                    : activeCategory}
          </h2>
          <span className="text-sm text-zinc-500">
            {filteredApps.length} {filteredApps.length === 1 ? "app" : "apps"}
          </span>
        </div>

        {isLoading ? (
          <SkeletonGrid />
        ) : filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
            {filteredApps.map((item) => (
              <AppCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-4xl mb-4 opacity-30">
              <svg className="w-12 h-12 mx-auto text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-zinc-400 font-medium">Nenhum app encontrado</p>
            <p className="text-sm text-zinc-500 mt-1">
              Tente ajustar os filtros ou a busca
            </p>
          </div>
        )}
      </section>
    </>
  );
}
