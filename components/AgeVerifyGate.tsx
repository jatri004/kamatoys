"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, Loader2, BadgeCheck } from "lucide-react";
import { AGE_VERIFY_MODE, AGE_RESULT_STORAGE_KEY, type AgeResult } from "@/lib/age";

interface Props {
  onResult: (result: AgeResult | null) => void;
}

type Status = "idle" | "loading" | "passed" | "failed" | "unavailable";

export default function AgeVerifyGate({ onResult }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const persist = (result: AgeResult) => {
    try {
      localStorage.setItem(AGE_RESULT_STORAGE_KEY, JSON.stringify(result));
    } catch {}
  };

  const succeed = (method: AgeResult["method"]) => {
    const result: AgeResult = { pass: true, ts: new Date().toISOString(), method };
    persist(result);
    setStatus("passed");
    onResult(result);
  };

  const fail = (msg: string) => {
    setStatus("failed");
    setMessage(msg);
    onResult(null);
  };

  const startVerification = async () => {
    setStatus("loading");
    setMessage("");

    // DEMO mode — simulated check for development/testing only.
    if (AGE_VERIFY_MODE === "demo") {
      setTimeout(() => succeed("demo"), 900);
      return;
    }

    // OFF — fail closed.
    if (AGE_VERIFY_MODE !== "yoti") {
      setStatus("unavailable");
      onResult(null);
      return;
    }

    // YOTI mode — create a server session, then launch Yoti.
    try {
      const res = await fetch("/api/age/session", { method: "POST" });
      if (res.status === 503) {
        setStatus("unavailable");
        onResult(null);
        return;
      }
      if (!res.ok) throw new Error("Could not start verification");
      const data = (await res.json()) as { sessionToken?: string };
      // TODO (needs your Yoti account): launch the Yoti SDK/redirect with
      // data.sessionToken, then confirm the result via /api/age/result.
      // Until that is wired with real credentials we treat it as pending.
      if (!data.sessionToken) {
        setStatus("unavailable");
        onResult(null);
        return;
      }
      setStatus("unavailable");
      setMessage("Yoti session created — SDK launch pending credentials.");
      onResult(null);
    } catch {
      fail("We couldn't complete age verification. Please try again.");
    }
  };

  if (status === "passed") {
    return (
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
        <BadgeCheck size={20} className="text-green-600 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-green-800">Age verified — you&apos;re 18 or over.</p>
          {AGE_VERIFY_MODE === "demo" && (
            <p className="text-xs text-green-700/70 mt-0.5">Demo verification — replace with Yoti for production.</p>
          )}
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <ShieldAlert size={20} className="text-red-500 flex-shrink-0" />
          <p className="text-sm font-semibold text-red-700">Verification not passed</p>
        </div>
        <p className="text-sm text-red-700/80">{message || "We could not confirm you are 18 or over, so this purchase cannot proceed."}</p>
        <button type="button" onClick={startVerification} className="mt-3 text-sm font-medium text-red-700 underline">
          Try again
        </button>
      </div>
    );
  }

  if (status === "unavailable") {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-1">
          <ShieldAlert size={20} className="text-amber-500 flex-shrink-0" />
          <p className="text-sm font-semibold text-amber-800">Age verification is being set up</p>
        </div>
        <p className="text-sm text-amber-800/80">
          {message || "Verification is temporarily unavailable, so checkout is paused. Please check back soon."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <ShieldCheck size={20} className="text-blush-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Verify your age (18+)</p>
          <p className="text-xs text-gray-500 mt-0.5 mb-3">
            We use secure age verification. We only keep a pass/fail result — never your ID details.
          </p>
          <button
            type="button"
            onClick={startVerification}
            disabled={status === "loading"}
            className="inline-flex items-center gap-2 bg-wine-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-wine-900 disabled:opacity-60"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Verifying…
              </>
            ) : (
              <>Verify my age</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
