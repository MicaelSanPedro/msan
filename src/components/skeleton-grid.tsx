export default function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card rounded-xl overflow-hidden">
          <div className="h-40 bg-white/[0.03] animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-4 w-20 bg-white/[0.03] rounded animate-pulse" />
            <div className="h-5 w-full bg-white/[0.03] rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-white/[0.03] rounded animate-pulse" />
            <div className="h-3 w-full bg-white/[0.03] rounded animate-pulse" />
            <div className="h-3 w-2/3 bg-white/[0.03] rounded animate-pulse" />
            <div className="flex gap-3 pt-2">
              <div className="h-3 w-16 bg-white/[0.03] rounded animate-pulse" />
              <div className="h-3 w-20 bg-white/[0.03] rounded animate-pulse" />
              <div className="h-3 w-14 bg-white/[0.03] rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
