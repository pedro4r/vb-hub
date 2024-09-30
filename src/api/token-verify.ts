import { api } from '@/lib/axios'

export async function verifyToken() {
  try {
    await api.get('/protected')
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
