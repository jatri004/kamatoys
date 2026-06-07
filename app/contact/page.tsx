"use client";

import { useState } from "react";
import { Mail, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
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
          <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blush-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-blush-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Email Us</p>
                <p className="text-sm text-gray-600 mt-0.5">hello@kamadesires.com</p>
                <p className="text-xs text-gray-400 mt-1">We reply within 24 hours on business days.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blush-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-blush-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Hours</p>
                <p className="text-sm text-gray-600 mt-0.5">Monday – Friday: 9:00am – 5:00pm</p>
                <p className="text-sm text-gray-600">Weekends: Email only</p>
              </div>
            </div>
          </div>

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
                  <input id="first-name" type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                  <input id="last-name" type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input id="email" type="email" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
              </div>
              <div>
                <label htmlFor="order-number" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Order Number <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input id="order-number" type="text" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" placeholder="KT-" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <select id="subject" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400 bg-white">
                  <option>Order Query</option>
                  <option>Delivery Issue</option>
                  <option>Return Request</option>
                  <option>Product Question</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea id="message" rows={5} required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400 resize-none" />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-gray-800"
              >
                <Send size={16} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
