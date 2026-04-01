"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Interview Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] mt-3 md:mt-6 lg:mt-10 items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        className="w-full max-w-md"
      >
        <div className="group relative">
          {/* Animated Background Glow */}
          {/* <div className="absolute -inset-1 bg-linear-to-r from-brand-primary to-[#3C71FA] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" /> */}

          <div className="bg-primary/5 hover:bg-primary/7 border-primary/20 hover:border-primary/30 relative flex flex-col items-center space-y-8 rounded-xl border-3 p-8 text-center transition-all duration-400 ease-in md:p-12">
            {/* Error Icon */}
            <div className="relative">
              <div className="absolute inset-0 scale-150 animate-pulse rounded-full bg-red-500/20 blur-xl" />
              <div className="relative rounded-full border-2 border-red-500/20 bg-red-500/10 p-5">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-3">
              <h1 className="text-3xl leading-tight font-black tracking-tight">
                <span className="gradient-title">Oops! </span>
                <span className="">
                  Something <br /> Went Wrong
                </span>
              </h1>
              <p className="text-muted-foreground px-2 text-sm font-medium md:text-base">
                We encountered an error while loading your interview data.
                This might be a temporary connection issue.
              </p>
            </div>

            {/* Actions */}
            <div className="flex w-full flex-col gap-4 sm:flex-row md:items-center md:justify-center">
              <Button onClick={() => reset()} size="responsive" className={``}>
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

            <p className="text-muted-foreground/50 pt-4 text-[10px] font-semibold tracking-widest uppercase">
              Error logged. Please refresh or contact support
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
