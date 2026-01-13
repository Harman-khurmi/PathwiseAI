"use client";
import { useState, useRef, useEffect } from "react";
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
import { Menu, X } from "lucide-react";
import MobileNavbar from "./MobileNavbar";
import { motion, AnimatePresence, easeInOut } from "motion/react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const mobileNavRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setNavbarHeight(headerRef.current.offsetHeight);
    }

    // Optional: Update height on resize
    const handleResize = () => {
      if (headerRef.current) {
        setNavbarHeight(headerRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu if open
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(
      {},
      document.title,
      window.location.pathname + window.location.search
    );
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
        className="fixed top-0 z-50 w-full h-16"
      >
        <div
          ref={headerRef}
          className="flex items-center sticky justify-between z-20 top-0 w-full backdrop-blur py-4 md:py-5 px-6 md:px-12 lg:px-24 dark:bg-neutral-900/15 bg-white/25"
        >
          {/* logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="block dark:hidden"
          >
            <Image
              src={assets.darkLogo}
              alt="logo"
              width={100}
              height={100}
              className="h-10 w-auto md:h-12 lg:h-12 "
            />
          </Link>
          <Link
            href="/"
            onClick={handleLogoClick}
            className="hidden dark:block"
          >
            <Image
              src={assets.lightLogo}
              alt="logo"
              width={100}
              height={100}
              className="h-10 w-auto md:h-12 lg:h-12 "
            />
          </Link>
          <nav className="hidden lg:block">
            {navItems.map((item, index) => {
              return (
                <a
                  key={index}
                  href={item.link}
                  onClick={item.name === "Home" ? handleLogoClick : undefined}
                  className="nav-items"
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            {/* theme toggle */}
            <ThemeToggle />

            {/* auth buttons */}
            <SignedOut>
              <div className="hidden md:flex items-center gap-3 md:gap-5">
                <SignInButton>
                  <Button  size="responsive" variant="outline" className={"lg:h-11 lg:text-base lg:px-6 lg:has-[>svg]:px-2"} >
                    Sign In
                  </Button>
                </SignInButton>

                {/* sign up button */}
                <SignUpButton>
                  <Button size="responsive" className={"lg:h-11 lg:text-base lg:px-6 lg:has-[>svg]:px-2"}>Get Started</Button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Mobile Menu Toggle - Mobile & Tablet only */}
            <div className="lg:hidden">
              <Button
                ref={toggleBtnRef}
                variant="outline"
                size="responsiveIcon"
                className="h-9 w-9 md:h-10 md:w-10 overflow-hidden"
                onClick={toggleMenu}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navbar Component */}
        <MobileNavbar
          ref={mobileNavRef}
          isOpen={isMenuOpen}
          navbarHeight={navbarHeight}
          onHomeClick={handleLogoClick}
        />
      </motion.header>
    </>
  );
};

export default Header;
