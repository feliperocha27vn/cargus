import { UserAlreadyExistsError } from '@/errors/user-already-exists'
import type { UsersRepository } from '@/repositories/users-repository'
import type { Users } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserUseCaseReply {
  user: Users
}

export class RegisterUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseReply> {
    const user = await this.userRepository.findByEmail(email)

    if (user) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, 10)

    const newUser = await this.userRepository.register({
      name,
      email,
      passwordHash,
    })

    return {
      user: newUser,
    }
  }
}
