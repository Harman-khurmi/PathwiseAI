"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="py-8 md:py-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-8">
        <div className="space-y-4 w-full">
          <Skeleton className="h-12 w-64 md:h-16 bg-accent/50" />
          <Skeleton className="h-6 w-full max-w-lg bg-accent/30" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Skeleton className="flex-1 md:flex-none h-12 w-32 rounded-xl bg-accent/50" />
          <Skeleton className="flex-1 md:flex-none h-12 w-40 rounded-xl bg-accent/50" />
        </div>
      </div>

      <Skeleton className="flex flex-col rounded-[32px] border-3 border-accent bg-accent/35 p-6 md:p-8 animate-pulse w-full">
        <div className="space-y-8">
          <div className="flex gap-4">
             <Skeleton className="h-12 w-[180px] rounded-xl bg-accent/50" />
             <Skeleton className="h-12 w-[180px] rounded-xl bg-accent/50" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-background/50 border-2">
            <Skeleton className="h-14 rounded-xl" />
            <Skeleton className="h-14 rounded-xl" />
            <Skeleton className="h-14 rounded-xl" />
            <Skeleton className="h-14 rounded-xl" />
          </div>
          <Skeleton className="h-40 rounded-3xl" />
          <Skeleton className="h-96 rounded-[32px]" />
        </div>
      </Skeleton>
    </div>
  );
}
