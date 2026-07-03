"use client";

import { useState } from "react";

const SUPABASE_URL = "https://lihkrrmmtzoqjxthewzr.supabase.co";
const SUPABASE_KEY = "sb_publishable_gSalxqCkFI3UwoPVIWvyJw_pyH4slR8";

const TRADES = [
  "HVAC", "Plumbing", "Electrical", "Roofing", "Garage Door", "Pest Control",
  "Landscaping", "Cleaning / Janitorial", "Appliance Repair", "Other",
];
const TEAM_SIZES = ["Just me (solo)", "2–5 people", "6–15 people", "16+ people"];
const REVENUE_BANDS = ["Under $250K", "$250K–$500K", "$500K–$1M", "$1M–$3M", "$3M+"];
const CALL_VOLUMES = ["Under 10", "10–25", "25–50", "50–100", "100+"];
const WHO_ANSWERS = [
  "I do (owner)", "Office manager / admin", "Answering service",
  "Goes to voicemail", "Spouse / family member", "Mix of the above",
];
const FSM_TOOLS = [
  "Jobber", "Housecall Pro", "ServiceTitan", "Workiz", "FieldEdge",
  "QuickBooks", "Google Calendar only", "Spreadsheet / paper", "Other",
];

const MISS_OPTIONS = [
  { value: "voicemail", label: "They leave voicemail, I call back" },
  { value: "hang", label: "They hang up — I have no idea who called" },
  { value: "competitor", label: "They probably call the next contractor" },
  { value: "text", label: "They text me instead" },
];
const PAIN_OPTIONS = [
  { value: "missed", label: "Missing calls while on jobs" },
  { value: "afterhours", label: "No coverage after hours / weekends" },
  { value: "followup", label: "Slow follow-up on leads" },
  { value: "qualify", label: "Unqualified calls wasting my time" },
  { value: "scheduling", label: "Booking appointments manually" },
];
const PILOT_OPTIONS = [
  { value: "yes", label: "Yes — tell me more" },
  { value: "maybe", label: "Maybe — depends on price" },
  { value: "no", label: "Not right now" },
];

// Loose international check: optional leading +, then at least 7 digits,
// allowing spaces/dashes/parens/dots as separators. Not locked to US format.
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type TextField =
  | "name" | "lname" | "biz" | "email" | "phone" | "trade" | "size"
  | "state" | "revenue" | "calls" | "who" | "fsm";

const FIELD_LABELS: Record<TextField, string> = {
  name: "First name",
  lname: "Last name",
  biz: "Business name",
  email: "Email address",
  phone: "Phone number",
  trade: "Primary trade",
  size: "Team size",
  state: "State",
  revenue: "Annual revenue",
  calls: "Weekly inbound calls",
  who: "Who answers your calls",
  fsm: "Scheduling / FSM tool",
};

function RadioGroup({
  name,
  options,
  value,
  onChange,
  error,
}: {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div className={`radio-group${error ? " has-error" : ""}`}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`radio-opt${value === opt.value ? " selected" : ""}`}
            onClick={() => onChange(opt.value)}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              readOnly
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error && <div className="field-error-msg">{error}</div>}
    </div>
  );
}

