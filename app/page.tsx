import Features from "./_components/Features";
import FlightSection from "./_components/FlightSection";
import Hero from "./_components/Hero";
import HotelSection from "./_components/HotelSection";
import ProductBox from "./_components/ProductBox";
import Testimonials from "./_components/Testimonials";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start w-full">
      <Hero />
      <ProductBox />
      <Features />
      <FlightSection />
      <HotelSection />
      <Testimonials />
    </main>
  );
}
