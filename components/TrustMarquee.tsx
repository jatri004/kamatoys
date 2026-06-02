const TRUST_ITEMS = [
  "Body-safe materials only",
  "Plain unbranded packaging",
  "Discreet billing descriptor",
  "2-year warranty",
  "UK shipping 2–4 days",
  "Free returns within 30 days",
  "No account required",
  "Phthalate-free, latex-free",
];

export default function TrustMarquee() {
  // Duplicate items so the marquee loops seamlessly
  const doubled = [...TRUST_ITEMS, ...TRUST_ITEMS];

  return (
    <div
      className="overflow-hidden bg-plum text-cream/70 py-3 select-none"
      aria-label="Trust signals"
    >
      <div
        className="flex gap-0 whitespace-nowrap animate-marquee"
        aria-hidden="true" // decorative — content repeated in footer
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center text-xs tracking-wider">
            <span className="mx-6 text-clay" aria-hidden="true">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
