import { hash } from 'bcryptjs'
import { prisma } from '../../lib/prisma'

export async function createNewUser() {
  const user = await prisma.users.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      passwordHash: await hash('123456', 10),
    },
  })

  return { user }
}
