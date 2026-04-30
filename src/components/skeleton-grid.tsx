export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`bg-white/[0.06] rounded-2xl p-4 md:p-5 ${
            i === 0 ? 'md:col-span-2' : ''
          }`}
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/[0.08] rounded-[20%]" />
            <div className="flex-1">
              <div className="h-4 bg-white/[0.08] rounded-md w-3/4 mb-2" />
              <div className="h-3 bg-white/[0.06] rounded-md w-1/3" />
            </div>
          </div>
          <div className="space-y-2 mb-3">
            <div className="h-3 bg-white/[0.06] rounded-md w-full" />
            <div className="h-3 bg-white/[0.06] rounded-md w-4/5" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div className="h-3 bg-white/[0.06] rounded-md w-10" />
              <div className="h-3 bg-white/[0.06] rounded-md w-10" />
              <div className="h-3 bg-white/[0.06] rounded-md w-10" />
            </div>
            <div className="h-8 w-20 bg-white/[0.06] rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
