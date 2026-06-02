"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { createCheckoutSession } from "@/lib/payments";
import Link from "next/link";

type Step = "contact" | "shipping" | "payment" | "confirmed";

export default function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("contact");
  const [loading, setLoading] = useState(false);

  // Form state
  const [contact, setContact] = useState({ email: "", newsletter: false });
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    line1: "",
    line2: "",
    city: "",
    postcode: "",
    country: "GB",
  });
  const [orderId, setOrderId] = useState("");

  async function handleSubmitPayment(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createCheckoutSession({
        lineItems: items.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          quantity: i.quantity,
          unitPricePence: i.product.price,
        })),
        contactEmail: contact.email,
        shippingAddress: {
          line1: shipping.line1,
          line2: shipping.line2 || undefined,
          city: shipping.city,
          postcode: shipping.postcode,
          country: shipping.country,
        },
      });
      if (result.success && result.orderId) {
        setOrderId(result.orderId);
        clearCart();
        setStep("confirmed");
      }
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0 && step !== "confirmed") {
    return (
      <div className="text-center py-20 text-plum/50">
        <p className="font-display text-2xl mb-4">Your bag is empty.</p>
        <Link href="/shop" className="underline underline-offset-2 hover:text-clay transition-colors text-sm">
          Back to shop
        </Link>
      </div>
    );
  }

  if (step === "confirmed") {
    return (
      <div className="max-w-lg mx-auto text-center py-16 animate-fade-up">
        <div className="text-5xl mb-6" aria-hidden="true">✦</div>
        <h2 className="font-display text-3xl text-plum mb-3">Order confirmed</h2>
        <p className="text-plum/60 mb-2">
          Thank you! Your order <strong className="text-plum">{orderId}</strong> is placed.
        </p>
        <p className="text-sm text-plum/40 mb-8">
          A confirmation will be sent to {contact.email}. Expect plain-packaged
          delivery in 2–4 business days.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-plum text-cream px-8 py-4 rounded-2xl font-semibold text-sm hover:bg-plum-light transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const stepLabels: Step[] = ["contact", "shipping", "payment"];
  const stepIdx = stepLabels.indexOf(step);

  return (
    <div className="grid lg:grid-cols-5 gap-12">
      {/* Left: form */}
      <div className="lg:col-span-3">
        {/* Step indicators */}
        <ol className="flex gap-6 mb-10 list-none m-0 p-0" aria-label="Checkout steps">
          {(["Contact", "Shipping", "Payment"] as const).map((label, i) => (
            <li
              key={label}
              className={`flex items-center gap-2 text-sm font-medium ${
                i <= stepIdx ? "text-plum" : "text-plum/30"
              }`}
              aria-current={i === stepIdx ? "step" : undefined}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  i < stepIdx
                    ? "bg-clay text-cream"
                    : i === stepIdx
                    ? "bg-plum text-cream"
                    : "bg-plum/10 text-plum/30"
                }`}
              >
                {i < stepIdx ? "✓" : i + 1}
              </span>
              {label}
            </li>
          ))}
        </ol>

        {/* ── Step 1: Contact ── */}
        {step === "contact" && (
          <form
            onSubmit={(e) => { e.preventDefault(); setStep("shipping"); }}
            className="space-y-5 animate-fade-up"
            aria-label="Contact information"
          >
            <h2 className="font-display text-2xl text-plum mb-6">Contact</h2>

            <div>
              <label className={labelCls} htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className={inputCls}
                placeholder="you@example.com"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer text-sm text-plum/70">
              <input
                type="checkbox"
                checked={contact.newsletter}
                onChange={(e) => setContact({ ...contact, newsletter: e.target.checked })}
                className="rounded"
              />
              Send me occasional updates (never spam — easily unsubscribed)
            </label>

            <button type="submit" className={btnCls}>
              Continue to shipping →
            </button>
          </form>
        )}

        {/* ── Step 2: Shipping ── */}
        {step === "shipping" && (
          <form
            onSubmit={(e) => { e.preventDefault(); setStep("payment"); }}
            className="space-y-5 animate-fade-up"
            aria-label="Shipping address"
          >
            <h2 className="font-display text-2xl text-plum mb-6">Shipping</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls} htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  required
                  autoComplete="given-name"
                  value={shipping.firstName}
                  onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  required
                  autoComplete="family-name"
                  value={shipping.lastName}
                  onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className={labelCls} htmlFor="line1">Address line 1</label>
              <input
                id="line1"
                required
                autoComplete="address-line1"
                value={shipping.line1}
                onChange={(e) => setShipping({ ...shipping, line1: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="line2">
                Address line 2{" "}
                <span className="text-plum/40 font-normal">(optional)</span>
              </label>
              <input
                id="line2"
                autoComplete="address-line2"
                value={shipping.line2}
                onChange={(e) => setShipping({ ...shipping, line2: e.target.value })}
                className={inputCls}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls} htmlFor="city">City / Town</label>
                <input
                  id="city"
                  required
                  autoComplete="address-level2"
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="postcode">Postcode</label>
                <input
                  id="postcode"
                  required
                  autoComplete="postal-code"
                  value={shipping.postcode}
                  onChange={(e) => setShipping({ ...shipping, postcode: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label className={labelCls} htmlFor="country">Country</label>
              <select
                id="country"
                value={shipping.country}
                onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                className={inputCls}
              >
                <option value="GB">United Kingdom</option>
                <option value="IE">Ireland</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep("contact")}
                className="px-5 py-3 rounded-2xl text-sm font-medium text-plum border border-plum/20 hover:bg-plum/5 transition-colors"
              >
                ← Back
              </button>
              <button type="submit" className={`${btnCls} flex-1`}>
                Continue to payment →
              </button>
            </div>
          </form>
        )}

        {/* ── Step 3: Payment ── */}
        {step === "payment" && (
          <form
            onSubmit={handleSubmitPayment}
            className="space-y-5 animate-fade-up"
            aria-label="Payment details"
          >
            <h2 className="font-display text-2xl text-plum mb-2">Payment</h2>
            {/* Processor placeholder notice */}
            <div className="bg-blush/30 border border-blush rounded-2xl p-4 text-sm text-plum/70 leading-relaxed">
              <strong className="text-plum">Payment processor not yet connected.</strong>
              <br />
              Adult/intimate products require a high-risk processor (CCBill,
              Verotel, SegPay). See <code className="text-xs bg-cream px-1 py-0.5 rounded">lib/payments.ts</code> for integration
              instructions. In production, the payment form would render the
              processor&apos;s hosted fields here.
            </div>

            {/* Placeholder card inputs — visual only */}
            <div>
              <label className={labelCls} htmlFor="card-number">Card number</label>
              <input
                id="card-number"
                disabled
                className={`${inputCls} opacity-50 cursor-not-allowed`}
                placeholder="•••• •••• •••• ••••"
                autoComplete="cc-number"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls} htmlFor="expiry">Expiry</label>
                <input
                  id="expiry"
                  disabled
                  className={`${inputCls} opacity-50 cursor-not-allowed`}
                  placeholder="MM / YY"
                  autoComplete="cc-exp"
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="cvc">CVC</label>
                <input
                  id="cvc"
                  disabled
                  className={`${inputCls} opacity-50 cursor-not-allowed`}
                  placeholder="•••"
                  autoComplete="cc-csc"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep("shipping")}
                className="px-5 py-3 rounded-2xl text-sm font-medium text-plum border border-plum/20 hover:bg-plum/5 transition-colors"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`${btnCls} flex-1 disabled:opacity-60`}
              >
                {loading ? "Placing order…" : `Pay ${subtotal}`}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Right: order summary */}
      <aside className="lg:col-span-2">
        <div className="bg-cream-dark rounded-3xl p-6 shadow-card sticky top-24">
          <h2 className="font-display text-lg text-plum mb-5">Order summary</h2>
          <ul className="space-y-3 mb-5 list-none m-0 p-0">
            {items.map((item) => (
              <li key={item.product.id} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex-shrink-0"
                  style={{ background: item.product.gradient }}
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-plum truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-plum/50">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-plum">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <div className="border-t border-plum/10 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-plum/60">
              <span>Subtotal</span>
              <span>{subtotal}</span>
            </div>
            <div className="flex justify-between text-plum/60">
              <span>Shipping</span>
              <span>Calculated at next step</span>
            </div>
            <div className="flex justify-between font-semibold text-plum text-base pt-1">
              <span>Total</span>
              <span>{subtotal}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

// Shared micro-style strings
const labelCls =
  "block text-xs font-semibold text-plum/60 tracking-wide uppercase mb-1.5";
const inputCls =
  "w-full border border-plum/15 rounded-xl px-4 py-3 text-sm text-plum bg-cream placeholder:text-plum/30 focus:outline-none focus:ring-2 focus:ring-clay focus:border-transparent transition";
const btnCls =
  "w-full bg-plum text-cream font-semibold text-sm py-4 rounded-2xl hover:bg-plum-light transition-colors focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 disabled:opacity-60";
