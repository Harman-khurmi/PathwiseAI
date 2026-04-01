"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MainDashboardCard = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-start rounded-xl border-3 border-brand-primary/10 bg-brand-primary/5 p-6 md:p-8 lg:p-10 gap-8 w-full hover:border-brand-primary/25 transition-all duration-800 ease-in-out shadow-inner shadow-primary/20 hover:shadow-primary/30",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export default MainDashboardCard;
