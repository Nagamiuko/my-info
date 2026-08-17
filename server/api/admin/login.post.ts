import { createHash } from 'node:crypto'
import { prisma } from '../../utils/prisma'
import { setAdminSession } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const username = String(body?.username || '').trim()
  const password = String(body?.password || '')

  if (!username || !password) {
    throw createError({ statusCode: 400, statusMessage: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' })
  }

  let user
  try {
    user = await prisma.adminUser.findUnique({ where: { username } })
  } catch (error) {
    console.error('[admin-login] DB error:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: 'เชื่อมต่อฐานข้อมูลไม่ได้ กรุณาตั้งค่า DATABASE_URL และรัน yarn db:push + yarn db:seed',
    })
  }

  const hash = createHash('sha256').update(password).digest('hex')
  if (!user || user.passwordHash !== hash) {
    throw createError({ statusCode: 401, statusMessage: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })
  }

  await setAdminSession(event, true)
  return { ok: true }
})