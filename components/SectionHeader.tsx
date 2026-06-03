import Link from "next/link";

interface Props {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  rainbow?: boolean;
  id?: string;
}

export default function SectionHeader({ title, subtitle, href, linkLabel = "View All", rainbow = false, id }: Props) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 id={id} className={`text-2xl sm:text-3xl font-display font-bold ${rainbow ? "rainbow-text" : "text-gray-900"}`}>
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="text-sm font-semibold text-blush-500 hover:underline whitespace-nowrap"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
