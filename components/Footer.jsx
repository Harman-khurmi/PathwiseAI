"use client";

import { assets, navItems, socialMedia } from "@/app/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion, easeIn } from "framer-motion";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-brand-primary/8 border-brand-primary/10 relative z-1 mx-auto mt-6 flex flex-col items-center justify-center gap-3 border-y-3 px-6 py-8 text-center backdrop-blur-md md:mt-8 md:justify-around md:py-12 lg:mt-12 lg:py-16"
      >
        {/* gradient circle */}
        <motion.span
          className="absolute top-0 -z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Image
            src={assets.gradientCircle}
            draggable={false}
            alt="gradientCircle"
            width={800}
            height={800}
            className=""
          />
        </motion.span>

        <>
          <div className="px-6 md:px-12 lg:px-24">
            <div className="flex flex-col justify-around gap-12 md:flex-row md:items-start">
              {/* logo + tagline + navitems */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                // animate={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2, ease: easeIn }}
                className="flex w-full flex-col gap-3"
              >
                {/* logo */}
                <Link href="/">
                  <Image
                    src={assets.darkLogo}
                    alt="logo"
                    width={100}
                    height={100}
                    className="block min-w-32 md:min-w-36 lg:min-w-40 dark:hidden"
                  />
                  <Image
                    src={assets.lightLogo}
                    alt="logo"
                    width={100}
                    height={100}
                    className="hidden min-w-32 md:min-w-36 lg:min-w-40 dark:block"
                  />
                </Link>
                <p className="w-full text-left text-sm md:w-[90%] lg:w-[50%] lg:text-base">
                  Wise guidance along your career path — helping you move
                  forward with clarity, confidence, and direction at every stage
                  of your professional journey.
                </p>
                <div className="mt-2 flex gap-8 text-sm md:text-base">
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
                className="flex flex-col items-start gap-3 md:mt-2 lg:mt-1"
              >
                <div className="flex flex-col content-start items-start justify-center text-start">
                  <h4 className="font-semibold">Subscribe to our Newsletter</h4>
                  <p className="md:text-sm">
                    The latest news, articles, and resources, sent to your inbox
                    weekly.
                  </p>
                </div>
                <div className="flex flex-1 gap-3">
                  <input
                    type="email"
                    aria-label="Email address"
                    className="border-primary/20 focus:ring-primary/50 h-9 w-48 rounded-md border bg-white/50 pl-4 transition-all placeholder:text-neutral-400 focus:ring-2 focus:outline-none sm:w-50 md:h-10 md:w-60 lg:h-12 lg:w-72 dark:bg-black/20"
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
              className="flex flex-col"
            >
              <hr className="border-t-primary/20 my-4 md:my-6" />
              <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-0">
                <div className="text-text-dark/60 dark:text-text-light/60 text-sm">
                  © 2026 PathwiseAI. All rights reserved.
                </div>
                <div className="flex items-center gap-3">
                  {socialMedia.map((item, index) => (
                    <a key={index} href={item.link} aria-label={`Open ${item.name}`}>
                      <Image
                        loading="lazy"
                        className="block h-5 w-5 opacity-40 transition-opacity hover:opacity-100 md:w-6 dark:hidden"
                        src={item.iconDark}
                        alt={item.name}
                        width={24}
                        height={24}
                      />
                      <Image
                        loading="lazy"
                        className="hidden h-5 w-5 opacity-40 transition-opacity hover:opacity-100 md:w-6 dark:block"
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
      </motion.div>
    </footer>
  );
};

export default Footer;
