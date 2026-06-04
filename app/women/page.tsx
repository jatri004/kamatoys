import Link from "next/link";
import { getProductsByCategory } from "@/lib/products";
import FilterableProductGrid from "@/components/FilterableProductGrid";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "For Women" };

// Shop-by-type taxonomy for the Women section. Each links to the shop filter.
const womenTypes = [
  { label: "Vibrator", slug: "vibrator" },
  { label: "Dildo", slug: "dildo" },
  { label: "Air-Pulse / Suction Stimulator", slug: "suction" },
  { label: "Masturbation Sleeve / Stroker", slug: "stroker" },
  { label: "Butt Plug", slug: "butt-plug" },
  { label: "Couples' Ring / Cock Ring", slug: "ring" },
  { label: "Wearable / Panty Toy", slug: "wearable" },
  { label: "Ben Wa / Pelvic Floor Balls", slug: "kegel" },
  { label: "Anal Beads", slug: "anal-beads" },
  { label: "Strap-On & Harness", slug: "strap-on" },
  { label: "Nipple Clamps", slug: "nipple-clamps" },
  { label: "Restraints (Cuffs, Straps, Ties)", slug: "restraints" },
  { label: "Blindfold / Mask", slug: "blindfold" },
  { label: "Sex Machine", slug: "sex-machine" },
  { label: "Prostate Massager", slug: "prostate" },
  { label: "Flogger / Whip", slug: "flogger" },
  { label: "Paddle / Slapper", slug: "paddle" },
  { label: "Gag (Ball or Ring)", slug: "gag" },
  { label: "Nipple / Breast Suction Pump", slug: "nipple-pump" },
  { label: "Electro-Stimulation (E-Stim) Device", slug: "e-stim" },
];

export default function WomenPage() {
  const products = getProductsByCategory("women");
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-100 py-14 text-center px-4">
        <p className="text-blush-500 text-xs font-bold uppercase tracking-widest mb-2">For Her</p>
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-3">Women</h1>
        <p className="text-gray-600 max-w-md mx-auto text-sm">
          From whisper-quiet vibrators to powerful wands — every body deserves pleasure, on its own terms.
        </p>
      </div>

      {/* Shop by Type */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10"
        aria-labelledby="women-types-heading"
      >
        <h2
          id="women-types-heading"
          className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4"
        >
          Shop by Type
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {womenTypes.map((t) => (
            <Link
              key={t.slug}
              href={`/shop?cat=${t.slug}`}
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:border-blush-400 hover:bg-blush-50 hover:text-blush-600 transition-colors"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader title="All Women's Products" />
        <FilterableProductGrid products={products} />
      </div>
    </div>
  );
}
