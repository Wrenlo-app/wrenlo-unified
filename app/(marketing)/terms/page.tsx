import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Wrenlo AI",
  description: "The rules of the road for using Wrenlo.",
};

export default function TermsPage() {
  return (
    <>
      <div className="legal-hero">
        <div className="container">
          <span className="legal-eyebrow">Legal</span>
          <h1>Terms of Service</h1>
          <p>The rules of the road for using Wrenlo.</p>
        </div>
      </div>

      <div className="legal-body">
        <p className="last-updated">Last updated: May 2026 · Effective date: May 2026</p>

        <h2>1. Acceptance of terms</h2>
        <p>
          By accessing wrenlo.co or participating in our survey, you agree to be bound by these
          Terms of Service. If you do not agree, please do not use our services. These terms
          constitute a legally binding agreement between you and Wrenlo.
        </p>

        <h2>2. Description of service</h2>
        <p>
          Wrenlo is a business management platform for trade contractors including HVAC,
          plumbing, electrical, painting and remodeling businesses. We are currently in a
          pre-launch / beta phase. Features described on our website represent our intended
          product roadmap and may change based on customer feedback and technical requirements.
        </p>

        <h2>3. Survey and giveaway terms</h2>
        <p>By participating in our $100 Amazon gift card survey:</p>
        <ul>
          <li>You must be 18 years of age or older and a legal resident of the United States or a country where participation is not prohibited</li>
          <li>One entry per person — duplicate entries will be disqualified</li>
          <li>The winner is selected by random draw after 200 completed survey responses</li>
          <li>The prize is a $100 Amazon gift card, delivered electronically to the winner&apos;s email within 5 business days of the draw</li>
          <li>Wrenlo employees and their immediate family members are not eligible</li>
          <li>No purchase is necessary to participate</li>
          <li>Wrenlo reserves the right to cancel or modify the giveaway at any time with notice to participants</li>
        </ul>

        <h2>4. Waitlist and early access</h2>
        <p>
          Joining our waitlist does not guarantee access to Wrenlo&apos;s software product. We
          will contact waitlist members in order of signup when early access becomes available.
          Founding member pricing offered to early waitlist members is subject to availability
          and may change.
        </p>

        <h2>5. Intellectual property</h2>
        <p>
          All content on wrenlo.co — including text, design, graphics, logos and code — is owned
          by Wrenlo and protected by copyright. You may not reproduce, distribute or create
          derivative works without our written permission.
        </p>

        <h2>6. User conduct</h2>
        <p>When using Wrenlo&apos;s services you agree not to:</p>
        <ul>
          <li>Provide false or misleading information in survey responses</li>
          <li>Attempt to submit multiple survey entries</li>
          <li>Use automated tools to interact with our website</li>
          <li>Attempt to access or tamper with our database or backend systems</li>
          <li>Use our services for any unlawful purpose</li>
        </ul>

        <h2>7. Disclaimer of warranties</h2>
        <p>
          Wrenlo is provided &quot;as is&quot; during our pre-launch phase. We make no
          warranties, express or implied, regarding the completeness, accuracy or fitness for a
          particular purpose of any content or functionality described on this website. Our
          software product has not yet launched and features are subject to change.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law, Wrenlo shall not be liable for any
          indirect, incidental, special or consequential damages arising from your use of our
          website or participation in our survey. Our total liability for any claims arising
          from these terms shall not exceed $100 USD.
        </p>

        <h2 id="sms-terms">9. SMS / Text Messaging Program</h2>
        <p>
          As part of our service, Wrenlo sends automated text messages on behalf of the home
          service businesses we work with (each a &quot;Business&quot;) to that Business&apos;s
          customers who call but are not immediately answered. By calling a Business that uses
          Wrenlo, you consent to receive a one-time automated text message follow-up related to
          that call. Message frequency varies based on your interaction with the Business.
          Message and data rates may apply.
        </p>
        <p>
          You may opt out of this messaging program at any time by replying{" "}
          <strong>STOP</strong> to any message, or reply <strong>HELP</strong> for assistance.
          Wrenlo and the Business will not share your mobile number with third parties for
          marketing purposes. This SMS program is also described in our{" "}
          <Link href="/privacy#sms-consent">Privacy Policy</Link>.
        </p>

        <h2>10. Privacy</h2>
        <p>
          Our collection and use of personal information is governed by our{" "}
          <Link href="/privacy">Privacy Policy</Link>, which is incorporated by reference into
          these terms.
        </p>

        <h2>11. Governing law</h2>
        <p>
          These terms are governed by the laws of the State of Delaware, United States, without
          regard to its conflict of law provisions. Any disputes shall be resolved in the courts
          of Delaware.
        </p>

        <h2>12. Changes to terms</h2>
        <p>
          We may update these terms as our service evolves. Continued use of Wrenlo after
          changes are posted constitutes acceptance of the updated terms. We will email users
          about material changes.
        </p>

        <h2>13. Contact</h2>
        <p>
          Questions about these terms? Email us at{" "}
          <a href="mailto:hello@wrenlo.co">hello@wrenlo.co</a>.
        </p>

        <div className="legal-rule" />
        <p style={{ fontSize: 13 }}>
          ← <Link href="/">Back to Wrenlo</Link> &nbsp;·&nbsp; <Link href="/privacy">Privacy Policy</Link>
        </p>
      </div>
    </>
  );
}
