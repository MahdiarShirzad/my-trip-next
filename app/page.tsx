import Features from "./_components/Features";
import FlightSection from "./_components/FlightSection";
import Hero from "./_components/Hero";
import ProductBox from "./_components/ProductBox";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start w-full">
      <Hero />
      <ProductBox />
      <Features />
      <FlightSection />
    </main>
  );
}
