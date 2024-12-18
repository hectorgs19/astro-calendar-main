import { lucia } from '@/lib/auth'
import { db, eq, User } from 'astro:db'

import type { APIContext } from 'Astro'

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData()

  const email = (formData.get('email') as string)?.trim()
  if (
    typeof email !== 'string' ||
    email.length < 3 ||
    email.length > 255 ||
    !/.+@.+\..+/.test(email)
  ) {
    return new Response('Invalid email', {
      status: 400
    })
  }

  const existingUser = await db.select().from(User).where(eq(User.email, email.toLowerCase())).get()
  if (!existingUser) {
    return new Response('Incorrect email', {
      status: 400
    })
  }

  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return context.redirect('/dashboard')
}
