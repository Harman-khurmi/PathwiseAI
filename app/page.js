import Image from "next/image";
import { assets } from "./assets";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <section id="hero" className="overflow-hidden">
        <div className=" px-16 py-40 grid md:grid-cols-2 items-start justify-center w-full relative h-fit">
          <div className="flex flex-col gap-8">
            <div className=" ">
              <h1 className="text-6xl font-bold text-[#080D1A] dark:text-white">
                Wise Guidance for{" "}
                <span className="bg-linear-to-t from-[#2C4878] to-[#5FD1DA] bg-clip-text text-transparent">
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
          <div className="">
            <Image
              width={800}
              height={800}
              src={assets.heroImage}
              alt="hero"
              className="absolute -top-10 -right-10 block dark:hidden"
              loading="eager"
            />
            <Image
              width={800}
              height={800}
              src={assets.heroImageDark}
              alt="hero"
              className="absolute -top-10 -right-10 hidden dark:block"
              loading="eager"
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
