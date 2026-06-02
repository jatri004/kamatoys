import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CartDrawer from "@/components/CartDrawer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  // Include optical-size axis for beautiful large display use
  axes: ["opsz"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Lumen",
    default: "Lumen — Intimate Wellness",
  },
  description:
    "Lumen is a premium intimate-wellness brand offering body-safe products for everyone. Discreet shipping. Plain packaging. Designed for all bodies.",
  keywords: ["intimate wellness", "body-safe", "personal massager", "adult", "sex toy"],
  robots: {
    index: true,
    follow: true,
  },
  // Mark site as adult content for search engines / safe-search filters
  other: {
    rating: "adult",
    "DC.audience": "adults",
  },
  openGraph: {
    title: "Lumen — Intimate Wellness",
    description: "Premium intimate wellness, for every body.",
    type: "website",
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
      className={`${fraunces.variable} ${manrope.variable}`}
    >
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <AgeGate />
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
