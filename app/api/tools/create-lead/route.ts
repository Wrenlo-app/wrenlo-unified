import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function getNextAction(urgency?: string) {
  switch (urgency) {
    case "emergency":
      return "Escalate to on-call technician immediately";
    case "urgent":
      return "Offer next available priority appointment";
    default:
      return "Confirm preferred service window";
  }
}

export async function POST(request: Request) {
  const raw = await request.json();
  const body = raw.args ?? raw; // handles Retell "payload: args only" wrapper

  const {
    business_id,
    source,
    name,
    phone,
    address,
    zip_code,
    service_type,
    system_type,
    system_age,
    symptoms,
    urgency,
    classification,
    preferred_window,
    repair_or_replace,
    // ✅ removed: estimated_value and status — these are computed below, not taken from body
    // ✅ removed: ai_confidence — column does not exist in leads table
  } = body;

  if (!business_id || !name || !phone) {
    return NextResponse.json(
      { error: "business_id, name, and phone are required" },
      { status: 400 }
    );
  }

  // ✅ declared once — computed from repair_or_replace, not taken from body
  const estimatedValue = String(repair_or_replace ?? "")
    .toLowerCase()
    .includes("replace")
    ? 3500
    : 450;

  // ✅ declared once — always "new" for a freshly created lead
  const status = "new";

  const nextAction = getNextAction(urgency);

  const { data: lead, error: leadError } = await supabaseAdmin
    .from("leads")
    .insert({
      business_id,
      source,
      name,
      phone,
      address,
      zip_code,
      service_type,
      system_type,
      system_age,
      symptoms,
      urgency,
      classification,
      preferred_window,
      repair_or_replace,
      // ✅ ai_confidence removed — not a column in the leads table
      estimated_value: estimatedValue,
      status,
    })
    .select("id, status")
    .single();

  if (leadError || !lead) {
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }

  const { error: roiError } = await supabaseAdmin.from("roi_events").insert({
    business_id,
    lead_id: lead.id,
    event_type: "lead_captured",
    estimated_value: estimatedValue,
    notes: `Source: ${source ?? "inbound_call"}`,
  });

  if (roiError) {
    return NextResponse.json(
      { error: "Lead created but failed to record ROI event" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    lead_id: lead.id,
    status: lead.status,
    next_action: nextAction,
  });
}
