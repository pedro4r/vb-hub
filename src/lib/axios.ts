import axios from 'axios'

import { env } from '@/env'

// Define a baseURL dependendo do ambiente configurado pela variável VITE_STAGE
const baseURL = env.VITE_STAGE === 'development' ? '/api' : env.VITE_API_URL

export const api = axios.create({
  baseURL,
  withCredentials: true,
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )
    return config
  })
}
