import type { Metadata } from "next";
import TradePage from "@/components/marketing/TradePage";
import FAQSchema from "@/components/marketing/FAQSchema";

export const metadata: Metadata = {
  title: "AI Front Desk for Plumbing Contractors | Wrenlo",
  description: "Wrenlo answers missed and after-hours plumbing calls, classifies burst-pipe and water emergencies, and books approved estimates 24/7.",
};

const faqs = [ // ← pulled out into its own variable so it can be reused below
  { q: "How fast does Wrenlo answer a call?", a: "Immediately — Wrenlo picks up missed and after-hours calls in real time, no hold music, no voicemail." },
  { q: "Does Wrenlo replace my scheduling or invoicing tool?", a: "No. Wrenlo is a front-office layer that sits on top of your existing tools (like Jobber or Housecall Pro) and writes leads and bookings back into them." },
  { q: "What happens if a call is a real emergency?", a: "Wrenlo never troubleshoots. No-heat, no-AC, and gas smell calls escalate immediately to the owner, with clear safety guidance to the caller." },
  { q: "Is there a contract?", a: "No. There's a 14-day free pilot, and a $299 setup fee that's credited back to your first month." },
];

export default function PlumbingPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
    <TradePage
      trade="Plumbing"
      statPill="Water emergencies don't wait for business hours"
      heroLine1="Never miss another"
      heroEm="burst-pipe emergency."
      heroSub="Wrenlo answers every missed and after-hours plumbing call, classifies the urgency, and books approved estimates — without replacing your existing tools."
      problems={[
        { num: "01", title: "Emergencies strike any hour", body: "Burst pipes and major leaks happen at 2am just as often as 2pm — and homeowners panic-call immediately.", tag: "× Water damage compounds fast" },
        { num: "02", title: "Routine calls bury the urgent ones", body: "Drain clogs and inspection requests flood the line during business hours, right when a real emergency comes in.", tag: "× Emergency triage needed" },
        { num: "03", title: "Callers don't leave messages", body: "They open Google, call the next plumber, and book with them instead.", tag: "× Caller moves on in minutes" },
        { num: "04", title: "Slow callbacks cost jobs", body: "The first plumber to respond usually wins the job.", tag: "× 90% expect ≤10 min response" },
        { num: "05", title: "You're screening calls mid-job", body: "Every minute on the phone is a minute not spent under the sink.", tag: "× Owner time drain" },
        { num: "06", title: "Ad spend leaks out", body: "Every Google Ad or LSA lead that goes unanswered makes your cost per acquisition harder to justify.", tag: "× CAC rises with every miss" },
      ]}
      transcriptStatus="Incoming call · After hours · 10:52 PM"
      callerName="Homeowner · Austin, TX"
      callerMeta="Mobile · Missed call — forwarded to Wrenlo"
      messages={[
        { who: "ai", text: "Hi, thanks for calling! Everyone's off the clock — what's going on tonight?" },
        { who: "caller", text: "A pipe just burst under my kitchen sink, water is going everywhere." },
        { who: "ai", text: "Got it — if it's safe to reach, turning off your main water shutoff valve can slow this down until help arrives. I'm alerting our on-call plumber right now." },
      ]}
      resultText="Emergency classified · Owner alerted · Dispatch confirmed"
      resultSub="Transcript saved · Est. job value: $650+"
      faqs={faqs}
      />
    </>
  );
}