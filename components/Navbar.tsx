"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import CartDrawer from "./CartDrawer";

const navLinks = [
  {
    label: "Shop",
    href: "/shop",
    dropdown: [
      { label: "Women", href: "/women" },
      { label: "Men", href: "/men" },
      { label: "LGBTQ+", href: "/lgbtq" },
      { label: "Couples", href: "/shop?cat=couples" },
      { label: "Sale", href: "/sale" },
      { label: "New Arrivals", href: "/shop?filter=new" },
    ],
  },
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "LGBTQ+", href: "/lgbtq" },
  { label: "Sale", href: "/sale" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Education", href: "/education" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Sticky header wrapper */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        {/* Main header row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 text-xl font-display font-bold tracking-tight text-black"
              aria-label="KamaToys home"
            >
              Kama<span className="text-blush-500">Toys</span>
            </Link>

            {/* Search — desktop */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-xl mx-auto relative"
            >
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full border border-gray-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-blush-400 focus:ring-2 focus:ring-blush-100"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blush-500"
                aria-label="Submit search"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Right icons */}
            <div className="flex items-center gap-1 ml-auto md:ml-0">
              <Link
                href="/account"
                className="p-2 text-gray-600 hover:text-blush-500 hidden sm:flex items-center"
                aria-label="Account"
              >
                <User size={20} />
              </Link>

              <Link
                href="/wishlist"
                className="p-2 text-gray-600 hover:text-blush-500 relative"
                aria-label={`Wishlist (${wishlistItems.length} items)`}
              >
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-blush-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="p-2 text-gray-600 hover:text-blush-500 relative"
                aria-label={`Cart (${totalItems} items)`}
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-gray-600 hover:text-black md:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <form
            onSubmit={handleSearch}
            className="md:hidden pb-3 relative"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-gray-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-blush-400"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-label="Submit search"
            >
              <Search size={16} />
            </button>
          </form>
        </div>

        {/* Desktop nav strip */}
        <nav
          className="hidden md:block border-t border-gray-100"
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex items-center gap-0">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.dropdown && setShopOpen(true)}
                  onMouseLeave={() => link.dropdown && setShopOpen(false)}
                >
                  {link.label === "Sale" ? (
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-4 py-3 text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      {link.label}
                    </Link>
                  ) : link.label === "LGBTQ+" ? (
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-4 py-3 text-sm font-medium rainbow-text hover:opacity-80"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-black"
                    >
                      {link.label}
                      {link.dropdown && <ChevronDown size={14} className="mt-0.5" />}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {link.dropdown && (
                    <div className="absolute top-full left-0 mt-0 w-44 bg-white border border-gray-100 shadow-lg rounded-b-lg rounded-tr-lg z-50 hidden group-hover:block">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blush-500 first:rounded-tr-lg last:rounded-b-lg"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <nav aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-6 py-3 text-sm font-medium border-b border-gray-50 ${
                      link.label === "Sale"
                        ? "text-red-600"
                        : link.label === "LGBTQ+"
                        ? "rainbow-text"
                        : "text-gray-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="bg-gray-50">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-10 py-2.5 text-sm text-gray-600 border-b border-gray-100 hover:text-blush-500"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
