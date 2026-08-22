"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Category {
  name: string;
  count: number;
}

interface CategoryFilterProps {
  categories: Category[];
  totalPosts: number;
}

export function CategoryFilter({ categories, totalPosts }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  return (
    <div className="flex gap-2 mb-10 sm:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap animate-fade-up delay-1 scrollbar-thin">
      <Link
        href="/blog"
        scroll={false}
        className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer relative overflow-hidden ${
          !selectedCategory
            ? "liquid-glass-pill text-emerald-100"
            : "liquid-glass-pill text-white/55 hover:text-white"
        }`}
      >
        {!selectedCategory && (
          <span className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-[2]" />
        )}
        Todos
        <span className="ml-1.5 text-xs opacity-60 font-mono">
          ({totalPosts})
        </span>
      </Link>
      {categories.map((cat) => {
        const active =
          selectedCategory.toLowerCase() === cat.name.toLowerCase();
        return (
          <Link
            key={cat.name}
            href={`/blog?category=${encodeURIComponent(cat.name)}`}
            scroll={false}
            className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer relative overflow-hidden ${
              active
                ? "liquid-glass-pill text-emerald-100"
                : "liquid-glass-pill text-white/55 hover:text-white"
            }`}
          >
            {active && (
              <span className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-[2]" />
            )}
            {cat.name}
            <span className="ml-1.5 text-xs opacity-60 font-mono">
              ({cat.count})
            </span>
          </Link>
        );
      })}
    </div>
  );
}
