import { fetchProductsByCategory } from "@/lib/catalog";
import FilterableProductGrid from "@/components/FilterableProductGrid";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "For Women" };

// Type taxonomy for the Women section — shown as the "Type" filter group.
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

export default async function WomenPage() {
  const products = await fetchProductsByCategory("women");
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader title="All Women's Products" />
        <FilterableProductGrid products={products} typeFilters={womenTypes} />
      </div>
    </div>
  );
}
