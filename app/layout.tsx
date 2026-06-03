import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgeVerification from "@/components/AgeVerification";

export const metadata: Metadata = {
  title: {
    default: "KamaToys — Premium Intimate Wellness",
    template: "%s | KamaToys",
  },
  description:
    "KamaToys — the UK's most inclusive adult wellness boutique. Free discreet delivery, premium products, and expert guides.",
  metadataBase: new URL("https://kamatoys.com"),
  openGraph: {
    siteName: "KamaToys",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <AgeVerification />
            <AnnouncementBar />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
