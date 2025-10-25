import type { FastifyInstance } from 'fastify'
import { authenticateUser } from '../controllers/users/authenticate'

export function usersRoutes(app: FastifyInstance) {
  app.register(authenticateUser)
}
