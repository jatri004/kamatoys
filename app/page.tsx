import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Truck,
  Package,
  GraduationCap,
  ArrowRight,
  Link2,
  Smartphone,
  Vibrate,
  Crown,
  Gem,
  Waves,
  Flame,
  Droplets,
  type LucideIcon,
} from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";
import NewsletterForm from "@/components/NewsletterForm";
import { getBestsellers, getNewArrivals, products } from "@/lib/products";

const trustBadges = [
  { icon: Truck, label: "Free UK Delivery", sub: "On orders over £40" },
  { icon: Package, label: "Discreet Packaging", sub: "Plain box, no branding" },
  { icon: GraduationCap, label: "Student Discount", sub: "Verify with UNiDAYS" },
  { icon: ShieldCheck, label: "Secure Checkout", sub: "256-bit SSL encryption" },
];

interface CategoryTile {
  label: string;
  href: string;
  gradient: string;
  emoji: string;
  sub: string;
  light?: boolean;
  image?: string;
}

const categories: CategoryTile[] = [
  {
    label: "Women",
    href: "/women",
    gradient: "from-pink-200 to-rose-300",
    emoji: "💗",
    sub: "Vibrators, wands & more",
    image: "/images/women-category.jpg",
    light: true,
  },
  {
    label: "Men",
    href: "/men",
    gradient: "from-slate-700 to-gray-900",
    emoji: "⚡",
    sub: "Strokers, rings & wellness",
    light: true,
    image: "/images/men-category.jpg",
  },
  {
    label: "LGBTQ+",
    href: "/lgbtq",
    gradient: "from-pink-400 via-purple-400 to-blue-400",
    emoji: "🏳️‍🌈",
    sub: "Inclusive range for all",
  },
  {
    label: "Couples",
    href: "/couples",
    gradient: "from-rose-300 to-pink-400",
    emoji: "💞",
    sub: "Explore pleasure together",
  },
];

// Shop-by-type tiles. Links use the existing /shop?cat=<tag> filter pattern
// (the shop page filters products by category OR tag), so these resolve to
// real filtered listings. Swap `icon`/`gradient` for real category artwork
// if/when you have it — see summary notes.
interface ToyTypeTile {
  label: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
  light?: boolean;
  image?: string;
}

const toyTypes: ToyTypeTile[] = [
  { label: "Bondage", href: "/shop?cat=bondage", icon: Link2, gradient: "from-gray-800 to-rose-900", light: true, image: "/images/bondage-type.jpg" },
  { label: "App / Remote", href: "/shop?cat=app-controlled", icon: Smartphone, gradient: "from-indigo-300 to-purple-400", light: true, image: "/images/app-remote-type.jpg" },
  { label: "Vibrators", href: "/shop?cat=vibrator", icon: Vibrate, gradient: "from-pink-200 to-fuchsia-300", image: "/images/vibrators-type.jpg" },
  { label: "Luxury Vibrators", href: "/shop?cat=luxury", icon: Crown, gradient: "from-amber-300 to-rose-300", image: "/images/luxury-vibrators-type.jpg" },
  { label: "Butt Plugs", href: "/shop?cat=butt-plug", icon: Gem, gradient: "from-violet-300 to-purple-400", image: "/images/butt-plugs-type.jpg" },
  { label: "Thrusting", href: "/shop?cat=thrusting", icon: Waves, gradient: "from-rose-300 to-pink-400", image: "/images/thrusting-type.jpg" },
  { label: "Grinders", href: "/shop?cat=grinder", icon: Flame, gradient: "from-blush-300 to-rose-400", image: "/images/grinders-type.jpg" },
  { label: "Lube", href: "/shop?cat=lube", icon: Droplets, gradient: "from-cyan-200 to-sky-300", image: "/images/lube-type.jpg" },
];

const educationTeasers = [
  {
    title: "Beginner's Guide to Vibrators",
    href: "/education/beginners-guide-vibrators",
    cat: "Buying Guide",
    color: "bg-pink-50",
  },
  {
    title: "How to Choose the Right Lubricant",
    href: "/education/choosing-lubricant",
    cat: "Wellness",
    color: "bg-purple-50",
  },
  {
    title: "Exploring Pleasure Together as a Couple",
    href: "/education/couples-exploration",
    cat: "Couples",
    color: "bg-rose-50",
  },
];

