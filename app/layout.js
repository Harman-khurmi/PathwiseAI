import { Manrope, Inter } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ScrollToTop";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://pathwise-ai-pro.vercel.app"),
  title: "PathwiseAI - Wise Career Guidance",
  description: "Lighting the Way with Wise Guidance Along Your Career Path",
  openGraph: {
    title: "PathwiseAI - Wise Career Guidance",
    description: "Lighting the Way with Wise Guidance Along Your Career Path",
    url: "/",
    siteName: "PathwiseAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PathwiseAI - Wise Career Guidance",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PathwiseAI - Wise Career Guidance",
    description: "Lighting the Way with Wise Guidance Along Your Career Path",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${manrope.variable} ${inter.variable} antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* header component*/}
            <Header />
            <ScrollToTop />
            <Toaster richColors position="top-center" />
            <div className="min-h-screen overflow-x-clip">{children}</div>
            {/* footer component*/}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
