import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/marketing/CTAButton";

export const metadata: Metadata = {
  title: "Our Story — Wrenlo AI | Built by People Who've Seen the Problem Firsthand",
  description:
    "Wrenlo was built by two founders with 16+ years of combined experience in home services and SMB operations. We saw the missed-call problem before we built the solution.",
};

const TIMELINE = [
  {
    icon: "🏠",
    year: "The beginning",
    title: "A family business and a phone that never stopped ringing",
    body: "Shivendra watches his brother build a home-service business from scratch — and spend as much time chasing calls and admin as he does doing the actual work. The first observation: skilled tradespeople are not failing at business. They're just doing two jobs at once.",
  },
  {
    icon: "📊",
    year: "Years in the field",
    title: "Working with contractors across trades and markets",
    body: "Shivendra works directly with HVAC, plumbing, electrical, roofing, and residential service businesses across the U.S. The pattern is consistent: contractors spending on Google Ads and lead marketplaces, then losing 20–30% of those leads to missed calls and slow follow-up. The revenue leak isn't visible on the P&L. It's invisible — which makes it worse.",
  },
  {
    icon: "🔧",
    year: "The SMB tooling gap",
    title: "Ashwini sees the same problem from a different angle",
    body: "Working with SMBs across industries, Ashwini sees how consistently small businesses are underserved by software built for enterprise scale. The solutions that exist are either too complex, too expensive, or require an IT team to configure. The businesses that need help most are the ones the market treats as an afterthought.",
  },
  {
    icon: "⚡",
    year: "The product insight",
    title: "The gap is the first 10 minutes — not the whole stack",
    body: "The two founders compare notes. The problem isn't field-service management. Jobber, Housecall Pro, and ServiceTitan handle operations well. The under-served gap is earlier: answering every call, qualifying the lead with trade-specific intelligence, booking the right next step, and showing the owner what it was worth. Wrenlo takes shape.",
    active: true,
  },
  {
    icon: "🚀",
    year: "Today",
    title: "Live for HVAC, plumbing, electrical, roofing, garage door, and pest control",
    body: "Wrenlo is live for contractors across six trades — answering calls, recovering missed leads via SMS, booking estimates, and requesting reviews after every completed job. Every account gets a trade-specific playbook, owner-defined booking rules, and a revenue dashboard that shows exactly how many calls were recovered and what they were worth.",
    active: true,
  },
];

const VALUES = [
  { icon: "🎯", title: "Outcomes over features", body: "Contractors don't want AI. They want fewer missed calls, more booked estimates, and less owner interruption. Every feature we build is measured against those outcomes — not against a feature checklist." },
  { icon: "🔌", title: "Works with your tools — not instead of them", body: "Jobber, Housecall Pro, ServiceTitan, and Google Calendar are already running your operations. Wrenlo integrates with them as the front-office layer. We don't ask you to replace what's working." },
  { icon: "🔍", title: "Visible and auditable by default", body: "Every call gets a transcript. Every automated action gets an audit trail. Owners can see exactly what Wrenlo said, what it booked, and what it flagged. No black boxes." },
  { icon: "🏗️", title: "Built narrow and deep — not wide and thin", body: "We build specifically for residential home-service contractors — not every SMB, not every trade, not enterprise facilities management. Depth of fit beats breadth of coverage." },
  { icon: "💰", title: "Bootstrapped means we win when you win", body: "No venture funding means no growth-at-all-costs pressure. We are profitable only when our customers stay and expand. That aligns our incentives directly with your results." },
  { icon: "📞", title: "Safety and trust are non-negotiable", body: "Emergency scripts escalate — they don't troubleshoot. Booking rules require owner approval. Consent and opt-out handling are built in from day one, not added later as compliance afterthoughts." },
];

