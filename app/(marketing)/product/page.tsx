import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/marketing/CTAButton";

export const metadata: Metadata = {
  title: "Product — Wrenlo AI | How It Works",
  description:
    "How Wrenlo works: AI call answering, missed-call text-back, trade-specific intake, estimate booking, follow-up sequences, and a revenue dashboard. Built for home-service contractors.",
};

const CAPTURE_FEATURES = [
  {
    icon: "🌙",
    title: "24/7 AI Call Answering",
    body: "Answers every missed and after-hours call in your business name. Handles emergency triage, qualification, and booking using trade-specific scripts built for HVAC, plumbing, electrical, roofing, garage door, and pest control.",
    badge: "Core feature",
  },
  {
    icon: "⚡",
    title: "Missed-Call Text-Back",
    body: "Within 30 seconds of a missed call, Wrenlo texts the caller back in your voice. Captures 30–40% of callers who never leave voicemail. Every conversation is logged and summarised.",
  },
  {
    icon: "🚨",
    title: "Emergency Classification",
    body: "Burst pipe, no-AC, no-heat, gas smell, electrical safety concern — Wrenlo identifies urgency in the first 30 seconds and routes accordingly. No dangerous troubleshooting. No guessing.",
  },
  {
    icon: "📲",
    title: "Owner Escalation Alerts",
    body: "Urgent calls are routed to your cell with full transcript, caller details, and recommended next step — only when your rules say so. You stay in control without answering every call yourself.",
  },
  {
    icon: "🔕",
    title: "Spam & Vendor Filtering",
    body: "Wrenlo separates real customer opportunities from spam, vendor calls, and robocalls automatically — so your lead inbox stays clean and focused on real jobs.",
  },
  {
    icon: "📬",
    title: "Unified Lead Inbox",
    body: "Every call summary, full transcript, urgency flag, service type, lead status, and booked outcome in one place. Full audit trail for every automated decision Wrenlo makes on your behalf.",
  },
];

const TRADES = [
  {
    icon: "🌡️",
    name: "HVAC",
    status: "live",
    scenarios: [
      { tag: "urgent", label: "Urgent", text: "No AC / No heat — emergency route, owner alert, same-day slot" },
      { tag: "book", label: "Book", text: "Replacement estimate — system age, type, and photos captured" },
      { tag: "follow", label: "Follow", text: "Maintenance tune-up — next available window, confirmation sent" },
    ],
  },
  {
    icon: "🔧",
    name: "Plumbing",
    status: "live",
    scenarios: [
      { tag: "urgent", label: "Urgent", text: "Active leak / burst pipe — water shutoff confirmed, dispatch alert" },
      { tag: "book", label: "Book", text: "Drain clog / fixture — non-emergency, next available window" },
      { tag: "follow", label: "Follow", text: "Water heater replacement — estimate request, age collected" },
    ],
  },
  {
    icon: "⚡",
    name: "Electrical",
    status: "live",
    scenarios: [
      { tag: "urgent", label: "Urgent", text: "Burning smell / sparking — immediate safety escalation, no troubleshooting" },
      { tag: "book", label: "Book", text: "Panel upgrade / EV charger — estimate with permit and load details" },
      { tag: "follow", label: "Follow", text: "Outlet / circuit issue — inspection booked, photos requested" },
    ],
  },
  {
    icon: "🏠",
    name: "Roofing",
    status: "live",
    scenarios: [
      { tag: "urgent", label: "Urgent", text: "Active leak / interior damage — tarping request, emergency slot" },
      { tag: "book", label: "Book", text: "Full replacement — age, material, insurance, photo request" },
      { tag: "follow", label: "Follow", text: "Storm inspection — adjuster coordination, photos requested" },
    ],
  },
  {
    icon: "🚪",
    name: "Garage Door",
    status: "live",
    scenarios: [
      { tag: "urgent", label: "Urgent", text: "Car trapped / off-track — same-day slot held, priority alert" },
      { tag: "book", label: "Book", text: "Broken spring / opener — parts context collected, service booked" },
      { tag: "follow", label: "Follow", text: "New door estimate — dimensions, style, material captured" },
    ],
  },
  {
    icon: "🐛",
    name: "Pest Control",
    status: "live",
    scenarios: [
      { tag: "urgent", label: "Urgent", text: "Bed bugs / active infestation — same-week inspection" },
      { tag: "book", label: "Book", text: "Routine inspection / recurring plan — first visit booked" },
      { tag: "follow", label: "Follow", text: "Termite concern — inspection booked, photo request sent" },
    ],
  },
  {
    icon: "✨",
    name: "Cleaning",
    status: "soon",
    scenarios: [
      { tag: "book", label: "Book", text: "Recurring clean — frequency, property size, first visit booked" },
      { tag: "book", label: "Book", text: "One-time deep clean — scope, timing, address, quote triggered" },
      { tag: "follow", label: "Follow", text: "Move-in / out — checklist texted, quote confirmed" },
    ],
  },
  {
    icon: "🌿",
    name: "Landscaping",
    status: "soon",
    scenarios: [
      { tag: "book", label: "Book", text: "Weekly maintenance — lot size, frequency, start date booked" },
      { tag: "book", label: "Book", text: "Design estimate — scope, budget, address collected" },
      { tag: "follow", label: "Follow", text: "Spring cleanup — photos requested, quote within 24 hours" },
    ],
  },
];

