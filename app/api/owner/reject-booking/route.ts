import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return new NextResponse('Missing token', { status: 400 });
    }

    const { data: appointment, error } = await supabaseAdmin
      .from('appointments')
      .select('*, leads(*)')
      .eq('owner_approval_token', token)
      .single();

    if (error || !appointment) {
      return new NextResponse('Invalid or expired token', { status: 404 });
    }

    if (appointment.status === 'rejected') {
      return new NextResponse('This booking has already been rejected.', {
        status: 200,
      });
    }

    await supabaseAdmin
      .from('appointments')
      .update({ status: 'rejected' })
      .eq('id', appointment.id);

    await supabaseAdmin
      .from('leads')
      .update({
        status: 'owner_rejected',
        next_action: 'manual_callback',
        updated_at: new Date().toISOString(),
      })
      .eq('id', appointment.lead_id);

    return new NextResponse(
      `❌ Booking rejected. Lead marked for manual callback.`,
      { status: 200 }
    );
  } catch (err) {
    console.error('Reject booking error:', err);
    return new NextResponse('Something went wrong. Please try again.', {
      status: 500,
    });
  }
}