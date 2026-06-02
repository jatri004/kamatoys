import type { Metadata } from "next";
import Link from "next/link";
import TrustMarquee from "@/components/TrustMarquee";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/products";

export const metadata: Metadata = {
  title: "Lumen — Intimate Wellness for Every Body",
  description:
    "Premium intimate wellness products. Body-safe materials, plain packaging, discreet shipping. Designed for all bodies, all orientations.",
};

const FEATURED_SLUGS = ["aurora-wand", "dusk-duo", "halo-kegel", "aria-vibe"];

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => FEATURED_SLUGS.includes(p.slug));

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-cream">
        {/* Background gradient blob */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(192,113,79,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 20% 80%, rgba(90,45,107,0.1) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid md:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div className="animate-fade-up">
            <p className="text-xs tracking-[0.3em] uppercase text-clay font-semibold mb-6">
              Intimate Wellness
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-plum leading-[1.05] mb-6">
              Pleasure,
              <br />
              <em className="not-italic text-clay">intentionally</em>
              <br />
              made.
            </h1>
            <p className="text-lg text-plum/65 leading-relaxed max-w-md mb-10">
              Lumen makes beautiful, body-safe wellness products for every body
              and every kind of intimacy. No assumptions, no shame — just honest
              pleasure, crafted with care.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="bg-plum text-cream px-8 py-4 rounded-2xl font-semibold text-sm hover:bg-plum-light transition-colors focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2"
              >
                Shop all products
              </Link>
              <Link
                href="/about"
                className="border border-plum/25 text-plum px-8 py-4 rounded-2xl font-semibold text-sm hover:bg-plum/5 transition-colors focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2"
              >
                Our story
              </Link>
            </div>
          </div>

          {/* Hero visual — abstract editorial arrangement */}
          <div
            className="hidden md:grid grid-cols-2 gap-4 animate-fade-up delay-200"
            aria-hidden="true"
          >
            {PRODUCTS.slice(0, 4).map((p, i) => (
              <div
                key={p.id}
                className={`rounded-3xl aspect-square ${i === 1 ? "mt-8" : ""} ${i === 3 ? "-mt-8" : ""}`}
                style={{ background: p.gradient }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST MARQUEE ────────────────────────────────────────────────── */}
      <TrustMarquee />

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="font-display text-4xl text-plum text-center mb-3">
          Shop by experience
        </h2>
        <p className="text-center text-plum/60 mb-12 max-w-xl mx-auto">
          We organise by sensation and intention, not by gender or anatomy.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => {
            const sample = PRODUCTS.find((p) => p.category === cat);
            const DESCRIPTIONS: Record<string, string> = {
              Solo: "For your own exploration",
              "For Two": "Shared experiences",
              Wellness: "Care-focused & therapeutic",
              Accessories: "Essentials & extras",
            };
            return (
              <Link
                key={cat}
                href={`/shop?c=${encodeURIComponent(cat)}`}
                className="group block rounded-3xl overflow-hidden relative aspect-[3/4] focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2"
                aria-label={`Shop ${cat} — ${DESCRIPTIONS[cat]}`}
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{ background: sample?.gradient ?? "#e8c4b8" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-cream">
                  <p className="font-display text-xl leading-tight">{cat}</p>
                  <p className="text-xs text-cream/70 mt-1">{DESCRIPTIONS[cat]}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section className="bg-cream-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-clay font-semibold mb-2">
                Curated
              </p>
              <h2 className="font-display text-4xl text-plum">
                Editor&apos;s picks
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-semibold text-plum underline underline-offset-4 hover:text-clay transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} priority />
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND VALUES ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <h2 className="font-display text-4xl text-plum text-center mb-16">
          Made differently.
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Body-neutral by design",
              body: "Our products are designed for sensation and pleasure, full stop. We use inclusive language throughout because your body is yours — it doesn't need a category.",
              icon: "◎",
            },
            {
              title: "Materials you can trust",
              body: "Every product in our range is made from platinum silicone, medical-grade ABS, or equivalent body-safe materials. No phthalates, no latex, no compromise.",
              icon: "✦",
            },
            {
              title: "Your privacy, protected",
              body: "Plain unbranded packaging, a discreet billing name, and no targeted ads. We're a wellness brand — not a data broker.",
              icon: "◈",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="bg-cream-dark rounded-3xl p-8 shadow-card"
            >
              <p
                className="text-3xl text-clay mb-5"
                aria-hidden="true"
              >
                {v.icon}
              </p>
              <h3 className="font-display text-2xl text-plum mb-3">
                {v.title}
              </h3>
              <p className="text-plum/65 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INCLUSIVE MISSION STRIP ──────────────────────────────────────── */}
      <section className="bg-plum text-cream py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-4xl md:text-5xl leading-tight mb-6">
            For every body.
            <br />
            Every orientation.
            <br />
            Every kind of intimacy.
          </p>
          <p className="text-cream/65 text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Pleasure is universal. We design products and language that reflect
            the full spectrum of human experience — solo, partnered, and
            everything in between.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-clay text-cream px-8 py-4 rounded-2xl font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Explore the range
          </Link>
        </div>
      </section>
    </>
  );
}
