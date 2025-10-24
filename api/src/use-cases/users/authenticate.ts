import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import type { UsersRepository } from '@/prisma-repositories/users-repository'
import type { Users } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateUserRequest {
  email: string
  password: string
}

interface AuthenticateUserReply {
  user: Users
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserReply> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.passwordHash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
