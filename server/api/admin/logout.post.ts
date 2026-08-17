import { setAdminSession } from '../../utils/session'

export default defineEventHandler(async (event) => {
  await setAdminSession(event, false)
  return { ok: true }
})