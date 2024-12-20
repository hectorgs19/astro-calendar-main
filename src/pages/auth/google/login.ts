import { generateState, generateCodeVerifier } from 'arctic'
import { google } from '@/lib/auth/auth'

import type { APIContext } from 'astro'

export async function GET(context: APIContext): Promise<Response> {
  const state = generateState()
  const scopes = ['openid', 'profile', 'email']
  const codeVerifier = generateCodeVerifier()
  const url = google.createAuthorizationURL(state, codeVerifier, scopes)

  context.cookies.set('google_oauth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    maxAge: 60 * 10,
    path: '/'
  })

  context.cookies.set('google_oauth_verifier', codeVerifier, {
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    maxAge: 60 * 10,
    path: '/'
  })

  return context.redirect(url.toString())
}
