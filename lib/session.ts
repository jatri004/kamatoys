import { cookies } from "next/headers";
import { getCustomer, type Customer, type AccessToken } from "./shopify-customer";

// httpOnly session cookie holding the Shopify customer access token. Because
// it's httpOnly, client-side JS can never read it — the browser only learns
// "logged in?" via the /api/auth/me route, which checks it on the server.
const COOKIE = "kd_customer_token";

export async function setSessionCookie(token: AccessToken) {
  const store = await cookies();
  store.set(COOKIE, token.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(token.expiresAt),
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getSessionToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(COOKIE)?.value;
}

// The currently signed-in customer (or null). Used to gate routes/pages.
export async function getCurrentCustomer(): Promise<Customer | null> {
  const token = await getSessionToken();
  return getCustomer(token);
}
