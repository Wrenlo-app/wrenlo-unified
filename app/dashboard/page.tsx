import { supabaseAdmin } from '@/lib/supabaseAdmin';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export const dynamic = 'force-dynamic'; // prevents static pre-render at build time

export default async function DashboardPage() {
  const { data: leads } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  const { data: roiEvents } = await supabaseAdmin
    .from('roi_events')
    .select('*');

  const recoveredRevenue =
    roiEvents?.reduce(
      (sum, event) => sum + Number(event.estimated_value || 0),
      0
    ) || 0;

  const bookedCount =
    leads?.filter((l) => l.status === 'booked').length || 0;
  const escalatedCount =
    leads?.filter((l) => l.status === 'escalated').length || 0;
  const missedCallCount =
    leads?.filter((l) => l.source === 'missed_call').length || 0;
  const totalLeads = leads?.length || 0;

  return (
    <main style={{ padding: '32px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
        Wrenlo Lead Inbox
      </h1>
      <p style={{ color: '#666', marginBottom: '32px', fontSize: '14px' }}>
        All inbound leads, calls, and bookings in one place
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
        <MetricCard
          title="Estimated Revenue Recovered"
          value={`$${recoveredRevenue.toLocaleString()}`}
          color="#22c55e"
        />
        <MetricCard
          title="Booked Jobs"
          value={String(bookedCount)}
          color="#3b82f6"
        />
        <MetricCard
          title="Escalations"
          value={String(escalatedCount)}
          color="#f59e0b"
        />
        <MetricCard
          title="Missed Calls Recovered"
          value={String(missedCallCount)}
          color="#8b5cf6"
        />
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
        Recent Leads ({totalLeads})
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
              {['Time', 'Name', 'Phone', 'ZIP', 'Service', 'Urgency', 'Status', 'Source', 'Symptoms'].map((h) => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads && leads.length > 0 ? (
              leads.map((lead, i) => (
                <tr
                  key={lead.id}
                  style={{
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: i % 2 === 0 ? '#fff' : '#f9fafb', // ✅ alternating rows replace hover effect
                  }}
                  // ✅ onMouseEnter and onMouseLeave removed — not allowed in server components
                >
                  <td style={{ padding: '12px 16px', whiteSpace: 'nowrap', color: '#6b7280' }}>
                    {new Date(lead.created_at).toLocaleString('en-US', {
                      month: 'short', day: 'numeric',
                      hour: 'numeric', minute: '2-digit'
                    })}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: '500' }}>{lead.name || '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#6b7280' }}>{lead.phone || '—'}</td>
                  <td style={{ padding: '12px 16px' }}>{lead.zip_code || '—'}</td>
                  <td style={{ padding: '12px 16px' }}>{lead.service_type || '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <UrgencyBadge urgency={lead.urgency} />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <StatusBadge status={lead.status} />
                  </td>
                  <td style={{ padding: '12px 16px', color: '#6b7280' }}>{lead.source || '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#6b7280', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {lead.symptoms || '—'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} style={{ padding: '48px', textAlign: 'center', color: '#9ca3af' }}>
                  No leads yet. Leads will appear here once calls start coming in.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function MetricCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <Card variant="dashboard" accentColor={color}>
      <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{title}</div>
      <div style={{ fontSize: '28px', fontWeight: '700', color: '#111827' }}>{value}</div>
    </Card>
  );
}

function UrgencyBadge({ urgency }: { urgency: string | null }) {
  const colors: Record<string, { bg: string; text: string }> = {
    emergency:   { bg: '#fef2f2', text: '#dc2626' },
    urgent:      { bg: '#fff7ed', text: '#ea580c' },
    repair:      { bg: '#eff6ff', text: '#2563eb' },
    maintenance: { bg: '#f0fdf4', text: '#16a34a' },
    replacement: { bg: '#faf5ff', text: '#7c3aed' },
    routine:     { bg: '#f0fdf4', text: '#16a34a' },
  };
  const style = colors[urgency || ''] || { bg: '#f9fafb', text: '#6b7280' };
  return (
    <Badge variant="dashboard" bg={style.bg} text={style.text}>
      {urgency || 'unknown'}
    </Badge>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    booked:                 { bg: '#f0fdf4', text: '#16a34a' },
    escalated:              { bg: '#fef2f2', text: '#dc2626' },
    pending_owner_approval: { bg: '#eff6ff', text: '#2563eb' },
    owner_rejected:         { bg: '#fef2f2', text: '#dc2626' },
    textback_sent:          { bg: '#faf5ff', text: '#7c3aed' },
    qualified:              { bg: '#f0fdf4', text: '#16a34a' },
    new:                    { bg: '#f9fafb', text: '#6b7280' },
  };
  const style = colors[status] || { bg: '#f9fafb', text: '#6b7280' };
  return (
    <Badge variant="dashboard" bg={style.bg} text={style.text} nowrap>
      {status.replace(/_/g, ' ')}
    </Badge>
  );
}
