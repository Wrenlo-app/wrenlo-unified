import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const call = body.call || body;

    const fromNumber = call.from_number || call.from || '';
    const toNumber = call.to_number || call.to || '';
    const transcript = call.transcript || '';
    const recordingUrl = call.recording_url || null;
    const callId = call.call_id || call.id || '';
    const summary = call.summary || null;
    const durationSeconds = call.duration_seconds || null;

    const { data: business } = await supabaseAdmin
      .from('businesses')
      .select('*')
      .eq('phone_number', toNumber)
      .maybeSingle();

    if (!business) {
      return NextResponse.json(
        { saved: false, reason: 'Business not found for number: ' + toNumber },
        { status: 200 }
      );
    }

    const { data: lead } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('phone', fromNumber)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    await supabaseAdmin.from('calls').insert({
      business_id: business.id,
      lead_id: lead?.id || null,
      from_number: fromNumber,
      to_number: toNumber,
      transcript,
      summary,
      recording_url: recordingUrl,
      classification: lead?.classification || null,
      urgency: lead?.urgency || null,
      action_taken: lead?.next_action || null,
      duration_seconds: durationSeconds,
    });

    return NextResponse.json({ saved: true });
  } catch (err) {
    console.error('Retell post-call webhook error:', err);
    return NextResponse.json(
      { saved: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}