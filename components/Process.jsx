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
          className="md:px-12 bg-brand-primary/8 border-brand-primary/10 relative z-1 mt-0 mb-12 flex flex-col items-center justify-center gap-12 border-y-3 px-6 py-8 backdrop-blur-md md:my-20 md:py-12 lg:my-28 lg:px-24 lg:py-16"
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

          <motion.div className="grid grid-cols-1 items-start justify-center gap-6 px-4 md:grid-cols-2 md:px-12 lg:grid-cols-4 lg:px-24">
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
