# Lumen — Intimate Wellness E-Commerce

A modern, production-ready e-commerce storefront for an inclusive intimate-wellness brand. Built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). On first visit you will be prompted by the 18+ age gate.

---

## Project structure

```
app/
  layout.tsx          — Root layout: fonts, CartProvider, AgeGate, Navbar, Footer
  page.tsx            — Home: hero, categories, featured products, values
  shop/
    page.tsx          — Catalogue grid with category filter + sort
    [slug]/page.tsx   — Product detail page (statically generated)
  checkout/
    page.tsx          — Checkout shell (server component)
    CheckoutForm.tsx  — Multi-step checkout form (client component)
  about/page.tsx      — Brand story
  faq/page.tsx        — FAQ: shipping, discretion, returns, materials

components/
  AgeGate.tsx         — 18+ modal, stores consent in localStorage
  Navbar.tsx          — Sticky nav with cart count badge
  Footer.tsx          — Links, discretion signals, legal
  CartDrawer.tsx      — Slide-out cart with quantity controls
  ProductCard.tsx     — Reusable grid card
  AddToCartButton.tsx — "Add to bag" with momentary feedback
  CategoryFilter.tsx  — Client-side filter + sort pills
  TrustMarquee.tsx    — Scrolling trust signals ticker

lib/
  products.ts         — Typed Product model, 8 placeholder products, GBP formatter
  cart.tsx            — CartContext + useCart hook (localStorage-persisted)
  payments.ts         — Payment processor stub + integration docs
```

---

## Swapping in real product images

Replace the `gradient` field on each product in `lib/products.ts` with an image path:

```ts
// Before (placeholder)
gradient: "linear-gradient(135deg, #c9a0c0 0%, #7b3f7e 60%, #2e1235 100%)",

// After (real image)
gradient: "/images/products/aurora-wand.jpg",
```

Then in `ProductCard.tsx` and the product detail page, replace the `<div style={{ background: ... }}>` blocks with:

```tsx
import Image from "next/image";

<Image
  src={product.gradient}   // now a real path
  alt={product.name}
  fill
  className="object-cover"
  priority={priority}
/>
```

Wrap the container in `position: relative` (already `aspect-square`).

---

## Connecting a real payment processor

Adult/intimate products are **high-risk** for standard processors (Stripe, PayPal, Square prohibit them in their ToS).

Recommended processors:

| Processor | Notes |
|-----------|-------|
| [CCBill](https://ccbill.com) | Most widely used in adult e-commerce, global |
| [Verotel](https://verotel.com) | EU-based, strong European coverage |
| [SegPay](https://segpay.com) | Global, well-documented API |
| [Epoch](https://epoch.com) | Long-established in the category |

**Steps:**

1. Sign up and complete merchant KYC / site approval (expect 30–90 days).
2. Open `lib/payments.ts` and replace the `createCheckoutSession` stub with the processor's SDK call.
3. In `app/checkout/CheckoutForm.tsx`, replace the disabled placeholder inputs with the processor's hosted payment fields or redirect flow.
4. Add your API key to `.env.local` (e.g. `PAYMENT_SECRET=xxx`) — never commit it.
5. Add a webhook handler at `app/api/webhooks/payment/route.ts` for confirmations, refunds, and chargebacks.

---

## Hosting notes

- **Vercel** — supports adult content. Set up your project normally; confirm with your account team if volume scales.
- **Netlify, Render, Railway** — check each platform's acceptable-use policy; some restrict adult content.
- Whichever host you choose, ensure your CDN does not have blanket adult-content restrictions.
- Add an `age-restricted: true` header on the root route for platforms that support it.

---

## Environment variables

No env vars are required to run locally. When adding a payment processor, create `.env.local`:

```
PAYMENT_SECRET=your_processor_api_key
PAYMENT_WEBHOOK_SECRET=your_webhook_signing_secret
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Design system

CSS variables in `app/globals.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--color-cream` | `#faf6f1` | Page background |
| `--color-cream-dark` | `#f0e8de` | Card / section background |
| `--color-plum` | `#2e1235` | Primary text, buttons |
| `--color-plum-light` | `#5a2d6b` | Button hover |
| `--color-clay` | `#c0714f` | Accent, CTA highlight |
| `--color-blush` | `#e8c4b8` | Soft accent, badges |

Fonts: **Fraunces** (display serif, loaded via `next/font/google`) + **Manrope** (body sans).

---

## Inclusivity principles baked in

- Gender-neutral, body-neutral copy throughout — no "for him / for her" language.
- Products categorised by **experience** (Solo, For Two, Wellness, Accessories), not anatomy.
- Each product includes a `bodyNeutralNote` field for short inclusive framing.
- 18+ age gate on first visit; "I'm under 18" links navigates away rather than just closing.
- Discretion messaging (plain packaging, billing descriptor) is structural — in footer, FAQ, cart, and checkout — not an afterthought.
