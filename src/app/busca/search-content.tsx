'use client';

import { useState } from 'react';
import { downloads } from '@/data/downloads';
import { BentoGrid } from '@/components/bento-grid';
import { SearchBar } from '@/components/search-bar';
import { Package } from 'lucide-react';
import { useMemo } from 'react';

export default function SearchContent({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return downloads.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <SearchBar value={query} onChange={setQuery} placeholder="Buscar apps..." />

      {query.trim() && (
        <p className="text-sm text-zinc-500">
          {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado
          {results.length !== 1 ? 's' : ''}
        </p>
      )}

      {query.trim() && results.length > 0 ? (
        <BentoGrid items={results} />
      ) : query.trim() ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package className="w-12 h-12 text-zinc-700 mb-4" />
          <p className="text-zinc-400 text-base">Nenhum app encontrado</p>
          <p className="text-zinc-600 text-sm mt-1">
            Tente buscar por outro termo
          </p>
        </div>
      ) : null}
    </div>
  );
}
