// app/api/admin/businesses/route.ts
//
// Internal-only endpoint for creating and listing businesses during onboarding.
// Protected by a simple allowlist check against ADMIN_EMAILS env var — see
// middleware note in the deployment steps doc. This is intentionally NOT a
// public signup endpoint.

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const CreateBusinessSchema = z.object({
  name: z.string().min(1),
  trade: z.string().min(1),
  owner_name: z.string().min(1),
  owner_phone: z.string().min(7),
  owner_email: z.string().email().optional().or(z.literal('')),
  service_zips: z.array(z.string()).min(1),
  timezone: z.string().default('America/Chicago'),
  booking_mode: z.enum(['owner_approval', 'auto_book']).default('owner_approval'),
  calendar_id: z.string().optional(),
  pilot_start_date: z.string().optional(), // ISO date string
});

export async function POST(req: Request) {
  try {
    const body = CreateBusinessSchema.parse(await req.json());

    const { data, error } = await supabaseAdmin
      .from('businesses')
      .insert({
        name: body.name,
        trade: body.trade,
        owner_name: body.owner_name,
        owner_phone: body.owner_phone,
        owner_email: body.owner_email || null,
        service_zips: body.service_zips,
        timezone: body.timezone,
        booking_mode: body.booking_mode,
        calendar_id: body.calendar_id || null,
        pilot_start_date: body.pilot_start_date || null,
        onboarding_status: 'pending',
      })
      .select('id, name, onboarding_status')
      .single();

    if (error || !data) {
      console.error('Create business error:', error);
      return NextResponse.json(
        { error: 'Failed to create business' },
        { status: 500 }
      );
    }

    return NextResponse.json({ business: data }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: err.issues },
        { status: 400 }
      );
    }
    console.error('Admin create business error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('businesses')
      .select(
        'id, name, trade, owner_name, owner_phone, phone_number, onboarding_status, service_zips, calendar_id, pilot_start_date, created_at'
      )
      .order('created_at', { ascending: false });

    if (error) {
      console.error('List businesses error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch businesses' },
        { status: 500 }
      );
    }

    return NextResponse.json({ businesses: data });
  } catch (err) {
    console.error('Admin list businesses error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
