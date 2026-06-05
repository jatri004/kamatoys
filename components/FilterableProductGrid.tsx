"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductGrid from "./ProductGrid";
import type { Product } from "@/lib/products";
import { buildFacets, filterProducts, type ActiveFilters } from "@/lib/filters";

export interface TypeFilter {
  label: string;
  slug: string;
}

interface Props {
  products: Product[];
  // Optional curated Type list (shown as a filter group, matched on tags).
  typeFilters?: TypeFilter[];
}

export default function FilterableProductGrid({ products, typeFilters }: Props) {
  const [active, setActive] = useState<ActiveFilters>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  // Generic facets derived from the products. When a curated Type list is
  // supplied we drop the auto-derived "type" facet and use the curated one.
  const facets = useMemo(() => {
    const f = buildFacets(products);
    return typeFilters ? f.filter((g) => g.key !== "type") : f;
  }, [products, typeFilters]);

  // Curated Type options with live counts (value = label, matched via slug).
  const slugByLabel = useMemo(
    () => Object.fromEntries((typeFilters ?? []).map((t) => [t.label, t.slug])),
    [typeFilters]
  );
  const typeOptions = useMemo(
    () =>
      (typeFilters ?? []).map((t) => ({
        value: t.label,
        count: products.filter((p) => p.tags.includes(t.slug)).length,
      })),
    [typeFilters, products]
  );

  const filtered = useMemo(() => {
    const { type: typeSel, ...rest } = active;
    let result = filterProducts(products, rest);
    if (typeFilters && typeSel && typeSel.length > 0) {
      result = result.filter((p) =>
        typeSel.some((label) => p.tags.includes(slugByLabel[label]))
      );
    }
    return result;
  }, [products, active, typeFilters, slugByLabel]);

  const activeCount = Object.values(active).reduce((n, v) => n + v.length, 0);

  const toggle = (key: string, value: string) => {
    setActive((prev) => {
      const cur = prev[key] ?? [];
      const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
      const updated = { ...prev, [key]: next };
      if (next.length === 0) delete updated[key];
      return updated;
    });
  };

  const clearAll = () => setActive({});

  const FilterPanel = (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800">Filters</h2>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs text-blush-600 hover:underline font-medium">
            Clear all ({activeCount})
          </button>
        )}
      </div>
      {/* Curated Type group (when provided) */}
      {typeFilters && typeOptions.length > 0 && (
        <details open className="border-b border-gray-100 py-3 group">
          <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-semibold text-gray-800">
            Type
            <ChevronDown size={15} className="text-gray-400 transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-3 space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {typeOptions.map((opt) => {
              const checked = (active.type ?? []).includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle("type", opt.value)}
                    className="w-4 h-4 rounded border-gray-300 accent-blush-500 flex-shrink-0"
                  />
                  <span className="flex-1 leading-tight">{opt.value}</span>
                  <span className="text-xs text-gray-400">{opt.count}</span>
                </label>
              );
            })}
          </div>
        </details>
      )}

      {facets.map((group, i) => (
        <details key={group.key} open={i < 3} className="border-b border-gray-100 py-3 group">
          <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-semibold text-gray-800">
            {group.label}
            <ChevronDown size={15} className="text-gray-400 transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-3 space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {group.options.map((opt) => {
              const checked = (active[group.key] ?? []).includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(group.key, opt.value)}
                    className="w-4 h-4 rounded border-gray-300 accent-blush-500"
                  />
                  <span className="flex-1">{opt.value}</span>
                  <span className="text-xs text-gray-400">{opt.count}</span>
                </label>
              );
            })}
          </div>
        </details>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 flex-shrink-0">
        <div className="sticky top-24">{FilterPanel}</div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700"
          >
            <SlidersHorizontal size={15} />
            Filters{activeCount > 0 && ` (${activeCount})`}
          </button>
        </div>

        {/* Active chips */}
        {activeCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {Object.entries(active).flatMap(([key, vals]) =>
              vals.map((v) => (
                <button
                  key={`${key}-${v}`}
                  onClick={() => toggle(key, v)}
                  className="inline-flex items-center gap-1 bg-blush-50 text-blush-700 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blush-100"
                >
                  {v}
                  <X size={12} />
                </button>
              ))
            )}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-2">No products match your filters.</p>
            <button onClick={clearAll} className="text-sm text-blush-600 hover:underline font-medium">
              Clear all filters
            </button>
          </div>
        ) : (
          <ProductGrid products={filtered} columns={4} />
        )}
      </div>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-2xl p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-lg">Filters</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close filters">
                <X size={20} />
              </button>
            </div>
            {FilterPanel}
            <button
              onClick={() => setMobileOpen(false)}
              className="mt-6 w-full bg-wine-800 text-white font-semibold py-3 rounded-xl"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
