import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendSms } from '@/lib/twilio';

const BodySchema = z.object({
  business_id: z.string(),
  lead_id: z.string().optional(),
  reason: z.string(),
  caller_name: z.string().optional(),
  caller_phone: z.string().optional(),
  summary: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = BodySchema.parse(await req.json());

    const { data: business, error } = await supabaseAdmin
      .from('businesses')
      .select('owner_phone, name')
      .eq('id', body.business_id)
      .single();

    if (error || !business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }

    const message = `URGENT - Wrenlo Alert for ${business.name}
Reason: ${body.reason}
Caller: ${body.caller_name || 'Unknown'} ${body.caller_phone || ''}
Summary: ${body.summary || 'No summary yet'}
Please call back immediately.`;

    await sendSms(business.owner_phone, message);

    if (body.lead_id) {
      await supabaseAdmin
        .from('leads')
        .update({
          status: 'escalated',
          next_action: 'owner_callback',
          updated_at: new Date().toISOString(),
        })
        .eq('id', body.lead_id);
    }

    return NextResponse.json({
      escalated: true,
      message: 'Owner has been notified by SMS.',
    });
  } catch (err) {
    console.error('Escalate owner error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}