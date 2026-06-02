import type { Metadata } from "next";
import CheckoutForm from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout — plain packaging, discreet billing.",
  robots: { index: false, follow: false }, // don't index checkout
};

export default function CheckoutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-4xl text-plum mb-2">Checkout</h1>
      <p className="text-sm text-plum/50 mb-12">
        All orders ship in plain, unbranded packaging. Billing shows
        &ldquo;LMN Wellness Ltd&rdquo; on your statement.
      </p>
      <CheckoutForm />
    </div>
  );
}
