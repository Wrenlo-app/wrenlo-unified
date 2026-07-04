import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/marketing/CTAButton";
import ScenarioTabs from "@/components/marketing/whyus/ScenarioTabs";

export const metadata: Metadata = {
  title: "Why Wrenlo — vs Generic AI Receptionists, Human Answering Services & FSM Built-Ins",
  description:
    "See how Wrenlo compares to generic AI receptionists, human answering services, and FSM built-in features. Trade-specific intake, booked outcomes, and visible ROI.",
};

const COMPARE_ROWS: [string, string, string, string, string][] = [
  ["Answers missed calls 24/7", "check", "check", "check", "cross:—"],
  ["Missed-call text-back (<30 sec)", "check", "partial:Some", "cross", "cross:—"],
  ["Trade-specific intake scripts", "check", "cross", "partial:Varies", "cross"],
  ["Emergency classification + routing", "check", "partial:Basic", "partial:Varies", "cross"],
  ["Books into your calendar / FSM", "check", "partial:Some", "cross", "check"],
  ["Owner-defined booking rules", "check", "cross", "cross", "check"],
  ["SMS follow-up sequences", "check", "partial:Some", "cross", "partial:Add-on"],
  ["Revenue / ROI dashboard", "check", "cross", "cross", "cross"],
  ["Works with existing FSM", "check", "partial:Limited", "cross", "check:Built-in"],
  ["Typical monthly cost", "$199–$799", "$99–$300", "$300–$600", "Included / limited"],
];

function renderCell(value: string) {
  if (value.startsWith("check")) {
    const label = value.includes(":") ? value.split(":")[1] : "✓";
    return <span className="check">{label}</span>;
  }
  if (value.startsWith("cross")) {
    const label = value.includes(":") ? value.split(":")[1] : "✗";
    return <span className="cross">{label}</span>;
  }
  if (value.startsWith("partial")) {
    return <span className="partial">{value.split(":")[1]}</span>;
  }
  return value;
}

const OBJECTIONS = [
  {
    q: "\"Will callers know they're talking to AI?\"",
    a: "Wrenlo introduces itself as your team's AI assistant — honest, clear, and not deceptive. Industry data shows 53% of homeowners are already comfortable with AI on initial calls. The experience is fast, friendly, and professional — most callers care more about being answered than who answers.",
  },
  {
    q: "\"What if it makes a mistake or books the wrong thing?\"",
    a: "Wrenlo only books within the job types, calendar windows, and service areas you define. Owner-approval mode lets you review before anything is confirmed. Every action produces a transcript and audit trail. You can change any rule at any time — and mistakes are correctable before they become problems.",
  },
  {
    q: "\"I already use Jobber / Housecall Pro — do I need this?\"",
    a: "Jobber and Housecall Pro are excellent FSM platforms. They handle scheduling, dispatch, invoicing, and estimates. Wrenlo handles the call before any of that — the missed or after-hours lead that would never enter Jobber because nobody answered. We write qualified leads directly into your FSM as a front-office layer.",
  },
  {
    q: "\"What if a caller has a safety emergency?\"",
    a: "Emergency scripts escalate immediately to owner-defined paths. Wrenlo never provides technical troubleshooting for electrical, gas, plumbing, or HVAC safety situations. It captures the situation, confirms safety basics (like whether water can be shut off), alerts the owner, and stays on the line until someone can respond — without creating liability through improvised advice.",
  },
  {
    q: "\"I tried an answering service before — it didn't work.\"",
    a: "Traditional answering services produce a message pad output: name, number, \"they'll call back.\" They don't know your trade, can't book appointments, and can't tell you which leads converted. Wrenlo is fundamentally different — it qualifies by trade, books into your calendar, and shows ROI. The comparison isn't really fair to make.",
  },
  {
    q: "\"Is there a long-term contract?\"",
    a: "No. Monthly plans cancel anytime. The $299 setup fee is credited to your first month if you continue past the pilot. Annual plans offer 20% savings and are billed upfront with a 30-day refund window. We don't lock you in — we earn your business by recovering your revenue.",
  },
];

