import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabaseServer'
import SignOutButton from '@/components/dashboard/SignOutButton'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  // middleware.ts already blocks unauthenticated requests before they reach
  // here — this check is a safety net for edge cases (e.g. a session that
  // expires mid-request), not a duplicate of the middleware's job.
  if (!user) {
    redirect('/login')
  }

  // RLS on business_members restricts this to the caller's own row, so no
  // extra filtering is needed beyond matching user_id.
  const { data: membership } = await supabase
    .from('business_members')
    .select('business_id, role')
    .eq('user_id', user.id)
    .maybeSingle()

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 1.5rem',
          borderBottom: '1px solid #e5e7eb',
          fontSize: '0.875rem',
          color: '#374151',
        }}
      >
        <span>
          Logged in as <strong>{user.email}</strong>
          {membership?.role ? ` · ${membership.role}` : ' · no business assigned yet'}
        </span>
        <SignOutButton />
      </div>

      {children}
    </div>
  )
}
