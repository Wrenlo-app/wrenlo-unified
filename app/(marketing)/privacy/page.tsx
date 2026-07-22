import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Wrenlo AI",
  description: "How Wrenlo collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="legal-hero">
        <div className="container">
          <span className="legal-eyebrow">Legal</span>
          <h1>Privacy Policy</h1>
          <p>How Wrenlo collects, uses and protects your information.</p>
        </div>
      </div>

      <div className="legal-body">
        <p className="last-updated">Last updated: June 2026 · Effective date: June 2026</p>

        <h2>1. Who we are</h2>
        <p>
          Wrenlo (&quot;Wrenlo&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates
          the website at wrenlo.co and any related services. Our contact email is{" "}
          <a href="mailto:hello@wrenlo.co">hello@wrenlo.co</a>. We are committed to protecting
          your personal information and your right to privacy.
        </p>

        <h2>2. Information we collect</h2>
        <p>We collect information you provide directly when you:</p>
        <ul>
          <li>Fill in our survey or waitlist form (name, email, trade, team size)</li>
          <li>Contact us by email</li>
          <li>Sign up for a free trial or paid account</li>
        </ul>
        <p>
          We also automatically collect certain technical information when you visit our site,
          including your IP address, browser type, pages viewed, and referring URL — via Google
          Analytics 4. This data is anonymised and used only for aggregate analytics.
        </p>

        <h2>3. How we use your information</h2>
        <ul>
          <li>To send you the survey confirmation and entry number</li>
          <li>To contact you about the $100 gift card draw result</li>
          <li>To send the industry benchmark report once available (opt-in by submitting the survey)</li>
          <li>To notify you about Wrenlo&apos;s early access launch</li>
          <li>To improve our product based on your feedback</li>
          <li>To respond to your support requests</li>
        </ul>
        <p>
          We do not use your data for advertising. We do not sell, rent or share your personal
          data with third parties for their marketing purposes.
        </p>

        <h2>4. Data storage</h2>
        <p>
          Survey responses and lead data are stored securely in Supabase (hosted on AWS
          US-East-1). Email is managed via Google Workspace. We implement row-level security so
          data is accessible only by authorised personnel.
        </p>

        <h2>5. Cookies</h2>
        <p>
          We use Google Analytics 4 cookies to understand aggregate traffic patterns. No
          personally identifiable information is stored in cookies. You can opt out of Google
          Analytics by installing the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noreferrer"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>

        <h2>6. Your rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data at any time</li>
          <li>Unsubscribe from all communications with one click</li>
        </ul>
        <p>
          To exercise any of these rights, email us at{" "}
          <a href="mailto:hello@wrenlo.co">hello@wrenlo.co</a> and we will respond within 5
          business days.
        </p>

        <h2>7. Data retention</h2>
        <p>
          We retain survey and lead data for up to 2 years or until you request deletion. If
          Wrenlo ceases operations, we will notify all users and provide a data export option
          before deletion.
        </p>

        <h2 id="sms-consent">8. SMS / Text Messaging Consent</h2>
        <p>
          Wrenlo provides an automated missed-call text-back service on behalf of the home
          service businesses we work with (each a &quot;Business&quot;). If you call a Business
          that uses Wrenlo and your call is not immediately answered, you may receive a text
          message from that Business following up on your call.
        </p>
        <p>
          If you call a Business that uses Wrenlo and your call is not answered, you may receive a one-time SMS from that Business offering to follow up. Responding to that message is entirely optional. You may reply STOP at any time to receive no further messages. No follow-up messages are sent unless you reply YES. Message frequency varies
          based on your interaction with the Business. Message and data rates may apply.
        </p>
        <p>
          You can opt out of receiving further text messages at any time by replying{" "}
          <strong>STOP</strong> to any message. You can reply <strong>HELP</strong> for
          assistance. Wrenlo and the Business will not share your mobile number with third
          parties for marketing purposes.
        </p>
        <p>
          For questions about this messaging program, contact us at{" "}
          <a href="mailto:hello@wrenlo.co">hello@wrenlo.co</a>.
        </p>

        <h2>9. Third-party services</h2>
        <p>We use the following third-party services, each with their own privacy policies:</p>
        <ul>
          <li><strong>Supabase</strong> — database (supabase.com/privacy)</li>
          <li><strong>Google Analytics 4</strong> — website analytics (policies.google.com/privacy)</li>
          <li><strong>Stripe</strong> — payment processing (stripe.com/privacy)</li>
          <li><strong>Tally.so</strong> — survey collection (tally.so/privacy)</li>
          <li><strong>Resend</strong> — transactional email (resend.com/privacy)</li>
          <li><strong>Twilio</strong> — SMS delivery (twilio.com/legal/privacy)</li>
          <li><strong>Retell AI</strong> — voice AI and call handling (retellai.com/privacy)</li>
        </ul>

        <h2>10. Children&apos;s privacy</h2>
        <p>
          Wrenlo is not directed at children under 16. We do not knowingly collect personal data
          from anyone under 16. If you believe we have inadvertently collected such data,
          contact us immediately at <a href="mailto:hello@wrenlo.co">hello@wrenlo.co</a>.
        </p>

        <h2>11. Changes to this policy</h2>
        <p>
          We may update this policy as our service evolves. We will notify users of material
          changes via email. Continued use of Wrenlo after changes constitutes acceptance of the
          updated policy.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about this Privacy Policy? Email us at{" "}
          <a href="mailto:hello@wrenlo.co">hello@wrenlo.co</a> — a real person will reply within
          1 business day.
        </p>

        <div className="legal-rule" />
        <p style={{ fontSize: 13 }}>
          ← <Link href="/">Back to Wrenlo</Link> &nbsp;·&nbsp; <Link href="/terms">Terms of Service</Link>
        </p>
      </div>
    </>
  );
}
