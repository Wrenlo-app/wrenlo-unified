import { createBrowserClient } from '@supabase/ssr'

/**
 * Browser-side Supabase client (anon key only — never the service role key).
 * Call this inside client components ('use client') whenever you need to talk
 * to Supabase from the browser, e.g. sending a magic link.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
