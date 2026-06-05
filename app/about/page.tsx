import Image from "next/image";
import Link from "next/link";
import { Heart, Package, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us",
  description:
    "The KamaDesires.com story — a UK intimate-wellness brand built on inclusivity, discretion and body-positive expertise.",
};

const values = [
  { icon: Heart, title: "Inclusive by design", body: "Pleasure is for every body and every identity. Our range and guidance are made to welcome everyone." },
  { icon: Package, title: "Always discreet", body: "Plain packaging, a neutral billing name, and total confidentiality — every single order." },
  { icon: ShieldCheck, title: "Body-safe only", body: "We stock non-porous, body-safe materials and back them with honest, medically-informed advice." },
  { icon: Sparkles, title: "Shame-free", body: "No judgement, no awkwardness — just warm, expert help whenever you need it." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-wine-900 text-white py-16 text-center px-4">
        <Image
          src="/images/logo.png"
          alt="KamaDesires.com"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full mx-auto mb-5 ring-2 ring-gold-500/50"
        />
        <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">Our Story</p>
        <h1 className="text-4xl font-display font-bold mb-3">About KamaDesires.com</h1>
        <p className="text-wine-100/80 max-w-xl mx-auto text-sm leading-relaxed">
          Ultimate intimacy, beautifully and respectfully delivered.
        </p>
      </div>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 space-y-5">
          <p>
            KamaDesires.com began in 2021 in a small studio in Manchester, founded by two friends —
            <strong> Aria and Dev</strong> — who were tired of how the intimate-wellness world made people feel.
            Shops were either clinical and intimidating or crude and exclusionary. Nowhere felt warm,
            honest, or made for <em>everyone</em>.
          </p>
          <p>
            They started with a simple belief: that pleasure is a normal, healthy part of life, and that
            buying for it should feel as premium and shame-free as buying skincare. They named the brand
            after the Kama — the ancient idea of desire and pleasure as something to be understood and
            celebrated, not hidden away.
          </p>
          <p>
            The first KamaDesires range launched from a spare bedroom, packed by hand in plain boxes with a
            handwritten thank-you note in each one. Word spread quickly — not because of flashy marketing,
            but because customers finally felt <strong>seen</strong>. A trans customer wrote to say it was the
            first shop that stocked products for their body. A couple in their seventies thanked the team for
            advice that no one had ever offered them. Those letters are still pinned to the studio wall today.
          </p>
          <p>
            Today, KamaDesires.com is one of the UK&apos;s most inclusive intimate-wellness boutiques, serving
            thousands of customers a month with the same values it started with: tasteful, discreet, body-safe,
            and genuinely for everyone. We work only with brands that share our standards, and our education
            hub is written to be medically informed and judgement-free.
          </p>
          <p>
            We also believe in giving back. A portion of our profits supports cancer research, because wellbeing
            means looking after the whole person — not just the bedroom.
          </p>
          <p className="text-gray-500 italic">
            However you identify, whatever you&apos;re curious about — welcome. We&apos;re so glad you&apos;re here.
            <br />— Aria &amp; Dev, Founders
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-gray-900 text-center mb-10">What we stand for</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="w-11 h-11 bg-blush-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon size={20} className="text-blush-500" />
                </div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-center">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">Come explore with us</h2>
        <p className="text-gray-600 text-sm mb-6">
          Premium, inclusive, and always discreet. Find something you&apos;ll love.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-wine-800 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-wine-900"
        >
          Shop the Collection <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
