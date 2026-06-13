"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import AuthShell from "@/components/auth/AuthShell";

export default function LoginForm() {
  const params = useSearchParams();
  const { configured, refresh } = useAuth();

  const next = params.get("next") || "/account";
  const reason = params.get("reason");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setSubmitting(false);
      setError(data.error || "Incorrect email or password.");
      return;
    }

    await refresh();
    // Full navigation so server components pick up the new session cookie.
    window.location.assign(next);
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle={
        reason === "whatsapp"
          ? "Log in to start a private WhatsApp chat with our team."
          : "Log in to your KamaDesires account."
      }
    >
      {!configured && (
        <p className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Customer accounts aren&apos;t configured yet.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blush-400 focus:outline-none focus:ring-2 focus:ring-blush-100"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blush-400 focus:outline-none focus:ring-2 focus:ring-blush-100"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-wine-800 py-2.5 text-sm font-semibold text-white transition hover:bg-wine-900 disabled:opacity-60"
        >
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        New here?{" "}
        <Link
          href={`/account/signup${next !== "/account" ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="font-semibold text-blush-600 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
