import { Manrope, Inter } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "PathwiseAI - Wise Career Guidance",
  description: "Lighting the Way with Wise Guidance Along Your Career Path",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${manrope.variable} ${inter.variable} antialiased scroll-smooth`}
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
            <div className="min-h-screen overflow-x-clip">{children}</div>
            {/* footer component*/}
            
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
