"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import AuthShell from "@/components/auth/AuthShell";

export default function SignupForm() {
  const params = useSearchParams();
  const { configured, refresh } = useAuth();
  const next = params.get("next") || "/account";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName: name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setSubmitting(false);
      setError(data.error || "Could not create your account.");
      return;
    }

    await refresh();
    window.location.assign(next);
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join for discreet chat support, faster checkout and order tracking."
    >
      {!configured && (
        <p className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Customer accounts aren&apos;t configured yet.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
            First name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="given-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blush-400 focus:outline-none focus:ring-2 focus:ring-blush-100"
          />
        </div>
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
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blush-400 focus:outline-none focus:ring-2 focus:ring-blush-100"
          />
          <p className="mt-1 text-xs text-gray-400">At least 8 characters.</p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-wine-800 py-2.5 text-sm font-semibold text-white transition hover:bg-wine-900 disabled:opacity-60"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-gray-400">
        By creating an account you confirm you are 18+ and agree to our{" "}
        <Link href="/terms" className="underline">terms</Link> and{" "}
        <Link href="/privacy" className="underline">privacy policy</Link>.
      </p>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href={`/account/login${next !== "/account" ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="font-semibold text-blush-600 hover:underline"
        >
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
