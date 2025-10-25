import type { FastifyInstance } from 'fastify'
import { alterPassword } from '../controllers/users/alter-password'
import { authenticateUser } from '../controllers/users/authenticate'
import { deleteUser } from '../controllers/users/delete-user'
import { getUserById } from '../controllers/users/get-user-by-id'
import { registerUser } from '../controllers/users/register'
import { updateUser } from '../controllers/users/update-user'

export function usersRoutes(app: FastifyInstance) {
  app.register(authenticateUser)
  app.register(registerUser)
  app.register(updateUser)
  app.register(getUserById)
  app.register(deleteUser)
  app.register(alterPassword)
}
