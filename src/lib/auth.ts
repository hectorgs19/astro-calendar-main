import { Lucia } from 'lucia'
import { AstroDBAdapter } from 'lucia-adapter-astrodb'
import { db, Session, User } from 'astro:db'

const adapter = new AstroDBAdapter(db, Session, User)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: import.meta.env.PROD
    }
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      google_id: attributes.google_id
    }
  }
})

import { Google } from 'arctic'

export const google = new Google(
  import.meta.env.GOOGLE_CLIENT_ID,
  import.meta.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/auth/google/callback'
)

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  email: string
  google_id: string
}
