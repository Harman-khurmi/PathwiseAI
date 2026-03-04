"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col space-y-4 mb-8">
        <Skeleton className="h-6 w-32 rounded-lg" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-muted/20">
          <div className="space-y-4">
            <Skeleton className="h-12 w-64 md:h-16" />
            <Skeleton className="h-6 w-96 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-muted/5 dark:bg-white/5 backdrop-blur-xl border-2 border-muted/30 p-4 rounded-3xl animate-in fade-in duration-500">
          <div className="flex items-center gap-2 bg-background p-2 rounded-2xl border-2">
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-28 rounded-xl" />
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
        </div>

        <div className="rounded-[32px] border-2 border-muted/30 p-8 md:p-12 space-y-6 bg-muted/5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
              <Skeleton className="h-4 w-11/12 rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
