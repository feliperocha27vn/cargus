import type { Prisma, Users } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: string): Promise<Users | null>
  register(data: Prisma.UsersUncheckedCreateInput): Promise<Users>
  update(userId: string, data: Prisma.UsersUncheckedUpdateInput): Promise<Users>
}
