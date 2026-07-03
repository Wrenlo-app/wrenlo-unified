import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/marketing/CTAButton";
import SurveyForm from "@/components/marketing/survey/SurveyForm";
import CopyLinkButton from "@/components/marketing/survey/CopyLinkButton";

export const metadata: Metadata = {
  title: "Founding Survey — Wrenlo AI · Win $100 Gift Card",
  description:
    "5-minute survey for HVAC and plumbing contractors. Help shape Wrenlo's product roadmap. Win a $100 Amazon gift card. Free industry benchmark report for all respondents.",
};

const PERKS = [
  { icon: "🎁", title: "Win $100 Amazon gift card", desc: "Random draw after 200 completed responses. Winner announced by email within 2 weeks." },
  { icon: "🔒", title: "Founding member pricing", desc: "Respondents who join the pilot get founding-member rates locked in for life before public launch." },
  { icon: "📊", title: "Free benchmark report", desc: "Real data on how US contractors handle inbound calls, after-hours coverage, and lead conversion — sent to all respondents at 100 responses." },
  { icon: "🛠", title: "Direct product influence", desc: "Survey data is reviewed by our founders weekly. Your answers shape the next 3 features and which vertical Wrenlo optimises for next." },
  { icon: "📞", title: "Priority pilot access", desc: "Founding survey respondents get priority access to the 14-day pilot program before we open to the public." },
];

const NEXT_STEPS = [
  { num: "01", title: "Confirmation email", body: "Within a few minutes you'll receive a confirmation with your entry number and a link to share the survey with other contractors." },
  { num: "02", title: "Benchmark report", body: "Once we hit 100 responses, we email all respondents a free industry benchmark report with real data on missed-call rates, after-hours coverage, and lead conversion." },
  { num: "03", title: "Gift card draw", body: "At 200 responses we draw the $100 Amazon gift card winner randomly and announce publicly. You'll be emailed directly if you win." },
  { num: "04", title: "Pilot access", body: "If you expressed interest in the pilot, you'll hear from us within 48 hours to schedule your free missed-call audit and pilot setup call." },
];

const PROOF_QUOTES = [
  { tag: "HVAC contractor · Austin, TX · Discovery call", quote: "I'm on the roof and my phone rings. I can't answer. By the time I call back 40 minutes later, they've already booked with someone else. That happens at least twice a week." },
  { tag: "Plumbing contractor · Houston, TX · Discovery call", quote: "After-hours is where I lose the most. No-heat calls at 9pm — if I don't pick up, they don't leave voicemail. They just call the next guy on Google." },
  { tag: "Electrical contractor · Dallas, TX · Discovery call", quote: "My wife handles calls when I'm on a job. She writes down name and number on sticky notes. Half the time I can't read it — and we have no idea what they actually needed." },
];

