import Image from "next/image";

const destinations = [
  {
    name: "Paris",
    image: "/images/paris.jpg",
  },
  {
    name: "Dubai",
    image: "/images/dubai.jpg",
  },
  {
    name: "Istanbul",
    image: "/images/istanbul.jpg",
  },
  {
    name: "Rome",
    image: "/images/rome.jpg",
  },
];

export default function Hero() {
  return (
    <section className="relative w-full h-[720px] max-md:h-[640px] overflow-hidden">
      {/* Background */}
      <Image
        src="/images/hero.png"
        alt="Travel background"
        fill
        priority
        className="object-cover -z-20"
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="container max-w-[1200px] mx-auto">
          {/* Title */}
          <h1 className="text-white text-6xl max-md:text-4xl font-extrabold">
            Your Next Journey
            <br />
            <span className="text-[#7167FF]">Starts Here</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 mt-6 max-w-xl mx-auto">
            Discover amazing destinations, book flights & hotels with ease.
          </p>

          <div className="mt-14 flex gap-4 justify-center flex-wrap">
            {destinations.map((item, index) => (
              <a
                key={index}
                // href={`/destinations/${item.name.toLowerCase()}`}
                className="group relative w-[160px] h-[200px] rounded-2xl overflow-hidden border border-white/20 hover:scale-105 transition"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />

                {/* text */}
                <div className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                  {item.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
