"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { AppCard } from "@/components/app-card";
import { CategoryChips } from "@/components/category-chips";
import { SkeletonGrid } from "@/components/skeleton-grid";
import { downloads, categories } from "@/data/downloads";

const validCategories: string[] = categories.map((c) => c.id);

const categoryNames: Record<string, string> = {
  jogos: "Jogos",
  softwares: "Softwares",
  outros: "Utilitarios",
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [category, setCategory] = useState<string | null>(null);

  // Resolve params
  params.then((p) => setCategory(p.category));

  const categoryApps = useMemo(() => {
    if (!category) return [];
    return downloads.filter((item) => item.category === category);
  }, [category]);

  const filteredApps = useMemo(() => {
    let result = [...categoryApps];

    if (platformFilter !== "all") {
      result = result.filter((item) =>
        item.platform.includes(platformFilter)
      );
    }

    // Tag filter within category
    if (activeCategory !== "all") {
      result = result.filter((item) =>
        item.tags.some(
          (tag) => tag.toLowerCase() === activeCategory.toLowerCase()
        )
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [categoryApps, activeCategory, searchQuery, platformFilter]);

  if (category && !validCategories.includes(category)) {
    return (
      <>
        <Navbar platformFilter={platformFilter} onPlatformChange={setPlatformFilter} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
            <p className="text-zinc-400 mb-6">Categoria nao encontrada</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors"
            >
              Voltar ao inicio
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        platformFilter={platformFilter}
        onPlatformChange={setPlatformFilter}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-300 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-300">
            {category ? categoryNames[category] || category : "..."}
          </span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {category ? categoryNames[category] || category : "..."}
          </h1>
          <p className="text-zinc-400">
            {categoryApps.length}{" "}
            {categoryApps.length === 1 ? "app disponivel" : "apps disponiveis"}
          </p>
        </div>

        <CategoryChips
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          activeType="tag"
        />

        <div className="mt-8">
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
              {filteredApps.map((item) => (
                <AppCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-zinc-400 font-medium">
                Nenhum app encontrado
              </p>
              <p className="text-sm text-zinc-500 mt-1">
                Tente ajustar os filtros
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
