import type { Metadata } from "next";
import TradePage from "@/components/marketing/TradePage";
import FAQSchema from "@/components/marketing/FAQSchema";

export const metadata: Metadata = {
  title: "AI Front Desk for Garage Door Contractors | Wrenlo",
  description: "Wrenlo answers missed and after-hours garage door calls, prioritizes stuck-door and security emergencies, and books approved repairs 24/7.",
};

const faqs = [ // ← pulled out into its own variable so it can be reused below
  { q: "How fast does Wrenlo answer a call?", a: "Immediately — Wrenlo picks up missed and after-hours calls in real time, no hold music, no voicemail." },
  { q: "Does Wrenlo replace my scheduling or invoicing tool?", a: "No. Wrenlo is a front-office layer that sits on top of your existing tools (like Jobber or Housecall Pro) and writes leads and bookings back into them." },
  { q: "What happens if a call is a real emergency?", a: "Wrenlo never troubleshoots. No-heat, no-AC, and gas smell calls escalate immediately to the owner, with clear safety guidance to the caller." },
  { q: "Is there a contract?", a: "No. There's a 14-day free pilot, and a $299 setup fee that's credited back to your first month." },
];

export default function GarageDoorPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
    <TradePage
      trade="Garage Door"
      statPill="A stuck door is a security problem, not just an inconvenience"
      heroLine1="Never miss another"
      heroEm="stuck-door emergency."
      heroSub="Wrenlo answers every missed and after-hours garage door call, prioritizes security and safety concerns, and books approved repairs — without replacing your existing tools."
      problems={[
        { num: "01", title: "Stuck doors are urgent for homeowners", body: "A door that won't open or close is both a security risk and a locked-in-or-out problem — people call immediately.", tag: "× Security-critical" },
        { num: "02", title: "Emergencies happen evenings and weekends", body: "Springs and openers tend to fail at the worst possible time.", tag: "× After-hours calls" },
        { num: "03", title: "Callers don't leave messages", body: "They open Google, call the next company, and book same-day service with them instead.", tag: "× Caller moves on in minutes" },
        { num: "04", title: "Slow callbacks cost jobs", body: "The first company to respond usually wins the job.", tag: "× 90% expect ≤10 min response" },
        { num: "05", title: "You're screening calls mid-install", body: "Every minute on the phone is a minute not spent on the job.", tag: "× Owner time drain" },
        { num: "06", title: "Ad spend leaks out", body: "Every Google Ad or LSA lead that goes unanswered makes your cost per acquisition harder to justify.", tag: "× CAC rises with every miss" },
      ]}
      transcriptStatus="Incoming call · After hours · 7:20 PM"
      callerName="Homeowner · Columbus, OH"
      callerMeta="Mobile · Missed call — forwarded to Wrenlo"
      messages={[
        { who: "ai", text: "Hi, thanks for calling! What's going on with your garage door tonight?" },
        { who: "caller", text: "It won't close all the way and my kids are home alone — I'm worried about security." },
        { who: "ai", text: "I understand the concern — I'm flagging this as a priority and getting the on-call tech to you as soon as possible tonight." },
      ]}
      resultText="Priority classified · Owner alerted · Same-night slot held"
      resultSub="Transcript saved · Est. job value: $350+"
      faqs={faqs}
      />
    </>
  );
}