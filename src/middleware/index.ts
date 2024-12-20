import { lucia } from '@/lib/auth/auth'
import { db, eq, User } from 'astro:db'
import { sequence } from 'astro:middleware'

async function auth(context, next) {
  const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) {
    context.locals.user = null
    context.locals.session = null
    return await next()
  }

  const { session, user } = await lucia.validateSession(sessionId)
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id)
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie()
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  }
  context.locals.session = session
  context.locals.user = user

  return await next()
}

async function permissions(context, next) {
  const user = context.locals.user
  if (
    !user &&
    context.url.pathname !== '/' &&
    context.url.pathname !== '/signup' &&
    !context.url.pathname.startsWith('/auth')
  ) {
    return await context.redirect('/')
  }

  if (user && context.url.pathname === '/' && context.url.pathname === '/signup') {
    return await context.redirect('/dashboard')
  }

  //TODO - change 'user.is_admin' to '!user.is_admin'
  if (user && user.is_admin && context.url.pathname.startsWith('/slots')) {
    return await context.redirect('/dashboard')
  }

  return await next()
}

export const onRequest = sequence(auth, permissions)
