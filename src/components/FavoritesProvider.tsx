"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { useSession } from "next-auth/react";

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (slug: string) => boolean;
  toggle: (slug: string) => Promise<void>;
  loading: boolean;
  isLoggedIn: boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  isFavorite: () => false,
  toggle: async () => {},
  loading: true,
  isLoggedIn: false,
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session, status } = useSession();

  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/favorites");
      if (res.ok) {
        const data = await res.json();
        setFavorites(data.favorites || []);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Only fetch favorites when session is confirmed (not loading, not unauthenticated)
  useEffect(() => {
    if (status === "loading") return; // still checking session
    if (status === "authenticated") {
      fetchFavorites();
    } else {
      setIsLoggedIn(false);
      setFavorites([]);
      setLoading(false);
    }
  }, [status, fetchFavorites]);

  const toggle = useCallback(async (slug: string) => {
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (res.ok) {
        const { isFavorite: fav } = await res.json();
        setFavorites((prev) =>
          fav ? [...prev, slug] : prev.filter((s) => s !== slug)
        );
      }
    } catch {
      // Silently fail — the user can retry
    }
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite: (slug) => favorites.includes(slug),
        toggle,
        loading: status === "loading" || loading,
        isLoggedIn,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
