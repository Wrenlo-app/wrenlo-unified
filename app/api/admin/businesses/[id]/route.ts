// app/api/admin/businesses/[id]/route.ts
//
// Updates a business record as onboarding progresses — e.g. after you've
// bought the Twilio number, connected the calendar, or run the test call
// suite. Kept separate from the create route so the form can be a simple
// multi-step checklist rather than one giant submit.

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const UpdateBusinessSchema = z.object({
  phone_number: z.string().optional(),
  calendar_id: z.string().optional(),
  blocked_zips: z.array(z.string()).optional(),
  opening_line_override: z.string().optional(),
  onboarding_status: z
    .enum(['pending', 'configured', 'test_calls_passed', 'live', 'paused'])
    .optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = UpdateBusinessSchema.parse(await req.json());

    const updates: Record<string, unknown> = { ...body };
    if (body.onboarding_status === 'live') {
      updates.onboarded_at = new Date().toISOString();
    }

    const { data, error } = await supabaseAdmin
      .from('businesses')
      .update(updates)
      .eq('id', id)
      .select('id, name, onboarding_status, phone_number, calendar_id')
      .single();

    if (error || !data) {
      console.error('Update business error:', error);
      return NextResponse.json(
        { error: 'Failed to update business' },
        { status: 500 }
      );
    }

    return NextResponse.json({ business: data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: err.issues },
        { status: 400 }
      );
    }
    console.error('Admin update business error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}