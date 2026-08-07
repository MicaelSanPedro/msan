"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { CategoryBadge } from "@/components/CategoryBadge";
import type { PostSummary } from "@/lib/posts";
import { useRef } from "react";

interface PostCardProps {
  post: PostSummary;
}

export function PostCard({ post }: PostCardProps) {
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

  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="spotlight card-shine relative rounded-2xl overflow-hidden h-full flex flex-col
                   transition-all duration-500 ease-out
                   active:scale-[0.99] active:border-amber-400/30
                   hover:border-white/[0.22] hover:-translate-y-1
                   backdrop-blur-[40px] saturate-[200%] brightness-[105%]
                   bg-gradient-to-b from-white/[0.08] to-white/[0.015]
                   border border-white/[0.15]
                   shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]
                   hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45),0_24px_60px_-20px_rgba(249,189,24,0.15),inset_0_1px_0_rgba(255,255,255,0.14)]"
      >
        {/* Specular top highlight */}
        <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent z-[2] pointer-events-none" />

        {/* Inner refraction glow */}
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_25%_12%,rgba(255,255,255,0.06)_0%,transparent_45%)] pointer-events-none z-[1]" />
        {/* Cover image */}
        <div className="relative h-44 sm:h-48 overflow-hidden">
          {hasImage ? (
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(249,189,24,0.25),_transparent_60%),_radial-gradient(ellipse_at_bottom_right,_rgba(244,63,94,0.15),_transparent_60%)] flex items-center justify-center">
              <span className="text-4xl opacity-60">⌘</span>
            </div>
          )}

          {/* Top gradient for badge readability */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
          {/* Bottom fade into card */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0908] to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <CategoryBadge category={frontmatter.category} />
          </div>

          {/* Arrow icon */}
          <div className="absolute top-3 right-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl
                            backdrop-blur-[40px] saturate-[180%]
                            bg-gradient-to-b from-white/[0.1] to-white/[0.03]
                            border border-white/[0.15]
                            shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_12px_-4px_rgba(0,0,0,0.4)]
                            flex items-center justify-center
                            opacity-70 sm:opacity-0 sm:-translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0
                            transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 text-amber-300" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 sm:p-5 gap-2.5 sm:gap-3">
          {/* Title */}
          <h3 className="text-base sm:text-lg font-semibold text-white leading-snug tracking-tight
                         group-hover:text-amber-100 transition-colors duration-200 line-clamp-2">
            {frontmatter.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-white/45 leading-relaxed line-clamp-2 flex-1">
            {frontmatter.excerpt}
          </p>

          {/* Date and read time — glass gradient divider */}
          <div className="relative pt-3 mt-1">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-1.5 text-[11px] text-white/35 font-mono">
                <Calendar className="w-3 h-3" />
                <time dateTime={frontmatter.date}>
                  {new Date(frontmatter.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-1.5 text-[11px] text-white/35 font-mono">
                <Clock className="w-3 h-3" />
                <span>{frontmatter.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
