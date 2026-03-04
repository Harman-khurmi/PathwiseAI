"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="py-8 md:py-12 space-y-12">
      <div className="space-y-4 border-b pb-8">
        <Skeleton className="h-12 w-1/3 md:h-16" />
        <Skeleton className="h-6 w-2/3 md:w-1/2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-40 rounded-3xl" />
      </div>
      <div className="space-y-8">
        <Skeleton className="h-[400px] rounded-3xl" />
        <Skeleton className="h-80 rounded-3xl" />
      </div>
    </div>
  );
}
