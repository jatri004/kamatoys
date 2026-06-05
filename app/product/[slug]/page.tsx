import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { Star, Package, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const related = getRelatedProducts(product, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div>
          <div
            className={`aspect-square rounded-2xl bg-gradient-to-br ${product.gradient} w-full`}
            aria-label={`${product.name} product image`}
          />
          {/* Thumbnail row */}
          <div className="flex gap-3 mt-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-20 h-20 rounded-xl bg-gradient-to-br ${product.gradient} opacity-${i === 1 ? "100" : "40"} cursor-pointer border-2 ${i === 1 ? "border-blush-400" : "border-transparent"}`}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {product.isSale && (
              <span className="bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Sale — {discount}% off
              </span>
            )}
            {product.isNew && (
              <span className="bg-black text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                New Arrival
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-blush-50 text-blush-600 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Bestseller
              </span>
            )}
          </div>

          <h1 className="text-3xl font-display font-bold text-gray-900 leading-tight mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={15}
                  className={s <= Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating.toFixed(1)} · {product.reviewCount.toLocaleString()} reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">£{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  £{product.originalPrice.toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-red-500">
                  Save £{(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Features */}
          <ul className="space-y-1.5 mb-8">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blush-400 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <AddToCartButton product={product} />
            <WishlistButton product={product} />
          </div>

          {/* Trust */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Truck, text: "Free UK delivery over £40" },
              { icon: Package, text: "Discreet packaging, always" },
              { icon: ShieldCheck, text: "Secure checkout" },
              { icon: RotateCcw, text: "30-day returns" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
                <Icon size={14} className="text-blush-400 flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description box */}
      <section className="mt-12 lg:mt-16" aria-labelledby="description-heading">
        <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6 sm:p-8">
          <h2 id="description-heading" className="text-xl font-display font-bold text-gray-900 mb-4">
            Description
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-6">{product.description}</p>

          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">
            Product Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            {product.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blush-400 flex-shrink-0" />
                {f}
              </div>
            ))}
            {product.material && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blush-400 flex-shrink-0" />
                Material: {product.material}
              </div>
            )}
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blush-400 flex-shrink-0" />
                Sizes: {product.sizes.join(", ")}
              </div>
            )}
            {product.brand && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blush-400 flex-shrink-0" />
                Brand: {product.brand}
              </div>
            )}
          </div>

          <p className="mt-6 text-xs text-gray-400">
            Shipped in plain, discreet packaging. Bank statement shows &quot;KD Retail&quot;.
          </p>
        </div>
      </section>

      {/* Customers Also Viewed */}
      {related.length > 0 && (
        <section className="mt-16" aria-labelledby="related-heading">
          <SectionHeader
            title="Customers Also Viewed"
            subtitle="You might also like these"
            id="related-heading"
          />
          <ProductGrid products={related} columns={4} />
        </section>
      )}
    </div>
  );
}
