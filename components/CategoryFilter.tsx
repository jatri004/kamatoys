"use client";

import { useRouter, usePathname } from "next/navigation";
import type { Category } from "@/lib/products";

interface Props {
  categories: Category[];
  active?: Category;
  currentSort: string;
}

export default function CategoryFilter({ categories, active, currentSort }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function navigate(params: Record<string, string | undefined>) {
    const sp = new URLSearchParams();
    if (params.c) sp.set("c", params.c);
    if (params.sort && params.sort !== "default") sp.set("sort", params.sort);
    const qs = sp.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
      {/* Category pills */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        <button
          onClick={() => navigate({ sort: currentSort })}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 ${
            !active
              ? "bg-plum text-cream"
              : "bg-plum/8 text-plum hover:bg-plum/15"
          }`}
          aria-pressed={!active}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => navigate({ c: cat, sort: currentSort })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 ${
              active === cat
                ? "bg-plum text-cream"
                : "bg-plum/8 text-plum hover:bg-plum/15"
            }`}
            aria-pressed={active === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="sm:ml-auto flex items-center gap-2">
        <label htmlFor="sort-select" className="text-sm text-plum/60 whitespace-nowrap">
          Sort by
        </label>
        <select
          id="sort-select"
          value={currentSort}
          onChange={(e) => navigate({ c: active, sort: e.target.value })}
          className="text-sm border border-plum/20 rounded-xl px-3 py-2 bg-cream text-plum focus-visible:ring-2 focus-visible:ring-clay focus-visible:outline-none"
        >
          <option value="default">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>
    </div>
  );
}
