"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: data.get("first-name"),
      lastName: data.get("last-name"),
      email: data.get("email"),
      orderNumber: data.get("order-number"),
      subject: data.get("subject"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        // TEMP DEBUG: show the server's error detail on screen for diagnosis.
        const info = await res.json().catch(() => ({}));
        const debug = [info.error, info.detail].filter(Boolean).join(" — ");
        throw new Error(debug || `Request failed (${res.status})`);
      }
      setSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        `Sorry, your message couldn't be sent. Please try again or email us directly.${msg ? ` [debug: ${msg}]` : ""}`
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-500 text-sm">
          Questions, feedback, or need help with an order? We're here for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Info */}
        <div className="space-y-6">
          <p className="text-xs text-gray-400 px-1">
            All communications are treated with complete discretion. Billing statements and packages carry no identifying brand marks.
          </p>
        </div>

        {/* Form */}
        <div>
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <CheckCircle size={48} className="text-green-500 mb-4" />
              <h2 className="text-xl font-display font-bold text-gray-900 mb-2">Message Sent!</h2>
              <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                  <input id="first-name" name="first-name" type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                  <input id="last-name" name="last-name" type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input id="email" name="email" type="email" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
              </div>
              <div>
                <label htmlFor="order-number" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Order Number <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input id="order-number" name="order-number" type="text" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" placeholder="KT-" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <select id="subject" name="subject" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400 bg-white">
                  <option>Order Query</option>
                  <option>Delivery Issue</option>
                  <option>Return Request</option>
                  <option>Product Question</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea id="message" name="message" rows={5} required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400 resize-none" />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={16} /> {sending ? "Sending…" : "Send Message"}
              </button>
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
