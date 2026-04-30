'use client';

import { Star, StarHalf } from 'lucide-react';

export function StarRating({ id }: { id: number }) {
  const rating = id % 2 === 0 ? 4.5 : 5;
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="w-3 h-3 fill-amber-400 text-amber-400" />
      ))}
      {hasHalf && <StarHalf className="w-3 h-3 fill-amber-400 text-amber-400" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-3 h-3 text-zinc-700" />
      ))}
    </div>
  );
}
