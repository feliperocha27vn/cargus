import type { UsersRepository } from '@/repositories/users-repository'

interface DeleteUserUseCaseRequest {
  userId: string
}

export class DeleteUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ userId }: DeleteUserUseCaseRequest) {
    await this.userRepository.deleteUser(userId)
  }
}
