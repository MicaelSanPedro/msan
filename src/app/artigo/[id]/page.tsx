import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Home, Clock, User, Tag } from 'lucide-react';
import ArticleCard from '@/components/article-card';
import { articles, getArticleBySlug, getCategoryName, getArticlesByCategory } from '@/data/articles';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = getArticleBySlug(id);

  if (!article) {
    notFound();
  }

  const relatedArticles = getArticlesByCategory(article.category)
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const dateStr = new Date(article.date + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-8 flex-wrap">
        <Link href="/" className="hover:text-accent transition-colors flex items-center gap-1">
          <Home className="h-3.5 w-3.5" /> Início
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/${article.category}`} className="hover:text-accent transition-colors">
          {getCategoryName(article.category)}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-text-primary line-clamp-1 max-w-[200px]">{article.title}</span>
      </nav>

      {/* Article */}
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-accent-muted text-accent rounded-md mb-4">
            {getCategoryName(article.category)}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            {article.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {article.author}
            </span>
            <span className="text-border-subtle">•</span>
            <span>{dateStr}</span>
            <span className="text-border-subtle">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime} min de leitura
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-surface border border-border-subtle text-text-secondary rounded-md"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Cover */}
        <div className={`rounded-xl bg-gradient-to-br ${article.coverGradient} h-48 md:h-64 flex items-center justify-center mb-10`}>
          <span className="text-7xl md:text-8xl">{article.coverEmoji}</span>
        </div>

        {/* Body */}
        <div className="prose-refugio">
          {article.content.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-16 max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-text-primary mb-6">
            Artigos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
