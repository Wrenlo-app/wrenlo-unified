"use client";

import Link from "next/link";
import { useCTAPopup } from "./CTAPopup";

export function HeroCTAs() {
  const { openPopup } = useCTAPopup();
  return (
    <div className="hero-actions">
      <button className="btn btn-red btn-lg" onClick={() => openPopup("Start 14-Day Free Pilot")}>
        Start 14-Day Free Pilot →
      </button>
      <Link className="btn btn-white btn-lg" href="/product">
        See how it works
      </Link>
    </div>
  );
}

export function BottomCTAs() {
  const { openPopup } = useCTAPopup();
  return (
    <div className="cta-band-actions">
      <button className="btn btn-red btn-lg" onClick={() => openPopup("Book Pilot Call")}>
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
  );
}

export function PilotCTACard() {
  const { openPopup } = useCTAPopup();
  return (
    <button
      className="nav-page-card reveal"
      style={{
        background: "var(--tw-red-lt)",
        borderColor: "rgba(242,47,70,.3)",
        textAlign: "left",
        width: "100%",
        cursor: "pointer",
      }}
      onClick={() => openPopup("Book Pilot Call")}
    >
      <div className="npc-eyebrow">14-Day Pilot</div>
      <div className="npc-title">Start your free pilot</div>
      <div className="npc-sub">
        One phone line, one playbook, one booking workflow. If Wrenlo doesn&apos;t recover a
        qualified lead, you don&apos;t continue.
      </div>
      <div className="npc-arrow">Book pilot call →</div>
    </button>
  );
}
