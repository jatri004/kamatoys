import LegalLayout from "@/components/LegalLayout";

export const metadata = { title: "Cookie Policy" };

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-display font-bold text-gray-900 pt-2">{children}</h2>
);

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" updated="June 2026">
      <p>
        This policy explains how KamaDesires.com uses cookies and similar technologies when you visit our
        website.
      </p>

      <H>What are cookies?</H>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help the site
        work, remember your preferences, and understand how it is used.
      </p>

      <H>Types of cookies we use</H>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>
          <strong>Essential cookies</strong> — required for the site to function, such as remembering your
          age-verification choice, your basket, and your wishlist. The site won&apos;t work properly without these.
        </li>
        <li>
          <strong>Preference cookies</strong> — remember choices you make to improve your experience.
        </li>
        <li>
          <strong>Analytics cookies</strong> — help us understand how visitors use the site so we can
          improve it. These are only set with your consent.
        </li>
      </ul>

      <H>Managing cookies</H>
      <p>
        You can control or delete cookies through your browser settings, and set most browsers to block
        them. Please note that blocking essential cookies may stop parts of the site (like the basket or
        age gate) from working correctly.
      </p>

      <H>Changes &amp; contact</H>
      <p>
        We may update this policy from time to time. For any questions, email{" "}
        <a href="mailto:privacy@kamadesires.com" className="text-blush-600 hover:underline">privacy@kamadesires.com</a>.
      </p>
    </LegalLayout>
  );
}
