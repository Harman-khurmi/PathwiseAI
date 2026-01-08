import Image from "next/image";
import { assets } from "./assets";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <section id="hero">
        <div className=" px-16 py-40 grid grid-cols-1 lg:grid-cols-2 items-start relative overflow-clip h-fit">
          {/* hero text content */}
          <div className="flex flex-col gap-8">
            {/* heading */}
            <div className="">
              <h1 className="text-6xl font-bold text-[#080D1A] dark:text-white">
                Wise Guidance for{" "}
                <span className="bg-clip-text text-transparent gradient-primary">
                  Every Step
                </span>{" "}
                of Your Career Path
              </h1>
              <p className="text-xl mt-4 text-[#080D1A] dark:text-white">
                PathwiseAI is your AI career coach — guiding you through
                resumes, interviews, skills, and growth with clarity.
              </p>
            </div>
            <div className="flex gap-4">
              <Button size="xl">Get Started</Button>
              <Button variant="outline" size="xl">
                How it works
              </Button>
            </div>
          </div>
          {/* hero image */}
          <div className="flex  lg:contents">
            <Image
              width={1000}
              height={1000}
              src={assets.heroImage}
              alt="hero"
              className="w-full relative dark:hidden lg:absolute lg:right-0 lg:top-0 lg:w-[60%] lg:object-fill"
              priority
            />
            <Image
              width={1000}
              height={1000}
              src={assets.heroImageDark}
              alt="hero"
              className="w-full relative hidden dark:block lg:absolute lg:right-0 lg:top-0 lg:w-[60%] lg:object-contain"
              priority
            />
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center py-16">
        this is another section
      </section>
    </>
  );
}
