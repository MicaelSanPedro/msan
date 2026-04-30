import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Download, ArrowLeft } from "lucide-react";
import { StarRating } from "@/components/star-rating";
import { AppCard } from "@/components/app-card";
import { downloads } from "@/data/downloads";
import type { DownloadItem } from "@/data/downloads";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

const categoryNames: Record<string, string> = {
  jogos: "Jogos",
  softwares: "Softwares",
  outros: "Utilitarios",
};

interface DetailPageProps {
  params: Promise<{ category: string; id: string }>;
}

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "Windows") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 12V6.75l8-1.25V12H3zm10-6.75L21 4v8h-8V5.25zM3 13h8v6.5l-8-1.25V13zm10 0h8v7.5l-8-1.25V13z" />
      </svg>
    );
  }
  if (platform === "Mobile") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 1H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm-2 18H9v-1h6v1zm2-3H7V4h10v12z" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { category, id } = await params;
  const numericId = parseInt(id, 10);
  const item = downloads.find((d) => d.id === numericId);

  if (!item || item.category !== category) {
    notFound();
  }

  const rating = item.id % 2 === 0 ? 4.5 : 5;
  const relatedApps = downloads
    .filter((d) => d.category === item.category && d.id !== item.id)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-zinc-500 mb-8 flex-wrap">
          <Link href="/" className="hover:text-zinc-300 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link
            href={`/${item.category}`}
            className="hover:text-zinc-300 transition-colors"
          >
            {categoryNames[item.category] || item.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-zinc-300 truncate max-w-[200px]">
            {item.name}
          </span>
        </nav>

        {/* App Header */}
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
          {/* Squircle Icon */}
          <div
            className={`shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-[20%] bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl sm:text-5xl shadow-xl`}
          >
            {item.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              {item.name}
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-4">
              {item.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <StarRating rating={rating} size={16} />
              <span className="text-sm text-zinc-500">{rating}/5</span>
              <span className="text-zinc-700">|</span>
              <span className="text-sm text-zinc-400">v{item.version}</span>
              <span className="text-zinc-700">|</span>
              <span className="text-sm text-zinc-400">{item.size}</span>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
            <p className="text-xs text-zinc-500 mb-1">Plataformas</p>
            <div className="flex flex-wrap gap-2">
              {item.platform.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1 text-sm text-zinc-300"
                >
                  <PlatformIcon platform={p} />
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
            <p className="text-xs text-zinc-500 mb-1">Versao</p>
            <p className="text-lg font-semibold text-white">{item.version}</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
            <p className="text-xs text-zinc-500 mb-1">Tamanho</p>
            <p className="text-lg font-semibold text-white">{item.size}</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
            <p className="text-xs text-zinc-500 mb-1">Avaliacao</p>
            <p className="text-lg font-semibold text-white">{rating}/5</p>
          </div>
        </div>

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-zinc-300 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/[0.06] text-sm text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Download Button */}
        <a
          href={item.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-medium text-sm hover:from-violet-500 hover:to-cyan-500 transition-all animate-pulse-subtle mb-16"
        >
          <Download className="w-5 h-5" />
          Baixar {item.name}
        </a>

        {/* Back button */}
        <div className="mb-8">
          <Link
            href={`/${item.category}`}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para{" "}
            {categoryNames[item.category] || item.category}
          </Link>
        </div>

        {/* Related Apps */}
        {relatedApps.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
              Apps Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
              {relatedApps.map((related) => (
                <AppCard key={related.id} item={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
