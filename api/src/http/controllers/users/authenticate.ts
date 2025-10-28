import { env } from '@/env'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { makeAuthenticateUser } from '@/factories/users/make-authenticate-user'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z, { email } from 'zod'

export const authenticateUser: FastifyPluginAsyncZod = async app => {
  app.post(
    '/authenticate',
    {
      schema: {
        body: z.object({
          email: email(),
          password: z.string().min(6),
        }),
        response: {
          200: z.void(),
          422: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      try {
        const authenticateUserUseCase = makeAuthenticateUser()

        const { user } = await authenticateUserUseCase.execute({
          email,
          password,
        })

        const token = await reply.jwtSign(
          {},
          {
            sub: user.id,
          }
        )

        const refreshToken = await reply.jwtSign(
          {},
          {
            sub: user.id,
            expiresIn: '7d',
          }
        )

        const isProd = env.NODE_ENV === 'production'

        return reply
          .status(200)
          .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: isProd,
            httpOnly: true,
            sameSite: 'lax',
          })
          .setCookie('token', token, {
            path: '/',
            secure: isProd,
            httpOnly: true,
            sameSite: 'lax',
          })
          .send()
      } catch (error) {
        if (error instanceof InvalidCredentialsError) {
          return reply.status(422).send({ message: error.message })
        }

        throw error
      }
    }
  )
}
