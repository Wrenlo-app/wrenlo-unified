import type { Metadata } from "next";
import TradePage from "@/components/marketing/TradePage";

export const metadata: Metadata = {
  title: "AI Front Desk for Electrical Contractors | Wrenlo",
  description: "Wrenlo answers missed and after-hours electrical calls, flags safety emergencies immediately, and books approved estimates 24/7.",
};

export default function ElectricalPage() {
  return (
    <TradePage
      trade="Electrical"
      statPill="An unanswered electrical emergency is a safety risk, not just a lost job"
      heroLine1="Never miss another"
      heroEm="electrical safety call."
      heroSub="Wrenlo answers every missed and after-hours electrical call, flags safety concerns immediately, and books approved estimates — without replacing your existing tools."
      problems={[
        { num: "01", title: "Safety emergencies can't wait", body: "Sparking outlets, breaker panel smoke, and power loss are urgent — a missed call is a liability, not just lost revenue.", tag: "× Safety-critical" },
        { num: "02", title: "Storms spike call volume overnight", body: "Outages bring a wave of after-hours calls all at once.", tag: "× After-hours surge" },
        { num: "03", title: "Callers don't leave messages", body: "They open Google, call the next electrician, and book with them instead.", tag: "× Caller moves on in minutes" },
        { num: "04", title: "Slow callbacks cost jobs", body: "The first electrician to respond usually wins the job.", tag: "× 90% expect ≤10 min response" },
        { num: "05", title: "You're screening calls on the ladder", body: "Every minute on the phone is a minute not spent on the panel.", tag: "× Owner time drain" },
        { num: "06", title: "Ad spend leaks out", body: "Every Google Ad or LSA lead that goes unanswered makes your cost per acquisition harder to justify.", tag: "× CAC rises with every miss" },
      ]}
      transcriptStatus="Incoming call · After hours · 9:38 PM"
      callerName="Homeowner · Tampa, FL"
      callerMeta="Mobile · Missed call — forwarded to Wrenlo"
      messages={[
        { who: "ai", text: "Hi, thanks for calling! Everyone's off the clock — what's going on tonight?" },
        { who: "caller", text: "There's a burning smell coming from an outlet in my living room." },
        { who: "ai", text: "That's a safety concern — please unplug anything nearby if it's safe to do so and avoid the area. I'm alerting the on-call electrician immediately." },
      ]}
      resultText="Emergency classified · Owner alerted · Same-night callback"
      resultSub="Transcript saved · Est. job value: $450+"
      faqs={[
        { q: "How fast does Wrenlo answer a call?", a: "Immediately — Wrenlo picks up missed and after-hours calls in real time, no hold music, no voicemail." },
        { q: "Does Wrenlo replace my scheduling or invoicing tool?", a: "No. Wrenlo is a front-office layer that sits on top of your existing tools and writes leads and bookings back into them." },
        { q: "What happens if a call is a real emergency?", a: "Wrenlo never troubleshoots. Burning smells, sparking outlets, and power loss escalate immediately to the owner, with basic safety guidance to the caller." },
        { q: "Is there a contract?", a: "No. There's a 14-day free pilot, and a $299 setup fee that's credited back to your first month." },
      ]}
    />
  );
}