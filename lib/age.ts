// Age-verification config & types.
//
// Mode is controlled by NEXT_PUBLIC_AGE_VERIFY_MODE:
//   "yoti" — real Yoti flow (requires server credentials, see /api/age/*)
//   "demo" — simulated verification for development/testing (DEFAULT)
//   "off"  — fail-closed: checkout blocked until configured
//
// We only ever store the MINIMUM result (pass/fail + timestamp + method).
// No raw ID/biometric data is kept client-side.

export type AgeVerifyMode = "yoti" | "demo" | "off";

export const AGE_VERIFY_MODE: AgeVerifyMode =
  (process.env.NEXT_PUBLIC_AGE_VERIFY_MODE as AgeVerifyMode) || "demo";

// Public Yoti client SDK id (safe to expose). Private API key stays server-side.
export const YOTI_CLIENT_SDK_ID = process.env.NEXT_PUBLIC_YOTI_CLIENT_SDK_ID || "";

export interface AgeResult {
  pass: boolean;
  ts: string; // ISO timestamp
  method: "yoti" | "demo";
}

export const AGE_RESULT_STORAGE_KEY = "kd_age_result";
