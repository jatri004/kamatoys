import { NextResponse } from "next/server";
import { logOut } from "@/lib/shopify-customer";
import { getSessionToken, clearSessionCookie } from "@/lib/session";

export async function POST() {
  const token = await getSessionToken();
  if (token) await logOut(token);
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
