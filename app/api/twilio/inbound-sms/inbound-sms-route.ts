import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendSms } from '@/lib/twilio';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const from = String(formData.get('From') || '');
    const to = String(formData.get('To') || '');
    const body = String(formData.get('Body') || '').trim();
    const lower = body.toLowerCase();

    // FIX: Look up business FIRST so we can attach business_id to the message record
    const { data: business } = await supabaseAdmin
      .from('businesses')
      .select('*')
      .eq('phone_number', to)
      .maybeSingle();

    // Log the inbound message — now with business_id attached
    await supabaseAdmin.from('messages').insert({
      business_id: business?.id || null, // FIX: was always null before
      direction: 'inbound',
      channel: 'sms',
      from_number: from,
      to_number: to,
      body,
      status: 'received',
    });

    // Handle opt-out before doing anything else
    const optOutKeywords = ['stop', 'unsubscribe', 'cancel', 'end', 'quit'];
    if (optOutKeywords.includes(lower)) {
      return new NextResponse('<Response></Response>', {
        headers: { 'Content-Type': 'text/xml' },
      });
    }

    // Look up most recent lead for this caller
    const { data: existingLead } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('phone', from)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!existingLead) {
      // New contact — send intake prompt and log outbound message
      const replyBody = `Thanks for reaching out! To get you help quickly, could you share: 1) Your ZIP code 2) Whether this is for AC, heating, or maintenance 3) A brief description of the issue. Reply STOP to opt out.`;

      await sendSms(from, replyBody);

      await supabaseAdmin.from('messages').insert({
        business_id: business?.id || null,
        direction: 'outbound',
        channel: 'sms',
        from_number: to,
        to_number: from,
        body: replyBody,
        status: 'sent',
      });
    } else {
      // Existing lead — append SMS to symptoms and acknowledge
      await supabaseAdmin
        .from('leads')
        .update({
          symptoms: existingLead.symptoms
            ? `${existingLead.symptoms}\nCustomer SMS: ${body}`
            : `Customer SMS: ${body}`,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingLead.id);

      const replyBody = `Thanks, we received your message. The service team will review and follow up with you shortly. Reply STOP to opt out.`;

      await sendSms(from, replyBody);

      await supabaseAdmin.from('messages').insert({
        business_id: business?.id || null,
        lead_id: existingLead.id,
        direction: 'outbound',
        channel: 'sms',
        from_number: to,
        to_number: from,
        body: replyBody,
        status: 'sent',
      });
    }

    return new NextResponse('<Response></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  } catch (err) {
    console.error('Inbound SMS error:', err);
    return new NextResponse('<Response></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}
