import type { Metadata } from "next";
import Link from "next/link";
import TypingBubble from "@/components/marketing/TypingBubble";
import { HeroCTAs, BottomCTAs, PilotCTACard } from "@/components/marketing/HomeCTAs";

export const metadata: Metadata = {
  title: "Wrenlo AI — AI Front Desk for HVAC & Plumbing Contractors",
  description:
    "Wrenlo answers missed and after-hours calls, qualifies the job, books approved estimates, and shows how much revenue was recovered.",
};

const PROBLEMS = [
  {
    num: "01",
    title: "Calls missed while on jobs",
    body: "Paid-search and referral leads go to voicemail while you're driving, installing, or talking to another customer.",
    tag: "× Lost marketing spend",
  },
  {
    num: "02",
    title: "After-hours calls disappear",
    body: "No-heat, no-cool, and burst pipe calls often happen at 9pm. Most homeowners won't call back in the morning.",
    tag: "× Peak season revenue lost",
  },
  {
    num: "03",
    title: "Voicemail doesn't convert",
    body: "Many homeowners don't leave messages. They open Google, call the next contractor, and book with them instead.",
    tag: "× Caller moves on in minutes",
  },
  {
    num: "04",
    title: "Slow callbacks cost jobs",
    body: "The first contractor to respond usually wins. A 30-minute callback window puts you behind two competitors.",
    tag: "× 90% expect ≤10 min response",
  },
  {
    num: "05",
    title: "Unqualified calls waste time",
    body: "Without intake, you're screening every call yourself instead of being on the job generating revenue.",
    tag: "× Owner time drain",
  },
  {
    num: "06",
    title: "Ad spend leaks out",
    body: "Every Google Ad, LSA, or Angi lead that goes unanswered makes your cost per acquisition harder to justify.",
    tag: "× CAC rises with every miss",
  },
];

