"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X, Hammer } from "lucide-react";

const UNDER_CONSTRUCTION_ROUTES = ["/resume", "/cover-letter"];

const InDevelopment = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const isUnderConstructionRoute = UNDER_CONSTRUCTION_ROUTES.some((route) =>
    pathname?.startsWith(route),
  );

  useEffect(() => {
    // Only attempt to show the toast if we are on a marked route
    if (!isUnderConstructionRoute) return;

    // We queue the state update behind the render pipeline via JS Event Loop
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, isUnderConstructionRoute]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && isUnderConstructionRoute && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-background/95 fixed right-4 bottom-4 left-4 z-50 flex flex-col rounded-2xl border-2 border-yellow-500/20 p-4 shadow-2xl shadow-yellow-500/10 backdrop-blur-lg sm:left-auto sm:w-[400px] sm:p-5 md:right-8 md:bottom-8 md:w-lg md:border-3"
        >
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-500/10">
              <Hammer className="h-5 w-5 text-yellow-500" />
            </div>

            <div className="flex flex-1 flex-col gap-1 pr-1 md:pr-1.5">
              <h4 className="text-foreground text-sm font-black tracking-tight sm:text-base">
                UI Under Construction
              </h4>
              <p className="text-muted-foreground/90 text-xs leading-relaxed font-semibold sm:text-sm">
                We are actively improving the design and experience of this
                page! Functionality remains fully operational.
              </p>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:bg-muted hover:text-foreground -mt-1 -mr-1 flex shrink-0 items-center justify-center rounded-full p-1.5 transition-colors"
            >
              <X className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InDevelopment;
