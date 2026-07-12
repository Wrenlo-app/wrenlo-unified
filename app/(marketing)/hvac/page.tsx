import type { Metadata } from "next";
import TradePage from "@/components/marketing/TradePage";
import FAQSchema from "@/components/marketing/FAQSchema";

export const metadata: Metadata = {
  title: "AI Front Desk for HVAC Contractors | Wrenlo",
  description: "Wrenlo answers missed and after-hours HVAC calls, classifies emergencies like no-heat/no-AC, and books approved estimates 24/7.",
};

const faqs = [ // ← pulled out into its own variable so it can be reused below
  { q: "How fast does Wrenlo answer a call?", a: "Immediately — Wrenlo picks up missed and after-hours calls in real time, no hold music, no voicemail." },
  { q: "Does Wrenlo replace my scheduling or invoicing tool?", a: "No. Wrenlo is a front-office layer that sits on top of your existing tools (like Jobber or Housecall Pro) and writes leads and bookings back into them." },
  { q: "What happens if a call is a real emergency?", a: "Wrenlo never troubleshoots. No-heat, no-AC, and gas smell calls escalate immediately to the owner, with clear safety guidance to the caller." },
  { q: "Is there a contract?", a: "No. There's a 14-day free pilot, and a $299 setup fee that's credited back to your first month." },
];

export default function HVACPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
    <TradePage
      trade="HVAC"
      statPill="27% of HVAC calls go unanswered industry-wide"
      heroLine1="Never miss another"
      heroEm="no-heat, no-AC emergency."
      heroSub="Wrenlo answers every missed and after-hours HVAC call, classifies the urgency, and books approved estimates — without replacing your existing tools."
      problems={[
        { num: "01", title: "Emergencies happen after hours", body: "No-heat and no-AC calls spike at night and on weekends. Most homeowners won't call back in the morning.", tag: "× Peak season revenue lost" },
        { num: "02", title: "Maintenance renewals go to voicemail", body: "Seasonal tune-up calls are easy money — and easy to lose when nobody picks up.", tag: "× Recurring revenue lost" },
        { num: "03", title: "Callers don't leave messages", body: "They open Google, call the next HVAC company, and book with them instead.", tag: "× Caller moves on in minutes" },
        { num: "04", title: "Slow callbacks cost jobs", body: "The first contractor to respond usually wins the job.", tag: "× 90% expect ≤10 min response" },
        { num: "05", title: "You're screening calls on the job", body: "Every minute spent on the phone is a minute not spent working.", tag: "× Owner time drain" },
        { num: "06", title: "Ad spend leaks out", body: "Every Google Ad or LSA lead that goes unanswered makes your cost per acquisition harder to justify.", tag: "× CAC rises with every miss" },
      ]}
      transcriptStatus="Incoming call · After hours · 11:14 PM"
      callerName="Homeowner · Denver, CO"
      callerMeta="Mobile · Missed call — forwarded to Wrenlo"
      messages={[
        { who: "ai", text: "Hi, thanks for calling! Everyone's off the clock right now — what's going on?" },
        { who: "caller", text: "Our furnace just stopped. It's 41 outside and my dad who lives with us is on oxygen." },
        { who: "ai", text: "I understand — I'm flagging this as urgent right now and alerting the on-call tech immediately. Can I get your address?" },
      ]}
      resultText="Emergency classified · Owner alerted · 7am slot held"
      resultSub="Transcript saved · Est. job value: $1,200+"
      faqs={faqs}
      />
    </>
  );
}