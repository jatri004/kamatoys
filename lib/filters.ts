import type { Product } from "./products";

export type ActiveFilters = Record<string, string[]>;

// Map known product tags to readable "Type" facet labels.
const TYPE_LABELS: Record<string, string> = {
  vibrator: "Vibrators",
  bullet: "Bullet Vibrators",
  luxury: "Luxury Vibrators",
  dildo: "Dildos",
  suction: "Air-Pulse / Suction",
  stroker: "Strokers",
  "butt-plug": "Butt Plugs",
  anal: "Anal Toys",
  plug: "Plugs",
  ring: "Cock Rings",
  wearable: "Wearable Toys",
  kegel: "Pelvic Floor",
  "strap-on": "Strap-Ons",
  harness: "Harnesses",
  packer: "Packers",
  bondage: "Bondage & BDSM",
  prostate: "Prostate Massagers",
  thrusting: "Thrusting Toys",
  grinder: "Grinders",
  "app-controlled": "App / Remote",
  remote: "App / Remote",
  lube: "Lubricants",
  condoms: "Condoms",
  clothing: "Clothing & Lingerie",
  spray: "Wellness",
  massage: "Massage",
  game: "Games",
  book: "Books",
};

const AUDIENCE_LABELS: Record<Product["category"], string> = {
  women: "For Her",
  men: "For Him",
  lgbtq: "LGBTQ+",
  couples: "Couples",
};

function priceBucket(price: number): string {
  if (price < 25) return "Under £25";
  if (price < 50) return "£25 – £50";
  if (price < 100) return "£50 – £100";
  return "£100+";
}

function featureFlags(p: Product): string[] {
  const text = (p.features.join(" ") + " " + p.description).toLowerCase();
  const flags: string[] = [];
  if (/waterproof|ipx/.test(text)) flags.push("Waterproof");
  if (/recharge|usb|magnetic charge/.test(text)) flags.push("Rechargeable");
  if (/app|remote/.test(text)) flags.push("App / Remote");
  if (/whisper|quiet/.test(text)) flags.push("Whisper-Quiet");
  if (/body-safe|medical-grade|silicone/.test(text)) flags.push("Body-Safe");
  if (/vegan/.test(text)) flags.push("Vegan");
  if (/travel/.test(text)) flags.push("Travel-Friendly");
  return flags;
}

export interface FacetDef {
  key: string;
  label: string;
  values: (p: Product) => string[];
}

// Facet definitions in display order.
export const FACETS: FacetDef[] = [
  { key: "type", label: "Type", values: (p) => p.tags.map((t) => TYPE_LABELS[t]).filter(Boolean) },
  { key: "audience", label: "Gender / Audience", values: (p) => [AUDIENCE_LABELS[p.category]] },
  { key: "price", label: "Price", values: (p) => [priceBucket(p.price)] },
  { key: "brand", label: "Brand", values: (p) => (p.brand ? [p.brand] : []) },
  { key: "color", label: "Colour", values: (p) => (p.color ? [p.color] : []) },
  { key: "material", label: "Material", values: (p) => (p.material ? [p.material] : []) },
  { key: "features", label: "Features", values: featureFlags },
  { key: "flavour", label: "Flavour", values: (p) => (p.flavour ? [p.flavour] : []) },
  {
    key: "rating",
    label: "Rating",
    values: (p) => {
      const r: string[] = [];
      if (p.rating >= 4) r.push("4★ & up");
      if (p.rating >= 4.5) r.push("4.5★ & up");
      return r;
    },
  },
  {
    key: "status",
    label: "Offers",
    values: (p) => {
      const s: string[] = [];
      if (p.isSale) s.push("On Sale");
      if (p.isNew) s.push("New In");
      if (p.isBestseller) s.push("Bestseller");
      return s;
    },
  },
];

const PRICE_ORDER = ["Under £25", "£25 – £50", "£50 – £100", "£100+"];

export interface FacetOption {
  value: string;
  count: number;
}

export interface FacetGroup {
  key: string;
  label: string;
  options: FacetOption[];
}

// Build the available facet groups (with counts) from a product set.
export function buildFacets(items: Product[]): FacetGroup[] {
  return FACETS.map((facet) => {
    const counts = new Map<string, number>();
    for (const p of items) {
      for (const v of facet.values(p)) {
        counts.set(v, (counts.get(v) ?? 0) + 1);
      }
    }
    let options = Array.from(counts.entries()).map(([value, count]) => ({ value, count }));
    if (facet.key === "price") {
      options.sort((a, b) => PRICE_ORDER.indexOf(a.value) - PRICE_ORDER.indexOf(b.value));
    } else {
      options.sort((a, b) => a.value.localeCompare(b.value));
    }
    return { key: facet.key, label: facet.label, options };
  }).filter((g) => g.options.length > 0);
}

// Apply active filters (OR within a facet, AND across facets).
export function filterProducts(items: Product[], active: ActiveFilters): Product[] {
  const facetByKey = Object.fromEntries(FACETS.map((f) => [f.key, f]));
  return items.filter((p) =>
    Object.entries(active).every(([key, selected]) => {
      if (!selected || selected.length === 0) return true;
      const facet = facetByKey[key];
      if (!facet) return true;
      const values = facet.values(p);
      return selected.some((s) => values.includes(s));
    })
  );
}
