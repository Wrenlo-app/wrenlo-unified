"use client";

import { useState, useMemo } from "react";
import { useCTAPopup } from "../CTAPopup";

const TRADE_TICKETS: Record<string, number> = {
  hvac: 900,
  plumbing: 380,
  electrical: 490,
  roofing: 2400,
  pest: 215,
  other: 500,
};

const TRADE_LABELS: Record<string, string> = {
  hvac: "HVAC",
  plumbing: "Plumbing",
  electrical: "Electrical",
  roofing: "Roofing",
  pest: "Pest Control",
  other: "Other",
};

export default function ROICalculator() {
  const { openPopup } = useCTAPopup();
  const [trade, setTrade] = useState("hvac");
  const [calls, setCalls] = useState(40);
  const [ticket, setTicket] = useState(TRADE_TICKETS.hvac);

  const result = useMemo(() => {
    // Same formula as the original: calls * 4.33 weeks * 27% miss rate * 50% recovery * ticket value
    return Math.round(calls * 4.33 * 0.27 * 0.5 * ticket);
  }, [calls, ticket]);

  function handleTradeChange(value: string) {
    setTrade(value);
    setTicket(TRADE_TICKETS[value] ?? 500);
  }

  return (
    <div className="roi-calc">
      <div style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)", marginBottom: 24 }}>
        Your monthly revenue recovery estimate
      </div>

      <div className="form-field">
        <label className="form-label">Your trade</label>
        <select
          className="form-select"
          value={trade}
          onChange={(e) => handleTradeChange(e.target.value)}
        >
          {Object.entries(TRADE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label className="form-label">Weekly inbound calls</label>
        <input
          type="number"
          className="form-input"
          min={1}
          value={calls}
          onChange={(e) => setCalls(Number(e.target.value) || 0)}
        />
      </div>

      <div className="form-field">
        <label className="form-label">Average job or estimate value ($)</label>
        <input
          type="number"
          className="form-input"
          min={1}
          value={ticket}
          onChange={(e) => setTicket(Number(e.target.value) || 0)}
        />
      </div>

      <div className="calc-result">
        <div>
          <div className="calc-result-lbl">Est. monthly revenue recovered</div>
          <div className="calc-result-sub">at 50% call recovery rate</div>
        </div>
        <div className="calc-result-val">${result.toLocaleString()}</div>
      </div>

      <button
        className="btn btn-primary btn-full btn-lg"
        onClick={() => openPopup("Book a free pilot call")}
      >
        Book a free pilot call →
      </button>
    </div>
  );
}
