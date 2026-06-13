"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./env";

// Browser-side Supabase client for client components (login/signup forms, the
// auth context, etc.). Returns null when Supabase isn't configured yet so the
// UI can fall back to a "not available" state instead of throwing.
export function createClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
}
