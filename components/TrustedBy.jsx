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
          className="z-1 px-6 md:px-12 lg:px-24 mt-0 mb-12 md:my-20 lg:my-28 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center bg-[#55C7F1]/8 border-y-3 border-[#55C7F1]/10 backdrop-blur-md gap-12 relative"
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
                width={20}
                height={20}
                className="mt-1 md:mt-0 dark:hidden"
              ></Image>
              <Image
                src={assets.sparkleLight}
                alt="sparkle"
                width={20}
                height={20}
                className="mt-1 md:mt-0 dark:block hidden"
              ></Image>
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="font-semibold text-lg md:text-xl text-center w-2/3 md:w-full"
            >
              Why professionals trust{" "}
              <span className="gradient-primary text-transparent bg-clip-text">
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
                className="mt-1 md:mt-0 dark:block hidden"
              ></Image>
            </motion.span>
          </div>
          {/* count */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.1, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 items-center text-center"
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
                  <motion.h3 className="text-2xl md:text-3xl lg:text-4xl gradient-primary text-transparent bg-clip-text font-extrabold font-inter">
                    {item.count}
                  </motion.h3>
                  <motion.p className="font-semibold w-full md:w-4/5 text-center">
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
