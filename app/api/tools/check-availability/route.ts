import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getBusySlots } from '@/lib/googleCalendar';

const SLOT_DURATION_MS = 2 * 60 * 60 * 1000; // 2-hour slots
const STEP_MS = 60 * 60 * 1000;              // step in 1-hour increments

type Urgency = 'routine' | 'urgent' | 'emergency';

function getSearchWindow(urgency: Urgency) {
  const now = Date.now();
  if (urgency === 'urgent' || urgency === 'emergency') {
    return {
      timeMin: new Date(now + 2 * 60 * 60 * 1000),
      timeMax: new Date(now + 36 * 60 * 60 * 1000),
    };
  }
  return {
    timeMin: new Date(now + 24 * 60 * 60 * 1000),
    timeMax: new Date(now + 96 * 60 * 60 * 1000),
  };
}

function getHourInTimezone(date: Date, timeZone: string) {
  const hour = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    hour12: false,
  }).format(date);
  return Number(hour);
}

function formatSlotLabel(start: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(start);
}

function overlaps(slotStart: Date, slotEnd: Date, busyStart: Date, busyEnd: Date) {
  return slotStart < busyEnd && slotEnd > busyStart;
}

function isValidTimeZone(timeZone: string) {
  try {
    Intl.DateTimeFormat(undefined, { timeZone });
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  // FIX: Accept business_id so we can look up the right calendar
  const { urgency, timezone, business_id } = body;

  if (!urgency || !timezone) {
    return NextResponse.json(
      { error: 'urgency and timezone are required' },
      { status: 400 }
    );
  }

  if (!isValidTimeZone(String(timezone))) {
    return NextResponse.json({ error: 'Invalid timezone' }, { status: 400 });
  }

  const normalizedUrgency = String(urgency).toLowerCase() as Urgency;
  if (
    normalizedUrgency !== 'routine' &&
    normalizedUrgency !== 'urgent' &&
    normalizedUrgency !== 'emergency'
  ) {
    return NextResponse.json({ error: 'Invalid urgency' }, { status: 400 });
  }

  // FIX: Look up calendar_id from the business record when business_id is provided.
  // Falls back to env var (GOOGLE_CALENDAR_ID) for backward compatibility with MVP single-business setup.
  let calendarId: string | undefined = process.env.GOOGLE_CALENDAR_ID;

  if (business_id) {
    const { data: business } = await supabaseAdmin
      .from('businesses')
      .select('calendar_id, timezone')
      .eq('id', business_id)
      .maybeSingle();

    if (business?.calendar_id) {
      calendarId = business.calendar_id;
    }
  }

  const { timeMin, timeMax } = getSearchWindow(normalizedUrgency);

  let busySlots: { start?: string | null; end?: string | null }[] = [];
  try {
    busySlots = await getBusySlots(
      timeMin.toISOString(),
      timeMax.toISOString(),
      calendarId  // FIX: pass the resolved calendarId to getBusySlots
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to check calendar availability' },
      { status: 500 }
    );
  }

  const busyRanges = busySlots
    .filter((slot) => slot.start && slot.end)
    .map((slot) => ({
      start: new Date(slot.start!),
      end: new Date(slot.end!),
    }));

  const availableSlots: { label: string; start: string; end: string }[] = [];

  for (
    let time = timeMin.getTime();
    time + SLOT_DURATION_MS <= timeMax.getTime() && availableSlots.length < 3;
    time += STEP_MS
  ) {
    const slotStart = new Date(time);
    const slotEnd = new Date(time + SLOT_DURATION_MS);

    const startHour = getHourInTimezone(slotStart, timezone);
    const endHour = getHourInTimezone(slotEnd, timezone);

    // Only offer slots within business hours (8am–6pm)
    if (startHour < 8 || endHour > 18) {
      continue;
    }

    const isBusy = busyRanges.some((busy) =>
      overlaps(slotStart, slotEnd, busy.start, busy.end)
    );

    if (isBusy) {
      continue;
    }

    availableSlots.push({
      label: formatSlotLabel(slotStart, timezone),
      start: slotStart.toISOString(),
      end: slotEnd.toISOString(),
    });
  }

  return NextResponse.json({ slots: availableSlots });
}
