"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-10 pb-0">
      {/* Greetings Header Skeleton */}
      <div className="space-y-4">
        <div className="flex gap-3 items-center">
          <Skeleton className="h-8 w-8 md:h-12 md:w-12 rounded-full" />
          <Skeleton className="h-10 w-64 md:h-14 md:w-96" />
        </div>
        <Skeleton className="h-4 w-full max-w-[400px] md:h-5" />
      </div>

      {/* Main Container Card Skeleton */}
      <Skeleton className={`flex flex-col items-start rounded-xl border-3 border-accent bg-accent/35 p-6 md:p-8 lg:p-10 gap-8 w-full hover:border-accent animate-pulse`}>
        <div className="w-full space-y-8">
          {/* Header Info Inside Card */}
          <div className="flex flex-col items-start md:flex-row md:items-center justify-between gap-4">
            <Skeleton className="h-12 w-48 md:h-16 md:w-64" />
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-10 w-40 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* Summary Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>

          {/* Salary Chart Skeleton */}
          <Skeleton className="h-[400px] w-full rounded-xl" />

          {/* Trends & Skills skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <Skeleton className="h-80 rounded-xl" />
            <Skeleton className="h-80 rounded-xl" />
          </div>
        </div>
      </Skeleton>
    </div>
  );
}
