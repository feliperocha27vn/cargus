import type { Users } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: string): Promise<Users | null>
}
