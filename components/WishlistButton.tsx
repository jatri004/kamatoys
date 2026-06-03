"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import type { Product } from "@/lib/products";

export default function WishlistButton({ product }: { product: Product }) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <button
      onClick={() => toggle(product)}
      className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all ${
        wishlisted
          ? "border-blush-500 bg-blush-50 text-blush-500"
          : "border-gray-200 text-gray-400 hover:border-blush-300 hover:text-blush-400"
      }`}
      aria-label={wishlisted ? `Remove from wishlist` : `Add to wishlist`}
      aria-pressed={wishlisted}
    >
      <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
    </button>
  );
}
