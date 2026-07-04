'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabaseClient'

export default function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      style={{
        background: 'none',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        padding: '0.35rem 0.75rem',
        fontSize: '0.8rem',
        color: '#374151',
        cursor: 'pointer',
      }}
    >
      Sign out
    </button>
  )
}
