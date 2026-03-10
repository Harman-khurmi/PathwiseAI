"use client";

import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HardRedirect = ({ to }) => {
  useEffect(() => {
    // Force a full browser navigation to break out of React hydration mismatch
    window.location.href = to;
  }, [to]);

  return (
    <div className="flex items-center justify-center py-10 px-4 min-h-[80vh]">
      <Skeleton className="w-full max-w-2xl rounded-3xl border-2 border-accent bg-accent/35 p-8 md:p-12 animate-pulse space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4 md:h-16" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-14 rounded-2xl" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-14 rounded-2xl" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-14 rounded-2xl" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-14 rounded-2xl" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-[140px] rounded-3xl" />
        </div>
        <Skeleton className="h-16 rounded-2xl w-full mt-4" />
      </Skeleton>
    </div>
  );
};

export default HardRedirect;
