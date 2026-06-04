"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
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

const shopDropdown = [
  // Shop by person
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "LGBTQ+", href: "/lgbtq" },
  { label: "Couples", href: "/shop?cat=couples" },
  // Shop by toy type
  { label: "Vibrators", href: "/shop?cat=vibrator" },
  { label: "Luxury Vibrators", href: "/shop?cat=luxury" },
  { label: "Dildos", href: "/shop?cat=dildo" },
  { label: "Butt Plugs", href: "/shop?cat=butt-plug" },
  { label: "Strap-Ons & Harnesses", href: "/shop?cat=strap-on" },
  { label: "Thrusting Toys", href: "/shop?cat=thrusting" },
  { label: "Grinders", href: "/shop?cat=grinder" },
  { label: "App / Remote Controlled", href: "/shop?cat=app-controlled" },
  { label: "Prostate Massagers", href: "/shop?cat=prostate" },
  { label: "Strokers", href: "/shop?cat=stroker" },
  { label: "Bondage & BDSM", href: "/shop?cat=bondage" },
  { label: "Kegel & Wellness", href: "/shop?cat=kegel" },
  { label: "Lube", href: "/shop?cat=lube" },
  { label: "Condoms", href: "/shop?cat=condoms" },
  { label: "Clothing & Lingerie", href: "/shop?cat=clothing" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Sale", href: "/sale" },
  { label: "New Arrivals", href: "/shop?filter=new" },
];

const navLinks = [
  { label: "Shop", href: "/shop", dropdown: shopDropdown },
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "LGBTQ+", href: "/lgbtq" },
  { label: "Sale", href: "/sale" },
  { label: "Condoms", href: "/shop?cat=condoms" },
  { label: "Clothing", href: "/shop?cat=clothing" },
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

  // Rotating faded search suggestions
  const searchSuggestions = [
    "strap-on",
    "dildos",
    "vibrators",
    "butt plugs",
    "lube",
    "bondage",
  ];
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSuggestionIndex((i) => (i + 1) % searchSuggestions.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [searchSuggestions.length]);

  const searchPlaceholder = `Search "${searchSuggestions[suggestionIndex]}"...`;

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
              className="flex-shrink-0 flex items-center gap-2"
              aria-label="KamaDesires.com home"
            >
              <Image
                src="/images/logo.png"
                alt="KamaDesires.com"
                width={40}
                height={40}
                priority
                className="w-10 h-10 rounded-full ring-1 ring-gold-400/50"
              />
              <span className="text-xl font-display font-bold tracking-tight text-wine-800">
                Kama<span className="text-gold-600">Desires.com</span>
              </span>
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
                placeholder={searchPlaceholder}
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
              placeholder={searchPlaceholder}
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
                      className="flex items-center gap-1 px-2.5 py-3 text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      {link.label}
                    </Link>
                  ) : link.label === "LGBTQ+" ? (
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-2.5 py-3 text-sm font-medium rainbow-text hover:opacity-80"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-2.5 py-3 text-sm font-medium text-gray-700 hover:text-black"
                    >
                      {link.label}
                      {link.dropdown && <ChevronDown size={14} className="mt-0.5" />}
                    </Link>
                  )}

                  {/* Mega dropdown */}
                  {link.dropdown && (
                    <div className="absolute top-full left-0 mt-0 w-[30rem] bg-white border border-gray-100 shadow-xl rounded-b-xl rounded-tr-xl z-50 hidden group-hover:block p-3">
                      <p className="px-3 pt-1 pb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Shop everything
                      </p>
                      <div className="grid grid-cols-2 gap-x-2">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className={`block px-3 py-2 text-sm rounded-md hover:bg-blush-50 ${
                              sub.label === "Sale"
                                ? "text-red-600 font-semibold"
                                : sub.label === "LGBTQ+"
                                ? "rainbow-text font-semibold"
                                : "text-gray-700 hover:text-blush-600"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
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
