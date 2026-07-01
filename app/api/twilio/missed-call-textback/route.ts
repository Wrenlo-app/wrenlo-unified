import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendSms } from '@/lib/twilio';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const from = String(formData.get('From') || '');
    const to = String(formData.get('To') || '');
    const callStatus = String(formData.get('CallStatus') || '');

    const missedStatuses = ['no-answer', 'busy', 'failed', 'canceled'];

    if (!missedStatuses.includes(callStatus)) {
      return NextResponse.json({ ignored: true, callStatus });
    }

    const { data: business } = await supabaseAdmin
      .from('businesses')
      .select('*')
      .eq('phone_number', to)
      .maybeSingle();

    if (!business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }

    const { data: lead } = await supabaseAdmin
      .from('leads')
      .insert({
        business_id: business.id,
        source: 'missed_call',
        phone: from,
        status: 'textback_sent',
        next_action: 'await_sms_reply',
        classification: 'missed_call',
        estimated_value: 450,
      })
      .select()
      .single();

    const message = `Hi, this is ${business.name}. Sorry we missed your call! Are you looking for AC repair, heating service, maintenance, or an estimate? Reply here and we will get you taken care of. Reply STOP to opt out.`;

    const sms = await sendSms(from, message);

    await supabaseAdmin.from('messages').insert({
      business_id: business.id,
      lead_id: lead?.id,
      direction: 'outbound',
      channel: 'sms',
      to_number: from,
      from_number: to,
      body: message,
      status: 'sent',
    });

    await supabaseAdmin.from('roi_events').insert({
      business_id: business.id,
      lead_id: lead?.id,
      event_type: 'missed_call_textback_sent',
      estimated_value: 450,
      notes: `Missed call recovery attempt. Twilio status: ${callStatus}`,
    });

    return new NextResponse('<Response></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  } catch (err) {
    console.error('Missed call textback error:', err);
    return new NextResponse('<Response></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}