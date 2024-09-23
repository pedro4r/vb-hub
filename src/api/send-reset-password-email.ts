import { api } from '@/lib/axios'

export async function sendResetPasswordEmail(email: string) {
  try {
    await api.post('/send-reset-password-email', { email })
  } catch (error) {
    console.error('Error during authentication:', error)
    if (error instanceof Error) {
      return error.message
    } else {
      return String(error)
    }
  }
}
