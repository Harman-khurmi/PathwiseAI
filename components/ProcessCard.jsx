import { assets } from "@/app/assets";
import Image from "next/image";
import React from "react";

const ProcessCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-stretch p-4 md:p-3 lg:p-2">
      <div className="rounded-md flex object-contain overflow-hidden z-10 relative justify-center items-center">
        <div className="w-64 h-64 rounded-full gradient-primary blur-3xl opacity-80" />
        <Image src={icon} alt="icon" width={72} height={72} className="z-10 absolute"/>
      </div>
      <div>
        <h3 className="text-base font-bold w-full">{title}</h3>
        <p className="text-xs lg:text-sm opacity-75">{description}</p>
      </div>
    </div>
  );
};

export default ProcessCard;

