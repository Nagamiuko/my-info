import { prisma } from '../utils/prisma'

export default defineEventHandler(async () => {
  try {
    const rows = await prisma.siteContent.findMany({
      select: { section: true, key: true, value: true },
    })
    return rows
  } catch (error) {
    console.error('[content.get] ไม่สามารถอ่านจากฐานข้อมูลได้:', error.message)
    return []
  }
})