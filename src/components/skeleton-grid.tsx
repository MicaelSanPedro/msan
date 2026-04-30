export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"
        >
          {/* Top row: icon + text */}
          <div className="flex items-start gap-4 mb-4">
            {/* Icon skeleton */}
            <div className="shrink-0 w-14 h-14 rounded-[20%] animate-shimmer" />
            {/* Text skeletons */}
            <div className="flex-1 space-y-2.5">
              <div className="h-5 w-3/4 rounded-lg animate-shimmer" />
              <div className="h-4 w-full rounded-lg animate-shimmer" />
            </div>
          </div>
          {/* Rating skeleton */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="w-3.5 h-3.5 rounded animate-shimmer" />
            ))}
          </div>
          {/* Badges + metadata */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-12 rounded-full animate-shimmer" />
              <div className="h-5 w-14 rounded-full animate-shimmer" />
            </div>
            <div className="h-3 w-20 rounded animate-shimmer" />
          </div>
          {/* Button skeleton */}
          <div className="h-10 w-full rounded-lg animate-shimmer" />
        </div>
      ))}
    </div>
  );
}
