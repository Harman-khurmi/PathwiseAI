"use client";
import React, { useState, forwardRef } from "react";
import { navItems } from "@/app/assets";
import { motion } from "motion/react";

const MobileNavbar = forwardRef(
  ({ isOpen, navbarHeight, onHomeClick }, ref) => {
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (e, item) => {
      setActiveItem(item.name);
      if (item.name === "Home" && onHomeClick) {
        onHomeClick(e);
      }
    };

    return (
      <motion.div
        ref={ref}
        variants={wrapperVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        style={{
          top: `${navbarHeight}px`,
          originY: "top",
        }}
        className={`
        lg:hidden overflow-hidden rounded-b-xl
        fixed w-full z-10 
        bg-primary/15 dark:bg-neutral-900/15 backdrop-blur-md 
        border-b border-white/20 dark:border-white/10
        shadow-lg dark:shadow-black/50
      `}
      >
        <div className="flex flex-col p-6 gap-2">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              variants={itemVariants}
              onClick={(e) => handleItemClick(e, item)}
              className={`
              text-lg font-medium text-center transition-all duration-200 py-2 rounded-md
              ${
                activeItem === item.name
                  ? "bg-[#3C71FA]/10 text-[#3C71FA] dark:text-[#3C71FA]"
                  : "text-[#080D1A] dark:text-white hover:text-[#3C71FA] dark:hover:text-[#3C71FA]"
              }
            `}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    );
  }
);

MobileNavbar.displayName = "MobileNavbar";

export default MobileNavbar;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.08,
      ease: "easeOut",
      duration: 0.35,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.06,
      staggerDirection: -1,
      ease: "easeIn",
      duration: 0.25,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25 },
  },
  closed: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2 },
  },
};
