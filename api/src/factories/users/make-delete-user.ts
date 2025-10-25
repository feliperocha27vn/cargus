import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user'

export function makeDeleteUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository)

  return deleteUserUseCase
}
