import Link from "next/link";
import {
  Package,
  Truck,
  ShieldCheck,
  Heart,
  BadgeCheck,
  Sparkles,
  Headphones,
  RefreshCcw,
  Lock,
  GraduationCap,
  CreditCard,
  Leaf,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Why Us?",
  description: "Why shop with KamaDesires.com — discreet, inclusive, body-safe and trusted.",
};

const reasons = [
  { icon: Package, title: "100% Discreet", body: "Plain packaging & neutral billing." },
  { icon: Truck, title: "Free UK Delivery", body: "On orders over £40, shipped fast." },
  { icon: BadgeCheck, title: "Body-Safe Only", body: "Non-porous, medical-grade materials." },
  { icon: Heart, title: "Inclusive for All", body: "Every body, every identity welcome." },
  { icon: ShieldCheck, title: "Secure Checkout", body: "256-bit SSL encrypted payments." },
  { icon: Headphones, title: "Expert Support", body: "Friendly, judgement-free help." },
  { icon: RefreshCcw, title: "30-Day Returns", body: "Hassle-free on eligible items." },
  { icon: Sparkles, title: "Curated Range", body: "Premium brands, hand-picked." },
  { icon: CreditCard, title: "Pay Your Way", body: "Klarna, Clearpay, Apple Pay & more." },
  { icon: GraduationCap, title: "Student Discount", body: "15% off for verified students." },
  { icon: Lock, title: "Private & Confidential", body: "Your data is never shared." },
  { icon: Leaf, title: "We Give Back", body: "Supporting cancer research." },
];

export default function WhyUsPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-wine-900 text-white py-14 text-center px-4">
        <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">The KamaDesires Difference</p>
        <h1 className="text-4xl font-display font-bold mb-3">Why Shop With Us?</h1>
        <p className="text-wine-100/80 max-w-md mx-auto text-sm">
          Premium, inclusive and always discreet — here&apos;s what sets us apart.
        </p>
      </div>

      {/* Reasons grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 bg-blush-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-blush-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-wine-800 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-wine-900"
          >
            Start Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
