import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about shipping, discretion, returns, materials, and how to choose the right product for you.",
};

const FAQS = [
  {
    section: "Shipping & Discretion",
    id: "shipping",
    items: [
      {
        q: "How is my order packaged?",
        a: "All orders ship in plain, unbranded brown or white cardboard boxes with no external markings indicating the contents. The sender name on the label is 'LMN Wellness Ltd'.",
      },
      {
        q: "What will appear on my bank statement?",
        a: "Your statement will show 'LMN Wellness Ltd' — not the Lumen brand name or any indication of the product category.",
      },
      {
        q: "How long does delivery take?",
        a: "Standard UK delivery takes 2–4 business days. Express next-day delivery is available at checkout (order before 1pm). International delivery times vary by destination.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes — we ship to the UK, EU, North America, and Australia. Customs declarations list contents as 'personal care device'.",
      },
    ],
  },
  {
    section: "Returns & Warranty",
    id: "returns",
    items: [
      {
        q: "What is your return policy?",
        a: "You can return any unused, sealed product within 30 days of delivery for a full refund. For hygiene reasons we cannot accept returns of opened products unless they are faulty. Contact us and we'll arrange a discreet pre-paid returns label.",
      },
      {
        q: "What if my product is faulty?",
        a: "All Lumen products carry a 2-year warranty. If a product is defective, contact us with your order number and a brief description. We'll send a replacement promptly, no questions asked.",
      },
    ],
  },
  {
    section: "Materials & Safety",
    id: "materials",
    items: [
      {
        q: "What materials does Lumen use?",
        a: "We use platinum-cured silicone, ABS plastic, and medical-grade materials across our range. All products are phthalate-free, latex-free, and BPA-free. Material specifications are listed on each product page.",
      },
      {
        q: "Are Lumen products body-safe?",
        a: "Yes. We exclusively use non-porous, non-toxic materials that can be thoroughly cleaned. Platinum silicone is the gold standard for body-contact products and is what most of our vibrators use.",
      },
      {
        q: "How do I clean my product?",
        a: "Silicone and ABS products can be cleaned with warm water and mild soap, or a dedicated toy cleaner. Fully waterproof products (marked IPX7) can be rinsed under running water. Never submerge non-waterproof items or use alcohol-based cleaners on silicone.",
      },
      {
        q: "Is Lumen Glide lubricant compatible with silicone products?",
        a: "Yes — Lumen Glide is water-based and fully compatible with all silicone, latex, and polyurethane products. Avoid silicone-based lubricants on silicone toys as they can degrade the surface over time.",
      },
    ],
  },
  {
    section: "Choosing a Product",
    id: "choosing",
    items: [
      {
        q: "How do I know which product is right for me?",
        a: "Browse by experience rather than anatomy — our Solo, For Two, Wellness, and Accessories categories describe what the product is designed for, not who it's designed for. Every product page includes a plain-language description of the type of sensation and use case. If you're unsure, start with Aurora Wand (broad external vibration) or Aria (gentle beginner-friendly vibration).",
      },
      {
        q: "I've never bought a product like this before — where do I start?",
        a: "Aria is our recommended starting point — it's small, quiet, and has five settings from very gentle to satisfying. Aurora Wand is ideal if you want more power and breadth of sensation. Both are beginner-friendly and fully waterproof.",
      },
      {
        q: "Are your products suitable for everyone?",
        a: "Yes — Lumen products are designed without assumptions about gender, anatomy, or orientation. Each product page includes a short note about the type of experience it's best suited to, so you can choose based on sensation rather than category.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-clay font-semibold mb-3">
          Help
        </p>
        <h1 className="font-display text-5xl text-plum mb-4">
          Frequently asked questions
        </h1>
        <p className="text-plum/60">
          Can&apos;t find what you need?{" "}
          <Link href="mailto:hello@lumenwellness.co" className="underline underline-offset-2 hover:text-clay transition-colors">
            Email us
          </Link>{" "}
          — we&apos;re friendly.
        </p>
      </div>

      <div className="space-y-14">
        {FAQS.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="font-display text-2xl text-plum mb-6">
              {section.section}
            </h2>
            <dl className="space-y-6">
              {section.items.map((item) => (
                <div
                  key={item.q}
                  className="bg-cream-dark rounded-2xl px-6 py-5"
                >
                  <dt className="font-semibold text-plum mb-2">{item.q}</dt>
                  <dd className="text-plum/65 leading-relaxed text-sm">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      {/* Still have questions */}
      <div className="mt-16 bg-plum rounded-3xl p-8 text-cream text-center">
        <h2 className="font-display text-2xl mb-3">Still have questions?</h2>
        <p className="text-cream/65 mb-6 text-sm">
          Our team responds within one business day. All correspondence is
          handled with full discretion.
        </p>
        <a
          href="mailto:hello@lumenwellness.co"
          className="inline-block bg-cream text-plum px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-blush transition-colors"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}
