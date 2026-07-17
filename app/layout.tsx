import Header from "./_components/Header";
import "./globals.css";
import { Providers } from "./providers";
import { Vazirmatn } from "next/font/google";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

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
      <body className="bg-[#f5f7fc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 selection:bg-sky-200 selection:text-slate-900">
        <Providers>
          <Header />
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
