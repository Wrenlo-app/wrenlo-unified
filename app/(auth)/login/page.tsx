'use client'

import { useState, type FormEvent } from 'react'
import { createClient } from '@/lib/supabaseClient'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Must exactly match a URL in Supabase Auth → URL Configuration →
        // Redirect URLs, or the magic link will fail to redirect correctly.
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setStatus('error')
      setErrorMessage(error.message)
      return
    }

    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>Check your email</h1>
          <p>
            We sent a sign-in link to <strong>{email}</strong>. Open it on
            this device to finish logging in.
          </p>
          <button
            type="button"
            className="auth-secondary-link"
            onClick={() => setStatus('idle')}
          >
            Use a different email
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Sign in to Wrenlo</h1>
        <p>Enter your email and we&apos;ll send you a sign-in link. No password needed.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@business.com"
            />
          </div>

          <button type="submit" className="auth-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending link…' : 'Send magic link'}
          </button>

          {status === 'error' && (
            <p className="auth-error" role="alert">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
