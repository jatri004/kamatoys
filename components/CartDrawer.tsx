"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, setQuantity, subtotal, itemCount } =
    useCart();

  // Trap focus and handle Escape key
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 cart-overlay"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-cream shadow-2xl flex flex-col animate-slide-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-plum/10">
          <h2 className="font-display text-xl text-plum">
            Your Bag
            {itemCount > 0 && (
              <span className="ml-2 text-sm font-sans text-plum/50">
                ({itemCount} item{itemCount !== 1 ? "s" : ""})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-xl hover:bg-plum/5 text-plum transition-colors"
            aria-label="Close bag"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center text-plum/50">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                aria-hidden="true"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="font-display text-lg">Your bag is empty</p>
              <button
                onClick={closeCart}
                className="text-sm underline underline-offset-2 hover:text-clay transition-colors"
              >
                Continue browsing
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 py-4 border-b border-plum/8 last:border-0"
              >
                {/* Product colour swatch */}
                <div
                  className="w-16 h-16 rounded-2xl flex-shrink-0"
                  style={{ background: item.product.gradient }}
                  aria-hidden="true"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-display text-plum font-medium leading-snug truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-plum/50 mt-0.5">
                    {formatPrice(item.product.price)} each
                  </p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        setQuantity(item.product.id, item.quantity - 1)
                      }
                      aria-label={`Decrease quantity of ${item.product.name}`}
                      className="w-7 h-7 rounded-lg border border-plum/20 flex items-center justify-center text-plum hover:bg-plum/5 transition-colors text-sm"
                    >
                      −
                    </button>
                    <span
                      className="w-6 text-center text-sm font-medium text-plum"
                      aria-live="polite"
                      aria-label={`Quantity: ${item.quantity}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(item.product.id, item.quantity + 1)
                      }
                      aria-label={`Increase quantity of ${item.product.name}`}
                      className="w-7 h-7 rounded-lg border border-plum/20 flex items-center justify-center text-plum hover:bg-plum/5 transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Line total + remove */}
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm font-semibold text-plum">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    aria-label={`Remove ${item.product.name} from bag`}
                    className="text-xs text-plum/40 hover:text-clay transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer totals + CTA */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-plum/10 space-y-3">
            <div className="flex justify-between text-sm text-plum/70">
              <span>Subtotal</span>
              <span className="font-semibold text-plum">{subtotal}</span>
            </div>
            <p className="text-xs text-plum/40">
              Shipping calculated at checkout. Discreet billing.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-plum text-cream text-center font-semibold text-sm py-4 rounded-2xl hover:bg-plum-light transition-colors focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2"
            >
              Checkout — {subtotal}
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center text-sm text-plum/50 hover:text-plum py-2 transition-colors"
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
