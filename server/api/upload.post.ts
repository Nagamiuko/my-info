import { requireAdmin } from '../utils/session'
import { R2_UPLOAD_FOLDERS, r2Upload } from '../utils/r2'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const formData = await readFormData(event)
  const folder = String(formData.get('folder') || 'files')
  if (!R2_UPLOAD_FOLDERS[folder]) {
    throw createError({ statusCode: 400, statusMessage: `โฟลเดอร์ไม่ถูกต้อง (${Object.keys(R2_UPLOAD_FOLDERS).join(', ')})` })
  }
  const file = formData.get('file')
  if (!(file instanceof File)) {
    throw createError({ statusCode: 400, statusMessage: 'ไม่พบไฟล์ในคำขอ (ต้องใช้ key "file")' })
  }

  const folderConf = R2_UPLOAD_FOLDERS[folder]
  if (file.size > folderConf.maxBytes) {
    throw createError({ statusCode: 400, statusMessage: `ไฟล์ใหญ่เกินไป (สูงสุด ${Math.round(folderConf.maxBytes / 1024 / 1024)}MB)` })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const { url, key } = await r2Upload({
    folder,
    filename: file.name,
    buffer,
    contentType: file.type || 'application/octet-stream',
  })

  return { url, key }
})