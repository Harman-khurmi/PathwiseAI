"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Quiz from "../_components/Quiz";
import { motion } from "motion/react";

const MockInterviewPage = () => {
  return (
    <div className="py-8 md:py-12 space-y-10 w-full">
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

      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-3 border-b pb-8"
      >
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Mock <span className="gradient-title">Interview</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
          Test your domain vertical expertise with hyper-realistic industry
          scenarios generated specifically for you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.99, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pt-6"
      >
        <Quiz />
      </motion.div>
    </div>
  );
};

export default MockInterviewPage;
