import { useSession, createError } from 'h3'
import type { H3Event } from 'h3'

const sessionConfig = (event: H3Event) => ({
  password: process.env.ADMIN_SESSION_SECRET || 'dev-secret-change-me-please-use-a-long-random-secret',
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: isHttps(event),
    maxAge: 60 * 60 * 8,
  },
})

const isHttps = (event: H3Event) => {
  const req = event.node.req
  const forwarded = String(req.headers['x-forwarded-proto'] || '')
  return forwarded.split(',')[0].trim() === 'https' || (req.socket as any)?.encrypted === true
}

export const getAdminSession = (event: H3Event) => useSession(event, sessionConfig(event))

export const isAdmin = async (event: H3Event) => {
  const session = await getAdminSession(event)
  return session.data?.admin === true
}

export const setAdminSession = async (event: H3Event, admin: boolean) => {
  const session = await getAdminSession(event)
  if (admin) {
    await session.update({ admin: true })
  } else {
    await session.clear()
  }
}

export const requireAdmin = async (event: H3Event) => {
  if (!(await isAdmin(event))) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}