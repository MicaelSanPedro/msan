import { getAllPosts } from "@/lib/posts";
import FavoritesPageClient from "./FavoritesPageClient";

export default async function FavoritosPage() {
  const allPosts = getAllPosts();
  return <FavoritesPageClient allPosts={allPosts} />;
}
