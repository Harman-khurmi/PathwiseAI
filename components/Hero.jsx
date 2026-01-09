import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { assets } from "@/app/assets";

const Hero = () => {
  return (
    <>
      <section id="Hero" className="section-offset pt-8 md:pt-12 lg:pt-20 z-1 ">
        <div className="px-6 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-2 relative">
          {/* hero text content */}
          <div className="flex flex-col gap-8 items-center justify-center md:items-start md:justify-start w-full">
            {/* heading */}
            <div className="flex flex-col mx-auto text-center md:text-left w-full">
              <h1 className="md:min-w-100 lg:w-full relative">
                {/* <div className="flex  items-center justify-center lg:justify-start gap-2 bg-amber-300"> */}
                <span className="pr-1 -ml-6 md:ml-0 whitespace-nowrap">
                Wise Guidance
                </span>
                {/* <span className="inline-block pl-1 lg:pl-2"> */}
                  <Image
                    src={assets.gradientSparkle}
                    width={60}
                    height={60}
                    alt="sparkle"
                    className="absolute top-1.5 inline-block w-10 md:w-12 lg:w-16"
                  />
                {/* </span> */}
                {" "}
                {/* </div> */}
                <br />
                for{" "}
                <span className="bg-clip-text text-transparent gradient-primary">
                  Every Step
                </span>{" "}
                of Your Career Path
              </h1>
              <p className="w-[90%] md:w-[95%]  mx-auto md:ml-0 mt-4 text-[#080D1A] dark:text-white">
                PathwiseAI is your AI career coach — guiding you through
                resumes, interviews, skills, and growth with clarity.
              </p>
            </div>
            <div className="flex gap-4 lg:mt-4">
              <Button size="responsive">Get Started</Button>
              <Button variant="outline" size="responsive">
                How it works
              </Button>
            </div>
          </div>
          {/* hero image */}
          {/* md: */}
          <div className="hidden md:flex items-center justify-center">
            <Image
              width={1600}
              height={1600}
              src={assets.heroImage}
              alt="hero"
              className="dark:hidden h-7xl w-7xl absolute -top-40 -right-64 lg:-top-80 lg:-right-80"
              priority
              quality={40}
            />
            <Image
              width={1600}
              height={1600}
              src={assets.heroImageDark}
              alt="hero"
              className="hidden dark:block h-7xl w-7xl absolute -top-40 -right-64 lg:-top-80 lg:-right-80"
              priority
              quality={40}
            />
          </div>
          {/* sm: */}
          <div className="md:hidden flex items-start justify-center w-full">
            <Image
              width={600}
              height={600}
              src={assets.heroImage}
              alt="hero"
              className="dark:hidden -mt-28 min-w-2xl h-auto"
              priority
              quality={40}
            />
            <Image
              width={600}
              height={600}
              src={assets.heroImageDark}
              alt="hero"
              className="hidden dark:block -mt-28 min-w-2xl h-auto"
              priority
              quality={40}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
