import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabaseServer'

/**
 * Supabase redirects here after the user clicks the magic-link email, with
 * a `code` query param. We exchange that code for a session (which sets the
 * auth cookies via lib/supabaseServer.ts), then send the user on to the
 * dashboard (or wherever `next` points, e.g. the page they originally tried
 * to visit before middleware redirected them to /login).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Missing/invalid code, or exchange failed — send back to login with an
  // error flag rather than silently landing on a broken/blank page.
  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`)
}
