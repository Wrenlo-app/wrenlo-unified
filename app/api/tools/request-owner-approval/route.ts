import { NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendSms } from '@/lib/twilio';

const BodySchema = z.object({
  business_id: z.string(),
  lead_id: z.string(),
  selected_slot_label: z.string(),
  scheduled_start: z.string(),
  scheduled_end: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = BodySchema.parse(await req.json());
    const token = crypto.randomBytes(16).toString('hex');

    const { data: business, error: bizError } = await supabaseAdmin
      .from('businesses')
      .select('owner_phone, name')
      .eq('id', body.business_id)
      .single();

    if (bizError || !business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }

    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('id', body.lead_id)
      .single();

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    const { error: apptError } = await supabaseAdmin
      .from('appointments')
      .insert({
        business_id: body.business_id,
        lead_id: body.lead_id,
        scheduled_start: body.scheduled_start,
        scheduled_end: body.scheduled_end,
        status: 'pending_owner_approval',
        owner_approval_token: token,
      });

    if (apptError) {
      return NextResponse.json(
        { error: 'Failed to create appointment' },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const approveUrl = `${baseUrl}/api/owner/approve-booking?token=${token}`;
    const rejectUrl = `${baseUrl}/api/owner/reject-booking?token=${token}`;

    const smsMessage = `Wrenlo - Approve booking for ${business.name}?
Customer: ${lead.name || 'Unknown'}
Issue: ${lead.symptoms || 'Not specified'}
Service: ${lead.service_type || 'HVAC'}
ZIP: ${lead.zip_code || 'Not provided'}
Slot: ${body.selected_slot_label}

✅ Approve: ${approveUrl}
❌ Reject: ${rejectUrl}`;

    await sendSms(business.owner_phone, smsMessage);

    await supabaseAdmin
      .from('leads')
      .update({
        status: 'pending_owner_approval',
        next_action: 'owner_approval',
        updated_at: new Date().toISOString(),
      })
      .eq('id', body.lead_id);

    return NextResponse.json({
      approval_requested: true,
      message_for_caller:
        'I have sent this appointment request to the service team for approval. You will receive a confirmation text shortly.',
    });
  } catch (err) {
    console.error('Request owner approval error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}