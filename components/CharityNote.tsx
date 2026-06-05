"use client";

import { useEffect, useState } from "react";
import { Heart, X } from "lucide-react";

export default function CharityNote() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show shortly after load, unless previously dismissed this session.
    if (sessionStorage.getItem("kd_charity_dismissed")) return;
    const t = setTimeout(() => setShow(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("kd_charity_dismissed", "1");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="status"
      className="fixed bottom-4 left-4 z-[90] max-w-xs w-[calc(100%-2rem)] sm:w-80 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 animate-slide-in"
    >
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute top-2.5 right-2.5 text-gray-300 hover:text-gray-500"
      >
        <X size={16} />
      </button>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
          <Heart size={16} className="text-[#2e008b]" fill="currentColor" />
        </div>
        <div className="pr-4">
          <p className="text-sm font-semibold text-gray-900">We support Cancer Research UK 💙</p>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            A portion of our profits — and any donation you add at checkout — goes to life-saving research.
          </p>
        </div>
      </div>
    </div>
  );
}
