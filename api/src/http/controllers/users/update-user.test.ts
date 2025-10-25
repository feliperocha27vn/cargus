import { app } from '@/app'
import { prisma } from 'lib/prisma'
import request from 'supertest'
import { createAndAuthUser } from 'utils/tests/create-and-auth-user'

describe('Update user', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to update an existing user', async () => {
    const { token } = await createAndAuthUser(app)

    const reply = await request(app.server)
      .patch('/users')
      .send({
        name: 'John Doe Update',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(reply.status).toBe(204)

    const user = await prisma.users.findFirstOrThrow({})

    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe Update',
      })
    )
  })
})
