import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { makeAlterPasswordUseCase } from '@/factories/users/make-alter-password'
import { verifyJwt } from '@/middlewares/verify-jwt'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const alterPassword: FastifyPluginAsyncZod = async app => {
  app.patch(
    '/users/password',
    {
      onRequest: [verifyJwt],
      schema: {
        body: z.object({
          password: z.string().min(6),
          newPassword: z.string().min(6),
        }),
        response: {
          204: z.void(),
          404: z.object({
            message: z.string(),
          }),
          422: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { password, newPassword } = request.body

      try {
        const alterPasswordUseCase = makeAlterPasswordUseCase()

        await alterPasswordUseCase.execute({
          userId: request.user.sub,
          password,
          newPassword,
        })

        return reply.status(204).send()
      } catch (error) {
        if (error instanceof ResourceNotFoundError) {
          return reply.status(404).send({ message: error.message })
        }

        if (error instanceof InvalidCredentialsError) {
          return reply.status(422).send({ message: error.message })
        }

        throw error
      }
    }
  )
}
