import { r2Get } from '../../utils/r2'

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path') || ''
  if (!path || path.includes('..')) {
    throw createError({ statusCode: 400, statusMessage: 'path ไม่ถูกต้อง' })
  }

  try {
    const { stream, contentType, contentLength } = await r2Get(path)
    setResponseHeaders(event, {
      'Content-Type': contentType,
      'Content-Length': String(contentLength),
      'Cache-Control': 'public, max-age=31536000, immutable',
    })
    return stream
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'ไม่พบไฟล์' })
  }
})