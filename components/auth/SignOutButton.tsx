"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function SignOutButton() {
  const { signOut } = useAuth();

  async function handleClick() {
    await signOut();
    window.location.assign("/");
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
