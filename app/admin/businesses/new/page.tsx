// app/admin/businesses/new/page.tsx
//
// Step 1 of onboarding: create the business record. Twilio number, calendar
// connection, and test-call sign-off happen afterward on the "manage" page
// (/admin/businesses/[id]) since those involve manual steps outside this app
// (buying a number in Twilio console, sharing a calendar, etc.) — see the
// onboarding spec doc for the full sequence.

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TRADES = [
  'HVAC',
  'Plumbing',
  'Electrical',
  'Garage Door',
  'Roofing',
  'Appliance Repair',
  'Pest Control',
  'Cleaning',
  'Landscaping',
];

export default function NewBusinessPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    trade: 'HVAC',
    owner_name: '',
    owner_phone: '',
    owner_email: '',
    service_zips: '',
    timezone: 'America/Chicago',
    booking_mode: 'owner_approval' as const,
    pilot_start_date: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const zips = form.service_zips
      .split(',')
      .map((z) => z.trim())
      .filter(Boolean);

    if (zips.length === 0) {
      setError('Enter at least one service ZIP code.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service_zips: zips }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setSubmitting(false);
        return;
      }

      router.push(`/admin/businesses/${data.business.id}`);
    } catch {
      setError('Network error — please try again.');
      setSubmitting(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    marginTop: '4px',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 500,
    color: '#374151',
    display: 'block',
    marginTop: '16px',
  };

  return (
    <main style={{ padding: '32px', fontFamily: 'Arial, sans-serif', maxWidth: '560px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '4px' }}>New business</h1>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
        Creates the record. Phone number, calendar, and test calls happen next.
      </p>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>
          Business name
          <input
            style={inputStyle}
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Demo Comfort HVAC"
          />
        </label>

        <label style={labelStyle}>
          Trade
          <select style={inputStyle} value={form.trade} onChange={(e) => update('trade', e.target.value)}>
            {TRADES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label style={labelStyle}>
          Owner name
          <input
            style={inputStyle}
            required
            value={form.owner_name}
            onChange={(e) => update('owner_name', e.target.value)}
            placeholder="Mike"
          />
        </label>

        <label style={labelStyle}>
          Owner phone (receives SMS alerts and approval links)
          <input
            style={inputStyle}
            required
            value={form.owner_phone}
            onChange={(e) => update('owner_phone', e.target.value)}
            placeholder="+15555550100"
          />
        </label>

        <label style={labelStyle}>
          Owner email (optional)
          <input
            style={inputStyle}
            type="email"
            value={form.owner_email}
            onChange={(e) => update('owner_email', e.target.value)}
            placeholder="owner@example.com"
          />
        </label>

        <label style={labelStyle}>
          Service ZIP codes (comma-separated)
          <input
            style={inputStyle}
            required
            value={form.service_zips}
            onChange={(e) => update('service_zips', e.target.value)}
            placeholder="75201, 75202, 75204"
          />
        </label>

        <label style={labelStyle}>
          Timezone
          <select style={inputStyle} value={form.timezone} onChange={(e) => update('timezone', e.target.value)}>
            <option value="America/Chicago">America/Chicago</option>
            <option value="America/New_York">America/New_York</option>
            <option value="America/Denver">America/Denver</option>
            <option value="America/Los_Angeles">America/Los_Angeles</option>
          </select>
        </label>

        <label style={labelStyle}>
          Booking mode
          <select
            style={inputStyle}
            value={form.booking_mode}
            onChange={(e) => update('booking_mode', e.target.value as 'owner_approval')}
          >
            <option value="owner_approval">Owner approval required (default)</option>
            <option value="auto_book">Auto-book (only once trust is established)</option>
          </select>
        </label>

        <label style={labelStyle}>
          Pilot start date (optional)
          <input
            style={inputStyle}
            type="date"
            value={form.pilot_start_date}
            onChange={(e) => update('pilot_start_date', e.target.value)}
          />
        </label>

        {error && (
          <div style={{ marginTop: '16px', padding: '10px 12px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '8px', fontSize: '13px' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            marginTop: '24px',
            width: '100%',
            padding: '12px',
            backgroundColor: '#111827',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            border: 'none',
            cursor: submitting ? 'default' : 'pointer',
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? 'Creating…' : 'Create business'}
        </button>
      </form>
    </main>
  );
}
