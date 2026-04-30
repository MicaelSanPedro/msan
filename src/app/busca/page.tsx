import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { Suspense } from "react";
import { SearchContent } from "@/components/search-content";

interface BuscaPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function BuscaPage({ searchParams }: BuscaPageProps) {
  const params = await searchParams;
  const query = params.q || "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-zinc-300 transition-colors">
          Inicio
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-300">Buscar</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          {query ? (
            <>
              Resultados para{" "}
              <span className="gradient-text-subtle">&quot;{query}&quot;</span>
            </>
          ) : (
            "Buscar Apps"
          )}
        </h1>
        <p className="text-zinc-400">
          Encontre o app ideal para voce
        </p>
      </div>

      <Suspense fallback={<div className="text-zinc-500">Carregando...</div>}>
        <SearchContent initialQuery={query} />
      </Suspense>
    </div>
  );
}
