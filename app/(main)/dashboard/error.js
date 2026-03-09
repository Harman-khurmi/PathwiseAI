"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="relative group">
          {/* Animated Background Glow */}
          {/* <div className="absolute -inset-1 bg-linear-to-r from-[#55C7F1] to-[#3C71FA] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" /> */}

          <div className="relative flex flex-col items-center bg-primary/5 hover:bg-primary/7 border-3 border-primary/20 hover:border-primary/30 rounded-xl p-8 md:p-12 space-y-8 text-center transition-all duration-400 ease-in">
            {/* Error Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full scale-150 animate-pulse" />
              <div className="relative bg-red-500/10 p-5 rounded-full border-2 border-red-500/20">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-3">
              <h1 className="text-3xl font-black tracking-tight leading-tight">
                <span className="gradient-title">Oops! {" "}</span>
                <span className="">Something <br/> Went Wrong</span>
              </h1>
              <p className="text-muted-foreground font-medium text-sm md:text-base px-2">
                We encountered an error while loading your industry insights.
                This might be a temporary connection issue.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row w-full md:items-center md:justify-center gap-4">
              <Button
                onClick={() => reset()}
                size="responsive"
                className={``}
              >
                <RefreshCcw className="h-4 w-4" />
                Try Again
              </Button>
              <Link href="/" className="">
                <Button
                  variant="outline"
                  size="responsive"
                  className={`w-full md:w-auto`}
                >
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </Link>
            </div>

            <p className="text-[10px] text-muted-foreground/50 font-semibold uppercase tracking-widest pt-4">
              Error logged and being reviewed by our team
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
