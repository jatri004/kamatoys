"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    { q: "Is my order delivered discreetly?", a: "Yes, always. Every order ships in a plain, unmarked box or padded envelope. The sender name is 'KT Retail Ltd.' with no indication of contents." },
    { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, and Klarna (buy now, pay later)." },
    { q: "How long does delivery take?", a: "Standard UK delivery is 3–5 business days. Express next-day delivery is available for orders placed before 2pm on working days." },
    { q: "Can I return an item?", a: "Yes — you have 30 days to return unused, sealed items in original packaging. For hygiene reasons, opened intimate products cannot be returned unless faulty." },
    { q: "Are your products body-safe?", a: "All products sold on KamaDesires.com are made from body-safe materials (medical-grade silicone, ABS plastic, borosilicate glass, stainless steel, or similar). We never sell products made from porous, toxic materials." },
    { q: "Do you offer a student discount?", a: "Yes! Students can get 15% off via UNiDAYS or Student Beans. Visit our Student Discount page to verify and get your code." },
    { q: "I forgot to apply a discount code — can you refund the difference?", a: "If your order was placed within the last 24 hours, contact us and we'll do our best to help. After that, we're unfortunately unable to apply discounts retrospectively." },
    { q: "How do I clean my toy?", a: "Cleaning instructions vary by material. Non-motorised silicone, glass, and stainless steel toys can be sterilised in boiling water or the top rack of a dishwasher. Battery or rechargeable toys should be cleaned with a toy cleaner or mild soap and water — never submerge the charging port." },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">FAQs</h1>
        <p className="text-gray-500 text-sm">Everything you need to know about shopping with KamaDesires.com.</p>
      </div>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between text-left px-5 py-4 font-medium text-gray-900 text-sm hover:bg-gray-50"
              aria-expanded={open === i}
            >
              {faq.q}
              <ChevronDown
                size={18}
                className={`flex-shrink-0 text-gray-400 transition-transform ml-4 ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
