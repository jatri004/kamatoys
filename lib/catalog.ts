// Unified catalogue data layer.
//
// Use these async functions in pages instead of importing the demo array
// directly. When Shopify is configured they return live Shopify data;
// otherwise they fall back to the local demo catalogue — so the site works
// either way and we can migrate page-by-page safely.

import {
  products as demoProducts,
  getProductBySlug as demoGetBySlug,
  type Category,
  type Product,
} from "./products";
import { isShopifyConfigured, getShopifyProducts, getShopifyProductByHandle } from "./shopify";

export async function fetchProducts(): Promise<Product[]> {
  if (isShopifyConfigured()) {
    try {
      return await getShopifyProducts();
    } catch (err) {
      console.error("[catalog] Shopify fetch failed, falling back to demo data:", err);
    }
  }
  return demoProducts;
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  if (isShopifyConfigured()) {
    try {
      return await getShopifyProductByHandle(slug);
    } catch (err) {
      console.error("[catalog] Shopify product fetch failed, falling back to demo data:", err);
    }
  }
  return demoGetBySlug(slug);
}

export async function fetchProductsByCategory(category: Category): Promise<Product[]> {
  const all = await fetchProducts();
  return all.filter((p) => p.category === category);
}

export async function fetchSaleProducts(): Promise<Product[]> {
  const all = await fetchProducts();
  return all.filter((p) => p.isSale);
}

export async function fetchBestsellers(): Promise<Product[]> {
  const all = await fetchProducts();
  return all.filter((p) => p.isBestseller);
}

export async function fetchNewArrivals(): Promise<Product[]> {
  const all = await fetchProducts();
  return all.filter((p) => p.isNew);
}

export type { Product, Category };
