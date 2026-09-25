import React from 'react';

export default function EventCardSkeleton() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="h-48 w-full bg-neutral-800/80 relative">
        <div className="absolute top-3 left-3 h-5 w-20 bg-neutral-700/60 rounded-full"></div>
        <div className="absolute top-3 right-3 h-5 w-12 bg-neutral-700/60 rounded-lg"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="h-5 w-4/5 bg-neutral-800 rounded-md"></div>
          <div className="space-y-1.5 pt-1">
            <div className="h-3.5 w-full bg-neutral-800/60 rounded"></div>
            <div className="h-3.5 w-2/3 bg-neutral-800/60 rounded"></div>
          </div>
        </div>

        {/* Metadata Skeleton */}
        <div className="space-y-2 pt-2 border-t border-neutral-800/80">
          <div className="h-3.5 w-1/2 bg-neutral-800/60 rounded"></div>
          <div className="h-3.5 w-3/5 bg-neutral-800/60 rounded"></div>
          <div className="h-3.5 w-1/3 bg-neutral-800/50 rounded pt-1"></div>
        </div>

        {/* Action Button Skeleton */}
        <div className="h-10 w-full bg-neutral-800/90 rounded-xl"></div>
      </div>
    </div>
  );
}
