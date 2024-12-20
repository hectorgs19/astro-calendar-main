import { google, lucia } from '@/lib/auth/auth'
import { decodeIdToken, generateCodeVerifier, OAuth2RequestError, OAuth2Tokens } from 'arctic'
import { generateId } from 'lucia'

import type { APIContext } from 'astro'
import { db, or, eq, User } from 'astro:db'

export async function GET(context: APIContext): Promise<Response> {
  const code = context.url.searchParams.get('code')
  const state = context.url.searchParams.get('state')

  const storedState = context.cookies.get('google_oauth_state')
  const storedCodeVerifier = context.cookies.get('google_oauth_verifier')

  try {
    if (
      code == null ||
      storedState == null ||
      storedCodeVerifier == null ||
      state !== storedState?.value
    ) {
      return new Response('Please restart the process.', {
        status: 400
      })
    }

    const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier?.value)
    const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`
      }
    })

    const googleUser = await response.json()
    if (googleUser == null || googleUser.email == null || googleUser.sub == null) {
      return new Response('Email & Gooogle ID are required.', {
        status: 400
      })
    }

    const existingUser = await db
      .select()
      .from(User)
      .where(or(eq(User.email, googleUser?.email), eq(User.google_id, googleUser?.sub)))
      .get()

    if (existingUser) {
      if (existingUser.google_id == null) {
        await db.update(User).set({ google_id: googleUser.sub }).where(eq(User.id, existingUser.id))
      }

      const session = await lucia.createSession(existingUser.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      return context.redirect('/dashboard')
    }

    const userId = generateId(15)
    await db.insert(User).values({
      id: userId,
      name: 'Google User ' + userId,
      email: googleUser.email,
      google_id: googleUser.sub,
      is_admin: false
    })

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return context.redirect('/dashboard')
  } catch (e) {
    console.error(e)
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400
      })
    }
    return new Response(null, {
      status: 500
    })
  }
}
