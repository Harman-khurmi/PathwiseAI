"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="py-8 md:py-12 space-y-12 animate-pulse px-6 md:px-12 lg:px-24">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-8 mb-8">
        <div className="space-y-3">
          <Skeleton className="h-12 w-64 md:h-16 rounded-xl" />
          <Skeleton className="h-6 w-80 md:w-96 rounded-lg" />
        </div>
        <Skeleton className="h-12 w-32 rounded-xl" />
      </div>

      {/* Grid Skeleton for Cover Letters */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-[32px] border-2 border-muted/30 p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-3">
                <Skeleton className="h-8 w-64 md:h-10 rounded-lg" />
                <Skeleton className="h-4 w-40 rounded-md" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-2/3 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
