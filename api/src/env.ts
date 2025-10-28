import z from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string().url(),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
})

export const env = envSchema.parse(process.env)
