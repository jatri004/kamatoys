import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-plum text-cream/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-display text-xl tracking-[0.25em] text-cream mb-4">
              LUMEN
            </p>
            <p className="text-sm text-cream/60 leading-relaxed max-w-xs">
              Premium intimate wellness, designed for every body. Plain packaging.
              Discreet billing.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-cream/40 mb-4">
              Shop
            </h3>
            <ul className="space-y-2 text-sm list-none m-0 p-0">
              <li><Link href="/shop?c=Solo" className="hover:text-cream transition-colors">Solo</Link></li>
              <li><Link href="/shop?c=For+Two" className="hover:text-cream transition-colors">For Two</Link></li>
              <li><Link href="/shop?c=Wellness" className="hover:text-cream transition-colors">Wellness</Link></li>
              <li><Link href="/shop?c=Accessories" className="hover:text-cream transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-cream/40 mb-4">
              Help
            </h3>
            <ul className="space-y-2 text-sm list-none m-0 p-0">
              <li><Link href="/faq" className="hover:text-cream transition-colors">FAQ</Link></li>
              <li><Link href="/faq#returns" className="hover:text-cream transition-colors">Returns</Link></li>
              <li><Link href="/faq#shipping" className="hover:text-cream transition-colors">Shipping</Link></li>
              <li><Link href="/faq#materials" className="hover:text-cream transition-colors">Materials Guide</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-cream/40 mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm list-none m-0 p-0">
              <li><Link href="/about" className="hover:text-cream transition-colors">Our Story</Link></li>
            </ul>
          </div>
        </div>

        {/* Discretion trust bar */}
        <div className="border-t border-cream/10 pt-8 mb-8">
          <div className="flex flex-wrap gap-6 text-xs text-cream/50">
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true">📦</span> Plain unbranded packaging
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true">💳</span> Neutral billing descriptor — &ldquo;LMN Wellness Ltd&rdquo;
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true">🔒</span> Body-safe materials only
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true">♻️</span> 2-year warranty
            </span>
          </div>
        </div>

        {/* Legal bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 text-xs text-cream/40">
          <p>
            © {year} Lumen Wellness Ltd. All rights reserved. This site contains
            adult content — 18+ only.
          </p>
          <p>Adults only (18+) · Body-safe certified · UK registered</p>
        </div>
      </div>
    </footer>
  );
}
