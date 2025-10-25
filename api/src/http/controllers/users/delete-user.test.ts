import { app } from '@/app'
import { prisma } from 'lib/prisma'
import request from 'supertest'
import { createAndAuthUser } from 'utils/tests/create-and-auth-user'

describe('Delete user', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to delete an existing user', async () => {
    const { token } = await createAndAuthUser(app)

    const reply = await request(app.server)
      .delete('/users')
      .set('Authorization', `Bearer ${token}`)

    expect(reply.status).toBe(204)

    const user = await prisma.users.findFirst({})

    expect(user).toBeNull()
  })
})
