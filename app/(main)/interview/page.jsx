"use client";

import { getAssessments } from "@/actions/interview";
import QuizList from "./_components/QuizList";
import PerformanceChart from "./_components/PerformanceChart";
import StatsCards from "./_components/StatsCards";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function InterviewPrepPage() {
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
    <div className="py-8 md:py-12 space-y-12 w-full text-balance">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b pb-8"
      >
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Interview <span className="gradient-title">Preparation</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            Practice with highly personalised, AI-generated mock interviews
            tailored to your professional profile and industry trends.
          </p>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <StatsCards assessments={assessments} />
      </motion.div>

      {/* Chart and History Section */}
      <div className="grid grid-cols-1 gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.995 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PerformanceChart assessments={assessments} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <QuizList assessments={assessments} />
        </motion.div>
      </div>
    </div>
  );
}
