import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { PricingInterest } from "@/components/PricingInterest";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

interface PageProps {
  searchParams: { v?: string };
}

export default function Home({ searchParams }: PageProps) {
  // A/B variant selector — swap hero headline via ?v=1 or ?v=2
  const variant = searchParams.v === "2" ? 2 : searchParams.v === "3" ? 3 : 1;

  return (
    <main className="min-h-screen">
      <Nav />
      <Hero variant={variant} />
      <SocialProof />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <PricingInterest />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
