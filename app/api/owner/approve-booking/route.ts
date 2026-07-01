import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { createCalendarEvent } from '@/lib/googleCalendar';
import { sendSms } from '@/lib/twilio';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return new NextResponse('Missing token', { status: 400 });
    }

    const { data: appointment, error } = await supabaseAdmin
      .from('appointments')
      .select(`
        *,
        leads (*),
        businesses (*)
      `)
      .eq('owner_approval_token', token)
      .single();

    if (error || !appointment) {
      return new NextResponse('Invalid or expired token', { status: 404 });
    }

    if (appointment.status === 'booked') {
      return new NextResponse('This booking has already been approved.', {
        status: 200,
      });
    }

    const lead = appointment.leads;
    const business = appointment.businesses;

    const calendarEvent = await createCalendarEvent({
      summary: `${lead.service_type || 'HVAC Service'} - ${lead.name || 'Customer'}`,
      description: `
Customer: ${lead.name || 'Unknown'}
Phone: ${lead.phone || 'Not provided'}
Address: ${lead.address || 'Not provided'}
ZIP: ${lead.zip_code || 'Not provided'}
Symptoms: ${lead.symptoms || 'Not provided'}
Urgency: ${lead.urgency || 'routine'}
System Type: ${lead.system_type || 'Unknown'}
System Age: ${lead.system_age || 'Unknown'}
Source: Wrenlo AI
      `.trim(),
      start: appointment.scheduled_start,
      end: appointment.scheduled_end,
      attendeeEmail: lead.email || undefined,
    });

    await supabaseAdmin
      .from('appointments')
      .update({
        status: 'booked',
        calendar_event_id: calendarEvent.id,
      })
      .eq('id', appointment.id);

    await supabaseAdmin
      .from('leads')
      .update({
        status: 'booked',
        next_action: 'send_confirmation',
        updated_at: new Date().toISOString(),
      })
      .eq('id', lead.id);

    if (lead.phone) {
      const scheduledTime = new Date(
        appointment.scheduled_start
      ).toLocaleString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZone: business.timezone || 'America/Chicago',
      });

      await sendSms(
        lead.phone,
        `Hi ${lead.name || 'there'}, your appointment with ${business.name} has been confirmed for ${scheduledTime}. Reply STOP to opt out.`
      );
    }

    await supabaseAdmin.from('roi_events').insert({
      business_id: business.id,
      lead_id: lead.id,
      event_type: 'appointment_booked',
      estimated_value: lead.estimated_value || 450,
      notes: 'Owner approved booking via SMS link',
    });

    return new NextResponse(
      `✅ Booking confirmed for ${lead.name || 'customer'} on ${new Date(appointment.scheduled_start).toLocaleString()}. Calendar event created and customer notified by SMS.`,
      { status: 200 }
    );
  } catch (err) {
    console.error('Approve booking error:', err);
    return new NextResponse('Something went wrong. Please try again.', {
      status: 500,
    });
  }
}