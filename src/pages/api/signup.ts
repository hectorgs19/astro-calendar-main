import { lucia } from '@/lib/auth/auth'
import { generateId } from 'lucia'
import { db, User } from 'astro:db'

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

  const name = (formData.get('name') as string)?.trim()
  if (typeof name !== 'string' || name.length < 3 || name.length > 255) {
    return new Response('Invalid name', {
      status: 400
    })
  }

  const userId = generateId(15)

  await db.insert(User).values({
    id: userId,
    email: email.toLowerCase(),
    name: name,
    is_admin: false
  })

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return context.redirect('/dashboard')
}
