"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { assets } from "@/app/assets";
import { motion, easeInOut } from "motion/react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { FileChartColumn, Icon, LayoutDashboard, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <>
      <section id="Home" className="section-offset pt-8 md:pt-12 lg:pt-20 z-1 ">
        <div className="w-full px-6 md:px-12 lg:px-24 mx-auto pt-16 pb-0 md:py-16 grid grid-cols-1 md:grid-cols-2 relative">
          {/* hero text content */}
          <div className="flex flex-col gap-8 items-center justify-center md:items-start md:justify-start w-full">
            {/* title and heading */}
            <div className="flex flex-col mx-auto text-center md:text-left w-full">
              {/* title */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  ease: easeInOut,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                className="bg-[#3C71FA]/5 py-1.5 md:py-2 px-4 rounded-full font-semibold self-center md:self-start shadow-inner shadow-[#3C71FA]/25 hover:shadow-primary/55 cursor-default transition-shadow duration-400 ease-in w-fit mb-3 md:mb-4"
              >
                <p className="text-xs lg:text-base lg:px-2">
                  Your Personal AI Career Coach
                </p>
              </motion.div>
              {/* heading */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                  ease: easeInOut,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                className="md:min-w-100 lg:w-full relative"
              >
                {/* <div className="flex  items-center justify-center lg:justify-start gap-2 bg-amber-300"> */}
                <span className="pr-1 -ml-6 md:ml-0 whitespace-nowrap">
                  Wise Guidance
                </span>
                <Image
                  src={assets.gradientSparkle}
                  width={60}
                  height={60}
                  alt="sparkle"
                  className="absolute top-1.5 inline-block w-10 md:w-12 lg:w-16"
                />
                <br />
                for{" "}
                <span className="bg-clip-text text-transparent gradient-primary">
                  Every Step
                </span>{" "}
                of Your Career Path
              </motion.h1>
              {/* subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.7,
                  ease: easeInOut,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                className="w-[90%] md:w-[95%] lg:w-[85%]  mx-auto md:ml-0 mt-4 text-[#080D1A] dark:text-white"
              >
                PathwiseAI is your AI career coach — guiding you through
                resumes, interviews, skills, and growth with clarity.
              </motion.p>
            </div>
            {/* buttons */}
            <SignedOut>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8,
                  ease: easeInOut,
                  type: "spring",
                  stiffness: 100,
                  staggerChildren: 0.6,
                }}
                viewport={{ once: true }}
                className="flex gap-4 lg:mt-4 z-10"
              >
                <SignInButton>
                  <Button size="responsive">Get Started</Button>
                </SignInButton>
                <Link href={"#Process"}>
                  <Button variant="outline" size="responsive">
                    How it works
                  </Button>
                </Link>
              </motion.div>
            </SignedOut>
            {/* signed in */}
            <SignedIn>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8,
                  ease: easeInOut,
                  type: "spring",
                  stiffness: 100,
                  staggerChildren: 0.6,
                }}
                viewport={{ once: true }}
                className="flex gap-4 lg:mt-4 z-10"
              >
                <Link href={"/dashboard"}>
                  <Button size="responsive" className={"flex gap-2"}>
                    <LayoutDashboard />
                    Industry Insights
                  </Button>
                </Link>
                <Link href={"/tools"}>
                  <Button variant="outline" size="responsive">
                    <Sparkles />
                    Growth Tools
                  </Button>
                </Link>
              </motion.div>
            </SignedIn>
          </div>
          {/* hero image */}
          {/* md: */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center justify-center"
          >
            <Image
              width={1600}
              height={1600}
              src={assets.heroImage}
              alt="hero"
              className="dark:hidden h-7xl w-7xl absolute -top-30 -right-64 lg:-top-80 lg:-right-80"
              priority
              quality={40}
            />
            <Image
              width={1600}
              height={1600}
              src={assets.heroImageDark}
              alt="hero"
              className="hidden dark:block h-7xl w-7xl absolute -top-40 -right-64 lg:-top-80 lg:-right-80"
              priority
              quality={40}
            />
          </motion.div>
          {/* sm: */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            viewport={{ once: true }}
            className="md:hidden flex items-start justify-center w-full"
          >
            <Image
              width={600}
              height={600}
              src={assets.heroImage}
              alt="hero"
              className="dark:hidden -mt-28 min-w-2xl h-auto"
              priority
              quality={40}
            />
            <Image
              width={600}
              height={600}
              src={assets.heroImageDark}
              alt="hero"
              className="hidden dark:block -mt-28 min-w-2xl h-auto"
              priority
              quality={40}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
