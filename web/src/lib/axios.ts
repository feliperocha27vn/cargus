import { env } from '@/env'
import axios from 'axios'

// Use a relative `/api` base in development so Vite can proxy requests to the backend
// This avoids cross-origin cookie issues (Edge/Chrome strict policies) during local dev.
const baseURL = import.meta.env.DEV ? '/api' : env.VITE_API_URL

export const api = axios.create({
  baseURL,
  withCredentials: true,
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async config => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return config
  })
}
