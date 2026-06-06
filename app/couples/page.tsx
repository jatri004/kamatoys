import { fetchProductsByCategory } from "@/lib/catalog";
import FilterableProductGrid from "@/components/FilterableProductGrid";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "For Couples" };

const couplesTypes = [
  { label: "Couples' Vibrator / C-Shaped Vibe", slug: "couples" },
  { label: "Vibrating Cock Ring / Erection Ring", slug: "ring" },
  { label: "App-Controlled / Long-Distance Toy", slug: "app-controlled" },
  { label: "Wearable Panty Vibrator", slug: "wearable" },
  { label: "Strap-On & Harness", slug: "strap-on" },
  { label: "Vibrating Love Egg", slug: "love-egg" },
  { label: "Massage Wand", slug: "wand" },
  { label: "Double-Ended Dildo", slug: "double-dildo" },
  { label: "Sex Furniture / Positioning Cushions", slug: "sex-furniture" },
  { label: "Blindfold & Soft Restraints", slug: "blindfold" },
  { label: "Butt Plug", slug: "butt-plug" },
  { label: "BDSM Starter Kit", slug: "bondage" },
  { label: "Anal Beads", slug: "anal-beads" },
  { label: "Nipple Clamps", slug: "nipple-clamps" },
  { label: "Sensory Feather / Tickler", slug: "tickler" },
  { label: "Massage Oils & Body-Safe Lubricants", slug: "lube" },
  { label: "Sex Machine", slug: "sex-machine" },
  { label: "Multi-Speed Bullet Vibrator", slug: "bullet" },
  { label: "Dual-Ended Stroker / Fleshlight", slug: "stroker" },
  { label: "Gag (Ball or Ring)", slug: "gag" },
];

export default async function CouplesPage() {
  const couplesProducts = await fetchProductsByCategory("couples");
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-rose-100 to-pink-200 py-14 text-center px-4">
        <p className="text-blush-600 text-xs font-bold uppercase tracking-widest mb-2">For Two</p>
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-3">Couples</h1>
        <p className="text-gray-700 max-w-md mx-auto text-sm">
          Explore pleasure together — from app-controlled toys to sensory play. Designed for connection and shared discovery.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader title="Couples' Collection" />
        <FilterableProductGrid products={couplesProducts} typeFilters={couplesTypes} />
      </div>
    </div>
  );
}
