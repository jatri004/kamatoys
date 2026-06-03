import { getProductsByCategory } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "For Men" };

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
        <SectionHeader title="All Men's Products" subtitle={`${products.length} products`} />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