export default function OurStoryPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Our Story</span>
          <h1>
            We didn&apos;t read about this problem.
            <br />
            <em>We lived it.</em>
          </h1>
          <p>
            Wrenlo was built by two founders with 16+ combined years of experience working
            inside and alongside home-service businesses — one who grew up in one, and one who
            spent a decade watching small businesses get ignored by the tools built to serve
            them.
          </p>
          <div className="page-hero-actions">
            <CTAButton label="Start Free Pilot" className="btn btn-primary btn-lg">
              Start Free Pilot →
            </CTAButton>
            <Link className="btn btn-ghost btn-lg" href="/product">
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* ORIGIN STORY */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="sec-header">
            <span className="eyebrow">Where it started</span>
            <h2 className="sec-title">
              A family business, a brother
              <br />
              who never stopped <em>working.</em>
            </h2>
          </div>
          <div className="origin-grid reveal">
            <div className="origin-text">
              <div className="origin-label">Shivendra&apos;s background</div>
              <p>
                Shivendra grew up watching his family run a small home-service business. His
                brother was the one who built it from scratch — skilled at the trade, trusted by
                customers, and completely consumed by the work. Not just the field work. The
                phone calls. The scheduling. The follow-ups. The back-and-forth with customers
                who needed quotes. The admin that never seemed to end.
              </p>
              <p>
                His brother was good at the business. <strong>He just never had time to grow
                it.</strong> Weekends that were supposed to be off turned into catch-up time for
                voicemails. Family dinners were interrupted by calls he couldn&apos;t afford to
                miss. Every missed call was a calculation — answer and stop what you&apos;re
                doing, or let it go and hope they call back.
              </p>
              <div className="origin-pull">
                &quot;He wasn&apos;t failing at running a business. He was succeeding at it —{" "}
                <em>while doing every job that should have had a person behind it.</em>&quot;
              </div>
              <p>
                Shivendra carried that observation into his career. He went on to work directly
                with multiple home-service businesses, helping them grow. And the same pattern
                appeared everywhere: contractors spending real money on Google Ads, referral
                networks, and Angi listings — then losing a substantial portion of those leads
                to voicemail, slow callbacks, and after-hours silence.
              </p>
              <p>The money was going out. The calls weren&apos;t all coming back.</p>
            </div>
            <div className="origin-text">
              <div className="origin-label">What the numbers revealed</div>
              <p>
                Working across multiple businesses gave Shivendra a view that individual
                operators rarely get: the comparison. One HVAC company would convert 40% of its
                inbound calls into booked estimates. Another, nearly identical in service
                quality and market, converted barely 20%. The difference wasn&apos;t the
                technicians. It wasn&apos;t the pricing. It was response time and coverage.
              </p>
              <p>
                The businesses that answered every call — or followed up within minutes —
                consistently won more jobs from the same marketing spend.{" "}
                <strong>
                  The ones that didn&apos;t answer were quietly losing revenue they had already
                  paid to generate.
                </strong>
              </p>
              <p>
                The fix seemed obvious: hire someone to answer calls. But for a two-person shop
                or a five-person crew, a full-time receptionist is a significant fixed cost for
                variable lead flow. A generic answering service takes messages but doesn&apos;t
                understand what a broken heat exchanger means or whether a leaking pipe is an
                emergency. The gap wasn&apos;t staffing. It was intelligence.
              </p>
              <p>That&apos;s the gap Wrenlo was designed to close.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER CARDS */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="sec-header centered">
            <span className="eyebrow">The founders</span>
            <h2 className="sec-title">
              16+ years of combined experience.
              <br />
              <em>One shared conviction.</em>
            </h2>
            <p className="sec-sub">
              We built Wrenlo because we knew exactly what the problem cost — in revenue, in
              owner time, and in the kind of burnout that doesn&apos;t show up on any balance
              sheet.
            </p>
          </div>
          <div className="founders-grid reveal">
            <div className="founder-card">
              <div className="founder-initial">S</div>
              <div className="founder-name">Shivendra</div>
              <div className="founder-role">Co-Founder · Home Services &amp; GTM</div>
              <p>
                Grew up in a family-run home-service business and watched firsthand how a
                skilled trade operator can build a loyal customer base — while being stretched
                thin by admin work that never stops.
              </p>
              <p>
                Spent years consulting with HVAC, plumbing, electrical, and residential service
                businesses across the U.S., helping them grow revenue and improve operations.
                Saw the same pattern repeat: contractors spending on lead generation and losing
                a significant portion of those leads to response gaps and missed follow-ups.
              </p>
              <p>
                At Wrenlo, Shivendra leads product direction, go-to-market strategy, and the
                contractor relationships that make our trade playbooks accurate.
              </p>
              <div className="founder-stat">
                <div>
                  <div className="fstat-val"><em>8</em>+</div>
                  <div className="fstat-lbl">years in home services &amp; business growth</div>
                </div>
                <div>
                  <div className="fstat-val"><em>50</em>+</div>
                  <div className="fstat-lbl">contractor businesses worked with directly</div>
                </div>
              </div>
            </div>
            <div className="founder-card">
              <div className="founder-initial">A</div>
              <div className="founder-name">Ashwini</div>
              <div className="founder-role">Co-Founder · Product &amp; Operations</div>
              <p>
                Spent nearly a decade embedded with small and medium-scale businesses across
                multiple industries, building and scaling operational systems. Noticed a
                consistent pattern: the software tools that dominated the market were
                architected for enterprise needs — and retrofitted, poorly, for the businesses
                that needed help most.
              </p>
              <p>
                Small businesses weren&apos;t asking for less powerful software. They were
                asking for software that actually fit how they worked — lean teams, fast
                decisions, no IT department. Most vendors treated SMBs as a downmarket segment
                rather than a distinct customer with distinct needs. That gap became the
                starting point.
              </p>
              <p>
                At Wrenlo, Ashwini leads the product, infrastructure, and the systems that make
                contractor onboarding fast and reliable.
              </p>
              <div className="founder-stat">
                <div>
                  <div className="fstat-val"><em>8</em>+</div>
                  <div className="fstat-lbl">years in SMB product &amp; operations</div>
                </div>
                <div>
                  <div className="fstat-val"><em>30</em>+</div>
                  <div className="fstat-lbl">SMBs supported across industries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE SHARED INSIGHT */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="sec-header">
            <span className="eyebrow">The shared insight</span>
            <h2 className="sec-title">
              Two different vantage points.
              <br />
              <em>The same conclusion.</em>
            </h2>
          </div>
          <div className="origin-grid reveal">
            <div className="origin-text">
              <p>
                Shivendra had seen the revenue leak from the outside — watching contractors pay
                for leads that never converted because nobody was available to answer. Ashwini
                had seen the tooling gap from the inside — watching small businesses adopt
                software built for companies ten times their size, then blame themselves when it
                didn&apos;t fit.
              </p>
              <p>
                When they compared notes, the picture was clear.{" "}
                <strong>
                  Home-service contractors didn&apos;t need a new field-service management
                  platform.
                </strong>{" "}
                Jobber, Housecall Pro, ServiceTitan, and Workiz already handle scheduling,
                dispatch, invoicing, and CRM well. The gap wasn&apos;t operations. The gap was
                the first 10 minutes of every customer interaction.
              </p>
              <div className="origin-pull">
                &quot;The call is already ringing. The lead is already there.{" "}
                <em>The only question is whether someone — or something — answers it.&quot;</em>
              </div>
              <p>
                Every contractor we spoke to during our research described the same problem in
                slightly different words. The plumber who missed a $3,000 burst-pipe call
                because he was under a sink. The HVAC owner who lost a replacement estimate to a
                competitor who answered 8 minutes faster. The electrician who found out — three
                months later — that a customer had called for a panel upgrade and never left a
                voicemail.
              </p>
            </div>
            <div className="origin-text">
              <p>
                Ashwini&apos;s insight was on the tooling side. The solutions that existed for
                this problem were either too generic or too expensive. Generic AI receptionists
                could answer a call and take a message — but they didn&apos;t know the
                difference between a no-heat emergency and a routine maintenance request. Human
                answering services cost $300–$600 a month and produced the same unstructured
                message pad output.
              </p>
              <p>
                Neither option booked anything. Neither option understood the trade. Neither
                option told the contractor how much revenue it recovered.
              </p>
              <p>
                <strong>Wrenlo was designed to do all three.</strong> Answer calls with
                trade-specific intelligence. Book the right next step into the contractor&apos;s
                existing calendar or FSM. Show the owner exactly how much revenue was protected
                — in a dashboard that speaks the language of jobs, not call minutes.
              </p>
              <p>That&apos;s the product we wish had existed for every contractor we&apos;ve worked with. That&apos;s why we built it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="sec-header">
            <span className="eyebrow">How we got here</span>
            <h2 className="sec-title">
              The path from
              <br />
              <em>observation to product.</em>
            </h2>
          </div>
          <div className="timeline reveal">
            {TIMELINE.map((t) => (
              <div className="tl-item" key={t.year}>
                <div className={`tl-dot${t.active ? " active" : ""}`}>{t.icon}</div>
                <div className="tl-body">
                  <div className="tl-year">{t.year}</div>
                  <div className="tl-title">{t.title}</div>
                  <p>{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREDIBILITY BAR */}
      <div style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="cred-bar reveal">
            <div className="cred-cell">
              <div className="cred-val"><em>16</em>+</div>
              <div className="cred-lbl">Combined years of experience in home services and SMB product</div>
            </div>
            <div className="cred-cell">
              <div className="cred-val"><em>80</em>+</div>
              <div className="cred-lbl">Businesses worked with directly before writing the first line of code</div>
            </div>
            <div className="cred-val-cell cred-cell">
              <div className="cred-val"><em>27</em>%</div>
              <div className="cred-lbl">Of home-service calls go unanswered — the gap Wrenlo was built to close</div>
            </div>
            <div className="cred-cell">
              <div className="cred-val"><em>0</em></div>
              <div className="cred-lbl">Venture funding. Bootstrapped by design. Profitable only when our customers are.</div>
            </div>
          </div>
        </div>
      </div>

      {/* VALUES */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="sec-header centered">
            <span className="eyebrow">How we operate</span>
            <h2 className="sec-title">
              The principles behind
              <br />
              <em>every product decision.</em>
            </h2>
          </div>
          <div className="values-grid reveal">
            {VALUES.map((v) => (
              <div className="value-card" key={v.title}>
                <span className="value-icon">{v.icon}</span>
                <div className="value-title">{v.title}</div>
                <div className="value-desc">{v.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION BOX */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="mission-box reveal">
            <span className="eyebrow">Our mission</span>
            <h2>
              Every contractor deserves a front desk
              <br />
              that works as hard as <em>they do.</em>
            </h2>
            <p>
              Skilled tradespeople shouldn&apos;t have to choose between doing the job and
              answering the call. Wrenlo exists to make that choice unnecessary — by ensuring
              every inbound lead gets a qualified, intelligent response, every hour of every
              day, without adding headcount or replacing the tools already in use.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <CTAButton label="Start Your Free Pilot" className="btn btn-primary btn-lg">
                Start Your Free Pilot →
              </CTAButton>
              <Link className="btn btn-ghost btn-lg" href="/survey">
                Take our founding survey
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}