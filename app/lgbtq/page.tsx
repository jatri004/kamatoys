import { getProductsByCategory } from "@/lib/products";
import FilterableProductGrid from "@/components/FilterableProductGrid";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "LGBTQ+ Products" };

const lgbtqTypes = [
  { label: "Harness & Dildo System", slug: "strap-on" },
  { label: "FTM Stroker / Gender-Affirming Masturbator", slug: "ftm-stroker" },
  { label: "Pack-and-Play Dildo", slug: "packer" },
  { label: "Double-Ended Dildo", slug: "double-dildo" },
  { label: "Prostate Massager", slug: "prostate" },
  { label: "Butt Plug / Anal Toy", slug: "butt-plug" },
  { label: "Trans-Feminine / Pleasurable Dilator Set", slug: "dilator" },
  { label: "Hands-Free Clitoral Stimulator", slug: "clitoral" },
  { label: "Couples' Ring / Coaxial Ring", slug: "ring" },
  { label: "BDSM Restraints & Gear", slug: "bondage" },
  { label: "Vacuum Pump", slug: "vacuum-pump" },
  { label: "Air-Pulse / Suction Stimulator", slug: "suction" },
  { label: "Anal Beads / Rimming Plug", slug: "anal-beads" },
  { label: "Strap-On Jockstrap / Packing Underwear", slug: "packing-underwear" },
  { label: "Finger Vibrator / Finger Cot Sleeve", slug: "finger-vibrator" },
  { label: "Flexible / Double-Density Dildo", slug: "dildo" },
  { label: "Glass / Metal Dildo", slug: "glass-dildo" },
  { label: "Nipple Clamps & Breast Pumps", slug: "nipple-clamps" },
  { label: "Electro-Stimulation (E-Stim) Gear", slug: "e-stim" },
  { label: "Sex Machine / Automated Thrusting Device", slug: "sex-machine" },
];

export default function LGBTQPage() {
  const products = getProductsByCategory("lgbtq");
  return (
    <div>
      <div className="relative overflow-hidden py-14 text-center px-4">
        <div className="h-2 rainbow-gradient absolute top-0 left-0 right-0" />
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 absolute inset-0" />
        <div className="relative">
          <p className="rainbow-text text-xs font-bold uppercase tracking-widest mb-2">Celebrate every identity</p>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-3">LGBTQ+</h1>
          <p className="text-gray-600 max-w-md mx-auto text-sm">
            An inclusive, affirming range for all identities. Harnesses, packers, pride plugs, and more — designed for you.
          </p>
        </div>
        <div className="h-2 rainbow-gradient absolute bottom-0 left-0 right-0" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader title="LGBTQ+ Collection" rainbow />
        <FilterableProductGrid products={products} typeFilters={lgbtqTypes} />
      </div>
    </div>
  );
}
