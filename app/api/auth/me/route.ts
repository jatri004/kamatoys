import { NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/session";
import { isShopifyConfigured } from "@/lib/shopify-customer";

// Lets client components learn the login state without ever touching the
// httpOnly token cookie. Returns the customer's display name + email, or null.
export async function GET() {
  const customer = await getCurrentCustomer();
  return NextResponse.json({
    configured: isShopifyConfigured(),
    user: customer
      ? {
          name: customer.firstName || customer.displayName || customer.email,
          email: customer.email,
        }
      : null,
  });
}
