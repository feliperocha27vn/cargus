import { app } from '@/app'
import { prisma } from 'lib/prisma'
import request from 'supertest'

describe('Register user', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to register a new user', async () => {
    const reply = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(reply.status).toBe(201)

    const user = await prisma.users.findFirstOrThrow({})

    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
      })
    )
  })
})
