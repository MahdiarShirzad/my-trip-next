import ContactFormCard from "@/app/_components/ContactFormCard";
import ContactHeader from "@/app/_components/ContactHeader";
import ContactInfo from "@/app/_components/ContactInfo";

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
