import { api } from '@/lib/axios'

export async function companyLogout() {
  try {
    await api.post('/sessions/logout')
  } catch (error) {
    console.error('Error during authentication:', error)
    throw error
  }
}