const HOW_STEPS = [
  { num: "01", title: "Connect your number", body: "Forward missed and after-hours calls to your Wrenlo line — takes 5 minutes from any carrier or Google Voice.", active: true },
  { num: "02", title: "Set your playbook", body: "Choose your trade, service area, job types, booking rules, and emergency escalation. We pre-load trade scripts — you review and approve." },
  { num: "03", title: "Connect your calendar", body: "Link Google Calendar, Jobber, Housecall Pro, or any calendar via webhook. Wrenlo books only into your approved windows." },
  { num: "04", title: "Review every lead", body: "Your lead inbox shows every call, transcript, booking result, and ROI attribution. Nothing automated without your audit trail." },
  { num: "05", title: "See revenue recovered", body: "Your dashboard ties every answered call to a booked estimate or saved opportunity. The math is visible, not implied." },
];

const CONTROL_ROWS = [
  { icon: "🗂️", label: "Job type rules", desc: "Approve which job types Wrenlo can book directly vs. flag for owner approval" },
  { icon: "📍", label: "Service area", desc: "Define your radius or zip codes — Wrenlo won't book outside your boundaries" },
  { icon: "🕐", label: "Calendar windows", desc: "Set approved booking slots, block personal time, and define after-hours rules" },
  { icon: "🚨", label: "Emergency routing", desc: "Define which keywords trigger immediate owner alerts vs. next-available booking" },
  { icon: "📋", label: "Approval mode", desc: "Wrenlo collects intake and you confirm before any booking is made" },
  { icon: "📊", label: "Audit trail", desc: "Full transcript, summary, action taken, and timestamp for every automated decision" },
  { icon: "🔇", label: "Opt-out handling", desc: "STOP/UNSUBSCRIBE handled automatically with suppression list maintained" },
];

const INTEGRATIONS = [
  { icon: "📅", name: "Google Calendar", desc: "Two-way sync. Books into approved slots and reads your blocks.", badge: "Live", badgeClass: "live" },
  { icon: "⚡", name: "Zapier / Make", desc: "Connect any tool with no-code workflows. Send leads anywhere.", badge: "Live", badgeClass: "live" },
  { icon: "🔗", name: "Webhooks", desc: "Push structured lead data to any endpoint in real time.", badge: "Growth+", badgeClass: "webhook" },
  { icon: "📧", name: "Email / CSV", desc: "Daily lead summaries by email. Export transcripts any time.", badge: "All plans", badgeClass: "live" },
  { icon: "🔧", name: "Jobber", desc: "Native writeback — create jobs and contacts directly in Jobber.", badge: "Pro plan", badgeClass: "soon" },
  { icon: "🏠", name: "Housecall Pro", desc: "Push leads and bookings into your HCP job pipeline.", badge: "Pro plan", badgeClass: "soon" },
  { icon: "⚙️", name: "ServiceTitan", desc: "Write call outcomes and booked jobs to your ST account.", badge: "Coming soon", badgeClass: "soon" },
  { icon: "💰", name: "QuickBooks", desc: "Pass customer and job info for invoice creation.", badge: "Coming soon", badgeClass: "soon" },
];

const TAG_CLASS: Record<string, string> = {
  urgent: "tag-urgent",
  book: "tag-book",
  follow: "tag-follow",
};

