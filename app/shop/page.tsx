import { products, getSaleProducts, getNewArrivals, getBestsellers } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";

interface Props {
  searchParams: Promise<{ q?: string; filter?: string; cat?: string }>;
}

export const metadata = { title: "Shop All Products" };

export default async function ShopPage({ searchParams }: Props) {
  const { q, filter, cat } = await searchParams;

  let filtered = products;
  let heading = "All Products";
  let subtitle = `${products.length} products`;

  if (q) {
    const query = q.toLowerCase();
    filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query)) ||
        p.description.toLowerCase().includes(query)
    );
    heading = `Search: "${q}"`;
    subtitle = `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`;
  } else if (filter === "sale") {
    filtered = getSaleProducts();
    heading = "On Sale";
    subtitle = `${filtered.length} products on sale`;
  } else if (filter === "new") {
    filtered = getNewArrivals();
    heading = "New Arrivals";
    subtitle = `${filtered.length} new products`;
  } else if (filter === "bestseller") {
    filtered = getBestsellers();
    heading = "Bestsellers";
    subtitle = `${filtered.length} top-rated products`;
  } else if (cat) {
    filtered = products.filter((p) => p.category === cat || p.tags.includes(cat));
    heading = cat.charAt(0).toUpperCase() + cat.slice(1);
    subtitle = `${filtered.length} products`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader title={heading} subtitle={subtitle} />
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No products found.</p>
        </div>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  );
}
