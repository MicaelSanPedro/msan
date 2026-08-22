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
            ? "backdrop-blur-[40px] saturate-[200%] brightness-[105%] bg-gradient-to-b from-emerald-500/25 to-emerald-500/10 text-emerald-100 border border-emerald-400/35 shadow-[0_4px_20px_-8px_rgba(52,211,153,0.45),inset_0_1px_0_rgba(255,255,255,0.15)]"
            : "backdrop-blur-[40px] saturate-[180%] brightness-[105%] bg-gradient-to-b from-white/[0.08] to-white/[0.02] text-white/55 border border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:text-white hover:border-white/[0.22] hover:bg-white/[0.06]"
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
                ? "backdrop-blur-[40px] saturate-[200%] brightness-[105%] bg-gradient-to-b from-emerald-500/25 to-emerald-500/10 text-emerald-100 border border-emerald-400/35 shadow-[0_4px_20px_-8px_rgba(52,211,153,0.45),inset_0_1px_0_rgba(255,255,255,0.15)]"
                : "backdrop-blur-[40px] saturate-[180%] brightness-[105%] bg-gradient-to-b from-white/[0.08] to-white/[0.02] text-white/55 border border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:text-white hover:border-white/[0.22] hover:bg-white/[0.06]"
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
