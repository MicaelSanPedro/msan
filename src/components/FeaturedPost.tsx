"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { CategoryBadge } from "@/components/CategoryBadge";
import type { PostSummary } from "@/lib/posts";
import { useRef } from "react";

interface FeaturedPostProps {
  post: PostSummary;
  variant?: "hero" | "compact";
}

export function FeaturedPost({ post, variant = "hero" }: FeaturedPostProps) {
  const { slug, frontmatter } = post;
  const hasImage = Boolean(
    frontmatter.coverImage &&
      (frontmatter.coverImage.startsWith("http") || frontmatter.coverImage.startsWith("/"))
  );
  const cardRef = useRef<HTMLElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--x", `${x}%`);
    cardRef.current.style.setProperty("--y", `${y}%`);
  }

  if (variant === "compact") {
    return (
      <Link href={`/blog/${slug}`} className="group block h-full">
        <article
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="spotlight card-shine liquid-glass-card prismatic-border card-glow-hover relative rounded-3xl overflow-hidden h-full flex flex-col
                     transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          {/* Specular highlight & refraction glow handled by liquid-glass-card pseudo-elements */}
          {/* Background image */}
          <div className="relative h-40 sm:h-48 overflow-hidden">
            {hasImage ? (
              <Image
                src={frontmatter.coverImage}
                alt={frontmatter.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_rgba(52,211,153,0.3),_transparent_60%)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060a08] via-[#060a08]/40 to-transparent" />
            <div className="absolute top-3 left-3">
              <CategoryBadge category={frontmatter.category} />
            </div>
          </div>

          <div className="flex-1 flex flex-col p-4 sm:p-5 gap-2.5 sm:gap-3">
            <h3 className="text-base sm:text-lg font-semibold text-white leading-tight tracking-tight line-clamp-2
                           group-hover:text-emerald-100 transition-colors">
              {frontmatter.title}
            </h3>
            <p className="text-sm text-white/60 leading-relaxed line-clamp-2 flex-1">
              {frontmatter.excerpt}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
              <div className="flex items-center gap-3 text-[11px] text-white/45 font-mono">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {frontmatter.readTime}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-300 group-hover:text-emerald-200 transition-colors">
                Ler
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // ─── Hero variant ───
  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="spotlight card-shine liquid-glass-card prismatic-border card-glow-hover relative rounded-3xl sm:rounded-[32px] overflow-hidden
                   transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] h-full min-h-[360px] sm:min-h-[440px] lg:min-h-[480px]"
      >
        {/* Background image */}
        {hasImage && (
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            fill
            className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
          />
        )}

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a08] via-[#060a08]/60 to-[#060a08]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/15 via-transparent to-rose-900/10 pointer-events-none" />
        {/* Specular highlight handled by liquid-glass-card pseudo-element */}

        <div className="relative z-[2] p-5 sm:p-8 lg:p-10 flex flex-col justify-end h-full">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <CategoryBadge category={frontmatter.category} />
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-[2.25rem] font-extrabold text-white leading-[1.1] mb-3 sm:mb-4 max-w-2xl tracking-tight
                         group-hover:text-emerald-50 transition-colors duration-300 text-balance">
            {frontmatter.title}
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-5 sm:mb-6 max-w-2xl line-clamp-2 sm:line-clamp-3 text-pretty">
            {frontmatter.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 text-xs text-white/65 font-mono">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={frontmatter.date}>
                  {new Date(frontmatter.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{frontmatter.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
