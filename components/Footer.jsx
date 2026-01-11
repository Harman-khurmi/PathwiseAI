"use client";

import { assets, navItems, socialMedia } from "@/app/assets";
import Image from "next/image";
import React from "react";
import { motion, easeIn } from "framer-motion";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="">
      <div className="z-1 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center bg-[#55C7F1]/8 border-y-3 border-[#55C7F1]/10 backdrop-blur-md relative text-center gap-3 md:justify-around mx-auto px-6 mt-6 md:mt-8 lg:mt-12">
        {/* gradient circle */}
        <Image
          src={assets.gradientCircle}
          draggable={false}
          alt="gradientCircle"
          width={800}
          height={800}
          className="absolute top-0 -z-10"
        />

        <>
          <div className="px-6 md:px-12 lg:px-24">
            <div className="flex flex-col md:flex-row md:items-start justify-around gap-12">
              {/* logo + tagline + navitems */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                // animate={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2, ease: easeIn }}
                className="flex flex-col gap-3 w-full"
              >
                {/* logo */}
                <Image
                  src={assets.darkLogo}
                  href="#"
                  alt="logo"
                  width={100}
                  height={100}
                  className="min-w-32 md:min-w-36 lg:min-w-40 block dark:hidden"
                />
                <Image
                  src={assets.lightLogo}
                  href="#"
                  alt="logo"
                  width={100}
                  height={100}
                  className="min-w-32 md:min-w-36 lg:min-w-40 hidden dark:block"
                />
                <p className="text-left text-sm lg:text-base w-full md:w-[90%] lg:w-[50%]">
                  Wise guidance along your career path — helping you move
                  forward with clarity, confidence, and direction at every stage
                  of your professional journey.
                </p>
                <div className="flex gap-8 text-sm md:text-base mt-2">
                  {navItems.map((item, index) => {
                    return (
                      <a
                        key={index}
                        href={item.link}
                        className="hover:text-primary hover:border-primary active:text-primary"
                      >
                        {item.name}
                      </a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                // animate={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3, ease: easeIn }}
                className="items-start gap-3 flex flex-col md:mt-2 lg:mt-1"
              >
                <div className="text-start flex flex-col items-start justify-center content-start">
                  <h4 className="font-semibold">Subscribe to our Newsletter</h4>
                  <p className="md:text-sm">
                    The latest news, articles, and resources, sent to your inbox
                    weekly.
                  </p>
                </div>
                <div className="flex flex-1 gap-3">
                  <input
                    type="text"
                    className="w-48 sm:w-50 md:w-60 lg:w-72 pl-4 h-9 md:h-10 lg:h-12 rounded-md border border-primary/20 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-neutral-400"
                    placeholder="Enter your Email"
                  />
                  <Button name={"Subscribe"} size="responsive">
                    Subscribe
                  </Button>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35, ease: easeIn }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col "
            >
              <hr className="border-t-primary/40 my-4 md:my-6" />
              <div className="flex flex-col gap-3 md:gap-0 items-center md:flex-row md:justify-between">
                <div className="text-text-dark/60 dark:text-text-light/60 text-sm">
                  © 2026 PathwiseAI. All rights reserved.
                </div>
                <div className="flex items-center gap-3">
                  {socialMedia.map((item, index) => (
                    <a key={index} href={item.link}>
                      <Image
                        loading="lazy"
                        className="w-5 h-5 md:w-6 opacity-40 hover:opacity-100 transition-opacity block dark:hidden"
                        src={item.iconDark}
                        alt={item.name}
                        width={24}
                        height={24}
                      />
                      <Image
                        loading="lazy"
                        className="w-5 h-5 md:w-6 opacity-40 hover:opacity-100 transition-opacity hidden dark:block"
                        src={item.icon}
                        alt={item.name}
                        width={24}
                        height={24}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      </div>
    </footer>
  );
};

export default Footer;
