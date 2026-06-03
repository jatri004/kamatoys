import { getSaleProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "Sale — Up to 40% Off" };

export default function SalePage() {
  const products = getSaleProducts();
  return (
    <div>
      <div className="relative overflow-hidden">
        <div className="h-2 rainbow-gradient" />
        <div className="bg-black py-14 text-center px-4 text-white">
          <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">Limited Time</p>
          <h1 className="text-4xl font-display font-bold mb-3">
            Up to <span className="rainbow-text">40% Off</span>
          </h1>
          <p className="text-gray-400 max-w-md mx-auto text-sm">
            Huge savings on our bestsellers. While stocks last — don't miss out.
          </p>
        </div>
        <div className="h-2 rainbow-gradient" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader title="Sale Items" subtitle={`${products.length} products on sale`} />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
