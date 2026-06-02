"use client";

import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { useState } from "react";

interface Props {
  product: Product;
  compact?: boolean;
}

export default function AddToCartButton({ product, compact = false }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  if (compact) {
    return (
      <button
        onClick={handleAdd}
        aria-label={`Add ${product.name} to bag`}
        className="flex-shrink-0 bg-plum text-cream text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-plum-light active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2"
      >
        {added ? "Added ✓" : "Add"}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-plum text-cream font-semibold text-sm py-4 rounded-2xl hover:bg-plum-light active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2"
    >
      {added ? "Added to bag ✓" : "Add to bag"}
    </button>
  );
}
