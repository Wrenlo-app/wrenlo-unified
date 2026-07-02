"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };

const FAQS: FAQItem[] = [
  {
    q: "What exactly does the setup fee cover?",
    a: "The setup fee covers configuring your call forwarding, building your trade-specific intake script, setting up your service area and booking rules, connecting your calendar, configuring owner escalation, and running a live test call before you go live. Most customers are fully configured in under 2 hours. The fee is credited in full toward your first month's subscription.",
  },
  {
    q: "What happens if I exceed my monthly call limit?",
    a: "We notify you before you hit your cap — no surprise overages. You can upgrade your plan mid-month or purchase a usage bundle. We never cut off service without warning.",
  },
  {
    q: "Can I change plans after the pilot?",
    a: "Yes. You can upgrade at any time — billing adjusts pro-rata. Downgrading is available at the next billing cycle. There's no long-term contract on monthly billing. Annual plans are discounted 20% and billed upfront.",
  },
  {
    q: "What does the 14-day pilot actually include?",
    a: "Full Growth plan access for 14 days: 24/7 AI call answering, missed-call text-back, trade intake, emergency classification, calendar booking, owner escalation, and daily lead summaries. We track every call and send you a full ROI report at the end.",
  },
  {
    q: "Is there a contract or cancellation fee?",
    a: "No contract on monthly billing. Cancel anytime — your service runs until the end of the paid period. Annual plans are non-refundable after 30 days but can be paused for seasonal businesses.",
  },
  {
    q: "How is payment collected?",
    a: "Setup fees and subscriptions are collected via Stripe invoice or payment link — sent manually after your pilot call. We don't have a self-serve checkout yet. This keeps onboarding hands-on so you're not left configuring things alone.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list" style={{ maxWidth: 800, margin: "48px auto 0" }}>
      {FAQS.map((item, i) => (
        <div className={`faq-item${openIndex === i ? " open" : ""}`} key={item.q}>
          <button
            className="faq-q"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {item.q} <span className="faq-arrow">+</span>
          </button>
          <div className="faq-a">{item.a}</div>
        </div>
      ))}
    </div>
  );
}
