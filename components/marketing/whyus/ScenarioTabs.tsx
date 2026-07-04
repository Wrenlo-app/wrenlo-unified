"use client";

import { useState } from "react";

type Step = { icon: string; bold: string; text: string };
type Scenario = {
  id: string;
  tabLabel: string;
  badLabel: string;
  badSteps: Step[];
  badResult: string;
  goodLabel: string;
  goodSteps: Step[];
  goodResult: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "hvac",
    tabLabel: "🌡️ HVAC emergency",
    badLabel: "× Without Wrenlo",
    badSteps: [
      { icon: "📞", bold: "10:47 PM:", text: "Homeowner calls. No AC. 103°F outside. Two kids at home." },
      { icon: "🔇", bold: "10:47 PM:", text: "Voicemail picks up. Generic greeting. Beep." },
      { icon: "📵", bold: "10:47 PM:", text: "Homeowner hangs up without leaving a message." },
      { icon: "📱", bold: "10:48 PM:", text: "Homeowner opens Google. Calls next contractor." },
      { icon: "✓", bold: "10:52 PM:", text: "Competitor answers, books the job. $1,800 service call gone." },
    ],
    badResult: "✗ Revenue lost: ~$1,800+ · Caller never returns",
    goodLabel: "✓ With Wrenlo",
    goodSteps: [
      { icon: "📞", bold: "10:47 PM:", text: "Homeowner calls. No AC. 103°F outside. Two kids at home." },
      { icon: "🤖", bold: "10:47 PM:", text: "Wrenlo answers in 2 seconds. \"Hi, I'm the team's AI assistant — everyone's on jobs. What's going on today?\"" },
      { icon: "🚨", bold: "10:48 PM:", text: "Emergency classified. Address, system age, and urgency captured. Owner alerted by text with full transcript." },
      { icon: "📅", bold: "10:48 PM:", text: "Priority 8am slot held. Confirmation SMS sent to homeowner." },
      { icon: "💰", bold: "Next morning:", text: "Technician shows up. $1,800 service call + potential replacement upsell." },
    ],
    goodResult: "✓ Revenue captured: $1,800+ · Owner slept through it",
  },
  {
    id: "pipe",
    tabLabel: "🔧 Burst pipe",
    badLabel: "× Without Wrenlo",
    badSteps: [
      { icon: "💧", bold: "Saturday 7am:", text: "Homeowner has a burst pipe under the kitchen sink. Water everywhere." },
      { icon: "📵", bold: "7:01 AM:", text: "Calls. Gets voicemail. Panics and hangs up." },
      { icon: "🔍", bold: "7:02 AM:", text: "Searches \"emergency plumber near me.\" Calls three more companies." },
      { icon: "📞", bold: "7:06 AM:", text: "The third company answers. Books the job." },
    ],
    badResult: "✗ Emergency job lost · Ad spend wasted · CAC unrecovered",
    goodLabel: "✓ With Wrenlo",
    goodSteps: [
      { icon: "💧", bold: "Saturday 7am:", text: "Homeowner has a burst pipe. Water everywhere." },
      { icon: "🤖", bold: "7:01 AM:", text: "Wrenlo answers instantly. Confirms active water, asks if main shutoff is accessible." },
      { icon: "🚨", bold: "7:01 AM:", text: "Emergency flagged. Owner gets a text: \"Burst pipe — active water — 123 Main St — caller still on.\"" },
      { icon: "📅", bold: "7:02 AM:", text: "Owner dispatches. Homeowner stays on the line with Wrenlo for safety instructions until tech arrives." },
    ],
    goodResult: "✓ Emergency captured · Owner made one decision · $800+ job won",
  },
  {
    id: "estimate",
    tabLabel: "🏠 Roofing estimate",
    badLabel: "× Without Wrenlo",
    badSteps: [
      { icon: "🏠", bold: "Tuesday 2pm:", text: "Homeowner calls for a roofing estimate after a storm. Owner is on another roof." },
      { icon: "📵", bold: "2:01 PM:", text: "Voicemail. Homeowner leaves a 20-second message: \"Uh, looking for a quote on my roof. Call me back.\"" },
      { icon: "⏰", bold: "6:30 PM:", text: "Owner gets home, listens to voicemail, calls back. No answer." },
      { icon: "😤", bold: "Next week:", text: "Homeowner already booked with a competitor who called back within the hour." },
    ],
    badResult: "✗ $8,000+ roofing job lost · Lead follow-up failed",
    goodLabel: "✓ With Wrenlo",
    goodSteps: [
      { icon: "🏠", bold: "Tuesday 2pm:", text: "Homeowner calls for a roofing estimate after a storm." },
      { icon: "🤖", bold: "2:01 PM:", text: "Wrenlo answers. Captures address, roof age, material, storm date, insurance claim status, and photo request." },
      { icon: "📅", bold: "2:03 PM:", text: "Estimate appointment booked for Thursday 10am. Confirmation SMS sent with what to expect." },
      { icon: "📊", bold: "2:03 PM:", text: "Lead shows in dashboard: \"Roofing estimate · Storm damage · $6,000–$12,000 est. value · Thursday 10am confirmed.\"" },
    ],
    goodResult: "✓ $8,000+ estimate booked · Owner never interrupted",
  },
  {
    id: "busy",
    tabLabel: "📱 Owner on a job",
    badLabel: "× Without Wrenlo",
    badSteps: [
      { icon: "🔨", bold: "Friday 11am:", text: "Owner is mid-install. Phone rings — Google Ads lead. Can't answer." },
      { icon: "📵", bold: "11:02 AM:", text: "Voicemail. Caller doesn't leave one — they never do." },
      { icon: "💸", bold: "11:02 AM:", text: "$35 Google Ad click. No callback number. No name. No job. Just a missed call." },
    ],
    badResult: "✗ Ad spend wasted · CAC climbs · No lead recovered",
    goodLabel: "✓ With Wrenlo",
    goodSteps: [
      { icon: "🔨", bold: "Friday 11am:", text: "Owner is mid-install. Phone rings — Google Ads lead. Can't answer." },
      { icon: "📲", bold: "11:00 AM:", text: "Wrenlo texts the caller within 30 seconds: \"Hi, this is [Business Name]'s team — sorry we missed you! What can we help with?\"" },
      { icon: "💬", bold: "11:01 AM:", text: "Caller replies. Wrenlo qualifies over SMS. Captures job type, address, urgency." },
      { icon: "📅", bold: "11:03 AM:", text: "Service appointment booked. Owner gets a summary at end of day." },
    ],
    goodResult: "✓ Lead saved · Owner stayed on the job · $0 extra ad spend",
  },
];

export default function ScenarioTabs() {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id);
  const active = SCENARIOS.find((s) => s.id === activeId)!;

  return (
    <>
      <div className="scenario-tabs">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            className={`stab${s.id === activeId ? " active" : ""}`}
            onClick={() => setActiveId(s.id)}
          >
            {s.tabLabel}
          </button>
        ))}
      </div>

      <div className="scenario-panel active">
        <div className="scenario-left">
          <div className="scenario-label bad">{active.badLabel}</div>
          {active.badSteps.map((step, i) => (
            <div className="scenario-step" key={i}>
              <div className="scenario-step-icon">{step.icon}</div>
              <p>
                <strong>{step.bold}</strong> {step.text}
              </p>
            </div>
          ))}
          <div className="scenario-result result-bad">{active.badResult}</div>
        </div>
        <div className="scenario-right">
          <div className="scenario-label good">{active.goodLabel}</div>
          {active.goodSteps.map((step, i) => (
            <div className="scenario-step" key={i}>
              <div className="scenario-step-icon">{step.icon}</div>
              <p>
                <strong>{step.bold}</strong> {step.text}
              </p>
            </div>
          ))}
          <div className="scenario-result result-good">{active.goodResult}</div>
        </div>
      </div>
    </>
  );
}
