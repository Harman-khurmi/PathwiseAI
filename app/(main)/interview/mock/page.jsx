"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Quiz from "../_components/Quiz";
import { motion } from "motion/react";
import MainDashboardCard from "../../dashboard/_components/MainDashboardCard";

const MockInterviewPage = () => {
  return (
    <div className="py-6 md:py-8">
      <motion.div
        initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-fit pb-6"
      >
        <Link href="/interview">
          <Button
            variant="outline"
            // className="hover:bg-brand-primary/10 hover:border-brand-primary/30 hover:text-brand-primary w-full gap-2 px-5 py-2 font-bold shadow-sm transition-all md:h-11 md:w-auto"
            className={``}
          >
            <ArrowLeft className="md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Back to Interviews</span>
          </Button>
        </Link>
      </motion.div>
      <MainDashboardCard>
        <div className="w-full space-y-6 md:space-y-8">
          {/* Header Info Inside Card */}

          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="space-y-2">
              <h1 className="text-3xl leading-tight font-black tracking-tight md:text-5xl">
                Mock{" "}
                <span className="gradient-title text-3xl leading-tight font-black tracking-tight md:text-5xl">
                  Interview
                </span>
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed font-medium md:text-base">
                Test your domain vertical expertise with hyper-realistic
                industry scenarios generated specifically for you.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.99, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-4 md:mt-8"
          >
            <Quiz />
          </motion.div>
        </div>
      </MainDashboardCard>
    </div>
  );
};

export default MockInterviewPage;
