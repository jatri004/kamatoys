// ── Payment processor stub ───────────────────────────────────────────────────
//
// IMPORTANT: Adult / intimate-wellness products are classified as "high-risk"
// by mainstream payment networks. Standard processors — Stripe, PayPal,
// Square — prohibit adult-content merchants in their ToS and will terminate
// accounts without notice.
//
// Recommended adult-friendly / high-risk processors (as of 2025):
//
//   • CCBill       — https://ccbill.com    — widely used for adult e-commerce
//   • Verotel      — https://verotel.com   — EU-based, strong EU coverage
//   • SegPay       — https://segpay.com    — global, good API docs
//   • Epoch        — https://epoch.com     — long-established in the space
//   • Paxum        — https://paxum.com     — B2B payments + consumer processing
//
// To integrate:
//   1. Sign up and complete the merchant approval process (expect KYC docs,
//      site review, and a 30–90 day approval window).
//   2. Replace the `createCheckoutSession` stub below with the provider's SDK
//      or REST API call.
//   3. Store the secret key in an environment variable (e.g. PAYMENT_SECRET).
//      Never commit API keys.
//   4. Implement a webhook handler at /api/webhooks/payment to handle order
//      confirmations, refunds, and chargebacks.
//
// ────────────────────────────────────────────────────────────────────────────

export interface CheckoutPayload {
  lineItems: Array<{
    productId: string;
    name: string;
    quantity: number;
    unitPricePence: number;
  }>;
  contactEmail: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
    country: string;
  };
}

export interface CheckoutResult {
  success: boolean;
  orderId?: string;
  redirectUrl?: string;
  error?: string;
}

/**
 * Stub — replace with your chosen processor's API call.
 * Currently just validates the payload shape and returns a mock success.
 */
export async function createCheckoutSession(
  payload: CheckoutPayload
): Promise<CheckoutResult> {
  // TODO: replace this stub with real processor integration
  console.log("[payments] createCheckoutSession called (stub)", payload);

  // Simulate network latency in development
  await new Promise((r) => setTimeout(r, 600));

  return {
    success: true,
    orderId: `LUMEN-${Date.now()}`,
    redirectUrl: "/checkout/confirmation",
  };
}
