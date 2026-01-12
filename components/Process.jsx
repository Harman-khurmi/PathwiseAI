"use client";
import Image from "next/image";
import React from "react";
import Title from "./Title";
import { assets, howItWorks } from "@/app/assets";
import ProcessCard from "./ProcessCard";
import { motion } from "framer-motion";

const Process = () => {
  return (
    <>
      <section id="Process" className="section-offset">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="z-1 px-6 md:px- 12 lg:px-24 mt-0 mb-12 md:my-20 lg:my-28 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center bg-[#55C7F1]/8 border-y-3 border-[#55C7F1]/10 backdrop-blur-md gap-12 relative"
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
          <Title
            title="A clear, guided journey -"
            gradientText="powered by AI"
          />

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start justify-center gap-6 px-4 md:px-12 lg:px-24">
            {howItWorks.map((item, index) => (
              <ProcessCard
                key={index}
                icon={item.icon}
                iconDark={item.iconDark}
                title={item.title}
                description={item.description}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Process;
