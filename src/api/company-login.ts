import { api } from '@/lib/axios'

export interface AuthParams {
  email: string
  password: string
}

export async function companyAuthenticate(params: AuthParams) {
  try {
    await api.post('/sessions', params)
  } catch (error) {
    console.error('Error during authentication:', error)
    throw error
  }
}
