import type { FastifyInstance } from 'fastify'
import { authenticateUser } from '../controllers/users/authenticate'
import { registerUser } from '../controllers/users/register'
import { updateUser } from '../controllers/users/update-user'

export function usersRoutes(app: FastifyInstance) {
  app.register(authenticateUser)
  app.register(registerUser)
  app.register(updateUser)
}
