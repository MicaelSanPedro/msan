import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
}

export function StarRating({ rating, size = 14 }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className="text-yellow-400 fill-yellow-400"
          size={size}
        />
      ))}
      {hasHalf && (
        <StarHalf
          className="text-yellow-400 fill-yellow-400"
          size={size}
        />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="text-zinc-700"
          size={size}
        />
      ))}
    </div>
  );
}
