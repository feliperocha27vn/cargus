import { makeUpdateUserUseCase } from '@/factories/users/make-update-user'
import { verifyJwt } from '@/middlewares/verify-jwt'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z, { email } from 'zod'

export const updateUser: FastifyPluginAsyncZod = async app => {
  app.patch(
    '/users',
    {
      onRequest: [verifyJwt],
      schema: {
        body: z.object({
          name: z.string().optional(),
          email: email().optional(),
        }),
        response: {
          204: z.void(),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      try {
        const updateUserUseCase = makeUpdateUserUseCase()

        await updateUserUseCase.execute({
          userId: request.user.sub,
          name,
          email,
        })

        return reply.status(204).send()
      } catch (error) {
        throw error
      }
    }
  )
}
