import { NextResponse, type NextRequest } from "next/server";
import { logIn, isShopifyConfigured } from "@/lib/shopify-customer";
import { setSessionCookie } from "@/lib/session";

export async function POST(request: NextRequest) {
  if (!isShopifyConfigured()) {
    return NextResponse.json(
      { error: "Accounts aren't switched on yet." },
      { status: 503 }
    );
  }

  const { email, password } = await request.json().catch(() => ({}));
  if (!email || !password) {
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
  }

  const { token, error } = await logIn({ email, password });
  if (error || !token) {
    return NextResponse.json(
      { error: error || "Incorrect email or password." },
      { status: 401 }
    );
  }

  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
