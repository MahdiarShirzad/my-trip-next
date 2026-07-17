import Link from "next/link";
import Logo from "./Logo";
import HeaderActions from "./HeaderActions";
import HeaderChrome from "./HeaderChrome";
import MobileNav from "./MovileNav";

const links = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Hotels", path: "/hotels" },
  { id: 3, title: "Flights", path: "/flights" },
  { id: 4, title: "Contact", path: "/contact" },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-[1000]">
      {/* Scroll-aware background lives in this client wrapper only */}
      <HeaderChrome>
        <div className="container max-w-[1320px] mx-auto flex items-center justify-between gap-6 px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-9 font-semibold text-sm">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.path}
                className="hover:opacity-70 transition-opacity"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5 max-sm:gap-3">
            <HeaderActions />
            <MobileNav links={links} />
          </div>
        </div>
      </HeaderChrome>
    </header>
  );
}
