import { NextResponse } from "next/server";

// Server-side: receive the Yoti result notification, fetch & validate it with
// the private key, then store only the MINIMUM outcome.
//
// We deliberately persist nothing but { pass, ts } in a short-lived, signed,
// httpOnly cookie — no raw identity or biometric data is kept.

export async function POST(request: Request) {
  const sdkId = process.env.YOTI_CLIENT_SDK_ID;
  const apiKey = process.env.YOTI_API_KEY;

  if (!sdkId || !apiKey) {
    return NextResponse.json({ error: "age_verification_not_configured" }, { status: 503 });
  }

  // TODO (requires your Yoti account):
  // 1. Read the session/notification id from the request.
  // 2. Fetch the verification result from Yoti using YOTI_API_KEY (server-side).
  // 3. Derive a single boolean: did the user prove they are 18 or over?
  // 4. Set a signed, httpOnly cookie with only { pass, ts } (e.g. 30-min expiry).
  //
  // const passed = /* result from Yoti */ false;
  // const res = NextResponse.json({ pass: passed });
  // res.cookies.set("kd_age", JSON.stringify({ pass: passed, ts: new Date().toISOString() }), {
  //   httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 30, path: "/",
  // });
  // return res;

  void request;
  return NextResponse.json({ error: "yoti_sdk_not_wired" }, { status: 501 });
}
