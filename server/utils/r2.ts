import { S3Client, PutObjectCommand, GetObjectCommand, HeadObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

export const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

export const R2_BUCKET = process.env.R2_BUCKET || 'profile'

// ชุดโฟลเดอร์ที่อนุญาตให้อัปโหลดได้ (ป้องกัน path traversal)
export const R2_UPLOAD_FOLDERS = {
  avatar: { maxBytes: 10 * 1024 * 1024, accept: 'image/*' },
  about: { maxBytes: 10 * 1024 * 1024, accept: 'image/*' },
  projects: { maxBytes: 10 * 1024 * 1024, accept: 'image/*' },
  files: { maxBytes: 20 * 1024 * 1024, accept: 'application/pdf' },
}

// สร้าง URL สำหรับเข้าถึงไฟล์ (ถ้าไม่มี public URL จะ serve ผ่านตัวเว็บเอง)
export function r2PublicUrl(key) {
  if (process.env.R2_PUBLIC_URL) return `${process.env.R2_PUBLIC_URL}/${key}`
  return `/r2/${key}`
}

// อัปโหลด buffer ไป R2 แล้วคืน URL
export async function r2Upload({ folder, filename, buffer, contentType }) {
  const safeFolder = R2_UPLOAD_FOLDERS[folder] ? folder : 'files'
  const base = filename.replace(/[^\w.\-]+/g, '_').replace(/_+/g, '_')
  const key = `${safeFolder}/${Date.now()}-${base}`
  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  )
  return { key, url: r2PublicUrl(key) }
}

// อ่านไฟล์จาก R2 (คืน body, content-type) — ใช้ใน route serve
export async function r2Get(key) {
  const head = await r2.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key }))
  const body = await r2.send(new GetObjectCommand({ Bucket: R2_BUCKET, Key: key }))
  return {
    stream: body.Body,
    contentType: head.ContentType || 'application/octet-stream',
    contentLength: Number(head.ContentLength || 0),
  }
}

// ลบไฟล์ (สำรองไว้ใช้ในอนาคต)
export async function r2Delete(key) {
  await r2.send(new DeleteObjectCommand({ Bucket: R2_BUCKET, Key: key }))
}