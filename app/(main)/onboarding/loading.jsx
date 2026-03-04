"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-10 px-4 min-h-[80vh]">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-16 w-3/4 md:h-20" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-24 rounded-2xl" />
          <Skeleton className="h-24 rounded-2xl" />
        </div>
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-16 rounded-2xl w-full" />
      </div>
    </div>
  );
}
