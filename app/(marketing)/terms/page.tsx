import PageHero from "@/app/(marketing)/_components/PageHero";
import LegalDocument from "@/app/(marketing)/_components/LegalDocument";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions that govern your use of My Trip to search and book flights and hotels.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms & Conditions | My Trip",
    description: "The terms governing your use of the My Trip service.",
    siteName: "My Trip",
    type: "website",
    locale: "en_US",
  },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="The Fine Print"
        title="Terms &"
        highlight="Conditions"
        description="This mock agreement outlines the rules for using My Trip. Replace it with reviewed legal copy before going live."
      />

      <LegalDocument
        updated="October 2026"
        intro="By accessing or using My Trip you agree to these placeholder terms. If you do not agree, please do not use the service."
        sections={[
          {
            heading: "Acceptance of Terms",
            body: [
              "These terms form a binding agreement between you and My Trip. We may update them from time to time, and continued use of the service means you accept the latest version.",
            ],
          },
          {
            heading: "Use of the Service",
            body: [
              "You agree to use My Trip only for lawful purposes and in line with these terms.",
            ],
            bullets: [
              "Provide accurate information when creating an account or booking.",
              "Do not misuse, disrupt, or attempt to gain unauthorised access to the service.",
              "You are responsible for keeping your account credentials secure.",
            ],
          },
          {
            heading: "Bookings & Payments",
            body: [
              "All bookings are subject to availability and the fare or rate rules of the airline or hotel. Prices shown are for demonstration purposes only in this mock project.",
            ],
          },
          {
            heading: "Cancellations & Refunds",
            body: [
              "Cancellation and refund eligibility depends on the specific airline or hotel policy associated with your booking. Any mock refund handling shown in this project is illustrative only.",
            ],
          },
          {
            heading: "Limitation of Liability",
            body: [
              "To the extent permitted by law, My Trip is not liable for indirect or consequential losses arising from your use of the service. This mock project is provided as-is without warranty.",
            ],
          },
          {
            heading: "Governing Law",
            body: [
              "These terms would be governed by the laws of the applicable jurisdiction. This placeholder does not constitute legal advice.",
            ],
          },
        ]}
      />
    </>
  );
}
