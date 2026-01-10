import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
export default function Home() {
  return (
    <>
      <main className="mx-auto w-full text-text-dark dark:text-text-light">
        <Hero />
        <TrustedBy />
        <Feature />
      </main>
    </>
  );
}
