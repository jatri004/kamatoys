import Link from "next/link";

export interface TypeLink {
  label: string;
  slug: string;
}

interface Props {
  types: TypeLink[];
  id?: string;
}

export default function ShopByType({ types, id = "shop-by-type-heading" }: Props) {
  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10"
      aria-labelledby={id}
    >
      <h2 id={id} className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
        Shop by Type
      </h2>
      <div className="flex flex-wrap gap-2.5">
        {types.map((t) => (
          <Link
            key={t.slug}
            href={`/shop?cat=${t.slug}`}
            className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:border-blush-400 hover:bg-blush-50 hover:text-blush-600 transition-colors"
          >
            {t.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
