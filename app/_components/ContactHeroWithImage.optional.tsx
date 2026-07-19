import Image from "next/image";

// Optional alternative to ContactHeader.tsx — use this instead if you decide
// you want a visual hero after all. Still a pure Server Component.
// Replace the placeholder path below with your real image once you have one.
export default function ContactHeroWithImage() {
  return (
    <section className="relative h-[420px] w-full overflow-hidden">
      {/* TODO: replace with the real hero image, e.g. /images/contact-hero.jpg */}
      <Image
        src="/images/contact-hero-placeholder.jpg"
        alt="Contact us background"
        fill
        priority
        className="-z-20 object-cover"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/10" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="font-interExtraBold text-4xl text-white">Contact Us</p>
        <p className="mt-4 font-inter text-xl text-white/80">
          Call us 24/7
        </p>
      </div>
    </section>
  );
}
