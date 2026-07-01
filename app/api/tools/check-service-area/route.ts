import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  const body = await request.json();
  const { business_id, zip_code } = body;

  if (!business_id || !zip_code) {
    return NextResponse.json(
      { error: "business_id and zip_code are required" },
      { status: 400 }
    );
  }

  const normalizedZip = String(zip_code).trim();

  const { data: business, error } = await supabaseAdmin
    .from("businesses")
    .select("service_zips, blocked_zips")
    .eq("id", business_id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({
        in_service_area: false,
        reason: "Business not found",
      });
    }

    return NextResponse.json(
      { error: "Failed to fetch business" },
      { status: 500 }
    );
  }

  const blockedZips = (business.blocked_zips ?? []).map(String);
  const serviceZips = (business.service_zips ?? []).map(String);

  if (blockedZips.includes(normalizedZip)) {
    return NextResponse.json({
      in_service_area: false,
      reason: "Zip code is blocked",
    });
  }

  if (serviceZips.length > 0 && !serviceZips.includes(normalizedZip)) {
    return NextResponse.json({
      in_service_area: false,
      reason: "Zip code not in service area",
    });
  }

  return NextResponse.json({
    in_service_area: true,
    reason: "Zip code is in service area",
  });
}
