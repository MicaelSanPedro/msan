import Link from 'next/link';
import { Clock, User } from 'lucide-react';
import type { Article } from '@/data/articles';
import { getCategoryName } from '@/data/articles';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const dateStr = new Date(article.date + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link href={`/artigo/${article.id}`} className="group block">
      <article className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-3px]">
        {/* Cover */}
        <div className={`h-40 bg-gradient-to-br ${article.coverGradient} flex items-center justify-center relative`}>
          <span className="text-5xl">{article.coverEmoji}</span>
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-accent-muted text-accent rounded-md">
            {getCategoryName(article.category)}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-lg font-bold text-text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed mb-4">
            {article.subtitle}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {article.author.split(' ')[0]}
            </span>
            <span className="text-border-subtle">•</span>
            <span>{dateStr}</span>
            <span className="text-border-subtle">•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readTime} min
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
