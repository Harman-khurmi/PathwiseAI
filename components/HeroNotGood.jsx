"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { assets } from "@/app/assets";
import { motion, easeInOut } from "motion/react";
import Link from "next/link";
import Image from "next/image";

const HeroNotGood = () => {
  return (
    <section
      className="w-full bg-white dark:bg-[#080D1A] pt-32 pb-6 md:pt-40 md:pb-20"
      id="Home"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* text content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: easeInOut,
              }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-[#080D1A] dark:text-white leading-[1.1] mb-8 tracking-tight"
            >
              Build Your{" "}
              <span className="gradient-primary text-transparent bg-clip-text">
                Future
              </span>{" "}
              With Precision.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: easeInOut,
              }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              PathwiseAI leverages cutting-edge intelligence to sculpt your
              professional identity. From AI resumes to interview mastery, we
              engineer your success in the modern job market.
            </motion.p>

            {/* buttons - now permanent for everyone */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.7,
                ease: easeInOut,
              }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 lg:mt-4"
            >
              <Link href={"/dashboard"}>
                <Button size="responsive">Get Started</Button>
              </Link>
              <Link href={"#Process"}>
                <Button variant="outline" size="responsive">
                  How it works
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: easeInOut,
            }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-[600px] lg:max-w-none relative"
          >
            <div className="relative w-full aspect-square">
              <Image
                src={assets.heroImage}
                alt="AI Career Analysis"
                priority
                className="w-full h-full object-contain dark:hidden"
              />
              <Image
                src={assets.heroImageDark}
                alt="AI Career Analysis"
                priority
                className="w-full h-full object-contain hidden dark:block"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroNotGood;