export default function WhyUsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Why Wrenlo</span>
          <h1>
            Not another AI receptionist.
            <br />
            <em>A revenue capture layer.</em>
          </h1>
          <p>
            Generic answering products take messages. Wrenlo qualifies leads, books estimates,
            and tells you how much money it recovered. Here&apos;s the full comparison.
          </p>
          <div className="page-hero-actions">
            <CTAButton label="Start Free Pilot" className="btn btn-red btn-lg">
              Start Free Pilot →
            </CTAButton>
            <Link className="btn btn-white btn-lg" href="/pricing">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="sec-header centered">
            <span className="eyebrow">Side-by-side comparison</span>
            <h2 className="sec-title">
              How Wrenlo stacks up
              <br />
              <em>against the alternatives.</em>
            </h2>
          </div>
          <div className="compare-wrap reveal">
            <table className="compare-table">
              <thead>
                <tr>
                  <th></th>
                  <th className="wrenlo-col">Wrenlo AI</th>
                  <th>Generic AI Receptionist</th>
                  <th>Human Answering Service</th>
                  <th>FSM Built-In</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row[0]}>
                    <td className="row-label">{row[0]}</td>
                    <td className="wrenlo-col">{renderCell(row[1])}</td>
                    <td>{renderCell(row[2])}</td>
                    <td>{renderCell(row[3])}</td>
                    <td>{renderCell(row[4])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="sec-header">
            <span className="eyebrow">What makes us different</span>
            <h2 className="sec-title">
              Three things nobody else
              <br />
              <em>does together.</em>
            </h2>
          </div>
          <div className="diff-grid reveal">
            <div className="diff-card">
              <div className="diff-vs">vs Generic AI Receptionists</div>
              <h3>Trade intelligence, not call deflection</h3>
              <p>
                Generic AI receptionists answer calls and take messages. They don&apos;t know
                that &quot;no heat&quot; is an emergency, that a broken spring means a car is
                trapped, or that an estimate for a panel upgrade needs permit details.
              </p>
              <div className="diff-points">
                <div className="diff-point">
                  <span className="diff-point-icon">✗</span>They: &quot;I&apos;ll pass your message along&quot;
                </div>
                <div className="diff-point">
                  <span className="diff-point-icon" style={{ color: "var(--green)" }}>✓</span>
                  Wrenlo: classifies urgency, asks trade-specific questions, books the right
                  next step
                </div>
                <div className="diff-point">
                  <span className="diff-point-icon" style={{ color: "var(--green)" }}>✓</span>
                  Wrenlo: shows you the revenue that would have gone to voicemail
                </div>
              </div>
            </div>
            <div className="diff-card featured">
              <div className="diff-vs">Wrenlo&apos;s unique position</div>
              <h3>The revenue capture layer your stack is missing</h3>
              <p>
                Wrenlo sits between the homeowner&apos;s first call and your existing operating
                tools. It doesn&apos;t replace Jobber, Housecall Pro, or Google Calendar — it
                feeds them with structured, qualified leads and booked estimates.
              </p>
              <div className="diff-points">
                <div className="diff-point">
                  <span className="diff-point-icon" style={{ color: "var(--teal-dk)" }}>→</span>
                  Caller intent captured in full
                </div>
                <div className="diff-point">
                  <span className="diff-point-icon" style={{ color: "var(--teal-dk)" }}>→</span>
                  Lead qualified and classified
                </div>
                <div className="diff-point">
                  <span className="diff-point-icon" style={{ color: "var(--teal-dk)" }}>→</span>
                  Estimate booked into your calendar
                </div>
                <div className="diff-point">
                  <span className="diff-point-icon" style={{ color: "var(--teal-dk)" }}>→</span>
                  Revenue value shown in dashboard
                </div>
              </div>
            </div>
            <div className="diff-card">
              <div className="diff-vs">vs Human Answering Services</div>
              <h3>Structured data, not message pads</h3>
              <p>
                Human answering services cost $300–$600/month and produce the same output: an
                unstructured message with a name and callback number. They don&apos;t book,
                don&apos;t qualify, and don&apos;t tell you what the lead was worth.
              </p>
              <div className="diff-points">
                <div className="diff-point">
                  <span className="diff-point-icon">✗</span>They: name + number + &quot;they&apos;ll call back&quot;
                </div>
                <div className="diff-point">
                  <span className="diff-point-icon" style={{ color: "var(--green)" }}>✓</span>
                  Wrenlo: full transcript, urgency flag, job category, and booked slot
                </div>
                <div className="diff-point">
                  <span className="diff-point-icon" style={{ color: "var(--green)" }}>✓</span>
                  Wrenlo: 30-second response vs 2–5 minute human pickup time
                </div>
              </div>
            </div>
          </div>

          <div className="callout" style={{ marginTop: 32 }}>
            <div className="callout-title">
              What about FSM built-in receptionists (Jobber, Housecall Pro)?
            </div>
            <p>
              FSM receptionists are designed to book within their own platform and work best
              when the customer is already known. Wrenlo is designed for the first contact —
              the unknown caller at 10pm who will go to a competitor in 8 minutes. We feed
              booked leads into your FSM, not compete with it.
            </p>
          </div>
        </div>
      </section>

      {/* SCENARIO WALKTHROUGH */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="sec-header">
            <span className="eyebrow">Real scenarios</span>
            <h2 className="sec-title">
              What actually happens
              <br />
              <em>when calls come in.</em>
            </h2>
          </div>
          <ScenarioTabs />
        </div>
      </section>

      {/* OBJECTIONS */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="sec-header centered">
            <span className="eyebrow">Common questions</span>
            <h2 className="sec-title">
              Things contractors ask
              <br />
              <em>before they start.</em>
            </h2>
          </div>
          <div className="obj-grid reveal">
            {OBJECTIONS.map((o) => (
              <div className="obj-card" key={o.q}>
                <div className="obj-q">{o.q}</div>
                <div className="obj-a">{o.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="cta-band reveal">
            <div>
              <h2>
                See the difference on your
                <br />
                <em>own missed calls.</em>
              </h2>
              <p>
                14-day pilot. One phone line. One trade playbook. If Wrenlo doesn&apos;t
                recover at least one qualified opportunity, you don&apos;t continue.
              </p>
            </div>
            <div className="cta-band-actions">
              <CTAButton label="Book Pilot Call" className="btn btn-red btn-lg">
                Book Pilot Call →
              </CTAButton>
              <Link className="btn btn-white btn-lg" href="/pricing">
                View pricing
              </Link>
              <span className="cta-note">$299 setup · credited to Month 1 · cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
