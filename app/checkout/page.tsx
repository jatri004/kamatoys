"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { ShieldCheck, Lock } from "lucide-react";
import Link from "next/link";

const steps = ["Contact", "Shipping", "Payment"];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);

  const shipping = totalPrice >= 40 ? 0 : 3.99;
  const total = totalPrice + shipping;

  if (placed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={28} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for your order. You'll receive a confirmation email shortly. Your order will arrive in a plain, discreet package.
        </p>
        <Link href="/" className="inline-block bg-black text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-gray-500 mb-4">Your bag is empty.</p>
        <Link href="/shop" className="text-blush-500 hover:underline font-medium">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 text-sm font-medium ${
                i === step ? "text-black" : i < step ? "text-blush-500" : "text-gray-300"
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                i === step ? "bg-black text-white" : i < step ? "bg-blush-500 text-white" : "bg-gray-200 text-gray-400"
              }`}>{i + 1}</span>
              {s}
            </button>
            {i < steps.length - 1 && <span className="text-gray-200 mx-1">→</span>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form area */}
        <div className="lg:col-span-2">
          {step === 0 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="font-display font-bold text-lg">Contact Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                  <input type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                  <input type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone (optional)</label>
                <input type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
              </div>
              <button onClick={() => setStep(1)} className="w-full bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-gray-800">
                Continue to Shipping
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="font-display font-bold text-lg">Shipping Address</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line 1</label>
                <input type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line 2</label>
                <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                  <input type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Postcode</label>
                  <input type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setStep(0)} className="border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 text-sm">
                  ← Back
                </button>
                <button onClick={() => setStep(2)} className="bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 text-sm">
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-display font-bold text-lg">Payment</h2>
                <Lock size={14} className="text-gray-400" />
                <span className="text-xs text-gray-400">SSL Encrypted</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400 font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry</label>
                  <input type="text" placeholder="MM / YY" maxLength={7} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400 font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">CVC</label>
                  <input type="text" placeholder="123" maxLength={4} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400 font-mono" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name on Card</label>
                <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button onClick={() => setStep(1)} className="border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 text-sm">
                  ← Back
                </button>
                <button
                  onClick={() => { clearCart(); setPlaced(true); }}
                  className="bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 text-sm"
                >
                  Pay £{total.toFixed(2)}
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck size={12} /> Your payment is secure and encrypted
              </p>
            </div>
          )}
        </div>

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
            <div className="border-t border-gray-100 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span><span>£{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>{shipping === 0 ? "FREE" : `£${shipping.toFixed(2)}`}</span>
              </div>
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
