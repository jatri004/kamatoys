"use client";

import { useEffect, useState } from "react";

const LS_KEY = "lumen_age_verified";

export default function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem(LS_KEY);
    if (!verified) setVisible(true);
  }, []);

  function confirm() {
    localStorage.setItem(LS_KEY, "1");
    setVisible(false);
  }

  function deny() {
    // Navigate away — BBC homepage is a safe, neutral destination
    window.location.href = "https://www.bbc.co.uk";
  }

  if (!visible) return null;

  return (
    /* Trap focus inside the modal — role=dialog + aria-modal tells screen readers */
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ag-title"
      aria-describedby="ag-desc"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(46,18,53,0.85)", backdropFilter: "blur(6px)" }}
    >
      <div className="bg-cream max-w-md w-full rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-up text-center">
        {/* Wordmark */}
        <p className="font-display text-2xl tracking-widest text-plum mb-8">
          LUMEN
        </p>

        <h1
          id="ag-title"
          className="font-display text-3xl md:text-4xl text-plum mb-4"
        >
          Welcome.
        </h1>

        <p id="ag-desc" className="text-plum/70 leading-relaxed mb-8">
          Lumen is an intimate-wellness destination for adults. By entering you
          confirm that you are <strong>18 years of age or older</strong> and
          agree to our{" "}
          <a href="/faq" className="underline underline-offset-2 hover:text-clay transition-colors">
            Terms &amp; Conditions
          </a>
          .
        </p>

        <button
          onClick={confirm}
          className="w-full bg-plum text-cream font-sans font-semibold text-sm tracking-wide py-4 rounded-2xl hover:bg-plum-light transition-colors focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 mb-3"
        >
          I am 18 or older — Enter
        </button>

        <button
          onClick={deny}
          className="w-full text-plum/50 text-sm hover:text-plum transition-colors py-2"
        >
          I&apos;m under 18 — take me away
        </button>
      </div>
    </div>
  );
}
