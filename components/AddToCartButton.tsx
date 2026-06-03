"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3.5 rounded-xl transition-all ${
        added
          ? "bg-green-600 text-white"
          : "bg-black text-white hover:bg-gray-800"
      }`}
      aria-label={`Add ${product.name} to bag`}
    >
      {added ? (
        <>
          <Check size={18} /> Added to Bag
        </>
      ) : (
        <>
          <ShoppingBag size={18} /> Add to Bag
        </>
      )}
    </button>
  );
}
