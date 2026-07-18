import Image from "next/image";

export default function HotelCardImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative w-full h-[160px] overflow-hidden">
      <Image src={src} alt={alt} fill sizes="305px" className="object-cover" />
    </div>
  );
}
