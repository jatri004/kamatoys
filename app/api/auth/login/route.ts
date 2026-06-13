import { NextResponse, type NextRequest } from "next/server";
import { isCustomerAuthConfigured, buildAuthorizeUrl } from "@/lib/customer-account";
import { setLoginFlow } from "@/lib/session";
import { randomToken, codeChallengeS256 } from "@/lib/pkce";

// GET /api/auth/login — start the Customer Account API login. Generates PKCE +
// state, stashes them in short-lived cookies, then redirects to Shopify's
// hosted login (which handles both returning and brand-new customers).
export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const next = request.nextUrl.searchParams.get("next") || "/account";

  if (!isCustomerAuthConfigured()) {
    return NextResponse.redirect(new URL("/account?auth=unconfigured", origin));
  }

  const verifier = randomToken(48);
  const codeChallenge = await codeChallengeS256(verifier);
  const state = randomToken(24);

  await setLoginFlow({ verifier, state, next });

  const url = await buildAuthorizeUrl({
    redirectUri: `${origin}/api/auth/callback`,
    state,
    codeChallenge,
  });
  return NextResponse.redirect(url);
}
