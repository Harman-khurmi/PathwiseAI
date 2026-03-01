"use client";

import React from "react";
import { motion } from "motion/react";

const MainLayout = ({ children }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pt-24 px-6 md:px-12 lg:px-24 min-h-screen"
    >
      {children}
    </motion.main>
  );
};

export default MainLayout;
