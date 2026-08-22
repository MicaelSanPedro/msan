import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  User,
} from "lucide-react";
import { CategoryBadge } from "@/components/CategoryBadge";
import { PostCard } from "@/components/PostCard";
import { ShareButtons } from "@/components/ShareButtons";
import { ProseEnhancer } from "@/components/ProseEnhancer";
import { Comments } from "@/components/Comments";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { ImageZoomHandler } from "@/components/ImageZoomHandler";
import { CoverImageZoom } from "@/components/CoverImageZoom";
import { Newsletter } from "@/components/Newsletter";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artigo não encontrado" };

  return {
    title: `${post.frontmatter.title} — TechMate`,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: post.frontmatter.coverImage ? [post.frontmatter.coverImage] : [],
      type: "article",
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getRelativeDate(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Ontem";
  if (diffDays < 7) return `Há ${diffDays} dias`;
  if (diffDays < 30) return `Há ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? "s" : ""}`;
  if (diffDays < 365) return `Há ${Math.floor(diffDays / 30)} mês${Math.floor(diffDays / 30) > 1 ? "es" : ""}`;
  return `Há ${Math.floor(diffDays / 365)} ano${Math.floor(diffDays / 365) > 1 ? "s" : ""}`;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const { frontmatter, contentHtml } = post;
  const hasCover = Boolean(
    frontmatter.coverImage &&
      (frontmatter.coverImage.startsWith("http") || frontmatter.coverImage.startsWith("/"))
  );

  // Related posts (same category, excluding current)
  const allPosts = getAllPosts();
  const related = allPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        p.frontmatter.category.toLowerCase() === frontmatter.category.toLowerCase()
    )
    .slice(0, 3);

  return (
    <div className="pt-24 sm:pt-28 pb-20 sm:pb-24 px-4">
      <ReadingProgressBar />
      <ImageZoomHandler />

      <article className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-emerald-300 transition-colors mb-6 sm:mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Voltar ao Blog
          </Link>

          {/* Post header */}
          <header className="mb-10 sm:mb-12 animate-fade-up">
            <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6 flex-wrap">
              <CategoryBadge category={frontmatter.category} />
              <span className="text-xs text-white/20">·</span>
              <span className="text-xs text-white/60 font-mono">
                {getRelativeDate(frontmatter.date)}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] mb-5 sm:mb-7 tracking-tight text-balance">
              {frontmatter.title}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/70 leading-relaxed mb-7 sm:mb-9 text-pretty">
              {frontmatter.excerpt}
            </p>

            {/* Meta bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-white/[0.025] border border-white/[0.06]">
              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2.5">
                <div className="flex items-center gap-2 sm:gap-2.5 text-sm">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-emerald-400/40 to-emerald-600/30 ring-1 ring-emerald-400/30 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-emerald-200" />
                  </div>
                  <span className="font-medium text-white/75 text-sm">TechMate</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-1.5 text-xs text-white/70 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={frontmatter.date}>
                    {formatDate(frontmatter.date)}
                  </time>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/70 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{frontmatter.readTime}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShareButtons
                  url={`https://techmate.dev/blog/${slug}`}
                  title={frontmatter.title}
                />
              </div>
            </div>

            {/* Tags */}
            {frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5 sm:mt-6">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-mono text-emerald-300/70 bg-emerald-500/[0.06] border border-emerald-500/15 hover:bg-emerald-500/10 hover:text-emerald-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Cover image */}
          {hasCover && (
            <CoverImageZoom
              src={frontmatter.coverImage}
              alt={frontmatter.title}
            />
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-emerald-500/30 via-emerald-500/10 to-transparent mb-10 sm:mb-12" />

          {/* Post content */}
          <ProseEnhancer />
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Newsletter */}
          <div className="mt-16 sm:mt-24 w-full overflow-hidden" data-scroll-reveal>
            <Newsletter />
          </div>

          {/* End-of-article callout */}
          <div className="mt-12 sm:mt-16 p-5 sm:p-8 rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-emerald-500/[0.06] to-transparent" data-scroll-reveal>
            <p className="text-xs sm:text-sm text-emerald-200/80 font-semibold mb-1 tracking-wide uppercase">
              Curtiu?
            </p>
            <p className="text-white/65 text-sm mb-4 sm:mb-5">
              Compartilhe este artigo com outros devs ou explore mais sobre {frontmatter.category}.
            </p>
            <ShareButtons
              url={`https://techmate.dev/blog/${slug}`}
              title={frontmatter.title}
              className="mb-4"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/blog?category=${encodeURIComponent(frontmatter.category)}`}
                className="btn-primary justify-center"
              >
                Mais sobre {frontmatter.category}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/blog" className="btn-secondary justify-center">
                Todos os artigos
              </Link>
            </div>
          </div>

          {/* Comments */}
          <Comments slug={slug} />

          {/* Bottom nav */}
          <div className="mt-12 sm:mt-14 pt-6 border-t border-white/[0.06] flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors group text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Ver todos os artigos
            </Link>
          </div>
        </article>



      {/* Related posts */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto mt-20 sm:mt-24" data-scroll-reveal>
          <div className="mb-8 sm:mb-12 max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 sm:w-6 h-px bg-gradient-to-r from-emerald-400 to-transparent" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-emerald-300/80 font-medium">
                Relacionados
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Continue lendo
            </h2>
          </div>
          <div className="cv-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {related.map((p, i) => (
              <div key={p.slug} data-scroll-reveal data-scroll-delay={`${i * 100}`}>
                <PostCard post={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
