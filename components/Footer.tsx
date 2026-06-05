import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import {
  FaYoutube,
  FaSnapchat,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaPinterest,
  FaXTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaCcApplePay,
  FaGooglePay,
} from "react-icons/fa6";
import { SiKlarna } from "react-icons/si";
import { Package, Truck, ShieldCheck } from "lucide-react";

const customerService = [
  { label: "Contact Us", href: "/contact" },
  { label: "Delivery Information", href: "/delivery" },
  { label: "Track Order", href: "/track-order" },
  { label: "Returns & Refunds", href: "/returns" },
  { label: "Student Discount", href: "/student-discount" },
  { label: "FAQs", href: "/faq" },
];

const shopLinks = [
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "LGBTQ+", href: "/lgbtq" },
  { label: "Sale", href: "/sale" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "New Arrivals", href: "/shop?filter=new" },
];

const educationLinks = [
  { label: "Education Hub", href: "/education" },
  { label: "Buying Guides", href: "/education?cat=buying-guides" },
  { label: "Wellness Blog", href: "/education?cat=wellness" },
  { label: "About KamaDesires.com", href: "/about" },
  { label: "Careers", href: "/careers" },
];

const socialLinks = [
  { icon: FaYoutube, label: "YouTube", href: "#", color: "#FF0000" },
  // Snapchat is a black ghost on its signature yellow chip.
  { icon: FaSnapchat, label: "Snapchat", href: "#", color: "#000000", bg: "#FFFC00" },
  { icon: FaFacebook, label: "Facebook", href: "#", color: "#1877F2" },
  { icon: FaInstagram, label: "Instagram", href: "#", color: "#E4405F" },
  { icon: FaTiktok, label: "TikTok", href: "#", color: "#000000" },
  { icon: FaPinterest, label: "Pinterest", href: "#", color: "#E60023" },
  { icon: FaXTwitter, label: "X (Twitter)", href: "#", color: "#000000" },
];

// Payment icons sit on white chips so brand colours (e.g. Visa navy) stay
// legible against the dark footer. Klarna keeps its signature pink chip.
const paymentMethods = [
  { icon: FaCcVisa, label: "Visa", color: "#1A1F71", bg: "#ffffff" },
  { icon: FaCcMastercard, label: "Mastercard", color: "#EB001B", bg: "#ffffff" },
  { icon: FaCcAmex, label: "American Express", color: "#006FCF", bg: "#ffffff" },
  { icon: FaCcPaypal, label: "PayPal", color: "#003087", bg: "#ffffff" },
  { icon: FaCcApplePay, label: "Apple Pay", color: "#000000", bg: "#ffffff" },
  { icon: FaGooglePay, label: "Google Pay", color: "#5F6368", bg: "#ffffff" },
  { icon: SiKlarna, label: "Klarna", color: "#000000", bg: "#FFB3C7" },
];

export default function Footer() {
  return (
    <footer className="bg-wine-950 text-white" aria-label="Site footer">
      {/* Trust strip */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Truck size={20} className="text-gold-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold">Free UK Delivery</p>
                <p className="text-xs text-gray-400">On orders over £40</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Package size={20} className="text-gold-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold">Discreet Packaging</p>
                <p className="text-xs text-gray-400">Plain box, no branding</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <ShieldCheck size={20} className="text-gold-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold">Secure Checkout</p>
                <p className="text-xs text-gray-400">SSL encrypted & safe</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Customer Service */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Customer Service
              </h3>
              <ul className="space-y-2">
                {customerService.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shop */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Shop
              </h3>
              <ul className="space-y-2">
                {shopLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Learn
              </h3>
              <ul className="space-y-2">
                {educationLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Newsletter
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                Get 10% off your first order — plus exclusive offers and new arrivals.
              </p>
              <NewsletterForm dark />
            </div>
          </div>

          {/* Social + Payment */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Social — brand colours on chips for clear visibility */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ icon: Icon, label, href, color, bg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full shadow-sm text-lg transition-transform hover:scale-110"
                  style={{ color, backgroundColor: (bg as string | undefined) ?? "#ffffff" }}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon />
                </a>
              ))}
            </div>

            {/* Payment icons — brand colours on white chips */}
            <div className="flex flex-wrap items-center gap-2">
              {paymentMethods.map(({ icon: Icon, label, color, bg }) => (
                <span
                  key={label}
                  aria-label={label}
                  title={label}
                  className="inline-flex items-center justify-center h-7 w-11 rounded-md shadow-sm"
                  style={{ backgroundColor: bg }}
                >
                  <Icon className="text-2xl" style={{ color }} />
                </span>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <p>
              © {new Date().getFullYear()} KamaDesires.com. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-gray-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
