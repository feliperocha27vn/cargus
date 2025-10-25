import type { Prisma } from '@prisma/client'
import { prisma } from 'lib/prisma'
import type { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async register(data: Prisma.UsersUncheckedCreateInput) {
    const user = await prisma.users.create({
      data,
    })

    return user
  }

  async update(userId: string, data: Prisma.UsersUncheckedUpdateInput) {
    const user = await prisma.users.update({
      where: {
        id: userId,
      },
      data,
    })

    return user
  }
}
