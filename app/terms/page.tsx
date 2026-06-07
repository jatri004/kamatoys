import LegalLayout from "@/components/LegalLayout";

export const metadata = { title: "Terms of Service" };

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-display font-bold text-gray-900 pt-2">{children}</h2>
);

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="June 2026">
      <p>
        These terms govern your use of KamaDesires.com and any purchase you make from us. By using this
        website or placing an order, you agree to these terms.
      </p>

      <H>Eligibility (18+)</H>
      <p>
        You must be at least 18 years old to use this website or buy our products. By placing an order you
        confirm you are 18 or over and that the products are for personal use.
      </p>

      <H>Products &amp; pricing</H>
      <p>
        We try to describe and price products accurately, but errors can occur. Prices include VAT where
        applicable and are shown in GBP. We may correct errors and update prices at any time before your
        order is accepted. Product images are for illustration.
      </p>

      <H>Orders &amp; acceptance</H>
      <p>
        Your order is an offer to buy. A contract forms only when we send you a dispatch confirmation. We
        may decline or cancel an order (for example, if an item is out of stock, a pricing error occurs,
        or we cannot verify your details), and we will refund any payment taken.
      </p>

      <H>Payment</H>
      <p>
        Payment is taken securely via our third-party payment provider. By submitting payment details you
        confirm you are authorised to use the payment method.
      </p>

      <H>Delivery</H>
      <p>
        All orders are sent in plain, discreet packaging. Delivery times are estimates. Risk passes to you
        on delivery. See our <a href="/delivery" className="text-blush-600 hover:underline">Delivery Information</a> page for details.
      </p>

      <H>Returns &amp; refunds</H>
      <p>
        For hygiene reasons, certain intimate products cannot be returned once opened, except where faulty.
        Please see our <a href="/returns" className="text-blush-600 hover:underline">Returns &amp; Refunds</a> page for full details and your statutory rights.
      </p>

      <H>Acceptable use</H>
      <p>
        You agree not to misuse the website, attempt to gain unauthorised access, or use it for any unlawful
        purpose.
      </p>

      <H>Intellectual property</H>
      <p>
        All content on this website (text, design, logos and images) is owned by or licensed to
        KamaDesires.com and may not be copied or reused without permission.
      </p>

      <H>Limitation of liability</H>
      <p>
        Nothing in these terms limits liability that cannot be excluded by law (including for death or
        personal injury caused by negligence, or fraud). Subject to that, our liability arising from your
        use of the site or products is limited to the value of your order.
      </p>

      <H>Governing law</H>
      <p>
        These terms are governed by the laws of England and Wales, and disputes are subject to the
        exclusive jurisdiction of its courts.
      </p>

      <H>Contact</H>
      <p>
        Questions about these terms? Email{" "}
        <a href="mailto:hello@kamadesires.com" className="text-blush-600 hover:underline">hello@kamadesires.com</a>.
      </p>
    </LegalLayout>
  );
}
