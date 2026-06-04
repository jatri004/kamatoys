"use client";

import { useEffect, useState } from "react";

export default function AgeVerification() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("kt_age_verified");
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("kt_age_verified", "true");
    setShow(false);
  };

  const decline = () => {
    window.location.href = "https://www.google.com";
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div className="relative max-w-sm w-full mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Top accent */}
        <div className="h-1.5 gold-gradient" />

        <div className="p-8 text-center">
          <div className="text-4xl mb-4">🔞</div>
          <h2
            id="age-gate-title"
            className="text-2xl font-display font-bold text-gray-900 mb-2"
          >
            Age Verification
          </h2>
          <p className="text-sm text-gray-600 mb-1">
            This website contains adult products intended for purchase by adults only.
          </p>
          <p className="text-sm font-semibold text-gray-800 mb-6">
            Are you 18 years of age or older?
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={accept}
              className="w-full bg-wine-800 text-white font-semibold py-3 rounded-lg hover:bg-wine-900 focus:bg-wine-900"
            >
              Yes, I am 18 or over — Enter
            </button>
            <button
              onClick={decline}
              className="w-full border border-gray-300 text-gray-600 font-medium py-3 rounded-lg hover:bg-gray-50"
            >
              No, take me away
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            By entering you confirm you are of legal age in your jurisdiction.
          </p>
        </div>
      </div>
    </div>
  );
}
