"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Quiz from "../_components/Quiz";
import { motion } from "motion/react";

const MockInterviewPage = () => {
  return (
    <div className="py-6 md:py-8">
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start rounded-xl border-3 border-primary/10 bg-primary/5 p-6 md:p-8 lg:p-10 gap-8 w-full hover:border-primary/25 transition-all duration-800 ease-in-out shadow-inner shadow-primary/0 hover:shadow-primary/20"
      >
        <div className="w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/interview">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-primary transition-all rounded-xl pl-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-bold border-b border-transparent hover:border-primary px-1">
                  Back to Interviews
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Header Info Inside Card */}
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-stretch border-b border-border/50 pb-8">
            <div className="space-y-2">
              <h1 className="text-3xl leading-tight font-black tracking-tight md:text-5xl">
                Mock{" "}
                <span className="gradient-title text-3xl leading-tight font-black tracking-tight md:text-5xl">
                  Interview
                </span>
              </h1>
              <p className="text-muted-foreground text-sm font-medium md:text-base mt-2 max-w-2xl leading-relaxed">
                Test your domain vertical expertise with hyper-realistic industry
                scenarios generated specifically for you.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.99, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-2"
          >
            <Quiz />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MockInterviewPage;
