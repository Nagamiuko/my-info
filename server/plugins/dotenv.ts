import { config } from 'dotenv'

export default defineNitroPlugin(() => {
  config()
})