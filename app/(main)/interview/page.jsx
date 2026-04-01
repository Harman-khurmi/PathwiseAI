"use client";

import { getAssessments } from "@/actions/interview";
import QuizList from "./_components/QuizList";
import PerformanceChart from "./_components/PerformanceChart";
import StatsCards from "./_components/StatsCards";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function InterviewPrepPage() {
  //to test error page for interview page
  // throw new Error("Testing interview error page"); 
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAssessments();
        setAssessments(data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-6 md:py-8">
        <Skeleton className="flex flex-col items-start rounded-xl border-3 border-brand-primary/10 bg-brand-primary/5 p-6 md:p-8 lg:p-10 gap-8 w-full animate-pulse">
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

  return (
    <div className="py-6 md:py-8">
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start rounded-xl border-3 border-brand-primary/10 bg-brand-primary/5 p-6 md:p-8 lg:p-10 gap-8 w-full hover:border-brand-primary/25 transition-all duration-700 ease-in-out shadow-inner shadow-primary/0 hover:shadow-primary/20"
      >
        <div className="w-full space-y-8">
          {/* Header Section */}
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-stretch">
            <div className="space-y-2">
              <h1 className="text-3xl leading-tight font-black tracking-tight md:text-5xl">
                Interview{" "}
                <span className="gradient-title text-3xl leading-tight font-black tracking-tight md:text-5xl">
                  Preparation
                </span>
              </h1>
              <p className="text-muted-foreground text-sm font-medium md:text-base mt-2">
                Practice with highly personalised, AI-generated mock interviews
                tailored to your professional profile and industry trends.
              </p>
            </div>
          </div>

          <StatsCards assessments={assessments} />

          <div className="flex flex-col w-full space-y-8">
            <PerformanceChart assessments={assessments} />
            <QuizList assessments={assessments} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