export default function ProductPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Product</span>
          <h1>
            Everything between the homeowner&apos;s
            <br />
            first call and <em>your calendar.</em>
          </h1>
          <p>
            Four tightly integrated modules — not a replacement for your FSM, but the
            front-office layer that feeds it. Answers calls, recovers missed leads by
            text, books estimates, and gets you the review after the job&apos;s done.
          </p>
          <div className="page-hero-actions">
            <CTAButton label="Start 14-Day Pilot" className="btn btn-red btn-lg">
              Start 14-Day Pilot →
            </CTAButton>
            <Link className="btn btn-white btn-lg" href="/pricing">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* MODULE 1: CAPTURE */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="sec-header">
            <span className="eyebrow">Module 1 — Capture</span>
            <h2 className="sec-title">
              Answer every call.
              <br />
              <em>Miss nothing.</em>
            </h2>
            <p className="sec-sub">
              Wrenlo handles the first 10 minutes of customer intent — answering, qualifying,
              classifying, and routing — so your team only deals with opportunities ready to
              book.
            </p>
          </div>
          <div className="feat-grid">
            {CAPTURE_FEATURES.map((f) => (
              <div className="feat-card reveal" key={f.title}>
                <div className="feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
                {f.badge && <span className="feat-badge">{f.badge}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 2: QUALIFY */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="sec-header">
            <span className="eyebrow">Module 2 — Qualify</span>
            <h2 className="sec-title">
              Trade-specific intake.
              <br />
              <em>Not a generic receptionist.</em>
            </h2>
            <p className="sec-sub">
              Generic AI receptionists fail contractors because they don&apos;t know the
              difference between a no-AC emergency and a routine tune-up request. Wrenlo&apos;s
              intake is built trade-by-trade.
            </p>
          </div>
          <div className="safety-banner">
            <div className="safety-banner-icon">⚠️</div>
            <div>
              <h4>Safety-first by design</h4>
              <p>
                Emergency scripts escalate immediately and never offer technical
                troubleshooting. Electrical, plumbing, gas, and HVAC safety concerns are routed
                to owner-defined emergency paths. Wrenlo does not diagnose or advise.
              </p>
            </div>
          </div>
          <div className="trade-grid">
            {TRADES.map((t) => (
              <div className="trade-card reveal" key={t.name}>
                <div className="trade-icon">{t.icon}</div>
                <div className="trade-name">{t.name}</div>
                <span className={`int-badge ${t.status === "live" ? "live" : "soon"}`}>
                  {t.status === "live" ? "Live now" : "Coming soon"}
                </span>
                <div className="trade-scenarios">
                  {t.scenarios.map((s, i) => (
                    <div className="trade-scenario" key={i}>
                      <span className={`trade-scenario-tag ${TAG_CLASS[s.tag]}`}>{s.label}</span>
                      {s.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 3: BOOK */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="sec-header">
            <span className="eyebrow">Module 3 — Book &amp; Follow Up</span>
            <h2 className="sec-title">
              Turn captured leads into
              <br />
              <em>booked jobs and repeat business.</em>
            </h2>
          </div>
          <div className="feat-grid">
            <div className="feat-card reveal">
              <div className="feat-icon">📅</div>
              <h3>Estimate &amp; Service Booking</h3>
              <p>
                Wrenlo checks your live availability and books only the job types you approve,
                into the calendar windows you define. Owner-approval mode available for
                anything you&apos;re not ready to automate.
              </p>
              <span className="feat-badge">Works with your FSM</span>
            </div>
            <div className="feat-card reveal">
              <div className="feat-icon">🔁</div>
              <h3>Automated Follow-Up Sequences</h3>
              <p>
                Confirmations, reminders, photo requests, quote follow-ups, and review requests
                — all triggered automatically based on call outcome. No manual chasing. No
                leads going cold silently.
              </p>
            </div>
            <div className="feat-card reveal">
              <div className="feat-icon">⭐</div>
              <h3>Review Requests</h3>
              <p>
                After a completed job, Wrenlo texts your customer a Google review link
                automatically. More 5-star reviews means more organic leads without buying more
                ads or adding admin work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 4: MEASURE */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="two-col reveal">
            <div>
              <span className="eyebrow">Module 4 — Measure</span>
              <h2 className="sec-title">
                See exactly what
                <br />
                <em>Wrenlo recovered.</em>
              </h2>
              <p className="sec-sub" style={{ marginBottom: 32 }}>
                The revenue dashboard ties every answered call to a booked estimate or saved
                opportunity. The math is visible, not implied.
              </p>
              <div className="step-list">
                <div className="step-item">
                  <div className="step-n">01</div>
                  <div className="step-body">
                    <span className="step-tag">Calls handled</span>
                    <h3>Total calls answered, missed-call saves, and after-hours captures</h3>
                    <p>Broken down by trade category, lead source, urgency level, and outcome.</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-n">02</div>
                  <div className="step-body">
                    <span className="step-tag">Estimates booked</span>
                    <h3>Qualified leads converted to calendar appointments</h3>
                    <p>
                      Track which call types convert to booked estimates and update booking
                      rules to improve over time.
                    </p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-n">03</div>
                  <div className="step-body">
                    <span className="step-tag">Revenue protected</span>
                    <h3>Estimated revenue at risk that Wrenlo captured</h3>
                    <p>Based on average ticket values by trade and job type. Sent as a weekly ROI email.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-lg)",
                  overflow: "hidden",
                  boxShadow: "0 16px 48px rgba(30,41,59,.08)",
                }}
              >
                <div style={{ background: "var(--hero-bg)", padding: "16px 20px" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: ".06em" }}>
                    WRENLO DASHBOARD · This Week
                  </span>
                </div>
                <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ background: "var(--bg2)", borderRadius: 8, padding: 16 }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-faint)", letterSpacing: ".06em", marginBottom: 8 }}>
                      CALLS HANDLED
                    </div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: 32, color: "var(--navy)", lineHeight: 1 }}>47</div>
                    <div style={{ fontSize: 11, color: "var(--green)", marginTop: 4 }}>↑ 12 after-hours saves</div>
                  </div>
                  <div style={{ background: "var(--bg2)", borderRadius: 8, padding: 16 }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-faint)", letterSpacing: ".06em", marginBottom: 8 }}>
                      ESTIMATES BOOKED
                    </div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: 32, color: "var(--navy)", lineHeight: 1 }}>14</div>
                    <div style={{ fontSize: 11, color: "var(--green)", marginTop: 4 }}>↑ 30% conversion rate</div>
                  </div>
                  <div style={{ background: "var(--tw-red-lt)", border: "1px solid rgba(242,47,70,.2)", borderRadius: 8, padding: 16 }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--teal-dk)", letterSpacing: ".06em", marginBottom: 8 }}>
                      REVENUE RECOVERED
                    </div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: 32, color: "var(--teal-dk)", lineHeight: 1 }}>$6,840</div>
                    <div style={{ fontSize: 11, color: "var(--tw-red)", marginTop: 4 }}>Est. based on avg ticket</div>
                  </div>
                  <div style={{ background: "var(--bg2)", borderRadius: 8, padding: 16 }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-faint)", letterSpacing: ".06em", marginBottom: 8 }}>
                      MISSED-CALL SAVES
                    </div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: 32, color: "var(--navy)", lineHeight: 1 }}>19</div>
                    <div style={{ fontSize: 11, color: "var(--green)", marginTop: 4 }}>Would have gone to voicemail</div>
                  </div>
                </div>
                <div style={{ padding: "0 24px 24px" }}>
                  <div
                    style={{
                      background: "var(--green-bg)",
                      border: "1px solid rgba(16,185,129,.2)",
                      borderRadius: 8,
                      padding: "14px 16px",
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 16 }}>✓</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--green)" }}>
                        3 emergencies escalated correctly this week
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(16,185,129,.6)", marginTop: 2 }}>
                        All routed to owner within 45 seconds · No dangerous advice given
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="sec-header centered">
            <span className="eyebrow">How it works</span>
            <h2 className="sec-title">
              Live in <em>under two hours.</em>
            </h2>
            <p className="sec-sub">
              No new phone system. No replacing Jobber or Housecall Pro. Five steps and Wrenlo
              is running on your existing stack.
            </p>
          </div>
          <div className="how-steps">
            {HOW_STEPS.map((s) => (
              <div className={`how-step${s.active ? " active" : ""}`} key={s.num}>
                <div className="step-num">{s.num}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-body">{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OWNER CONTROL */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="two-col reveal">
            <div>
              <span className="eyebrow">Owner Control Layer</span>
              <h2 className="sec-title">
                You stay the
                <br />
                <em>decision-maker.</em>
              </h2>
              <p className="sec-sub" style={{ marginBottom: 24 }}>
                Wrenlo automates what you approve and escalates everything else. Every rule is
                configurable, every action is auditable.
              </p>
              <CTAButton label="Start Your Free Pilot" className="btn btn-primary btn-lg">
                Start Your Free Pilot →
              </CTAButton>
            </div>
            <div>
              <table className="ctrl-table">
                <tbody>
                  {CONTROL_ROWS.map((r) => (
                    <tr key={r.label}>
                      <td>
                        {r.icon} {r.label}
                      </td>
                      <td>{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="sec-header centered">
            <span className="eyebrow">Integrations</span>
            <h2 className="sec-title">
              Works with the tools
              <br />
              <em>you already use.</em>
            </h2>
            <p className="sec-sub">
              Wrenlo is a front-office layer, not a replacement. Your FSM stays your system of
              record. We write leads, bookings, and transcripts back to wherever your team
              works.
            </p>
          </div>
          <div className="int-grid reveal">
            {INTEGRATIONS.map((i) => (
              <div className="int-card" key={i.name}>
                <div className="int-logo">{i.icon}</div>
                <div className="int-name">{i.name}</div>
                <div className="int-desc">{i.desc}</div>
                <span className={`int-badge ${i.badgeClass}`}>{i.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="cta-band reveal">
            <div>
              <h2>
                See it work on your
                <br />
                <em>actual missed calls.</em>
              </h2>
              <p>
                14-day pilot. One phone line. One trade playbook. If Wrenlo doesn&apos;t recover
                at least one qualified opportunity, you don&apos;t continue.
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