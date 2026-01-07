import React from "react";
import { ThemeToggle } from "./ui/themeToggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { assets, navItems } from "../app/assets";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full">
        <header className="flex justify-between items-center p-5 px-16 dark:bg-neutral-900/15 backdrop-blur-lg">
          {/* logo */}
          <Image
            src={assets.darkLogo}
            alt="logo"
            className="w-30 lg:w-36 block dark:hidden"
          />
          <Image
            src={assets.lightLogo}
            alt="logo"
            className="w-30 lg:w-36 hidden dark:block"
          />

          {/* nav items */}
          <div>
            {navItems.map((item, index) => {
              return (
                <a key={index} href={item.link} className="nav-items">
                  {item.name}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-5">
            {/* theme toggle */}
            <ThemeToggle />
            {/* auth buttons */}
            <SignedOut>
              <SignInButton>
                <button className="rounded-md px-6 py-2  dark:hover:bg-[#FEFBFC]/5 font-medium text-[#011627] dark:text-[#FEFBFC] bg-transparent transition-all duration-300 ease-in-out hover:-translate-y-0.5 outline-1 outline-[#011627]/20 hover:outline-[#011627]/90 dark:outline-[#FEFBFC]/30 dark:hover:outline-[#FEFBFC]/90 active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C7F1]/50 focus-visible:scale-[0.98] hover:shadow-md hover:shadow-[#011627]/30 dark:hover:shadow-[#011627]/30">
                  Sign In
                </button>
               {/* <Button variant="outline" size="lg">Sign In</Button> */}
              </SignInButton>

              {/* sign up button */}
              <SignUpButton>
                <button className="bg-linear-to-b from-[#55C7F1] to-[#3C71FA] text-[#FEFBFC] rounded-md px-6 py-2 font-medium transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#3C71FA]/30 dark:hover:shadow-[#011627]/30 hover:from-[#39BDEE] hover:to-[#1D58F0] active:translate-y-0 active:shadow-md focus:outline-none focus:ring-2 focus:ring-[#55C7F1]/50 cursor-pointer">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
      </nav>
    </>
  );
};

export default Header;
