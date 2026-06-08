"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { ShieldCheck, Lock, Tag, Gift, Heart } from "lucide-react";
import { FaApplePay, FaGooglePay, FaPaypal, FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa6";
import { SiKlarna, SiAfterpay } from "react-icons/si";
import AgeVerifyGate from "@/components/AgeVerifyGate";
import type { AgeResult } from "@/lib/age";

type PayMethod = "card" | "paypal" | "applepay" | "googlepay" | "klarna" | "clearpay";

// Demo discount logic (front-end only).
const PROMO_CODES: Record<string, number> = { WELCOME10: 0.1, STUDENT15: 0.15 };

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [payMethod, setPayMethod] = useState<PayMethod>("card");

  const [promoInput, setPromoInput] = useState("");
  const [promoPct, setPromoPct] = useState(0);
  const [promoMsg, setPromoMsg] = useState("");

  const [giftInput, setGiftInput] = useState("");
  const [giftValue, setGiftValue] = useState(0);
  const [giftMsg, setGiftMsg] = useState("");

  const [donation, setDonation] = useState(0);

  // --- Age gate (18+) ---
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const [declared, setDeclared] = useState(false);
  const [declaredAt, setDeclaredAt] = useState<string | null>(null);
  const ageVerified = ageResult?.pass === true;
  const canPay = ageVerified && declared; // both required before any payment

  const onDeclare = (checked: boolean) => {
    setDeclared(checked);
    setDeclaredAt(checked ? new Date().toISOString() : null);
  };

  const placeOrder = () => {
    if (!canPay) return;
    // Attach the age-verification + declaration to the order record.
    // (Front-end demo: persisted locally; in production this is recorded
    //  server-side against the real order.)
    try {
      localStorage.setItem(
        "kd_last_order_age",
        JSON.stringify({
          ageVerification: ageResult,
          declaration: { accepted: declared, acceptedAt: declaredAt },
        })
      );
    } catch {}
    clearCart();
    setPlaced(true);
  };

  const shipping = totalPrice >= 40 ? 0 : 3.99;
  const promoDiscount = totalPrice * promoPct;
  const total = Math.max(0, totalPrice - promoDiscount + shipping - giftValue) + donation;

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoPct(PROMO_CODES[code]);
      setPromoMsg(`✓ ${Math.round(PROMO_CODES[code] * 100)}% off applied`);
    } else {
      setPromoPct(0);
      setPromoMsg("Invalid promo code");
    }
  };

  const applyGift = () => {
    const code = giftInput.trim();
    // Demo: any non-empty code redeems £25.
    if (code.length >= 4) {
      setGiftValue(25);
      setGiftMsg("✓ £25.00 gift card applied");
    } else {
      setGiftValue(0);
      setGiftMsg("Enter a valid voucher code");
    }
  };

  if (placed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={28} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for your order. You&apos;ll receive a confirmation email shortly. Your order will arrive in a plain, discreet package.
        </p>
        <Link href="/" className="inline-block bg-wine-800 text-white font-semibold px-6 py-3 rounded-full hover:bg-wine-900">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-gray-500 mb-4">Your bag is empty.</p>
        <Link href="/shop" className="text-blush-600 hover:underline font-medium">Continue Shopping</Link>
      </div>
    );
  }

  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form column */}
        <form
          onSubmit={(e) => { e.preventDefault(); placeOrder(); }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Age verification (18+) — must pass before any payment */}
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-lg">Age Verification</h2>
              <span className="bg-black text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded">18+</span>
            </div>
            <p className="text-sm text-gray-500">
              These are adult products. UK law requires us to verify you are 18 or over before you can buy.
            </p>

            <AgeVerifyGate onResult={setAgeResult} />

            <label className="flex items-start gap-3 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={declared}
                onChange={(e) => onDeclare(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-blush-500"
              />
              <span className="text-sm text-gray-700">
                I declare that I am <strong>18 years of age or older</strong>.
              </span>
            </label>
          </section>

          {/* Express / fast checkout */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Express Checkout</h2>
            <div className="grid grid-cols-3 gap-3">
              <button type="button" disabled={!canPay} onClick={placeOrder}
                className="flex items-center justify-center bg-black text-white rounded-xl py-3 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Pay with Apple Pay">
                <FaApplePay className="text-3xl" />
              </button>
              <button type="button" disabled={!canPay} onClick={placeOrder}
                className="flex items-center justify-center bg-black text-white rounded-xl py-3 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Pay with Google Pay">
                <FaGooglePay className="text-3xl" />
              </button>
              <button type="button" disabled={!canPay} onClick={placeOrder}
                className="flex items-center justify-center bg-[#FFC439] text-[#003087] rounded-xl py-3 hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Pay with PayPal">
                <FaPaypal className="text-2xl" />
              </button>
            </div>
            {!canPay && (
              <p className="text-xs text-amber-600 mt-3">
                Complete age verification and tick the 18+ declaration to enable payment.
              </p>
            )}
            <div className="flex items-center gap-3 mt-5">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-xs text-gray-400">or pay another way</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>
          </div>

          {/* Contact */}
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="font-display font-bold text-lg">Contact</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" required placeholder="First name" aria-label="First name" className={inputCls} />
              <input type="text" required placeholder="Last name" aria-label="Last name" className={inputCls} />
            </div>
            <input type="email" required placeholder="Email" aria-label="Email" className={inputCls} />
            <input type="tel" placeholder="Phone (optional)" aria-label="Phone" className={inputCls} />
          </section>

          {/* Shipping */}
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="font-display font-bold text-lg">Shipping Address</h2>
            <input type="text" required placeholder="Address line 1" aria-label="Address line 1" className={inputCls} />
            <input type="text" placeholder="Address line 2 (optional)" aria-label="Address line 2" className={inputCls} />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" required placeholder="City" aria-label="City" className={inputCls} />
              <input type="text" required placeholder="Postcode" aria-label="Postcode" className={inputCls} />
            </div>
          </section>

          {/* Charity donation */}
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Heart size={16} className="text-[#2e008b]" />
              </div>
              <div>
                <h2 className="font-display font-bold text-base">Add a donation</h2>
                <p className="text-sm text-gray-500">
                  We proudly support <strong>Cancer Research UK</strong>. Add a small amount and we&apos;ll
                  pass on 100%.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3, 5].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setDonation(amt)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors ${
                    donation === amt
                      ? "border-blush-500 bg-blush-50 text-blush-600"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {amt === 0 ? "No thanks" : `£${amt.toFixed(2)}`}
                </button>
              ))}
            </div>
          </section>

          {/* Payment method */}
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-display font-bold text-lg">Payment</h2>
              <Lock size={14} className="text-gray-400" />
              <span className="text-xs text-gray-400">SSL Encrypted</span>
            </div>

            <div className="space-y-2.5">
              {/* Card */}
              <PayOption id="card" current={payMethod} onSelect={setPayMethod}
                title={<span className="flex items-center gap-2 font-medium text-sm">Credit / Debit Card
                  <span className="flex gap-1 text-xl text-gray-500"><FaCcVisa /><FaCcMastercard /><FaCcAmex /></span>
                </span>}>
                <div className="space-y-3 pt-3">
                  <input type="text" placeholder="Card number" maxLength={19} className={`${inputCls} font-mono`} />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM / YY" maxLength={7} className={`${inputCls} font-mono`} />
                    <input type="text" placeholder="CVC" maxLength={4} className={`${inputCls} font-mono`} />
                  </div>
                  <input type="text" placeholder="Name on card" className={inputCls} />
                </div>
              </PayOption>

              {/* PayPal */}
              <PayOption id="paypal" current={payMethod} onSelect={setPayMethod}
                title={<span className="flex items-center gap-2 font-medium text-sm"><FaPaypal className="text-[#003087] text-lg" /> PayPal</span>}>
                <p className="text-sm text-gray-500 pt-3">You&apos;ll be redirected to PayPal to complete payment securely.</p>
              </PayOption>

              {/* Klarna */}
              <PayOption id="klarna" current={payMethod} onSelect={setPayMethod}
                title={<span className="flex items-center gap-2 font-medium text-sm"><SiKlarna className="text-xl" style={{ color: "#FFB3C7" }} /> Klarna — Pay in 3</span>}>
                <p className="text-sm text-gray-600 pt-3">
                  3 interest-free payments of <strong>£{(total / 3).toFixed(2)}</strong>. No fees when you pay on time.
                </p>
              </PayOption>

              {/* Clearpay */}
              <PayOption id="clearpay" current={payMethod} onSelect={setPayMethod}
                title={<span className="flex items-center gap-2 font-medium text-sm"><SiAfterpay className="text-xl" style={{ color: "#B2FCE4" }} /> Clearpay — Pay in 4</span>}>
                <p className="text-sm text-gray-600 pt-3">
                  4 interest-free payments of <strong>£{(total / 4).toFixed(2)}</strong> every 2 weeks.
                </p>
              </PayOption>

              {/* Apple / Google Pay */}
              <PayOption id="applepay" current={payMethod} onSelect={setPayMethod}
                title={<span className="flex items-center gap-2 font-medium text-sm"><FaApplePay className="text-2xl" /> Apple Pay</span>}>
                <p className="text-sm text-gray-500 pt-3">Confirm with Face ID / Touch ID on the next step.</p>
              </PayOption>
              <PayOption id="googlepay" current={payMethod} onSelect={setPayMethod}
                title={<span className="flex items-center gap-2 font-medium text-sm"><FaGooglePay className="text-2xl" /> Google Pay</span>}>
                <p className="text-sm text-gray-500 pt-3">Confirm with your Google account on the next step.</p>
              </PayOption>
            </div>

            <button
              type="submit"
              disabled={!canPay}
              className="mt-5 w-full bg-wine-800 text-white font-bold py-3.5 rounded-xl hover:bg-wine-900 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {canPay ? `Pay £${total.toFixed(2)}` : "Verify age (18+) to pay"}
            </button>
            {!canPay && (
              <p className="text-xs text-amber-600 text-center mt-2">
                Payment is locked until you pass age verification and tick the 18+ declaration.
              </p>
            )}
            <p className="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
              <ShieldCheck size={12} /> Secure, encrypted payment · Discreet billing
            </p>
          </section>
        </form>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm sticky top-24">
            <h2 className="font-display font-bold text-base mb-4">Order Summary</h2>
            <ul className="space-y-3 mb-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 text-sm">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${product.gradient} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 line-clamp-1">{product.name}</p>
                    <p className="text-gray-500 text-xs">Qty: {quantity}</p>
                  </div>
                  <p className="font-semibold whitespace-nowrap">£{(product.price * quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>

            {/* Promo code */}
            <div className="border-t border-gray-100 pt-4">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                <Tag size={12} /> Promotion code
              </label>
              <div className="flex gap-2">
                <input value={promoInput} onChange={(e) => setPromoInput(e.target.value)} placeholder="e.g. WELCOME10"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blush-400" />
                <button type="button" onClick={applyPromo} className="px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700">Apply</button>
              </div>
              {promoMsg && <p className={`text-xs mt-1 ${promoPct ? "text-green-600" : "text-red-500"}`}>{promoMsg}</p>}
            </div>

            {/* Gift card */}
            <div className="pt-3">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                <Gift size={12} /> Gift card / voucher
              </label>
              <div className="flex gap-2">
                <input value={giftInput} onChange={(e) => setGiftInput(e.target.value)} placeholder="Enter voucher code"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blush-400" />
                <button type="button" onClick={applyGift} className="px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700">Apply</button>
              </div>
              {giftMsg && <p className={`text-xs mt-1 ${giftValue ? "text-green-600" : "text-red-500"}`}>{giftMsg}</p>}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-100 mt-4 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>£{totalPrice.toFixed(2)}</span></div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-green-600"><span>Promo discount</span><span>−£{promoDiscount.toFixed(2)}</span></div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>{shipping === 0 ? "FREE" : `£${shipping.toFixed(2)}`}</span>
              </div>
              {giftValue > 0 && (
                <div className="flex justify-between text-green-600"><span>Gift card</span><span>−£{giftValue.toFixed(2)}</span></div>
              )}
              {donation > 0 && (
                <div className="flex justify-between text-gray-600"><span>Donation (Cancer Research UK)</span><span>£{donation.toFixed(2)}</span></div>
              )}
              <div className="flex justify-between font-bold text-base border-t border-gray-100 pt-2 mt-2">
                <span>Total</span><span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PayOption({
  id, current, onSelect, title, children,
}: {
  id: PayMethod;
  current: PayMethod;
  onSelect: (m: PayMethod) => void;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  const selected = current === id;
  return (
    <div className={`border rounded-xl px-4 py-3 cursor-pointer transition-colors ${selected ? "border-blush-400 bg-blush-50/40" : "border-gray-200 hover:border-gray-300"}`}>
      <label className="flex items-center gap-3 cursor-pointer">
        <span className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${selected ? "border-blush-500" : "border-gray-300"}`}>
          {selected && <span className="w-2 h-2 rounded-full bg-blush-500" />}
        </span>
        <input type="radio" name="paymethod" checked={selected} onChange={() => onSelect(id)} className="sr-only" />
        {title}
      </label>
      {selected && children}
    </div>
  );
}
