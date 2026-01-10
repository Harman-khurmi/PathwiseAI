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
      <nav className="fixed top-0 z-50 w-full h-fit">
        <header className="flex items-center sticky justify-between z-20 top-0 w-full backdrop-blur py-4 md:py-5 px-6 md:px-12 lg:px-24 dark:bg-neutral-900/15 bg-white/25">
          {/* logo */}
          <Image
            src={assets.darkLogo}
            href="#"
            alt="logo"
            width={100}
            height={100}
            className="min-w-30 md:min-w-34 lg:min-w-36 block dark:hidden"
          />
          <Image
            src={assets.lightLogo}
            href="#"
            alt="logo"
            width={100}
            height={100}
            className="min-w-30 md:min-w-34 lg:min-w-36 hidden dark:block"
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

          <div className="flex items-center gap-3 md:gap-5">
            {/* theme toggle */}
            <ThemeToggle />
            {/* auth buttons */}
            <SignedOut>
              <div className="md:flex items-center gap-3 md:gap-5 hidden">
                <SignInButton>
                  <Button size="responsive" variant="outline">
                    Sign In
                  </Button>
                </SignInButton>

                {/* sign up button */}
                <SignUpButton>
                  <Button size="responsive">Get Started</Button>
                </SignUpButton>
              </div>
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
