import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority: _ }: Props) {
  return (
    <article className="group flex flex-col bg-cream rounded-3xl overflow-hidden shadow-card hover:shadow-soft transition-shadow duration-300">
      {/* Visual placeholder — swap gradient for <Image> when real photos exist */}
      <Link
        href={`/shop/${product.slug}`}
        className="block aspect-square relative overflow-hidden"
        aria-label={`View ${product.name}`}
        tabIndex={0}
      >
        <div
          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
          style={{ background: product.gradient }}
          role="img"
          aria-label={`${product.name} — colour swatch placeholder`}
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-cream/90 text-plum text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex-1">
          <p className="text-[11px] tracking-widest uppercase text-clay font-medium mb-1">
            {product.category}
          </p>
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-display text-lg text-plum leading-snug hover:text-clay transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-plum/60 mt-1 line-clamp-2">
            {product.tagline}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-plum">{formatPrice(product.price)}</p>
          <AddToCartButton product={product} compact />
        </div>
      </div>
    </article>
  );
}
