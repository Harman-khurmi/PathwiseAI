"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-6 w-32 rounded-lg" />
          <Skeleton className="h-12 w-64 md:h-16 rounded-xl" />
          <Skeleton className="h-6 w-80 md:w-96 rounded-lg" />
        </div>
      </div>

      <div className="rounded-[32px] border-2 border-muted/30 bg-muted/5 p-8 md:p-12 shadow-xl shadow-primary/5 animate-in fade-in duration-500">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
          <div className="flex justify-end pt-2">
            <Skeleton className="h-12 w-48 rounded-xl shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
