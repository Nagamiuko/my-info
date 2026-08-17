import { isAdmin } from '../../utils/session'

export default defineEventHandler(async (event) => {
  return { admin: await isAdmin(event) }
})