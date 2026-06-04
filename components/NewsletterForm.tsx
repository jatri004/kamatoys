"use client";

interface Props {
  dark?: boolean;
}

export default function NewsletterForm({ dark = false }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Newsletter signup">
      <input
        type="email"
        placeholder="Your email address"
        required
        aria-label="Email address"
        className={`w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none mb-2 ${
          dark
            ? "bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:border-blush-400"
            : "border border-gray-200 focus:border-blush-400 focus:ring-2 focus:ring-blush-100"
        }`}
      />
      <button
        type="submit"
        className={`w-full text-sm font-semibold py-2.5 rounded-lg ${
          dark
            ? "bg-gold-500 text-wine-900 hover:bg-gold-400"
            : "bg-wine-700 text-white hover:bg-wine-800"
        }`}
      >
        Subscribe & Save 10%
      </button>
    </form>
  );
}
