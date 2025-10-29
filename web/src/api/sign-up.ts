import { api } from '@/lib/axios'

export interface SignUpRequest {
  name: string
  email: string
  password: string
}

export async function signUp({ name, email, password }: SignUpRequest) {
  await api.post('/users', {
    name,
    email,
    password,
  })
}
