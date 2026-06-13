import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgeVerification from "@/components/AgeVerification";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "KamaDesires.com — Premium Intimate Wellness",
    template: "%s | KamaDesires.com",
  },
  description:
    "KamaDesires.com — the UK's most inclusive adult wellness boutique. Free discreet delivery, premium products, and expert guides.",
  metadataBase: new URL("https://kamadesires.com"),
  openGraph: {
    siteName: "KamaDesires.com",
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
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AgeVerification />
              <AnnouncementBar />
              <Navbar />
              <main id="main-content">{children}</main>
              <Footer />
              <WhatsAppButton />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
