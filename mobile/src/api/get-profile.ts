import { api } from '@/lib/axios'

export interface GetProfileReply {
  user: {
    name: string
    email: string
  }
}

export async function getProfile() {
  const response = await api.get<GetProfileReply>('/me')

  return response.data
}
