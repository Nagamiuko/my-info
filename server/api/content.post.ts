import { prisma } from '../utils/prisma'
import { requireAdmin } from '../utils/session'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const body = await readBody(event)
  const { section, values } = body || {}
  if (!section || typeof values !== 'object' || values === null) {
    throw createError({ statusCode: 400, statusMessage: 'ข้อมูลไม่ถูกต้อง (ต้องส่ง section และ values)' })
  }

  const results = []
  for (const [key, value] of Object.entries(values)) {
    if (typeof value !== 'string') continue
    const row = await prisma.siteContent.upsert({
      where: { section_key: { section, key } },
      update: { value },
      create: { section, key, value },
    })
    results.push(row)
  }

  return { ok: true, count: results.length }
})