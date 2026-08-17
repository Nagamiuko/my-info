import { createHash } from 'node:crypto'
import { PrismaClient } from '@prisma/client'
import { DEFAULT_CONTENT } from '../shared/contentDefaults.js'

const prisma = new PrismaClient()

const hash = (value) => createHash('sha256').update(value).digest('hex')

async function main() {
  // seed ข้อมูลเริ่มต้นของทุกข้อความในเว็บ
  const rows = []
  for (const [section, values] of Object.entries(DEFAULT_CONTENT)) {
    for (const [key, value] of Object.entries(values)) {
      rows.push({ section, key, value })
    }
  }
  const created = await prisma.siteContent.createMany({ data: rows, skipDuplicates: true })
  console.log(`seed site_content: ${created.count} แถว (ข้ามรายการที่มีอยู่แล้ว)`)

  // บัญชีแอดมินเริ่มต้น: admin / admin123
  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', passwordHash: hash('admin123') },
  })
  console.log('seed admin_users: พร้อม (admin / admin123)')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error('Seed error:', error)
    await prisma.$disconnect()
    process.exit(1)
  })