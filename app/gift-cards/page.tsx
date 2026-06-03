"use client";

import { useState } from "react";
import { Gift, ArrowRight } from "lucide-react";

const denominations = [10, 25, 50, 75, 100, 150];

export default function GiftCardsPage() {
  const [selected, setSelected] = useState<number | null>(50);
  const [custom, setCustom] = useState("");
  const [message, setMessage] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  const finalAmount = custom ? parseFloat(custom) : selected;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-blush-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift size={28} className="text-blush-500" />
        </div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Gift Cards</h1>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          The perfect gift — let someone choose exactly what they want. Delivered discreetly by email.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-6">
        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select amount</label>
          <div className="grid grid-cols-3 gap-3">
            {denominations.map((d) => (
              <button
                key={d}
                onClick={() => { setSelected(d); setCustom(""); }}
                className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                  selected === d && !custom
                    ? "border-blush-500 bg-blush-50 text-blush-600"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                £{d}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <input
              type="number"
              min={5}
              max={500}
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
              placeholder="Or enter custom amount (£5–£500)"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400"
            />
          </div>
        </div>

        {/* Recipient email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="recipient-email">
            Recipient email
          </label>
          <input
            id="recipient-email"
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="their@email.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400"
          />
        </div>

        {/* Personal message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="gift-message">
            Personal message <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            id="gift-message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a personal note..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400 resize-none"
          />
        </div>

        <button
          type="button"
          disabled={!finalAmount || !recipientEmail}
          className="w-full flex items-center justify-center gap-2 bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Buy £{finalAmount ?? "?"} Gift Card <ArrowRight size={16} />
        </button>

        <p className="text-xs text-gray-400 text-center">
          Gift cards are delivered by email and never expire. Redeemable on kamatoys.com.
        </p>
      </div>
    </div>
  );
}
