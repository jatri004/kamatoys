import { NextResponse } from "next/server";

// Server-side: start a Yoti age-verification session.
//
// Credentials are read from server-only environment variables and are NEVER
// exposed to the client:
//   YOTI_CLIENT_SDK_ID   — your Yoti client SDK id
//   YOTI_API_KEY         — your Yoti private API key (PEM)  ← secret
//
// This route is intentionally fail-closed: if Yoti isn't configured it returns
// 503 so the checkout stays blocked.

export async function POST() {
  const sdkId = process.env.YOTI_CLIENT_SDK_ID;
  const apiKey = process.env.YOTI_API_KEY;

  if (!sdkId || !apiKey) {
    return NextResponse.json(
      { error: "age_verification_not_configured" },
      { status: 503 }
    );
  }

  // TODO (requires your Yoti account + chosen product):
  // 1. Use the Yoti Node SDK / Identity Verification API to create a session
  //    requesting an "age over 18" check.
  // 2. Return the session token / iframe URL the client needs to launch the flow.
  // 3. Yoti notifies POST /api/age/result; fetch the result server-side with the
  //    private key, then set a short-lived, signed, httpOnly cookie holding only
  //    { pass: boolean, ts: string } — never raw ID/biometric data.
  //
  // Example shape the client expects:
  //   return NextResponse.json({ sessionToken, launchUrl });

  return NextResponse.json(
    { error: "yoti_sdk_not_wired", message: "Add the Yoti SDK call here." },
    { status: 501 }
  );
}
