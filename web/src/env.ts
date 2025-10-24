import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  API_URL: z.url(),
})

export const env = envSchema.parse(import.meta.env)
