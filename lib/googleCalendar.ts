import { google } from "googleapis";

const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

// Module-level default — used when no calendarId is passed in
const defaultCalendarId = process.env.GOOGLE_CALENDAR_ID ?? "primary";

if (!serviceAccountEmail || !privateKey) {
  throw new Error(
    "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY environment variables"
  );
}

const auth = new google.auth.JWT({
  email: serviceAccountEmail,
  key: privateKey,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({ version: "v3", auth });

// FIX: accepts optional calendarId — falls back to env var for single-business MVP
export async function getBusySlots(
  timeMin: string,
  timeMax: string,
  calendarId: string = defaultCalendarId  // ✅ optional third param
) {
  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      items: [{ id: calendarId }],
    },
  });
  return response.data.calendars?.[calendarId]?.busy ?? [];
}

export async function createCalendarEvent({
  summary,
  description,
  start,
  end,
  attendeeEmail,
  calendarId = defaultCalendarId, // ✅ also accepts optional calendarId for future multi-business use
}: {
  summary: string;
  description: string;
  start: string;
  end: string;
  attendeeEmail: string;
  calendarId?: string;
}) {
  const response = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary,
      description,
      start: { dateTime: start },
      end: { dateTime: end },
      attendees: [{ email: attendeeEmail }],
    },
  });
  return response.data;
}
