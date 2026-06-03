"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import ProductGrid from "@/components/ProductGrid";

export default function WishlistPage() {
  const { items, toggle } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Heart size={24} className="text-blush-500" />
        <h1 className="text-3xl font-display font-bold text-gray-900">
          Wishlist
        </h1>
        {items.length > 0 && (
          <span className="ml-2 bg-blush-100 text-blush-600 text-sm font-semibold px-3 py-1 rounded-full">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <Heart size={56} className="mx-auto mb-4 text-gray-200" />
          <p className="text-lg font-medium text-gray-500 mb-2">Your wishlist is empty</p>
          <p className="text-sm mb-6">Save products you love by tapping the heart icon.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-black text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-800"
          >
            <ShoppingBag size={16} /> Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => {
                items.forEach((p) => addToCart(p));
              }}
              className="flex items-center gap-2 bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800"
            >
              <ShoppingBag size={15} /> Add All to Bag
            </button>
          </div>
          <ProductGrid products={items} />
        </>
      )}
    </div>
  );
}
