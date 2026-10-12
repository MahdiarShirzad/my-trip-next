import ContactFormCard from "@/app/(marketing)/contact/_components/ContactFormCard";
import ContactHeader from "@/app/(marketing)/contact/_components/ContactHeader";
import ContactInfo from "@/app/(marketing)/contact/_components/ContactInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the My Trip team. Ask about flights, hotels, bookings, or your account — we are happy to help.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | My Trip",
    description:
      "Get in touch with the My Trip team about flights, hotels, bookings, or your account.",
    siteName: "My Trip",
    type: "website",
    locale: "en_US",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHeader />

      <div className="mx-auto my-16 flex max-w-[1290px] flex-col items-start justify-between gap-8 px-6 lg:my-20 lg:flex-row lg:gap-14">
        <div className="w-full lg:w-1/3">
          <ContactInfo />
        </div>

        <div className="w-full lg:w-2/3">
          <ContactFormCard />
        </div>
      </div>
    </>
  );
}
