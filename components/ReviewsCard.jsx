import { assets } from "@/app/assets";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ReviewsCard = ({ name, title, image, review }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      viewport={{ once: false }}
      className="border-brand-primary/10 bg-brand-primary/8 flex h-full w-full flex-col items-start justify-between gap-6 rounded-md border-3 p-4 md:p-5 lg:p-6"
    >
      <div className="flex flex-col gap-3">
        <span className="shadow-brand-primary/60 flex w-fit items-center justify-center rounded-sm p-1 shadow-inner">
          <Image
            src={assets.quotes}
            alt="Quote"
            height={35}
            width={35}
          />
        </span>
        <div className="">
          <h3 className="text-text-dark/80 dark:text-text-light/80 text-sm font-semibold md:text-base lg:text-lg">
            {review}
          </h3>
        </div>
      </div>
      {/* Name and title */}
      <div className="flex w-full items-center justify-between">
        <div>
          <h3 className="text-text-dark/80 dark:text-text-light/80 text-sm font-bold md:text-base">
            {name}
          </h3>
          <p className="text-text-dark/60 dark:text-text-light/60 text-xs md:text-sm">
            {title}
          </p>
        </div>
        <div className="border-brand-primary overflow-hidden rounded-md border-2">
          <Image
            src={image}
            alt={name}
            height={50}
            width={50}
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewsCard;
