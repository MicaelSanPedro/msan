import { Search } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { getAllPosts } from "@/lib/posts";

export default function SearchPage() {
  const allPosts = getAllPosts();

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs text-emerald-400 font-medium">Pesquisa</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Encontre seu próximo artigo
          </h1>
          <p className="text-white/40">
            Busque por título, categoria, tag ou assunto
          </p>
        </div>

        {/* Search */}
        <SearchBar allPosts={allPosts} />
      </div>
    </div>
  );
}
