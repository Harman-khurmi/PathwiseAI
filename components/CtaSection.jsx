import Image from "next/image";
import React from "react";
import Title from "./Title";
import { assets } from "@/app/assets";
import { Button } from "./ui/button";

const CtaSection = () => {
  return (
    <section>
      <div className="z-1 px-6 md:px-12 lg:px-24 mt-0 mb-12 md:my-20 lg:my-28 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center bg-[#55C7F1]/8 border-y-3 border-[#55C7F1]/10 backdrop-blur-md gap-8 relative">
        {/* gradient circle */}
        <Image
          src={assets.gradientCircle}
          draggable={false}
          alt="gradientCircle"
          width={800}
          height={800}
          className="absolute top-0 -z-10"
        />
        <div className="flex flex-col items-center justify-center gap-3">
          <Title
            title="Your career needs direction. Let's "
            gradientText="guide it"
          />
          <h3 className="text-text-dark/80 dark:text-text-light/80 text-center w-2/3">
            Join thousands of professionals who are moving forward with clarity,
            confidence, and direction.
          </h3>
        </div>
        <a href="#Home">
          <Button size="responsive">Start your journey</Button>
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
