import Image from "next/image";
import React from "react";

const FeatureCard = ({ title, description, image }) => {
  return (
    <div
      className="flex flex-col items-start rounded-md border-3 border-[#55C7F1]/10
     bg-[#55C7F1]/8 p-4 md:p-5 lg:p-6 gap-4 w-full"
    >
      <div className="w-full h-fit">
        <Image
          src={image}
          alt="careerGuidance"
          width={350}
          height={350}
          className="rounded-sm object-cover"
        />
      </div>
      <div className="">
        <h3 className="text-base lg:text-lg font-bold">{title}</h3>
        <p className="text-xs lg:text-sm">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
