import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { categories } from '@/data/articles';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border-subtle bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <BookOpen className="h-5 w-5 text-accent" />
              <span className="font-serif text-lg font-bold text-text-primary">
                O Refúgio
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Seu cantinho nerd na internet. Artigos, análises e links
              curados sobre games, filmes, tecnologia e muito mais.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Categorias</h4>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${cat.id}`}
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Páginas</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-text-secondary hover:text-accent transition-colors">Início</Link>
              <Link href="/links" className="text-sm text-text-secondary hover:text-accent transition-colors">Links Úteis</Link>
              <Link href="/busca" className="text-sm text-text-secondary hover:text-accent transition-colors">Buscar</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-subtle text-center">
          <p className="text-sm text-text-muted">
            Feito com ☕ por nerds, para nerds — {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
