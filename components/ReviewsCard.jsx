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
      className="flex flex-col items-start justify-between h-full rounded-md border-3 border-[#55C7F1]/10 bg-[#55C7F1]/8 p-4 md:p-5 lg:p-6 gap-6 w-full"
    >
      <div className="flex flex-col gap-3">
        <span className="flex items-center w-fit justify-center shadow-inner shadow-[#55C7F1]/60 rounded-sm p-1">
          <Image
            src={assets.quotes}
            alt={name}
            height={35}
            width={35}
            className="text-[#55C7F1]"
          />
        </span>
        <div className="">
          <h3 className="font-semibold text-sm md:text-base lg:text-lg text-text-dark/80 dark:text-text-light/80">
            {review}
          </h3>
        </div>
      </div>
      {/* Name and title */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h3 className="text-text-dark/80 dark:text-text-light/80 font-bold text-sm md:text-base">
            {name}
          </h3>
          <p className="text-text-dark/60 dark:text-text-light/60 text-xs md:text-sm">
            {title}
          </p>
        </div>
        <div className="border-2 border-[#55C7F1] rounded-md overflow-hidden">
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
