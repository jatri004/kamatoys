import { NextResponse, type NextRequest } from "next/server";
import { getCurrentCustomer } from "@/lib/session";

// Server-only WhatsApp number (international format, digits only, e.g.
// "447123456789"). Because this is read here on the server and never sent to
// the client, the number never appears in the page HTML or the JS bundle.
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER;

const PREFILLED_MESSAGE = "Hi KamaDesires, I have a question about ";

// GET /api/whatsapp/launch
// 1. Requires a signed-in customer — otherwise redirect to login.
// 2. 302-redirects to wa.me with the number injected server-side.
export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;

  const customer = await getCurrentCustomer(origin);
  if (!customer) {
    const loginUrl = new URL("/account/login", origin);
    loginUrl.searchParams.set("next", "/api/whatsapp/launch");
    loginUrl.searchParams.set("reason", "whatsapp");
    return NextResponse.redirect(loginUrl);
  }

  if (!WHATSAPP_NUMBER) {
    // Misconfiguration: signed in, but the owner hasn't set the number yet.
    return NextResponse.redirect(new URL("/account?chat=unavailable", origin));
  }

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    PREFILLED_MESSAGE
  )}`;
  return NextResponse.redirect(waUrl);
}
