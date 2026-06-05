import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { articles } from "@/lib/education";

export const metadata = { title: "Education & Guides" };

export default function EducationPage() {
  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-lilac-100 to-blush-50 py-14 text-center px-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <BookOpen size={20} className="text-blush-500" />
        </div>
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-3">Education Hub</h1>
        <p className="text-gray-600 max-w-lg mx-auto text-sm leading-relaxed">
          Shame-free, medically-informed guides to help you explore pleasure safely and confidently.
          Aligned with NHS guidance, for everyone.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/education/${a.slug}`}
              className={`group rounded-2xl bg-gradient-to-br ${a.color} p-6 hover:shadow-md transition-all`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    {a.category}
                  </span>
                  <h2 className="text-base font-display font-semibold text-gray-900 leading-snug group-hover:text-blush-600 mb-2">
                    {a.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {a.excerpt}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-400">{a.readTime}</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-blush-500">
                  Read <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
