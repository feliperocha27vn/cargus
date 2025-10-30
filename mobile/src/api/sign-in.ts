import { api } from '@/lib/axios'

export interface SignInRequest {
  email: string
  password: string
}

export interface SignInReply {
  token: string
}

export async function signIn({ email, password }: SignInRequest) {
  const response = await api.post<SignInReply>('/authenticate', {
    email,
    password,
  })

  return response.data
}
