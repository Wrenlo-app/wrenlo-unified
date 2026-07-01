import { NextResponse } from "next/server";

// ─── EMERGENCY KEYWORDS ────────────────────────────────────────────────────
// Any match here = immediate emergency, owner escalated, no booking offered
const IMMEDIATE_EMERGENCY_KEYWORDS = [
  {
    keyword: "gas",
    safetyInstruction:
      "If you smell gas, leave the area immediately, avoid flames or electrical switches, and call your gas utility or 911.",
  },
  {
    keyword: "gas smell",
    safetyInstruction:
      "Leave the area immediately, avoid flames or electrical switches, and call your gas utility or 911.",
  },
  {
    keyword: "carbon monoxide",
    safetyInstruction:
      "Leave the building immediately, get fresh air, and call 911.",
  },
  {
    keyword: "co alarm",
    safetyInstruction:
      "Leave the building immediately, get fresh air, and call 911.",
  },
  {
    keyword: "burning smell",
    safetyInstruction:
      "Leave the area, avoid using affected equipment, and call 911 if the smell is strong or persistent.",
  },
  {
    keyword: "something burning",
    safetyInstruction:
      "Leave the area and avoid using the equipment until it has been inspected.",
  },
  {
    keyword: "sparks",
    safetyInstruction:
      "Turn off the affected equipment if safe to do so and do not use it until inspected.",
  },
  {
    keyword: "smoke",
    safetyInstruction:
      "Leave the area immediately and call 911 if you see or smell smoke.",
  },
  {
    keyword: "electrical",
    safetyInstruction:
      "Do not touch the unit. Turn off the breaker if safe to do so and do not use the system until inspected.",
  },
  {
    keyword: "fire",
    safetyInstruction:
      "Leave immediately and call 911.",
  },
] as const;

// ─── URGENT KEYWORDS ───────────────────────────────────────────────────────
// Match here = urgent but not emergency (unless combined with elderly/medical/extreme temp)
const URGENT_KEYWORDS = [
  "no heat",
  "no ac",
  "not cooling",
  "not heating",
  "ac out",
  "heat out",
  "stopped working",
  "completely out",
  "not working at all",
  "broken down",
  "unit died",
  "system down",
] as const;

// ─── MAINTENANCE KEYWORDS ──────────────────────────────────────────────────
// Match here = scheduled maintenance, no urgency
const MAINTENANCE_KEYWORDS = [
  "tune up",
  "tune-up",
  "annual",
  "maintenance",
  "service plan",
  "check up",
  "checkup",
  "seasonal",
  "spring check",
  "fall check",
  "filter change",
  "filter replacement",
  "inspection",
  "preventive",
  "preventative",
] as const;

// ─── REPLACEMENT / ESTIMATE KEYWORDS ──────────────────────────────────────
// Match here = replacement estimate, high value lead
const REPLACEMENT_KEYWORDS = [
  "replace",
  "replacement",
  "new unit",
  "new system",
  "new ac",
  "new furnace",
  "upgrade",
  "quote",
  "estimate",
  "how much would",
  "cost to replace",
  "years old",
  "old unit",
  "old system",
] as const;

type Urgency = "emergency" | "urgent" | "repair" | "maintenance" | "replacement";

// ─── HELPERS ───────────────────────────────────────────────────────────────

function matchEmergencyKeywords(description: string) {
  const lower = description.toLowerCase();
  return IMMEDIATE_EMERGENCY_KEYWORDS.filter(({ keyword }) =>
    lower.includes(keyword)
  );
}

function matchesAny(description: string, keywords: readonly string[]): boolean {
  const lower = description.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

function classifyUrgency(
  description: string,
  emergencyMatches: typeof IMMEDIATE_EMERGENCY_KEYWORDS[number][],
  hasElderlyInfantOrMedical: boolean,
  outdoorTempExtreme: boolean
): Urgency {
  // 1. Immediate emergency — safety risk keywords
  if (emergencyMatches.length > 0) {
    return "emergency";
  }

  // 2. Urgent — system completely out + vulnerable person or extreme temp = emergency
  const isUrgentMatch = matchesAny(description, URGENT_KEYWORDS);
  if (isUrgentMatch && (hasElderlyInfantOrMedical || outdoorTempExtreme)) {
    return "emergency";
  }
  if (isUrgentMatch) {
    return "urgent";
  }

  // 3. Replacement estimate
  if (matchesAny(description, REPLACEMENT_KEYWORDS)) {
    return "replacement";
  }

  // 4. Maintenance
  if (matchesAny(description, MAINTENANCE_KEYWORDS)) {
    return "maintenance";
  }

  // 5. Default — generic repair (AC running but not cooling well, strange noise, etc.)
  return "repair";
}

function getSafetyInstruction(
  urgency: Urgency,
  emergencyMatches: typeof IMMEDIATE_EMERGENCY_KEYWORDS[number][]
): string {
  if (emergencyMatches.length > 0) {
    return emergencyMatches
      .map(({ safetyInstruction }) => safetyInstruction)
      .join(" ");
  }
  if (urgency === "urgent") {
    return "Monitor the situation closely. If anyone in the home feels unwell, move to a comfortable environment and seek help.";
  }
  return "No immediate safety action required.";
}

// ─── ROUTE ─────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const body = await request.json();

  const {
    issue_description,
    has_elderly_infant_or_medical,
    outdoor_temp_extreme,
  } = body;

  if (!issue_description) {
    return NextResponse.json(
      { error: "issue_description is required" },
      { status: 400 }
    );
  }

  const description = String(issue_description);
  const hasElderlyInfantOrMedical = Boolean(has_elderly_infant_or_medical);
  const outdoorTempExtreme = Boolean(outdoor_temp_extreme);

  const emergencyMatches = matchEmergencyKeywords(description);
  const urgency = classifyUrgency(
    description,
    emergencyMatches,
    hasElderlyInfantOrMedical,
    outdoorTempExtreme
  );

  const safetyInstruction = getSafetyInstruction(urgency, emergencyMatches);

  return NextResponse.json({
    urgency,                                          // emergency | urgent | repair | maintenance | replacement
    should_escalate: urgency === "emergency",         // ✅ fixed — true only for real emergencies
    matched_keywords: emergencyMatches.map(({ keyword }) => keyword),
    safety_instruction: safetyInstruction,
  });
}
