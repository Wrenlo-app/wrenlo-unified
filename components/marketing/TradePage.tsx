"use client";

import { useState } from "react";
import Link from "next/link";
import { useCTAPopup } from "./CTAPopup";
import { BottomCTAs } from "./HomeCTAs";

export type Problem = { num: string; title: string; body: string; tag: string };
export type TranscriptMsg = { who: "ai" | "caller"; text: string };
export type FAQItem = { q: string; a: string };

export interface TradePageProps {
  trade: string;
  statPill: string;
  heroLine1: string;
  heroEm: string;
  heroSub: string;
  problems: Problem[];
  transcriptStatus: string;
  callerName: string;
  callerMeta: string;
  messages: TranscriptMsg[];
  resultText: string;
  resultSub: string;
  faqs: FAQItem[];
}

export default function TradePage(props: TradePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { openPopup } = useCTAPopup();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="stat-pill">
            <div className="stat-pill-dot" />
            {props.statPill}
          </div>
          <h1>
            {props.heroLine1} <em>{props.heroEm}</em>
          </h1>
          <p>{props.heroSub}</p>
          <div className="page-hero-actions">
            <button
              className="btn btn-red btn-lg"
              onClick={() => openPopup(`Start 14-Day Free Pilot — ${props.trade}`)}
            >
              Start 14-Day Free Pilot →
            </button>
            <Link className="btn btn-white btn-lg" href="/pricing">
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="sec-header">
            <span className="eyebrow">Sound familiar?</span>
            <h2 className="sec-title">
              Every missed call is a job
              <br />
              <em>someone else can book.</em>
            </h2>
          </div>
          <div className="problem-grid">
            {props.problems.map((p) => (
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
          <div className="two-col two-col-top">
            <div>
              <span className="eyebrow">How it works for {props.trade}</span>
              <h2 className="sec-title">
                Built for <em>{props.trade}</em> calls specifically —
                not a generic bot.
              </h2>
              <p className="sec-sub" style={{ marginBottom: 28 }}>
                Wrenlo answers in your business name, classifies urgency using
                {" "}{props.trade}-specific triggers, and books only into your
                approved calendar windows.
              </p>
              <div className="feat-grid" style={{ gridTemplateColumns: "1fr" }}>
                <div className="feat-card">
                  <div className="feat-icon">⚡</div>
                  <h3>Answers in seconds, not rings</h3>
                  <p>No hold music, no voicemail — every missed and after-hours call gets picked up live.</p>
                </div>
                <div className="feat-card">
                  <div className="feat-icon">🛡️</div>
                  <h3>Safety-first escalation</h3>
                  <p>Real emergencies route straight to the owner. Wrenlo never troubleshoots — it escalates.</p>
                </div>
                <div className="feat-card">
                  <div className="feat-icon">📋</div>
                  <h3>Full transcript, every call</h3>
                  <p>Urgency flag, caller details, and outcome logged in your dashboard automatically.</p>
                </div>
              </div>
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
                  {props.transcriptStatus}
                </div>
                <div className="caller-name">{props.callerName}</div>
                <div className="caller-meta">{props.callerMeta}</div>
                <div className="transcript">
                  {props.messages.map((m, i) => (
                    <div className={`t-row ${m.who === "caller" ? "caller-row" : ""}`} key={i}>
                      <span className={`t-who ${m.who}`}>
                        {m.who === "ai" ? "Wrenlo" : "Caller"}
                      </span>
                      <div className="t-bubble">{m.text}</div>
                    </div>
                  ))}
                </div>
                <div className="mock-result">
                  <div className="mock-result-icon">✓</div>
                  <div>
                    <div className="mock-result-text">{props.resultText}</div>
                    <div className="mock-result-sub">{props.resultSub}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="sec-header centered">
            <span className="eyebrow">Pricing</span>
            <h2 className="sec-title">
              Simple, honest pricing
              <br />
              <em>for {props.trade} contractors.</em>
            </h2>
          </div>
          <div className="pricing-grid">
            <div className="plan">
              <div className="plan-name">Starter</div>
              <div className="plan-price">$199</div>
              <div className="plan-period">/month</div>
              <div className="plan-setup">$299 setup, credited to Month 1</div>
              <div className="plan-divider" />
              <div className="plan-features">
                <div className="plan-feature"><span className="plan-check">✓</span>AI call answering, 24/7</div>
                <div className="plan-feature"><span className="plan-check">✓</span>Missed-call text-back</div>
                <div className="plan-feature"><span className="plan-check">✓</span>Emergency escalation</div>
              </div>
              <button className="btn btn-white btn-full" onClick={() => openPopup(`Start Pilot — ${props.trade} Starter`)}>
                Start Pilot
              </button>
            </div>
            <div className="plan featured">
              <div className="plan-name">Growth</div>
              <div className="plan-price">$399</div>
              <div className="plan-period">/month</div>
              <div className="plan-setup">$299 setup, credited to Month 1</div>
              <div className="plan-divider" />
              <div className="plan-features">
                <div className="plan-feature"><span className="plan-check">✓</span>Everything in Starter</div>
                <div className="plan-feature"><span className="plan-check">✓</span>Estimate booking</div>
                <div className="plan-feature"><span className="plan-check">✓</span>Revenue dashboard</div>
              </div>
              <button className="btn btn-red btn-full" onClick={() => openPopup(`Start Pilot — ${props.trade} Growth`)}>
                Start Pilot
              </button>
            </div>
            <div className="plan">
              <div className="plan-name">Pro</div>
              <div className="plan-price">$799</div>
              <div className="plan-period">/month</div>
              <div className="plan-setup">$299 setup, credited to Month 1</div>
              <div className="plan-divider" />
              <div className="plan-features">
                <div className="plan-feature"><span className="plan-check">✓</span>Everything in Growth</div>
                <div className="plan-feature"><span className="plan-check">✓</span>Priority routing rules</div>
                <div className="plan-feature"><span className="plan-check">✓</span>Dedicated onboarding</div>
              </div>
              <button className="btn btn-white btn-full" onClick={() => openPopup(`Start Pilot — ${props.trade} Pro`)}>
                Start Pilot
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="sec-header centered">
            <span className="eyebrow">FAQ</span>
            <h2 className="sec-title">Common questions</h2>
          </div>
          <div className="faq-list" style={{ maxWidth: 760, margin: "0 auto" }}>
            {props.faqs.map((f, i) => (
              <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={i}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <span className="faq-arrow">+</span>
                </button>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>
                Stop leaving booked jobs
                <br />
                on <em>voicemail.</em>
              </h2>
              <p>Start with a free 14-day pilot — no long-term commitment.</p>
            </div>
            <BottomCTAs />
          </div>
        </div>
      </section>
    </>
  );
}