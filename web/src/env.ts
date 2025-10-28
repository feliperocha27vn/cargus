import z from 'zod'

const envSchema = z.object({
  VITE_NODE_ENV: z.enum(['development', 'production', 'test']),
  VITE_API_URL: z.url(),
  VITE_ENABLE_API_DELAY: z.coerce.boolean(),
})

export const env = envSchema.parse(import.meta.env)
