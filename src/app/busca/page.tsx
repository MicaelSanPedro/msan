import Link from 'next/link';
import { Suspense } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import SearchContent from './search-content';

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-zinc-300 transition-colors">
          Início
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-300">Busca</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
          {q ? (
            <>
              Resultados para{' '}
              <span className="gradient-text">{q}</span>
            </>
          ) : (
            'Buscar Apps'
          )}
        </h1>
        {q && (
          <p className="text-sm text-zinc-500">
            Digite um termo para buscar entre todos os apps disponíveis
          </p>
        )}
      </div>

      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <Search className="w-4 h-4 animate-pulse" />
            Buscando...
          </div>
        }
      >
        <SearchContent initialQuery={q} />
      </Suspense>
    </div>
  );
}
