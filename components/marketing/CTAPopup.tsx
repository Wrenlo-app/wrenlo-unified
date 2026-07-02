"use client";

import { createContext, useContext, useState, useCallback } from "react";

/**
 * Ported from wrenlo-web/wrenlo-popup.js.
 * Original behavior preserved:
 *  - Same fields (name, business, email, phone), same validation rules
 *  - Same Supabase table (pilot_leads) and payload shape
 *  - Same heading-per-CTA-label logic
 *  - Same auto-close-after-4s on success
 *
 * NOTE: the Supabase URL/anon key below are copied verbatim from the
 * original script so behavior is unchanged in this sprint. Sprint 5
 * (env var consolidation) will move these into
 * NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
const SUPABASE_URL = "https://lihkrrmmtzoqjxthewzr.supabase.co";
const SUPABASE_KEY = "sb_publishable_gSalxqCkFI3UwoPVIWvyJw_pyH4slR8";

const HEADINGS: Record<string, string> = {
  "free audit": "Get Your Free Missed-Call Audit",
  "audit": "Get Your Free Missed-Call Audit",
  "talk to us": "Let's Talk — Book a Call",
  "get started": "Get Started with Wrenlo",
  "start free pilot": "Start Your Free 14-Day Pilot",
  "book a free pilot call": "Book Your Free Pilot Call",
  "book pilot call": "Book Your Free Pilot Call",
};

function headingForLabel(label: string) {
  const key = label.toLowerCase();
  for (const [k, v] of Object.entries(HEADINGS)) {
    if (key.includes(k)) return v;
  }
  return "Book Your Free 14-Day Pilot";
}

type FieldKey = "name" | "biz" | "email" | "phone";

type FormState = Record<FieldKey, string>;

const EMPTY_FORM: FormState = { name: "", biz: "", email: "", phone: "" };

type CTAPopupContextValue = {
  openPopup: (label: string) => void;
};

const CTAPopupContext = createContext<CTAPopupContextValue | null>(null);

export function useCTAPopup() {
  const ctx = useContext(CTAPopupContext);
  if (!ctx) {
    throw new Error("useCTAPopup must be used within <CTAPopupProvider>");
  }
  return ctx;
}

export function CTAPopupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [ctaLabel, setCtaLabel] = useState("");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openPopup = useCallback((label: string) => {
    setCtaLabel(label);
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
    setSubmitting(false);
    setIsOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  function updateField(key: FieldKey, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<FieldKey, boolean>> = {};
    if (form.name.trim().length <= 1) next.name = true;
    if (form.biz.trim().length <= 1) next.biz = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = true;
    if (form.phone.replace(/\D/g, "").length < 7) next.phone = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSubmitting(true);

    const payload = {
      name: form.name.trim(),
      business_name: form.biz.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      submitted_at: new Date().toISOString(),
      source: typeof window !== "undefined" ? window.location.href : "",
      cta_label: ctaLabel,
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/pilot_leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("Supabase error:", res.status, await res.text());
      }
    } catch (err) {
      console.error("Submit error:", err);
      // Still show thank-you so the user isn't stuck, matching original behavior
    }

    setSubmitting(false);
    setSubmitted(true);
    setTimeout(closePopup, 4000);
  }

  return (
    <CTAPopupContext.Provider value={{ openPopup }}>
      {children}
      {isOpen && (
        <div
          id="wrenlo-overlay"
          className="open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wm-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePopup();
          }}
        >
          <div id="wrenlo-modal">
            <button id="wrenlo-close" aria-label="Close" onClick={closePopup}>
              ✕
            </button>

            {!submitted ? (
              <div id="wrenlo-form-wrap">
                <div className="wm-logo">
                  <img src="/wrenlo-logo.png" alt="Wrenlo" />
                </div>
                <h2 id="wm-title">{headingForLabel(ctaLabel)}</h2>
                <p className="wm-sub">
                  Tell us a bit about your business — we&apos;ll reach out within one business day.
                </p>

                <div className={`wm-field${errors.name ? " has-error" : ""}`}>
                  <label htmlFor="wm-name">Your Name *</label>
                  <input
                    id="wm-name"
                    type="text"
                    placeholder="John Smith"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    className={errors.name ? "wm-error" : ""}
                  />
                  <div className="wm-err-msg">Please enter your name.</div>
                </div>

                <div className={`wm-field${errors.biz ? " has-error" : ""}`}>
                  <label htmlFor="wm-biz">Business Name *</label>
                  <input
                    id="wm-biz"
                    type="text"
                    placeholder="Smith Plumbing LLC"
                    autoComplete="organization"
                    value={form.biz}
                    onChange={(e) => updateField("biz", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    className={errors.biz ? "wm-error" : ""}
                  />
                  <div className="wm-err-msg">Please enter your business name.</div>
                </div>

                <div className={`wm-field${errors.email ? " has-error" : ""}`}>
                  <label htmlFor="wm-email">Business Email *</label>
                  <input
                    id="wm-email"
                    type="email"
                    placeholder="john@smithplumbing.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    className={errors.email ? "wm-error" : ""}
                  />
                  <div className="wm-err-msg">Please enter a valid email address.</div>
                </div>

                <div className={`wm-field${errors.phone ? " has-error" : ""}`}>
                  <label htmlFor="wm-phone">Phone Number *</label>
                  <input
                    id="wm-phone"
                    type="tel"
                    placeholder="(555) 000-0000"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    className={errors.phone ? "wm-error" : ""}
                  />
                  <div className="wm-err-msg">Please enter your phone number.</div>
                </div>

                <button className="wm-submit" disabled={submitting} onClick={handleSubmit}>
                  {submitting ? "Submitting…" : "Get Started →"}
                </button>
                <p className="wm-privacy">🔒 No spam, ever. We&apos;ll only contact you about your pilot.</p>
              </div>
            ) : (
              <div id="wrenlo-thankyou" style={{ display: "block" }}>
                <div className="wm-check">✅</div>
                <h3>You&apos;re all set!</h3>
                <p>
                  Thanks for reaching out — our team will contact you within one business day to
                  set up your free pilot.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </CTAPopupContext.Provider>
  );
}
