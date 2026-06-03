"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeFromCart, increment, decrement, totalPrice } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col animate-slide-in"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-display font-bold">Your Bag</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-black rounded-md"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag size={48} className="text-gray-200" />
              <p className="text-gray-500 text-sm">Your bag is empty</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="text-sm font-medium text-blush-500 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-3 py-3 border-b border-gray-50"
                >
                  {/* Placeholder image */}
                  <div
                    className={`w-16 h-16 rounded-lg bg-gradient-to-br ${product.gradient} flex-shrink-0`}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
                      {product.name}
                    </p>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      £{(product.price * quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decrement(product.id)}
                        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => increment(product.id)}
                        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="ml-auto text-xs text-gray-400 hover:text-red-500"
                        aria-label={`Remove ${product.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-5 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-gray-900">£{totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400">Shipping calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-black text-white text-sm font-semibold text-center py-3.5 rounded-lg hover:bg-gray-800"
            >
              Checkout — £{totalPrice.toFixed(2)}
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full border border-gray-200 text-gray-700 text-sm font-medium text-center py-3 rounded-lg hover:bg-gray-50"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