export default function SurveyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="stat-pill">
            <span className="stat-pill-dot" />
            Draw closes at 200 responses · <span>147</span> received so far
          </div>
          <h1>
            Help us build what
            <br />
            contractors <em>actually need.</em>
          </h1>
          <p>
            Your answers directly shape what Wrenlo builds. Enter to win a $100 Amazon gift
            card. Every respondent gets the industry benchmark report free.
          </p>
          <div className="page-hero-actions">
            <a className="btn btn-primary btn-lg" href="#form">
              Take the Survey
            </a>
            <Link
              className="btn btn-lg"
              href="/product"
              style={{ background: "var(--bg2)", color: "#e16400", border: "1px solid rgba(255,100,0,.45)" }}
            >
              Learn about Wrenlo
            </Link>
          </div>
          <div className="survey-stats">
            <div className="sstat">
              <div className="sstat-val">$100</div>
              <div className="sstat-lbl">Amazon gift card prize</div>
            </div>
            <div className="sstat">
              <div className="sstat-val">5 min</div>
              <div className="sstat-lbl">To complete</div>
            </div>
            <div className="sstat">
              <div className="sstat-val">Free</div>
              <div className="sstat-lbl">Benchmark report for all</div>
            </div>
            <div className="sstat">
              <div className="sstat-val">0</div>
              <div className="sstat-lbl">Spam, ever</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg2)" }} id="form">
        <div className="container">
          <div className="survey-layout">
            <div>
              <span className="eyebrow">Why this matters</span>
              <h2 className="sec-title">
                We build what you tell us
                <br />
                <em>to build.</em>
              </h2>
              <p className="sec-sub">
                Wrenlo is in founding pilot. We&apos;re not guessing what contractors need —
                we&apos;re asking. Your answers determine which features ship first, which
                trades we optimise for, and where we focus our onboarding.
              </p>
              <div className="perks-list">
                {PERKS.map((p) => (
                  <div className="perk" key={p.title}>
                    <div className="perk-icon-wrap">{p.icon}</div>
                    <div>
                      <div className="perk-title">{p.title}</div>
                      <div className="perk-desc">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pain-strip">
                <div className="pain-strip-title">What we&apos;re hearing in discovery calls</div>
                <div className="pain-quote">
                  &quot;I&apos;m on the roof and my phone rings. I can&apos;t answer. By the time
                  I call back 40 minutes later, they&apos;ve already booked with someone
                  else.&quot;
                </div>
                <div className="pain-attr">HVAC contractor · Austin, TX · Discovery call</div>
                <div className="pain-quote" style={{ marginTop: 14 }}>
                  &quot;After-hours is where I lose the most. No-heat calls at 9pm — if I
                  don&apos;t pick up, they don&apos;t leave voicemail.&quot;
                </div>
                <div className="pain-attr">Plumbing contractor · Houston, TX · Discovery call</div>
              </div>
            </div>

            <SurveyForm />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="sec-header centered">
            <span className="eyebrow">What happens next</span>
            <h2 className="sec-title">
              After you hit submit,
              <br />
              <em>here&apos;s what to expect.</em>
            </h2>
          </div>
          <div className="next-steps">
            {NEXT_STEPS.map((s) => (
              <div className="next-step reveal" key={s.num}>
                <div className="next-step-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--card)" }}>
        <div className="container">
          <div className="sec-header centered">
            <span className="eyebrow">Why we&apos;re asking</span>
            <h2 className="sec-title">
              Real problems we&apos;ve heard
              <br />
              from <em>real contractors.</em>
            </h2>
            <p className="sec-sub">
              These are paraphrased quotes from discovery calls — not fabricated testimonials.
              We&apos;re sharing them so you can see we understand the problem before we try to
              sell you a solution.
            </p>
          </div>
          <div className="proof-grid">
            {PROOF_QUOTES.map((q) => (
              <div className="proof-card reveal" key={q.tag}>
                <div className="proof-tag">{q.tag}</div>
                <div className="proof-quote">&quot;{q.quote}&quot;</div>
                <div className="proof-attr">Validated pain · Not a paid endorsement</div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 48,
              textAlign: "center",
              padding: "40px 32px",
              background: "var(--teal-lt)",
              border: "1px solid rgba(255,107,43,.2)",
              borderRadius: "var(--r-lg)",
            }}
          >
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 26, marginBottom: 8 }}>
              Know another contractor?
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-soft)", marginBottom: 24, fontWeight: 300 }}>
              Every response makes the benchmark report more valuable for everyone. Share the
              survey link.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                className="btn btn-primary"
                href="https://www.facebook.com/sharer/sharer.php?u=https://wrenlo.co/survey"
                target="_blank"
                rel="noreferrer"
              >
                Share on Facebook
              </a>
              <a
                className="btn btn-ghost"
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://wrenlo.co/survey"
                target="_blank"
                rel="noreferrer"
              >
                Share on LinkedIn
              </a>
              <CopyLinkButton />
            </div>
          </div>
        </div>
      </section>

      <section className="section--tight" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="cta-band reveal">
            <div>
              <h2>
                Already know you want
                <br />
                the <em>pilot?</em>
              </h2>
              <p>
                Skip the survey and book a 20-minute pilot call directly. We&apos;ll audit your
                missed-call situation and set up your Wrenlo playbook on the same call.
              </p>
            </div>
            <div className="cta-band-actions">
              <CTAButton label="Book Pilot Call" className="btn btn-white btn-lg">
                Book Pilot Call →
              </CTAButton>
              <Link
                className="btn"
                href="/pricing"
                style={{ background: "var(--bg3)", color: "#fff", border: "1px solid rgba(255,255,255,.3)" }}
              >
                See pricing first
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
