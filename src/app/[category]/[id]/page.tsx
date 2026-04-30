import Link from 'next/link';
import { notFound } from 'next/navigation';
import { downloads } from '@/data/downloads';
import { StarRating } from '@/components/star-rating';
import { ChevronRight, Monitor, HardDrive, Tag } from 'lucide-react';

export default async function DetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id: idStr } = await params;
  const id = parseInt(idStr, 10);

  const item = downloads.find((d) => d.id === id && d.category === category);

  if (!item) {
    notFound();
  }

  const relatedItems = downloads
    .filter((d) => d.category === item.category && d.id !== item.id)
    .slice(0, 3);

  const categoryLabel = item.category.charAt(0).toUpperCase() + item.category.slice(1);

  const infoCards = [
    {
      icon: Monitor,
      label: 'Plataformas',
      value: item.platform.join(', '),
    },
    {
      icon: Tag,
      label: 'Versão',
      value: `v${item.version}`,
    },
    {
      icon: HardDrive,
      label: 'Tamanho',
      value: item.size,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500 mb-10">
        <Link href="/" className="hover:text-zinc-300 transition-colors">
          Início
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/${item.category}`}
          className="hover:text-zinc-300 transition-colors"
        >
          {categoryLabel}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-300">{item.name}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-5 mb-10">
        <div
          className={`flex items-center justify-center bg-gradient-to-br ${item.gradient} rounded-[20%] text-5xl md:text-6xl flex-shrink-0 w-20 h-20 md:w-24 md:h-24`}
        >
          {item.emoji}
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
            {item.name}
          </h1>
          <p className="text-[15px] text-zinc-400 leading-relaxed max-w-2xl">
            {item.description}
          </p>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-xs font-medium text-zinc-500 bg-white/[0.06] px-2.5 py-1 rounded-full capitalize">
              {item.category}
            </span>
            {item.featured && (
              <span className="text-xs font-medium text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                Destaque
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {infoCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white/[0.04] backdrop-blur-[24px] border border-white/[0.08] rounded-2xl p-4"
            >
              <p className="text-xs text-zinc-500 mb-2">{card.label}</p>
              <Icon className="w-4 h-4 text-zinc-400 mb-1.5" />
              <p className="text-sm font-medium text-white">{card.value}</p>
            </div>
          );
        })}
        {/* Rating card */}
        <div className="bg-white/[0.04] backdrop-blur-[24px] border border-white/[0.08] rounded-2xl p-4">
          <p className="text-xs text-zinc-500 mb-2">Avaliação</p>
          <StarRating id={item.id} />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-zinc-400 bg-white/[0.06] px-3 py-1.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Download CTA */}
      <div className="mb-16">
        <a
          href={item.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <div className="relative rounded-full px-10 py-4 text-base font-semibold text-white overflow-hidden animate-pulse-subtle"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
            }}
          >
            Baixar Agora
          </div>
        </a>
      </div>

      {/* Related apps */}
      {relatedItems.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Apps Relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedItems.map((rel) => (
              <Link
                key={rel.id}
                href={`/${rel.category}/${rel.id}`}
                className="group bg-white/[0.04] backdrop-blur-[24px] rounded-2xl border border-white/[0.08] overflow-hidden transition-all duration-300 hover:border-white/[0.15] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`flex items-center justify-center bg-gradient-to-br ${rel.gradient} rounded-[20%] text-xl w-10 h-10`}
                    >
                      {rel.emoji}
                    </div>
                    <h3 className="text-sm font-semibold text-white truncate">
                      {rel.name}
                    </h3>
                  </div>
                  <p className="text-[13px] text-zinc-400 leading-relaxed line-clamp-2">
                    {rel.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
