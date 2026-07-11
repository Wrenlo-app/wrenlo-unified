// app/api/retell/inbound-webhook/route.ts
//
// This is what makes multi-tenant dynamic variables actually work. Retell
// calls this URL right when an inbound call arrives (before connecting to
// the agent), and expects a JSON response containing dynamic_variables for
// THAT specific call — this is how the same shared agent knows which
// business it's answering for.
//
// Configure this URL in Retell: Phone Numbers → your number → check
// "Add an inbound webhook" → paste this route's full deployed URL, e.g.
// https://your-vercel-domain.com/api/retell/inbound-webhook
//
// IMPORTANT — verify before trusting this in production:
// The exact field names Retell sends in the POST body (from_number,
// to_number, etc.) are inferred from Retell's documented pattern, not
// independently confirmed here. The console.log below will show you the
// real payload on your first test call — check your Vercel function logs
// after that call and adjust the field access below if the actual shape
// differs from what's assumed here.

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // TEMPORARY — leave this in until you've confirmed the real payload
    // shape from a live test call, then feel free to remove it.
    console.log('Retell inbound webhook payload:', JSON.stringify(body));

    // Retell's docs describe fields grouped for calls; the exact nesting
    // for the inbound event body isn't fully confirmed, so check both a
    // flat shape and a nested "call_inbound" shape defensively.
    const callData = body.call_inbound || body.call || body;
    const toNumber: string | undefined = callData.to_number || callData.to;
    const fromNumber: string | undefined = callData.from_number || callData.from;

    if (!toNumber) {
      console.error('Inbound webhook: no to_number found in payload', body);
      // Fail safe: without a to_number we can't identify the business.
      // Returning a non-2xx here means Retell will retry up to 3 times,
      // which is appropriate — this should not silently proceed with a
      // wrong or missing business.
      return NextResponse.json(
        { error: 'Missing to_number in webhook payload' },
        { status: 400 }
      );
    }

    const { data: business, error } = await supabaseAdmin
      .from('businesses')
      .select('id, name, trade, phone_number')
      .eq('phone_number', toNumber)
      .maybeSingle();

    if (error || !business) {
      console.error(
        'Inbound webhook: no business found for to_number',
        toNumber,
        error
      );
      // No matching business — reject the call rather than route it to
      // a business at random. Retell will use its default agent behavior
      // (or you can add override_agent_id here to point at a "sorry, this
      // number is not configured" fallback agent if you build one later).
      return NextResponse.json(
        { error: `No business configured for number ${toNumber}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      call_inbound: {
        dynamic_variables: {
          business_name: business.name,
          business_id: business.id,
          trade: business.trade,
          owner_escalation_note: '',
        },
      },
    });
  } catch (err) {
    console.error('Retell inbound webhook error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
