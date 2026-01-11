import React from "react";
import Title from "./Title";
import FeatureCard from "./FeatureCard";
import { features } from "@/app/assets";

const Feature = () => {
  return (
    <>
      <section
        id="Features"
        className="container mx-auto px-6 md:px-12 lg:px-24 my-10 md:my-20 lg:my-28 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center z-10 relative section-offset"
      >
        <Title title="Everything you need to move" gradientText="forward" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-stretch justify-center content-center px-6 md:px-12 lg:px-24 my-10 md:my-12 lg:my-16">
          {features.map((feature, index) => {
            return (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                image={feature.image}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Feature;
