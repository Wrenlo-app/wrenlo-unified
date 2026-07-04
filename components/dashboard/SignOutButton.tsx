'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabaseClient'
import Button from '@/components/ui/Button'

export default function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <Button variant="dashboard-outline" onClick={handleSignOut}>
      Sign out
    </Button>
  )
}
