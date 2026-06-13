import { NextResponse, type NextRequest } from "next/server";
import { getCurrentCustomer } from "@/lib/session";
import { isCustomerAuthConfigured } from "@/lib/customer-account";

// Lets client components learn the login state without ever touching the
// httpOnly token cookies. Returns the customer's name + email, or null.
export async function GET(request: NextRequest) {
  const customer = await getCurrentCustomer(request.nextUrl.origin);
  return NextResponse.json({
    configured: isCustomerAuthConfigured(),
    user: customer
      ? {
          name: customer.firstName || customer.displayName || customer.email || "there",
          email: customer.email,
        }
      : null,
  });
}
