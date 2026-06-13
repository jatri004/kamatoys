import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./env";

// Server-side Supabase client for Server Components, Route Handlers and Server
// Actions. Reads/writes the auth cookies via next/headers. Returns null when
// Supabase isn't configured yet.
export async function createClient() {
  if (!isSupabaseConfigured) return null;

  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component where cookies can't be set. The
          // middleware refreshes the session instead, so this is safe to ignore.
        }
      },
    },
  });
}

// Convenience: the current signed-in user (or null). Use this to gate server
// routes and protected pages.
export async function getUser() {
  const supabase = await createClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
