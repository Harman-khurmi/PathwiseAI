"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // We use a small delay with requestAnimationFrame to ensure the new content
    // is partially rendered before we force the scroll reset.
    // This is especially helpful during route transitions.
    const resetScroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // We use "instant" because "smooth" can feel laggy during page transitions
      });
    };

    resetScroll();

    // Sometimes one call isn't enough if the page height changes dynamically
    // immediately after navigation (e.g. fetching metadata/layout).
    const timeoutId = setTimeout(resetScroll, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
