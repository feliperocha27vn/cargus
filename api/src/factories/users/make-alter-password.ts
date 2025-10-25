import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AlterPasswordUseCase } from '@/use-cases/users/alter-password'

export function makeAlterPasswordUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const alterPasswordUseCase = new AlterPasswordUseCase(prismaUsersRepository)

  return alterPasswordUseCase
}
