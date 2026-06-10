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
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import CartDrawer from "./CartDrawer";

const shopGroups = [
  {
    heading: "Shop",
    links: [
      { label: "Women", href: "/women" },
      { label: "Men", href: "/men" },
      { label: "Couples", href: "/couples" },
      { label: "LGBTQ+", href: "/lgbtq" },
      { label: "Condoms", href: "/shop?cat=condoms" },
      { label: "Clothing & Lingerie", href: "/shop?cat=clothing" },
      { label: "Sale", href: "/sale" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Why Us?", href: "/why-us" },
      { label: "Education Hub", href: "/education" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Customer Service",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Delivery Information", href: "/delivery" },
      { label: "Track Order", href: "/track-order" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Student Discount", href: "/student-discount" },
      { label: "FAQs", href: "/faq" },
    ],
  },
];

const navLinks = [
  { label: "Shop", href: "/shop", dropdown: shopGroups },
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "LGBTQ+", href: "/lgbtq" },
  { label: "Couples", href: "/couples" },
  { label: "Sale", href: "/sale" },
  { label: "Condoms", href: "/shop?cat=condoms" },
  { label: "Clothing", href: "/shop?cat=clothing" },
  { label: "Dildo", href: "/shop?cat=dildo" },
  { label: "Vibrator", href: "/shop?cat=vibrator" },
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
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [mobileGroupOpen, setMobileGroupOpen] = useState<string | null>(null);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
    setMobileGroupOpen(null);
  };
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
                onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
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
                    <div className="absolute top-full left-0 mt-0 w-[42rem] bg-white border border-gray-100 shadow-xl rounded-b-xl rounded-tr-xl z-50 hidden group-hover:block p-5">
                      <div className="grid grid-cols-3 gap-x-6">
                        {link.dropdown.map((group) => (
                          <div key={group.heading}>
                            <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                              {group.heading}
                            </p>
                            <div className="flex flex-col">
                              {group.links.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  className={`block px-2 py-1.5 text-sm rounded-md hover:bg-blush-50 ${
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
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile nav drawer — drill-down panels (slide + Back) */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white overflow-hidden">
            <nav aria-label="Mobile navigation">
              {(() => {
                const section = navLinks.find((l) => l.label === mobileSection);
                const group = section?.dropdown?.find((g) => g.heading === mobileGroupOpen);

                // Level 2 — links inside a group
                if (section && group) {
                  return (
                    <div key="group" className="animate-slide-in">
                      <button
                        type="button"
                        onClick={() => setMobileGroupOpen(null)}
                        className="flex items-center gap-1.5 w-full px-5 py-3 text-sm font-semibold text-gray-800 border-b border-gray-100"
                      >
                        <ChevronLeft size={16} /> Back
                      </button>
                      <p className="px-6 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {group.heading}
                      </p>
                      {group.links.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={closeMobile}
                          className={`block px-6 py-3 text-sm border-b border-gray-50 hover:text-blush-500 ${
                            sub.label === "Sale"
                              ? "text-red-600 font-semibold"
                              : sub.label === "LGBTQ+"
                              ? "rainbow-text font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  );
                }

                // Level 1 — groups inside a section (e.g. Shop)
                if (section?.dropdown) {
                  return (
                    <div key="section" className="animate-slide-in">
                      <button
                        type="button"
                        onClick={() => setMobileSection(null)}
                        className="flex items-center gap-1.5 w-full px-5 py-3 text-sm font-semibold text-gray-800 border-b border-gray-100"
                      >
                        <ChevronLeft size={16} /> Back
                      </button>
                      <p className="px-6 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {section.label}
                      </p>
                      {section.dropdown.map((g) => (
                        <button
                          key={g.heading}
                          type="button"
                          onClick={() => setMobileGroupOpen(g.heading)}
                          className="flex items-center justify-between w-full px-6 py-3 text-sm font-medium text-gray-800 border-b border-gray-50"
                        >
                          {g.heading}
                          <ChevronRight size={16} className="text-gray-400" />
                        </button>
                      ))}
                    </div>
                  );
                }

                // Level 0 — root
                return (
                  <div key="root">
                    {navLinks.map((link) =>
                      link.dropdown ? (
                        <button
                          key={link.label}
                          type="button"
                          onClick={() => setMobileSection(link.label)}
                          className="flex items-center justify-between w-full px-6 py-3 text-sm font-medium text-gray-800 border-b border-gray-50"
                        >
                          {link.label}
                          <ChevronRight size={16} className="text-gray-400" />
                        </button>
                      ) : (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={closeMobile}
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
                      )
                    )}
                  </div>
                );
              })()}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
