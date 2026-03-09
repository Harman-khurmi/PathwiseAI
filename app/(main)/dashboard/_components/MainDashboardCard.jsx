"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MainDashboardCard = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-start rounded-xl border-3 border-[#55C7F1]/10 bg-[#55C7F1]/5 p-6 md:p-8 lg:p-10 gap-8 w-full hover:border-[#55C7F1]/25 transition-all duration-800 ease-in-out shadow-inner shadow-primary/25 hover:shadow-primary/55",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export default MainDashboardCard;
