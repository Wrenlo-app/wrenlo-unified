// app/admin/businesses/[id]/page.tsx
//
// Steps 2-7 of onboarding: record the Twilio number once bought, the
// calendar ID once shared, and flip status through configured ->
// test_calls_passed -> live as you complete each manual step. This page
// doesn't automate Twilio/Google/Retell — it just tracks state so you (and
// later, a teammate) can see where a pilot is stuck.

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

type Business = {
  id: string;
  name: string;
  onboarding_status: string;
  phone_number: string | null;
  calendar_id: string | null;
};

const STEPS = [
  { status: 'pending', label: 'Business record created' },
  { status: 'configured', label: 'Phone number + calendar connected' },
  { status: 'test_calls_passed', label: 'All 10 test calls passed' },
  { status: 'live', label: 'Live — receiving real calls' },
];

export default function ManageBusinessPage() {
  const params = useParams<{ id: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [calendarId, setCalendarId] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/businesses')
      .then((r) => r.json())
      .then((data) => {
        const found = data.businesses?.find((b: Business) => b.id === params.id);
        if (found) {
          setBusiness(found);
          setPhoneNumber(found.phone_number || '');
          setCalendarId(found.calendar_id || '');
        }
      });
  }, [params.id]);

  async function updateBusiness(patch: Record<string, unknown>) {
    setSaving(true);
    const res = await fetch(`/api/admin/businesses/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    const data = await res.json();
    if (res.ok) setBusiness((b) => (b ? { ...b, ...data.business } : b));
    setSaving(false);
  }

  if (!business) {
    return (
      <main style={{ padding: '32px', fontFamily: 'Arial, sans-serif' }}>
        <p>Loading…</p>
      </main>
    );
  }

  const currentStepIndex = STEPS.findIndex((s) => s.status === business.onboarding_status);

  return (
    <main style={{ padding: '32px', fontFamily: 'Arial, sans-serif', maxWidth: '640px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '4px' }}>{business.name}</h1>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
        Status: <strong>{business.onboarding_status.replace(/_/g, ' ')}</strong>
      </p>

      <div style={{ marginBottom: '32px' }}>
        {STEPS.map((step, i) => (
          <div key={step.status} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: i <= currentStepIndex ? '#16a34a' : '#e5e7eb',
                color: '#fff',
                fontSize: 11,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {i <= currentStepIndex ? '✓' : i + 1}
            </div>
            <span style={{ fontSize: '14px', color: i <= currentStepIndex ? '#111827' : '#9ca3af' }}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
        <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '4px' }}>
          Twilio phone number
        </label>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+15555550100"
          />
          <button
            onClick={() => updateBusiness({ phone_number: phoneNumber })}
            disabled={saving}
            style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '13px', cursor: 'pointer' }}
          >
            Save
          </button>
        </div>

        <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '4px' }}>
          Google Calendar ID
        </label>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <input
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
            value={calendarId}
            onChange={(e) => setCalendarId(e.target.value)}
            placeholder="calendar id from Google Calendar settings"
          />
          <button
            onClick={() => updateBusiness({ calendar_id: calendarId })}
            disabled={saving}
            style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '13px', cursor: 'pointer' }}
          >
            Save
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => updateBusiness({ onboarding_status: 'configured' })}
            disabled={saving}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #2563eb', color: '#2563eb', fontSize: '13px', cursor: 'pointer', backgroundColor: '#eff6ff' }}
          >
            Mark "configured"
          </button>
          <button
            onClick={() => updateBusiness({ onboarding_status: 'test_calls_passed' })}
            disabled={saving}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #7c3aed', color: '#7c3aed', fontSize: '13px', cursor: 'pointer', backgroundColor: '#faf5ff' }}
          >
            Mark "10 test calls passed"
          </button>
          <button
            onClick={() => updateBusiness({ onboarding_status: 'live' })}
            disabled={saving}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #16a34a', color: '#16a34a', fontSize: '13px', cursor: 'pointer', backgroundColor: '#f0fdf4' }}
          >
            Go live
          </button>
        </div>

        <p style={{ marginTop: '16px', fontSize: '12px', color: '#9ca3af' }}>
          Reminder: don't mark "test calls passed" until all 10 scripted scenarios
          (routine, urgent, emergency, gas smell, outside ZIP, replacement,
          spam, angry caller, missed-call textback, full booking approval)
          have been run against THIS business's phone number specifically.
        </p>
      </div>
    </main>
  );
}
