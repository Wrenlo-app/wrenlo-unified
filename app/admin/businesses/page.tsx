// app/admin/businesses/page.tsx
//
// Internal onboarding dashboard. Not customer-facing. Protect this route
// in middleware.ts (see deployment steps doc) before deploying.

import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending: { bg: '#f9fafb', text: '#6b7280' },
  configured: { bg: '#eff6ff', text: '#2563eb' },
  test_calls_passed: { bg: '#faf5ff', text: '#7c3aed' },
  live: { bg: '#f0fdf4', text: '#16a34a' },
  paused: { bg: '#fef2f2', text: '#dc2626' },
};

export default async function AdminBusinessesPage() {
  const { data: businesses } = await supabaseAdmin
    .from('businesses')
    .select(
      'id, name, trade, owner_name, owner_phone, phone_number, onboarding_status, calendar_id, pilot_start_date, created_at'
    )
    .order('created_at', { ascending: false });

  return (
    <main style={{ padding: '32px', fontFamily: 'Arial, sans-serif', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '4px' }}>Business Onboarding</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>Internal — track pilots from signup to live</p>
        </div>
        <Link
          href="/admin/businesses/new"
          style={{
            padding: '10px 16px',
            backgroundColor: '#111827',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '14px',
            textDecoration: 'none',
          }}
        >
          + New business
        </Link>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            {['Name', 'Trade', 'Owner', 'Phone number', 'Calendar', 'Status', 'Pilot start', ''].map((h) => (
              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {businesses && businesses.length > 0 ? (
            businesses.map((b) => {
              const style = STATUS_COLORS[b.onboarding_status] || STATUS_COLORS.pending;
              return (
                <tr key={b.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 500 }}>{b.name}</td>
                  <td style={{ padding: '10px 14px' }}>{b.trade}</td>
                  <td style={{ padding: '10px 14px', color: '#6b7280' }}>
                    {b.owner_name} · {b.owner_phone}
                  </td>
                  <td style={{ padding: '10px 14px', color: '#6b7280' }}>{b.phone_number || '—'}</td>
                  <td style={{ padding: '10px 14px', color: '#6b7280' }}>{b.calendar_id ? '✓' : '—'}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      style={{
                        backgroundColor: style.bg,
                        color: style.text,
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      {b.onboarding_status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#6b7280' }}>{b.pilot_start_date || '—'}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <Link href={`/admin/businesses/${b.id}`} style={{ color: '#2563eb', fontSize: '13px' }}>
                      Manage →
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
                No businesses yet. Click "New business" to onboard your first pilot.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
