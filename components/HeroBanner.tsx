"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// `pos` keeps the people in frame when the landscape photo is cropped.
const images = [
  { src: "/images/hero-1.jpg", alt: "Woman with an intimate wellness product", pos: "object-center" },
  { src: "/images/hero-2.jpg", alt: "Couple in a luxury suite", pos: "object-center" },
  { src: "/images/hero-3.jpg", alt: "Man relaxing with a wellness product", pos: "object-[32%_center]" },
  { src: "/images/hero-4.jpg", alt: "Two women enjoying a getaway", pos: "object-center" },
];

export default function HeroBanner() {
  const [i, setI] = useState(0);

  // Auto-advance the mobile carousel left → right.
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Desktop / laptop: all 4 photos stay, side by side */}
      <div className="hidden md:grid grid-cols-4 h-full">
        {images.map((img) => (
          <div key={img.src} className="relative h-full">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority
              sizes="25vw"
              className={`object-cover ${img.pos}`}
            />
          </div>
        ))}
      </div>

      {/* Mobile: sliding carousel (left → right) */}
      <div className="md:hidden relative h-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {images.map((img) => (
            <div key={img.src} className="relative h-full w-full flex-shrink-0">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority
                sizes="100vw"
                className={`object-cover ${img.pos}`}
              />
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
