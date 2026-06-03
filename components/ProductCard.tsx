"use client";

import Link from "next/link";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import type { Product } from "@/lib/products";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <article className="product-card group relative bg-white rounded-xl overflow-hidden border border-gray-100">
      {/* Image / gradient placeholder */}
      <Link href={`/product/${product.slug}`} aria-label={product.name}>
        <div
          className={`relative aspect-square bg-gradient-to-br ${product.gradient} overflow-hidden`}
        >
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {product.isSale && (
              <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                Sale {discount > 0 && `–${discount}%`}
              </span>
            )}
            {product.isNew && (
              <span className="bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                New
              </span>
            )}
            {product.isBestseller && !product.isSale && !product.isNew && (
              <span className="bg-blush-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                Bestseller
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Wishlist button */}
      <button
        onClick={() => toggle(product)}
        className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all ${
          wishlisted
            ? "bg-blush-500 text-white"
            : "bg-white/80 text-gray-400 hover:text-blush-500 hover:bg-white"
        }`}
        aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        aria-pressed={wishlisted}
      >
        <Heart size={15} fill={wishlisted ? "currentColor" : "none"} />
      </button>

      {/* Info */}
      <div className="p-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 leading-snug hover:text-blush-500 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <Star size={11} className="text-amber-400 fill-amber-400" />
          <span className="text-xs text-gray-500">
            {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-gray-900">
              £{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-800 active:scale-95"
            aria-label={`Add ${product.name} to bag`}
          >
            <ShoppingBag size={12} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
