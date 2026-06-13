import type { Category, Product } from "./products";

// ---------------------------------------------------------------------------
// Shopify Storefront API client (headless commerce).
//
// Set these in .env.local (and in Vercel project settings) to go live:
//   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
//   SHOPIFY_STOREFRONT_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//
// When they are absent, the app transparently falls back to the local demo
// catalogue in lib/products.ts, so nothing breaks during development.
// ---------------------------------------------------------------------------

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = "2024-10";

export function isShopifyConfigured(): boolean {
  return Boolean(DOMAIN && TOKEN);
}

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  // Customer auth (login, tokens, per-user data) must never be cached. Pass
  // cache: "no-store" for those; product reads keep the default revalidate.
  cache?: RequestCache;
}

export async function shopifyFetch<T>({ query, variables, cache }: ShopifyFetchOptions): Promise<T> {
  if (!isShopifyConfigured()) {
    throw new Error("Shopify is not configured (missing SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_TOKEN).");
  }

  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    // Per-request override (no-store for auth) or periodic product revalidation.
    ...(cache ? { cache } : { next: { revalidate: 60 } }),
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { data: T; errors?: unknown };
  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

// --- GraphQL ---------------------------------------------------------------

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductCard on Product {
    id
    handle
    title
    description
    tags
    productType
    vendor
    featuredImage { url altText }
    priceRange { minVariantPrice { amount } }
    compareAtPriceRange { minVariantPrice { amount } }
    options { name values }
  }
`;

const PRODUCTS_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query Products($first: Int!) {
    products(first: $first) {
      edges { node { ...ProductCard } }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query Product($handle: String!) {
    product(handle: $handle) { ...ProductCard }
  }
`;

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  productType: string;
  vendor: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string } };
  compareAtPriceRange: { minVariantPrice: { amount: string } } | null;
  options: { name: string; values: string[] }[];
}

const GRADIENTS = [
  "from-pink-200 to-rose-300",
  "from-violet-200 to-purple-300",
  "from-sky-200 to-blue-300",
  "from-amber-200 to-rose-200",
  "from-emerald-200 to-teal-300",
];

function deriveCategory(tags: string[], productType: string): Category {
  const hay = (tags.join(" ") + " " + productType).toLowerCase();
  if (hay.includes("lgbtq") || hay.includes("pride") || hay.includes("trans")) return "lgbtq";
  if (hay.includes("women") || hay.includes("her")) return "women";
  if (hay.includes("men") || hay.includes("him")) return "men";
  return "couples";
}

function mapProduct(node: ShopifyProductNode): Product {
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAt = node.compareAtPriceRange
    ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount)
    : undefined;
  const isSale = Boolean(compareAt && compareAt > price);
  const sizeOption = node.options.find((o) => /size/i.test(o.name));
  const colorOption = node.options.find((o) => /colou?r/i.test(o.name));
  const idNum = Math.abs(hashCode(node.id));

  return {
    id: node.id,
    name: node.title,
    slug: node.handle,
    category: deriveCategory(node.tags, node.productType),
    tags: node.tags.map((t) => t.toLowerCase()),
    price,
    originalPrice: isSale ? compareAt : undefined,
    isSale,
    isNew: node.tags.some((t) => /new/i.test(t)),
    isBestseller: node.tags.some((t) => /best|popular/i.test(t)),
    rating: 4.6,
    reviewCount: 0,
    description: node.description,
    features: [],
    gradient: GRADIENTS[idNum % GRADIENTS.length],
    image: node.featuredImage?.url,
    brand: node.vendor || undefined,
    color: colorOption?.values[0],
    sizes: sizeOption?.values,
  };
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

export async function getShopifyProducts(first = 100): Promise<Product[]> {
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProductNode }[] } }>({
    query: PRODUCTS_QUERY,
    variables: { first },
  });
  return data.products.edges.map((e) => mapProduct(e.node));
}

export async function getShopifyProductByHandle(handle: string): Promise<Product | undefined> {
  const data = await shopifyFetch<{ product: ShopifyProductNode | null }>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  });
  return data.product ? mapProduct(data.product) : undefined;
}
