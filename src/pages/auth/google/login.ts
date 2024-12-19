import { generateState, generateCodeVerifier } from 'arctic'
import { google } from '@/lib/auth/auth'

import type { APIContext } from 'astro'

export async function GET(context: APIContext): Promise<Response> {
  const state = generateState()
  const scopes = ['openid', 'profile', 'email']
  const codeVerifier = generateCodeVerifier()
  const url = google.createAuthorizationURL(state, codeVerifier, scopes)

  context.cookies.set('google_oauth_state', state, {
    path: '/',
    secure: import.meta.env.PROD,
    maxAge: 60,
    sameSite: 'lax'
  })

  context.cookies.set('google_oauth_verifier', codeVerifier, {
    path: '/',
    secure: import.meta.env.PROD,
    maxAge: 60,
    sameSite: 'lax'
  })

  return context.redirect(url.toString())
}
