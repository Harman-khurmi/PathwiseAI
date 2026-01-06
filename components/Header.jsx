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
import { assets } from "../app/assets";

const Header = () => {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full">
        <header className="flex justify-between items-center p-5 px-16 dark:bg-neutral-900/15 backdrop-blur-lg">
          <Image
            src={assets.darkLogo}
            alt="logo"
            className="w-32 block dark:hidden"
          />
          <Image
            src={assets.lightLogo}
            alt="logo"
            className="w-32 hidden dark:block"
          />
          <div className="flex items-center gap-5">
            <ThemeToggle />
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="text-ceramic-white rounded-full font-medium text-sm sm:text-base py-2 px-4 cursor-pointer">
                  Sign Up
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
