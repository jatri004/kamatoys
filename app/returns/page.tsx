"use client";

import { useState } from "react";
import { RotateCcw, CheckCircle } from "lucide-react";

export default function ReturnsPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-blush-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <RotateCcw size={24} className="text-blush-500" />
        </div>
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Returns & Refunds</h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Not happy? We'll make it right. Our 30-day hassle-free returns policy is designed to keep you confident.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Policy */}
        <div className="prose prose-sm text-gray-600 space-y-4">
          <h2 className="text-lg font-display font-bold text-gray-900">Our Policy</h2>
          <p>You have <strong>30 days</strong> from the date of delivery to return most items for a full refund or exchange.</p>

          <h3 className="font-semibold text-gray-800 mt-4">Eligible for return:</h3>
          <ul className="list-disc pl-4 space-y-1">
            <li>Unused, sealed items in original packaging</li>
            <li>Faulty or damaged products (any condition)</li>
            <li>Wrong item received</li>
          </ul>

          <h3 className="font-semibold text-gray-800 mt-4">Not eligible:</h3>
          <ul className="list-disc pl-4 space-y-1">
            <li>Opened or used intimate products (for hygiene reasons)</li>
            <li>Digital gift cards</li>
            <li>Items returned after 30 days without prior agreement</li>
          </ul>

          <h3 className="font-semibold text-gray-800 mt-4">Faulty items</h3>
          <p>If your item is faulty, we'll cover the return postage and offer a full refund or free replacement — no questions asked.</p>

          <h3 className="font-semibold text-gray-800 mt-4">Refunds</h3>
          <p>Refunds are processed within 5–7 business days of receiving your return, back to your original payment method.</p>
        </div>

        {/* Form */}
        <div>
          <h2 className="text-lg font-display font-bold text-gray-900 mb-5">Request a Return</h2>
          {sent ? (
            <div className="bg-green-50 rounded-2xl p-8 text-center">
              <CheckCircle size={40} className="mx-auto text-green-500 mb-3" />
              <p className="font-semibold text-gray-900">Return Requested</p>
              <p className="text-sm text-gray-500 mt-1">We'll email you a prepaid return label within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ret-order">Order Number</label>
                <input id="ret-order" type="text" required placeholder="KT-123456" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ret-email">Email Address</label>
                <input id="ret-email" type="email" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ret-reason">Reason for Return</label>
                <select id="ret-reason" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400 bg-white">
                  <option>Changed my mind</option>
                  <option>Item faulty / not working</option>
                  <option>Wrong item received</option>
                  <option>Item damaged in transit</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="ret-details">Additional details</label>
                <textarea id="ret-details" rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred resolution</label>
                <div className="flex gap-3">
                  {["Refund", "Exchange"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="resolution" value={opt} defaultChecked={opt === "Refund"} className="accent-blush-500" />
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-gray-800">
                Submit Return Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
