import { cookies, headers } from "next/headers";
import {
  fetchCustomer,
  refreshTokens,
  isCustomerAuthConfigured,
  type Customer,
  type TokenSet,
} from "./customer-account";

// httpOnly cookies. Token cookies hold the Customer Account API session; the
// flow cookies are short-lived and only exist between the login redirect and
// the OAuth callback. Because everything is httpOnly, client JS never sees a
// token — it learns "logged in?" only via /api/auth/me.
const AT = "ca_at"; // access token
const RT = "ca_rt"; // refresh token
const IT = "ca_it"; // id token (needed for logout)
const EXP = "ca_exp"; // access-token expiry, epoch ms

const VERIFIER = "ca_verifier";
const STATE = "ca_state";
const NEXT = "ca_next";

const secure = process.env.NODE_ENV === "production";
const base = { httpOnly: true, secure, sameSite: "lax" as const, path: "/" };

// Best-effort origin for the Origin header Shopify requires on token/GraphQL
// calls. In route handlers, pass the request origin explicitly; this helper
// covers Server Components by reading the forwarded headers.
export async function getRequestOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("host") || "localhost:3000";
  const proto =
    h.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

// --- login flow (PKCE verifier + state + post-login destination) -----------

export async function setLoginFlow(data: { verifier: string; state: string; next: string }) {
  const c = await cookies();
  const opts = { ...base, maxAge: 600 }; // 10 minutes
  c.set(VERIFIER, data.verifier, opts);
  c.set(STATE, data.state, opts);
  c.set(NEXT, data.next, opts);
}

export async function readLoginFlow() {
  const c = await cookies();
  return {
    verifier: c.get(VERIFIER)?.value,
    state: c.get(STATE)?.value,
    next: c.get(NEXT)?.value,
  };
}

export async function clearLoginFlow() {
  const c = await cookies();
  [VERIFIER, STATE, NEXT].forEach((n) => c.delete(n));
}

// --- session tokens --------------------------------------------------------

export async function setSession(t: TokenSet, fallbackRefresh?: string) {
  const c = await cookies();
  const opts = { ...base, maxAge: 60 * 60 * 24 * 30 }; // 30 days
  const expMs = t.obtained_at + t.expires_in * 1000;
  c.set(AT, t.access_token, opts);
  c.set(RT, t.refresh_token || fallbackRefresh || "", opts);
  if (t.id_token) c.set(IT, t.id_token, opts);
  c.set(EXP, String(expMs), opts);
}

export async function clearSession() {
  const c = await cookies();
  [AT, RT, IT, EXP].forEach((n) => c.delete(n));
}

export async function getIdToken(): Promise<string | undefined> {
  const c = await cookies();
  return c.get(IT)?.value;
}

// The current signed-in customer (or null). Refreshes the access token when
// expired; persisting the refresh is best-effort (it succeeds in route
// handlers, silently skips in Server Components — which can't set cookies).
export async function getCurrentCustomer(origin: string): Promise<Customer | null> {
  if (!isCustomerAuthConfigured()) return null;
  const c = await cookies();
  let accessToken = c.get(AT)?.value;
  const refreshToken = c.get(RT)?.value;
  const expMs = Number(c.get(EXP)?.value || 0);
  if (!accessToken) return null;

  if (Date.now() > expMs - 60_000 && refreshToken) {
    try {
      const next = await refreshTokens({ refreshToken, origin });
      accessToken = next.access_token;
      try {
        await setSession(next, refreshToken);
      } catch {
        // Server Component context — can't persist; fine for this request.
      }
    } catch {
      return null;
    }
  }

  try {
    return await fetchCustomer({ accessToken: accessToken!, origin });
  } catch {
    return null;
  }
}
