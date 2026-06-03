import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata = { title: "Education & Guides" };

const articles = [
  {
    slug: "beginners-guide-vibrators",
    cat: "Buying Guide",
    title: "Beginner's Guide to Vibrators",
    excerpt: "Overwhelmed by choice? We break down every type of vibrator, from bullet vibes to wands, and help you find your perfect match.",
    readTime: "6 min read",
    color: "from-pink-100 to-rose-100",
  },
  {
    slug: "choosing-lubricant",
    cat: "Wellness",
    title: "How to Choose the Right Lubricant",
    excerpt: "Water-based, silicone, or oil? Learn which lube is safe with your toys, condoms, and body.",
    readTime: "4 min read",
    color: "from-purple-100 to-violet-100",
  },
  {
    slug: "couples-exploration",
    cat: "Couples",
    title: "Exploring Pleasure Together as a Couple",
    excerpt: "Communication, consent, and the best products for shared exploration. A shame-free guide for all relationships.",
    readTime: "8 min read",
    color: "from-rose-100 to-pink-100",
  },
  {
    slug: "prostate-101",
    cat: "Men's Wellness",
    title: "Prostate Pleasure 101",
    excerpt: "What is the prostate, and why does stimulating it feel so good? A friendly, medically-informed introduction.",
    readTime: "5 min read",
    color: "from-indigo-100 to-blue-100",
  },
  {
    slug: "anal-play-beginners",
    cat: "Guides",
    title: "Anal Play: A Beginner's Safety Guide",
    excerpt: "Go slow, use plenty of lube, and start small. Everything you need to know for safe, enjoyable anal exploration.",
    readTime: "7 min read",
    color: "from-amber-100 to-orange-100",
  },
  {
    slug: "kegel-exercises",
    cat: "Wellness",
    title: "Kegel Exercises: Benefits & How to Start",
    excerpt: "Strengthen your pelvic floor for better pleasure and health. Includes a 4-week beginner programme.",
    readTime: "5 min read",
    color: "from-teal-100 to-cyan-100",
  },
  {
    slug: "lgbtq-inclusive-sex-ed",
    cat: "LGBTQ+",
    title: "Sex Education That Actually Includes You",
    excerpt: "A comprehensive guide to intimacy, pleasure, and safety written specifically for LGBTQ+ people.",
    readTime: "10 min read",
    color: "from-pink-100 via-purple-100 to-blue-100",
  },
  {
    slug: "cleaning-sex-toys",
    cat: "Care & Safety",
    title: "How to Clean and Store Your Toys",
    excerpt: "Proper cleaning extends the life of your toys and keeps you safe. Material-by-material guide inside.",
    readTime: "4 min read",
    color: "from-green-100 to-teal-100",
  },
];

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
          Written by experts, for everyone.
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
                    {a.cat}
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
