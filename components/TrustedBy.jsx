import { assets, whyTrustUs } from "@/app/assets";
import Image from "next/image";
import React from "react";

const TrustedBy = () => {
  return (
    <>
      <section>
        <div className="z-1 px-6 md:px-12 lg:px-24 mt-0 mb-12 md:my-20 lg:my-28 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center bg-[#55C7F1]/8 border-y-3 border-[#55C7F1]/10 backdrop-blur-md gap-12 relative">
          {/* gradient circle */}
          <Image
            src={assets.gradientCircle}
draggable={false}
            alt="gradientCircle"
            width={800}
            height={800}
            className="absolute top-0 -z-10"
          />
          {/* title */}
          <div className="flex items-start md:items-center justify-center gap-2">
            <span>
              <Image
                src={assets.sparkle}
                alt="sparkle"
                width={20}
                height={20}
                className="mt-1 md:mt-0"
              ></Image>
            </span>
            <h3 className="font-semibold text-lg md:text-xl text-center w-2/3 md:w-full">
              Why professionals trust{" "}
              <span className="gradient-primary text-transparent bg-clip-text">
                PathwiseAI
              </span>
            </h3>
            <span>
              <Image
                src={assets.sparkle}
                alt="sparkle"
                width={20}
                height={20}
                className="mt-1 md:mt-0"
              ></Image>
            </span>
          </div>
          {/* count */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 items-center text-center">
            {whyTrustUs.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-1 md:gap-2"
                >
                  <h3 className="text-2xl md:text-3xl lg:text-4xl gradient-primary text-transparent bg-clip-text font-extrabold font-inter">
                    {item.count}
                  </h3>
                  <p className="font-semibold w-full md:w-4/5 text-center">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustedBy;
