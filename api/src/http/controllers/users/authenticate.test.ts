import { app } from '@/app'
import request from 'supertest'
import { createNewUser } from 'utils/tests/create-new-user'

describe('Authenticate user', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to authenticate an existing user', async () => {
    const { user } = await createNewUser()

    const reply = await request(app.server).post('/users/authenticate').send({
      email: user.email,
      password: '123456',
    })

    expect(reply.status).toBe(200)
    expect(reply.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    )
  })
})
