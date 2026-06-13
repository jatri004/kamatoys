"use client";

import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import AuthShell from "@/components/auth/AuthShell";

export default function LoginForm() {
  const params = useSearchParams();
  const { configured } = useAuth();

  const next = params.get("next") || "/account";
  const reason = params.get("reason");
  const error = params.get("error");

  const loginHref = `/api/auth/login?next=${encodeURIComponent(next)}`;

  return (
    <AuthShell
      title="Log in or sign up"
      subtitle={
        reason === "whatsapp"
          ? "Sign in to start a private WhatsApp chat with our team."
          : "Sign in to your KamaDesires account."
      }
    >
      {!configured && (
        <p className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Customer accounts aren&apos;t switched on yet. Please check back soon.
        </p>
      )}

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Sorry, that didn&apos;t work. Please try signing in again.
        </p>
      )}

      <p className="mb-5 text-sm text-gray-600">
        We&apos;ll send a one-time code to your email — no password to remember.
        New customers get an account automatically.
      </p>

      <a
        href={loginHref}
        aria-disabled={!configured}
        className={`block w-full rounded-full py-3 text-center text-sm font-semibold text-white transition ${
          configured
            ? "bg-wine-800 hover:bg-wine-900"
            : "pointer-events-none bg-gray-300"
        }`}
      >
        Continue with email
      </a>

      <p className="mt-6 text-center text-xs text-gray-400">
        You&apos;ll be taken to our secure Shopify sign-in, then brought back here.
      </p>
    </AuthShell>
  );
}
