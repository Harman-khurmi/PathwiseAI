"use client";

import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import DashboardView from "./_components/DashboardView";
import { getIndustryInsights } from "@/actions/dashboard";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";

const IndustryInsightPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { isOnboarded } = await getUserOnboardingStatus();
        if (!isOnboarded) {
          redirect("/onboarding");
          return;
        }
        const insights = await getIndustryInsights();
        setData(insights);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-8 md:py-12 space-y-12">
        <div className="flex items-center justify-between border-b pb-8">
          <div className="space-y-3">
            <Skeleton className="h-14 w-64 md:h-16" />
            <Skeleton className="h-5 w-[140%] max-w-md" />
          </div>
          <Skeleton className="h-10 w-40 rounded-full hidden md:block" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Skeleton className="h-44 rounded-3xl" />
          <Skeleton className="h-44 rounded-3xl" />
          <Skeleton className="h-44 rounded-3xl" />
          <Skeleton className="h-44 rounded-3xl" />
        </div>
        <Skeleton className="h-[500px] rounded-[32px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Skeleton className="h-96 rounded-[32px]" />
          <Skeleton className="h-96 rounded-[32px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.995 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <DashboardView insights={data} />
      </motion.div>
    </div>
  );
};

export default IndustryInsightPage;
