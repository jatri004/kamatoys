import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { articles, getArticleBySlug } from "@/lib/education";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div>
      {/* Header */}
      <div className={`bg-gradient-to-br ${article.color} py-14 px-4`}>
        <div className="max-w-3xl mx-auto">
          <Link href="/education" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft size={15} /> Back to Education Hub
          </Link>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{article.category}</span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mt-2 mb-3 leading-tight">
            {article.title}
          </h1>
          <p className="text-gray-700 text-sm flex items-center gap-2">
            <Clock size={14} /> {article.readTime}
          </p>
        </div>
      </div>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <p className="text-lg text-gray-700 leading-relaxed mb-8">{article.excerpt}</p>

        {article.sections.map((section, i) => (
          <section key={i} className="mb-8">
            {section.heading && (
              <h2 className="text-xl font-display font-bold text-gray-900 mb-3">{section.heading}</h2>
            )}
            {section.paragraphs?.map((p, j) => (
              <p key={j} className="text-gray-700 text-[15px] leading-relaxed mb-3">{p}</p>
            ))}
            {section.list && (
              <ul className="space-y-2 mt-2">
                {section.list.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-[15px] text-gray-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blush-400 flex-shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Medical disclaimer */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 text-xs text-gray-500 leading-relaxed">
          <p className="font-semibold text-gray-700 mb-1">Medical disclaimer</p>
          This content is provided for general information and education only and aligns with publicly
          available NHS guidance. It is not a substitute for professional medical advice, diagnosis or
          treatment. Always seek the advice of your GP, pharmacist or a sexual health clinic with any
          questions about a medical condition. In the UK, sexual health services are free and
          confidential — find them at nhs.uk.
        </div>
      </article>

      {/* Related */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="flex items-center gap-2 text-lg font-display font-bold text-gray-900 mb-6">
            <BookOpen size={18} className="text-blush-500" /> Keep reading
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/education/${a.slug}`}
                className={`group rounded-2xl bg-gradient-to-br ${a.color} p-6 hover:shadow-md transition-all`}
              >
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{a.category}</span>
                <h3 className="mt-2 text-base font-display font-semibold text-gray-900 group-hover:text-blush-600 leading-snug">
                  {a.title}
                </h3>
                <span className="mt-3 inline-block text-xs text-gray-500">{a.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
