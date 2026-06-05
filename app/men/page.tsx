import { getProductsByCategory } from "@/lib/products";
import FilterableProductGrid from "@/components/FilterableProductGrid";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "For Men" };

// Shop-by-type taxonomy for the Men section. Each links to the shop filter.
const menTypes = [
  { label: "Masturbation Sleeve / Stroker", slug: "stroker" },
  { label: "Couples' Ring / Cock Ring", slug: "ring" },
  { label: "Anal Toy / Butt Plug", slug: "butt-plug" },
  { label: "Prostate Massager", slug: "prostate" },
  { label: "Penis Sleeve / Extender", slug: "penis-sleeve" },
  { label: "Vibrator", slug: "vibrator" },
  { label: "Penis Pump / Vacuum Trainer", slug: "penis-pump" },
  { label: "Sex Doll", slug: "sex-doll" },
  { label: "Dildo", slug: "dildo" },
  { label: "Strap-On & Harness", slug: "strap-on" },
  { label: "Nipple Clamps", slug: "nipple-clamps" },
  { label: "Restraints (Cuffs, Straps, Ties)", slug: "restraints" },
  { label: "Blindfold / Mask", slug: "blindfold" },
  { label: "Sex Machine", slug: "sex-machine" },
  { label: "Flogger / Whip", slug: "flogger" },
  { label: "Paddle / Slapper", slug: "paddle" },
  { label: "Gag (Ball or Ring)", slug: "gag" },
  { label: "Electro-Stimulation (E-Stim) Device", slug: "e-stim" },
  { label: "Nipple / Breast Suction Pump", slug: "nipple-pump" },
  { label: "Urethral Sound / Insert", slug: "urethral-sound" },
];

export default function MenPage() {
  const products = getProductsByCategory("men");
  return (
    <div>
      <div className="bg-gradient-to-br from-slate-800 to-gray-900 py-14 text-center px-4 text-white">
        <p className="text-blush-400 text-xs font-bold uppercase tracking-widest mb-2">For Him</p>
        <h1 className="text-4xl font-display font-bold mb-3">Men</h1>
        <p className="text-gray-400 max-w-md mx-auto text-sm">
          Strokers, rings, prostate massagers and more. Premium, body-safe, and built for real pleasure.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader title="All Men's Products" />
        <FilterableProductGrid products={products} typeFilters={menTypes} />
      </div>
    </div>
  );
}
