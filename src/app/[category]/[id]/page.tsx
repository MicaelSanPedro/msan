import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Download,
  ExternalLink,
  ArrowLeft,
  HardDrive,
  Tag,
  Monitor,
  Star,
  Share2,
  Gamepad2,
  Package,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { DownloadCard } from "@/components/download-card";
import { downloads } from "@/data/downloads";
import { DetailShareButton } from "./share-button";

/* Server Component – lê dados estaticamente */

const categoryMeta: Record<
  string,
  { name: string; emoji: string; gradient: string }
> = {
  jogos: { name: "Jogos", emoji: "🎮", gradient: "from-rose-500 to-orange-500" },
  softwares: { name: "Softwares", emoji: "💻", gradient: "from-cyan-500 to-blue-500" },
  outros: { name: "Outros", emoji: "📦", gradient: "from-emerald-500 to-teal-500" },
};

const categoryColors: Record<string, string> = {
  jogos: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  softwares: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  outros: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

const categoryLabels: Record<string, string> = {
  jogos: "Jogo",
  softwares: "Software",
  outros: "Outro",
};

function platformIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p === "windows") return "🪟";
  if (p === "mac" || p === "macos") return "🍎";
  if (p === "linux") return "🐧";
  if (p === "mobile" || p === "android" || p === "ios") return "📱";
  if (p === "console") return "🎮";
  return "💻";
}

export default async function DownloadDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;
  const item = downloads.find(
    (d) => d.category === category && d.id === Number(id)
  );

  if (!item) {
    notFound();
  }

  const meta = categoryMeta[category];
  const relatedItems = downloads
    .filter((d) => d.category === category && d.id !== item.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <BreadcrumbNav
        items={[
          { label: "Início", href: "/" },
          { label: meta?.name || category, href: `/${category}` },
          { label: item.name },
        ]}
      />

      {/* Back button */}
      <Link
        href={`/${category}`}
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-6 sm:mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para {meta?.name || category}
      </Link>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {/* Left column - main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero card */}
          <div className="relative glass rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06]">
            {/* Gradient background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-[0.08]`}
            />
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.gradient}`}
            />

            <div className="relative p-6 sm:p-8 md:p-10">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Big emoji */}
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-xl shrink-0`}
                >
                  <span className="text-4xl sm:text-5xl">{item.emoji}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border ${categoryColors[item.category]}`}
                    >
                      {categoryLabels[item.category]}
                    </span>
                    {item.featured && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Star className="w-3 h-3 fill-amber-400" />
                        Destaque
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                    {item.name}
                  </h1>

                  <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="glass rounded-2xl p-5 sm:p-6 border border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs bg-white/[0.04] text-white/40 border-white/[0.08] rounded-lg px-3 py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - sidebar info */}
        <div className="space-y-6">
          {/* Info card */}
          <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/[0.06] sticky top-24">
            <h3 className="text-sm font-semibold text-white/60 mb-4">
              Informações
            </h3>

            <div className="space-y-4">
              {/* Size */}
              <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                <span className="text-sm text-white/40 flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Tamanho
                </span>
                <span className="text-sm font-medium text-white">
                  {item.size}
                </span>
              </div>

              {/* Version */}
              <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                <span className="text-sm text-white/40 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Versão
                </span>
                <span className="text-sm font-medium text-white">
                  v{item.version}
                </span>
              </div>

              {/* Category */}
              <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                <span className="text-sm text-white/40 flex items-center gap-2">
                  {category === "jogos" ? (
                    <Gamepad2 className="w-4 h-4" />
                  ) : category === "softwares" ? (
                    <Monitor className="w-4 h-4" />
                  ) : (
                    <Package className="w-4 h-4" />
                  )}
                  Categoria
                </span>
                <span className="text-sm font-medium text-white">
                  {meta?.name || category}
                </span>
              </div>
            </div>

            {/* Platforms */}
            <div className="mt-5">
              <h4 className="text-xs font-semibold text-white/40 mb-2.5 uppercase tracking-wider">
                Plataformas
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.platform.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 bg-white/[0.04] rounded-lg px-3 py-1.5 border border-white/[0.06]"
                  >
                    <span>{platformIcon(p)}</span>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Download button */}
            <a
              href={item.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn flex items-center justify-center gap-2 w-full py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-base sm:text-lg transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 mt-6"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              Baixar Agora
              <ExternalLink className="w-4 h-4 opacity-50" />
            </a>

            {/* Share button */}
            <DetailShareButton name={item.name} />
          </div>
        </div>
      </div>

      {/* Related downloads */}
      {relatedItems.length > 0 && (
        <section>
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl glass flex items-center justify-center text-xl sm:text-2xl">
              {meta?.emoji || "📦"}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Outros downloads
              </h2>
              <p className="text-xs sm:text-sm text-white/30">
                Mais {meta?.name?.toLowerCase() || category} para você explorar
              </p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {relatedItems.map((related, i) => (
              <DownloadCard key={related.id} item={related} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
