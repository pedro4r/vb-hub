import { api } from '@/lib/axios'

export async function testApi() {
  try {
    const response = await api.get('/test')
    console.log('response', response.data)
  } catch (error) {
    console.error('Error during authentication:', error)
    throw error
  }
}
