import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import { prisma } from 'lib/prisma'
import request from 'supertest'

export async function createAndAuthUser(app: FastifyInstance) {
  const user = await prisma.users.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 10),
    },
  })

  const reply = await request(app.server).post('/users/authenticate').send({
    email: user.email,
    password: '123456',
  })

  const { token } = reply.body

  return { user, token }
}
