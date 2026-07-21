import Footer from "./_components/Footer";
import Header from "./_components/Header";
import "./globals.css";
import { Providers } from "./providers";
import { Vazirmatn } from "next/font/google";
import type { Metadata } from "next";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My Trip",
    template: "%s | My Trip",
  },
  icons: {
    icon: "/images/favicon.png",
  },
  description: "Book flights and hotels with My Trip",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${vazirmatn.variable} antialiased`}
    >
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 selection:bg-blue-200 dark:selection:bg-sky-800 selection:text-slate-900 dark:selection:text-slate-100">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
