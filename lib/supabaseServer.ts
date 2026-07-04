import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Server-side Supabase client (anon key) for use in Server Components,
 * Server Actions, and Route Handlers — reads/writes the session via cookies.
 *
 * NOT for admin/service-role operations. If a future sprint needs to bypass
 * RLS (e.g. an admin tool that creates business_members rows), that should be
 * a separate lib/supabaseAdmin.ts using the service role key, used
 * server-side only, and never imported into client components.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from a Server Component render — safe to ignore.
            // Middleware is what actually refreshes the session cookie.
          }
        },
      },
    }
  )
}
