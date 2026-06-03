"use client";

import { useEffect, useState } from "react";

const messages = [
  "🇬🇧 Free UK Delivery on orders over £40",
  "🎓 Student Discount — verify with UNiDAYS",
  "✉️ Sign up for 10% off your first order",
  "📦 Discreet packaging, always",
  "💳 Buy now, pay later with Klarna",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="announcement-bar py-2 text-center">
      <p className="text-xs font-medium tracking-widest uppercase">{messages[index]}</p>
    </div>
  );
}
