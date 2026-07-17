import Image from "next/image";
import logoLight from "@/public/images/logo.png";
import logoDark from "@/public/images/logo-dark.png";

export default function Logo() {
  return (
    <div className="relative w-40 max-md:w-32 h-10 max-md:h-8">
      <Image
        src={logoLight}
        alt="MyTrip"
        fill
        className="object-contain object-left [[data-scrolled=true]_&]:hidden"
        priority
      />
      <Image
        src={logoDark}
        alt="MyTrip"
        fill
        className="object-contain object-left hidden [[data-scrolled=true]_&]:block"
      />
    </div>
  );
}
