"use client";

import { useSession } from "next-auth/react";
import { useFavorites } from "@/components/FavoritesProvider";
import { PostCard } from "@/components/PostCard";
import { Heart, ArrowLeft, LogIn } from "lucide-react";
import Link from "next/link";
import { openSignInModal } from "@/components/SignInModal";
import type { PostSummary } from "@/lib/posts";

interface FavoritesPageClientProps {
  allPosts: PostSummary[];
}

export default function FavoritesPageClient({ allPosts }: FavoritesPageClientProps) {
  const { favorites, loading, isLoggedIn } = useFavorites();
  const { data: session } = useSession();

  // Not logged in — show login prompt
  if (!session?.user) {
    return (
      <div className="pt-24 sm:pt-28 pb-20 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(249,189,24,0.15)]">
            <LogIn className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Faça login para ver seus favoritos</h1>
          <p className="text-white/45 text-sm mb-8">
            Entre com sua conta GitHub para salvar artigos e acessar seus favoritos de qualquer dispositivo
          </p>
          <button
            onClick={() => openSignInModal()}
            className="btn-primary"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Entrar com GitHub
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-28 pb-20 px-4 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-white/40 text-sm animate-pulse">Carregando favoritos...</div>
      </div>
    );
  }

  const favPosts = allPosts.filter((p) => favorites.includes(p.slug));

  return (
    <div className="pt-24 sm:pt-28 pb-20 px-4 max-w-7xl mx-auto">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-amber-300 transition-colors mb-6 sm:mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Voltar ao Blog
      </Link>

      <div className="mb-8 sm:mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500/20 to-rose-600/10 flex items-center justify-center">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Meus Favoritos
          </h1>
        </div>
        <p className="text-white/45 text-sm">
          {favPosts.length} artigo{favPosts.length !== 1 ? "s" : ""} salvo{favPosts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {favPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {favPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Heart className="w-12 h-12 text-white/10 mb-4" />
          <p className="text-white/40 text-lg mb-2">Nenhum favorito ainda</p>
          <p className="text-white/25 text-sm mb-6">Toque no coracao em qualquer artigo para salvar</p>
          <Link href="/blog" className="btn-primary">
            Explorar artigos
          </Link>
        </div>
      )}
    </div>
  );
}
