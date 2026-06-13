// Shared Supabase env access.
//
// Both vars are PUBLIC by design (the anon key is meant to be exposed to the
// browser; row-level security on the database is what protects your data).
// The WhatsApp number is deliberately NOT here — it is server-only and lives
// in app/api/whatsapp/launch/route.ts.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// True once the site owner has filled in the Supabase keys. Until then, auth
// gracefully no-ops so the rest of the site keeps building and running.
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
