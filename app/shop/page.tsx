import type { Metadata } from "next";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import type { Category } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse all Lumen intimate wellness products. Shop by experience — Solo, For Two, Wellness, and Accessories.",
};

interface Props {
  searchParams: Promise<{ c?: string; sort?: string }>;
}

export default async function ShopPage({ searchParams }: Props) {
  const { c, sort: rawSort } = await searchParams;
  const activeCategory = c as Category | undefined;
  const sort = rawSort ?? "default";

  let products = activeCategory
    ? PRODUCTS.filter((p) => p.category === activeCategory)
    : PRODUCTS;

  if (sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products = [...products].sort((a, b) => b.price - a.price);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-clay font-semibold mb-2">
          {activeCategory ?? "All products"}
        </p>
        <h1 className="font-display text-5xl text-plum">
          {activeCategory ?? "Shop"}
        </h1>
        {!activeCategory && (
          <p className="text-plum/60 mt-3 max-w-xl">
            Everything we make is body-safe, body-neutral, and built to last.
            Browse by experience below.
          </p>
        )}
      </div>

      {/* Filters + sort — client component handles ?c= */}
      <CategoryFilter
        categories={CATEGORIES}
        active={activeCategory}
        currentSort={sort}
      />

      {/* Grid */}
      {products.length === 0 ? (
        <p className="text-plum/50 py-16 text-center">
          No products found in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
