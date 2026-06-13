// PKCE + random-token helpers for the Customer Account API OAuth flow.
// Uses the Web Crypto API (available in Next.js route handlers).

function base64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let str = "";
  for (let i = 0; i < arr.length; i++) str += String.fromCharCode(arr[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// URL-safe random string, e.g. for the PKCE verifier and OAuth state.
export function randomToken(byteLength = 48): string {
  const arr = new Uint8Array(byteLength);
  crypto.getRandomValues(arr);
  return base64url(arr);
}

// S256 code challenge derived from the verifier.
export async function codeChallengeS256(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return base64url(digest);
}
