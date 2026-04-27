import { Suspense } from "react";
import { SearchPageContent } from "./search-content";

export const metadata = {
  title: "Buscar Downloads | MSAN",
  description: "Busque jogos, softwares e ferramentas no MSAN Downloads.",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-3 animate-pulse">⏳</div>
            <p className="text-white/40 text-sm">Carregando...</p>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
