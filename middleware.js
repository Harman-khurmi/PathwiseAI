import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/cover-letter(.*)",
  "/onboarding(.*)",
  "/interview(.*)",
  // "/interview-prep(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // If user is logged in and trying to access landing page, redirect to dashboard
  if (userId && req.nextUrl.pathname === "/") {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // If user is NOT logged in and trying to access a protected route, redirect to landing page
  if (!userId && isProtectedRoute(req)) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
