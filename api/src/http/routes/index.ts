import type { FastifyInstance } from 'fastify'
import { usersRoutes } from './users.routes'

export function indexRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
}
