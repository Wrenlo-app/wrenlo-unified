import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/marketing/CTAButton";
import CopyLinkButton from "@/components/marketing/survey/CopyLinkButton";
import EntryNumber from "@/components/marketing/thankyou/EntryNumber";

export const metadata: Metadata = {
  title: "You're in! — Wrenlo AI",
  robots: "noindex",
};

const NEXT_STEPS = [
  { num: "1", text: "You'll receive a confirmation email at the address you provided within the next few minutes." },
  { num: "2", text: "Once we hit 100 responses, we'll email everyone a free benchmark report — real data on how contractors across the US run their front-office operations." },
  { num: "3", text: "The $100 Amazon gift card winner is drawn randomly and announced publicly. You'll be emailed directly if you win." },
  { num: "4", text: "As a founding respondent, you'll get early access to Wrenlo at a locked-in founding member price before we launch publicly." },
];

export default function ThankYouPage() {
  return (
    <div className="ty-hero">
      <div className="inner">
        <div className="check-ring">✓</div>
        <div className="ty-badge">You&apos;re in the draw</div>
        <h1 className="ty-title">
          Thanks for
          <br />
          <span>taking the time.</span>
        </h1>
        <p className="ty-sub">
          Your answers directly shape what Wrenlo builds first. We&apos;ll announce the $100
          Amazon gift card winner by email within 2 weeks.
        </p>

        <EntryNumber />

        <div className="what-next">
          <h3>What happens next</h3>
          <ul className="next-steps">
            {NEXT_STEPS.map((s) => (
              <li key={s.num}>
                <div className="step-dot">{s.num}</div>
                <span>{s.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p style={{ fontSize: 13, color: "rgba(255,255,255,.3)", marginBottom: 18 }}>
          Know another contractor? Share this survey — every entry helps us build something
          better.
        </p>
        <div className="share-row">
          <Link className="share-btn primary" href="/survey">
            ← Back to survey
          </Link>
          <a
            className="share-btn"
            href="https://www.facebook.com/sharer/sharer.php?u=https://wrenlo.co/survey"
            target="_blank"
            rel="noreferrer"
          >
            Share on Facebook
          </a>
          <a
            className="share-btn"
            href="https://www.linkedin.com/sharing/share-offsite/?url=https://wrenlo.co/survey"
            target="_blank"
            rel="noreferrer"
          >
            Share on LinkedIn
          </a>
          <CopyLinkButton className="share-btn" label="Copy link" />
        </div>
      </div>
    </div>
  );
}
