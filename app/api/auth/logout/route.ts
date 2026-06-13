import { NextResponse, type NextRequest } from "next/server";
import { isCustomerAuthConfigured, buildLogoutUrl } from "@/lib/customer-account";
import { getIdToken, clearSession } from "@/lib/session";

// GET /api/auth/logout — clear our session cookies, then bounce through
// Shopify's end-session endpoint so the customer is logged out there too,
// returning to the home page.
export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const idToken = await getIdToken();
  await clearSession();

  if (idToken && isCustomerAuthConfigured()) {
    try {
      const url = await buildLogoutUrl({ idToken, postLogoutRedirectUri: origin });
      return NextResponse.redirect(url);
    } catch {
      // fall through to local redirect
    }
  }
  return NextResponse.redirect(new URL("/", origin));
}
