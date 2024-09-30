import { api } from '@/lib/axios'

export async function verifyToken() {
  try {
    await api.get('/protected', {
      withCredentials: true,
    })
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
