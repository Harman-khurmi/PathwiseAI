import { Manrope } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const manrope = Manrope({
  variable: "--font-manrope",
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
        className={`${manrope.variable} antialiased scroll-smooth`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* header */}
          <Header />
          <div className="min-h-screen">{children}</div>
          {/* footer */}
          <footer className="bg-neutral-900">
          <div className="text-center p-5 text-neutral-500">© PathwiseAI • Made with 💗 by Harman Khurmi</div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
