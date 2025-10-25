import { app } from '@/app'
import request from 'supertest'
import { createAndAuthUser } from 'utils/tests/create-and-auth-user'

describe('Get user by id', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to get user by id', async () => {
    const { token } = await createAndAuthUser(app)

    const reply = await request(app.server)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)

    expect(reply.status).toBe(200)

    expect(reply.body).toEqual({
      user: expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    })
  })
})
