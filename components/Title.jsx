"use client";
import { assets } from "@/app/assets";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Title = ({ title, gradientText }) => {
  return (
    <>
      <div className="flex items-start md:items-center justify-center gap-2">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Image
            src={assets.sparkle}
            alt="sparkle"
            width={30}
            height={30}
            className="mt-2 md:mt-0 block dark:hidden"
          ></Image>
          <Image
            src={assets.sparkleLight}
            alt="sparkle"
            width={30}
            height={30}
            className="mt-2 md:mt-0 dark:block hidden"
          ></Image>
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-semibold text-2xl md:text-3xl lg:text-4xl text-center w-full"
        >
          {title}{" "}
          <span className="gradient-primary text-transparent bg-clip-text">
            {gradientText}
          </span>
        </motion.h3>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Image
            src={assets.sparkle}
            alt="sparkle"
            width={30}
            height={30}
            className="mt-2 md:mt-0 block dark:hidden"
          ></Image>
          <Image
            src={assets.sparkleLight}
            alt="sparkle"
            width={30}
            height={30}
            className="mt-2 md:mt-0 dark:block hidden"
          ></Image>
        </motion.span>
      </div>
    </>
  );
};

export default Title;
