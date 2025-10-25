import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import type { UsersRepository } from '@/repositories/users-repository'
import { compare, hash } from 'bcryptjs'

interface AlterPasswordUseCaseRequest {
  userId: string
  password: string
  newPassword: string
}

export class AlterPasswordUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
    password,
    newPassword,
  }: AlterPasswordUseCaseRequest) {
    const user = await this.userRepository.getUserById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const doesPasswordMatch = await compare(password, user.passwordHash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    await this.userRepository.update(userId, {
      passwordHash: await hash(newPassword, 10),
    })
  }
}
