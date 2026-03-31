"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="py-6 md:py-8">
      <Skeleton className="flex flex-col items-start rounded-xl border-3 border-[#55C7F1]/10 bg-[#55C7F1]/5 p-6 md:p-8 lg:p-10 gap-8 w-full animate-pulse">
        <div className="w-full space-y-8">
          <div className="flex flex-col items-start md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-3">
              <Skeleton className="h-12 w-64 md:h-16 md:w-96" />
              <Skeleton className="h-4 w-72 md:w-[500px]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
          <div className="w-full space-y-8">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
        </div>
      </Skeleton>
    </div>
  );
}
