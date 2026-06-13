import { NextResponse, type NextRequest } from "next/server";
import { exchangeCodeForTokens } from "@/lib/customer-account";
import { readLoginFlow, clearLoginFlow, setSession } from "@/lib/session";

// GET /api/auth/callback — Shopify redirects here after login. Validates the
// state, exchanges the code for tokens, stores the session, and forwards the
// customer to wherever they were headed.
export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const params = request.nextUrl.searchParams;
  const code = params.get("code");
  const state = params.get("state");

  const flow = await readLoginFlow();
  const loginError = (msg: string) =>
    NextResponse.redirect(new URL(`/account/login?error=${msg}`, origin));

  if (!code || !state || !flow.state || state !== flow.state || !flow.verifier) {
    await clearLoginFlow();
    return loginError("auth");
  }

  try {
    const tokens = await exchangeCodeForTokens({
      code,
      codeVerifier: flow.verifier,
      redirectUri: `${origin}/api/auth/callback`,
      origin,
    });
    await setSession(tokens);
  } catch {
    await clearLoginFlow();
    return loginError("auth");
  }

  const next = flow.next || "/account";
  await clearLoginFlow();
  return NextResponse.redirect(new URL(next, origin));
}