export default function HomePage() {
  const bestsellers = getBestsellers().slice(0, 8);
  const newArrivals = getNewArrivals().slice(0, 4);
  const couplesPicks = products.filter((p) => p.category === "couples").slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-wine-900 text-white"
        aria-label="Hero banner"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-wine-800 via-wine-900 to-wine-950" />
        {/* Decorative gold glow */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold-400/15 blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-64 h-64 rounded-full bg-wine-400/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-xl">
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Inclusive · Discreet · Premium
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Pleasure,{" "}
              <span className="gold-text">beautifully</span> designed.
            </h1>
            <p className="text-wine-100/80 text-lg mb-8 leading-relaxed">
              Premium intimate wellness for every body. Free discreet UK delivery.
              Expert guides. Always shame-free.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-gold-500 text-wine-900 font-semibold px-6 py-3.5 rounded-full hover:bg-gold-400"
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link
                href="/education"
                className="inline-flex items-center gap-2 border border-gold-400/40 text-gold-100 font-medium px-6 py-3.5 rounded-full hover:bg-white/10"
              >
                Read Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section
        className="border-b border-gray-100 bg-white"
        aria-label="Trust badges"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-3 text-sm"
              >
                <div className="w-10 h-10 rounded-full bg-blush-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-blush-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{label}</p>
                  <p className="text-gray-500 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" aria-labelledby="categories-heading">
        <SectionHeader title="Shop by Category" id="categories-heading" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className={`group relative rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br ${cat.gradient} flex flex-col justify-end p-5 hover:shadow-lg transition-all`}
              aria-label={`Shop ${cat.label}`}
            >
              {cat.image ? (
                <>
                  <Image
                    src={cat.image}
                    alt={`Shop ${cat.label} — intimate wellness products`}
                    fill
                    quality={90}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              )}
              <div className="relative">
                {!cat.image && <div className="text-2xl mb-1">{cat.emoji}</div>}
                <h3 className={`text-lg font-display font-bold ${cat.light ? "text-white" : "text-gray-900"}`}>
                  {cat.label}
                </h3>
                <p className={`text-xs mt-0.5 ${cat.light ? "text-gray-200" : "text-gray-700"}`}>
                  {cat.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Most Popular */}
      <section className="bg-gray-50 py-14" aria-labelledby="bestsellers-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Most Popular"
            subtitle="Our customers' all-time favourites"
            href="/shop?filter=bestseller"
            id="bestsellers-heading"
          />
          <ProductGrid products={bestsellers} />
        </div>
      </section>

      {/* Sale Banner */}
      <section
        className="relative overflow-hidden"
        aria-label="Sale promotion"
      >
        <div className="h-2 gold-gradient" />
        <div className="bg-wine-900 text-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gold-400 text-sm uppercase font-bold tracking-widest mb-2">
              Limited Time
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Up to{" "}
              <span className="gold-text">40% off</span> our best sellers
            </h2>
            <p className="text-wine-100/70 mb-8 max-w-lg mx-auto">
              Don't miss our biggest sale of the season. Stock is limited — shop now before it's gone.
            </p>
            <Link
              href="/sale"
              className="inline-flex items-center gap-2 bg-gold-500 text-wine-900 font-bold px-8 py-3.5 rounded-full hover:bg-gold-400"
            >
              Shop the Sale <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="h-2 gold-gradient" />
      </section>

      {/* Shop by Type — 8 category tiles */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
        aria-labelledby="shop-by-type-heading"
      >
        <SectionHeader
          title="Shop by Type"
          subtitle="Browse our most popular categories"
          href="/shop"
          linkLabel="Shop All"
          id="shop-by-type-heading"
        />
        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {toyTypes.map(({ label, href, icon: Icon, gradient, light, image }) => (
            <li key={label}>
              <Link
                href={href}
                aria-label={`Shop ${label}`}
                className="group flex flex-col items-center gap-2.5 rounded-xl p-1 focus-visible:outline-none"
              >
                <div
                  className={`relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:shadow-lg group-hover:-translate-y-0.5 transition-all`}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt={`${label} collection`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <Icon
                      size={26}
                      aria-hidden="true"
                      className={light ? "text-white" : "text-gray-900"}
                    />
                  )}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-800 text-center leading-tight group-hover:text-blush-500">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" aria-labelledby="new-arrivals-heading">
        <SectionHeader
          title="New Arrivals"
          subtitle="Just landed in our collection"
          href="/shop?filter=new"
          id="new-arrivals-heading"
        />
        <ProductGrid products={newArrivals} columns={4} />
      </section>

      {/* Couples Favourites */}
      <section className="bg-rose-50/50 py-14" aria-labelledby="couples-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Couples' Favourites"
            subtitle="Explore pleasure together"
            href="/couples"
            id="couples-heading"
          />
          <ProductGrid products={couplesPicks} columns={4} />
        </div>
      </section>

      {/* Sign-up Discount Block */}
      <section
        className="py-16 bg-gradient-to-br from-wine-50 to-gold-100"
        aria-label="Newsletter signup"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-wine-700 text-sm font-bold uppercase tracking-widest mb-2">Exclusive offer</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-3">
            Get 10% off your first order
          </h2>
          <p className="text-gray-600 mb-8">
            Join the KamaDesires.com community for exclusive offers, new arrivals, and expert wellness advice — straight to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
          <p className="mt-3 text-xs text-gray-400">
            No spam, ever. Unsubscribe any time.
          </p>
        </div>
      </section>

      {/* Education Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" aria-labelledby="education-heading">
        <SectionHeader
          title="Learn & Explore"
          subtitle="Expert guides to help you find what you love"
          href="/education"
          id="education-heading"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {educationTeasers.map((article) => (
            <Link
              key={article.title}
              href={article.href}
              className={`group rounded-xl p-6 ${article.color} hover:shadow-md transition-all`}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {article.cat}
              </span>
              <h3 className="mt-2 text-base font-display font-semibold text-gray-900 group-hover:text-blush-500 leading-snug">
                {article.title}
              </h3>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blush-500">
                Read more <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
