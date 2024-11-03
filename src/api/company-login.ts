import { api } from '@/lib/axios'

export interface AuthParams {
  email: string
  password: string
}

export async function companyAuthenticate(params: AuthParams) {
  console.log(params)
  try {
    const oi = await api.get('/test')
    console.log(oi)
  } catch (error) {
    console.error('Error during authentication:', error)
    throw error
  }
}
