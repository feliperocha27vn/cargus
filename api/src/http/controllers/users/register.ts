import { UserAlreadyExistsError } from '@/errors/user-already-exists'
import { makeRegisterUserUseCase } from '@/factories/users/make-register-user'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z, { email } from 'zod'

export const registerUser: FastifyPluginAsyncZod = async app => {
  app.post(
    '/users',
    {
      schema: {
        body: z.object({
          name: z.string().min(2).max(100),
          email: email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.void(),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      try {
        const registerUserUseCase = makeRegisterUserUseCase()

        await registerUserUseCase.execute({
          name,
          email,
          password,
        })

        return reply.status(201).send()
      } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
          return reply.status(409).send({ message: error.message })
        }

        throw error
      }
    }
  )
}
