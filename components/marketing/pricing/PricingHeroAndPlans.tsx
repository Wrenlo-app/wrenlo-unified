"use client";

import { useState } from "react";
import { useCTAPopup } from "../CTAPopup";

type Plan = {
  name: string;
  monthly: number;
  annual: number;
  setup: string;
  featured?: boolean;
  features: string[];
  ctaLabel: string;
  popupLabel: string;
  ctaClass: string;
  note: string;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    monthly: 199,
    annual: 159,
    setup: "+ $299 one-time setup (credited to Month 1)",
    features: [
      "AI call answering (business hours + configurable after-hours)",
      "Missed-call text-back within 30 seconds",
      "Trade-specific intake script (1 trade)",
      "Google Calendar booking",
      "Lead inbox with transcripts",
      "Daily lead summary email",
      "Up to 150 calls/month",
    ],
    ctaLabel: "Get Started",
    popupLabel: "Starter Plan",
    ctaClass: "btn btn-outline-navy btn-lg",
    note: "Best for solo operators and 1–3 tech crews",
  },
  {
    name: "Growth",
    monthly: 399,
    annual: 319,
    setup: "+ $499–$999 setup (credited to Month 1)",
    featured: true,
    features: [
      "Everything in Starter",
      "24/7 answering with full emergency classification",
      "Multi-trade intake scripts",
      "Owner escalation alerts",
      "SMS follow-up sequences + review requests",
      "ROI dashboard + weekly revenue email",
      "Zapier / webhook integration",
      "Up to 400 calls/month",
    ],
    ctaLabel: "Start Free Pilot →",
    popupLabel: "Start Free Pilot",
    ctaClass: "btn btn-red btn-lg",
    note: "Most popular · 4–15 tech residential service businesses",
  },
  {
    name: "Pro",
    monthly: 799,
    annual: 639,
    setup: "+ $1,500 setup (credited to Month 1)",
    features: [
      "Everything in Growth",
      "Multiple lines / locations / brands",
      "Role-based lead inbox (CSR + dispatcher)",
      "Native Jobber + Housecall Pro writeback",
      "Advanced routing + custom reports",
      "Human backup / QA concierge option",
      "Unlimited calls (fair use)",
    ],
    ctaLabel: "Talk to Us",
    popupLabel: "Talk to Us",
    ctaClass: "btn btn-outline-navy btn-lg",
    note: "Best for 15–50 tech operations with high call volume",
  },
];

/**
 * Owns the hero (eyebrow/h1/p + billing toggle) and the plan-cards
 * section together, since toggleBilling() in the original pricing.html
 * controlled prices across both. Everything else on the Pricing page
 * (ROI calculator, FAQ, bottom CTA) stays in separate components /
 * server-rendered JSX in page.tsx.
 */
export default function PricingHeroAndPlans() {
  const [annual, setAnnual] = useState(false);
  const { openPopup } = useCTAPopup();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Pricing</span>
          <h1>
            One recovered job covers
            <br />
            <em>months of cost.</em>
          </h1>
          <p>
            Simple plans. No per-minute billing surprises. No long-term contracts. Setup fee
            credited toward Month 1. Start with a 14-day free pilot.
          </p>
          <div className="billing-toggle" style={{ marginTop: 28 }}>
            <span>Monthly</span>
            <div
              className={`toggle-track${annual ? " on" : ""}`}
              onClick={() => setAnnual((a) => !a)}
            >
              <div className="toggle-knob" />
            </div>
            <span>Annual</span>
            <span className="save-badge" style={{ display: annual ? "inline-block" : "none" }}>
              Save 20%
            </span>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="pricing-grid">
            {PLANS.map((plan) => (
              <div className={`plan reveal${plan.featured ? " featured" : ""}`} key={plan.name}>
                <div className="plan-name">{plan.name}</div>
                <div className="plan-price">${annual ? plan.annual : plan.monthly}</div>
                <div className="plan-period">per month</div>
                <div className="plan-setup">{plan.setup}</div>
                <div className="plan-divider" />
                <div className="plan-features">
                  {plan.features.map((f) => (
                    <div className="plan-feature" key={f}>
                      <span className="plan-check">✓</span>
                      {f}
                    </div>
                  ))}
                </div>
                <button className={plan.ctaClass} onClick={() => openPopup(plan.popupLabel)}>
                  {plan.ctaLabel}
                </button>
                <div className="plan-note">{plan.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
