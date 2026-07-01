import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !phoneNumber) {
  throw new Error(
    "Missing TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, or TWILIO_PHONE_NUMBER environment variables"
  );
}

const client = twilio(accountSid, authToken);

export async function sendSms(to: string, body: string) {
  return client.messages.create({
    to,
    from: phoneNumber,
    body,
  });
}
