import { getProductsByCategory } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "For Women" };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader title="All Women's Products" subtitle={`${products.length} products`} />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
