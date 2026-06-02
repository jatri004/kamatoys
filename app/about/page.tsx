import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Lumen was founded on a simple belief: intimate wellness deserves the same care, craft, and honesty as any other category of health.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero */}
      <div className="max-w-3xl mb-20 animate-fade-up">
        <p className="text-xs tracking-[0.3em] uppercase text-clay font-semibold mb-4">
          Our story
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-plum leading-tight mb-6">
          Pleasure deserves
          <br />
          better design.
        </h1>
        <p className="text-xl text-plum/65 leading-relaxed">
          Lumen was founded on a simple belief: intimate wellness deserves the
          same care, craft, and honesty as any other part of a healthy life.
        </p>
      </div>

      {/* Story sections */}
      <div className="grid md:grid-cols-2 gap-16 mb-20">
        <div>
          <div
            className="rounded-3xl aspect-video mb-8"
            style={{
              background:
                "linear-gradient(135deg, #e8c4b8 0%, #c0714f 50%, #2e1235 100%)",
            }}
            role="img"
            aria-label="Lumen studio — editorial image placeholder"
          />
          <h2 className="font-display text-2xl text-plum mb-3">
            Where we started
          </h2>
          <p className="text-plum/65 leading-relaxed">
            Lumen began in 2022 when our founders — frustrated by a market full
            of either clinical sterility or juvenile novelty — set out to make
            something different. Products that felt like wellness objects because
            they <em>are</em> wellness objects.
          </p>
        </div>

        <div className="md:pt-16">
          <div
            className="rounded-3xl aspect-video mb-8"
            style={{
              background:
                "linear-gradient(135deg, #2e1235 0%, #5a2d6b 50%, #e8c4b8 100%)",
            }}
            role="img"
            aria-label="Lumen product design — editorial image placeholder"
          />
          <h2 className="font-display text-2xl text-plum mb-3">
            How we think about design
          </h2>
          <p className="text-plum/65 leading-relaxed">
            Every product starts with the question: who is this <em>actually</em>{" "}
            for? Our answer is always the same — everyone. We design for bodies,
            not for demographics. We write for people, not for assumed genders.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-plum rounded-3xl p-10 md:p-16 text-cream mb-20">
        <h2 className="font-display text-3xl md:text-4xl mb-10">
          What we stand for
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Inclusivity, not performance",
              body: "We use gender-neutral language and body-neutral framing because it's the right thing to do — not as a marketing tick-box.",
            },
            {
              title: "Safety as non-negotiable",
              body: "Every material we use is body-safe and tested. No phthalates, no mystery polymers, no compromise for cost.",
            },
            {
              title: "Discretion by default",
              body: "From plain packaging to neutral billing to no re-targeting ads — your privacy is designed in, not bolted on.",
            },
            {
              title: "Honest education",
              body: "We provide plain-language guidance on materials, sizing, and use — because good information leads to better experiences.",
            },
          ].map((v) => (
            <div key={v.title}>
              <h3 className="font-display text-xl mb-2">{v.title}</h3>
              <p className="text-cream/65 leading-relaxed text-sm">{v.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-plum/60 mb-6 text-lg">
          Ready to explore what we make?
        </p>
        <Link
          href="/shop"
          className="inline-block bg-plum text-cream px-10 py-4 rounded-2xl font-semibold text-sm hover:bg-plum-light transition-colors"
        >
          Shop the range
        </Link>
      </div>
    </div>
  );
}
