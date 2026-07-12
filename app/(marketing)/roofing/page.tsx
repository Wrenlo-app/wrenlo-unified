import type { Metadata } from "next";
import TradePage from "@/components/marketing/TradePage";
import FAQSchema from "@/components/marketing/FAQSchema";

export const metadata: Metadata = {
  title: "AI Front Desk for Roofing Contractors | Wrenlo",
  description: "Wrenlo answers missed and after-hours roofing calls, prioritizes storm-damage emergencies, and books approved inspections 24/7.",
};

const faqs = [ // ← pulled out into its own variable so it can be reused below
  { q: "How fast does Wrenlo answer a call?", a: "Immediately — Wrenlo picks up missed and after-hours calls in real time, no hold music, no voicemail." },
  { q: "Does Wrenlo replace my scheduling or invoicing tool?", a: "No. Wrenlo is a front-office layer that sits on top of your existing tools (like Jobber or Housecall Pro) and writes leads and bookings back into them." },
  { q: "What happens if a call is a real emergency?", a: "Wrenlo never troubleshoots. No-heat, no-AC, and gas smell calls escalate immediately to the owner, with clear safety guidance to the caller." },
  { q: "Is there a contract?", a: "No. There's a 14-day free pilot, and a $299 setup fee that's credited back to your first month." },
];


export default function RoofingPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
    <TradePage
      trade="Roofing"
      statPill="Storm damage calls spike fast — and so does the competition"
      heroLine1="Never miss another"
      heroEm="storm-damage lead."
      heroSub="Wrenlo answers every missed and after-hours roofing call, prioritizes storm-damage emergencies, and books approved inspections — without replacing your existing tools."
      problems={[
        { num: "01", title: "Storms bring a flood of calls at once", body: "Damage calls spike right after severe weather — exactly when your phone is hardest to keep up with.", tag: "× After-hours surge" },
        { num: "02", title: "Insurance-driven leads move fast", body: "Homeowners with an adjuster deadline call several roofers immediately — whoever answers first often wins.", tag: "× Time-sensitive leads" },
        { num: "03", title: "Callers don't leave messages", body: "They open Google, call the next roofer, and book an inspection with them instead.", tag: "× Caller moves on in minutes" },
        { num: "04", title: "Slow callbacks cost jobs", body: "The first roofer to respond usually wins the job.", tag: "× 90% expect ≤10 min response" },
        { num: "05", title: "You're screening calls on the roof", body: "Every minute on the phone is a minute not spent on a job.", tag: "× Owner time drain" },
        { num: "06", title: "Ad spend leaks out", body: "Every Google Ad or LSA lead that goes unanswered makes your cost per acquisition harder to justify.", tag: "× CAC rises with every miss" },
      ]}
      transcriptStatus="Incoming call · After hours · 8:05 AM (post-storm)"
      callerName="Homeowner · Kansas City, MO"
      callerMeta="Mobile · Missed call — forwarded to Wrenlo"
      messages={[
        { who: "ai", text: "Hi, thanks for calling! What's going on with your roof today?" },
        { who: "caller", text: "A tree branch came down in last night's storm and water's coming into my attic." },
        { who: "ai", text: "I'm sorry to hear that — I'm marking this urgent and getting you on today's inspection schedule, and flagging the on-call team now." },
      ]}
      resultText="Emergency classified · Owner alerted · Same-day inspection booked"
      resultSub="Transcript saved · Est. job value: $8,500+"
      faqs={faqs} 
      />
    </>
  );
}