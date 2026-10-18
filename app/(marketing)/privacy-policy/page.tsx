import PageHero from "@/app/(marketing)/_components/PageHero";
import LegalDocument from "@/app/(marketing)/_components/LegalDocument";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how My Trip collects, uses, and protects your personal information when you book flights and hotels.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | My Trip",
    description:
      "How My Trip collects, uses, and protects your personal information.",
    siteName: "My Trip",
    type: "website",
    locale: "en_US",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Your Data, Your Control"
        title="Privacy"
        highlight="Policy"
        description="This mock policy explains how My Trip would handle your information. Replace it with reviewed legal copy before going live."
      />

      <LegalDocument
        updated="October 2026"
        intro="My Trip respects your privacy. This page is a placeholder template describing, in general terms, what a privacy policy for the service might cover."
        sections={[
          {
            heading: "Information We Collect",
            body: [
              "When you search, book, or create an account we may collect the details you provide directly.",
            ],
            bullets: [
              "Account details such as your name, email address, and password.",
              "Booking details including passenger names, travel dates, and contact information.",
              "Usage data such as pages viewed, device type, and approximate location.",
            ],
          },
          {
            heading: "How We Use Your Information",
            body: [
              "We use the information we collect to operate and improve the service, process bookings, and keep your account secure.",
            ],
            bullets: [
              "Confirming and managing your flight and hotel reservations.",
              "Sending booking confirmations, receipts, and service updates.",
              "Preventing fraud and responding to support requests.",
            ],
          },
          {
            heading: "Sharing With Third Parties",
            body: [
              "We may share limited information with airlines, hotels, and payment processors strictly to fulfil a booking you have requested. We do not sell your personal information.",
            ],
          },
          {
            heading: "Cookies & Tracking",
            body: [
              "We use essential cookies to keep you signed in and remember your preferences. Optional analytics cookies help us understand how the service is used and can be disabled in your browser settings.",
            ],
          },
          {
            heading: "Data Retention & Security",
            body: [
              "We retain personal data only for as long as necessary to provide the service and meet legal obligations. We apply reasonable technical and organisational measures to protect it.",
            ],
          },
          {
            heading: "Your Rights",
            body: [
              "Depending on your location, you may have the right to access, correct, or delete your personal information, or to object to certain processing.",
            ],
          },
          {
            heading: "Contact Us",
            body: [
              "Questions about this policy can be sent to mahdiar55582@gmail.com. This is placeholder content and does not constitute legal advice.",
            ],
          },
        ]}
      />
    </>
  );
}
