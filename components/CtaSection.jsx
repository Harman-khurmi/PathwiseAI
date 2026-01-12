"use client";
import Image from "next/image";
import React from "react";
import Title from "./Title";
import { assets } from "@/app/assets";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="z-1 px-6 md:px-12 lg:px-24 mt-0 mb-12 md:my-20 lg:my-28 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center bg-[#55C7F1]/8 border-y-3 border-[#55C7F1]/10 backdrop-blur-md gap-8 relative"
      >
        {/* gradient circle */}
        <motion.span
          className="absolute top-0 -z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Image
            src={assets.gradientCircle}
            draggable={false}
            alt="gradientCircle"
            width={800}
            height={800}
            className=""
          />
        </motion.span>
        <div className="flex flex-col items-center justify-center gap-4">
          <Title
            title="Your career needs direction. Let's "
            gradientText="guide it"
          />
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-text-dark/80 dark:text-text-light/80 text-center w-2/3"
          >
            Join thousands of professionals who are moving forward with clarity,
            confidence, and direction.
          </motion.h3>
        </div>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          href="#Home"
        >
          <Button size="responsive">Start your journey</Button>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default CtaSection;
