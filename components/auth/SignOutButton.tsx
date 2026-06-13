"use client";

import { LogOut } from "lucide-react";

export default function SignOutButton() {
  // Navigate (not fetch): the logout route redirects through Shopify's
  // end-session endpoint and back, which has to happen in the browser.
  function handleClick() {
    window.location.assign("/api/auth/logout");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
    >
      <LogOut size={15} />
      Log out
    </button>
  );
}
