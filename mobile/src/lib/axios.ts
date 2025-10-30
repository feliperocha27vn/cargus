import axios from 'axios'

// Use a relative `/api` base in development so Vite can proxy requests to the backend
// This avoids cross-origin cookie issues (Edge/Chrome strict policies) during local dev.
const baseURL = 'http://10.11.185.214:3333'

export const api = axios.create({
  baseURL,
  withCredentials: true,
})

const ENABLE_API_DELAY = true

if (ENABLE_API_DELAY) {
  api.interceptors.request.use(async config => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return config
  })
}
