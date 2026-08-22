"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/components/FavoritesProvider";
import { openSignInModal } from "@/components/SignInModal";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";

interface FavoriteButtonProps {
  slug: string;
  className?: string;
  size?: "sm" | "md";
}

export function FavoriteButton({ slug, className = "", size = "sm" }: FavoriteButtonProps) {
  const { isFavorite, toggle, loading } = useFavorites();
  const { status } = useSession();
  const [animating, setAnimating] = useState(false);
  // Optimistic state: overrides the real fav state until API responds
  const optimisticFav = useRef<boolean | null>(null);

  const realFav = isFavorite(slug);
  const fav = optimisticFav.current !== null ? optimisticFav.current : realFav;
  const isLoggedIn = status === "authenticated";

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn || loading) {
      if (!isLoggedIn) openSignInModal();
      return;
    }
    // Flip immediately (optimistic)
    const nextState = !fav;
    optimisticFav.current = nextState;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 200);

    // Fire API call and sync back when done
    await toggle(slug);
    optimisticFav.current = null; // let real state take over
  };

  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";

  return (
    <button
      onClick={handleToggle}
      className={`liquid-glass-pill flex items-center justify-center transition-all duration-150 ${
        size === "sm"
          ? "w-7 h-7 sm:w-8 sm:h-8"
          : "w-9 h-9"
      } hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={fav ? {
        background: "linear-gradient(to bottom, rgba(244,63,94,0.25), rgba(225,29,72,0.1))",
        borderColor: "rgba(251,113,133,0.3)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 12px -4px rgba(244,63,94,0.3)",
      } : undefined}
      title={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Heart
        className={`${iconSize} transition-all duration-100 ${
          fav
            ? "text-rose-400 fill-rose-400"
            : "text-white/60 group-hover:text-white/80"
        } ${animating ? "scale-125" : ""}`}
      />
    </button>
  );
}
