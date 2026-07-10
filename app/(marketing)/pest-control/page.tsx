import type { Metadata } from "next";
import TradePage from "@/components/marketing/TradePage";

export const metadata: Metadata = {
  title: "AI Front Desk for Pest Control Companies | Wrenlo",
  description: "Wrenlo answers missed and after-hours pest control calls, prioritizes stinging-insect and urgent sightings, and books approved service 24/7.",
};

export default function PestControlPage() {
  return (
    <TradePage
      trade="Pest Control"
      statPill="A pest sighting is an anxiety call — speed wins the job"
      heroLine1="Never miss another"
      heroEm="urgent pest call."
      heroSub="Wrenlo answers every missed and after-hours pest control call, prioritizes urgent sightings, and books approved service — without replacing your existing tools."
      problems={[
        { num: "01", title: "Sightings are urgent, emotional calls", body: "Rodents, wasp nests, and bed bugs create real anxiety — homeowners want same-day help, not a callback tomorrow.", tag: "× High-urgency leads" },
        { num: "02", title: "Stinging insects near entrances are safety concerns", body: "A nest by a door or bus stop needs a fast response, especially with kids around.", tag: "× Safety-adjacent" },
        { num: "03", title: "Callers don't leave messages", body: "They open Google, call the next company, and book same-day service with them instead.", tag: "× Caller moves on in minutes" },
        { num: "04", title: "Slow callbacks cost jobs", body: "The first company to respond usually wins the job.", tag: "× 90% expect ≤10 min response" },
        { num: "05", title: "You're screening calls in the field", body: "Every minute on the phone is a minute not spent treating a property.", tag: "× Owner time drain" },
        { num: "06", title: "Ad spend leaks out", body: "Every Google Ad or LSA lead that goes unanswered makes your cost per acquisition harder to justify.", tag: "× CAC rises with every miss" },
      ]}
      transcriptStatus="Incoming call · Business hours · 4:12 PM"
      callerName="Homeowner · Charlotte, NC"
      callerMeta="Mobile · Missed call — forwarded to Wrenlo"
      messages={[
        { who: "ai", text: "Hi, thanks for calling! What's going on today?" },
        { who: "caller", text: "There's a big wasp nest right by our front door and my kids can't get to the bus stop safely." },
        { who: "ai", text: "That sounds urgent — I'd recommend keeping the kids away from that door for now. I'm getting you booked for same-day service and alerting the team." },
      ]}
      resultText="Priority classified · Owner alerted · Same-day slot held"
      resultSub="Transcript saved · Est. job value: $275+"
      faqs={[
        { q: "How fast does Wrenlo answer a call?", a: "Immediately — Wrenlo picks up missed and after-hours calls in real time, no hold music, no voicemail." },
        { q: "Does Wrenlo replace my scheduling or invoicing tool?", a: "No. Wrenlo is a front-office layer that sits on top of your existing tools and writes leads and bookings back into them." },
        { q: "What happens if a call is a real emergency?", a: "Wrenlo never troubleshoots. Urgent sightings and safety concerns escalate immediately to the owner, with basic safety guidance to the caller." },
        { q: "Is there a contract?", a: "No. There's a 14-day free pilot, and a $299 setup fee that's credited back to your first month." },
      ]}
    />
  );
}