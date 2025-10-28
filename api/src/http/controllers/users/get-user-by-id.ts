import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { makeGetUserByIdUseCase } from '@/factories/users/make-get-user-by-id'
import { verifyJwt } from '@/middlewares/verify-jwt'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const getUserById: FastifyPluginAsyncZod = async app => {
  app.get(
    '/me',
    {
      onRequest: [verifyJwt],
      schema: {
        response: {
          200: z.object({
            user: z.object({
              name: z.string(),
              email: z.email(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const getUserByIdUseCase = makeGetUserByIdUseCase()

        const { user } = await getUserByIdUseCase.execute({
          userId: request.user.sub,
        })

        return reply.status(200).send({ user })
      } catch (error) {
        if (error instanceof ResourceNotFoundError) {
          return reply.status(404).send({ message: error.message })
        }

        throw error
      }
    }
  )
}
