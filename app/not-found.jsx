"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isMounted) {
    // Return a simple placeholder or nothing during SSR to prevent hydration mismatch.
    // This is the most effective way to handle components that rely heavily on
    // client-side environment triggers like animations or viewport measurements.
    return null;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background text-foreground px-6 overflow-hidden">
      {/* Background Glow - Using project's theme colors */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
          absolute top-1/2 left-1/2 
          w-[300px] h-[300px]
          sm:w-[450px] sm:h-[450px]
          md:w-[600px] md:h-[600px]
          -translate-x-1/2 -translate-y-1/2 
          rounded-full 
          bg-primary opacity-20 dark:opacity-10 
          blur-[100px]
        "
        />
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl mx-auto text-center"
      >
        {/* Error Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, filter: "blur(4px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="inline-block px-5 py-2 mb-8 text-sm font-bold tracking-widest uppercase rounded-full border border-primary/30 bg-primary/10 text-primary"
        >
          404 - Page Missing
        </motion.div>

        {/* Heading - Consistent with landing page gradient style */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-2 leading-tight">
          Lost Your{" "}
          <span className="bg-linear-to-b from-primary to-primary-dark bg-clip-text text-transparent">
            Path?
          </span>
        </h1>

        {/* Description - Using muted foreground for better readability */}
        <p className="mx-auto max-w-2xl md:text-lg mb-12 text-muted-foreground leading-relaxed">
          The page you&apos;re looking for has wandered off into the wilderness.
          Let&apos;s get you back to the right track for your career journey.
        </p>

        {/* Action Buttons - Consistent with project UI */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button
            asChild
            size="responsive"
            className="w-auto px-10 shadow-lg shadow-primary/20"
          >
            <Link href="/">Back to Home</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="responsive"
            className="w-auto px-10"
          >
            <Link href="/#feature">See Our Tools</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
