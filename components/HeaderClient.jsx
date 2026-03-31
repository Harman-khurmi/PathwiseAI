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
import {
  ChevronDown,
  FileUser,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Newspaper,
  Sparkles,
  X,
} from "lucide-react";
import MobileNavbar from "./MobileNavbar";
// Removed DropdownMenu imports
import { motion, AnimatePresence, easeInOut } from "motion/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const HeaderClient = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGrowthToolsOpen, setIsGrowthToolsOpen] = useState(false);
  const headerRef = useRef(null);
  const mobileNavRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const growthToolsRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  useEffect(() => {
    if (headerRef.current) {
      setNavbarHeight(headerRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (headerRef.current) {
        setNavbarHeight(headerRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      
      if (
        isGrowthToolsOpen &&
        growthToolsRef.current &&
        !growthToolsRef.current.contains(event.target)
      ) {
        setIsGrowthToolsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogoClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
        className="fixed top-0 z-50 w-full"
      >
        <nav
          ref={headerRef}
          className="flex items-center sticky justify-between z-20 top-0 w-full backdrop-blur py-4 px-6 md:px-12 lg:px-24 dark:bg-neutral-900/15 bg-white/25"
        >
          <div>
            {/* logo */}
            <SignedIn>
              <Link
                href="/dashboard"
                className="block dark:hidden"
                onClick={handleLogoClick}
              >
                <Image
                  src={assets.darkLogo}
                  alt="logo"
                  width={100}
                  height={100}
                  priority
                  className="h-10 w-auto md:h-12 lg:h-12 "
                />
              </Link>
              <Link
                href="/dashboard"
                className="hidden dark:block"
                onClick={handleLogoClick}
              >
                <Image
                  src={assets.lightLogo}
                  alt="logo"
                  width={100}
                  height={100}
                  priority
                  className="h-10 w-auto md:h-12 lg:h-12 "
                />
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/" className="block dark:hidden">
                <Image
                  src={assets.darkLogo}
                  alt="logo"
                  width={100}
                  height={100}
                  priority
                  className="h-10 w-auto md:h-12 lg:h-12 "
                />
              </Link>
              <Link href="/" className="hidden dark:block">
                <Image
                  src={assets.lightLogo}
                  alt="logo"
                  width={100}
                  height={100}
                  priority
                  className="h-10 w-auto md:h-12 lg:h-12 "
                />
              </Link>
            </SignedOut>
          </div>
          {/* <a href="" onClick={handleLogoClick} className="block dark:hidden">
            <Image
              src={assets.darkLogo}
              alt="logo"
              width={100}
              height={100}
              className="h-10 w-auto md:h-12 lg:h-12 "
            />
          </a>
          <a href="#" onClick={handleLogoClick} className="hidden dark:block">
            <Image
              src={assets.lightLogo}
              alt="logo"
              width={100}
              height={100}
              className="h-10 w-auto md:h-12 lg:h-12 "
            />
          </a> */}
          <div className="flex gap-6">
            <SignedOut>
              {isHomePage &&
                navItems.map((item, index) => {
                  return (
                    <a
                      key={index}
                      href={item.link}
                      className="nav-items text-sm font-medium transition-colors hover:text-primary"
                    >
                      {item.name}
                    </a>
                  );
                })}
            </SignedOut>
          </div>
          <div className="flex gap-4">
            {/* signed in nav items */}
            <div className="hidden lg:flex items-center gap-4">
              <SignedIn>
                <div className="relative" ref={growthToolsRef}>
                  <Button 
                    size="responsive" 
                    variant="outline" 
                    className="hidden md:flex gap-2"
                    onClick={() => setIsGrowthToolsOpen(!isGrowthToolsOpen)}
                  >
                    <Sparkles className="h-4 w-4" />
                    Growth Tools
                    <motion.div
                      animate={{ rotate: isGrowthToolsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </Button>

                  <AnimatePresence>
                    {isGrowthToolsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        style={{ originY: 0 }}
                        className="absolute top-full right-0 mt-3 w-[200px] overflow-hidden rounded-xl bg-white/70 dark:bg-neutral-900/50 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg dark:shadow-black/50 z-50 flex flex-col p-2"
                      >
                        <Link
                          href="/resume"
                          onClick={() => setIsGrowthToolsOpen(false)}
                          className="flex gap-3 items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                          <FileUser className="h-4 w-4" />
                          Resume Builder
                        </Link>
                        <Link
                          href="/cover-letter"
                          onClick={() => setIsGrowthToolsOpen(false)}
                          className="flex gap-3 items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                          <Newspaper className="h-4 w-4" />
                          Cover Letter
                        </Link>
                        <Link
                          href="/interview"
                          onClick={() => setIsGrowthToolsOpen(false)}
                          className="flex gap-3 items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                          <GraduationCap className="h-4 w-4" />
                          Interview Prep
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href={"/dashboard"}>
                  <Button
                    size="responsive"
                    className={"hidden md:flex gap-2"}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Industry Insights
                  </Button>
                </Link>
              </SignedIn>

              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-3 md:gap-5">
                  <ThemeToggle />
                </div>

                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: {
                          width: "2.2rem",
                          height: "2.2rem",
                        },
                      },
                    }}
                  />
                </SignedIn>
              </div>
            </div>
            {!isAuthPage && (
              <SignedOut>
                <div className="hidden md:flex items-center gap-3 md:gap-5">
                  <SignInButton>
                    <Button
                      size="responsive"
                      variant="outline"
                    >
                      Sign In
                    </Button>
                  </SignInButton>

                  {/* <SignUpButton  mode="modal"> */}
                  <SignUpButton>
                    <Button
                      size="responsive"
                    >
                      Get Started
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            )}
            <div className="lg:hidden flex gap-2">
              <div className="flex items-center gap-3 md:gap-5">
                <ThemeToggle />
              </div>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: "2rem",
                        height: "2rem",
                      },
                    },
                  }}
                />
              </SignedIn>
              <Button
                ref={toggleBtnRef}
                variant="outline"
                size="responsiveIcon"
                className="h-8.5 w-8.5 md:h-9 md:w-9 overflow-hidden rounded-md"
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
                      <X className="h-5 w-5 md:h-6 md:w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5 md:h-6 md:w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </nav>

        {!isAuthPage && (
          <MobileNavbar
            ref={mobileNavRef}
            isOpen={isMenuOpen}
            onNavItemClick={() => setIsMenuOpen(false)}
            navbarHeight={navbarHeight}
          />
        )}
      </motion.header>
    </>
  );
};

export default HeaderClient;
