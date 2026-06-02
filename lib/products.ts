// ── Product catalogue ───────────────────────────────────────────────────────
// Swap `gradient` strings for real image paths once photography is available.
// e.g. gradient: "/images/products/aurora-wand.jpg"
// ────────────────────────────────────────────────────────────────────────────

export type Category = "Solo" | "For Two" | "Wellness" | "Accessories";

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;              // in pence (GBP)
  category: Category;
  gradient: string;           // CSS gradient used as placeholder visual
  materials: string;
  dimensions: string;
  chargingTime: string;
  features: string[];
  bodyNeutralNote?: string;   // short inclusive copy snippet
  badge?: string;             // e.g. "New", "Bestseller"
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "aurora-wand",
    name: "Aurora Wand",
    tagline: "Deep, rumbly vibration meets sculptural beauty.",
    description:
      "Aurora is a fully-waterproof, rechargeable personal massager designed for external use. Eight intensity patterns, whisper-quiet motor, and a weighted silicone head deliver broad, satisfying sensation without pressure. Ideal for solo relaxation or partnered touch.",
    price: 8900,
    category: "Solo",
    gradient: "linear-gradient(135deg, #c9a0c0 0%, #7b3f7e 60%, #2e1235 100%)",
    materials: "Body-safe platinum silicone, ABS plastic. Phthalate-free. Latex-free.",
    dimensions: "23 cm × 4.5 cm",
    chargingTime: "90 min (USB-C magnetic)",
    features: [
      "8 vibration patterns",
      "IPX7 waterproof",
      "Whisper-quiet (<45 dB)",
      "Single-button intuitive control",
    ],
    bodyNeutralNote: "Designed for anyone who enjoys broad external sensation.",
    badge: "Bestseller",
  },
  {
    id: "2",
    slug: "ember-curve",
    name: "Ember Curve",
    tagline: "Precision pressure for pinpointed pleasure.",
    description:
      "Ember Curve's angled tip and flexible neck let you tailor stimulation exactly where you want it. Ten whisper-quiet settings travel from barely-there to deeply satisfying. Fully rechargeable and travel-lock ready.",
    price: 6900,
    category: "Solo",
    gradient: "linear-gradient(135deg, #e8c4b8 0%, #c0714f 60%, #7b3322 100%)",
    materials: "Medical-grade silicone, ABS plastic. Phthalate-free.",
    dimensions: "18 cm × 3 cm",
    chargingTime: "75 min (USB-C magnetic)",
    features: [
      "10 intensity levels",
      "Flexible articulating neck",
      "IPX7 waterproof",
      "Travel-lock mode",
    ],
    bodyNeutralNote: "Suitable for any body that enjoys targeted external touch.",
  },
  {
    id: "3",
    slug: "dusk-duo",
    name: "Dusk Duo",
    tagline: "Two motors, one shared experience.",
    description:
      "Dusk Duo is a wearable couples' toy that fits comfortably during partnered intimacy — hands-free vibration for both of you simultaneously. Fully adjustable, rechargeable, and controllable via app or the on-device button.",
    price: 11900,
    category: "For Two",
    gradient: "linear-gradient(135deg, #f5e0d0 0%, #8e5fa8 50%, #2e1235 100%)",
    materials: "Premium body-safe silicone. USB-C rechargeable.",
    dimensions: "Adjustable 7–11 cm span",
    chargingTime: "2 hrs",
    features: [
      "Dual independent motors",
      "Companion app (Bluetooth)",
      "Long-distance remote mode",
      "12 vibration patterns",
    ],
    bodyNeutralNote: "Designed for any partnered configuration — solo use equally welcome.",
    badge: "New",
  },
  {
    id: "4",
    slug: "velvet-cuff-set",
    name: "Velvet Cuff Set",
    tagline: "Soft restraint, serious intention.",
    description:
      "Padded velvet cuffs with quick-release buckles and adjustable straps. Beginner-friendly and thoughtfully made for comfort over extended wear. Comes in a set of two with a satin storage pouch.",
    price: 4200,
    category: "For Two",
    gradient: "linear-gradient(135deg, #2e1235 0%, #5a2d6b 60%, #e8c4b8 100%)",
    materials: "Velvet outer, foam padding, vegan leather strap. Nickel-free hardware.",
    dimensions: "Adjustable 14–22 cm wrist circumference",
    chargingTime: "N/A",
    features: [
      "Quick-release safety buckle",
      "D-ring attachment point",
      "Machine-washable cover",
      "Includes satin storage pouch",
    ],
    bodyNeutralNote: "For anyone who enjoys light restraint play, regardless of role.",
  },
  {
    id: "5",
    slug: "halo-kegel",
    name: "Halo Kegel Trainer",
    tagline: "Build pelvic floor strength, guided and at your pace.",
    description:
      "Halo is a smart pelvic floor trainer that guides you through progressive daily exercise sessions. Weighted modes help build strength over time; the companion app tracks progress discreetly. A clinical-grade tool for anyone with a pelvic floor.",
    price: 7500,
    category: "Wellness",
    gradient: "linear-gradient(135deg, #faf6f1 0%, #e8c4b8 50%, #c0714f 100%)",
    materials: "Medical-grade silicone. BPA-free. Body-safe.",
    dimensions: "9 cm × 3.5 cm",
    chargingTime: "60 min (USB-C)",
    features: [
      "Guided biofeedback sessions",
      "Progressive resistance modes",
      "Discreet companion app",
      "Clinically validated design",
    ],
    bodyNeutralNote: "Suitable for anyone with a pelvic floor — post-partum, post-surgical, or preventative care.",
    badge: "Wellness",
  },
  {
    id: "6",
    slug: "solace-balm",
    name: "Solace Intimate Balm",
    tagline: "Nourishing comfort for sensitive skin.",
    description:
      "A fragrance-free, pH-balanced intimate moisturising balm formulated with shea butter, jojoba oil, and aloe vera. Soothes dryness and supports the skin barrier. Compatible with silicone, latex, and polyurethane barrier products.",
    price: 2800,
    category: "Wellness",
    gradient: "linear-gradient(135deg, #fdf8f4 0%, #f0e8de 60%, #e8c4b8 100%)",
    materials: "Shea butter, jojoba oil, aloe vera, vitamin E. Fragrance-free.",
    dimensions: "50 ml",
    chargingTime: "N/A",
    features: [
      "pH-balanced for intimate skin",
      "Fragrance- and paraben-free",
      "Compatible with most barrier products",
      "Dermatologist tested",
    ],
    bodyNeutralNote: "For any body. Especially helpful for anyone experiencing dryness or sensitivity.",
  },
  {
    id: "7",
    slug: "aria-vibe",
    name: "Aria",
    tagline: "Your first, or your forever.",
    description:
      "Aria is Lumen's signature introduction to vibration — smooth, quiet, and beginner-friendly without sacrificing power. Five broad settings and an elegant pebble form make it as comfortable to hold as it is to use.",
    price: 5500,
    category: "Solo",
    gradient: "linear-gradient(135deg, #d4a8c7 0%, #9b59b6 60%, #5a2d6b 100%)",
    materials: "Platinum silicone. ABS. Phthalate-free.",
    dimensions: "12 cm × 4 cm",
    chargingTime: "60 min (USB-C magnetic)",
    features: [
      "5 power settings",
      "IPX7 waterproof",
      "Pebble ergonomic form",
      "Low-hum motor",
    ],
    bodyNeutralNote: "A great starting point for anyone curious about vibration.",
    badge: "New",
  },
  {
    id: "8",
    slug: "lumen-lubricant",
    name: "Lumen Glide",
    tagline: "Water-based, long-lasting, body-kind.",
    description:
      "A pure water-based lubricant with a silky, non-sticky texture. Unflavoured, unscented, and free from glycerin, parabens, and artificial colour. Safe with all toy materials and barrier products.",
    price: 1800,
    category: "Accessories",
    gradient: "linear-gradient(135deg, #f8f4f0 0%, #e0d8f0 60%, #b8a8d0 100%)",
    materials: "Water, hydroxymethylcellulose, sodium benzoate. Glycerin-free.",
    dimensions: "100 ml",
    chargingTime: "N/A",
    features: [
      "Water-based, toy-safe",
      "Glycerin- and paraben-free",
      "Long-lasting formula",
      "Fragrance-free",
    ],
    bodyNeutralNote: "Works for everyone. Period.",
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getRelatedProducts(current: Product, count = 3): Product[] {
  return PRODUCTS.filter(
    (p) => p.category === current.category && p.id !== current.id
  ).slice(0, count);
}

/** Format a price in pence to a GBP display string, e.g. 8900 → "£89.00" */
export function formatPrice(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100);
}

export const CATEGORIES: Category[] = ["Solo", "For Two", "Wellness", "Accessories"];
