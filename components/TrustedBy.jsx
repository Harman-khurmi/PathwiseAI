"use client";
import { assets, whyTrustUs } from "@/app/assets";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const TrustedBy = () => {
  return (
    <>
      <section>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-brand-primary/8 border-brand-primary/10 relative z-1 mt-0 mb-12 flex flex-col items-center justify-center gap-12 border-y-3 px-6 py-8 backdrop-blur-md md:my-20 md:px-12 md:py-12 lg:my-28 lg:px-24 lg:py-16"
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

          {/* title */}
          <div className="flex items-start justify-center gap-2 md:items-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Image
                src={assets.sparkle}
                alt="sparkle"
                width={20}
                height={20}
                className="mt-1 md:mt-0 dark:hidden"
              ></Image>
              <Image
                src={assets.sparkleLight}
                alt="sparkle"
                width={20}
                height={20}
                className="mt-1 hidden md:mt-0 dark:block"
              ></Image>
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-2/3 text-center text-lg font-semibold md:w-full md:text-xl"
            >
              Why professionals trust{" "}
              <span className="gradient-primary bg-clip-text text-transparent">
                PathwiseAI
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
                width={20}
                height={20}
                className="mt-1 md:mt-0 dark:hidden"
              ></Image>
              <Image
                src={assets.sparkleLight}
                alt="sparkle"
                width={20}
                height={20}
                className="mt-1 hidden md:mt-0 dark:block"
              ></Image>
            </motion.span>
          </div>
          {/* count */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.1, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 items-center gap-6 text-center md:grid-cols-3 md:gap-8 lg:grid-cols-5"
          >
            {whyTrustUs.map((item, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  key={index}
                  className="flex flex-col items-center gap-1 md:gap-2"
                >
                  <motion.h3 className="gradient-primary font-inter bg-clip-text text-2xl font-extrabold text-transparent md:text-3xl lg:text-4xl">
                    {item.count}
                  </motion.h3>
                  <motion.p className="w-full text-center font-semibold md:w-4/5">
                    {item.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default TrustedBy;
