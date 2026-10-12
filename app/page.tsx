import { Suspense } from "react";
import type { Metadata } from "next";
import FAQ from "./_components/FAQ";
import Features from "./_components/Features";
import FlightSection from "./_components/FlightSection";
import FlightSeoContent from "./_components/FlightSeoContent";
import Hero from "./_components/Hero";
import HotelSection from "./_components/HotelSection";
import ProductBox from "./_components/ProductBox";

export const metadata: Metadata = {
  description:
    "Compare flights and stays in one search on My Trip. Browse airlines and hotels, filter by price and time, then book your next trip in minutes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "My Trip — From here to anywhere",
    description:
      "Compare flights and stays in one search, then book your next trip in minutes.",
    siteName: "My Trip",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hero-home.jpg",
        width: 1800,
        height: 1200,
        alt: "Bow of a wooden boat pointing toward mountains across an alpine lake",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start w-full">
      <Hero />
      {/* ProductBox's hotel search reads useSearchParams, which suspends during prerender */}
      <Suspense fallback={null}>
        <ProductBox />
      </Suspense>
      <Features />
      <FlightSection />
      <HotelSection />
      <FAQ />
      <FlightSeoContent />
    </main>
  );
}
