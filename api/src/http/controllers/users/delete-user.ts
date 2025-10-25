import { makeDeleteUserUseCase } from '@/factories/users/make-delete-user'
import { verifyJwt } from '@/middlewares/verify-jwt'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const deleteUser: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/users',
    {
      onRequest: [verifyJwt],
      schema: {
        response: {
          204: z.void(),
        },
      },
    },
    async (request, reply) => {
      try {
        const deleteUserUseCase = makeDeleteUserUseCase()

        await deleteUserUseCase.execute({
          userId: request.user.sub,
        })

        return reply.status(204).send()
      } catch (error) {
        throw error
      }
    }
  )
}
