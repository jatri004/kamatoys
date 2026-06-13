import { NextResponse, type NextRequest } from "next/server";
import { signUp, isShopifyConfigured } from "@/lib/shopify-customer";
import { setSessionCookie } from "@/lib/session";

export async function POST(request: NextRequest) {
  if (!isShopifyConfigured()) {
    return NextResponse.json(
      { error: "Accounts aren't switched on yet." },
      { status: 503 }
    );
  }

  const { firstName, email, password } = await request.json().catch(() => ({}));
  if (!email || !password || !firstName) {
    return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
  }
  if (String(password).length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const { token, error } = await signUp({ firstName, email, password });
  if (error || !token) {
    return NextResponse.json({ error: error || "Could not create account." }, { status: 400 });
  }

  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
