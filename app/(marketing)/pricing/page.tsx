import type { Metadata } from "next";
import Link from "next/link";
import PricingHeroAndPlans from "@/components/marketing/pricing/PricingHeroAndPlans";
import ROICalculator from "@/components/marketing/pricing/ROICalculator";
import FAQAccordion from "@/components/marketing/pricing/FAQAccordion";
import CTAButton from "@/components/marketing/CTAButton";

export const metadata: Metadata = {
  title: "Pricing — Wrenlo AI",
  description:
    "Wrenlo pricing: Starter $199/mo, Growth $399/mo, Pro $799/mo. Setup fee credited to Month 1.",
};

export default function PricingPage() {
  return (
    <>
      <PricingHeroAndPlans />

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="two-col reveal">
            <div>
              <span className="eyebrow">ROI Calculator</span>
              <h2 className="sec-title">
                Know your number before
                <br />
                you sign <em>anything.</em>
              </h2>
              <p className="sec-sub" style={{ marginBottom: 24 }}>
                Type in your call volume and average ticket. We&apos;ll calculate how much
                revenue you&apos;re leaving on the table every month.
              </p>
              <div className="step-list">
                <div className="step-item">
                  <div className="step-n">1</div>
                  <div className="step-body">
                    <span className="step-tag">Based on industry data</span>
                    <h3>27% average missed-call rate</h3>
                    <p>Invoca&apos;s 2025 Home Services report across HVAC, plumbing, electrical, and similar trades.</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-n">2</div>
                  <div className="step-body">
                    <span className="step-tag">Wrenlo pilot average</span>
                    <h3>40–60% call recovery rate</h3>
                    <p>Across pilots with missed-call text-back and after-hours answering active.</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-n">3</div>
                  <div className="step-body">
                    <span className="step-tag">Simple math</span>
                    <h3>One recovered job covers months</h3>
                    <p>An average HVAC repair at $1,200 covers 3 months of Growth plan.</p>
                  </div>
                </div>
              </div>
            </div>
            <ROICalculator />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="sec-header centered">
            <span className="eyebrow">Pricing Questions</span>
            <h2 className="sec-title">
              Everything you want to know
              <br />
              before <em>spending a dollar.</em>
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <section className="section--tight" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="cta-band reveal">
            <div>
              <h2>
                Still not sure which plan
                <br />
                is right for <em>you?</em>
              </h2>
              <p>
                Book a 20-minute pilot call. We&apos;ll audit your current missed-call
                situation, recommend a plan, and configure everything if you decide to move
                forward.
              </p>
            </div>
            <div className="cta-band-actions">
              <CTAButton label="Pricing Question" className="btn btn-red btn-lg">
                Talk to Us →
              </CTAButton>
              <Link className="btn btn-white btn-lg" href="/product">
                See the product first
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
