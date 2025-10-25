import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserByIdUseCase } from '@/use-cases/users/get-user-by-id'

export function makeGetUserByIdUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getUserByIdUseCase = new GetUserByIdUseCase(prismaUsersRepository)
  return getUserByIdUseCase
}
