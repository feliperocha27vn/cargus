import type { UsersRepository } from '@/repositories/users-repository'
import type { Users } from '@prisma/client'

interface UpdateUserUseCaseRequest {
  userId: string
  name?: string
  email?: string
}

interface UpdateUserUseCaseReply {
  user: Users
}

export class UpdateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
    email,
    name,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseReply> {
    const updatedUser = await this.userRepository.update(userId, {
      name,
      email,
    })

    return {
      user: updatedUser,
    }
  }
}
