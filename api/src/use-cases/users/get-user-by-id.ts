import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import type { UsersRepository } from '@/repositories/users-repository'

interface GetUserByIdUseCaseRequest {
  userId: string
}

interface GetUserByIdUseCaseReply {
  user: {
    name: string
    email: string
  }
}

export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseReply> {
    const user = await this.usersRepository.getUserById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user: {
        name: user.name,
        email: user.email,
      },
    }
  }
}
