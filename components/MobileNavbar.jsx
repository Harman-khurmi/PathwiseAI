"use client";
import React, { useState, forwardRef } from "react";
import { navItems } from "@/app/assets";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "motion/react";
import {
  FileUser,
  GraduationCap,
  LayoutDashboard,
  Newspaper,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNavbar = forwardRef(
  ({ isOpen, navbarHeight, onNavItemClick }, ref) => {
    const [activeItem, setActiveItem] = useState(null);
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    const handleItemClick = (itemName) => {
      setActiveItem(itemName);
      if (onNavItemClick) onNavItemClick();
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
          <SignedOut>
            {isHomePage &&
              navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  variants={itemVariants}
                  onClick={() => handleItemClick(item.name)}
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
          </SignedOut>

          <SignedIn>
            <motion.div variants={itemVariants}>
              <Link
                href="/dashboard"
                onClick={() => handleItemClick("Industry Insights")}
                className="flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-md hover:bg-primary/10 transition-colors"
              >
                <LayoutDashboard className="h-5 w-5" />
                Industry Insights
              </Link>
            </motion.div>
            <div className="border-t border-white/10 my-2 pt-2">
              <div className="text-xs font-semibold text-muted-foreground px-4 mb-2 uppercase tracking-wider">
                Growth Tools
              </div>
              <motion.div variants={itemVariants}>
                <Link
                  href="/resume"
                  onClick={() => handleItemClick("Resume Builder")}
                  className="flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-md hover:bg-primary/10 transition-colors"
                >
                  <FileUser className="h-5 w-5" />
                  Resume Builder
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="/cover-letter"
                  onClick={() => handleItemClick("Cover Letter")}
                  className="flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-md hover:bg-primary/10 transition-colors"
                >
                  <Newspaper className="h-5 w-5" />
                  Cover Letter
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="/interview"
                  onClick={() => handleItemClick("Interview Prep")}
                  className="flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-md hover:bg-primary/10 transition-colors"
                >
                  <GraduationCap className="h-5 w-5" />
                  Interview Prep
                </Link>
              </motion.div>
            </div>
          </SignedIn>
        </div>
      </motion.div>
    );
  },
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