export default function SurveyForm() {
  const [fields, setFields] = useState<Record<TextField, string>>({
    name: "", lname: "", biz: "", email: "", phone: "", trade: "", size: "",
    state: "", revenue: "", calls: "", who: "", fsm: "",
  });
  const [miss, setMiss] = useState("");
  const [pain, setPain] = useState("");
  const [pilot, setPilot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<TextField | "miss" | "pain" | "pilot", string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [topError, setTopError] = useState("");

  function update(key: TextField, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: typeof errors = {};

    (Object.keys(FIELD_LABELS) as TextField[]).forEach((key) => {
      if (!fields[key].trim()) {
        next[key] = `${FIELD_LABELS[key]} is required`;
      }
    });

    if (fields.email.trim() && !EMAIL_RE.test(fields.email.trim())) {
      next.email = "Enter a valid email address (e.g. name@company.com)";
    }
    if (fields.phone.trim() && !PHONE_RE.test(fields.phone.trim())) {
      next.phone = "Enter a valid phone number";
    } else if (fields.phone.trim()) {
      const digitCount = fields.phone.replace(/\D/g, "").length;
      if (digitCount < 7) next.phone = "Phone number is too short";
    }

    if (!miss) next.miss = "Please choose an option";
    if (!pain) next.pain = "Please choose an option";
    if (!pilot) next.pilot = "Please choose an option";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    setTopError("");
    if (!validate()) {
      setTopError("Please complete all required fields before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/survey_responses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: `${fields.name} ${fields.lname}`.trim(),
          email: fields.email.trim(),
          business_name: fields.biz.trim(),
          phone: fields.phone.trim(),
          trade: fields.trade,
          team_size: fields.size,
          state: fields.state.trim(),
          annual_revenue: fields.revenue,
          weekly_calls: fields.calls,
          who_answers: fields.who,
          fsm_tool: fields.fsm,
          missed_call_outcome: miss,
          biggest_pain: pain,
          pilot_interest: pilot,
          source: "survey_page",
        }),
      });

      if (!res.ok) throw new Error(`Insert failed: ${res.status}`);

      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "survey_submit", {
          trade: fields.trade,
          pilot_interest: pilot,
        });
      }

      setSubmitted(true);
    } catch (e) {
      console.error("Survey save failed", e);
      setTopError("Something went wrong — please try again");
    } finally {
      setSubmitting(false);
    }
  }

  function fieldClass(key: TextField) {
    return `form-field${errors[key] ? " has-error" : ""}`;
  }

  return (
    <div className="survey-form-card" id="surveyFormWrap">
      <div className="form-title">Your details</div>
      <div className="form-subtitle">Start here — takes 5 minutes. All fields required.</div>

      {!submitted ? (
        <>
          <div className="form-section-title">About you</div>
          <div className="form-row">
            <div className={fieldClass("name")}>
              <label className="form-label">
                First name<span className="required-mark">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Mike"
                value={fields.name}
                onChange={(e) => update("name", e.target.value)}
              />
              {errors.name && <div className="field-error-msg">{errors.name}</div>}
            </div>
            <div className={fieldClass("lname")}>
              <label className="form-label">
                Last name<span className="required-mark">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Johnson"
                value={fields.lname}
                onChange={(e) => update("lname", e.target.value)}
              />
              {errors.lname && <div className="field-error-msg">{errors.lname}</div>}
            </div>
          </div>
          <div className={fieldClass("biz")}>
            <label className="form-label">
              Business name<span className="required-mark">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Johnson HVAC Services"
              value={fields.biz}
              onChange={(e) => update("biz", e.target.value)}
            />
            {errors.biz && <div className="field-error-msg">{errors.biz}</div>}
          </div>
          <div className={fieldClass("email")}>
            <label className="form-label">
              Email address<span className="required-mark">*</span>
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="mike@johnsonhvac.com"
              value={fields.email}
              onChange={(e) => update("email", e.target.value)}
            />
            {errors.email && <div className="field-error-msg">{errors.email}</div>}
          </div>
          <div className={fieldClass("phone")}>
            <label className="form-label">
              Phone number<span className="required-mark">*</span>
            </label>
            <input
              type="tel"
              className="form-input"
              placeholder="+1 512 555 0100"
              value={fields.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
            {errors.phone && <div className="field-error-msg">{errors.phone}</div>}
          </div>

          <div className="form-section-title">Your business</div>
          <div className="form-row">
            <div className={fieldClass("trade")}>
              <label className="form-label">
                Primary trade<span className="required-mark">*</span>
              </label>
              <select
                className="form-select"
                value={fields.trade}
                onChange={(e) => update("trade", e.target.value)}
              >
                <option value="">Select…</option>
                {TRADES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              {errors.trade && <div className="field-error-msg">{errors.trade}</div>}
            </div>
            <div className={fieldClass("size")}>
              <label className="form-label">
                Team size<span className="required-mark">*</span>
              </label>
              <select
                className="form-select"
                value={fields.size}
                onChange={(e) => update("size", e.target.value)}
              >
                <option value="">Select…</option>
                {TEAM_SIZES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              {errors.size && <div className="field-error-msg">{errors.size}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className={fieldClass("state")}>
              <label className="form-label">
                State<span className="required-mark">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="TX"
                maxLength={2}
                value={fields.state}
                onChange={(e) => update("state", e.target.value.toUpperCase())}
              />
              {errors.state && <div className="field-error-msg">{errors.state}</div>}
            </div>
            <div className={fieldClass("revenue")}>
              <label className="form-label">
                Annual revenue (approx.)<span className="required-mark">*</span>
              </label>
              <select
                className="form-select"
                value={fields.revenue}
                onChange={(e) => update("revenue", e.target.value)}
              >
                <option value="">Select…</option>
                {REVENUE_BANDS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
              {errors.revenue && <div className="field-error-msg">{errors.revenue}</div>}
            </div>
          </div>

          <div className="form-section-title">Calls &amp; front desk</div>
          <div className={fieldClass("calls")}>
            <label className="form-label">
              How many inbound calls per week?<span className="required-mark">*</span>
            </label>
            <select
              className="form-select"
              value={fields.calls}
              onChange={(e) => update("calls", e.target.value)}
            >
              <option value="">Select…</option>
              {CALL_VOLUMES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            {errors.calls && <div className="field-error-msg">{errors.calls}</div>}
          </div>
          <div className={fieldClass("who")}>
            <label className="form-label">
              Who answers your calls right now?<span className="required-mark">*</span>
            </label>
            <select
              className="form-select"
              value={fields.who}
              onChange={(e) => update("who", e.target.value)}
            >
              <option value="">Select…</option>
              {WHO_ANSWERS.map((w) => (
                <option key={w}>{w}</option>
              ))}
            </select>
            {errors.who && <div className="field-error-msg">{errors.who}</div>}
          </div>
          <div className="form-field">
            <label className="form-label">
              What happens when you miss a call?<span className="required-mark">*</span>
            </label>
            <RadioGroup name="sf-miss" options={MISS_OPTIONS} value={miss} onChange={setMiss} error={errors.miss} />
          </div>

          <div className="form-section-title">Tools &amp; pain</div>
          <div className={fieldClass("fsm")}>
            <label className="form-label">
              What scheduling / FSM tool do you use?<span className="required-mark">*</span>
            </label>
            <select
              className="form-select"
              value={fields.fsm}
              onChange={(e) => update("fsm", e.target.value)}
            >
              <option value="">Select…</option>
              {FSM_TOOLS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
            {errors.fsm && <div className="field-error-msg">{errors.fsm}</div>}
          </div>
          <div className="form-field">
            <label className="form-label">
              Biggest front-desk problem (pick one)<span className="required-mark">*</span>
            </label>
            <RadioGroup name="sf-pain" options={PAIN_OPTIONS} value={pain} onChange={setPain} error={errors.pain} />
          </div>

          <div className="form-section-title">Interest</div>
          <div className="form-field">
            <label className="form-label">
              Interested in a 14-day free pilot?<span className="required-mark">*</span>
            </label>
            <RadioGroup name="sf-pilot" options={PILOT_OPTIONS} value={pilot} onChange={setPilot} error={errors.pilot} />
          </div>

          {topError && (
            <p style={{ color: "#c0392b", fontSize: 13, marginTop: 12, fontWeight: 500 }}>
              {topError}
            </p>
          )}

          <button
            className="form-submit"
            style={{ marginTop: 8 }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting…" : "Submit & Enter Draw →"}
          </button>
          <p className="form-note">
            Your data stays private — never sold, never shared with third parties. Unsubscribe
            anytime.
          </p>
        </>
      ) : (
        <div className="form-success show">
          <div className="success-icon">✓</div>
          <div className="success-title">You&apos;re in the draw!</div>
          <p className="success-sub">
            Check your email for confirmation and early access details. The benchmark report
            ships once we hit 100 responses.
          </p>
          <a className="btn btn-primary" href="/product" style={{ marginTop: 16 }}>
            Explore the product →
          </a>
        </div>
      )}
    </div>
  );
}
