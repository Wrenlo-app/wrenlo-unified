import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SMS Consent & Messaging Policy — Wrenlo AI",
  description:
    "How Wrenlo collects consent and sends text messages on behalf of home service businesses.",
  robots: "noindex",
};

export default function SmsConsentPage() {
  return (
    <>
      <div className="legal-hero">
        <div className="container">
          <span className="legal-eyebrow">Compliance</span>
          <h1>SMS Consent &amp; Messaging Policy</h1>
          <p>How Wrenlo collects consent and sends text messages on behalf of home service businesses.</p>
        </div>
      </div>

      <div className="legal-body">
        <p className="last-updated">Last updated: June 2026 · Effective date: June 2026</p>

        <h2>1. Overview</h2>
        <p>
          Wrenlo provides an AI-powered front desk and missed-call recovery service for U.S.
          residential home service contractors (each a <strong>&quot;Business&quot;</strong>).
          When a homeowner calls a Business that uses Wrenlo and the call is not immediately
          answered, Wrenlo may send an automated SMS on that Business&apos;s behalf.
        </p>
        <p>
          This page describes exactly how consent is collected, how messages are sent, and how
          recipients can opt out at any time. SMS delivery is powered by Twilio.
        </p>

        <h2>2. How consent is obtained</h2>
        <p>
          Wrenlo uses a <strong>two-step opt-in flow</strong> for all missed-call text-back
          messages. No follow-up messages are sent until the homeowner explicitly replies YES.
        </p>

        <div className="flow-box">
          <div className="flow-step">
            <div className="flow-num">1</div>
            <div className="flow-text">
              <strong>Homeowner initiates contact</strong> — The homeowner calls the
              Business&apos;s phone number. This call is the initiating action. The homeowner
              chose to contact the Business.
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-num">2</div>
            <div className="flow-text">
              <strong>Call is not answered</strong> — The call goes unanswered (missed call,
              after-hours, or engaged line). No conversation occurs.
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-num">3</div>
            <div className="flow-text">
              <strong>Single opt-in SMS is sent</strong> — Within 30 seconds, Wrenlo sends one
              SMS to the caller&apos;s number. This message identifies the Business by name,
              explains the context, and asks for explicit permission before any further contact.
              It includes STOP opt-out instructions.
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-num">4</div>
            <div className="flow-text">
              <strong>Homeowner replies YES</strong> — Only after an explicit YES reply does
              Wrenlo send any further messages. The YES reply timestamp is logged as the consent
              record.
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-num">5</div>
            <div className="flow-text">
              <strong>Service follow-up messages sent</strong> — After consent is confirmed, the
              Business may send transactional messages: appointment confirmation, booking
              details, and service reminders. No marketing or promotional messages are sent.
            </div>
          </div>
        </div>

        <h2>3. Sample messages</h2>

        <p><span className="badge badge-blue">Step 3 — Initial opt-in SMS (sent on missed call)</span></p>
        <div className="sms-sample">
          Hi, this is Demo Comfort HVAC. You called us but we missed you — we&apos;d love to
          help. Reply YES to confirm we can follow up about your HVAC service, or STOP to opt
          out. Msg &amp; data rates may apply.
        </div>

        <p><span className="badge badge-green">Step 5 — Appointment confirmation (sent only after YES reply)</span></p>
        <div className="sms-sample">
          Your HVAC appointment request has been received. Demo Comfort HVAC will confirm your
          window shortly. Reply STOP to opt out.
        </div>

        <p><span className="badge badge-green">Step 5 — Service reminder (sent only after YES reply)</span></p>
        <div className="sms-sample">
          Reminder: Your service appointment with Demo Comfort HVAC is tomorrow, June 27 between
          10am–12pm. Reply STOP to opt out.
        </div>

        <h2>4. Opt-out and help keywords</h2>
        <p>
          Recipients can opt out or request help at any time using the following keywords.
          Responses are immediate and automated.
        </p>

        <div className="keyword-row">
          <div className="keyword-chip">STOP <span>— unsubscribe immediately</span></div>
          <div className="keyword-chip">STOPALL <span>— unsubscribe immediately</span></div>
          <div className="keyword-chip">UNSUBSCRIBE <span>— unsubscribe immediately</span></div>
          <div className="keyword-chip">CANCEL <span>— unsubscribe immediately</span></div>
          <div className="keyword-chip">END <span>— unsubscribe immediately</span></div>
          <div className="keyword-chip">QUIT <span>— unsubscribe immediately</span></div>
          <div className="keyword-chip">HELP <span>— returns contact info</span></div>
          <div className="keyword-chip">INFO <span>— returns contact info</span></div>
          <div className="keyword-chip">YES <span>— confirms opt-in</span></div>
        </div>

        <p>
          Upon receiving a STOP keyword, the recipient&apos;s number is immediately added to a
          suppression list. No further messages are sent from any Business on the Wrenlo
          platform to that number until the recipient re-initiates contact.
        </p>

        <p>Upon receiving a HELP or INFO keyword, the recipient receives:</p>
        <div className="sms-sample">
          Wrenlo: This number sends service updates on behalf of [Business Name]. For help,
          contact hello@wrenlo.co or call the business directly. Reply STOP to unsubscribe.
        </div>

        <h2>5. Message frequency and content</h2>
        <ul>
          <li><strong>Initial opt-in SMS:</strong> 1 message per missed call, only to numbers that called the Business.</li>
          <li><strong>Post-consent transactional messages:</strong> Up to 3–5 messages per service interaction (confirmation, reminder, follow-up).</li>
          <li><strong>No marketing or promotional messages</strong> are sent through this program.</li>
          <li><strong>No third-party sharing:</strong> Phone numbers are never sold or shared with third parties for marketing purposes.</li>
        </ul>

        <h2>6. Pre-call disclosure by the Business</h2>
        <p>
          As part of Wrenlo&apos;s onboarding process, every Business is required to add the
          following disclosure to their Google Business Profile, website, and any digital
          listing where their phone number appears:
        </p>
        <div className="sms-sample">
          Missed calls may receive an automated text follow-up from our service team. Reply YES
          to confirm follow-up or STOP to opt out. Msg &amp; data rates may apply.
        </div>
        <p>
          This disclosure ensures that any homeowner who calls the Business&apos;s number has
          had the opportunity to see that a text follow-up may occur before they place the call.
        </p>

        <h2>7. Consent record-keeping</h2>
        <p>Wrenlo maintains the following records for every SMS interaction:</p>
        <ul>
          <li>Caller phone number and timestamp of the initiating missed call</li>
          <li>Timestamp and content of the initial opt-in SMS sent</li>
          <li>Timestamp and content of the YES reply (consent confirmation)</li>
          <li>All subsequent messages sent and their delivery status</li>
          <li>STOP/opt-out requests and suppression list entries</li>
        </ul>
        <p>These records are retained for a minimum of 4 years and are available to regulatory bodies upon request.</p>

        <h2>8. Regulatory compliance</h2>
        <ul>
          <li>This messaging program complies with the <strong>Telephone Consumer Protection Act (TCPA)</strong>.</li>
          <li>Opt-out requests are honored per <strong>FCC rules effective April 11, 2025</strong> on consent revocation for robocalls and robotexts.</li>
          <li>SMS delivery is provided by <strong>Twilio Inc.</strong> (twilio.com/legal/privacy).</li>
          <li>Messages are sent only from verified toll-free numbers registered under Twilio&apos;s toll-free verification program.</li>
        </ul>

        <h2>9. Contact</h2>
        <p>
          For questions about this messaging program, to request removal from all
          Wrenlo-powered communications, or to report a compliance concern:
        </p>
        <ul>
          <li>Email: <a href="mailto:hello@wrenlo.co">hello@wrenlo.co</a></li>
          <li>Website: <a href="https://www.wrenlo.co">wrenlo.co</a></li>
        </ul>
        <p>A real person will respond within 1 business day.</p>

        <div className="legal-rule" />
        <p style={{ fontSize: 13 }}>
          ← <Link href="/">Back to Wrenlo</Link> &nbsp;·&nbsp; <Link href="/privacy">Privacy Policy</Link>{" "}
          &nbsp;·&nbsp; <Link href="/terms">Terms of Service</Link>
        </p>
      </div>
    </>
  );
}
