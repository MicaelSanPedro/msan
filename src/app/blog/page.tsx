import { Suspense } from "react";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Search, Layers } from "lucide-react";
import Link from "next/link";

interface BlogPageProps {
  searchParams: Promise<{ category?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  const selectedCategory = params.category;
  const filteredPosts = selectedCategory
    ? allPosts.filter(
        (p) => p.frontmatter.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : allPosts;

  return (
    <div className="pt-24 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="mb-10 sm:mb-14 lg:mb-16 max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/30 mb-4 sm:mb-5">
            <Layers className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/70 font-medium">
              Biblioteca
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-5 tracking-tight leading-[1.05] text-balance">
            {selectedCategory ? (
              <>
                Categoria:{" "}
                <span className="shimmer-text">{selectedCategory}</span>
              </>
            ) : (
              <>
                Todos os <span className="shimmer-text">artigos</span>
              </>
            )}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/60 text-pretty">
            {selectedCategory
              ? `Mostrando ${filteredPosts.length} artigo${
                  filteredPosts.length === 1 ? "" : "s"
                } na categoria ${selectedCategory}.`
              : `Explore os ${allPosts.length} artigos do blog — filtrados por categoria ou explore a biblioteca completa.`}
          </p>
        </div>

        {/* ── Filter pills (scroll horizontal no mobile) ── */}
        <Suspense>
          <CategoryFilter categories={categories} totalPosts={allPosts.length} />
        </Suspense>

        {/* ── Posts Grid ── */}
        {filteredPosts.length > 0 ? (
          <div className="cv-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {filteredPosts.map((post, i) => (
              <div
                key={post.slug}
                data-scroll-reveal
                data-scroll-delay={`${Math.min(i, 6) * 80}`}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-24 px-6 rounded-2xl sm:rounded-3xl border border-white/[0.06] bg-white/[0.02]">
            <Search className="w-10 h-10 mx-auto text-white/20 mb-4" />
            <p className="text-white/60 text-base sm:text-lg mb-4">Nenhum artigo encontrado.</p>
            <Link
              href="/blog"
              className="btn-secondary inline-flex"
            >
              Ver todos os artigos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
