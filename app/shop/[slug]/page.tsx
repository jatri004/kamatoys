import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, getProductBySlug, getRelatedProducts, formatPrice } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

// Static params — pre-render all product pages at build time
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-plum/50">
        <ol className="flex gap-2 list-none m-0 p-0 flex-wrap">
          <li>
            <Link href="/" className="hover:text-clay transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/shop" className="hover:text-clay transition-colors">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/shop?c=${encodeURIComponent(product.category)}`}
              className="hover:text-clay transition-colors"
            >
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-plum" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Main product layout */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Visual */}
        <div
          className="rounded-3xl aspect-square w-full"
          style={{ background: product.gradient }}
          role="img"
          aria-label={`${product.name} product image placeholder`}
        />

        {/* Details */}
        <div className="md:sticky md:top-24">
          {product.badge && (
            <span className="inline-block bg-clay/15 text-clay text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
              {product.badge}
            </span>
          )}

          <p className="text-xs tracking-[0.3em] uppercase text-clay font-semibold mb-2">
            {product.category}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-plum mb-3">
            {product.name}
          </h1>
          <p className="text-xl text-plum/60 mb-6">{product.tagline}</p>

          <p className="text-3xl font-display font-semibold text-plum mb-8">
            {formatPrice(product.price)}
          </p>

          {/* CTA — sticky via layout position */}
          <div className="mb-8">
            <AddToCartButton product={product} />
            <p className="text-xs text-plum/40 mt-3 text-center">
              Plain packaging · Discreet billing · Free returns
            </p>
          </div>

          {/* Description */}
          <div className="border-t border-plum/10 pt-6 mb-6">
            <h2 className="font-display text-lg text-plum mb-3">About</h2>
            <p className="text-plum/70 leading-relaxed">{product.description}</p>
            {product.bodyNeutralNote && (
              <p className="mt-3 text-sm bg-blush/40 text-plum rounded-2xl px-4 py-3">
                {product.bodyNeutralNote}
              </p>
            )}
          </div>

          {/* Specs */}
          <div className="border-t border-plum/10 pt-6 mb-6">
            <h2 className="font-display text-lg text-plum mb-4">
              Specifications
            </h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                { label: "Materials", value: product.materials },
                { label: "Size", value: product.dimensions },
                ...(product.chargingTime !== "N/A"
                  ? [{ label: "Charge time", value: product.chargingTime }]
                  : []),
              ].map(({ label, value }) => (
                <div key={label} className="col-span-2 sm:col-span-1">
                  <dt className="text-plum/40 text-xs tracking-wide uppercase mb-0.5">
                    {label}
                  </dt>
                  <dd className="text-plum">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Features */}
          <div className="border-t border-plum/10 pt-6">
            <h2 className="font-display text-lg text-plum mb-4">Features</h2>
            <ul className="space-y-2 list-none m-0 p-0">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-plum/70">
                  <span className="text-clay text-xs" aria-hidden="true">
                    ✦
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl text-plum mb-8">
            You might also like
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
