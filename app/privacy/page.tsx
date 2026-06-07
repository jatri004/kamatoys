import LegalLayout from "@/components/LegalLayout";

export const metadata = { title: "Privacy Policy" };

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-display font-bold text-gray-900 pt-2">{children}</h2>
);

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="June 2026">
      <p>
        KamaDesires.com (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This policy
        explains what personal data we collect, how we use it, and your rights under the UK GDPR and the
        Data Protection Act 2018. We are the data controller for the information you provide.
      </p>

      <H>Information we collect</H>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Contact &amp; account details: name, email address, and (optionally) phone number.</li>
        <li>Order &amp; delivery details: billing and shipping address, items purchased.</li>
        <li>Payment information: processed securely by our third-party payment provider — we do not store full card details.</li>
        <li>Technical data: IP address, device and browser type, and cookie data (see our Cookie Policy).</li>
      </ul>

      <H>How we use your information</H>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>To process and deliver your orders and provide customer support.</li>
        <li>To send order updates and, where you have opted in, marketing emails.</li>
        <li>To prevent fraud, verify age eligibility (18+), and meet legal obligations.</li>
        <li>To improve our website and services.</li>
      </ul>

      <H>Legal basis for processing</H>
      <p>
        We process your data to perform our contract with you (fulfilling orders), for our legitimate
        interests (running and improving the business, fraud prevention), to comply with legal
        obligations, and — for marketing — on the basis of your consent, which you may withdraw at any time.
      </p>

      <H>Sharing your information</H>
      <p>
        We share data only as needed with: our payment provider (to take payment), delivery couriers
        (to ship your order, in plain discreet packaging), and IT/hosting providers. We never sell your
        personal data. Some providers may process data outside the UK/EEA under appropriate safeguards.
      </p>

      <H>Data retention</H>
      <p>
        We keep personal data only as long as necessary for the purposes above and to meet legal,
        accounting or reporting requirements, after which it is securely deleted or anonymised.
      </p>

      <H>Your rights</H>
      <p>
        You have the right to access, correct, delete, restrict or object to the processing of your data,
        and to data portability. To exercise any of these, email us at{" "}
        <a href="mailto:privacy@kamadesires.com" className="text-blush-600 hover:underline">privacy@kamadesires.com</a>.
        You also have the right to complain to the UK Information Commissioner&apos;s Office (ico.org.uk).
      </p>

      <H>Security</H>
      <p>
        We use industry-standard measures (including SSL encryption) to protect your data. No method of
        transmission is 100% secure, but we work hard to safeguard your information.
      </p>

      <H>Age restriction</H>
      <p>
        This website and its products are intended only for adults aged 18 or over. We do not knowingly
        collect data from anyone under 18.
      </p>

      <H>Changes &amp; contact</H>
      <p>
        We may update this policy from time to time. Questions? Email{" "}
        <a href="mailto:privacy@kamadesires.com" className="text-blush-600 hover:underline">privacy@kamadesires.com</a>.
      </p>
    </LegalLayout>
  );
}
