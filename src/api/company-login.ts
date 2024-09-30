import { api } from '@/lib/axios'

export interface AuthParams {
  email: string
  password: string
}

export async function companyAuthenticate(params: AuthParams) {
  try {
    await api.post('/sessions/login', params, {
      withCredentials: true, // Necessário para enviar e receber cookies
    })
  } catch (error) {
    console.error('Error during authentication:', error)
    throw error
  }
}
