"use client";

import React from "react";
import Title from "./Title";
import ReviewsCard from "./ReviewsCard";
import { testimonials } from "@/app/assets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Reviews = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <>
      <section
        id="Reviews"
        className="section-offset container mx-auto px-6 md:px-12 lg:px-24 my-10 md:my-20 lg:my-28 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center z-10 relative"
      >
        <Title title="Real professionals." gradientText="Real outcomes" />

        <Carousel
          opts={{ loop: true }}
          plugins={[plugin.current]}
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
          className="w-full py-16"
          >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
              key={index}
              className="
              pl-4 
              basis-full
              md:basis-1/2
              lg:basis-1/3
              "
              >
                <ReviewsCard
                  name={testimonial.name}
                  title={testimonial.title}
                  image={testimonial.image}
                  review={testimonial.review}
                  />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Optional controls */}
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>
    </>
  );
};

export default Reviews;
