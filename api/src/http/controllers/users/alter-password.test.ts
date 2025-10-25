import { app } from '@/app'
import request from 'supertest'
import { createAndAuthUser } from 'utils/tests/create-and-auth-user'

describe('Alter password user', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to alter the password of an existing user', async () => {
    const { token } = await createAndAuthUser(app)

    const reply = await request(app.server)
      .patch('/users/password')
      .send({
        password: '123456',
        newPassword: '654321',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(reply.status).toBe(204)
  })
})
