import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ title, description, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="border-brand-primary/10 bg-brand-primary/8 flex w-full flex-col items-start gap-4 rounded-md border-3 p-4 md:p-5 lg:p-6"
    >
      <div className="h-fit w-full">
        <Image
          src={image}
          alt="careerGuidance"
          width={350}
          height={350}
          className="rounded-sm object-cover"
        />
      </div>
      <div className="">
        <h3 className="text-base font-bold lg:text-lg">{title}</h3>
        <p className="text-xs lg:text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
