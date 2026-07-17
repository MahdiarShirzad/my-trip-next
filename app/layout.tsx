import type { Metadata } from "next";
// import Providers from "./providers";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "My Trip",
  description: "Book flights and hotels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
