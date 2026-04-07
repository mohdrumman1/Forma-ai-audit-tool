import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { WhySection } from "@/components/landing/WhySection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ExampleInsights } from "@/components/landing/ExampleInsights";
import { WhyFormaAI } from "@/components/landing/WhyFormaAI";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <WhySection />
        <HowItWorks />
        <ExampleInsights />
        <WhyFormaAI />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
