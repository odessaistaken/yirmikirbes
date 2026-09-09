"use client";

interface ProductSkeletonGridProps {
  count?: number;
}

export default function ProductSkeletonGrid({ count = 10 }: ProductSkeletonGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4.5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col h-full animate-pulse"
        >
          {/* Image skeleton */}
          <div className="aspect-square bg-slate-100 relative" />

          {/* Content skeleton */}
          <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between gap-3">
            <div className="space-y-2">
              <div className="h-2.5 w-16 bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-3/4 bg-slate-200 rounded" />
              <div className="h-2.5 w-20 bg-slate-100 rounded font-mono" />
            </div>

            {/* CTA Button skeleton */}
            <div className="pt-2 border-t border-slate-100">
              <div className="h-8 w-full bg-slate-200 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
