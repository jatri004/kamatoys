import { getProductsByCategory } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "LGBTQ+ Products" };

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
        <SectionHeader title="LGBTQ+ Collection" subtitle={`${products.length} products`} rainbow />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
