"use client";
import React from "react";
import Title from "./Title";
import { FAQdata } from "@/app/assets";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { motion } from "framer-motion";

const FAQs = () => {
  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-24 my-10 md:my-20 lg:my-28 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center z-10 relative section-offset">
      <Title title="Frequently Asked" gradientText="Questions" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-16 w-full max-w-3xl"
      >
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          {FAQdata.map((faq, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              key={index}
            >
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>
                  <h3 className="text-left text-sm md:text-lg font-medium text-text-dark dark:text-text-light">
                    {faq.question}
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="">
                  <p className="text-xs md:text-sm text-text-dark/80 dark:text-text-light/80">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};

export default FAQs;
