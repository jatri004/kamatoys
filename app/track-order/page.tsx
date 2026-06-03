"use client";

import { useState } from "react";
import { Search, Package } from "lucide-react";

export default function TrackOrderPage() {
  const [submitted, setSubmitted] = useState(false);
  const [orderNum, setOrderNum] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-blush-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package size={24} className="text-blush-500" />
        </div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Track Your Order</h1>
        <p className="text-gray-500 text-sm">Enter your order number and email to get live tracking updates.</p>
      </div>

      {submitted ? (
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <Package size={40} className="mx-auto mb-3 text-blush-400" />
          <h2 className="font-display font-bold text-lg text-gray-900 mb-1">Order {orderNum}</h2>
          <p className="text-sm text-gray-500 mb-4">Dispatched • Estimated delivery: 2–3 business days</p>
          <div className="flex items-center gap-2 justify-center">
            {["Placed", "Dispatched", "In Transit", "Delivered"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i <= 1 ? "bg-blush-500 text-white" : "bg-gray-200 text-gray-400"}`}>
                  {i + 1}
                </div>
                {i < 3 && <div className={`w-8 h-0.5 ${i < 1 ? "bg-blush-500" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-gray-400 flex justify-center gap-6">
            {["Placed", "Dispatched", "In Transit", "Delivered"].map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4"
        >
          <div>
            <label htmlFor="order-num" className="block text-sm font-medium text-gray-700 mb-1.5">
              Order Number
            </label>
            <input
              id="order-num"
              type="text"
              required
              value={orderNum}
              onChange={(e) => setOrderNum(e.target.value)}
              placeholder="e.g. KT-123456"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400"
            />
          </div>
          <div>
            <label htmlFor="track-email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              id="track-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="The email used when ordering"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-gray-800"
          >
            <Search size={16} /> Track Order
          </button>
        </form>
      )}
    </div>
  );
}
