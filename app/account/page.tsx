import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MessageCircle, Package, Heart, LogOut } from "lucide-react";
import { getUser } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import SignOutButton from "@/components/auth/SignOutButton";

export const metadata: Metadata = {
  title: "My account",
};

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ chat?: string }>;
}) {
  const { chat } = await searchParams;

  // Before Supabase is configured there's no auth at all — show a friendly
  // notice rather than redirect-looping.
  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-gray-900">Accounts coming soon</h1>
        <p className="mt-2 text-sm text-gray-500">
          Customer accounts aren&apos;t switched on yet. Please check back soon.
        </p>
      </div>
    );
  }

  const user = await getUser();
  if (!user) redirect("/account/login");

  const name =
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "there";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hi {name} 👋</h1>
          <p className="mt-1 text-sm text-gray-500">{user.email}</p>
        </div>
        <SignOutButton />
      </div>

      {chat === "unavailable" && (
        <p className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          WhatsApp chat isn&apos;t available right now. Please try again later or
          use our <Link href="/contact" className="underline">contact form</Link>.
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href="/api/whatsapp/launch"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-[#25D366]/40 hover:shadow"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
            <MessageCircle size={22} />
          </span>
          <span>
            <span className="block font-semibold text-gray-900">Chat with us</span>
            <span className="block text-sm text-gray-500">
              Private WhatsApp support
            </span>
          </span>
        </a>

        <Link
          href="/track-order"
          className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-blush-300 hover:shadow"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush-50 text-blush-500">
            <Package size={22} />
          </span>
          <span>
            <span className="block font-semibold text-gray-900">Track an order</span>
            <span className="block text-sm text-gray-500">See delivery status</span>
          </span>
        </Link>

        <Link
          href="/wishlist"
          className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-blush-300 hover:shadow"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush-50 text-blush-500">
            <Heart size={22} />
          </span>
          <span>
            <span className="block font-semibold text-gray-900">My wishlist</span>
            <span className="block text-sm text-gray-500">Saved products</span>
          </span>
        </Link>

        <Link
          href="/contact"
          className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-blush-300 hover:shadow"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <LogOut size={22} className="rotate-180" />
          </span>
          <span>
            <span className="block font-semibold text-gray-900">Help &amp; contact</span>
            <span className="block text-sm text-gray-500">Other ways to reach us</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
