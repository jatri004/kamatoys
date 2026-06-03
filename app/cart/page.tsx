"use client";

import Link from "next/link";
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, removeFromCart, increment, decrement, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={56} className="mx-auto mb-4 text-gray-200" />
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">Your bag is empty</h1>
        <p className="text-gray-500 text-sm mb-6">Add something you love to get started.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-black text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-800"
        >
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const shipping = totalPrice >= 40 ? 0 : 3.99;
  const orderTotal = totalPrice + shipping;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Your Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
            >
              <div
                className={`w-20 h-20 rounded-lg bg-gradient-to-br ${product.gradient} flex-shrink-0`}
              />
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${product.slug}`}
                  className="text-sm font-medium text-gray-900 hover:text-blush-500 line-clamp-2"
                >
                  {product.name}
                </Link>
                <p className="text-base font-bold mt-1">
                  £{(product.price * quantity).toFixed(2)}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decrement(product.id)}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => increment(product.id)}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400"
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="ml-auto text-gray-300 hover:text-red-400"
                    aria-label={`Remove ${product.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-sm text-gray-400 hover:text-red-500 mt-2"
          >
            Clear bag
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-display font-bold mb-5">Order Summary</h2>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">£{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>
                  {shipping === 0 ? "FREE" : `£${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">
                  Add £{(40 - totalPrice).toFixed(2)} more for free shipping
                </p>
              )}
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-base mb-5">
              <span>Total</span>
              <span>£{orderTotal.toFixed(2)}</span>
            </div>

            {/* Promo */}
            <div className="flex gap-2 mb-5">
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blush-400"
              />
              <button className="px-3 py-2 bg-gray-100 text-sm font-medium rounded-lg hover:bg-gray-200">
                Apply
              </button>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-black text-white text-sm font-semibold text-center py-3.5 rounded-xl hover:bg-gray-800"
            >
              Checkout — £{orderTotal.toFixed(2)}
            </Link>
            <Link
              href="/shop"
              className="block text-center text-sm text-gray-500 hover:text-gray-700 mt-3"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
