import Footer from "./_components/Footer";
import Header from "./_components/Header";
import "./globals.css";
import { Providers } from "./providers";
import { Vazirmatn } from "next/font/google";
import type { Metadata } from "next";
import { AuthProvider } from "./_components/AuthProvider";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

// Absolute URLs (canonical, Open Graph) resolve against this when set.
// Left unset in development so nothing is hardcoded to a guessed domain.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: {
    default: "My Trip",
    template: "%s | My Trip",
  },
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  applicationName: "My Trip",
  icons: {
    icon: "/images/favicon.png",
  },
  description: "Book flights and hotels with My Trip",
  openGraph: {
    siteName: "My Trip",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
  },
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
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