const NAV_CARDS = [
  {
    href: "/product",
    eyebrow: "Product",
    title: "How Wrenlo works",
    sub: "AI call answering, missed-call text-back, emergency classification, booking, follow-up, and revenue tracking.",
    cta: "Explore the product →",
  },
  {
    href: "/pricing",
    eyebrow: "Pricing",
    title: "Simple, honest pricing",
    sub: "Starter $199/mo, Growth $399/mo, Pro $799/mo. Setup fee credited to Month 1. No per-minute surprises.",
    cta: "See pricing →",
  },
  {
    href: "/why-us",
    eyebrow: "Why Wrenlo",
    title: "How we compare",
    sub: "Side-by-side vs. generic AI receptionists, human answering services, and FSM built-in features.",
    cta: "See the comparison →",
  },
  {
    href: "/our-story",
    eyebrow: "Our Story",
    title: "Why we built this",
    sub: "We saw the missed-call problem firsthand. Wrenlo is the product we wish existed for every contractor we know.",
    cta: "Read our story →",
  },
  {
    href: "/survey",
    eyebrow: "Founding Survey",
    title: "Shape the product",
    sub: "5-minute survey. Your answers directly shape what we build next. Win a $100 Amazon gift card.",
    cta: "Take the survey →",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <h1>
                Stop losing jobs because
                <br />
                you were <em>on another job.</em>
              </h1>
              <p className="hero-sub">
                Wrenlo answers every missed and after-hours call, qualifies the lead, books
                approved estimates, and shows exactly how much revenue was recovered — without
                replacing your existing tools.
              </p>
              <HeroCTAs />
              <div className="hero-trust">
                <div className="trust-item">
                  <div className="trust-check">✓</div>No new phone system
                </div>
                <div className="trust-item">
                  <div className="trust-check">✓</div>Works with Jobber, HCP, ServiceTitan
                </div>
                <div className="trust-item">
                  <div className="trust-check">✓</div>Live in under 2 hours
                </div>
                <div className="trust-item">
                  <div className="trust-check">✓</div>Cancel anytime
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="float-card float-top">
                <div className="float-val">
                  <span>$2,840</span>
                </div>
                <div className="float-lbl">Average weekly revenue recovered across pilots</div>
              </div>

              <div className="call-mock">
                <div className="mock-header">
                  <div className="mock-dots">
                    <div className="mock-dot" style={{ background: "#FF5F57" }} />
                    <div className="mock-dot" style={{ background: "#FEBC2E" }} />
                    <div className="mock-dot" style={{ background: "#28C840" }} />
                  </div>
                  <div className="mock-title">Wrenlo AI — Live Call</div>
                </div>
                <div className="mock-body">
                  <div className="call-status">
                    <div className="call-status-dot" />
                    Incoming call · After hours · 10:47 PM
                  </div>
                  <div className="caller-name">Homeowner · Phoenix, AZ</div>
                  <div className="caller-meta">Mobile · Missed call — forwarded to Wrenlo</div>
                  <div className="transcript">
                    <div className="t-row">
                      <span className="t-who ai">Wrenlo</span>
                      <div className="t-bubble">
                        Hi, thanks for calling! I&apos;m the team&apos;s AI assistant — everyone&apos;s
                        on jobs right now. What&apos;s going on today?
                      </div>
                    </div>
                    <div className="t-row caller-row">
                      <span className="t-who caller">Caller</span>
                      <div className="t-bubble">
                        My AC stopped working. It&apos;s 103 degrees and I have two little kids.
                      </div>
                    </div>
                    <div className="t-row">
                      <span className="t-who ai">Wrenlo</span>
                      <TypingBubble />
                    </div>
                  </div>
                  <div className="mock-result">
                    <div className="mock-result-icon">✓</div>
                    <div>
                      <div className="mock-result-text">
                        Emergency classified · Owner alerted · 8am slot held
                      </div>
                      <div className="mock-result-sub">Transcript saved · Est. job value: $1,200+</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="float-card float-bottom">
                <div className="float-live">
                  <div className="float-dot" />
                  <div className="float-live-label">
                    <div className="float-val">120+ contractors</div>
                    <div className="float-lbl">in pilot across the US</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="logos-bar" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="logos-inner">
            <span className="logos-label">Works with</span>
            <span className="logo-item">Jobber</span>
            <span className="logo-item">Housecall Pro</span>
            <span className="logo-item">ServiceTitan</span>
            <span className="logo-item">Workiz</span>
            <span className="logo-item">Google Calendar</span>
            <span className="logo-item">QuickBooks</span>
            <span className="logo-item">FieldEdge</span>
          </div>
        </div>
      </div>

      <div style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-cell reveal">
              <div className="stat-val">
                <em>27%</em>
              </div>
              <div className="stat-lbl">of home-service calls go unanswered every day</div>
              <div className="stat-src">Invoca Home Services Report 2025</div>
            </div>
            <div className="stat-cell reveal">
              <div className="stat-val">
                $<em>1,205</em>
              </div>
              <div className="stat-lbl">average HVAC repair ticket — cost of one missed call</div>
              <div className="stat-src">Industry benchmark 2025</div>
            </div>
            <div className="stat-cell reveal">
              <div className="stat-val">
                <em>90%</em>
              </div>
              <div className="stat-lbl">of homeowners expect a response within 10 minutes</div>
              <div className="stat-src">HubSpot State of Service 2022</div>
            </div>
            <div className="stat-cell reveal">
              <div className="stat-val">
                <em>53%</em>
              </div>
              <div className="stat-lbl">of homeowners are comfortable with AI on their initial call</div>
              <div className="stat-src">Housecall Pro Report 2025</div>
            </div>
          </div>
        </div>
      </div>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="sec-header">
            <span className="eyebrow">Sound familiar?</span>
            <h2 className="sec-title">
              Every missed call is a job
              <br />
              <em>someone else can book.</em>
            </h2>
            <p className="sec-sub">
              Built for contractors spending real money on leads — and watching them slip through
              the cracks after hours.
            </p>
          </div>
          <div className="problem-grid reveal">
            {PROBLEMS.map((p) => (
              <div className="prob-card" key={p.num}>
                <div className="prob-num">{p.num}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <span className="prob-tag">{p.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="sec-header centered">
            <span className="eyebrow">Explore Wrenlo</span>
            <h2 className="sec-title">
              Everything you need to know
              <br />
              <em>before starting your pilot.</em>
            </h2>
          </div>
          <div className="nav-pages">
            {NAV_CARDS.map((c) => (
              <Link className="nav-page-card reveal" href={c.href} key={c.href}>
                <div className="npc-eyebrow">{c.eyebrow}</div>
                <div className="npc-title">{c.title}</div>
                <div className="npc-sub">{c.sub}</div>
                <div className="npc-arrow">{c.cta}</div>
              </Link>
            ))}
            <PilotCTACard />
          </div>
        </div>
      </section>

      <section className="section--tight" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="cta-band reveal">
            <div>
              <h2>
                Stop leaving booked jobs
                <br />
                on <em>voicemail.</em>
              </h2>
              <p>
                One recovered emergency call typically pays for months of Wrenlo. Start with a
                free 14-day pilot — no long-term commitment.
              </p>
            </div>
            <BottomCTAs />
          </div>
        </div>
      </section>
    </>
  );
}
