import HeroSection from "@/components/shared/HeroSection";
import FloatingComp from "@/components/shared/FloatingComp";

export default function HomePage() {

  return (
    <main className="py-5 sm:py-10">
      <FloatingComp />
      <HeroSection />
    </main>
  );
}
