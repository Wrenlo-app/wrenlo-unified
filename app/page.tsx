"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ---------- typing bubble phrases ---------- */
const PHRASES = [
  "Flagging this as <strong>priority</strong>. What's your address and system age?",
  "Got it — I'll hold a priority slot and alert the owner now.",
  "Understood. Address and I'll take it from there.",
];

export default function HomePage() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* typing bubble rotation */
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  /* scroll-reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("revealed")),
      { threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const openPopup = (label: string) => {
    if (typeof window !== "undefined" && (window as any).wrenloPopup) {
      (window as any).wrenloPopup.open(label);
    }
  };

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="ann-bar">
        🎁 Win $100 Amazon gift card —{" "}
        <Link href="/survey">take our 5-min founding survey</Link>
      </div>

      {/* ── Nav ── */}
      <nav>
        <div className="nav-inner">
          <Link href="/" className="logo">
            <div className="logo-mark">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8C3 5.24 5.24 3 8 3s5 2.24 5 5"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path d="M8 8l3-3" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="8" cy="8" r="1.4" fill="white" />
              </svg>
            </div>
            Wrenlo
          </Link>

          <div className="nav-links">
            <Link className="nav-link" href="/product">Product</Link>
            <Link className="nav-link" href="/pricing">Pricing</Link>
            <Link className="nav-link" href="/why-us">Why Wrenlo</Link>
            <Link className="nav-link" href="/our-story">Our Story</Link>
            <Link className="nav-link" href="/survey">Survey</Link>
          </div>

          <div className="nav-ctas">
            <button
              className="btn btn-ghost"
              onClick={() => openPopup("Free Audit")}
            >
              Free Audit
            </button>
            <button
              className="btn btn-primary"
              onClick={() => openPopup("Book Pilot Call")}
            >
              Book Pilot Call
            </button>
          </div>

          <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            ☰
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div className={`mobile-menu${mobileOpen ? " open" : ""}`} id="mobileMenu">
        <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          ✕
        </button>
        {[
          ["/product", "Product"],
          ["/pricing", "Pricing"],
          ["/why-us", "Why Wrenlo"],
          ["/our-story", "Our Story"],
          ["/survey", "Survey"],
        ].map(([href, label]) => (
          <Link key={href} className="mobile-link" href={href} onClick={() => setMobileOpen(false)}>
            {label}
          </Link>
        ))}
        <div className="mobile-menu-ctas">
          <button
            className="btn btn-ghost btn-full"
            onClick={() => { setMobileOpen(false); openPopup("Free Missed-Call Audit"); }}
          >
            Free Missed-Call Audit
          </button>
          <button
            className="btn btn-primary btn-full"
            onClick={() => { setMobileOpen(false); openPopup("Book Pilot Call"); }}
          >
            Book Pilot Call
          </button>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="hero">
        <style>{`
          .hero { padding:80px 0 72px; background:var(--hero-bg); position:relative; overflow:hidden }
          .hero::after { content:''; position:absolute; top:-200px; right:-200px; width:700px; height:700px; background:radial-gradient(circle,rgba(242,47,70,.15) 0%,transparent 70%); pointer-events:none; z-index:0 }
          .hero .container { position:relative; z-index:1 }
          .hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center }
          .hero h1 { font-family:var(--sans); font-size:clamp(40px,5.5vw,68px); line-height:1.04; letter-spacing:-.025em; margin-bottom:22px; font-weight:700; color:#fff }
          .hero h1 em { font-style:italic; color:var(--tw-red) }
          .hero-sub { font-size:17px; line-height:1.7; color:rgba(255,255,255,.65); max-width:460px; margin-bottom:36px; font-weight:300 }
          .hero-actions { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:32px }
          .call-mock { background:#fff; border:1px solid var(--border); border-radius:var(--r-lg); overflow:hidden; box-shadow:0 32px 80px rgba(0,0,0,.25), 0 8px 24px rgba(0,0,0,.12) }
          .mock-header { background:var(--hero-bg); padding:14px 18px; border-bottom:1px solid rgba(255,255,255,.08); display:flex; align-items:center; gap:10px }
          .mock-dots { display:flex; gap:5px }
          .mock-dot  { width:9px; height:9px; border-radius:50% }
          .mock-title { font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.4); letter-spacing:.06em; flex:1; text-align:center }
          .mock-body { padding:20px }
          .call-status { display:flex; align-items:center; gap:8px; font-family:var(--mono); font-size:10px; color:var(--tw-red); letter-spacing:.08em; text-transform:uppercase; margin-bottom:14px; padding:8px 12px; background:var(--tw-red-lt); border:1px solid rgba(242,47,70,.2); border-radius:6px }
          .call-status-dot { width:6px; height:6px; border-radius:50%; background:var(--tw-red); animation:pulse 1.5s infinite }
          .caller-name { font-size:17px; font-weight:600; color:var(--navy); margin-bottom:3px }
          .caller-meta { font-size:12px; color:var(--text-faint); margin-bottom:16px }
          .transcript  { display:flex; flex-direction:column; gap:9px; margin-bottom:14px }
          .t-row { display:flex; gap:8px; align-items:flex-start }
          .t-who { font-family:var(--mono); font-size:9px; font-weight:500; letter-spacing:.06em; text-transform:uppercase; min-width:44px; padding-top:8px; flex-shrink:0 }
          .t-who.ai     { color:var(--tw-red) }
          .t-who.caller { color:var(--text-faint) }
          .t-bubble { background:var(--bg2); border-radius:4px 10px 10px 10px; padding:8px 12px; font-size:13px; line-height:1.55; color:var(--text); max-width:100% }
          .t-row.caller-row { flex-direction:row-reverse }
          .t-row.caller-row .t-bubble { background:var(--navy-lt); border-radius:10px 4px 10px 10px; color:var(--text-soft) }
          .mock-result { background:var(--green-bg); border:1px solid rgba(16,185,129,.25); border-radius:8px; padding:12px 14px; display:flex; align-items:flex-start; gap:10px }
          .mock-result-icon { font-size:16px; flex-shrink:0; margin-top:1px }
          .mock-result-text { font-size:12px; color:var(--green); font-weight:500; line-height:1.5 }
          .mock-result-sub  { font-size:11px; color:rgba(16,185,129,.6); margin-top:3px }
          .hero-visual { position:relative }
          .float-card { position:absolute; background:var(--card); border:1px solid var(--border); border-radius:var(--r); padding:12px 16px; box-shadow:0 8px 24px rgba(30,41,59,.15); z-index:2 }
          .float-top    { top:-18px; right:-18px }
          .float-bottom { bottom:20px; left:-20px }
          .float-val  { font-family:var(--sans); font-size:22px; color:var(--navy) }
          .float-val span { color:var(--tw-red) }
          .float-lbl  { font-size:11px; color:var(--text-faint); margin-top:2px; max-width:180px; line-height:1.4 }
          .float-live { display:flex; align-items:center; gap:8px }
          .float-dot  { width:7px; height:7px; border-radius:50%; background:var(--green); animation:pulse 2s infinite; flex-shrink:0 }
          .float-live-label .float-val { font-size:15px; font-weight:600; font-family:var(--sans); color:var(--navy) }
          @media(max-width:900px){ .hero-grid{grid-template-columns:1fr} .hero-visual{display:none} }
        `}</style>

        <div className="container">
          <div className="hero-grid">
            <div>
              <h1>
                Stop losing jobs because
                <br />
                you were <em>on another job.</em>
              </h1>
              <p className="hero-sub">
                Wrenlo answers every missed and after-hours call, qualifies the lead, books approved
                estimates, and shows exactly how much revenue was recovered — without replacing your
                existing tools.
              </p>
              <div className="hero-actions">
                <button
                  className="btn btn-red btn-lg"
                  onClick={() => openPopup("Start 14-Day Free Pilot →")}
                >
                  Start 14-Day Free Pilot →
                </button>
                <Link className="btn btn-white btn-lg" href="/product">
                  See how it works
                </Link>
              </div>
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

            {/* Hero visual / call mock */}
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
                        Hi, thanks for calling! I'm the team's AI assistant — everyone's on jobs
                        right now. What's going on today?
                      </div>
                    </div>
                    <div className="t-row caller-row">
                      <span className="t-who caller">Caller</span>
                      <div className="t-bubble">
                        My AC stopped working. It's 103 degrees and I have two little kids.
                      </div>
                    </div>
                    <div className="t-row">
                      <span className="t-who ai">Wrenlo</span>
                      <div
                        id="typing-bubble"
                        className="t-bubble"
                        style={{ opacity: visible ? 1 : 0, transition: "opacity .4s" }}
                        dangerouslySetInnerHTML={{ __html: PHRASES[phraseIdx] }}
                      />
                    </div>
                  </div>
                  <div className="mock-result">
                    <div className="mock-result-icon">✓</div>
                    <div>
                      <div className="mock-result-text">
                        Emergency classified · Owner alerted · 8am slot held
                      </div>
                      <div className="mock-result-sub">
                        Transcript saved · Est. job value: $1,200+
                      </div>
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

      {/* ── Logos Bar ── */}
      <div className="logos-bar" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="logos-inner">
            <span className="logos-label">Works with</span>
            {["Jobber", "Housecall Pro", "ServiceTitan", "Workiz", "Google Calendar", "QuickBooks", "FieldEdge"].map(
              (name) => (
                <span key={name} className="logo-item">
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="stats-grid">
            {[
              {
                val: <><em>27%</em></>,
                lbl: "of home-service calls go unanswered every day",
                src: "Invoca Home Services Report 2025",
              },
              {
                val: <>$<em>1,205</em></>,
                lbl: "average HVAC repair ticket — cost of one missed call",
                src: "Industry benchmark 2025",
              },
              {
                val: <><em>90%</em></>,
                lbl: "of homeowners expect a response within 10 minutes",
                src: "HubSpot State of Service 2022",
              },
              {
                val: <><em>53%</em></>,
                lbl: "of homeowners are comfortable with AI on their initial call",
                src: "Housecall Pro Report 2025",
              },
            ].map(({ val, lbl, src }, i) => (
              <div key={i} className="stat-cell reveal" data-reveal>
                <div className="stat-val">{val}</div>
                <div className="stat-lbl">{lbl}</div>
                <div className="stat-src">{src}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Problem Section ── */}
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
              Built for contractors spending real money on leads — and watching them slip through the
              cracks after hours.
            </p>
          </div>
          <div className="problem-grid reveal" data-reveal>
            {[
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
            ].map(({ num, title, body, tag }) => (
              <div key={num} className="prob-card">
                <div className="prob-num">{num}</div>
                <h3>{title}</h3>
                <p>{body}</p>
                <span className="prob-tag">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Navigation Cards Section ── */}
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
            {[
              {
                href: "/product",
                eyebrow: "Product",
                title: "How Wrenlo works",
                sub: "AI call answering, missed-call text-back, emergency classification, booking, follow-up, and revenue tracking.",
                arrow: "Explore the product →",
                style: {},
              },
              {
                href: "/pricing",
                eyebrow: "Pricing",
                title: "Simple, honest pricing",
                sub: "Starter $199/mo, Growth $399/mo, Pro $799/mo. Setup fee credited to Month 1. No per-minute surprises.",
                arrow: "See pricing →",
                style: {},
              },
              {
                href: "/why-us",
                eyebrow: "Why Wrenlo",
                title: "How we compare",
                sub: "Side-by-side vs. generic AI receptionists, human answering services, and FSM built-in features.",
                arrow: "See the comparison →",
                style: {},
              },
              {
                href: "/our-story",
                eyebrow: "Our Story",
                title: "Why we built this",
                sub: "We saw the missed-call problem firsthand. Wrenlo is the product we wish existed for every contractor we know.",
                arrow: "Read our story →",
                style: {},
              },
              {
                href: "/survey",
                eyebrow: "Founding Survey",
                title: "Shape the product",
                sub: "5-minute survey. Your answers directly shape what we build next. Win a $100 Amazon gift card.",
                arrow: "Take the survey →",
                style: {},
              },
            ].map(({ href, eyebrow, title, sub, arrow, style }) => (
              <Link key={href} className="nav-page-card reveal" href={href} data-reveal style={style}>
                <div className="npc-eyebrow">{eyebrow}</div>
                <div className="npc-title">{title}</div>
                <div className="npc-sub">{sub}</div>
                <div className="npc-arrow">{arrow}</div>
              </Link>
            ))}
            {/* Pilot card — button behaviour */}
            <button
              className="nav-page-card reveal"
              data-reveal
              style={{
                background: "var(--tw-red-lt)",
                borderColor: "rgba(242,47,70,.3)",
                textAlign: "left",
                cursor: "pointer",
              }}
              onClick={() => openPopup("Book pilot call →")}
            >
              <div className="npc-eyebrow">14-Day Pilot</div>
              <div className="npc-title">Start your free pilot</div>
              <div className="npc-sub">
                One phone line, one playbook, one booking workflow. If Wrenlo doesn't recover a
                qualified lead, you don't continue.
              </div>
              <div className="npc-arrow">Book pilot call →</div>
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="section--tight" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="cta-band reveal" data-reveal>
            <div>
              <h2>
                Stop leaving booked jobs
                <br />
                on <em>voicemail.</em>
              </h2>
              <p>
                One recovered emergency call typically pays for months of Wrenlo. Start with a free
                14-day pilot — no long-term commitment.
              </p>
            </div>
            <div className="cta-band-actions">
              <button className="btn btn-red btn-lg" onClick={() => openPopup("Book Pilot Call →")}>
                Book Pilot Call →
              </button>
              <button
                className="btn btn-white btn-lg"
                onClick={() => openPopup("Get Free Missed-Call Audit")}
              >
                Get Free Missed-Call Audit
              </button>
              <span className="cta-note">$299 setup · credited to Month 1 · cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand-name">Wrenlo AI</div>
              <p className="footer-brand-desc">
                AI front desk and lead recovery for U.S. home service contractors. Built to capture
                the revenue that walks out the door after hours.
              </p>
            </div>
            <div>
              <div className="footer-col-title">Pages</div>
              <div className="footer-links">
                <Link className="footer-link" href="/product">Product</Link>
                <Link className="footer-link" href="/pricing">Pricing</Link>
                <Link className="footer-link" href="/why-us">Why Wrenlo</Link>
                <Link className="footer-link" href="/our-story">Our Story</Link>
                <Link className="footer-link" href="/survey">Survey</Link>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Trades</div>
              <div className="footer-links">
                {["HVAC", "Plumbing", "Electrical", "Roofing", "Garage Door", "Pest Control"].map(
                  (trade) => (
                    <Link key={trade} className="footer-link" href="/product">
                      {trade}
                    </Link>
                  )
                )}
              </div>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <div className="footer-links">
                <Link className="footer-link" href="/our-story">Our Story</Link>
                <a className="footer-link" href="mailto:hello@wrenlo.co">Contact Us</a>
                <Link className="footer-link" href="/privacy">Privacy Policy</Link>
                <Link className="footer-link" href="/terms">Terms of Service</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2026 Wrenlo AI · wrenlo.co</span>
            <span className="footer-copy">Built for contractors who are done missing jobs</span>
          </div>
        </div>
      </footer>

      {/* External scripts — loaded after hydration */}
      <script src="/wrenlo.js" async />
      <script src="/wrenlo-popup.js" async />
    </>
  );
}