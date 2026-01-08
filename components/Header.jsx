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
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
               {/* <Button variant="outline" size="lg">Sign In</Button> */}
              </SignInButton>

              {/* sign up button */}
              <SignUpButton>
                <Button size="lg" className="btn-primary">
                  Get Started
                </Button>
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
