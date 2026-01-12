import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const ProcessCard = ({ icon, title, description, iconDark,index }) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="flex flex-col gap-4 justify-center items-stretch p-4 md:p-3 lg:p-2">
      <div className="rounded-md flex object-contain overflow-hidden z-10 relative justify-center items-center">
        <div className="w-64 h-64 rounded-full gradient-primary blur-3xl opacity-80" />
        <Image src={icon} alt="icon" width={72} height={72} className="z-10 absolute block dark:hidden"/>
        <Image src={iconDark} alt="iconDark" width={72} height={72} className="z-10 absolute hidden dark:block"/>
      </div>
      <div>
        <h3 className="text-base font-bold w-full">{title}</h3>
        <p className="text-xs lg:text-sm opacity-75">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProcessCard;

